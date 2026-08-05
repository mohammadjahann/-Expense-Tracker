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

