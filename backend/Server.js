const express = require("express")
const mydb = require("mysql")
// const con = require(".//utils/db.js")

require("dotenv").config()

const cors = require("cors")

// const routes = require("./myroutes.js")



const app=express();
const PORT = process.env.PORT || PORT

app.use(cors(
  {
    origin: "https://react-mysql-chi.vercel.app/",
    // origin: "http://localhost:5173",
    origin:"*",
    // CORS_ORIGIN : "*",
    // Access-Control-Allow-Origin: *,
    // Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE
    // header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X- 
    // Request-With');


//     header(Access-Control-Allow-Origin:http://127.0.0.1:3000),
// "Access-Control-Allow-Methods": POST, GET, UPDATE, DELETE,
// "Access-Control-Allow-Headers": Content-Type, Authorization,

    header('Access-Control-Allow-Origin: *');
    header(Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS)
    header(Access-Control-Allow-Headers: Content-Type, X-Auth-Token, Origin, Authorization)

  } 
  ))
  app.use(express.json())

// const urlDB=`mysql://${process.env.DB_USER}: ${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.PORT}/${process.env.DB_DATABASE}`;  

// const con = mydb.createConnection(urlDB);

const con = mydb.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
})

con.connect(function(err){
  if(err){
    console.log("Connection error!" + err)
  } else{
    console.log("Database `bhoop` Connected...")
  }
})



app.get('/displays', (req, res) => {
  res.send('This is the displays endpoint');
});

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
  // app.listen(3000, ()=>{console.log(`Nodemon Server Started at PORT =  ${PORT}`)})
  
  app.listen(3000, ()=>{console.log(`Nodemon Server Started at PORT = 3000`)})
  }catch(e){
  console.log("ERROR: Network Error")
  }
