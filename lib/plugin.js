import Intercom from './Intercom';

const appId = '<%= options.appId %>';
const autoBoot = <%= options.autoBoot || false %>;
const debug = <%= options.debug || false %>;
const pageTracking = <%= options.updateOnPageRoute || false %>;
const config = <%= options.config ? JSON.stringify(options.config) : '{}' %>;
let $intercom = null;
let intercomInstalled = false;

export default function (ctx, inject) {
  $intercom = new Intercom(appId, { debug, config });
  inject('intercom', $intercom);

  const intercomAppMixin = {
    mounted() {
      if (intercomInstalled) return;

      if (typeof window.Intercom === 'function') {
        this.$intercom.init();
        this.$intercom.call('reattach_activator');
        this.$intercom.update();
      } else {
        window.Intercom = createIntercomPlaceholder();

        const callWhenIntercomScriptLoaded = initialiseIntercom(ctx, appId);

        callWhenPageLoaded(() => includeIntercomScript(appId, callWhenIntercomScriptLoaded));
      }

      intercomInstalled = true;
    },
  };

  _extend(ctx.app, intercomAppMixin);
};

function createIntercomPlaceholder() {
  const placeholder = (...args) => placeholder.c(args);
  placeholder.queue = [];
  placeholder.c = (args) => placeholder.queue.push(args);

  return placeholder;
}

function includeIntercomScript(appId, callback) {
  const intercomScript = document.createElement('script');
  intercomScript.async = true;
  intercomScript.src = `https://widget.intercom.io/widget/${appId}`;
  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(intercomScript, firstScript);

  intercomScript.addEventListener('load', callback);
}

function callWhenPageLoaded(callback) {
  if (window.attachEvent) {
    window.attachEvent('onload', callback);
  } else {
    window.addEventListener('load', callback, false);
  }
}

function initialiseIntercom(ctx, appId) {
  $intercom.init();

  if (autoBoot) {
    $intercom.boot({app_id: appId});
  }

  if (pageTracking) {
    startPageTracking(ctx);
  }
}

function startPageTracking(ctx) {
  ctx.app.router.afterEach((to) => {
    setTimeout(() => {
      $intercom.update();
    }, 250)
  })
}

function _extend(app, mixin) {
  if (!app.mixins) {
    app.mixins = [];
  }
  app.mixins.push(mixin);
}
