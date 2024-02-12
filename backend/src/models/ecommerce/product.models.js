import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
        default: 0
      },
      quantity: {
        type: Number,
        min: 0,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
      images: [{
        type: String,
      }],
      owner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      status:{
        type: String,
        enum:["enabled", "disabled", "out_of_stock"],
        default: "enabled"
      }
}, {timestamps: true});

export const Product = mongoose.model("Product", productSchema)