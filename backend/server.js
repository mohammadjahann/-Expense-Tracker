import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { conectDB } from './config/db.js'
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express()
const port = 3000

//MIDDLEWARES
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



// ROUTES

app.get('/', (req, res) => {
    res.send("API WORKING!")
})

conectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server Started on http://localhost:${port}`);

        })
    })