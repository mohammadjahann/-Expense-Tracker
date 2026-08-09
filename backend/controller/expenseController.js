import Expense from "../models/expenseModel.js";



// Add expanse


export const addExpense = async (req, res) => {
    const userId = req.user._id
    const {description, amount ,category, date} = req.body

    if(!userId || !description || !category || !amount || !date){

        return res.status(400).json({
            success: false,
            message:"All fields are required"
        })

    }

    try {

        const newExpense = await new Expense({
            userId,
            description,
            amount ,
            category,
            date : new Date(date)
        })

        await newExpense.save()
        return res.status(201).json({
            success: true,
            message:"Expense successfully saved"
        })

    } catch (error) {

        console.log(error)
        return res.status(400).json({
            success: false,
            message:"Internal Server Error"
        })
    }
}