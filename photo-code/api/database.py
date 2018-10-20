from sqlite3 import Error, connect
from bottle import get, post, delete, request, response, run
from json import dumps

database = "photo_code.db"

@post('/createTemplate')
def createTemplate():
    try:
        connection = connect(database)
    except Error:
        response.status = 500
        return

    template_name = request.headers.get('template_name')
    template_contents = request.headers.get('template_contents')

    cursor = connection.cursor()

    cursor.execute("INSERT INTO templates (name, content) VALUES (?, ?)", (template_name, template_contents))
    connection.commit()
    connection.close()

    return dumps('Template Created Successfully')


@post('/createSubmission')
def createSubmission():
    try:
        connection = connect(database)
    except Error:
        response.status = 500
        return

    template_id = request.headers.get('template_id')
    submission_name = request.headers.get('submission_name')
    submission_string = request.headers.get('submission_string')

    cursor = connection.cursor()
    cursor.execute("SELECT count(*) FROM templates WHERE id = ?", [template_id])

    templateExists = True if len(cursor.fetchall()) == 1 else False

    if (templateExists == False):
        connection.close()
        return False

    cursor = connection.cursor()

    cursor.execute("INSERT INTO submissions (template_id, name, content) VALUES (?, ?, ?)", (template_id, submission_name, submission_string))
    connection.commit()
    connection.close()

    return dumps('Submission created successfully')


@delete('/deleteTemplate')
def deleteTemplate():
    try:
        connection = connect(database)
    except Error:
        response.status = 500
        return

    template_id = request.headers.get('template_id')

    cursor = connection.cursor()

    cursor.execute("DELETE FROM templates WHERE id = ?", [template_id])
    cursor.execute("DELETE FROM submissions WHERE template_id = ?", [template_id])
    connection.commit()
    connection.close()

    return dumps('Template deleted successfully')


@delete('/deleteSubmission')
def deleteSubmission():
    try:
        connection = connect(database)
    except Error:
        response.status = 500
        return

    submission_id = request.headers.get('submission_id')

    cursor = connection.cursor()

    cursor.execute("DELETE FROM submissions WHERE id = ?", [submission_id])
    connection.commit()
    connection.close()

    return dumps('Submission deleted successfully')


@get('/getTemplate')
def getTemplate():
    try:
        connection = connect(database)
    except Error:
        response.status = 500
        return

    template_id = request.headers.get('template_id')

    cursor = connection.cursor()
    cursor.execute("SELECT id, name, content FROM templates WHERE id = ?", [template_id])

    rows = cursor.fetchall()
    connection.close()

    return dumps(rows)


@get('/getSubmissions')
def getSubmissions():
    try:
        connection = connect(database)
    except Error:
        return False

    template_id = request.headers.get('template_id')

    cursor = connection.cursor()
    cursor.execute("SELECT id, name, content FROM submissions WHERE template_id = ?", [template_id])

    rows = cursor.fetchall()
    connection.close()

    return dumps(rows)

run(host='localhost', port=8080, debug=True)
