from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.naive_bayes import MultinomialNB
from sklearn.externals import joblib
import re
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from nltk.tokenize import word_tokenize
import numpy as np


# declare constants
PORT = 8081

# initialize flask application
app = Flask(__name__)
CORS(app, support_credentials=True)


stemmer = SnowballStemmer('english')
stop_words = stopwords.words('english')


@app.route('/api/train', methods=['POST'])
@cross_origin(supports_credentials=True)
def train():
    # get parameters from request
    parameters = request.get_json()

    # read iris data set
    df = pd.read_excel('C:/Users/Mohamed/Desktop/smartform/flaskbackend/DATA.xlsx', sheet_name='art_register')
    X = df.drop(columns=parameters['question'])
    df = pd.read_excel('C:/Users/Mohamed/Desktop/smartform/flaskbackend/DATA.xlsx', sheet_name='art_register')
    df['DISTRICT'] = df['DISTRICT'].astype('category').cat.codes
    df['FACILITY'] = df['FACILITY'].astype('category').cat.codes
    df['TC'] = df['TC'].astype('category').cat.codes
    df['OPDCLIN'] = df['OPDCLIN'].astype('category').cat.codes
    df['OWNER'] = df['SEX'].astype('category').cat.codes
    df['SEX'] = df['SEX'].astype('category').cat.codes
    df['FINSTAT'] = df['FINSTAT'].astype('category').cat.codes
    df['AGE'] = df['AGE'].astype('category').cat.codes
    X = np.asarray(df.drop(columns='AGE'))
    y = np.asarray(df[parameters['question']])
    # fit model
    clfMultinomialNB = MultinomialNB()
    clfMultinomialNB.fit(X, y)

    # persist model
    joblib.dump(clfMultinomialNB, 'model_nb.pkl')

    return jsonify({'accuracy': round(clfMultinomialNB.score(X, y) * 100, 2)})


@app.route('/api/predict', methods=['POST'])
@cross_origin(supports_credentials=True)
def predict():
    # get iris object from request
    X = request.get_json()
    X = pd.DataFrame(X, index=[0])
    X['district'] = X['district'].astype('category').cat.codes
    X['facility'] = X['facility'].astype('category').cat.codes
    X['tc'] = X['tc'].astype('category').cat.codes
    X['opdclin'] = X['opdclin'].astype('category').cat.codes
    X['owner'] = X['owner'].astype('category').cat.codes
    X['sex'] = X['sex'].astype('category').cat.codes
    X['finstat'] = X['finstat'].astype('category').cat.codes

    # read model
    clf = joblib.load('model_nb.pkl')
    probabilities = clf.predict_proba(X)

    return jsonify([{'name': '0-19', 'value': round(probabilities[0, 0] * 100, 2)},
                    {'name': '20-29', 'value': round(probabilities[0, 1] * 100, 2)},
                    {'name': '30-39', 'value': round(probabilities[0, 2] * 100, 2)},
                    {'name': '40-49', 'value': round(probabilities[0, 3] * 100, 2)},
                    {'name': '50-59', 'value': round(probabilities[0, 4] * 100, 2)},
                    {'name': '60+', 'value': round(probabilities[0, 5] * 100, 2)}],)


if __name__ == '__main__':
    # run web server
    app.run(debug=True,  # automatic reloading enabled
            port=PORT)
