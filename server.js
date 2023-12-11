const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // 读取要展示的 HTML 文件
    const filePath = path.join(__dirname, 'index.html'); // 假设要展示的 HTML 文件名为 index.html
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});

const PORT = process.env.PORT || 3000; // 设置服务器端口号
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
