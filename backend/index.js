const express = require("express");
const mySql = require("mysql2");
const cors = require("cors");

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

app.listen(port, (req, res) => {
  console.log(`http://localhost:${port}`);
});
