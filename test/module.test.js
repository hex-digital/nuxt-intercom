const { setup, loadConfig, get } = require('@nuxtjs/module-test-utils')

let nuxt
const nuxtConfig = loadConfig(__dirname, '../../example')
nuxtConfig.intercom.appId = '3qmk5gyg'

describe('When module is loaded with default settings', () => {
  beforeAll(async () => {
    ({ nuxt } = (await setup(nuxtConfig)))
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('can render a page', async () => {
    const html = await get('/')
    expect(html).toBeTruthy()
  })
})
