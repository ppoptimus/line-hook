const request = require("request-promise");

const replyText = (req, LINE_MESSAGING_API, LINE_HEADER) => {
    return request.post({
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    type: "text",
                    text: "คุณส่งมาเป็นข้อความ",
                },
            ],
        }),
    });
};

module.exports = replyText;