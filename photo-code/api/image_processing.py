import io
import os
from PIL import Image, ImageEnhance, ImageFilter, ImageFile
import numpy as np
import cv2
from google.cloud import vision

def detect_text(path):
    """Detects text in the file."""
    client = vision.ImageAnnotatorClient()
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.document_text_detection(image=image)
    texts = response.text_annotations
    return response.text_annotations[0].description

def convert_detect(image_64_encode, filename="temp.jpg", convert=False):
    filename, file_extension = os.path.splitext(filename)
    path = "temp" + file_extension
    import base64
    image_64_decode = base64.decodestring(image_64_encode)
    image_result = open(path, 'wb')
    # create a writable image and write the decoding result
    image_result.write(image_64_decode)
    image_result.close()

    if (convert):
        new_path = path.replace(file_extension, "_edited" + file_extension)
        img = cv2.imread(path)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        kernel = np.ones((1, 1), np.uint8)
        img = cv2.dilate(img, kernel, iterations=1)
        img = cv2.erode(img, kernel, iterations=1)
        cv2.imwrite(new_path, img)
        path = new_path

    code = detect_text(path)

    f = open("tempc.cpp","w+")
    f.write(code)
    f.close()
    bashCommand = "clang-format tempc.cpp"
    import subprocess
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    return output.decode("utf-8")
