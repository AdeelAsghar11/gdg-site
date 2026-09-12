import fs from 'fs';

const text = fs.readFileSync('C:\\Users\\Itcomplex\\.gemini\\antigravity-ide\\brain\\3acd08d1-a231-4a3f-907c-f83d7637e146\\.system_generated\\logs\\transcript_full.jsonl', 'utf8');
const lines = text.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"step_index":291')) {
    console.log(lines[i]);
  }
  if (lines[i].includes('"step_index":296')) {
    console.log(lines[i]);
  }
}
