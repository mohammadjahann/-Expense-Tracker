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

// To get all user expense

export const getAllExpenses = async (req, res) => {

    const userId = req.user._id

    if (!userId){
        return res.status(400).json({
            success: false,
            message:"Incorrect user id"
        })
    }

    try {

        const expanses = await Expense.find({userId}).sort({date:-1})

        res.status(200).json(expanses)

    } catch (error) {

        console.log(error)
        return res.status(400).json({
            success: false,
            message:"Internal Server Error"
        })
    }


}