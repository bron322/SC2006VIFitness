from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("api", views.UserDataApiView.as_view()),
    path("api/<str:userdata_id>/", views.UserDataDetailApiView.as_view()),
]
