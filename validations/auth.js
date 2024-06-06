import { body } from "express-validator";

export const registerValidationUsers = [
    body('email', 'Нерерный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
    body('fullName', 'Укажите имя').isLength({ min: 3 }),
]


export const loginValidationUsers = [
    body('email', 'Нерерный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 3 }),
]

export const productsValidation = [
    body('title', 'Название товара').isLength({min: 2}).isString(),
    body('price', 'Введите цену').isLength({min: 1}),
    body('categories', 'Введите categories').isString(),

]