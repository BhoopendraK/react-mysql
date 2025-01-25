const express = require("express")
const mydb = require("mysql")
// const con = require(".//utils/db.js")

require("dotenv").config()

const cors = require("cors")

// const routes = require("./myroutes.js")



const app=express();
const PORT = process.env.PORT || PORT

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://react-mysql-93tt.vercel.app');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})


app.use(cors(
  {
    // origin: "http://localhost:5173",
    origin: "https://react-mysql-93tt.vercel.app",
    // origin:"*",
    // CORS_ORIGIN : "*",
  } 
  ))
  app.use(express.json())

  

const con = mydb.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bhoop"
})

con.connect(function(err){
  if(err){
    console.log("Connection error!")
  } else{
    console.log("Database `bhoop` Connected...")
  }
})


app.get("/display", (req, res)=>{
  const sql="SELECT * FROM admin";
  con.query(sql, (err, data)=>{
    if(err) console.log("Error: " + err)
      else return res.json(data)
  })
})

app.post("/register", (req, res)=>{
  console.log("Bhoop")
  const sql="INSERT INTO admin(`user`, `password`) VALUES(?)"
  const values=[req.body.email, req.body.password]
  con.query(sql, [values],(err, result)=>{
    if(err) console.log(err)
      else return res.json(result)
  })
})


app.put("/update/:id", (req, res)=>{
  const sql="UPDATE admin set user=?, password=? WHERE id=?"
  const values=[req.body.email, req.body.password] // req.body.password
  const id=req.params.id
  con.query(sql, [...values, id],(err, result)=>{
    if(err) console.log(err)
      else return res.json(result)
  })

})


app.delete("/delete/:id", (req, res)=>{
  const sql="DELETE FROM admin WHERE id = ?"
  // const values=[req.body.email, req.body.password]
  const id=req.params.id
  con.query(sql, [id],(err, result)=>{
    if(err) console.log(err)
      else return res.json(result)
  })

})




  try{

  // app.use("/auth", routes);
  
  app.listen(PORT, ()=>{console.log(`Nodemon Server Started at PORT =  ${PORT}`)})
  }catch(e){
  console.log("Network Error")
  }
