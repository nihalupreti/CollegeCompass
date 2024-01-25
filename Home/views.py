from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from . import models
from .serializer import CollegeSerializer, LoginCredentialsSerializer, CollegeSearchSerializer, SignupCredentialsSerializer

from django.views.generic import View


class Base(View):
    views = {}



@api_view(['GET'])
def collegeData(request):
    college_data = models.College.objects.all()
    data_serializer = CollegeSerializer(college_data, many=True)
    return Response(data_serializer.data)


# Update Compare class in views.py

# Update Compare class in views.py

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
        print("hello world")
        serializer = LoginCredentialsSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            print(email)
            print(password)
            # authenticate the user or save the data to the database
            return Response({'success': True, 'message': 'Data received successfully'}, status=200)
        else:
            print(serializer.errors)
            return Response({'success': False, 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

class SignupCredentials(APIView):
    def post(self, request, *args, **kwargs):
        print("hello world")
        serializer = SignupCredentialsSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            print(email)
            print(password)
            # authenticate the user or save the data to the database
            return Response({'success': True, 'message': 'Data received successfully'}, status=200)
        else:
            print(serializer.errors)
            return Response({'success': False, 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

class SearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '')
        print("hello" +query)
        results = models.College.objects.filter(college_name__istartswith=query)[:10]
        serializer = CollegeSearchSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)