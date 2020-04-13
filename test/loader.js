const compiler = require('./compiler')
const expect = require('chai').expect
const path = require('path')

const extract = (source) => {
  const pattern = /(\{.*\})/
  return JSON.parse(source.match(pattern)[0])
}
describe('env-loader', function () {
  it('#simple', async function () {
    this.timeout(0)
    const stats = await compiler(path.resolve(__dirname, '../.env'))
    const output = stats.toJson().modules[0].source
    const env = extract(output)
    expect(env).to.be.deep.equal({
      SERVER: 'https://www.example.com',
      EXPRESS: 'true',
    })
  })
})
