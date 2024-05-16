import tensorflow as tf
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import os

# Define paths (replace with your actual paths)
model_path = "AI-Model/diseaseDetection/Tomato_leaf_disease_detection_classification_ResNet50.h5"
image_path = "AI-Model/diseaseDetection/picture/1.jpg"  # Replace with your image path

# Load the saved model
model = load_model(model_path)

# Function to preprocess an image for prediction (assuming RGB image)
def preprocess_image(image_path):
    image = Image.open(image_path)
    image = image.resize((224, 224), resample=Image.BOX)
    img_array = np.array(image)
    return np.expand_dims(img_array, axis=0)  # Add batch dimension


# Load the image and preprocess it
image = preprocess_image(image_path)

# Make prediction
predictions = model.predict(image, verbose=False)

# Get the predicted class index (assuming higher index corresponds to higher class number)
predicted_class = np.argmax(predictions)

# (Optional) Define class labels if you have them
class_labels = {
    0: "Bacterial_spot",
    1: "Early_blight",
    2: "Late_blight",
    3: "Leaf_Mold",
    4: "Septoria_leaf_spot",
    5: "Spider_mites_Two-spotted_spider_mite",
    6: "Target_Spot",
    7: "Tomato_Yellow_Leaf_Curl_Virus",
    8: "Tomato_mosaic_virus",
    9: "Healthy",
}

# Print the predicted class
if class_labels:
    print(class_labels[predicted_class])
else:
    print(f"Predicted class index: {predicted_class}")
