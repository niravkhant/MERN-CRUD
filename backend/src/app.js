import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))

app.use(bodyParser.json());


// routes

app.get("/", (req, res)=>{
    res.send(`<div style="display: flex; flex-wrap: wrap; justify-content: center; width: 100%; height: 90vh; background-color: azure;">
    <h1 class="ddd" style="width: 100%;">Server is Running</h1>
    <div>
        <button style="padding: 10px; border: none; background-color: yellowgreen;"><a href="/api/books" style="color: black; text-decoration: none;">View Books</a></button>
    </div>
</div>`)
})
// routes import

import createBookRouter from "./routes/book.route.js"
import userRouter from "./routes/ecommerce/user.routes.js"

// routes declaration
app.use('/api', createBookRouter);

app.use('/api/users', userRouter)
// /api/users/register

export { app };
