(function () {
  'use strict';

  var KEY = 'auto_car_photos_v1';
  var MAX_WIDTH = 800;
  var QUALITY = 0.75;

  function get() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('[AUTO] Photo save error:', e);
      return false;
    }
  }

  function compress(file, callback) {
    var reader = new FileReader();
    reader.onload = function (e) {
      var img = new Image();
      img.onload = function () {
        var w = img.width;
        var h = img.height;
        if (w > MAX_WIDTH) {
          h = Math.round(h * MAX_WIDTH / w);
          w = MAX_WIDTH;
        }
        var canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        var dataUrl = canvas.toDataURL('image/jpeg', QUALITY);
        callback(dataUrl);
      };
      img.onerror = function () { callback(null); };
      img.src = e.target.result;
    };
    reader.onerror = function () { callback(null); };
    reader.readAsDataURL(file);
  }

  window.AUTO_PHOTOS = {
    get: get,
    getFor: function (carId) {
      return get()[carId] || null;
    },
    set: function (carId, dataUrl) {
      var data = get();
      data[carId] = dataUrl;
      return save(data);
    },
    remove: function (carId) {
      var data = get();
      delete data[carId];
      return save(data);
    },
    compress: compress,
    pickAndSave: function (carId, onDone) {
      var input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = function () {
        var file = input.files[0];
        if (!file) return;
        if (file.size > 10 * 1024 * 1024) {
          alert('Файл слишком большой (макс 10 МБ)');
          return;
        }
        window.AUTO_PHOTOS.compress(file, function (dataUrl) {
          if (!dataUrl) {
            alert('Не удалось обработать изображение');
            return;
          }
          if (window.AUTO_PHOTOS.set(carId, dataUrl)) {
            if (onDone) onDone(dataUrl);
          } else {
            alert('Не удалось сохранить (хранилище переполнено)');
          }
        });
      };
      input.click();
    }
  };

  console.log('[AUTO] Photos v1.0 loaded (max 800px, JPEG q0.75)');
})();
