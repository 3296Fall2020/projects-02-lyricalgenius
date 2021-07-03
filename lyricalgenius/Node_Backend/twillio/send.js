const axios = require('axios');
const accountSid = 'AC63b06e4639b7e40090487af06a833f2f';
const authToken = '3e8d42292039114ecdc0e7d2d0982a5b';
const fromSMS = '+12055966060';
const fromWA = 'whatsapp:+14155238886';
const client = require('twilio')(accountSid, authToken);

// Send text sms
function sendSMS(number, messages){
    messageStatus = [];
    messages.forEach(message =>{
        client.messages
        .create({
            body: message,
            from: fromSMS,
            to: '+1' + number
        })
        .then(response => {
            messageStatus.push(true);
        })
        .catch(error => {
            messageStatus.push(false);
        })
    });
    return messageStatus;
}


//Send text whatsapp
function sendWA(number, messages){
    messageStatus = [];
    messages.forEach(message =>{
        client.messages
        .create({
            from: fromWA,
            body: message,
            to: 'whatsapp:+1' + number
        })
        .then(response => {
            messageStatus.push(true);
        })
        .catch(error => {
            messageStatus.push(false);
        });
    });
    return messageStatus;
}

module.exports = { sendSMS, sendWA };