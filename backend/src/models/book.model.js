import mongoose, {Schema} from "mongoose";
import { DB_NAME } from "../constants.js";

const bookSchema = new Schema({
    bookName:{
        type: String,
        required: true
    },
    bookDescription: {
        type: String,
      },
    price: {
        type: Number,
        required: true
      },
    author:{
        type: String,
        required: true
    },
    bookLanguage:{
        type: String,
        required: true
    },
    genre:{
        type:String
    },
    originallyPublished:{
        type: Date
    },
    status:{
        type: String,
        enum: ['enable', 'disable'],
        default: 'enable'
    }
}, {timestamps: true});

export const Book = mongoose.model("Book", bookSchema)