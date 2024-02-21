from rest_framework import serializers
from . import models

class CollegeSerializer(serializers.ModelSerializer):

    class Meta:
        model = models.College
        fields = '__all__'

class LoginCredentialsSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

class SignupCredentialsSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    confirm_password = serializers.CharField(write_only=True)
    user_name = serializers.CharField(required=True)
    role = serializers.CharField(required=True)

    def validate(self, data):
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        # Check if password and confirm_password match
        if password != confirm_password:
            raise serializers.ValidationError("Passwords do not match.")

        return data


class CollegeSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.College
        fields = "__all__"
