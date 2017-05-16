const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiaiApp = require('apiai')("684570cb2e50427286e5a54e991e2093");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});


app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'tuxedo_cat') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

/* Handling all messenges */
app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }
});
/*function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: "EAADt9Yn6LC4BADVe8yHuMVP6XhpuvOxfyj2fKPddwZCKgV2aerj0iNDgJZCy3APyISU2C4t49hJzCZB3C7dbsdZBpZBazIJ3zPPDlD9penedxMi8frAa51nmVhF82Ex4vbqSfKQHJiA9mA08z4ZBsfnZCXbrSUGpcwS4ZCR6tOzJZBwZDZD"},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: text}
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
}*/
function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;
console.log('sdaf',text);
  let apiai = apiaiApp.textRequest(text, {
    sessionId: 'tabby_cat' // use any arbitrary id
  });

  
   /* apiai.on('response', (response) => {
  let aiText = response.result.fulfillment.speech;
console.log(aiText);
    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token:"EAADt9Yn6LC4BADVe8yHuMVP6XhpuvOxfyj2fKPddwZCKgV2aerj0iNDgJZCy3APyISU2C4t49hJzCZB3C7dbsdZBpZBazIJ3zPPDlD9penedxMi8frAa51nmVhF82Ex4vbqSfKQHJiA9mA08z4ZBsfnZCXbrSUGpcwS4ZCR6tOzJZBwZDZD"},
      method: 'POST',
      json: {
        recipient: {id: sender},
        message: {text: aiText}
      }
    }, (error, response) => {
      if (error) {
          console.log('Error sending message: ', error);
      } else if (response.body.error) {
          console.log('Error: ', response.body.error);
      }
    });
 });*/

/*   app.post('/ai', (req, res) => {
  if (req.body.result.action === 'reqblood') {
   let sid= req.body.sessionId;
      console.log(sid);
    let restUrl = 'https://api.api.ai/v1/contexts?sessionId='+sid;

      
      request.get(restUrl, {
  'auth': {
    'bearer': 'Basic 684570cb2e50427286e5a54e991e2093'
  }
},(err, response, body) => {
          
          console.log('response from context',response);
      });
      
   request.get(restUrl, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        let json = JSON.parse(body);
        let msg = json.weather[0].description + ' and the temperature is ' + json.main.temp + ' ℉';
        return res.json({
          speech: msg,
          displayText: msg,
          source: 'reqblood'});
      } else {
        return res.status(400).json({
          status: {
            code: 400,
            errorType: 'I failed to look up the city name.'}});
      }})
  }

  apiai.on('error', (error) => {
    console.log(error);
  });

  apiai.end();
})*/
}