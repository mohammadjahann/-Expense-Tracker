import Income from '../models/incomeModel.js'
import XLSX from 'xlsx'
import getDataRange from "../utils/dataFilter.js";

// Add income

export const addIncome = async (req, res) => {

    const userId = req.user._id

    const { description, amount, date, category } = req.body

    if (!description || !amount || !date || !category) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    try {

        const newIncome = new Income({
            userId,
            description,
            amount,
            date: new Date(date),
            category
        })

        await newIncome.save()

        res.json({
            success: true,
            message: "Income added successfully!"
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        })


    }
}

// Get all incomes 

export const getAllIncome = async (req, res) => {

    const userId = req.user._id

    try {

        const incomes = await Income.find({ userId }).sort({ date: -1 })

        res.json({
            success: true,
            incomes
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        })

    }

}

// Update income

export const updateIncome = async (req, res) => {
    const { id } = req.params
    const userId = req.user._id
    const { description, amount } = req.body;

    try {

        const updatedIncome = await Income.findOneAndUpdate({
            _id: id, userId
        }, {
            description, amount
        }, {
            returnDocument: 'after'
        })

        if (!updatedIncome) {
            return res.status(404).json({
                success: false,
                message: "Income not found"
            })
        }

        res.json({
            success: true,
            updatedIncome,
            message: "Income updated successfully."
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        })

    }
}

// To delete Income

export const deleteIncome = async (req, res) => {

    const { id } = req.params
    const userId = req.user._id

    try {

        const income = await Income.findOneAndDelete({
            _id: id,
            userId
        })

        if (!income) {
            return res.status(404).json({
                success: false,
                message: "Income not found"
            })
        }

        res.json({
            success: true,
            message: "Income Deleted successfully."
        })

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        })

    }
}


// To download the data in an Excel sheet

export const downloadIncomeExcel = async (req, res) => {

    const userId = req.user._id

    try{

        const income = await Income.find({userId}).sort({ date: -1 })
        const plainData = income.map((inc)=>(
            {
                Description: inc.description,
                Amount: inc.amount,
                Category: inc.category,
                Date: new Date(inc.date).toLocaleDateString()
            }
        ))

        const workSheet = XLSX.utils.json_to_sheet(plainData)
        const workBook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workBook, workSheet,'Income')
        XLSX.writeFile(workBook, "income-details.xlsx");

        res.download("income-details.xlsx");

    } catch (error){

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

// To get income overview

export const getIncomeOverview = async (req, res) => {

    try{
        const userId = req.user._id
        const {range ="monthly"} = req.query
        const {start,end}=getDataRange(range)

        const incomes = await Income.find({
            userId: userId,
            date :{
                $gte:start,$lte:end
            }
        }).sort({date: -1})

        const totalIncome = incomes.reduce((acc,cur)=> acc+cur.amount,0)
        const averageIncome = incomes.length > 0 ? totalIncome / totalIncome : 0
        const numberOfTransactions = incomes.length;

        const recentTransactions = incomes.slice(0,9)

        res.json({
            success: true,
            data:{
                totalIncome,
                averageIncome,
                numberOfTransactions,
                recentTransactions,
                range
            }
        })

    }catch (e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }

}