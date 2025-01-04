// create web server
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const comments = [];
const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    if (pathname === '/comment') {
        comments.push(query);
        res.end(JSON.stringify(comments));
    } else {
        fs.readFile(path.join(__dirname, 'index.html'), (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/plain'
                });
                res.end('Not Found');
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            }
        });
    }
});

server.listen(3000, () => {
    console.log('Server is running...');
});