from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import category, booking_dao, add_event


app = Flask('__name__')
cors = CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/getcategory', methods=['GET'])
@cross_origin()
def getcategory():
    response = category.get_all_category()
    response = jsonify(response)
    return response


@app.route('/eventbooking', methods=['POST'])
@cross_origin(origins="http://localhost:4200")
def eventbooking():
    data = request.get_json()
    response = booking_dao.book_event(data)
    response = jsonify(response)
    return response


@app.route('/unsubscribe', methods=['POST'])
@cross_origin(origins="http://localhost:4200")
def unsubscribe():
    data = request.get_json()
    response = booking_dao.unsubscribe_event(data)
    response = jsonify(response)
    return response


@app.route('/getslots', methods=['POST'])
@cross_origin(origins="http://localhost:4200")
def getslots():
    data = request.get_json()
    response = booking_dao.getslots(data)
    response = jsonify(response)
    return response


@app.route('/addevent', methods=['POST'])
@cross_origin(origins="http://localhost:4200")
def addevent():
    data = request.get_json()
    response = add_event.addevent(data)
    response = jsonify(response)
    return response


@app.route('/adminlogin', methods=['POST'])
@cross_origin(origins="http://localhost:4200")
def adminlogin():
    data = request.get_json()
    response = add_event.adminlogin(data)
    response = jsonify(response)
    return response


if __name__ == '__main__':
    app.run()