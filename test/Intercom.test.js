import Intercom from '../lib/Intercom.js'
// import defaultSettings from '../lib/defaults.js'

const appId = '3qmk5gyg'
const intercomWindowMock = jest.fn()

beforeEach(() => {
  global.window = { Intercom: intercomWindowMock }
})

afterEach(() => {
  intercomWindowMock.mockReset()
})

describe('Intercom.js', () => {
  describe('can be instantiated', () => {
    test('with just an app ID', () => {
      const intercom = new Intercom(appId)
      expect(intercom).toBeInstanceOf(Intercom)
    })

    test('with a settings object', () => {
      const intercom = new Intercom(appId, { debug: false })
      expect(intercom).toBeInstanceOf(Intercom)
    })

    test('with precaptured userdata', () => {
      const intercom = new Intercom(appId, {}, { email: 'hogw@rts.com' })
      expect(intercom).toBeInstanceOf(Intercom)
    })

    test('with settings and precaptured userdata', () => {
      const intercom = new Intercom(appId, { debug: false }, { email: 'hogw@rts.com' })
      expect(intercom).toBeInstanceOf(Intercom)
    })
  })

  describe('once instantiated', () => {
    let intercom
    beforeEach(() => {
      intercom = new Intercom(appId)
    })

    test('can call the Intercom widget', () => {
      intercom.call('boot')
      expect(intercomWindowMock).toHaveBeenCalledWith('boot')
    })

    test('cannot call Intercom when window.Intercom is not available', () => {
      delete global.window.Intercom

      intercom = new Intercom(appId, { debug: true })

      function bootIntercom () {
        intercom.call('boot')
      }
      expect(bootIntercom).toThrowError(/window/)
    })

    test('can show that it is not ready before init', () => {
      expect(intercom.isReady()).toBeFalsy()
    })

    test('can initialise the intercom object', () => {
      intercom.init()
      expect(intercomWindowMock).toHaveBeenCalledWith('onHide', expect.any(Function))
      expect(intercomWindowMock).toHaveBeenCalledWith('onShow', expect.any(Function))
      expect(intercomWindowMock).toHaveBeenCalledWith('onUnreadCountChange', expect.any(Function))
      expect(intercom.isReady()).toBeTruthy()
    })

    test('can boot', () => {
      intercom.boot()
      expect(global.window.intercomSettings.app_id).toEqual(appId)
      expect(intercomWindowMock).toHaveBeenCalledWith(
        'boot',
        expect.objectContaining({ app_id: appId, last_request_at: expect.anything() })
      )
    })

    test('can boot when intercomSettings are already defined', () => {
      global.window.intercomSettings = { app_id: 'fakeId' }
      intercom.boot()
      expect(global.window.intercomSettings.app_id).toEqual(appId)
    })

    test('can boot with user data', () => {
      const userData = { email: 'hogw@rts.com' }

      intercom.boot(userData)

      expect(intercomWindowMock).toHaveBeenCalledWith(
        'boot',
        expect.objectContaining({ app_id: appId, last_request_at: expect.anything(), ...userData })
      )
    })

    test('can boot with messenger attributes', () => {
      const config = { customLauncherSelector: '.intercom-btn', hideDefaultLauncher: true }

      intercom = new Intercom(appId, { config })
      intercom.boot()

      expect(global.window.intercomSettings.custom_launcher_selector).toEqual('.intercom-btn')
      expect(global.window.intercomSettings.hide_default_launcher).toEqual(true)
    })

    test('can change appId on boot', () => {
      const newAppId = 'newId123'
      intercom.boot({ app_id: newAppId })
      expect(global.window.intercomSettings.app_id).toEqual(newAppId)
      expect(intercomWindowMock).toHaveBeenCalledWith(
        'boot',
        expect.objectContaining({ app_id: newAppId, last_request_at: expect.anything() })
      )
    })

    test('can update with data', () => {
      intercom.update()
      expect(intercomWindowMock).toHaveBeenCalledWith(
        'update',
        expect.objectContaining({ app_id: appId, last_request_at: expect.anything() })
      )
    })

    test('can update with user data', () => {
      const userData = { email: 'hogw@rts.com' }

      intercom.update(userData)

      expect(intercomWindowMock).toHaveBeenCalledWith(
        'update',
        expect.objectContaining({ app_id: appId, last_request_at: expect.anything(), ...userData })
      )
    })

    test('can shutdown', () => {
      intercom.shutdown()
      expect(intercomWindowMock).toHaveBeenCalledWith('shutdown')
    })

    test('can show', () => {
      intercom.show()
      expect(intercomWindowMock).toHaveBeenCalledWith('show')
    })

    test('can hide', () => {
      intercom.hide()
      expect(intercomWindowMock).toHaveBeenCalledWith('hide')
    })

    test('can show messages', () => {
      intercom.showMessages()
      expect(intercomWindowMock).toHaveBeenCalledWith('showMessages')
    })

    test('can show the new message window', () => {
      intercom.showNewMessage()
      expect(intercomWindowMock).toHaveBeenCalledWith('showNewMessage', undefined)
    })

    test('can show the new message with prefilled text', () => {
      const prefilledText = 'This is some prefilled message content to put in the new message box'

      intercom.showNewMessage(prefilledText)

      expect(intercomWindowMock).toHaveBeenCalledWith('showNewMessage', prefilledText)
    })

    test('can show the new message with prefilled text', () => {
      const prefilledText = 'This is some prefilled message content to put in the new message box'

      intercom.showNewMessage(prefilledText)

      expect(intercomWindowMock).toHaveBeenCalledWith('showNewMessage', prefilledText)
    })

    test('can track an event', () => {
      const eventName = 'Bought an item'

      intercom.trackEvent(eventName)

      expect(intercomWindowMock).toHaveBeenCalledWith('trackEvent', eventName, undefined)
    })

    test('can track an event with metadata', () => {
      const eventName = 'Bought an item'
      const metaData = { name: 'Blue Dinosaur', price: '40 doubloons' }

      intercom.trackEvent(eventName, metaData)

      expect(intercomWindowMock).toHaveBeenCalledWith('trackEvent', eventName, metaData)
    })

    test('can get the visitor ID from Intercom', () => {
      const mockUserId = 'abc123xyz'
      intercomWindowMock.mockReturnValueOnce(mockUserId)

      const visitorId = intercom.getVisitorId()

      expect(intercomWindowMock).toHaveBeenCalledWith('getVisitorId')
      expect(visitorId).toEqual(mockUserId)
    })

    test('can start a tour by ID', () => {
      const tourId = '123'

      intercom.startTour(tourId)

      expect(intercomWindowMock).toHaveBeenCalledWith('startTour', tourId)
    })
  })

  describe('debug mode', () => {
    let consoleLogSpy
    beforeEach(() => { consoleLogSpy = jest.spyOn(console, 'log').mockImplementation() })
    afterEach(() => { consoleLogSpy.mockRestore() })

    test('when in debug mode, outputs a console log when a call is made', () => {
      const intercom = new Intercom(appId, { debug: true })
      intercom.call('boot')
      expect(consoleLogSpy).toHaveBeenLastCalledWith(expect.anything(), expect.anything(), expect.stringContaining('boot'))
    })

    test('when not in debug mode, does not output a console log when a call is made', () => {
      const intercom = new Intercom(appId, { debug: false })
      intercom.call('boot')
      expect(consoleLogSpy).not.toHaveBeenLastCalledWith(expect.anything(), expect.anything(), expect.stringContaining('boot'))
    })
  })
})
