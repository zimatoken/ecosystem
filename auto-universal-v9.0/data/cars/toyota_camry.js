window.AUTO_REGISTER_CAR({
  meta: { id:"toyota_camry", brand:"Toyota", model:"Camry", year_from:2006, year_to:2025,
    type:"sedan", icon:"🚗", country:"Япония", drive:"FWD", segment:"comfort" },
  specs: { length:4825, width:1825, height:1470, weight:1530,
    engine_volume:2.5, power_hp:181, transmission:"МКПП",
    acceleration_0_100:9.0, max_speed:210,
    fuel_consumption_city:11.0, fuel_consumption_highway:6.8,
    fuel_tank:70, trunk_volume:530, seats:5, fuel_type:"АИ-95" },
  maintenance: { oil_change_km:10000, oil_change_months:12, oil_type:"5W-30",
    tire_size:"215/60 R17", tire_pressure:2.1, brake_pads_front_km:40000,
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