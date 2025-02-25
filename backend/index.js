const express = require("express");
const mySql = require("mysql2");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;
const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "841438",
  database: "MyBlog",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: "http://127.0.0.1:5500", // ✅ Allow only your frontend
    methods: ["POST", "GET"],
    credentials: true // ✅ Allow cookies if needed
  }));

app.get("/", (req, res) => {
  res.send("i am home");
});
app.post("/login", (req, res) => {
  let { userName, password } = req.body;
  if (!userName || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  let q = `SELECT * FROM user WHERE userName = '${userName}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;

      let user = result[0];
     
    if(!user){
        console.log("Invalid User");
        res.json({message:"Invalid User"});
    }else{

        // console.log(result[0]);
        if(password != user.password){
            console.log("Unkonwn user");
            
        }
        else{
              console.log(user);
              res.json({user});

          }
    }
    });
  } catch (err) {
    console.log(err);
  }

});
app.post("/signup",(req,res)=>{
  let {name,userName,email,password} = req.body;
  let id = uuidv4();
  if (!userName || !password || !email) {
    return res.status(400).json({ error: "Missing credentials" });
  }
  let q1 = `SELECT * FROM user WHERE userName = ?`
  try{
    connection.query(q1,[userName],(err,result)=>{
      if(err) throw err;
      if(result.length>0){
        return res.status(400).json({ error: "Username already exists" });
      }
      else{
        let q2 = `INSERT INTO user (id,name,userName,email,password) VALUES(?,?,?,?,?)`;
        try{
          connection.query(q2,[id,name,userName,email,password],(err,result)=>{
            if(err) throw err
            res.status(201).json({ message: "User registered successfully", userId: id });
          })
        }catch(err){
          console.log(err);
          
        }
      }
    })
  }catch(err){
    console.log(err);
    
  }

})

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
});
