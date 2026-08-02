import mongoose from "mongoose"


const conectDB = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB Conected!!!!');

    } catch (error) {

        console.log(error);

    }

}

export { conectDB }