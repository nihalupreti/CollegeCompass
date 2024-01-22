from rest_framework import serializers
from . import models

class CollegeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.College
        fields = '__all__'

class CredentialsSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class CollegeSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.College
        fields = ['id', 'college_name', 'address']
