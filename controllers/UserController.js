import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import UserModel from '../models/User.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';



export const registerUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullName, email, password } = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new UserModel({
            fullName,
            email,
            passwordHash
        })

        const user = await newUser.save();

        const token = jwt.sign(
            {
                _id: user._id,
            }, 'secret878',
            {
                expiresIn: '30d'
            }
        )



        res.json({
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'не удалось зарегистрироваться',
        })
    }
}


export const loginUser = async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if (!isValidPass) {
            return res.status(404).json({
                message: 'Неверный пароль или Логин',
            })
        }

        const token = jwt.sign(
            {
                _id: user._id,
            },
            'secret878',
            {
                expiresIn: '30d',
            }

        );

        res.json({
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        })
    }

}


export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден'
            })
        }
        res.json({
            token: req.token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
            }
        })
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет',
        })
    }
}