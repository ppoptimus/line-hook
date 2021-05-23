const firebase = require('./firebase')
const Firebase = require('firebase')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const crypto = require('crypto')
const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message'

//--------------------Another page-----------------------//
const replySticker = require('./replySticker.js')
const replyImage = require('./replyImage')
const replyText = require('./replyText')
const replyElse = require('./replyElse')
const greetingFollow = require('./greetingFollow')
const gerateText = require('./gereateWordReply')

//-----------------------Set port---------------------------//
const port = process.env.port || 3001

let LINE_CHANNEL_SECRET = ''
let LINE_HEADER = ''

app.listen(port, () => {
  console.log(`Server available on port 3001`)
})

//---------------------Test connection-----------------------//
app.get('/', (req, res) => {
  res.send({
    Status: 'Connected',
  })
})

//------------------------Webhook api-------------------------//
app.post('/', async (req, res) => {

  let event = req.body.events[0]
  let destination = req.body.destination
  let userid = event.source.userId
  let webname = ''
  let database = Firebase.database()

  switch (req.body.destination) {
    case 'Ucaa72c04aed25b2858b0316f6da6740c':
      LINE_CHANNEL_SECRET = '64e2d3980135744e7e0e980fa4feb726'
      LINE_HEADER = {
        'Content-Type': 'application/json',
        Authorization: `Bearer acSEBTi5FTcP48pBonRqPArvI+bHhmHPBqh/fDxYw36Wus2N3BalB3unhMShLyEvETlTToNM8VkFPqOuIEOFz1vaRlkDz7Av1msAUveUZA6QT86nFKQSLhEEWRruXlog96sFPubIDkV+w7X/Bxh4pgdB04t89/1O/w1cDnyilFU=`,
      }
      webname = 'allbet'
      allbet(event, userid, webname, database, destination);
      break;
  
    default:
      console.log(req.body.destination)
      break;
  }
  const body = JSON.stringify(req.body)
  const signature = crypto
    .createHmac('SHA256', LINE_CHANNEL_SECRET)
    .update(body)
    .digest('base64')
    .toString()
  if (signature !== req.headers['x-line-signature']) {
    return res.status(401).send('Unauthorized')
  }

  
  return res.status(200).send(req.method)
})

//-------------------------SHIP api function--------------------------//
allbet = (event, userid, webname, database, destination) => {
  switch (event.type) {
    case 'follow':
      saveId(userid, webname, database, event.type, destination)
      greetingFollow(LINE_MESSAGING_API, LINE_HEADER, userid)
      break
    case 'unfollow':
      saveId(userid, webname, database, event.type, destination)
      break
    case 'message':
      if (event.message.type === 'sticker') {
        let keywords = event.message.keywords
        replySticker(event, 'sticker', keywords, LINE_MESSAGING_API, LINE_HEADER)
      } else if (event.message.type === 'image') {

      } else if (event.message.type === 'text') {
        let text = gerateText(event.message.text)
        replyText(event, LINE_MESSAGING_API, LINE_HEADER, text)
      } else {
        replyElse(event, LINE_MESSAGING_API, LINE_HEADER)
      }
      break

    default:
      replyElse(event, LINE_MESSAGING_API, LINE_HEADER)
      break
  }
}

//-----------------Save userId to Firebase---------------------//
saveId = (userid, webname, database, status, destination) => {
  const obj = {
    userId: userid,
    webname: webname,
    status: status,
    destination: destination,
  }
  database.ref('users').set(obj, function (error) {
    if (error) {
      console.log('Failed with error: ' + error)
    } else {
      console.log('success')
    }
  })
}
