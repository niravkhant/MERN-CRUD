import mongoose from "mongoose";
import { Book } from "../models/book.model.js";
import {  format } from "date-fns";

const curd = new Date();
const today = format(curd, "yyyy-MM-dd");

const addBook = async(req, res)=>{
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
}

const getBooks = async(req, res)=>{
    try {
        const books = await Book.find()
        res.status(200).json(books)
    } catch (error) {
        res.status(500).json({"Server Error in GET BOOKS" : error})
    }
}

export {addBook, getBooks}