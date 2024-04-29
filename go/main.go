package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"strconv"
)

func generateOtp() string{

   otp := rand.Intn(999999-100000+1)+100000
   fmt.Println(otp,"generated here")
   return strconv.Itoa(otp)
}
type  otpGenerate struct {
	Email string `json:"email"`
}

type resetPassword struct {
	Email string `json:"email"`
	Otp string `json:"otp"`
	NewPassword string `json:"newpassword"`
}
func main() {
     otpStore:=make(map[string]string)

	http.HandleFunc("/generate-otp",func(w http.ResponseWriter, r *http.Request) {
        var input otpGenerate;
		err:=json.NewDecoder(r.Body).Decode(&input)
		if err!=nil{
			w.WriteHeader(http.StatusBadRequest)
			return
		}
		otp:=generateOtp()
		fmt.Println(otp,"Otp generated for  email", input.Email)
		email:=input.Email
		otpStore[email]=otp
		w.Header().Set("Content-Type","application/json")
		w.WriteHeader(http.StatusAccepted)
		sendres, _:=json.Marshal("Send otp")
		w.Write(sendres)
	})

	http.HandleFunc("/reset-password",func (w http.ResponseWriter, r *http.Request){
		var input resetPassword
		err:=json.NewDecoder(r.Body).Decode(&input)

		if err!=nil{
			w.WriteHeader(http.StatusBadRequest)
		}

		 value, ok:=otpStore[input.Email]

		 if ok{
			if value==input.Otp{
				response, _:=json.Marshal("Password reset successfully")
				w.WriteHeader(http.StatusAccepted)
				fmt.Println("password reset successfully")
				w.Write(response)
			}
		 }else{
            response, _:=json.Marshal("Invalid otp")
			w.WriteHeader(http.StatusBadRequest)
			w.Header().Set("Content-Type", "application/json")
			w.Write(response)
		 }

	})
	fmt.Print("sERVER IS RUNNING ON PORT", 8080)
	http.ListenAndServe(":8080", nil)
}