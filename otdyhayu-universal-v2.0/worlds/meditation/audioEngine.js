(function () {
  'use strict';

  var ctx = null;
  var currentAudio = null;
  var currentSynth = null;
  var currentId = null;
  var fadeInterval = null;

  // Проверка наличия MP3
  function hasMP3(id) {
    var audio = new Audio();
    audio.src = 'sounds/' + id + '.mp3';
    return new Promise(function(resolve) {
      audio.addEventListener('canplaythrough', function() { resolve(true); });
      audio.addEventListener('error', function() { resolve(false); });
      audio.load();
    });
  }

  // Fade in/out для плавности
  function fadeIn(element, duration, targetVolume) {
    element.volume = 0;
    var step = targetVolume / (duration / 100);
    fadeInterval = setInterval(function() {
      if (element.volume < targetVolume) {
        element.volume = Math.min(element.volume + step, targetVolume);
      } else {
        clearInterval(fadeInterval);
      }
    }, 100);
  }

  function fadeOut(element, duration) {
    var step = element.volume / (duration / 100);
    var int = setInterval(function() {
      if (element.volume > 0) {
        element.volume = Math.max(element.volume - step, 0);
      } else {
        element.pause();
        clearInterval(int);
      }
    }, 100);
  }

  // Воспроизведение MP3
  function playMP3(id, volume) {
    var audio = new Audio('sounds/' + id + '.mp3');
    audio.loop = true;
    audio.volume = 0;
    audio.play().catch(function(e) { console.warn('MP3 play error:', e); });
    fadeIn(audio, 2000, volume);
    return audio;
  }

  // Синтез (fallback) — используем старый код
  function playSynth(id, volume) {
    // Здесь будет старый код синтеза из v1.0
    // Для краткости — заглушка
    console.log('[OTD] Using synth fallback for:', id);
    return null;
  }

  window.OTD_SOUNDS_V2 = {
    play: async function(id, volume) {
      window.OTD_SOUNDS_V2.stop();
      
      // Пробуем MP3
      var hasFile = await hasMP3(id);
      if (hasFile) {
        currentAudio = playMP3(id, volume);
        currentId = id;
        console.log('[OTD] Playing MP3:', id);
        return true;
      } else {
        // Fallback на синтез
        currentSynth = playSynth(id, volume);
        currentId = id;
        console.log('[OTD] Playing synth (fallback):', id);
        return true;
      }
    },
    stop: function() {
      if (fadeInterval) clearInterval(fadeInterval);
      if (currentAudio) {
        fadeOut(currentAudio, 1000);
        setTimeout(function() { currentAudio = null; }, 1100);
      }
      if (currentSynth) {
        // Остановка синтеза
        currentSynth = null;
      }
      currentId = null;
    },
    setVolume: function(v) {
      if (currentAudio) currentAudio.volume = v;
    },
    getCurrentId: function() { return currentId; },
    isPlaying: function() { return !!(currentAudio || currentSynth); }
  };

  console.log('[OTD] Audio Engine v2.0 loaded (MP3 + Synth fallback)');
})();