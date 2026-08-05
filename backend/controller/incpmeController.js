import Income from '../models/incomeModel.js'

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