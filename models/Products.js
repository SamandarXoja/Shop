import mongoose from "mongoose";


const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        // required: true
    },
    categories: {
      type: String,
      required: true 
    },

    imageUrl: String


})


export default mongoose.model('Product', ProductsSchema)