from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from . import models
from .serializer import CollegeSerializer
from django.views.generic import View


class Base(View):
    views = {}


@api_view(['GET'])
def collegeData(request):
    college_data = models.College.objects.all()  ##orm
    data_serializer = CollegeSerializer(college_data, many=True)
    return Response(data_serializer.data)


class Compare(Base):
    def get(self, request):
        return render(request, 'compare.html', self.views)
