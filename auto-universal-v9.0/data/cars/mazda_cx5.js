window.AUTO_REGISTER_CAR({
  meta: { id:"mazda_cx5", brand:"Mazda", model:"CX-5", year_from:2012, year_to:2025,
    type:"suv", icon:"🚙", country:"Япония", drive:"AWD", segment:"comfort" },
  specs: { length:4550, width:1840, height:1675, weight:1520,
    engine_volume:2.0, power_hp:150, transmission:"МКПП",
    acceleration_0_100:10.5, max_speed:190,
    fuel_consumption_city:10.0, fuel_consumption_highway:7.0,
    fuel_tank:58, trunk_volume:500, seats:5, fuel_type:"АИ-95" },
  maintenance: { oil_change_km:10000, oil_change_months:12, oil_type:"5W-30",
    tire_size:"225/65 R17", tire_pressure:2.1, brake_pads_front_km:40000,
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