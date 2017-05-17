const express = require('express');
var uuid=require('uuid');
var app=express();
let session=uuid.v1();
const bodyParser = require('body-parser');

//var session = require('client-sessions');


const request = require('request');
const apiaiApp = require('apiai')("684570cb2e50427286e5a54e991e2093");
var name="",gender="",location="",age="",bloodgroup="",mobile="",altmobile="";
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var obj = require('./donor');
mongoose.connect('mongodb://localhost:27017/donors');

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
  //console.log(req.body);
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
function sendMessage(event) {
    
  let sender = event.sender.id;
  let text = event.message.text;
    var temp=JSON.stringify(text);
console.log(sender);
 
  let apiai = apiaiApp.textRequest(text, {
    sessionId: sender
  });

  apiai.on('response', (response) => {
    // Got a response from api.ai. Let's POST to Facebook Messenger
      let aiText = response.result.fulfillment.speech;
            if(aiText==="can you please mention your gender?")
                {
                name=temp;
                    
                    
                    
                }
      if(aiText==="where are you from?" || aiText==='can you please mention your location?' || aiText==='can you please tell me your location?' || aiText==='could you tell me where you live?')
      gender=temp;
      if(aiText==="what is your mobile number?" || aiText==='can you please tell your mobile no?')
      location=temp;
      if(aiText==="can you please tell your alternate number?" || aiText==='can you please tell your Land Line number?' || aiText==='do you have any other mobile number?')
      mobile=temp;
      if(aiText==="How old are you?" || aiText==='what is your age?' )
      altmobile=temp;
      if(aiText==="What's your Blood Group?" || aiText==='Can you please mention your Blood Group?' )
          age=temp;
      if(aiText==="please mention your email!")
      bloodgroup=temp;
      if(aiText==="please mention your email!")
      {
          
          var data={
              name:name,
              gender:gender,
              location:location,
              age:age,
              mobile:mobile,
              altmobile:altmobile,
              bloodgroup:bloodgroup,
              id:sender
          }
          console.log(data);
          obj.addDonor(data,function(err,data){
              if(data)
                  console.log("data entered successfully");
              else
                  console.log("error");
          })
          
      }
      

    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: "EAADt9Yn6LC4BADVe8yHuMVP6XhpuvOxfyj2fKPddwZCKgV2aerj0iNDgJZCy3APyISU2C4t49hJzCZB3C7dbsdZBpZBazIJ3zPPDlD9penedxMi8frAa51nmVhF82Ex4vbqSfKQHJiA9mA08z4ZBsfnZCXbrSUGpcwS4ZCR6tOzJZBwZDZD"},
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
  });

  apiai.on('error', (error) => {
    console.log(error);
  });

  apiai.end();
}