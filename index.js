#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');

// Configure command line arguments
program
  .option('-o, --output [path]', 'Path to the output .env file')
  .option('-f, --force', 'Overwrite the output file without prompting')
  .option('-b64, --base64', 'Encode the output file values as base64')
  .option('-v, --version', 'Output the version number')
  .parse();


// Parse command line arguments
const options = program.opts();

if (options.version) {
    console.log('1.0.1');
    process.exit(0);
}

// Resolve output path
const outputPath =
  options.output
    ? options.output.endsWith('/')
      ? `${options.output}.env`
      : path.extname(options.output) === '.env'
        ? options.output
        : `${options.output}.env`
    : path.resolve(process.cwd(), 'secrets.env');

// Check if the output file exists and prompt the user to continue
function checkFileExistsAndPrompt(outputPath) {
  return new Promise((resolve, _reject) => {
    if (fs.existsSync(outputPath)) {
      if (options.force) {
        resolve(true);
      } else {
        const relativePath = path.relative(process.cwd(), outputPath);
        console.log(`The file ${relativePath} already exists. Please use the --force flag to overwrite it.`);
      }
    } else {
      resolve(true);
    }
  });
}


// Convert the input to a JSON object
function parseInput(input) {
  const lines = input.split('\n').filter((line) => line.trim() !== '');
  const secrets = {};

  for (const line of lines) {
    const [key, value] = line.split(' = ').map((str) => str.trim());
    secrets[key.replace(/:/g, '__')] = options.base64
      ? Buffer.from(value).toString('base64')
      : value;
  }

  return secrets;
}

// Convert the secrets to a string
function convertToEnv(obj) {
  return Object.entries(obj).reduce((env, [key, value]) => {
    return env + `${key}=${value}\n`;
  }, '');
}

// Read input from stdin
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => {
  input += chunk;
});

// Write the output to the output file and log the output file path
process.stdin.on('end', async () => {
  const secrets = parseInput(input);
  const proceed = await checkFileExistsAndPrompt(outputPath);

  if (proceed) {
    // Create the output directory if it doesn't exist
    const outputDir = path.dirname(outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const env = convertToEnv(secrets);
    fs.writeFileSync(outputPath, env);
    console.log(`Secrets written to ${path.relative(process.cwd(), outputPath)}`);
  }
});

module.exports = {
  convertToEnv,
}
