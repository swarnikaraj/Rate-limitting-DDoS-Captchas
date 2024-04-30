import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import axios from 'axios'
import './App.css'

function App() {
  const [token, setToken] = useState<string>("")

  return (
    <>
      
        
      <div className="card">

        <input placeholder='OTP'></input>
      <input placeholder='New password'></input>

      <Turnstile onSuccess={(token) => {
        setToken(token)
      }} siteKey={process.env.REACT_APP_SITEKEY || ""} />

      <button onClick={() => {
        axios.post("http://localhost:3000/reset-password", {
          email: "swarnikarajsingh@gmail.com",
          otp: "123456",
          token: token,
        })
      }}>Update password</button>
        
      </div>
     
    </>
  )
}

export default App
