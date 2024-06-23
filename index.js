import express from "express"

// ROUTERS 
import foodRouter from "./routes/food.routes.js";

const app = express();



// ROUTERS 
app.use("/food", foodRouter)


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "this is / page"
    })
})

app.listen(5000, () => {
    console.log(`server is live on port 5000`)
})