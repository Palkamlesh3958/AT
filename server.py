from flask import Flask, render_template, request, flash, session, redirect
from model import connect_to_db, db, User
# import curd

from jinja2 import StrictUndefined

app = Flask(__name__)
app.secret_key = "mycapstoneproject"
app.jinja_env.undefined = StrictUndefined


@app.route("/")
def homepage():
    """View homepage."""

    return render_template("home.html")

@app.route("/sign_up")
def sign_up():
    """View sign_up page."""

    return render_template("sign_up.html")

@app.route("/login")
def loginform():
    return render_template('login.html')


@app.route("/login", methods=['POST'])
def login():
    """View login page."""

    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')

    if email == '' or password == '':
        flash("Please enter all required fields.")
        return render_template('login.html')

    user = User.query.filter(User.email == email).first()

    if user:
        session['email'] = email
        session['logged_in'] = True
        session.modified = True

        flash(f"Logged in as: {email}")
        return redirect('/activity') # changed render_template to redirect return redirect('/login') 
    # If user does not exists, direct user to sign up pahe 
    else: 
        flash("Sign up please...")
        return render_template('sign_up.html')


@app.route("/sign_up", methods=['POST'])
def signup():
    """View sign up page."""

    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password1 = request.form.get('password1')
        password2 = request.form.get('password2')

    if username == '' or email == '' or password1 == '' or password2 == '':
        flash("Please enter all required fields")
        return render_template('sign_up.html')
        
    user = User.query.filter(User.email == email).first()
    if not user:
        data = User( username, email, password1, password2)
        db.session.add(data)
        db.session.commit()
        flash("Account created! Please log in.")
        return render_template('login.html')
        
    else:
        flash("Cannot create an account with that email. User already exists. Try again.")
    return render_template("/")

@app.route("/activity")
def trackActivity():
    """View login page."""

    return render_template("activity.html")

@app.route("/logout")
def logout():
    if session['logged_in'] == True:
        session['email'] = ""
        session['logged_in'] = False
        session.modified = True

    flash("logged out successfully!!!")
    return redirect("/")

if __name__ == "__main__":
    connect_to_db(app, "trailfinder")
    app.run(host="0.0.0.0", debug=True)