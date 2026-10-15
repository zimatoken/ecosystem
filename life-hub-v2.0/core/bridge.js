
// МОСТИК: Автоматически добавляет кнопку "🏠 Моя Жизнь" в шапку приложения
(function() {
  'use strict';
  
  function injectHubButton() {
    // Ищем заголовок в приложении (поддерживаем разные классы)
    const headers = document.querySelectorAll('.header, header, .app-header');
    if (headers.length === 0) return;
    
    const btn = document.createElement('a');
    btn.href = '../life-hub-v2.0/index.html';
    btn.className = 'btn btn-outline hub-bridge-btn';
    btn.innerHTML = '🏠 Моя Жизнь';
    btn.style.cssText = 'margin-left: auto; font-weight: 700;';
    
    // Вставляем в первый найденный header
    headers[0].appendChild(btn);
    
    // Синхронизируем тему при загрузке
    const savedTheme = localStorage.getItem('ecosystem_theme_universal_v2');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectHubButton);
  } else {
    injectHubButton();
  }
})();
