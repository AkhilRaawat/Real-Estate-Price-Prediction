import pickle
import json
import numpy as np
import os
__locations = None
__data_columns = None
__model = None

def get_estimated_price(location,sqft,bhk,bath):
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = sqft
    x[1] = bath
    x[2] = bhk
    if loc_index>=0:
        x[loc_index] = 1

    return round(__model.predict([x])[0],2)


def load_saved_artifacts():
    print("Loading saved artifacts...start")
    global __data_columns, __locations, __model

    # Define paths
    columns_path = os.path.join(os.path.dirname(__file__), "Artifacts", "columns.json")
    model_path = os.path.join(os.path.dirname(__file__), "Artifacts", "banglore_home_prices_model.pickle")

    # Check loading JSON
    try:
        with open(columns_path, "r") as f:
            __data_columns = json.load(f)['data_columns']
            __locations = __data_columns[3:]  # first 3 columns are sqft, bath, bhk
        print("Data columns loaded successfully")
    except Exception as e:
        print(f"Error loading columns.json: {e}")
        return

    # Check loading model
    try:
        with open(model_path, 'rb') as f:
            __model = pickle.load(f)
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error loading model pickle file: {e}")
        return

    print("Loading saved artifacts...done")
def get_location_names():
    return __locations

def get_data_columns():
    return __data_columns

if __name__ == '__main__':
    load_saved_artifacts()
    print("Locations:", get_location_names())
    print("Sample prediction:", get_estimated_price('1st Phase JP Nagar', 1000, 3, 3))
