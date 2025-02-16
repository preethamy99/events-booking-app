# EventsBooking

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




Flask Backend Project
This is a Flask backend project that provides various APIs for event booking and management. The project handles categories, event bookings, subscriptions, slot retrievals, event additions, and admin login.

Installation
Clone the repository:

cd event-booking-backend
Create a virtual environment:


python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
Install the dependencies:

pip install Flask
pip install -r requirements.txt
Install Flask-CORS:

pip install flask-cors
Configuration
Update the CORS configuration in app.py to match your frontend origin:

python
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import category, booking_dao, add_event

app = Flask('__name__')
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
app.config['CORS_HEADERS'] = 'Content-Type'
API Endpoints
1. Get Category
URL: /getcategory

Method: GET

Description: Fetches all categories.

Response:

json
{['Cat 1', 'Cat 2', 'Cat 3']}
2. Event Booking
URL: /eventbooking

Method: POST

Description: Books an event.

Request Body:

json
{
  "date: "2025-1-2",
  "category": "Cat 1",
  "slot": "slot",
}
Response:

json
{
  "status": "success",
  "message": "Booking received"
}
3. Unsubscribe from Event
URL: /unsubscribe

Method: POST

Description: Unsubscribes from an event.

Request Body:

json
{
  "date: "2025-1-2",
  "category": "Cat 1",
  "slot": "slot",
}
Response:

json
{
  "status": "success",
  "message": "Unsubscribed successfully"
}
4. Get Slots
URL: /getslots

Method: POST

Description: Retrieves available slots.

Request Body:

json
{
  "date": "2025-02-16",
  "category":'Cat 2'
}
Response:

json
[
  {
    0: "10:00", 
    1: "13:00",
    2: "15:00"
  },
  ...
]
5. Add Event
URL: /addevent

Method: POST

Description: Adds a new event.

Request Body:

json
{
  "date": "New Event",
  "category": "Cat 1",
  "slots": ["10:00", "13:00"],
  ...
}
Response:

json
{
  "status": "success",
  "message": "Event added successfully"
}
6. Admin Login
URL: /adminlogin

Method: POST

Description: Admin login.

Request Body:

json
{
  "email": "admin@example.com",
  "password": "password123"
}
Response:

json
{
  "status": "success",
  "token": "some-jwt-token"
}
Running the Application
Start the Flask server:

python app.py
Access the API: The API will be accessible at http://127.0.0.1:5000
