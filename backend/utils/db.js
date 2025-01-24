const mydb = require("mysql")


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
    console.log("Database Connected...")
  }
})

