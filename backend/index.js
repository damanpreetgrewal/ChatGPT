const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
const sampleData = require('./SampleData');

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.post('/', async (req, res) => {
  const { message, currentModel, temperature, max_tokens } = req.body;

  console.log(sampleData);

  let prePrompt =
    'I am a highly intelligent question answering PwC bot. If you ask me a question that is rooted in truth, I will give you the answer.';
  sampleData.forEach(obj => {
    prePrompt += 'Q :' + obj.Q + '\n' + 'A :' + obj.A + '\n\n';
  });

  console.log(prePrompt);

  const requestObj = {
    model: `${currentModel}`, //"text-davinci-003",
    prompt: `${prePrompt} ${message}\n`,
    max_tokens,
    temperature,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  console.log('Request Sent : ', requestObj);

  const response = await openai.createCompletion(requestObj);

  console.log('Last Response: ', response.data.choices[0]);

  res.json({
    message: response.data.choices[0].text,
  });
});

//Get Models Route
app.get('/models', async (req, res) => {
  const response = await openai.listEngines();
  res.json({ models: response.data });
});

//Serve Frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

app.listen(port, () => {
  console.log(`ChatGPT Server listening at ${port}`);
});

module.exports = app;
