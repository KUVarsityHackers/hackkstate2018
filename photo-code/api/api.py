from sqlite3 import Error, connect
from flask import Flask, request, abort
from flask_cors import CORS, cross_origin
from flask_restful import Resource, Api
from json import dumps, loads
from image_processing import convert_detect

app = Flask(__name__)
CORS(app, resources={r"*": {"origins": "*"}})

database = "photo_code.db"

@app.route('/api/templates', methods=['GET', 'POST'])
def templates():
    try:
        con = connect(database)
    except Error:
        abort(500)
    
    if request.method == 'GET':
        if hasattr(request.headers, 'tempId'):
            tempId = request.headers['tempId']

            cursor = con.cursor()
            cursor.execute("SELECT id, name, content FROM templates WHERE id = ?", [tempId])
        else:
            cursor = con.cursor()
            cursor.execute('SELECT id, name, content FROM templates')

        rows = cursor.fetchall()
        con.close()

        return dumps(rows)
    elif request.method == 'POST':
        data = loads(request.data.decode('utf-8'))
        name = data['t_name']
        content = data['t_content']
        cursor = con.cursor()

        cursor.execute("INSERT INTO templates (name, content) VALUES (?, ?)", (name, content))
        con.commit()
        con.close()

        return '1'


@app.route('/api/submissions', methods=['GET', 'POST'])
def submission():
    try:
        connection = connect(database)
    except Error:
        abort(500)
    
    if request.method == 'GET':
        #tempId = request.headers['tempId']

        cursor = connection.cursor()
        cursor.execute("SELECT id, name, content FROM submissions")

        rows = cursor.fetchall()
        connection.close()

        return dumps(rows)
    elif request.method == 'POST':
        data = loads(request.data.decode('utf-8'))
        tempId = data['tempId']
        submission_name = data['submission_name']
        submission_content = data['submission_content']
        cursor = connection.cursor()
        cursor.execute("SELECT count(*) FROM templates WHERE id = ?", [tempId])

        templateExists = True if len(cursor.fetchall()) == 1 else False

        if (templateExists == False):
            abort(500)
            connection.close()

        cursor = connection.cursor()

        cursor.execute("INSERT INTO submissions (template_id, name, content) VALUES (?, ?, ?)", (tempId, submission_name, submission_content))
        cursor.execute('Select max(id) from submissions')
        answer = cursor.fetchall()
        connection.commit()
        connection.close()

        return dumps(answer)

@app.route('/OCR', methods=['POST'])
def ocr():
    data = loads(request.data.decode('utf-8'))
    picture = data['b64']
    fileName = data['fileName']
    
    return dumps(convert_detect(picture.encode(), fileName, True))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
