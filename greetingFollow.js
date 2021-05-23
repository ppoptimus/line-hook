const request = require('request-promise')

const greetingFollow = (LINE_MESSAGING_API, LINE_HEADER, userId, error) => {
  if (error) {
    console.log('Failed with error: ' + error)
  } else {
    return request.post({
      uri: `${LINE_MESSAGING_API}/push`,
      headers: LINE_HEADER,
      body: JSON.stringify({
        to: userId,
        messages: [
          {
            type: 'template',
            altText: 'watafak88 greeting message',
            template: {
              type: 'buttons',
              thumbnailImageUrl:
                'https://www.img.in.th/images/a495d07f6b72e20c0f52414ac96eb7e5.jpg',
              imageBackgroundColor: '#080000',
              title: 'สำหรับรับเครดิตฟรีเท่านั้น',
              text: 'หากท่านมีปัญหาอื่นกรุณากดแจ้งปัญหาเพื่อพูดคุยกับเจ้าหน้าที่',
              actions: [
                {
                  type: 'message',
                  label: 'รับเครดิตฟรี',
                  text: 'credit',
                },
                {
                  type: 'uri',
                  label: 'แจ้งปัญหา',
                  uri: 'https://line.me/R/ti/p/@486fpcll',
                },
              ],
            },
          },
        ],
      }),
    })
  }
}

module.exports = greetingFollow
