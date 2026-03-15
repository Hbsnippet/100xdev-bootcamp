const http = require("http");

let todos = [];
let idCounter = 1;

const server = http.createServer((req, res) => {

    if (req.method === 'GET' && (req.url === '/' || req.url.startsWith('/?'))) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello World');

    } else if (req.method === 'POST' && req.url === "/create/todo") {
        let body = '';
        req.on('data', chunk => { body += chunk });
        req.on('end', () => {
            const data = JSON.parse(body);
            const newTodo = {
                id: idCounter++,
                title: data.title,
                description: data.description
            }
            todos.push(newTodo);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(todos));
        });

    } else if (req.method === 'GET' && req.url === '/todos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos));

    } else if (req.method === 'GET' && req.url.startsWith('/todo')) {
        const url = new URL(req.url, 'http://localhost:3000');
        const id = parseInt(url.searchParams.get('id'));
        const todo = todos.find(t => t.id === id);
        if (todo) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(todo));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Todo not found" }));
        }

    } else if (req.method === 'DELETE' && req.url.startsWith('/todo')) {
        const url = new URL(req.url, 'http://localhost:3000');
        const id = parseInt(url.searchParams.get('id'));
        const todoIndex = todos.findIndex(t => t.id === id);
        if (todoIndex !== -1) {
            todos.splice(todoIndex, 1);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: "Todo deleted" }));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: "Todo not found" }));
        }

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(3000);