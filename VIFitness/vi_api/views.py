from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import permissions
from .models import UserData
from .serializers import UserDataSerializer

# Create your views here.


class UserDataDetailApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self, userdata_id, user_id):
        try:
            return UserData.objects.get(username__iexact=userdata_id, user=user_id)
        except UserData.DoesNotExist:
            return HttpResponse("Does not exist")

    # get userdata
    def get(self, request, userdata_id, *args, **kwargs):
        userdata_instance = self.get_object(userdata_id, request.user.id)
        if not userdata_instance:
            return Response(
                {"res": "Object with userdata id does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = UserDataSerializer(userdata_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, userdata_id, *args, **kwargs):
        userdata_instance = self.get_object(userdata_id, request.user.id)
        if not userdata_instance:
            return Response(
                {"res": "Object with userdata id does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        data = {
            "username": request.data.get("username"),
            "email": request.data.get("email"),
            "user": request.user.id,
        }
        serializer = UserDataSerializer(
            instance=userdata_instance, data=data, partial=True
        )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, userdata_id, *args, **kwargs):
        userdata_instance = self.get_object(userdata_id, request.user.id)
        if not userdata_instance:
            return Response(
                {"res": "Object with userdata id does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        userdata_instance.delete()
        return Response({"res": "Object deleted!"}, status=status.HTTP_200_OK)


class UserDataApiView(APIView):
    # add permission to check if user is authenticated
    permission_classes = [permissions.IsAuthenticated]

    # list all
    def get(self, request, *args, **kwargs):
        """
        List all user data for given requested user
        """
        userdata = UserData.objects.filter(user=request.user.id)
        serializer = UserDataSerializer(userdata, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # Create
    def post(self, request, *args, **kwargs):
        """
        create the userdata with given user data
        """
        data = {
            "username": request.data.get("username"),
            "email": request.data.get("email"),
            "user": request.user.id,
        }
        serializer = UserDataSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def index(request):
    return HttpResponse("HelloWorld")
