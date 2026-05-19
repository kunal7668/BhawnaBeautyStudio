from django.shortcuts import render
from .models import Service  # Model ko import karein

def home(request):
    return render(request, 'index.html')



def services_view(request):
    # Database se saari services nikal rahe hain
    services = Service.objects.all().order_by('-created_at') 
    return render(request, 'services.html', {'services': services})

def about_view(request):
    return render(request, 'about.html')

def experience_view(request):
    return render(request, 'experience.html')

def checkout_view(request):
    return render(request, 'checkout.html')