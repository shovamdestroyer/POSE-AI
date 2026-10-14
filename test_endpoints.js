const http = require('http');

const urls = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/poseData.js',
  '/poseDetector.js',
  '/api/status'
];

async function testAll() {
  for (const url of urls) {
    await new Promise((resolve) => {
      http.get(`http://localhost:3000${url}`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          console.log(`[PASS] ${url} -> Status: ${res.statusCode}, Length: ${data.length} bytes, Type: ${res.headers['content-type']}`);
          resolve();
        });
      }).on('error', (err) => {
        console.error(`[FAIL] ${url} -> Error:`, err.message);
        resolve();
      });
    });
  }
}

testAll();
