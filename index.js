#!/usr/bin/env node
const { program } = require('commander');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Configure command line arguments
program
  .option('-i, --input <path>', 'Path to the secrets JSON file')
  .option('-o, --output [path]', 'Path to the output .env file')
  .parse();

// Parse command line arguments
const options = program.opts();

// Validate the input path
if (!options.input) {
  console.error('Please provide the path to the secrets JSON file using the --input or -i argument');
  process.exit(1);
}

// Resolve output path
const outputPath =
  options.output
    ? options.output.endsWith('/')
      ? `${options.output}.env`
      : path.extname(options.output) === '.env'
        ? options.output
        : `${options.output}.env`
    : path.resolve(path.dirname(options.input), `${path.basename(options.input, '.json')}.env`);

// Check if the output file exists and prompt the user to continue
function checkFileExistsAndPrompt(outputPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(outputPath)) {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });

      const relativePath = path.relative(process.cwd(), outputPath);
      rl.question(`The file ${relativePath} already exists. Do you want to overwrite it? (y/n) `, (answer) => {
        rl.close();

        if (answer.toLowerCase() === 'y') {
          resolve(true);
        } else {
          console.log('Operation canceled.');
          resolve(false);
        }
      });
    } else {
      resolve(true);
    }
  });
}

// Load secrets from the JSON file
const secrets = require(path.resolve(options.input));

// Convert the secrets to a string
function convertToEnv(obj, prefix = '') {
  return Object.entries(obj).reduce((env, [key, value]) => {
    key = key.replace(/:/g, '__'); // Replace colons with underscores
    if (typeof value === 'object') {
      return env + convertToEnv(value, `${prefix}${key}__`);
    } else {
      return env + `${prefix}${key}=${value}\n`;
    }
  }, '');
}

// Write the string to the output file and log the output file path
(async function () {
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
})();

module.exports = {
  convertToEnv,
}
