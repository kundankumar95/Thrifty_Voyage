from flask import Flask, render_template, request
from demo import calculate_travel_information

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Get form data
        origin_location = request.form['origin_location']
        destination_location = request.form['destination_location']
        break_location = request.form['break_location']
        budget = int(request.form['budget'])
        expenses = int(request.form['expenses'])
        person = int(request.form['person'])
        days = int(request.form['days'])

        # Calculate travel information
        travel_info = calculate_travel_information(origin_location, destination_location, break_location, budget, expenses, person, days)

        return render_template('index.html', travel_info=travel_info)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)


