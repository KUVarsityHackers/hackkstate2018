from sqlite3 import Error, connect
from flask import Flask, request, abort
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps
#from image_processing.py import convert_detect

app = Flask(__name__)
CORS(app)

database = "photo_code.db"

@app.route('/api/templates', methods=['GET', 'POST', 'DELETE'])
def template():
    try:
        connection = connect(database)
    except Error:
        abort(500)
    print(request.data)
    if request.method == 'GET':
        if hasattr(request.headers, 'tempId'):
            tempId = request.headers['tempId']

            cursor = connection.cursor()
            cursor.execute("SELECT id, name, content FROM templates WHERE id = ?", [tempId])
        else:
            cursor = connection.cursor()
            cursor.execute('SELECT id, name, content FROM templates')

        rows = cursor.fetchall()
        connection.close()

        return dumps(rows)
    elif request.method == 'POST':
        name = request.headers['name']
        content = request.headers['content']

        cursor = connection.cursor()

        cursor.execute("INSERT INTO templates (name, content) VALUES (?, ?)", (name, content))
        connection.commit()
        connection.close()

        return 'Success'
    elif request.method == 'DELETE':
        tempId = request.headers['tempId']

        cursor = connection.cursor()

        cursor.execute("DELETE FROM templates WHERE id = ?", [tempId])
        cursor.execute("DELETE FROM submissions WHERE template_id = ?", [tempId])
        connection.commit()
        connection.close()

        return 'Success'


@app.route('/api/submissions', methods=['GET', 'POST', 'DELETE'])
def submission():
    try:
        connection = connect(database)
    except Error:
        abort(500)

    if request.method == 'GET':
        tempId = request.headers['tempId']

        cursor = connection.cursor()
        cursor.execute("SELECT id, name, content FROM submissions WHERE template_id = ?", [tempId])

        rows = cursor.fetchall()
        connection.close()

        return dumps(rows)
    elif request.method == 'POST':
        tempId = request.headers['tempId']
        submission_name = request.headers['submission_name']
        submission_content = request.headers['submission_content']

        cursor = connection.cursor()
        cursor.execute("SELECT count(*) FROM templates WHERE id = ?", [tempId])

        templateExists = True if len(cursor.fetchall()) == 1 else False

        if (templateExists == False):
            abort(500)
            connection.close()

        cursor = connection.cursor()

        cursor.execute("INSERT INTO submissions (template_id, name, content) VALUES (?, ?, ?)", (tempId, submission_name, submission_content))
        connection.commit()
        connection.close()

        return 'Success'
    elif request.method == 'DELETE':
        submission_id = request.headers['submission_id']

        cursor = connection.cursor()

        cursor.execute("DELETE FROM submissions WHERE id = ?", [submission_id])
        connection.commit()
        connection.close()

        return 'Success'

@app.route('/OCR', methods=['POST'])
def ocr():
    picture = request.form['b64']
    fileName = request.form['fileName']

    return dumps(convert_detect(picture, fileName, True))



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
