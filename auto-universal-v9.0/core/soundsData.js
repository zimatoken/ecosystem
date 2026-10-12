/**
 * SOUNDS DATA v2.0 — диагностика по звуку
 */
(function () {
  'use strict';

  window.SOUND_REGISTER = function (s) {
    if (!window.SOUNDS) window.SOUNDS = {};
    window.SOUNDS[s.meta.id] = s;
  };

  window.SOUND_GET = (id) => (window.SOUNDS || {})[id] || null;
  window.SOUND_GET_ALL = () => Object.values(window.SOUNDS || {});

  console.log('[AUTO] SoundEngine v2.0 loaded');
})();
