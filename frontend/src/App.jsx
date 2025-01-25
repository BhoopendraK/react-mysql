import React, { useState } from 'react'

import axios from 'axios'

const App = () => {
  const [flag, setFlag] = useState(false);

  const [unaam, setUnaam] = useState('')
  const [pwd, setPwd] = useState('')

  const [number, setNumber] = useState()
  const [user, setUser] = useState()
  const [password, setPassword] = useState()
  const [data, setData] = useState([])


  const baseUrl = "http://localhost:3000";

  const [values, setValues] = useState([{
    email: "",
    password: ""
  }]);



  const submitHanler = (e) => {
    e.preventDefault();
    // console.log(values.email)
    axios.post(`${baseUrl}/register`, values)
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }


  const updateHanler = (e) => {
    e.preventDefault();
    // console.log(values.email)

    axios.put(`${baseUrl}/update/` + number, values)
      .then(result => console.log(result))
      .catch(err => console.log(err))
  }




  const displayData = () => {
    axios.get(`${baseUrl}/display`)
      .then(res => {
        console.log(res);
        setData(res.data);
      })
      .catch(err => console.log("Err: " + err));

  }



  const updateRecord = (x, y, z) => {
    setNumber(x);

    setFlag(true)
    setUnaam(y)
    setPwd(z)

    // setValues({ ...values, email: y })
    // setValues({ ...values, password: z })


    // console.log(valu)
  }

  //git pwd: myniel@198



  const deleteRecord = (x) => {
    setNumber(x);
    console.log("will delete this id=" + x)
    axios.delete(`${baseUrl}/delete/` + x)
      .then(result => console.log("delete ho gaya"))
      .catch(err => console.log("error aa gayi"))

  }









  return (
    <div>
      <h1>react-mysql Project</h1>
      <code>Developed By: Bhupendra Vishnoi</code>
      {/* <Login /> */}


      {
        flag === true ?

          <div>
            <h3>Update</h3>
            <p>Id: {number} : {unaam} {pwd}</p>
            <form onSubmit={updateHanler}>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id='email' name='email' autoComplete='off' placeholder='Enter Email' onChange={(e) => { setValues({ ...values, email: e.target.value }) }} />
              </div>
              <div>
                <label htmlFor="email">Password:</label>
                <input type="password" id='password' name='password' autoComplete='off' placeholder='Enter Password' onChange={(e) => { setValues({ ...values, password: e.target.value }) }} />
              </div>
              <button>Update Record</button>
            </form>
          </div>

          :

          <div>
            <h3>Add Form</h3>
            <p>-</p>
            <form onSubmit={submitHanler}>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id='email' name='email' autoComplete='off' placeholder='Enter Email' onChange={(e) => { setValues({ ...values, email: e.target.value }) }} />
              </div>
              <div>
                <label htmlFor="email">Password:</label>
                <input type="password" id='password' name='password' autoComplete='off' placeholder='Enter Password' onChange={(e) => { setValues({ ...values, password: e.target.value }) }} />
              </div>
              <button>Add Record</button>
            </form>

          </div>



      }








      <div>
        <button onClick={displayData}>Display Data</button>
      </div>
      <h3>Database Records:</h3>
      {

        data.map((cur, ind) => {
          return (
            <p key={ind}>{cur.id}. {cur.user} : [{cur.password}]
              <button onClick={() => updateRecord(cur.id, cur.user, cur.password)}>Update</button>
              <button onClick={() => deleteRecord(cur.id)}>Delete</button>
            </p>
          )

        })
      }





    </div>
  )
}

export default App
