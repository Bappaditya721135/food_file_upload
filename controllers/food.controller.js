import { v4 as random_id} from "uuid"
// DATABASE 
import database from "../db.js"
import { generateSql } from "../utils/generateSql.js";




// ADD FOOD TO THE DATABASE 
export const addFood = (req, res) => {
    const { name, price, qty, description } = req.body;
    const file = req.file;
    // FIF FILE NOT EXIST 
    if(!file) {
        return res.status(404).json({
            success: false,
            message: "not file found"
        })
    }

    // IF ANY FEILD DOES NOT EXIST  
    if(!name || !price || !qty || !description) {
        return res.status(400).json({
            success: false,
            message: "some feilds are missing"
        })
    }

    const image_url = `${req.protocol}://${req.get("host")}/uploads/${file.filename}`
    const id = random_id();
    const sql = `
        insert into food (id, name, price, qty, description, image_url)
        values(?, ?, ?, ?, ?, ?)
    `

    database.query(sql, [id, name, price, qty, description, image_url], (err, result) => {
        if(err) {
            return res.status(500).json({
                success: false,
                error,
            })
        }
        else {
            if(result.affectedRows === 0) {
                return res.status(500).json({
                    success: false,
                    message: "something went wrong"
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: "food added successfully"
                })
            }
           
        }
    })
}



// GET ALL THE FOOD FROM DATA BASE 
export const getAllFood = (req, res) => {
    const sql = `
        select name, price, qty, description, image_url
        from food
    `
    database.query(sql,(error, result) => {
        if(error) {
            return res.status(500).json({
                success: false,
                message: "something went wrong"
            })
        }
        else {
            return res.status(200).json({
                success: true,
                result,
            })
        }
    })

}



// GET SINGLE FOOD BY ID 
export const getSingleFood = (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "id is required"
        })
    }

    const sql = `
        select name, price, qty, description, image_url from food
        where id = ?
    `
    database.query(sql, [id], (err, result) => {
        if(err) {
            return res.status(500).json({
                success: true,
                error,
            })
        }
        else {
            if(result.length === 0) {
                return res.status(500).json({
                    success: false,
                    message: "something went wrong"
                })
            }
            else {
                return res.status(200).json({
                    success: true,
                    food: result[0]
                })
            }
        }
    })
    
}


// DELETE FOOD BY ID 

export const deleteFood = (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: false,
            message: "id not provided"
        })
    }
    const sql = `
        delete from food
        where id = ?
    `
    database.query(sql, [id], (err, result) => {
        if(err) {
            return res.status(500).json({
                success: false,
                err,
            })
        }
        else {
            if(result.affectedRows === 0) {
                return res.status(500).json({
                    success: false,
                    message: "something went wrong"
                })
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: "deleted successfully"
                })
            }
        }
    })
}




// FOOD UPDATE  

export const updateFood = (req, res) => {
    const  { id } = req.params;
    if(!id) {
        return res.status(400).json({
            success: true,
            message: "id not found"
        })
    }
    if(!req.body) {
        return res.status(400).json({
            success: false,
            message: "provide data to update"
        })
    }

    const sql = generateSql(req.body, req.file, id)
    database.query(sql, (err, result) => {
        if(err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                err,
            })
        }
        else {
            if(result.affectedRows === 0) {
                return res.status(500).json({
                    success: false,
                    message: "something went wrong"
                })
            }
            else {
                return res.status(200).json({
                    success: false,
                    message: "updated successfully"
                })
            }
        }
    })
}