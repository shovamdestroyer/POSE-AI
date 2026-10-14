const http = require('http');

const samplePayload = JSON.stringify({
  image: "data:image/jpeg;base64,/9j/4AAQSkZJRg==",
  mode: "solo",
  outfit: "formal",
  style: "professional"
});

const req = http.request({
  hostname: 'localhost',
  port: 3000,
  path: '/api/analyze-pose',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(samplePayload)
  }
}, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(`[PASS] /api/analyze-pose response status: ${res.statusCode}`);
    console.log(`Response Body:`, JSON.parse(data));
  });
});

req.on('error', (err) => {
  console.error('[FAIL] API call error:', err.message);
});

req.write(samplePayload);
req.end();
