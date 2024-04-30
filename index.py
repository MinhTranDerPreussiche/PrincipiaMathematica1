from flask import Flask, render_template, request, make_response
app = Flask(__name__)
@app.route('/')
def home():
    # Attempt to read the cookie
    user_cookie = request.cookies.get('user_preference')
    if user_cookie:
        message = f"Welcome back! Your saved preference: {user_cookie}"
    else:
        message = "Welcome! You have no saved preferences."
    
    # This assumes your 'index.html' is inside a directory named 'templates'
    return render_template('index.html', message=message)
@app.route('/set_cookie')
def set_cookie():
    resp = make_response("Cookie has been set. Go back to the home page.")
    resp.set_cookie('user_preference', 'some_value', max_age=60*60*24*365) # Example cookie
    return resp
if __name__ == '__main__':
    app.run(debug=True)