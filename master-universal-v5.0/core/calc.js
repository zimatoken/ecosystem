(function () {
  'use strict';

  const MATERIALS = {
    paint: {
      name: '🎨 Краска',
      unit: 'л',
      per_m2: 0.15,
      price_per_unit: 600,
      formula: (area) => Math.ceil(area * 0.15 * 2), // 2 слоя
      notes: 'На 2 слоя. Обычно 1 литр = 7 м².'
    },
    wallpaper: {
      name: '🖼️ Обои',
      unit: 'рул.',
      per_m2: 1/5,
      price_per_unit: 1500,
      formula: (area) => Math.ceil(area / 5),
      notes: 'Один рулон 5 м² (стандарт). С запасом +10%.'
    },
    tile: {
      name: '🔲 Плитка',
      unit: 'м²',
      price_per_unit: 1200,
      formula: (area) => Math.ceil(area * 1.1),
      notes: 'С запасом 10% на подрезку.'
    },
    laminate: {
      name: '🪵 Ламинат',
      unit: 'м²',
      price_per_unit: 1500,
      formula: (area) => Math.ceil(area * 1.07),
      notes: 'Запас 7% на подрезку.'
    },
    glue: {
      name: '🧴 Клей обойный',
      unit: 'уп.',
      price_per_unit: 500,
      formula: (area) => Math.ceil(area / 30),
      notes: 'Одна упаковка на 30 м².'
    },
    plaster: {
      name: '🏗️ Штукатурка',
      unit: 'меш.',
      price_per_unit: 400,
      formula: (area) => Math.ceil(area * 8 / 30),
      notes: 'Один мешок 30 кг на 8 м² (толщина 10 мм).'
    },
    putty: {
      name: '🧴 Шпаклёвка',
      unit: 'кг',
      price_per_unit: 80,
      formula: (area) => Math.ceil(area * 1.5),
      notes: 'На 1 м² — 1.5 кг на 2 слоя.'
    },
    primer: {
      name: '🖌️ Грунтовка',
      unit: 'л',
      price_per_unit: 150,
      formula: (area) => Math.ceil(area * 0.2),
      notes: 'На 1 м² — 0.2 л.'
    }
  };

  window.MASTER_CALC = {
    getMaterials: () => MATERIALS,
    calculate: (materialKey, area) => {
      const m = MATERIALS[materialKey];
      if (!m) return null;
      const qty = m.formula(area);
      return {
        material: m.name,
        area: area,
        quantity: qty,
        unit: m.unit,
        pricePerUnit: m.price_per_unit,
        total: qty * m.price_per_unit,
        notes: m.notes
      };
    },
    calculateRoom: (length, width, height) => {
      const area = length * width;
      const wallArea = 2 * (length + width) * height;
      const ceilingArea = area;
      return {
        floor: area,
        walls: wallArea,
        ceiling: ceilingArea,
        total: area + wallArea + ceilingArea
      };
    }
  };

  console.log('[MASTER] Calculator v1.0 loaded');
})();
