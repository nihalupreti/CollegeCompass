from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views
from .views import *
from .renderingviews import page_detail

urlpatterns = [
    path('college/<int:college_id>/', page_detail, name='college_detail_page'),
    path('college/', views.collegeData),
    path('login_credentials/', views.LoginCredentials.as_view(), name='login'),
    path('signup_credentials/', views.SignupCredentials.as_view(), name='signup'),
    path('search_colleges/' ,views.SearchView.as_view()),
    path('compare/', Compare.as_view(), name='compare'),
    path('bookmark/', BookmarkView.as_view(), name='bookmark'),
    path('get_bookmarked_items/', get_bookmarked_items, name='get_bookmarked_items'),
    path('logout/', logout_view,  name='logout'),
    path('username/', get_username),
    path('inquery/', create_inquiry)
    ]

# Configuration for serving media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
