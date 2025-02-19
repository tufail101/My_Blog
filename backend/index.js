const express = require("express");
const mySql = require("mysql2");

const app = express();
const port = 3000;
const connection = mySql.createConnection({
    host : "localhost",
    user : "root",
    password : "841438",
    database : "MyBlog"
});

app.use(express.urlencoded({extended:true}));
app.get("/",(req,res)=>{

    res.send("i am home")
})
app.post("/login",(req,res)=>{
    let {userName,password} = req.body;
    let q = `SELECT * FROM user WHERE userName = ${userName}`;
    try{
        connection.query(q,(err,result)=>{
            if(err) throw err;
            let q2 = ``
        })
    }catch(err){
        console.log(err);
        
    }
    res.send("all ok")
})

app.listen(port,(req,res)=>{
    console.log(`http://localhost:${port}`);
    
})