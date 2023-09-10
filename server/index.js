import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

// import connectDB from './mongodb/connect.js';
import mongoose from 'mongoose';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

const uri = `mongodb://0.0.0.0:27017`;

// app
dotenv.config();

// db
mongoose.set('strictQuery', true);

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("DB CONNECTION ERROR", err));

// Initialize express application
const app = express();
app.use(cors()); // add addtional middlerware
app.use(express.json({ limit: '50mb' }));
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

app.get('/', async (req, res) => {
    res.send("Hello from Imaginate!");
})

// port
const port = process.env.PORT || 8080;

// listener
const server = async () => {
    app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`))
};

// If server not run
process.on("unhandledRejection", (err) => {
    console.log("error", err.message);
    server.close(() => {
        process.exit();
    })
});

server();