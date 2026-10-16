(function () {
  'use strict';
  window.OTD_AI = {
    speak: function (context) {
      var greeting = window.OTD_IDENTITY ? window.OTD_IDENTITY.getGreeting() : 'Привет!';
      return greeting + '\n\n💡 ' + context;
    }
  };
})();