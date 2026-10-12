window.AUTO_REGISTER_CAR({
  meta: { id:"vw_tiguan", brand:"Volkswagen", model:"Tiguan", year_from:2007, year_to:2025,
    type:"suv", icon:"🚙", country:"Германия", drive:"AWD", segment:"comfort" },
  specs: { length:4506, width:1839, height:1673, weight:1660,
    engine_volume:2.0, power_hp:180, transmission:"МКПП",
    acceleration_0_100:8.5, max_speed:205,
    fuel_consumption_city:10.5, fuel_consumption_highway:7.0,
    fuel_tank:60, trunk_volume:520, seats:5, fuel_type:"АИ-95" },
  maintenance: { oil_change_km:15000, oil_change_months:12, oil_type:"5W-30",
    tire_size:"235/55 R18", tire_pressure:2.1, brake_pads_front_km:40000,
    brake_pads_rear_km:60000, timing_belt_km:90000, air_filter_km:20000,
    cabin_filter_km:15000, spark_plugs_km:30000, battery_years:5 },
  prices: { oil_change:3500, tire_change:4000, brake_pads_front:6000,
    brake_pads_rear:5000, timing_belt:12000, air_filter:800,
    fuel_filter:1500, cabin_filter:1000, coolant:2500, spark_plugs:3000,
    battery:8000, alignment:2500, diagnostic:1500 },
  common_problems: [
    { km_range:"80-100k", issue:"Плановое ТО", cost:12000, urgency:"medium" }
  ],
  reliability: { overall:7, engine:7, transmission:7, suspension:7, electrics:7, body:7 }
});