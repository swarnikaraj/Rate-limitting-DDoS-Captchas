import { useState } from 'react'
import { Turnstile } from '@marsidev/react-turnstile'
import axios from 'axios'
import './App.css'

function App() {
  const [token, setToken] = useState<string>("")
  const [otp, setOtp] = useState<string>("")
const [password, setPassword] = useState<string>("")
const [email, setEmail] = useState<string>("")
  return (
    <>
      
        
      <div className="card">
<input placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}></input>
        <input placeholder='OTP' value={otp} onChange={(e)=>setOtp(e.target.value)}></input>
      <input placeholder='New password' value={password} onChange={(e)=>setPassword(e.target.value)}></input>

      <Turnstile onSuccess={(token) => {
        setToken(token)
      }} siteKey={"0x4AAAAAAAYwdNgW6XbQmMDp"} />

      <button disabled={token.length<=0} onClick={() => {
        axios.post("http://localhost:3000/reset-password", {
          email: email,
          newpassword: password,
          otp: otp,
          token: token,
        })
      }}>Update password</button>
        
      </div>
     
    </>
  )
}

export default App
