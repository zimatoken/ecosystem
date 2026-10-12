/**
 * COST CALCULATOR v5.1
 */
(function () {
  'use strict';

  const REGIONS = {
    'moscow':    { name: 'Москва',            fuel: 62, osago: 9000, tax: 4000, parking: 12000 },
    'spb':       { name: 'Санкт-Петербург',   fuel: 60, osago: 8500, tax: 3800, parking: 8000 },
    'novosibirsk':{ name: 'Новосибирск',      fuel: 58, osago: 7500, tax: 3200, parking: 4000 },
    'ekaterinburg':{ name: 'Екатеринбург',    fuel: 59, osago: 7800, tax: 3400, parking: 4500 },
    'vladivostok':{ name: 'Владивосток',      fuel: 60, osago: 7200, tax: 3000, parking: 3000 },
    'krasnoyarsk':{ name: 'Красноярск',       fuel: 59, osago: 7300, tax: 3100, parking: 3500 },
    'kazan':     { name: 'Казань',            fuel: 58, osago: 7600, tax: 3300, parking: 3500 },
    'rostov':    { name: 'Ростов-на-Дону',    fuel: 58, osago: 7400, tax: 3100, parking: 3000 },
    'sochi':     { name: 'Сочи',              fuel: 62, osago: 8200, tax: 3500, parking: 8000 },
    'other':     { name: 'Другой регион',     fuel: 60, osago: 8000, tax: 3500, parking: 4000 }
  };

  const DEPRECIATION = {
    '0-1': 0.15, '1-3': 0.10, '3-5': 0.08,
    '5-7': 0.07, '7-10': 0.06, '10+': 0.04
  };

  function getDepreciationAge(year) {
    const age = new Date().getFullYear() - year;
    if (age <= 1)  return DEPRECIATION['0-1'];
    if (age <= 3)  return DEPRECIATION['1-3'];
    if (age <= 5)  return DEPRECIATION['3-5'];
    if (age <= 7)  return DEPRECIATION['5-7'];
    if (age <= 10) return DEPRECIATION['7-10'];
    return DEPRECIATION['10+'];
  }

  function calculate(config) {
    const {
      regionKey = 'other',
      annualKm = 15000,
      carPrice = 1000000,
      carYear = 2015,
      fuelConsumptionCity = 9,
      fuelConsumptionHighway = 6,
      cityPercent = 70,
      hasKasko = false,
      driverAge = 35,
      driverExp = 10
    } = config;

    const region = REGIONS[regionKey] || REGIONS.other;
    const highwayPercent = 100 - cityPercent;
    const avgConsumption = (fuelConsumptionCity * cityPercent / 100) + (fuelConsumptionHighway * highwayPercent / 100);
    const litersPerYear = (annualKm / 100) * avgConsumption;
    const fuelCost = litersPerYear * region.fuel;

    const ageCoef = driverAge < 22 ? 1.8 : (driverAge < 25 ? 1.5 : 1.0);
    const expCoef = driverExp === 0 ? 1.8 : (driverExp < 3 ? 1.3 : (driverExp < 10 ? 1.0 : 0.9));
    const osago = region.osago * ageCoef * expCoef;
    const kasko = hasKasko ? carPrice * 0.06 : 0;
    const tax = region.tax;

    const oilChanges = Math.ceil(annualKm / 15000);
    const toCost = oilChanges * 3500 + 2000;
    const tireCost = 8000;

    const carAge = new Date().getFullYear() - carYear;
    const repairCost = carAge > 10 ? 25000 : carAge > 5 ? 15000 : carAge > 3 ? 8000 : 3000;

    const deprecRate = getDepreciationAge(carYear);
    const depreciation = carPrice * deprecRate;
    const parking = region.parking;
    const fines = 3000;
    const wash = 24 * 400;

    const total = fuelCost + osago + kasko + tax + toCost + tireCost + repairCost + depreciation + parking + fines + wash;

    return {
      total, perMonth: Math.round(total / 12),
      perKm: annualKm > 0 ? (total / annualKm).toFixed(2) : 0,
      breakdown: {
        fuel:        { label: '⛽ Топливо',             value: Math.round(fuelCost), icon: '⛽' },
        osago:       { label: '🛡️ ОСАГО',               value: Math.round(osago), icon: '🛡️' },
        kasko:       { label: '💎 КАСКО',               value: Math.round(kasko), icon: '💎' },
        tax:         { label: '💰 Налог',               value: Math.round(tax), icon: '💰' },
        to:          { label: '🔧 ТО',                  value: Math.round(toCost), icon: '🔧' },
        tires:       { label: '🛞 Шины',                value: Math.round(tireCost), icon: '🛞' },
        repair:      { label: '🛠️ Ремонт',              value: Math.round(repairCost), icon: '🛠️' },
        depreciation:{ label: '📉 Амортизация',         value: Math.round(depreciation), icon: '📉' },
        parking:     { label: '🅿️ Парковка',           value: Math.round(parking), icon: '🅿️' },
        fines:       { label: '📸 Штрафы',              value: Math.round(fines), icon: '📸' },
        wash:        { label: '🚿 Мойка',               value: Math.round(wash), icon: '🚿' }
      },
      inputs: { annualKm, carPrice, carYear, carAge,
        avgConsumption: avgConsumption.toFixed(1),
        litersPerYear: Math.round(litersPerYear),
        region: region.name, fuelPrice: region.fuel }
    };
  }

  function compare(configs) {
    return configs.map(c => calculate(c));
  }

  window.COST_CALCULATOR = { REGIONS, calculate, compare };

  console.log('[AUTO] CostCalculator v5.1 loaded');
})();
