# Start a local web server to view the Path2AGI site
# Opens the page automatically in your default browser

$port = 8080
$url = "http://localhost:$port"

Write-Host "Path2AGI Server starting at $url" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor DarkGray

# Try to open in browser
Start-Process $url

# Start Python HTTP server (try python3 first, then python)
try {
    $node = Get-Command node -ErrorAction SilentlyContinue
    if ($node) {
        # Use a quick node http server
        $script = @"
const http = require('http');
const fs = require('fs');
const path = require('path');
const extTypes = {
    '.html': 'text/html; charset=utf-8',
    '.md': 'text/markdown; charset=utf-8',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
};
http.createServer((req, res) => {
    let filePath = '.' + (req.url === '/' ? '/index.html' : decodeURIComponent(req.url));
    const ext = path.extname(filePath);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Not found');
            return;
        }
        res.writeHead(200, { 'Content-Type': extTypes[ext] || 'text/plain' });
        res.end(data);
    });
}).listen($port, () => {
    console.log('Server running at $url');
});
"@
        node -e $script
    } else {
        python -m http.server $port --bind 127.0.0.1
    }
} catch {
    Write-Host "Could not start server. Install Python or Node.js, or use any static file server." -ForegroundColor Yellow
    Write-Host "Alternatively, just open index.html directly in your browser." -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
}
