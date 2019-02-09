'use strict';

// Importe el módulo Dialogflow desde la biblioteca de acciones en el cliente de Google.
const {dialogflow} = require('actions-on-google');

// Importe el firebase-functions package para despliegue.
const functions = require('firebase-functions');

// Instancie el cliente de Dialogflow.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'favorite color'.
// La intención recoge un parámetro llamado 'Fruta'.
app.intent('Fruta Compra', (conv, {Fruta}) => {
    const presio = Fruta.length;
    // Responde con el presio y finaliza la conversación.
    conv.close('El precio es ' + presio);
});

// Establecer el objeto DialogflowApp para manejar la solicitud POST de HTTPS.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
