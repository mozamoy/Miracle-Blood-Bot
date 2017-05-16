<Pre Documentation>:


<API.AI> is a platform for building conversational interfaces for bots, applications, and devices.
 Your app / bot / device code provides the input and output methods and responds to actionable data. You can also provide an optional webhook implementation which API.AI uses to connect to your web service. Your web service can then perform business logic, call external APIs, or access data stores.

<for more go through 'https://docs.api.ai/docs/key-concepts'>
-------
Day 1:
-------
Trained the Chat Bot with the  API.AI 

In order to create a Bot we need to have three Feautures :
----------------------------------------------------------
1.Agent
2.Entity
3.Intent

1.<AGENT>:
-------------------------------------------------------------------------------------------------------------------------------------------------
An agent is a 'workspace' in apiai .Agents can be described as NLU (Natural Language Understanding) modules for applications. Their purpose is to transform natural user language into actionable data.

<for more go through 'https://docs.api.ai/docs/concept-agents'> 

2.<ENTITY>:
-------------------------------------------------------------------------------------------------------------------------------------------------
Entities represent concepts and serve as a powerful tool for extracting parameter values from natural language inputs.

The entities that are used in a particular agent will depend on the parameter values that are expected to be returned as a result of agent functioning. In other words, a developer need not create entities for every concept mentioned in the agent – only for those required for actionable data.

for more go through 'https://docs.api.ai/docs/concept-intents'

There are 3 types of entities: system (defined by API.AI), developer (defined by a developer), and user (built for each individual end-user in every request) entities. Furthermore, each of these can be mapping (having reference values), enum type (having no reference values), or composite (containing other entities with aliases and returning object type values).

<for more go through 'https://docs.api.ai/docs/concept-entities'>

3.<INTENT>
-------------------------------------------------------------------------------------------------------------------------------------------------
Intents are developer-defined components of agents, whereas domains are pre-defined knowledge packages that can be enabled or disabled in each particular agent.
-------------------------------------------------------------------------------------------------------------------------------------------------
<USAGE
Created an Agent Called BloodBot , Created Entities for 'PersonBloodGroup' & 'Person_Gender', Create two Intents one is  'Requestblood' and another one is 'Donateblood'

In each Intent we created and maintained context with questions such as 

What is your name?
What is your gender?
what is your city?
what is your blood group? 
for the intent request Blood & stored the responses in the variable name so that we can further access those variables in further process to get the responses data.

These questions can only be called only when we make the context required and it can only be asked through  Prompts which are the end of the each parametre

and created context for the intent 'request blood' in the same manner .

Finally the context is trained in the 'try it out' feature in the API.AI


Integrated  API.AI with FACEBOOK using API Keys-<Client Access Token> 
<Integration of bot with Facebook
The process of integration includes the 'Creation of an App' in the page 'Devolopers.facebook.com'
and then we can copy the API Keys in the 'Webhook' of our app in Devolopers.facebook.com and then Directly Connect with the API.AI Bot in the Facebook and We can chat with it.it will give the responses as we mentioned in the intents context.

for more go through 'https://docs.api.ai/docs/facebook-integration'>

Day 2:
<Facebook connectivity using node 

In order connect we should use 'Webhooks' and we should use 'get' method to recieve the text messaged from facebook and 'post' method to post the responses to the facebook>

<For Creating a Server Connection>

<'const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});
'

For 'get'and 'post':

'app.get('/webhook', (req, res) => {
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
});'


for more go through 'file:///G:/Creating%20a%20Simple%20Facebook%20Messenger%20AI%20Bot%20with%20API.ai%20in%20Node.js%20%E2%80%93%20GirlieMac%20Blog.html'

Connected to Database & Stored the responses data from the User in the Database

Got the data from the Facebook and stored them into variables and stored them in to the Database
Created a Schema for the database

go throught this Github Link for more ''