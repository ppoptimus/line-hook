const request = require("request-promise");

let sticker = Math.floor(Math.random() * 39) + 1988;
const reply = (req, type, keywords, LINE_MESSAGING_API, LINE_HEADER) => {
    return request.post({
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    type: type,
                    packageId: "446",
                    stickerId: sticker,
                },
            ],
        }),
    });
};

module.exports = reply;