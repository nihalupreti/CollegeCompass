from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
from .views import *


urlpatterns = [
    path('college/', views.collegeData),
<<<<<<< HEAD
    path('compare/', Compare.as_view(), name='compare'),

=======
    path('login_credentials/', views.login_credentials.as_view()),
>>>>>>> 52f310ee8a090b7f0d22f23f0c9ef597e5c2e813
]

# Configuration for serving media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
