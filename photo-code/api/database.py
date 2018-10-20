from sqlite3 import Error, connect
from json import dumps

database = "photo_code.db"

def createTemplate(template_name, template_contents):
    try:
        connection = connect(database)
    except Error:
        return False

    cursor = connection.cursor()
    cursor.execute("SELECT id FROM templates WHERE name = ?", [template_name])

    nameExists = True if len(cursor.fetchall()) > 0 else False

    if (nameExists):
        connection.close()
        return False

    cursor = connection.cursor()

    cursor.execute("INSERT INTO templates (name, content) VALUES (?, ?)", (template_name, template_contents))
    connection.commit()
    connection.close()

    return True

def createSubmission(template_id, submission_name, submission_string):
    try:
        connection = connect(database)
    except Error:
        return False

    cursor = connection.cursor()
    cursor.execute("SELECT id FROM templates WHERE id = ?", [template_id])

    templateExists = True if len(cursor.fetchall()) == 1 else False;

    if (templateExists == False):
        connection.close()
        return False

    cursor = connection.cursor()

    cursor.execute("INSERT INTO submissions (template_id, name, content) VALUES (?, ?, ?)", (template_id, submission_name, submission_string))
    connection.commit()
    connection.close()

    return True


def deleteTemplate(template_id):
    try:
        connection = connect(database)
    except Error:
        return False

    cursor = connection.cursor()

    cursor.execute("DELETE FROM templates WHERE id = ?", [template_id])
    cursor.execute("DELETE FROM submissions WHERE template_id = ?", [template_id])
    connection.commit()
    connection.close()

    return True


def deleteSubmission(submission_id):
    try:
        connection = connect(database)
    except Error:
        return False

    cursor = connection.cursor()

    cursor.execute("DELETE FROM submissions WHERE id = ?", [submission_id])
    connection.commit()
    connection.close()

    return True


def getTemplate(template_id):
    try:
        connection = connect(database)
    except Error:
        return False

    cursor = connection.cursor()
    cursor.execute("SELECT name, content FROM templates WHERE id = ?", [template_id])

    rows = cursor.fetchall()
    connection.close()

    return dumps(rows)


def getSubmissions(template_id):
    try:
        connection = connect(database)
    except Error:
        return False

    cursor = connection.cursor()
    cursor.execute("SELECT name, content FROM submissions WHERE template_id = ?", [template_id])

    rows = cursor.fetchall()
    connection.close()

    return dumps(rows)


def main():
    deleteTemplate(2)
    createTemplate('Testing Template', 'Testing Template Contents')
    createSubmission(2, 'Daniel', 'Daniel Test')
    createSubmission(2, 'Colin', 'Colin Test')
    createSubmission(2, 'Nathan', 'Nathan Test')
    createSubmission(2, 'Andre', 'Andre Test')
    print(getTemplate(2))
    print(getSubmissions(2))
    deleteTemplate(2)


if __name__ == '__main__':
    main()
