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

// To update expense

export const updateExpense = async (req, res) => {
    const userId = req.user._id
    const {description, amount} = req.body
    const expenseId = req.params.id

    if (!description || !amount){
        return res.status(400).json({
            success: false,
            message:"All fields are required"
        })
    }

    try {

        const updatedExpense = await Expense.findByIdAndUpdate({
            userId,_id:expenseId
        },{
            description, amount
        },{
            new:true
        }).select("-createdAt -updatedAt -__v")

        if (!updatedExpense){
            return res.status(404).json({
                success: false,
                message:"Expense Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message:"Expense successfully updated",
            updatedExpense
        })

    } catch (error) {

        console.log(error)
        return res.status(400).json({
            success: false,
            message:"Internal Server Error"
        })

    }
}

// Delete Expense

export const deleteExpense = async (req, res) => {
    const userId = req.user.id
    const expenseId = req.params.id

    try {

        const deletedExpense = await Expense.findOneAndDelete({
            userId,_id:expenseId
        })

        if (!deletedExpense){
            return res.status(404).json({
                success: false,
                message:"Expense Not Found"
            })
        }

        res.status(200).json({
            success: true,
            message:"Expense successfully deleted"
        })


    } catch (error) {

        console.log(error)
        return res.status(400).json({
            success: false,
            message:"Internal Server Error"
        })

    }

}