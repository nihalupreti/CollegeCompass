import json
from django.shortcuts import render
from rest_framework.response import Response
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from . import models
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from .serializer import CollegeSerializer, LoginCredentialsSerializer, CollegeSearchSerializer, SignupCredentialsSerializer
from django.views.generic import View
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator


class Base(View):
    views = {}



@api_view(['GET'])
def collegeData(request):
    college_data = models.College.objects.all()
    data_serializer = CollegeSerializer(college_data, many=True)
    if request.user.is_authenticated:
        return Response(data_serializer.data, status=status.HTTP_200_OK)
    else:
         return Response(data_serializer.data, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION)



class Compare(Base):
    def get(self, request):
        # Initialize the views dictionary
        self.views = {}

        # Handle search logic
        college_name = request.GET.get('college_name', '').strip()  # Strip whitespace from the search term

        # Check if the search term is empty or contains only whitespaces
        if not college_name:
            # If the search term is empty, render the page without results
            self.views['left_college_info'] = None
            self.views['right_college_info'] = None
            self.views['colleges'] = College.objects.all()
            return render(request, 'compare.html', self.views)

        # Retrieve all colleges for the right column
        self.views['colleges'] = College.objects.all()

        # Check the column parameter and set the appropriate view for rendering
        column = request.GET.get('column', '')  # Get the column parameter

        if column == 'left':
            # If searching in the left column, update left_college_info and store it in the session
            left_college_info = College.objects.filter(college_name__icontains=college_name).first()
            request.session['left_college_info'] = {
                'college_name': left_college_info.college_name if left_college_info else None,
                'address': left_college_info.address if left_college_info else None,
                'fee': left_college_info.fee if left_college_info else None,
                # Add other fields as needed
            }
            right_college_info = None
        elif column == 'right':
            # If searching in the right column, update right_college_info
            right_college_info = College.objects.filter(college_name__icontains=college_name).first()
            left_college_info = request.session.get('left_college_info')
        else:
            left_college_info = None
            right_college_info = None

        self.views['left_college_info'] = left_college_info
        self.views['right_college_info'] = right_college_info

        # Render the compare.html template
        return render(request, 'compare.html', self.views)


class LoginCredentials(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginCredentialsSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username,
                                password=password)
            if user is not None:
                login(request, user)
                return Response({'success': True, 'message': 'Data validated sucessfully'}, status=200)
                print("logged in ")
            else:
                return Response({'message': 'Invalid Credentials'}, status=200)
            
        else:
            print(serializer.errors)
            return Response({'success': False, 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

class SignupCredentials(APIView):
    def post(self, request, *args, **kwargs):
        serializer = SignupCredentialsSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['confirm_password']
            user_name = serializer.validated_data['user_name']
            register_user = User.objects.create_user(username=user_name,email=email,password=password)
            register_user.save()
            return Response({'success': True, 'message': 'Data saved successfully'}, status=200)
        else:
            print(serializer.errors)
            return Response({'success': False, 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

class SearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '')
        results = models.College.objects.filter(college_name__istartswith=query)[:10]
        serializer = CollegeSearchSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@method_decorator(login_required, name='post')
class BookmarkView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            college_id = self.request.data.get('id')
            print(college_id)
            if college_id is not None:
                bookmarked_items = request.session.get('bookmarked_items', [])
                bookmarked_items.append(college_id)
                request.session['bookmarked_items'] = bookmarked_items
                return JsonResponse({'success': True, 'message': 'Item bookmarked successfully.'})
            return JsonResponse({'success': False, 'message': 'Invalid request. Missing item_id.'}, status=400)
        except json.JSONDecodeError:
            return JsonResponse({'success': False, 'message': 'Invalid JSON format in the request body.'}, status=400)


def get_bookmarked_items(request):
    if request.user.is_authenticated:
        bookmarked_items = request.session.get('bookmarked_items', [])
        return JsonResponse({'success': True, 'bookmarked_items': bookmarked_items})
    else:
        return JsonResponse({'success': False, 'message': 'User is not authenticated'}, status=401)

@csrf_protect
def logout_view(request):
    if not request.user.is_authenticated:
        print("User not authenticated")
        return JsonResponse({'success': False, 'message': 'User not authenticated'}, status=status.HTTP_403_FORBIDDEN)

    print(f"User: {request.user}")

    # Attempt to log out the user
    try:
        logout(request)
        print("User logged out successfully")
        return JsonResponse({'success': True, 'message': 'User is logged out'}, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Error during logout: {e}")
        return JsonResponse({'success': False, 'message': 'Error during logout'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)