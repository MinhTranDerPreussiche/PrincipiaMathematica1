from django.http import HttpResponse

def set_cookie(request):
    response = HttpResponse("Cookie Set")
    response.set_cookie('username', 'YourUsername', max_age=60*60*24*365) # 1 year
    return response

def get_cookie(request):
    username = request.COOKIES.get('username')
    if username:
        return HttpResponse(f"Welcome back, {username}!")
    else:
        return HttpResponse("Username cookie not set.")