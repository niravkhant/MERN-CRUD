import mongoose from "mongoose";
import { Book } from "../models/book.model.js";
import {  format } from "date-fns";

const curd = new Date();
const today = format(curd, "yyyy-MM-dd");

const addBook = async(req, res)=>{
    const {bookName, bookDescription, price, author, bookLanguage, genre } = req.body
    try {
        const newBook = new Book({
            bookName,
            bookDescription,
            price,
            author,
            bookLanguage,
            genre,
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
const getSingleBook = async(req, res)=>{
    try {
        const books = await Book.findById(req.params.id)
        res.status(200).json(books)
    } catch (error) {
        res.status(501).json({"Server Error in GET Single BOOKS" : error})
    }
}

export {addBook, getBooks, getSingleBook};