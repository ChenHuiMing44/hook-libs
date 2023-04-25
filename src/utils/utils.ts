

const codeStr = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
function getRandom(n: number, m: number) {
  return Math.floor(Math.random() * (m - n) + n)
}


// 获取一串随机数 作为组件的key
export const getRandomCode = () => {
  // 时间戳加 5位随机数
  let str = `${new Date().valueOf()}`
  for (let i = 0; i < 5; i++) {
    const ran = getRandom(0, codeStr.length)
    str += codeStr.charAt(ran)
  }
  return str
}


