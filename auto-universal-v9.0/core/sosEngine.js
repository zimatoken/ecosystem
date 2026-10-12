(function () {
  'use strict';

  window.SOS_ENGINE = {
    getAllTriggers: () => {
      const out = [];
      window.AUTO_GET_ALL().forEach(car => {
        (car.sos_triggers || []).forEach(t => {
          if (!out.find(x => x.id === t.id)) {
            out.push({ ...t, carId: car.meta.id,
              carName: car.meta.brand + ' ' + car.meta.model });
          }
        });
      });
      return out;
    },

    findSolution: (triggerId, answers) => {
      for (const car of window.AUTO_GET_ALL()) {
        const trigger = (car.sos_triggers || []).find(t => t.id === triggerId);
        if (!trigger) continue;
        for (const sol of trigger.solutions) {
          let match = true;
          for (const [key, allowed] of Object.entries(sol.conditions || {})) {
            if (!allowed.includes(answers[key])) { match = false; break; }
          }
          if (match) return sol;
        }
      }
      return {
        title: '🤔 Неоднозначная ситуация',
        urgency: 'medium',
        steps: [
          'Не все ответы однозначны — попробуйте заново',
          'Если не помогло — обратитесь в сервис',
          'Эвакуатор — самый безопасный вариант'
        ],
        warnings: ['Нет точного совпадения по вашим ответам']
      };
    },

    getTrigger: (triggerId) => {
      for (const car of window.AUTO_GET_ALL()) {
        const t = (car.sos_triggers || []).find(x => x.id === triggerId);
        if (t) return t;
      }
      return null;
    }
  };

  console.log('[AUTO] SOS Engine v1.0 loaded');
})();
