const SERVER_HOST = 'http://192.168.237.192:8080/api/';
const ADAFRUIT_HOST = 'https://io.adafruit.com/api/v2/';

export async function sendGetRequest(host, path, errorMessage) {
    try {
        if (host == "server") {
            host = SERVER_HOST;
        } else if (host == "adafruit") {
            host = ADAFRUIT_HOST;
        } else {
            window.alert("Invalid host: " + host)
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
        
        window.alert('GET Request failed: ' + errorMessage);
        return undefined;
    } catch (error) {
        console.error('Cannot send GET request:' + error);
    }
}

export async function sendRequest(method, path, data, errorMessage) {
    try {
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
        
        window.alert( method + ' request failed: ' + errorMessage);
        return undefined;
    } catch(error) {
        console.error('Cannot send ' + method + ' request: ' + error);
    }
}