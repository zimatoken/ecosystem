window.AUTO_REGISTER_CAR({
  meta: { id:"honda_fit", brand:"Honda", model:"Fit", year_from:2001, year_to:2014,
    type:"hatchback", icon:"🚗", country:"Япония", drive:"FWD", segment:"budget" },
  specs: { length:3900, width:1695, height:1525, weight:1050,
    engine_volume:1.3, power_hp:100, transmission:"МКПП",
    acceleration_0_100:12.5, max_speed:175,
    fuel_consumption_city:5.8, fuel_consumption_highway:4.5,
    fuel_tank:42, trunk_volume:400, seats:5, fuel_type:"АИ-95" },
  maintenance: { oil_change_km:10000, oil_change_months:12, oil_type:"5W-30",
    tire_size:"175/65 R14", tire_pressure:2.1, brake_pads_front_km:40000,
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