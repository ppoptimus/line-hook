const textReply = (text) => {
  let returnText = ''
  switch (text) {
    case 'เครดิตฟรี':
      returnText =
        'ต้องทำดังนี้ \n 1. นำเว็บ Watafak88.com ไปแชร์ในกลุ่มไลน์ที่มีจำนวนสมาชิก 50 คนขึ้น \n 2. แชร์ให้ครบ 5 กลุ่ม \n 3. แคปหน้าจอกลุ่มที่แชร์แล้วส่งมาให้เราช่องทางนี้(จำนวน 5 รูป) \n 4. รับเครดิตฟรีไปเลย 50 เครดิต'
      break
    case 'credit':
      returnText =
        'ต้องทำดังนี้ \n 1. นำเว็บ Watafak88.com ไปแชร์ในกลุ่มไลน์ที่มีจำนวนสมาชิก 50 คนขึ้น \n 2. แชร์ให้ครบ 5 กลุ่ม \n 3. แคปหน้าจอกลุ่มที่แชร์แล้วส่งมาให้เราช่องทางนี้(จำนวน 5 รูป) \n 4. รับเครดิตฟรีไปเลย 50 เครดิต'
      break
    default:
      returnText = 'กรุณาพูดให้ชัด'
      break
  }
  return returnText
}

module.exports = textReply
