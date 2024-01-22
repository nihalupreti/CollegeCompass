from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from . import models
from .serializer import CollegeSerializer, CredentialsSerializer, CollegeSearchSerializer

@api_view(['GET'])
def collegeData(request):
    college_data = models.College.objects.all() ##orm
    data_serializer = CollegeSerializer(college_data, many=True)
    return Response(data_serializer.data)

class login_credentials(APIView):
    def post(self, request, *args, **kwargs):
        serializer = CredentialsSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data.get('username')
            password = serializer.validated_data.get('password')
            print(username)
            print(password)
            #  authenticate the user or save the data to the database
            return Response({'success': True, 'message': 'Data received successfully'},status=200)
        else:
            return Response({'success': False, 'message': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

class SearchView(APIView):
    def get(self, request):
        query = request.query_params.get('q', '')
        print("hello" +query)
        results = models.College.objects.filter(college_name__istartswith=query)[:10]
        serializer = CollegeSearchSerializer(results, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)