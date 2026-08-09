import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
    addExpense,
    deleteExpense,
    downloadExpenseExcel,
    getAllExpenses, getExpenseOverview,
    updateExpense
} from "../controller/expenseController.js";


const expenseRoute = express.Router()

expenseRoute.post('/addexpense', authMiddleware, addExpense)
expenseRoute.get('/getallexpense', authMiddleware, getAllExpenses)
expenseRoute.put('/updateexpense/:id', authMiddleware, updateExpense)
expenseRoute.delete('/deleteexpense/:id', authMiddleware, deleteExpense)
expenseRoute.get('/downloadexcel', authMiddleware, downloadExpenseExcel)
expenseRoute.get('/getexpenceoverview', authMiddleware, getExpenseOverview)


export default expenseRoute