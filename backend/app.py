from flask import Flask
from .db import close_db
from .models.player import player_bp
from .models.team import team_bp
from .models.coach import coach_bp
from .models.training import training_bp
from .models.injury import injury_bp
from .models.match import match_bp
from .models.medical_staff import medical_staff_bp
from .models.player_performance import player_stats_bp

app = Flask(__name__)

# Register blueprints
app.register_blueprint(player_bp)
app.register_blueprint(team_bp)
app.register_blueprint(coach_bp)
app.register_blueprint(training_bp)
app.register_blueprint(injury_bp)
app.register_blueprint(match_bp)
app.register_blueprint(medical_staff_bp)
app.register_blueprint(player_stats_bp)

# Close DB connection after request
@app.teardown_appcontext
def teardown_db(exception):
    close_db()


# Home endpoint for '/'
@app.route("/")
def home():
    return "Welcome to the KickO API!"

if __name__ == "__main__":
    app.run(debug=True)
