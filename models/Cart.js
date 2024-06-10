import mongoose from "mongoose";


const CartShema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    categories: {
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },

    totalSize: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    }


})


export default mongoose.model('Cart', CartShema)