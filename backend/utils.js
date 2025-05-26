const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

function generateRandomNumber() {
  return Math.floor(Math.random() * 100) + 1;
}

function getRandomJoke() {
  const jokesPath = path.join(__dirname, 'jokes', 'jokes.txt');
  const jokesContent = fs.readFileSync(jokesPath, 'utf8');
  const jokes = jokesContent.split('\n').filter(joke => joke.trim() !== '');
  
  if (jokes.length === 0) {
    return { question: 'No jokes available!', answer: '' };
  }
  
  const randomIndex = Math.floor(Math.random() * jokes.length);
  const selectedJoke = jokes[randomIndex];
  const [question, answer] = selectedJoke.split(' # ');
  
  return {
    question: question.trim(),
    answer: answer ? answer.trim() : ''
  };
}

function addNewJoke(question, answer) {
  const jokesPath = path.join(__dirname, 'jokes', 'jokes.txt');
  const newJoke = `${question.trim()} # ${answer.trim()}\n`;
  fs.appendFileSync(jokesPath, newJoke, 'utf8');
  return { success: true, message: 'Joke added successfully!' };
}

function getJokeInspiration() {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      "model": "llama-3.3-70b-versatile",
      "messages": [{
        "role": "user",
        "content": "Buatkan 3 jokes bapak-bapak Indonesia yang lucu dalam format: Pertanyaan # Jawaban. Contoh: Kenapa cicak bisa nempel di dinding? # Karena pakai lem cicak! Berikan hanya jokes saja tanpa penjelasan tambahan."
      }]
    });

    const options = {
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Length': data.length
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (parsed.choices && parsed.choices[0] && parsed.choices[0].message) {
            const content = parsed.choices[0].message.content;
            
            // Parse jokes into array format
            const jokeLines = content.split('\n').filter(line => line.trim() !== '' && line.includes('#'));
            const jokesArray = jokeLines.map(line => {
              const [question, answer] = line.split(' # ');
              return {
                question: question.trim(),
                answer: answer ? answer.trim() : ''
              };
            });
            
            resolve({ success: true, jokes: jokesArray });
          } else {
            resolve({ success: false, message: 'No response from AI' });
          }
        } catch (error) {
          reject({ success: false, message: 'Failed to parse response' });
        }
      });
    });

    req.on('error', (error) => {
      reject({ success: false, message: 'Request failed: ' + error.message });
    });

    req.write(data);
    req.end();
  });
}

module.exports = { generateRandomNumber, getRandomJoke, addNewJoke, getJokeInspiration };