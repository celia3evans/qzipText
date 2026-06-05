const http = require('http');
const fs = require('fs');
const path = require('path');

const mime = { '.html': 'text/html', '.ttf': 'font/ttf' };

http.createServer((req, res) => {
  const file = req.url === '/' ? '/index.html' : req.url;
  const ext = path.extname(file);
  const filePath = path.join(__dirname, file);
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) { res.writeHead(404); res.end(); return; }
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  });
}).listen(7373, () => console.log('Listening on http://localhost:7373'));
