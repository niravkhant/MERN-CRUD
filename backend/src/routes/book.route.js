import {Router} from "express";
import { Book } from "../models/book.model.js"
import { addBook, getBooks } from "../controllers/book.controller.js";

const router = Router();


router.route("/addbook").post(addBook);

router.route("/books").get(getBooks);

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

