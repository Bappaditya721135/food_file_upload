import sql from "mysql";


const db = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "fooddb"

})

export default db;