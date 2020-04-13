const dotenv = require('dotenv')
module.exports = function (resource, sourcemap) {
  const buf = Buffer.from(resource)
  const obj = dotenv.parse(buf)
  return `export default ${JSON.stringify(obj)}`
}
