import Products from "../models/Products.js";
import fs from 'fs'
import path from "path";


export const addProducts = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        const { title, price, categories } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const newProduct = new Products({
            title,
            price,
            categories,
            imageUrl
        })

        const savedProduct = await newProduct.save();

        res.status(201).json(savedProduct);


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось добавит'
        })
    }

}


export const productsDelet = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Products.findById(productId)

        if (!product) {

            return res.status(404).json({
                message: 'Продукт не найден'
            })

        }

        if (product.imageUrl) {
            const imagePath = path.join(path.resolve(), product.imageUrl)
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log('Ошибка при удалении файла:', err);
                }
            })
        }


        await Products.findByIdAndDelete(productId);

        res.status(200).json({
            message: 'Продукт успешно удалён'
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить продукт'
        })
    }
}


export const productsChanged = async (req, res) => {

    try {

        const productId = req.params.id;
        const product = await Products.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: 'Продукт не найден'
            });
        }

        const { title, price, categories } = req.body;
        let imageUrl = product.imageUrl;

        if (req.file) {
            if (product.imageUrl) {
                const oldImagePath = path.join(path.resolve(), product.imageUrl)
                fs.unlink(oldImagePath, (err) => {
                    if (err) {
                        console.log('Ошибка при удалении старого файла:', err);
                    }
                });
            }
            imageUrl = `/uploads/${req.file.filename}`;  
        }
         
        const updatedProduct = await Products.findByIdAndUpdate(
            productId,
            {title, price, categories, imageUrl},
            {new: true}
        );
        
        res.status(200).json(updatedProduct)
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось обновить продукт'
        })
    }
}