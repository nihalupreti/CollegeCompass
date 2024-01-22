from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
from .views import *

urlpatterns = [
    path('college/', views.collegeData),

    path('compare/', Compare.as_view(), name='compare'),
    path('login_credentials/', LoginCredentials.as_view(), name='login'),
]

# Configuration for serving media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
