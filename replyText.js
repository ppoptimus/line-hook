const request = require("request-promise");

const replyText = (event, LINE_MESSAGING_API, LINE_HEADER, text) => {
    return request.post({
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: event.replyToken,
            messages: [
                {
                    type: "text",
                    text: text,
                },
            ],
        }),
    });
};

module.exports = replyText;