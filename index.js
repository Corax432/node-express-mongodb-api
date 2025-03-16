const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { swaggerUi, specs } = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://db:27017/mydatabase";
console.log(`🟢 Connecting to MongoDB at ${MONGO_URI}`);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', err => console.error('❌ MongoDB connection error:', err));
db.once('open', () => {
    console.log('✅ Connected to MongoDB');
});

const itemsRouter = require('./routes/items');
const ordersRouter = require('./routes/orders');

app.use('/items', itemsRouter);
app.use('/orders', ordersRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📄 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
