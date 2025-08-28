from django.shortcuts import render

def dashboard(request):
    return render(request, "dashboard.html")


def transactions(request):
    return render(request, "transactions.html")