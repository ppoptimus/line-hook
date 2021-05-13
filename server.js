const firebase = require("./firebase");
const Firebase = require("firebase");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const crypto = require("crypto");
app.use(bodyParser.json());

const replySticker = require("./replySticker.js");
const replyImage = require("./replyImage");
const replyText = require("./replyText");
const replyElse = require("./replyElse");

const port = process.env.port || 3001;
const LINE_MESSAGING_API = "https://api.line.me/v2/bot/message";
const LINE_CHANNEL_SECRET = "f0442ecc6808b7506fb3aec1fe70f485";
//const LINE_CHANNEL_SECRET = "02dd95af9b8e095b3eec818a9a8934d0";
const LINE_HEADER = {
    "Content-Type": "application/json",
    Authorization: `Bearer kBivd/nG2RSM5H7htARQy3opPQhtkJSrBs9KWWz+LWvfkEw1sp1+zL31tJbPbU9qy2CvBt6QgISh0eDVmVl041tMIzc9UbBzb6ji4U1cKlolIsMHxT7jFQPeVFTofjm6lxzOsbojzuij+F9igQXGGgdB04t89/1O/w1cDnyilFU=`,
};
// const LINE_HEADER = {
//   "Content-Type": "application/json",
//   Authorization: `Bearer fuh0z8OYvgVzfmgtRdi/4l7+Iy92MMHZoW1fAD9F08bfxx80xQvA1lOKct04w9J2JQmMBry0P0wj7OvnqHb5LguCR7D5Fr8/+MokxuRZp5Gl2qPkWad/UJ2jnTS48FV4LguigjdzJByJCeODLPldEAdB04t89/1O/w1cDnyilFU=`,
// };

// app.listen(port, () => {
//   console.log(`Server available on port 3001`);
// });

//-------------------------------------------------//
app.get("/", (req, res) => {
  res.send({
      "Status":"Connected"
  })
});

app.post("/", async (req, res) => {
  const body = JSON.stringify(req.body);
  const signature = crypto
    .createHmac("SHA256", LINE_CHANNEL_SECRET)
    .update(body)
    .digest("base64")
    .toString();
  if (signature !== req.headers["x-line-signature"]) {
    return res.status(401).send("Unauthorized");
  }

  let event = req.body.events[0];
  let userid = event.source.userId;
  let userwatafak = "";
  let database = Firebase.database();

  if (event.type === "follow") {
    const obj = {
      userId: userid,
      userWatafak: userwatafak,
    };
    database.ref("users").set(obj, function (error) {
      if (error) {
        console.log("Failed with error: " + error);
      } else {
        console.log("success");
      }
    });
  } else if (event.type === "message" && event.message.type === "sticker") {
    let keywords = event.message.keywords;
    replySticker(req, "sticker", keywords, LINE_MESSAGING_API, LINE_HEADER);
  } else if (event.type === "message" && event.message.type === "image") {
    replyImage(req, LINE_MESSAGING_API, LINE_HEADER);
  } else if (event.type === "message" && event.message.type === "text") {
    replyText(req, LINE_MESSAGING_API, LINE_HEADER);
  } else {
    replyElse(req, LINE_MESSAGING_API, LINE_HEADER);
  }
  return res.status(200).send(req.method);
});
