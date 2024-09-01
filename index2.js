import express from "express"
import mysql, { createConnection } from "mysql2"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Betwa@24#",
    database:"test"
})

app.use(express.json())
app.use(cors())

// doing below because by default we cannot send any data with POST to express server
// so adding express server middleware
app.get("/", (req,res)=>{
    res.json("Hello this is the backend")
})

app.get("/books", (req,res)=>{
    //will return here all the books from DB
    const q = "SELECT * FROM books"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    });
});

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?)"
    //const values = ["title from backend", "desc from backend", "cover pic from backend"] >> it was inserted into database from browser- localhost:8800/books
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been created successfully!")
    })
})

app.delete("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been deleted successfully!")
    })
})

app.put("/books/:id", (req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`=?, `desc`=?, `cover`=?, `price`=? WHERE id =?";

    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ]

    db.query(q,[...values,bookId], (err,data)=>{
        if(err) return res.json(err)
        return res.json("Book has been updated successfully!")
    })
})

app.listen(8800, ()=>{
    console.log("Connected to backend !")
})