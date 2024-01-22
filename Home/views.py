from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework import status
from . import models
<<<<<<< HEAD
from .serializer import CollegeSerializer
from django.views.generic import View


class Base(View):
    views = {}

=======
from .serializer import CollegeSerializer, CredentialsSerializer
>>>>>>> 52f310ee8a090b7f0d22f23f0c9ef597e5c2e813

@api_view(['GET'])
def collegeData(request):
    college_data = models.College.objects.all()  ##orm
    data_serializer = CollegeSerializer(college_data, many=True)
    return Response(data_serializer.data)

<<<<<<< HEAD

class Compare(Base):
    def get(self, request):
        return render(request, 'compare.html', self.views)
=======
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
>>>>>>> 52f310ee8a090b7f0d22f23f0c9ef597e5c2e813
