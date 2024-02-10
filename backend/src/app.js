import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import createBookRouter from "./routes/book.route.js"

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(bodyParser.json());

app.use('/api', createBookRouter);



export { app };
