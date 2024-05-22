import Constants from 'expo-constants';
import { AIO_KEY } from '../config/account';

const ADAFRUIT_HOST = 'https://io.adafruit.com/api/v2/';
const SERVER_HOST = Constants?.expoConfig?.hostUri
    ? 'http://' + Constants.expoConfig.hostUri.split(':').shift().concat(':8080') + '/api/'
    : 'myapi.com';

export async function get(host, path) {
    try {
        if (host == "server") {
            host = SERVER_HOST;
        } else if (host == "adafruit") {
            host = ADAFRUIT_HOST;
        } else {
            window.alert("Invalid host: " + host);
            return undefined;
        }

        const response = await fetch(host + path, {
            method: 'GET',
            headers: {  
            }
        });

        // return response;
        if (response.ok) {
            const json = await response.json();
            return json;
        }
        
        return response.text().then(text => { throw new Error(text); });
    } catch (error) {
        console.error('HTTP GET Failed: ' + error);
    }
}

export async function request(host, method, path, data) {
    try {
        if (host == "server") {
            host = SERVER_HOST;
        } else if (host == "adafruit") {
            host = ADAFRUIT_HOST;
            path += "?x-aio-key=" + AIO_KEY;
        } else {
            window.alert("Invalid host: " + host)
        }

        const response = await fetch (host + path, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // return response;
        if (response.ok) {
            const json = await response.json();
            return json;
        } 
        
        return response.text().then(text => { throw new Error(text); });
    } catch(error) {
        console.error('HTTP ' + method + ' Failed: ' + error);
    }
}

export async function upload(host, method, path, data) {
    try {
        if (host == "server") {
            host = SERVER_HOST;
        } else if (host == "adafruit") {
            host = ADAFRUIT_HOST;
            path += "?x-aio-key=" + AIO_KEY;
        } else {
            window.alert("Invalid host: " + host)
        }

        const response = await fetch (host + path, {
            method: method,
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: data
        });

        // return response;
        if (response.ok) {
            const json = await response.json();
            return json;
        } 
        
        return response.text().then(text => { throw new Error(text); });
    } catch(error) {
        console.error('HTTP ' + method + ' Failed: ' + error);
    }
}