from django.urls import path
from . import views
from .views import *


urlpatterns = [
    path('college/', views.collegeData),
    path('compare/', Compare.as_view(), name='compare'),

]
