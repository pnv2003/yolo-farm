export default function dump(value, message) {
    if (typeof value === 'object') {
        value = JSON.stringify(value)
    }
    console.log('Dumped[' + message + '] --> \n' + value);
}