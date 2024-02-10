import express from "express";
import { Book } from "../models/book.model.js"
import {  format } from "date-fns";

const router = express.Router();

const curd = new Date();
const today = format(curd, "yyyy-MM-dd")

router.post('/addbook', async(req, res)=>{
    try {
        const newBook = new Book({
            bookName: req.body.bookName,
            bookDescription: req.body.bookDescription,
            price: req.body.price,
            author:req.body.author,
            bookLanguage: req.body.bookLanguage,
            genre:req.body.genre,
            originallyPublished:today,
        })
    
        const saveBook = await newBook.save()
        res.json(saveBook);
    } catch (error) {
        console.log('Error 404 in Book Create', error);
    }
})

router.get("/books", async(req, res)=>{
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({"Server Error in GET BOOKS" : error})
    }
})
router.get("/books/:id", async(req, res)=>{
    try {
        const books = await Book.findById(req.params.id)
        res.status(200).json(books)
    } catch (error) {
        res.status(501).json({"Server Error in GET Single BOOKS" : error})
    }
})
router.put("/updatebook/:id", async(req, res)=>{
    try {
        const books = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        )
        res.status(200).json(books)
    } catch (error) {
        res.status(501).json({"Server Error in Update Single BOOKS" : error})
    }
})
router.delete("/deletebook/:id", async(req, res)=>{
    try {
        const books = await Book.findByIdAndDelete(req.params.id)
        res.status(200).json(books)
    } catch (error) {
        res.status(502).json({"Server Error in Delete Single BOOKS" : error})
    }
})

export default router;

