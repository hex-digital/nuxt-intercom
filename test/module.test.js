const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')

let nuxt
const nuxtConfig = loadConfig(__dirname, '../../example')

beforeAll(async () => {
  ({ nuxt } = (await setup(nuxtConfig)))
}, 60000)

afterAll(async () => {
  await nuxt.close()
})

test('Render', async () => {
  const html = await get('/')
  expect(html).toBeTruthy()
})
