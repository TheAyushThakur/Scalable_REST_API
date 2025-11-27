from django.urls import path
from .views import register_user, LoginView, list_users

urlpatterns = [
    path('register/', register_user, name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('users/', list_users, name='list_users'),   

]
