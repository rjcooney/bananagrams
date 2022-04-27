from django.shortcuts import redirect, render
from django.http import HttpResponse

def index_redirect_view(request):
    response = redirect('/bananagrams/')
    return response

def index(request):
    return HttpResponse("blanamaprams")


