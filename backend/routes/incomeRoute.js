import express from "express"
import authMiddleware from "../middleware/auth.js"
import {
    addIncome,
    deleteIncome,
    downloadIncomeExcel,
    getAllIncome, getIncomeOverview,
    updateIncome
} from "../controller/incomeController.js"

const incomeRouter = express.Router()

incomeRouter.post('/addincome', authMiddleware, addIncome)
incomeRouter.get('/getallincome', authMiddleware, getAllIncome)
incomeRouter.put('/update/:id', authMiddleware, updateIncome)
incomeRouter.delete('/delete/:id', authMiddleware, deleteIncome)
incomeRouter.get('/downloadexcel',authMiddleware,downloadIncomeExcel)
incomeRouter.get("/overview", authMiddleware,getIncomeOverview)


export default incomeRouter