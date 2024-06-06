import express from 'express';
import mongoose from 'mongoose';
import { loginValidationUsers, registerValidationUsers } from './validations/auth.js';
import multer from 'multer';
import { getMe, loginUser, registerUser } from './controllers/UserController.js'
import checkAuth from './utils/checkAuth.js';
import { addProducts, productsChanged, productsDelet } from './controllers/ProductsController.js';

mongoose.connect('mongodb+srv://samandarsaidahmadov98:8787172ss@cluster0.soqylcu.mongodb.net/megaShops').then(() => {
    console.log('DB ok');
}).catch((err) => console.log('DB', err))

const app = express();

app.use(express.json());

app.use('/uploads', express.static('uploads'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

const upload = multer({ storage: storage });


app.get('/', (req, res) => {
    res.send('hello world111 !')
})



app.post('/products', checkAuth, upload.single('image'), addProducts)

app.post('/auth/register', registerValidationUsers, registerUser)

app.post('/auth/login', loginValidationUsers, loginUser)

app.get('/auth/me', checkAuth, getMe);

app.delete('/products/:id', checkAuth, productsDelet)


app.put('/products/:id', checkAuth, upload.single('image'), productsChanged);



app.listen(7777, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});
