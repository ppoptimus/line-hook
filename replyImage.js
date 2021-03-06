const request = require("request-promise");

const reply = (req, LINE_MESSAGING_API, LINE_HEADER) => {
    return request.post({
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    type: "text",
                    text: "คุณส่งรูปภาพมาหรอ มันอาจติดลิขสิทธิ์",
                },
            ],
        }),
    });
};

module.exports = reply;