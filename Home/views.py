from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from .models import *
from .serializer import CollegeSerializer, CredentialsSerializer
from django.views.generic import View


class Base(View):
    views = {}


@api_view(['GET'])
def collegeData(request):
    college_data = College.objects.all()
    data_serializer = CollegeSerializer(college_data, many=True)
    return Response(data_serializer.data)


# Update Compare class in views.py

# Update Compare class in views.py

class Compare(Base):
    def get(self, request):
        # Initialize the views dictionary
        self.views = {}

        # Handle search logic
        college_name = request.GET.get('college_name', '')

        if college_name:
            # If a search term is provided, filter colleges based on the search term
            excerpt = College.objects.filter(college_name__icontains=college_name).first()
            self.views['college_info'] = excerpt
        else:
            # If no search term is provided, render the page without search results
            self.views['college_info'] = None

        # Retrieve all colleges for the right column
        self.views['colleges'] = College.objects.all()

        # Render the compare.html template
        return render(request, 'compare.html', self.views)


class LoginCredentials(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CredentialsSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            print(username)
            print(password)

            # Authenticate the user or save the data to the database

            return Response({'success': True, 'message': 'Data received successfully'}, status=200)
        else:
            return Response({'success': False, 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
