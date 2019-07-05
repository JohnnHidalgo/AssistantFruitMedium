'use strict';

const {
    dialogflow,
    Permission,
    Suggestions,
  } = require('actions-on-google');

const functions = require('firebase-functions');

const app = dialogflow({debug: true});
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
      conv.ask(new Suggestions('mandarina', 'naranja', 'sandía'));
    } else {
      conv.data.userName = conv.user.name.display;
      conv.ask(`Gracias, ${conv.data.userName}. Bienvenido! ¿Qué fruta desea comprar?`);
      conv.ask(new Suggestions('mandarina', 'naranja', 'sandía'));
    }
});
  
app.intent('Fruta Compra', (conv, {Fruta}) => {
    const presio = Fruta.length;
    conv.close('El precio es ' + presio);   
});


