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
      }} siteKey={"0x4AAAAAAAYwdNgW6XbQmMDp"} />

      <button disabled={token.length<=0} onClick={() => {
        axios.post("http://localhost:3000/reset-password", {
          email: "swarnikarajsingh@gmail.com",
          newpassword: "123456",
          otp: "123456",
          token: token,
        })
      }}>Update password</button>
        
      </div>
     
    </>
  )
}

export default App
