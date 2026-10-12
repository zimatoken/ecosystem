
(function () {
  'use strict';
  window.SOS_ENGINE = {
    getAllTriggers: () => {
      const out = [];
      window.GARDEN_GET_ALL().forEach(p => {
        (p.sos_triggers || []).forEach(t => {
          out.push({ ...t, plantId: p.meta.id, plantName: p.meta.name, plantIcon: p.meta.icon });
        });
      });
      return out;
    },
    findSolution: (triggerId, answers) => {
      const trigger = window.SOS_ENGINE.getAllTriggers().find(t => t.id === triggerId);
      if (!trigger) return null;
      for (const sol of trigger.solutions) {
        let match = true;
        for (const [key, allowed] of Object.entries(sol.conditions || {})) {
          if (!allowed.includes(answers[key])) { match = false; break; }
        }
        if (match) return { ...sol, plantName: trigger.plantName, icon: trigger.plantIcon };
      }
      return {
        title: '🤔 Неоднозначная ситуация',
        steps: [
          'Проверьте ещё раз симптомы — возможно, не все вопросы отвечены точно.',
          'Обратитесь в Энциклопедию: раздел «Болезни и вредители».'
        ],
        warnings: ['Нет точного совпадения по вашим ответам.']
      };
    }
  };
  console.log('[GARDEN] SOS Engine v6.0 loaded');
})();
