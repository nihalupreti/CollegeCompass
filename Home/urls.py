from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('college/', views.collegeData),
    path('login_credentials/', views.login_credentials.as_view()),
    path('search_colleges/' ,views.SearchView.as_view())
]

# Configuration for serving media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
