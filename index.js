import express from "express"
// DATABASE 
import database from "./db.js"

// EVN VARIABLES 
import dotenv from "dotenv"

// ROUTERS 
import foodRouter from "./routes/food.routes.js";





const app = express();
// ENV COFIG 
dotenv.config()
const {PORT} = process.env;

// EXPRESS STATIC FILES 
app.use(express.static("public"))


// ROUTERS 
app.use("/food", foodRouter)


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "this is / page",
    })
})

database.connect((err) => {
    if(err) {
        console.log(err)
    }
    else {
        console.log("data base is connected")
        app.listen(PORT, () => {
            console.log(`server is live on port ${PORT}`)
        })
    }
})