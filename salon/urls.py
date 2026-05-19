from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('services/', views.services_view, name='services'),
    path('about/', views.about_view, name='about'),
    path('experience/', views.experience_view, name='experience'),
    path('checkout/', views.checkout_view, name='checkout'),
]