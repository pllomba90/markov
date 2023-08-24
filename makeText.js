/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios'); 

const MarkovMachine = require('./markov'); 

const args = process.argv.slice(2);

if (args.length !== 2) {
  console.log('Usage: node makeText.js <file/url> <input>');
  process.exit(1);
}

const sourceType = args[0];
const source = args[1];

async function getTextFromSource(sourceType, source) {
  try {
    if (sourceType === 'file') {
      return fs.readFileSync(source, 'utf-8');
    } else if (sourceType === 'url') {
      const response = await axios.get(source);
      return response.data;
    } else {
      throw new Error('Invalid source type. Use "file" or "url".');
    }
  } catch (error) {
    console.error('Error reading source:', error.message);
    process.exit(1);
  }
}

async function generateText() {
  const text = await getTextFromSource(sourceType, source);
  const mm = new MarkovMachine(text);
  const generatedText = mm.makeText();
  console.log(generatedText);
}

generateText();

