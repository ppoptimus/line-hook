const request = require("request-promise");

const replyElse = (req, LINE_MESSAGING_API, LINE_HEADER) => {
    return request.post({
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: req.body.events[0].replyToken,
            messages: [
                {
                    type: "text",
                    text: "ส่งอะไรมาน่ะ กรุณาส่งใหม่อีกครั้ง",
                },
            ],
        }),
    });
};

module.exports = replyElse;