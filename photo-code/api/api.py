from sqlite3 import Error, connect
from flask import Flask, request, abort
from json import dumps
#from image_processing.py import convert_detect

app = Flask(__name__)

database = "photo_code.db"

@app.route('/templates', methods=['GET', 'POST', 'DELETE'])
def template():
    try:
        connection = connect(database)
    except Error:
        abort(500)

    if request.method == 'GET':
        if hasattr(request.headers, 'template_id'):
            template_id = request.headers['template_id']

            cursor = connection.cursor()
            cursor.execute("SELECT id, name, content FROM templates WHERE id = ?", [template_id])
        else:
            cursor = connection.cursor()
            cursor.execute('SELECT id, name, content FROM templates')

        rows = cursor.fetchall()
        connection.close()

        return dumps(rows)
    elif request.method == 'POST':
        template_name = request.headers['template_name']
        template_contents = request.headers['template_contents']

        cursor = connection.cursor()

        cursor.execute("INSERT INTO templates (name, content) VALUES (?, ?)", (template_name, template_contents))
        connection.commit()
        connection.close()

        return 'Success'
    elif request.method == 'DELETE':
        template_id = request.headers['template_id']

        cursor = connection.cursor()

        cursor.execute("DELETE FROM templates WHERE id = ?", [template_id])
        cursor.execute("DELETE FROM submissions WHERE template_id = ?", [template_id])
        connection.commit()
        connection.close()

        return 'Success'


@app.route('/submissions', methods=['GET', 'POST', 'DELETE'])
def submission():
    try:
        connection = connect(database)
    except Error:
        abort(500)

    if request.method == 'GET':
        template_id = request.headers['template_id']

        cursor = connection.cursor()
        cursor.execute("SELECT id, name, content FROM submissions WHERE template_id = ?", [template_id])

        rows = cursor.fetchall()
        connection.close()

        return dumps(rows)
    elif request.method == 'POST':
        template_id = request.headers['template_id']
        submission_name = request.headers['submission_name']
        submission_content = request.headers['submission_content']

        cursor = connection.cursor()
        cursor.execute("SELECT count(*) FROM templates WHERE id = ?", [template_id])

        templateExists = True if len(cursor.fetchall()) == 1 else False

        if (templateExists == False):
            abort(500)
            connection.close()

        cursor = connection.cursor()

        cursor.execute("INSERT INTO submissions (template_id, name, content) VALUES (?, ?, ?)", (template_id, submission_name, submission_content))
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
    app.run()
