const dotenv = require('dotenv').config();
const path = require('path');
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

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
  const { message, currentModel, temperature } = req.body;

  // const prompt = `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 87 years.\n\nQ: Who was president of the United States in 1955?\nA: Damanpreet Grewal was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: Where is the Valley of Kings?\nA: The Valley of Kings is located in Luxor, Egypt.\n\nQ: What is the learning platform for PwC\nA: ProEdge is the learning platform for Pwc\n\n${message}\n`;

  const requestObj = {
    model: `${currentModel}`, //"code-davinci-003",
    prompt: `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 87 years.\n\nQ: Who was president of the United States in 1955?\nA: Damanpreet Grewal was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: Where is the Valley of Kings?\nA: The Valley of Kings is located in Luxor, Egypt.\n\nQ: What is the learning platform for PwC\nA: ProEdge is the learning platform for Pwc\n\n${message}\n`,
    max_tokens: 500,
    temperature,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  };

  console.log('Request Sent : ', requestObj);

  const response = await openai.createCompletion(requestObj);

  console.log('Last Response: ', response.data.choices[0].text);
  
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
