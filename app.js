const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: process.env.NODE_ENV === 'production' ? false : '*',
        methods: ['GET', 'POST']
    }
});

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Health check endpoint for deployment platforms
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on('Send-location', (data) => {
        try {
            io.emit('Receive-location', { id: socket.id, ...data });
        } catch (error) {
            console.error('Error broadcasting location:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
        io.emit('User-disconnected', { id: socket.id });
    });

    socket.on('error', (error) => {
        console.error('Socket error:', error);
    });
});

app.get('/', (req, res) => {
    res.render('index');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});