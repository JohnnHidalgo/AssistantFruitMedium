'use strict';

// Importe el módulo Dialogflow desde la biblioteca de acciones en el cliente de Google.
const {
    dialogflow,
    Permission,
    Suggestions,
  } = require('actions-on-google');
// Importe el firebase-functions package para despliegue.
const functions = require('firebase-functions');

// Instancie el cliente de Dialogflow.
const app = dialogflow({debug: true});

// Mandar la dirección dspecífica del intento 'Fruta Compra'.
// La intención recoge el parámetro llamado 'Fruta'.


// Establecer el objeto DialogflowApp para manejar la solicitud POST de HTTPS.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new Permission({
      context: 'Hola, para conocerte mejor',
      permissions: 'NAME'
    }));
});

app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
    if (!permissionGranted) {
      conv.ask(`Ok, no te preocupes. Bienvenido! ¿Qué fruta desea comprar?`);
    } else {
      conv.data.userName = conv.user.name.display;
      conv.ask(`Gracias, ${conv.data.userName}. Bienvenido! ¿Qué fruta desea comprar?`);  
    }
});
  
app.intent('Fruta Compra', (conv, {Fruta}) => {
    const presio = Fruta.length;
    // Responde con el presio y finaliza la conversación.
    conv.close('El precio es ' + presio);   
});