from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('college/', views.collegeData),
    path('login_credentials/', views.LoginCredentials.as_view(), name='login'),
    path('search_colleges/' ,views.SearchView.as_view()),
    path('compare/', Compare.as_view(), name='compare'),
]

# Configuration for serving media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
