const defaults = {
  appId: null, // Intercom ID
  autoBoot: true, // True to boot messenger widget and show UI on page load, false to allow manually booting later
  debug: false, // True to show debug messages in the console, useful for development, false to not show them

  scriptId: 'intercom-script', // String to identfy the script tag, for vue-meta
  scriptDefer: false, // True to defer loading intercom widget javascript until page loads, false to async load it in document flow

  updateOnPageRoute: true // True to call intercom's 'update' method on route change, false to not do this
}

export default defaults
