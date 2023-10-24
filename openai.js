const OpenAI = require('openai');
const express = require('express');
require('dotenv').config();
const openAIApiKey = process.env.OPENAI_API_KEY;
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
const port = 3000 ;

app.use(bodyParser.json());

app.post('/api/openai', async (req, res) => {
  const requestData = req.body;
  const prompt = req.body.prompt;
  const output = await main(prompt); // Wait for the main function to complete
  console.log(output);
  res.json({ output: output }); // Return the output as a string
});

const openai = new OpenAI({
  apiKey: openAIApiKey,
});

async function main(input) {
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: `${input}`,
    temperature: 1.00,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  const text = response.choices[0].text;
  console.log(text);
  return text; 
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
