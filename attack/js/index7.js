const axios = require("axios");
const url =
  "https://etapiprod.analytics-hub.com/et/mongoUser/?userID=6463aa1a-dc4a-4c80-9e6f-d8dc49a3b1a95";

async function makeRequest(url) {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        "Content-Type": "application/json",
      },
    };

    let r = await axios.request(config);
    // console.log(r.data);
  } catch (err) {
    console.log(err.message, err.data);
  }
}
async function main() {
  for (let i = 0; i < 99999999; i += 1000) {
    let promises = [];
    console.log(i);
    for (let j = 0; j < 1000; j++) {
      promises.push(makeRequest(url));
    }

    await Promise.all(promises);
  }
}
main();
