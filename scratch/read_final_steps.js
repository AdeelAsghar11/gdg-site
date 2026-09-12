const fs = require('fs');
const readline = require('readline');

async function readSteps() {
  const rl = readline.createInterface({
    input: fs.createReadStream('C:\\Users\\Itcomplex\\.gemini\\antigravity-ide\\brain\\d240935b-f18f-4e66-a395-03a660bfff96\\.system_generated\\logs\\transcript.jsonl')
  });

  for await (const line of rl) {
    const obj = JSON.parse(line);
    if (obj.step_index >= 180 && obj.type === 'PLANNER_RESPONSE' && obj.content) {
      console.log(`Step ${obj.step_index}:`, obj.content);
    }
  }
}

readSteps();
