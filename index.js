(function(w){"use strict";var v={exports:{}},O={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var P=w,U=Symbol.for("react.element"),F=Symbol.for("react.fragment"),k=Object.prototype.hasOwnProperty,j=P.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Y={key:!0,ref:!0,__self:!0,__source:!0};function y(t,s,i){var n,r={},d=null,E=null;i!==void 0&&(d=""+i),s.key!==void 0&&(d=""+s.key),s.ref!==void 0&&(E=s.ref);for(n in s)k.call(s,n)&&!Y.hasOwnProperty(n)&&(r[n]=s[n]);if(t&&t.defaultProps)for(n in s=t.defaultProps,s)r[n]===void 0&&(r[n]=s[n]);return{$$typeof:U,type:t,key:d,ref:E,props:r,_owner:j.current}}O.Fragment=F,O.jsx=y,O.jsxs=y,v.exports=O;var a=v.exports;const K=268435456,z={GLOBAL:16777216,WINDOW:50331648,MIRROR:67108864,SEAT:83886080,DOOR:100663296,WHEEL:117440512,VENDOR:134217728},q={STRING:1048576,BOOLEAN:2097152,INT32:4194304,INT32_VEC:4259840,INT64:5242880,INT64_VEC:5308416,FLOAT:6291456,FLOAT_VEC:6356992,BYTES:7340032,MIXED:14680064},X=t=>{const s=t.indexOf("_");return s===-1?t:t.substring(0,s)},$=t=>{const s=parseInt(t.baseId,16);return`0x${(K+z[t.area]+q[t.dataType]+s>>>0).toString(16).toUpperCase().padStart(8,"0")}`},Z=t=>`SYSTEM.${t.area}.${t.name}`,Q=t=>{const s={};for(const i of t)s[i.group]||(s[i.group]=[]),s[i.group].push(i);for(const i of Object.keys(s))s[i].sort((n,r)=>n.name.localeCompare(r.name));return s},J=t=>{const s={};for(const i of t)s[i.area]||(s[i.area]=[]),s[i.area].push(i);for(const i of Object.keys(s))s[i].sort((n,r)=>n.name.localeCompare(r.name));return s},e=t=>({...t,group:X(t.name)}),m=[e({name:"INFO_VIN",description:"VIN of the vehicle.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"STRING",version:1,baseId:"0x0100"}),e({name:"INFO_MAKE",description:"Manufacturer of the vehicle. Communicates the vehicle's public brand name.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"STRING",version:1,baseId:"0x0101"}),e({name:"INFO_MODEL",description:"Model of the vehicle. Communicates the vehicle's public model name.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"STRING",version:1,baseId:"0x0102"}),e({name:"INFO_MODEL_YEAR",description:"Model year of the vehicle in YYYY format based on the Gregorian calendar.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32",unit:"VehicleUnit.YEAR",version:1,baseId:"0x0103"}),e({name:"INFO_FUEL_CAPACITY",description:"Maximum amount of fuel that can be stored in the vehicle, in milliliters. Does not apply to pure electric vehicles; for EVs use INFO_EV_BATTERY_CAPACITY.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.MILLILITER",version:1,baseId:"0x0104"}),e({name:"INFO_FUEL_TYPE",description:"List of fuels the vehicle may use. FUEL_TYPE_ELECTRIC must only be included if the vehicle is plug-in rechargeable.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",dataEnum:["FuelType"],version:1,baseId:"0x0105"}),e({name:"INFO_EV_BATTERY_CAPACITY",description:"Nominal usable battery capacity for an EV or hybrid vehicle. This is the total usable capacity when the vehicle is new.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.WATT_HOUR",version:1,baseId:"0x0106"}),e({name:"INFO_EV_CONNECTOR_TYPE",description:"List of connectors this EV may use. If multiple charging ports exist, returns all possible connector types.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",dataEnum:["EvConnectorType"],version:1,baseId:"0x0107"}),e({name:"INFO_FUEL_DOOR_LOCATION",description:"Fuel door location on the vehicle. Does not apply to pure electric vehicles.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["PortLocationType"],version:1,baseId:"0x0108"}),e({name:"INFO_EV_PORT_LOCATION",description:"EV port location for the fastest-charging port on the vehicle. Use INFO_MULTI_EV_PORT_LOCATIONS to expose all ports.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["PortLocationType"],version:1,baseId:"0x0109"}),e({name:"INFO_DRIVER_SEAT",description:"Driver's seat location. VHAL implementations must ignore the areaId and use VehicleArea:GLOBAL.",changeMode:"STATIC",access:["READ"],area:"SEAT",dataType:"INT32",dataEnum:["VehicleAreaSeat"],version:1,baseId:"0x010A"}),e({name:"INFO_EXTERIOR_DIMENSIONS",description:"Exterior dimensions of the vehicle: height, length, width, width including mirrors, wheel base, track widths and curb-to-curb turning diameter.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",unit:"VehicleUnit.MILLIMETER",version:1,baseId:"0x010B"}),e({name:"INFO_MULTI_EV_PORT_LOCATIONS",description:"Multiple EV port locations. Implement when the vehicle has more than one charging port.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",dataEnum:["PortLocationType"],version:1,baseId:"0x010C"}),e({name:"INFO_MODEL_TRIM",description:"Public trim name of the vehicle. Empty for the base model and set to the trim name (e.g. 'Sport') for higher trims.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"STRING",version:4,baseId:"0x010D"}),e({name:"INFO_VEHICLE_SIZE_CLASS",description:"Vehicle Size Class. Returns the size classifications followed by the vehicle as enumerated in VehicleSizeClass.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",dataEnum:["VehicleSizeClass"],version:4,baseId:"0x010E"}),e({name:"PERF_ODOMETER",description:"Current odometer value of the vehicle.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.KILOMETER",version:1,baseId:"0x0204"}),e({name:"PERF_VEHICLE_SPEED",description:"Speed of the vehicle. Positive when moving forward, negative when reversing. Independent of GEAR_SELECTION.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.METER_PER_SEC",version:1,baseId:"0x0207"}),e({name:"PERF_VEHICLE_SPEED_DISPLAY",description:"Speed of the vehicle as shown on the speedometer. May differ slightly from the actual speed.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.METER_PER_SEC",version:1,baseId:"0x0208"}),e({name:"PERF_STEERING_ANGLE",description:"Front bicycle-model steering angle for the vehicle in degrees. Left is negative. Independent of the steering wheel angle.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.DEGREES",version:1,baseId:"0x0209"}),e({name:"PERF_REAR_STEERING_ANGLE",description:"Rear bicycle-model steering angle for the vehicle in degrees. Left is negative.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.DEGREES",version:1,baseId:"0x0210"}),e({name:"INSTANTANEOUS_FUEL_ECONOMY",description:"Instantaneous fuel economy in L/100km. Independent of any *_DISPLAY_UNITS configuration.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",version:4,baseId:"0x0211"}),e({name:"INSTANTANEOUS_EV_EFFICIENCY",description:"Instantaneous EV battery efficiency in km/kWh. Independent of any *_DISPLAY_UNITS configuration.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",version:4,baseId:"0x0212"}),e({name:"ENGINE_COOLANT_TEMP",description:"Temperature of engine coolant.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.CELSIUS",version:1,baseId:"0x0301"}),e({name:"ENGINE_OIL_LEVEL",description:"Engine oil level. The supportedEnumValues array must list the supported VehicleOilLevel states.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleOilLevel"],version:1,baseId:"0x0303"}),e({name:"ENGINE_OIL_TEMP",description:"Temperature of engine oil.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.CELSIUS",version:1,baseId:"0x0304"}),e({name:"ENGINE_RPM",description:"Engine RPM.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.RPM",version:1,baseId:"0x0305"}),e({name:"ENGINE_IDLE_AUTO_STOP_ENABLED",description:"Engine idle automatic stop feature. If true, the vehicle may automatically shut off the engine when not needed and restart it on demand.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x0320"}),e({name:"WHEEL_TICK",description:"Reports wheel ticks. The first element is a reset count; the next four are cumulative ticks for the four wheels (FL, FR, RR, RL).",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"INT64_VEC",version:1,baseId:"0x0306"}),e({name:"FUEL_LEVEL",description:"Current amount of fuel remaining in the vehicle in milliliters. Does not apply to pure electric vehicles.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.MILLILITER",version:1,baseId:"0x0307"}),e({name:"FUEL_DOOR_OPEN",description:"Whether the fuel door on the vehicle is open. Does not apply to pure electric vehicles.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x0308"}),e({name:"FUEL_LEVEL_LOW",description:"Warning for low fuel level. Once set, must not be cleared until more fuel is added.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x0405"}),e({name:"FUEL_VOLUME_DISPLAY_UNITS",description:"Units the car uses to display fuel volume to the user (e.g. LITER, GALLON). Updates may affect other *_DISPLAY_UNITS values.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleUnit"],version:1,baseId:"0x0601"}),e({name:"FUEL_CONSUMPTION_UNITS_DISTANCE_OVER_VOLUME",description:"Type of units used to display fuel consumption. True for distance/volume (MPG), false for volume/distance (L/100KM).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x0604"}),e({name:"EV_BATTERY_LEVEL",description:"Current battery level for an EV or hybrid vehicle. Will not exceed EV_CURRENT_BATTERY_CAPACITY.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.WATT_HOUR",version:1,baseId:"0x0309"}),e({name:"EV_CURRENT_BATTERY_CAPACITY",description:"Real-time usable battery capacity. Accounts for factors such as battery aging and temperature dependency.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.WATT_HOUR",version:2,baseId:"0x030D"}),e({name:"EV_CHARGE_PORT_OPEN",description:"EV charge port open. If multiple charging ports exist, returns true if any are open.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x030A"}),e({name:"EV_CHARGE_PORT_CONNECTED",description:"EV charge port connected. If multiple charging ports exist, returns true if any are connected.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x030B"}),e({name:"EV_BATTERY_INSTANTANEOUS_CHARGE_RATE",description:"EV instantaneous charge rate in milliwatts. Positive while charging, negative while discharging.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.MILLIWATTS",version:1,baseId:"0x030C"}),e({name:"EV_BATTERY_AVERAGE_TEMPERATURE",description:"EV battery average temperature. Should be the mean or weighted average across multiple sensors/batteries.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.CELSIUS",version:3,baseId:"0x030E"}),e({name:"EV_BRAKE_REGENERATION_LEVEL",description:"Regenerative braking level of an electric vehicle. minInt32Value indicates no regeneration; maxInt32Value indicates maximum energy regenerated.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",version:2,baseId:"0x040C"}),e({name:"EV_STOPPING_MODE",description:"Current EV stopping mode. Supported values come from the EvStoppingMode enum.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["EvStoppingMode"],version:2,baseId:"0x040D"}),e({name:"EV_BATTERY_DISPLAY_UNITS",description:"Units used to display EV battery information to the user (e.g. WATT_HOUR, KILOWATT_HOUR, AMPERE_HOURS).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleUnit"],version:1,baseId:"0x0603"}),e({name:"EV_CHARGE_CURRENT_DRAW_LIMIT",description:"Selected AC EV charging draw limit in Amperes. configArray[0] specifies the max draw allowed at boot time.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.AMPERE",version:1,baseId:"0x0F3F"}),e({name:"EV_CHARGE_PERCENT_LIMIT",description:"Maximum charge percent threshold set by the user. Returns a float value from 0 to 100.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"FLOAT",version:1,baseId:"0x0F40"}),e({name:"EV_CHARGE_STATE",description:"Current EV charging state of the car. Must return STATE_FULLY_CHARGED when EV_CHARGE_PERCENT_LIMIT is reached.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["EvChargeState"],version:1,baseId:"0x0F41"}),e({name:"EV_CHARGE_SWITCH",description:"Start or stop charging the EV battery. true starts charging, false stops it.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x0F42"}),e({name:"EV_CHARGE_TIME_REMAINING",description:"Estimated EV charge time remaining in seconds. Returns 0 when the vehicle is not charging.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"INT32",unit:"VehicleUnit.SECS",version:1,baseId:"0x0F43"}),e({name:"EV_REGENERATIVE_BRAKING_STATE",description:"Regenerative braking or one-pedal drive setting. EV_BRAKE_REGENERATION_LEVEL provides a more granular alternative.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["EvRegenerativeBrakingState"],version:1,baseId:"0x0F44"}),e({name:"RANGE_REMAINING",description:"Meters remaining of fuel and charge. Sum of ranges from all energy sources in the vehicle.",changeMode:"CONTINUOUS",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.METER",version:1,baseId:"0x0308"}),e({name:"TIRE_PRESSURE",description:"Tire pressure. Each tire is identified by its areaConfig.areaId. minFloatValue/maxFloatValue store the OEM's recommended pressure range.",changeMode:"CONTINUOUS",access:["READ"],area:"WHEEL",dataType:"FLOAT",unit:"VehicleUnit.KILOPASCAL",version:1,baseId:"0x0309"}),e({name:"CRITICALLY_LOW_TIRE_PRESSURE",description:"Critically low tire pressure threshold for each tire. Indicates when tires must be replaced or fixed.",changeMode:"STATIC",access:["READ"],area:"WHEEL",dataType:"FLOAT",unit:"VehicleUnit.KILOPASCAL",version:1,baseId:"0x030A"}),e({name:"TIRE_PRESSURE_DISPLAY_UNITS",description:"Units used to display tire pressure to the user (e.g. KILOPASCAL, PSI, BAR).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleUnit"],version:1,baseId:"0x0602"}),e({name:"ACCELERATOR_PEDAL_COMPRESSION_PERCENTAGE",description:"Accelerator pedal compression percentage from 0 (not compressed) to 100 (maximally compressed).",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",version:4,baseId:"0x030F"}),e({name:"BRAKE_PEDAL_COMPRESSION_PERCENTAGE",description:"Brake pedal compression percentage from 0 (not compressed) to 100 (maximally compressed).",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",version:4,baseId:"0x0310"}),e({name:"BRAKE_PAD_WEAR_PERCENTAGE",description:"Brake pad wear percentage accumulated by the vehicle from 0 (no wear) to 100 (maximally worn).",changeMode:"ON_CHANGE",access:["READ"],area:"WHEEL",dataType:"FLOAT",version:4,baseId:"0x0311"}),e({name:"BRAKE_FLUID_LEVEL_LOW",description:"Brake fluid low. Communicates that the brake fluid level in the vehicle is low according to the OEM.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"BOOLEAN",version:4,baseId:"0x0312"}),e({name:"VEHICLE_PASSIVE_SUSPENSION_HEIGHT",description:"Real-time suspension displacement of the vehicle in mm relative to the suspension's neutral position.",changeMode:"CONTINUOUS",access:["READ"],area:"WHEEL",dataType:"INT32",version:4,baseId:"0x0313"}),e({name:"IMPACT_DETECTED",description:"Bit-flag property indicating whether an impact has been detected on a particular side of the vehicle (ImpactSensorLocation).",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["ImpactSensorLocation"],dataEnumBitFlags:!0,version:3,baseId:"0x0330"}),e({name:"VEHICLE_HORN_ENGAGED",description:"Whether the vehicle's horn is currently engaged. true means engaged, false means disengaged.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:4,baseId:"0x0340"}),e({name:"GEAR_SELECTION",description:"Currently selected gear. The supported values list represents the list of supported gears for this vehicle.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleGear"],version:1,baseId:"0x0400"}),e({name:"CURRENT_GEAR",description:"Current gear actually engaged. May not match GEAR_SELECTION in non-manual transmissions.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleGear"],version:1,baseId:"0x0401"}),e({name:"PARKING_BRAKE_ON",description:"Parking brake state. true if the car's parking brake is currently engaged, false otherwise.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x0402"}),e({name:"PARKING_BRAKE_AUTO_APPLY",description:"Auto-apply parking brake. true if the vehicle's automatic parking brake feature is currently enabled.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x0403"}),e({name:"NIGHT_MODE",description:"Night mode. true means the night mode sensor has detected low light in the cabin environment.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x0407"}),e({name:"TURN_SIGNAL_STATE",description:"(Deprecated) State of the vehicle's turn signals. Replaced by TURN_SIGNAL_LIGHT_STATE and TURN_SIGNAL_SWITCH.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleTurnSignal"],version:1,baseId:"0x0408"}),e({name:"IGNITION_STATE",description:"Represents the ignition state. Supported values come from the VehicleIgnitionState enum.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleIgnitionState"],version:1,baseId:"0x0409"}),e({name:"ABS_ACTIVE",description:"ABS active. true while ABS is active. May pulse based on the real-time state of the ABS system.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x040A"}),e({name:"TRACTION_CONTROL_ACTIVE",description:"Traction Control active. true while TC is active. May pulse based on the real-time state of the TC system.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x040B"}),e({name:"ELECTRONIC_STABILITY_CONTROL_ENABLED",description:"Enable or disable Electronic Stability Control (ESC). When enabled, the system actively controls the tires to prevent skidding.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:3,baseId:"0x040E"}),e({name:"ELECTRONIC_STABILITY_CONTROL_STATE",description:"Current state of Electronic Stability Control (ESC). Errors must be conveyed via supported ErrorState values.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["ElectronicStabilityControlState","ErrorState"],version:3,baseId:"0x040F"}),e({name:"TURN_SIGNAL_LIGHT_STATE",description:"Actual state of the turn signal lights. Uses VehicleTurnSignal as a bit flag so multiple lights can be ORed together.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleTurnSignal"],dataEnumBitFlags:!0,version:4,baseId:"0x0410"}),e({name:"TURN_SIGNAL_SWITCH",description:"Position of the turn signal lever/switch. Different from TURN_SIGNAL_LIGHT_STATE which represents the actual lights.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleTurnSignal"],version:4,baseId:"0x0411"}),e({name:"HVAC_FAN_SPEED",description:"Fan speed setting. Specified as a relative range between minInt32Value (lowest) and maxInt32Value (highest).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0500"}),e({name:"HVAC_FAN_DIRECTION",description:"Current HVAC fan direction setting. Supported directions are exposed through HVAC_FAN_DIRECTION_AVAILABLE.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",dataEnum:["VehicleHvacFanDirection"],version:1,baseId:"0x0501"}),e({name:"HVAC_TEMPERATURE_CURRENT",description:"HVAC current temperature.",changeMode:"ON_CHANGE",access:["READ"],area:"SEAT",dataType:"FLOAT",unit:"VehicleUnit.CELSIUS",version:1,baseId:"0x0502"}),e({name:"HVAC_TEMPERATURE_SET",description:"HVAC target temperature set in Celsius. Supports a Celsius<->Fahrenheit lookup table via configArray.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"FLOAT",unit:"VehicleUnit.CELSIUS",version:1,baseId:"0x0503"}),e({name:"HVAC_DEFROSTER",description:"Fan-based defrost for the designated window.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"WINDOW",dataType:"BOOLEAN",version:1,baseId:"0x0504"}),e({name:"HVAC_AC_ON",description:"On/off AC for the designated areaId.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:1,baseId:"0x0505"}),e({name:"HVAC_MAX_AC_ON",description:"On/off MAX AC. The ECU may adjust vent position, fan speed and temperature to cool the vehicle as quickly as possible.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:1,baseId:"0x0506"}),e({name:"HVAC_MAX_DEFROST_ON",description:"On/off MAX DEFROST. The ECU may adjust vent position, fan speed and temperature to defrost the windows as quickly as possible.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:1,baseId:"0x0507"}),e({name:"HVAC_RECIRC_ON",description:"Recirculation on/off. Controls the supply of exterior air to the cabin.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:1,baseId:"0x0508"}),e({name:"HVAC_DUAL_ON",description:"Enable temperature coupling between areas. Synchronises temperature for the affected areas.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:1,baseId:"0x0509"}),e({name:"HVAC_AUTO_ON",description:"On/off automatic climate control.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:1,baseId:"0x050A"}),e({name:"HVAC_SEAT_TEMPERATURE",description:"Seat heating/cooling. Range from minInt32Value (max cooling, or 0) to maxInt32Value (max heating).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x050B"}),e({name:"HVAC_SIDE_MIRROR_HEAT",description:"Side mirror heat. minInt32Value=0 (no heating) to maxInt32Value (maximum heating level).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"MIRROR",dataType:"INT32",version:1,baseId:"0x050C"}),e({name:"HVAC_STEERING_WHEEL_HEAT",description:"Steering wheel heating/cooling. minInt32Value indicates max cooling (or 0) and maxInt32Value indicates max heating.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",version:1,baseId:"0x050D"}),e({name:"HVAC_TEMPERATURE_DISPLAY_UNITS",description:"Temperature units used for display. Must be one of VehicleUnit.CELSIUS or VehicleUnit.FAHRENHEIT.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleUnit"],version:1,baseId:"0x050E"}),e({name:"HVAC_ACTUAL_FAN_SPEED_RPM",description:"Actual fan speed.",changeMode:"ON_CHANGE",access:["READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x050F"}),e({name:"HVAC_POWER_ON",description:"Global HVAC power state. Setting to false may mark some HVAC sub-system properties UNAVAILABLE.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:1,baseId:"0x0510"}),e({name:"HVAC_FAN_DIRECTION_AVAILABLE",description:"List of supported fan directions in the vehicle. Bit mask of VehicleHvacFanDirection per area ID.",changeMode:"STATIC",access:["READ"],area:"SEAT",dataType:"INT32_VEC",dataEnum:["VehicleHvacFanDirection"],dataEnumBitFlags:!0,version:1,baseId:"0x0511"}),e({name:"HVAC_AUTO_RECIRC_ON",description:"Automatic recirculation on/off. The HVAC system may switch to recirculation mode if poor air quality is detected.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:1,baseId:"0x0512"}),e({name:"HVAC_SEAT_VENTILATION",description:"Seat ventilation. minInt32Value=0 to maxInt32Value (max ventilation). Independent from seat cooling.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0513"}),e({name:"HVAC_ELECTRIC_DEFROSTER_ON",description:"Electric defrosters' status.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"WINDOW",dataType:"BOOLEAN",version:1,baseId:"0x0514"}),e({name:"HVAC_TEMPERATURE_VALUE_SUGGESTION",description:"Suggested values for setting HVAC temperature. Helps applications find the closest supported value in Celsius or Fahrenheit.",changeMode:"ON_CHANGE",access:["READ_WRITE"],area:"GLOBAL",dataType:"FLOAT_VEC",version:1,baseId:"0x0515"}),e({name:"DISTANCE_DISPLAY_UNITS",description:"Units the car uses to display distances (e.g. METER, KILOMETER, MILE).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleUnit"],version:1,baseId:"0x0600"}),e({name:"VEHICLE_SPEED_DISPLAY_UNITS",description:"Units the car uses to display speed to the user (e.g. M/S, MPH, KM/H).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleUnit"],version:1,baseId:"0x0605"}),e({name:"EXTERNAL_CAR_TIME",description:"Current date and time suggestion for the car, encoded as Epoch time in milliseconds.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT64",unit:"VehicleUnit.MILLI_SECS",version:1,baseId:"0x0608"}),e({name:"ANDROID_EPOCH_TIME",description:"Current date and time encoded as Epoch time in ms. CarServices writes Android's system time to share with the VHAL.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"INT64",unit:"VehicleUnit.MILLI_SECS",version:1,baseId:"0x0606"}),e({name:"STORAGE_ENCRYPTION_BINDING_SEED",description:"External encryption binding seed (16 bytes). Mixed with the local key storage encryption key and persisted on a separate ECU.",changeMode:"ON_CHANGE",access:["READ_WRITE"],area:"GLOBAL",dataType:"BYTES",version:1,baseId:"0x0607"}),e({name:"ENV_OUTSIDE_TEMPERATURE",description:"Outside temperature reading from the environment outside the vehicle. Should be the mean of all sensors when multiple exist.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.CELSIUS",version:1,baseId:"0x0703"}),e({name:"AP_POWER_STATE_REQ",description:"Property to control the power state of the application processor. Carries a VehicleApPowerStateReq value.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",version:1,baseId:"0x0A00"}),e({name:"AP_POWER_STATE_REPORT",description:"Property used to report the application processor power state, with optional wake-up time in ms.",changeMode:"ON_CHANGE",access:["READ_WRITE"],area:"GLOBAL",dataType:"INT32_VEC",version:1,baseId:"0x0A01"}),e({name:"AP_POWER_BOOTUP_REASON",description:"Reports the bootup reason for the current power-on cycle. A static property for the duration until power off.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32",version:1,baseId:"0x0A02"}),e({name:"DISPLAY_BRIGHTNESS",description:"Brightness of the display. Use PER_DISPLAY_BRIGHTNESS for vehicles with displays controlled separately.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",version:1,baseId:"0x0A03"}),e({name:"PER_DISPLAY_BRIGHTNESS",description:"Brightness of displays controlled separately. int32Values[0]=display port, int32Values[1]=brightness.",changeMode:"ON_CHANGE",access:["READ_WRITE"],area:"GLOBAL",dataType:"INT32_VEC",version:2,baseId:"0x0A04"}),e({name:"PER_DISPLAY_MAX_BRIGHTNESS",description:"Max brightness of displays controlled separately. Pairs of [display port, max brightness] entries.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",version:3,baseId:"0x0F4E"}),e({name:"VALET_MODE_ENABLED",description:"Valet mode enabled. Prevents an untrusted driver from accessing more private areas (glove box, trunk).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:3,baseId:"0x0A05"}),e({name:"HEAD_UP_DISPLAY_ENABLED",description:"Head-up display (HUD) enabled. Each HUD should be assigned to the seat that is intended to use it.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:3,baseId:"0x0A06"}),e({name:"HW_KEY_INPUT",description:"Property to feed hardware key input events to Android: action, key code, target display and an optional repeat count.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",version:1,baseId:"0x0A10"}),e({name:"HW_KEY_INPUT_V2",description:"Hardware key input events V2 with target display, key code, action, repeat count and a precise down-time.",changeMode:"ON_CHANGE",access:["READ"],area:"SEAT",dataType:"MIXED",version:2,baseId:"0x0A11"}),e({name:"HW_MOTION_INPUT",description:"Hardware motion input events: source, action, button state, pointer count plus per-pointer data and timing.",changeMode:"ON_CHANGE",access:["READ"],area:"SEAT",dataType:"MIXED",version:2,baseId:"0x0A12"}),e({name:"HW_ROTARY_INPUT",description:"Hardware rotary events: rotary type, number of detents (clockwise/counterclockwise), target display and inter-detent timings.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",dataEnum:["RotaryInputType"],version:1,baseId:"0x0A20"}),e({name:"HW_CUSTOM_INPUT",description:"Custom OEM partner input event used for events not supported by Android. Identified by a CustomInputType.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",dataEnum:["CustomInputType"],version:1,baseId:"0x0A30"}),e({name:"DOOR_POS",description:"Door position. minInt32Value=0 (closed) and maxInt32Value (fully open). Some vehicles may open the door electronically.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"DOOR",dataType:"INT32",version:1,baseId:"0x0B00"}),e({name:"DOOR_MOVE",description:"Door move. Magnitude indicates speed; sign indicates direction. Resets to 0 once the door reaches its limit.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"DOOR",dataType:"INT32",version:1,baseId:"0x0B01"}),e({name:"DOOR_LOCK",description:"Door lock. true indicates the door is locked.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"DOOR",dataType:"BOOLEAN",version:1,baseId:"0x0B02"}),e({name:"DOOR_CHILD_LOCK_ENABLED",description:"Door child lock feature enabled. When true, the door cannot be opened from the inside.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"DOOR",dataType:"BOOLEAN",version:2,baseId:"0x0B03"}),e({name:"MIRROR_Z_POS",description:"Mirror Z (tilt up/down) position. Negative values tilt down, positive tilt up; 0 means no tilt in either direction.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"MIRROR",dataType:"INT32",version:1,baseId:"0x0B40"}),e({name:"MIRROR_Z_MOVE",description:"Mirror Z move. Magnitude indicates speed; sign indicates direction. Resets to 0 at positional limits.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"MIRROR",dataType:"INT32",version:1,baseId:"0x0B41"}),e({name:"MIRROR_Y_POS",description:"Mirror Y (tilt left/right) position. Negative tilts to the left, positive to the right.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"MIRROR",dataType:"INT32",version:1,baseId:"0x0B42"}),e({name:"MIRROR_Y_MOVE",description:"Mirror Y move. Magnitude indicates speed; sign indicates direction.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"MIRROR",dataType:"INT32",version:1,baseId:"0x0B43"}),e({name:"MIRROR_LOCK",description:"Mirror lock. true indicates mirror positions are locked and not changeable.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x0B44"}),e({name:"MIRROR_FOLD",description:"Mirror fold. true indicates mirrors are folded.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x0B45"}),e({name:"MIRROR_AUTO_FOLD_ENABLED",description:"Mirror auto fold feature. true when the vehicle's side mirrors will fold automatically (e.g. when the vehicle is locked).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"MIRROR",dataType:"BOOLEAN",version:2,baseId:"0x0B46"}),e({name:"MIRROR_AUTO_TILT_ENABLED",description:"Mirror auto tilt feature. true when the vehicle's side mirrors tilt automatically (e.g. on reverse).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"MIRROR",dataType:"BOOLEAN",version:2,baseId:"0x0B47"}),e({name:"SEAT_MEMORY_SELECT",description:"Seat memory select. Selects which preset memory slot to apply to the seat position.",changeMode:"ON_CHANGE",access:["WRITE"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B80"}),e({name:"SEAT_MEMORY_SET",description:"Seat memory set. Saves the current seat position settings into the selected preset slot.",changeMode:"ON_CHANGE",access:["WRITE"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B81"}),e({name:"SEAT_BELT_BUCKLED",description:"Seat belt buckled. true indicates the belt is buckled.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:1,baseId:"0x0B82"}),e({name:"SEAT_BELT_HEIGHT_POS",description:"Seat belt height position. Adjusts the shoulder belt anchor between its lowest and highest positions.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B83"}),e({name:"SEAT_BELT_HEIGHT_MOVE",description:"Seat belt height move. Speed of moving the seat belt's shoulder anchor up or down.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B84"}),e({name:"SEAT_FORE_AFT_POS",description:"Seat fore/aft position. Sets the seat position forward and backward.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B85"}),e({name:"SEAT_FORE_AFT_MOVE",description:"Seat fore/aft move. Moves the entire seat forward/backward in the direction it is facing.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B86"}),e({name:"SEAT_BACKREST_ANGLE_1_POS",description:"Seat backrest angle 1 position. Backrest angle 1 is the actuator closest to the bottom of the seat.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B87"}),e({name:"SEAT_BACKREST_ANGLE_1_MOVE",description:"Seat backrest angle 1 move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B88"}),e({name:"SEAT_BACKREST_ANGLE_2_POS",description:"Seat backrest angle 2 position. Backrest angle 2 is the next actuator up from the bottom of the seat.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B89"}),e({name:"SEAT_BACKREST_ANGLE_2_MOVE",description:"Seat backrest angle 2 move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B8A"}),e({name:"SEAT_HEIGHT_POS",description:"Seat height position. minInt32Value (lowest) to maxInt32Value (highest position).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B8B"}),e({name:"SEAT_HEIGHT_MOVE",description:"Seat height move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B8C"}),e({name:"SEAT_DEPTH_POS",description:"Seat depth position. Distance from back rest to front edge of the seat.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B8D"}),e({name:"SEAT_DEPTH_MOVE",description:"Seat depth move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B8E"}),e({name:"SEAT_TILT_POS",description:"Seat tilt position. Angles the seat bottom from its lowest to its highest angular position.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B8F"}),e({name:"SEAT_TILT_MOVE",description:"Seat tilt move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B90"}),e({name:"SEAT_LUMBAR_FORE_AFT_POS",description:"Lumbar fore/aft position. minInt32Value (rearward most, least supportive) to maxInt32Value (most supportive).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B91"}),e({name:"SEAT_LUMBAR_FORE_AFT_MOVE",description:"Lumbar fore/aft move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B92"}),e({name:"SEAT_LUMBAR_SIDE_SUPPORT_POS",description:"Lumbar side support position. minInt32Value (thinnest, most support) to maxInt32Value (widest, least support).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B93"}),e({name:"SEAT_LUMBAR_SIDE_SUPPORT_MOVE",description:"Lumbar side support move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B94"}),e({name:"SEAT_HEADREST_HEIGHT_POS",description:"(Deprecated) Headrest height position. Use SEAT_HEADREST_HEIGHT_POS_V2 (per seat) instead.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",version:1,baseId:"0x0B95"}),e({name:"SEAT_HEADREST_HEIGHT_POS_V2",description:"Headrest height position per seat. minInt32Value (lowest) to maxInt32Value (highest position).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:2,baseId:"0x0BA4"}),e({name:"SEAT_HEADREST_HEIGHT_MOVE",description:"Headrest height move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B96"}),e({name:"SEAT_HEADREST_ANGLE_POS",description:"Headrest angle position. minInt32Value (full recline) to maxInt32Value (most upright/forward position).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B97"}),e({name:"SEAT_HEADREST_ANGLE_MOVE",description:"Headrest angle move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B98"}),e({name:"SEAT_HEADREST_FORE_AFT_POS",description:"Headrest fore/aft position. minInt32Value (rearward-most) to maxInt32Value (forward-most position).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B99"}),e({name:"SEAT_HEADREST_FORE_AFT_MOVE",description:"Headrest fore/aft move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:1,baseId:"0x0B9A"}),e({name:"SEAT_FOOTWELL_LIGHTS_STATE",description:"Current state of the seat footwell lights. May differ from CABIN_LIGHTS_STATE if implemented separately.",changeMode:"ON_CHANGE",access:["READ"],area:"SEAT",dataType:"INT32",dataEnum:["VehicleLightState"],version:2,baseId:"0x0B9B"}),e({name:"SEAT_FOOTWELL_LIGHTS_SWITCH",description:"Position of the switch controlling the seat footwell lights.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",dataEnum:["VehicleLightSwitch"],version:2,baseId:"0x0B9C"}),e({name:"SEAT_EASY_ACCESS_ENABLED",description:"Seat easy access feature. When true, the seat will adjust automatically to make it easier to enter and exit the vehicle.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:2,baseId:"0x0B9D"}),e({name:"SEAT_AIRBAG_ENABLED",description:"Whether a seat's airbags can deploy when triggered (e.g. by a crash). Does not indicate deployment status.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:2,baseId:"0x0B9E"}),e({name:"SEAT_AIRBAGS_DEPLOYED",description:"Bit-flag property reporting which airbags have been deployed at each seat. Per-seat VehicleAirbagLocation.",changeMode:"ON_CHANGE",access:["READ"],area:"SEAT",dataType:"INT32",dataEnum:["VehicleAirbagLocation"],version:3,baseId:"0x0BA5"}),e({name:"SEAT_CUSHION_SIDE_SUPPORT_POS",description:"Seat cushion side support position. minInt32Value (thinnest, most support) to maxInt32Value (widest, least support).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:2,baseId:"0x0B9F"}),e({name:"SEAT_CUSHION_SIDE_SUPPORT_MOVE",description:"Seat cushion side support move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:2,baseId:"0x0BA0"}),e({name:"SEAT_LUMBAR_VERTICAL_POS",description:"Seat lumbar support vertical position. minInt32Value (lowest) to maxInt32Value (highest position).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:2,baseId:"0x0BA1"}),e({name:"SEAT_LUMBAR_VERTICAL_MOVE",description:"Seat lumbar vertical move (speed/direction).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:2,baseId:"0x0BA2"}),e({name:"SEAT_WALK_IN_POS",description:"Current walk-in position of the seat. minInt32Value=0 (normal) to maxInt32Value (full walk-in position).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:2,baseId:"0x0BA3"}),e({name:"SEAT_BELT_PRETENSIONER_DEPLOYED",description:"Whether the seat belt pretensioner has been deployed for this seat due to a collision.",changeMode:"ON_CHANGE",access:["READ"],area:"SEAT",dataType:"BOOLEAN",version:3,baseId:"0x0BA6"}),e({name:"SEAT_OCCUPANCY",description:"Whether a particular seat is occupied or not. Values come from the VehicleSeatOccupancyState enum.",changeMode:"ON_CHANGE",access:["READ"],area:"SEAT",dataType:"INT32",dataEnum:["VehicleSeatOccupancyState"],version:1,baseId:"0x0BB0"}),e({name:"WINDOW_POS",description:"Window position. 0 indicates the window is closed; positive values indicate it is opening; negative values open it out of plane (e.g. sunroof vent).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"WINDOW",dataType:"INT32",version:1,baseId:"0x0BC0"}),e({name:"WINDOW_MOVE",description:"Window move. Magnitude indicates speed; sign indicates direction. Resets to 0 once the window reaches its limit.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"WINDOW",dataType:"INT32",version:1,baseId:"0x0BC1"}),e({name:"WINDOW_LOCK",description:"Window child lock. true indicates the window is child-locked.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"WINDOW",dataType:"BOOLEAN",version:1,baseId:"0x0BC4"}),e({name:"WINDSHIELD_WIPERS_PERIOD",description:"Instantaneous time period in milliseconds for one full wiper cycle. Set to 0 during the pause of an intermittent wiper setting.",changeMode:"ON_CHANGE",access:["READ"],area:"WINDOW",dataType:"INT32",unit:"VehicleUnit.MILLI_SECS",version:2,baseId:"0x0BC5"}),e({name:"WINDSHIELD_WIPERS_STATE",description:"Current state of the windshield wipers. May not match WINDSHIELD_WIPERS_SWITCH (e.g. AUTO switch with the wipers currently ON).",changeMode:"ON_CHANGE",access:["READ"],area:"WINDOW",dataType:"INT32",dataEnum:["WindshieldWipersState"],version:2,baseId:"0x0BC6"}),e({name:"WINDSHIELD_WIPERS_SWITCH",description:"Position of the switch controlling the windshield wipers. May not match WINDSHIELD_WIPERS_STATE.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"WINDOW",dataType:"INT32",dataEnum:["WindshieldWipersSwitch"],version:2,baseId:"0x0BC7"}),e({name:"STEERING_WHEEL_DEPTH_POS",description:"Steering wheel depth position. minInt32Value (closest to driver) to maxInt32Value (furthest).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",version:2,baseId:"0x0BE0"}),e({name:"STEERING_WHEEL_DEPTH_MOVE",description:"Steering wheel depth movement. Magnitude indicates speed; sign indicates direction.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",version:2,baseId:"0x0BE1"}),e({name:"STEERING_WHEEL_HEIGHT_POS",description:"Steering wheel height position. minInt32Value (lowest) to maxInt32Value (highest position).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",version:2,baseId:"0x0BE2"}),e({name:"STEERING_WHEEL_HEIGHT_MOVE",description:"Steering wheel height movement. Magnitude indicates speed; sign indicates direction.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",version:2,baseId:"0x0BE3"}),e({name:"STEERING_WHEEL_THEFT_LOCK_ENABLED",description:"Steering wheel theft lock feature. When enabled, the steering wheel locks automatically to prevent theft.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x0BE4"}),e({name:"STEERING_WHEEL_LOCKED",description:"Steering wheel locked. true indicates the steering wheel's position is locked.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x0BE5"}),e({name:"STEERING_WHEEL_EASY_ACCESS_ENABLED",description:"Steering wheel easy access feature. When enabled, the driver's steering wheel adjusts to make it easier to enter and exit the vehicle.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x0BE6"}),e({name:"STEERING_WHEEL_LIGHTS_STATE",description:"Current state of the steering wheel lights. May differ from STEERING_WHEEL_LIGHTS_SWITCH (e.g. AUTOMATIC switch with the lights currently ON).",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightState"],version:2,baseId:"0x0F0C"}),e({name:"STEERING_WHEEL_LIGHTS_SWITCH",description:"Position of the switch controlling the steering wheel lights.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightSwitch"],version:2,baseId:"0x0F0D"}),e({name:"GLOVE_BOX_DOOR_POS",description:"Current position of the glove box door. minInt32Value=0 (closed) to maxInt32Value (fully open).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",version:2,baseId:"0x0BF0"}),e({name:"GLOVE_BOX_LOCKED",description:"Lock or unlock the glove box. true indicates the glove box is locked.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"BOOLEAN",version:2,baseId:"0x0BF1"}),e({name:"VEHICLE_MAP_SERVICE",description:"Vehicle Maps Service (VMS) message. MIXED data carrying VMS messages defined by the VMS protocol.",changeMode:"ON_CHANGE",access:["READ_WRITE"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0C00"}),e({name:"LOCATION_CHARACTERIZATION",description:"Bit flags from LocationCharacterization describing what data and sensor inputs are fused into the vehicle's GNSS location updates.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32",version:2,baseId:"0x0C10"}),e({name:"ULTRASONICS_SENSOR_POSITION",description:"Static position [x, y, z] in mm of each ultrasonic sensor relative to the Android Automotive sensor coordinate frame.",changeMode:"STATIC",access:["READ"],area:"VENDOR",dataType:"INT32_VEC",version:3,baseId:"0x0C20"}),e({name:"ULTRASONICS_SENSOR_ORIENTATION",description:"Static orientation [qw, qx, qy, qz] of each ultrasonic sensor as a quaternion.",changeMode:"STATIC",access:["READ"],area:"VENDOR",dataType:"FLOAT_VEC",version:3,baseId:"0x0C21"}),e({name:"ULTRASONICS_SENSOR_FIELD_OF_VIEW",description:"Static field of view [horizontal, vertical] in degrees for each ultrasonic sensor.",changeMode:"STATIC",access:["READ"],area:"VENDOR",dataType:"INT32_VEC",version:3,baseId:"0x0C22"}),e({name:"ULTRASONICS_SENSOR_DETECTION_RANGE",description:"Static detection range [minimum, maximum] in millimeters for each ultrasonic sensor.",changeMode:"STATIC",access:["READ"],area:"VENDOR",dataType:"INT32_VEC",version:3,baseId:"0x0C23"}),e({name:"ULTRASONICS_SENSOR_SUPPORTED_RANGES",description:"Supported ranges of each ultrasonic sensor in millimeters as pairs of [range_min_n, range_max_n].",changeMode:"STATIC",access:["READ"],area:"VENDOR",dataType:"INT32_VEC",version:3,baseId:"0x0C24"}),e({name:"ULTRASONICS_SENSOR_MEASURED_DISTANCE",description:"Measured distance to the nearest detected object per sensor in millimeters, with optional distance error.",changeMode:"CONTINUOUS",access:["READ"],area:"VENDOR",dataType:"INT32_VEC",version:3,baseId:"0x0C25"}),e({name:"OBD2_LIVE_FRAME",description:"Reports a snapshot of the current values of all available OBD2 sensors. Encoded as MIXED data.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0D00"}),e({name:"OBD2_FREEZE_FRAME",description:"Snapshot of OBD2 sensors at the time of a fault, plus an optional diagnostic troubleshooting code.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0D01"}),e({name:"OBD2_FREEZE_FRAME_INFO",description:"Lists the freeze frame timestamps currently stored in vehicle memory and available via OBD2_FREEZE_FRAME.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0D02"}),e({name:"OBD2_FREEZE_FRAME_CLEAR",description:"Allows deletion of freeze frames. Empty int64Values clears all; otherwise clears the listed timestamps.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0D03"}),e({name:"HEADLIGHTS_STATE",description:"Current state of the headlights.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightState"],version:1,baseId:"0x0E00"}),e({name:"HIGH_BEAM_LIGHTS_STATE",description:"Current state of the high beam lights.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightState"],version:1,baseId:"0x0E01"}),e({name:"FOG_LIGHTS_STATE",description:"Current state of the fog lights. Use FRONT_FOG_LIGHTS_STATE / REAR_FOG_LIGHTS_STATE when fog lights are independently controlled.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightState"],version:1,baseId:"0x0E02"}),e({name:"HAZARD_LIGHTS_STATE",description:"Current state of the hazard lights.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightState"],version:1,baseId:"0x0E03"}),e({name:"HEADLIGHTS_SWITCH",description:"Headlight switch position requested by the user.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightSwitch"],version:1,baseId:"0x0E10"}),e({name:"HIGH_BEAM_LIGHTS_SWITCH",description:"High beam light switch position requested by the user.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightSwitch"],version:1,baseId:"0x0E11"}),e({name:"FOG_LIGHTS_SWITCH",description:"Fog light switch position requested by the user. Use FRONT/REAR variants when applicable.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightSwitch"],version:1,baseId:"0x0E12"}),e({name:"HAZARD_LIGHTS_SWITCH",description:"Hazard light switch position requested by the user.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightSwitch"],version:1,baseId:"0x0E13"}),e({name:"CABIN_LIGHTS_STATE",description:"Current state of the cabin lights.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightState"],version:1,baseId:"0x0F01"}),e({name:"CABIN_LIGHTS_SWITCH",description:"Position of the physical switch controlling the cabin lights.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightSwitch"],version:1,baseId:"0x0F02"}),e({name:"READING_LIGHTS_STATE",description:"Current state of the reading lights, per seat.",changeMode:"ON_CHANGE",access:["READ"],area:"SEAT",dataType:"INT32",dataEnum:["VehicleLightState"],version:1,baseId:"0x0F03"}),e({name:"READING_LIGHTS_SWITCH",description:"Position of the physical switch controlling the reading lights, per seat.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"SEAT",dataType:"INT32",dataEnum:["VehicleLightSwitch"],version:1,baseId:"0x0F04"}),e({name:"FRONT_FOG_LIGHTS_STATE",description:"Current state of the front fog lights. Use only when front and rear fog lights are independently controlled.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightState"],version:1,baseId:"0x0F3B"}),e({name:"FRONT_FOG_LIGHTS_SWITCH",description:"Front fog light switch. Use only when front and rear fog lights are independently controlled.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightSwitch"],version:1,baseId:"0x0F3C"}),e({name:"REAR_FOG_LIGHTS_STATE",description:"Current state of the rear fog lights. Use only when front and rear fog lights are independently controlled.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightState"],version:1,baseId:"0x0F3D"}),e({name:"REAR_FOG_LIGHTS_SWITCH",description:"Rear fog light switch. Use only when front and rear fog lights are independently controlled.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleLightSwitch"],version:1,baseId:"0x0F3E"}),e({name:"SUPPORT_CUSTOMIZE_VENDOR_PERMISSION",description:"Whether the VHAL supports customising permissions for vendor properties via the configArray.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"BOOLEAN",version:1,baseId:"0x0F05"}),e({name:"DISABLED_OPTIONAL_FEATURES",description:"Comma-separated list of optional features that should be disabled in CarService.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"STRING",version:1,baseId:"0x0F06"}),e({name:"INITIAL_USER_INFO",description:"Defines the initial Android user to be used during initialization. Format defined by InitialUserInfoRequest/Response.",changeMode:"ON_CHANGE",access:["READ_WRITE"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0F07"}),e({name:"SWITCH_USER",description:"Defines a request to switch the foreground Android user. Supports several SwitchUserMessageType values.",changeMode:"ON_CHANGE",access:["READ_WRITE"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0F08"}),e({name:"CREATE_USER",description:"Notifies the HAL that an Android user was created so it can create its equivalent user. Async with HAL response.",changeMode:"ON_CHANGE",access:["READ_WRITE"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0F09"}),e({name:"REMOVE_USER",description:"Notifies the HAL that an Android user was removed so it can remove its equivalent user. Write-only.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0F0A"}),e({name:"USER_IDENTIFICATION_ASSOCIATION",description:"Associate (or query) the current user with vehicle-specific identification mechanisms such as a key fob.",changeMode:"ON_CHANGE",access:["READ_WRITE"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0F0B"}),e({name:"EVS_SERVICE_REQUEST",description:"Request to enable/disable an EVS service. int32[0]=EvsServiceType, int32[1]=EvsServiceState.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",version:1,baseId:"0x0F10"}),e({name:"POWER_POLICY_REQ",description:"Request to apply a car power policy by ID. The car power policy service applies the matching policy.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"STRING",version:1,baseId:"0x0F21"}),e({name:"POWER_POLICY_GROUP_REQ",description:"Request to set the power policy group used to choose a default power policy per power-status transition.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"STRING",version:1,baseId:"0x0F22"}),e({name:"CURRENT_POWER_POLICY",description:"Notifies the VHAL of the currently applied car power policy by ID.",changeMode:"ON_CHANGE",access:["READ_WRITE"],area:"GLOBAL",dataType:"STRING",version:1,baseId:"0x0F23"}),e({name:"WATCHDOG_ALIVE",description:"Heartbeat from car watchdog. Set to system uptime in milliseconds about every 3 seconds.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"INT64",version:1,baseId:"0x0F31"}),e({name:"WATCHDOG_TERMINATED_PROCESS",description:"Records a process terminated by car watchdog and the reason for termination.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0F32"}),e({name:"VHAL_HEARTBEAT",description:"Heartbeat from the VHAL itself. Should be updated every 3 seconds; otherwise watchdog considers the VHAL unhealthy.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT64",version:1,baseId:"0x0F33"}),e({name:"CLUSTER_SWITCH_UI",description:"Asks the cluster display to show a specific ClusterUI. 0 indicates ClusterHome; other values are OEM-defined.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",version:1,baseId:"0x0F34"}),e({name:"CLUSTER_DISPLAY_STATE",description:"Changes the state of the cluster display. Carries on/off, bounds and inset values.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",version:1,baseId:"0x0F35"}),e({name:"CLUSTER_REPORT_STATE",description:"Reports the current cluster display state and ClusterUI state from ClusterHome to ClusterOS.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"MIXED",version:1,baseId:"0x0F36"}),e({name:"CLUSTER_REQUEST_DISPLAY",description:"Request to power on the cluster display to show a specific ClusterUI when it is currently off.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"INT32",version:1,baseId:"0x0F37"}),e({name:"CLUSTER_NAVIGATION_STATE",description:"Current navigation state from the cluster as a serialised NavigationStateProto message.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"BYTES",version:1,baseId:"0x0F38"}),e({name:"CLUSTER_HEARTBEAT",description:"Heartbeat from ClusterHome to ClusterOS. Carries epoch time, ClusterUI visibility and optional metadata.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"MIXED",version:3,baseId:"0x0F4B"}),e({name:"ELECTRONIC_TOLL_COLLECTION_CARD_TYPE",description:"Type of ETC card attached to the vehicle, or UNAVAILABLE when no card is detected.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["ElectronicTollCollectionCardType"],version:1,baseId:"0x0F39"}),e({name:"ELECTRONIC_TOLL_COLLECTION_CARD_STATUS",description:"Status of the ETC card in the vehicle, or UNAVAILABLE when no card is detected.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["ElectronicTollCollectionCardStatus"],version:1,baseId:"0x0F3A"}),e({name:"TRAILER_PRESENT",description:"Indicates whether a trailer is currently present and connected to the vehicle.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["TrailerState"],version:1,baseId:"0x0F45"}),e({name:"VEHICLE_CURB_WEIGHT",description:"Vehicle's curb weight in kilograms. configArray[0] specifies the gross weight in kilograms.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32",version:1,baseId:"0x0F46"}),e({name:"GENERAL_SAFETY_REGULATION_COMPLIANCE_REQUIREMENT",description:"EU General Safety Regulation compliance requirement. Returns whether compliance is required and what type.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["GsrComplianceRequirementType"],version:2,baseId:"0x0F47"}),e({name:"SUPPORTED_PROPERTY_IDS",description:"(Deprecated for AIDL) List of all supported property IDs. Required for HIDL VHAL with payloads exceeding the binder limit.",changeMode:"STATIC",access:["READ"],area:"GLOBAL",dataType:"INT32_VEC",version:2,baseId:"0x0F48"}),e({name:"SHUTDOWN_REQUEST",description:"Request the head unit to be shutdown (for remote-task scenarios). Carries a VehicleApPowerStateShutdownParam value.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleApPowerStateShutdownParam"],version:2,baseId:"0x0F49"}),e({name:"VEHICLE_IN_USE",description:"Whether the vehicle is currently in use by a human user. Differs from AP_POWER_BOOTUP_REASON: may change multiple times per boot cycle.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x0F4A"}),e({name:"VEHICLE_DRIVING_AUTOMATION_CURRENT_LEVEL",description:"Current SAE J3016_202104 vehicle automation level (0-5). 0 means no automation, 5 means full driving automation.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleAutonomousState"],version:3,baseId:"0x0F4C"}),e({name:"VEHICLE_DRIVING_AUTOMATION_TARGET_LEVEL",description:"Target SAE J3016_202104 vehicle automation level (0-5). Equal to the current level once the target has been reached.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["VehicleAutonomousState"],version:4,baseId:"0x0F4F"}),e({name:"CAMERA_SERVICE_CURRENT_STATE",description:"Reports the current state of each CarEvsService type (rearview, surroundview, frontview, etc.).",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"INT32_VEC",dataEnum:["CameraServiceState"],version:3,baseId:"0x0F4D"}),e({name:"AUTOMATIC_EMERGENCY_BRAKING_ENABLED",description:"Enable or disable Automatic Emergency Braking (AEB) for higher-speed applications.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x1000"}),e({name:"AUTOMATIC_EMERGENCY_BRAKING_STATE",description:"Current state of Automatic Emergency Braking (AEB). Errors are surfaced via supported ErrorState values.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["AutomaticEmergencyBrakingState","ErrorState"],version:2,baseId:"0x1001"}),e({name:"FORWARD_COLLISION_WARNING_ENABLED",description:"Enable or disable Forward Collision Warning (FCW).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x1002"}),e({name:"FORWARD_COLLISION_WARNING_STATE",description:"Current state of Forward Collision Warning (FCW). Errors are surfaced via supported ErrorState values.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["ForwardCollisionWarningState","ErrorState"],version:2,baseId:"0x1003"}),e({name:"BLIND_SPOT_WARNING_ENABLED",description:"Enable or disable Blind Spot Warning (BSW).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x1004"}),e({name:"BLIND_SPOT_WARNING_STATE",description:"Current state of Blind Spot Warning (BSW), per mirror area. Errors are surfaced via supported ErrorState values.",changeMode:"ON_CHANGE",access:["READ"],area:"MIRROR",dataType:"INT32",dataEnum:["BlindSpotWarningState","ErrorState"],version:2,baseId:"0x1005"}),e({name:"LANE_DEPARTURE_WARNING_ENABLED",description:"Enable or disable Lane Departure Warning (LDW).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x1006"}),e({name:"LANE_DEPARTURE_WARNING_STATE",description:"Current state of Lane Departure Warning (LDW). Errors are surfaced via supported ErrorState values.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["LaneDepartureWarningState","ErrorState"],version:2,baseId:"0x1007"}),e({name:"LANE_KEEP_ASSIST_ENABLED",description:"Enable or disable Lane Keep Assist (LKA). Different from Lane Centering Assist (LCA).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x1008"}),e({name:"LANE_KEEP_ASSIST_STATE",description:"Current state of Lane Keep Assist (LKA). Errors are surfaced via supported ErrorState values.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["LaneKeepAssistState","ErrorState"],version:2,baseId:"0x1009"}),e({name:"LANE_CENTERING_ASSIST_ENABLED",description:"Enable or disable Lane Centering Assist (LCA). Different from Lane Keep Assist (LKA).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x100A"}),e({name:"LANE_CENTERING_ASSIST_COMMAND",description:"Lane Centering Assist (LCA) commands. ACTIVATE moves the state machine through ACTIVATION_REQUESTED to ACTIVATED.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"INT32",dataEnum:["LaneCenteringAssistCommand"],version:2,baseId:"0x100B"}),e({name:"LANE_CENTERING_ASSIST_STATE",description:"Current state of Lane Centering Assist (LCA). Errors are surfaced via supported ErrorState values.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["LaneCenteringAssistState","ErrorState"],version:2,baseId:"0x100C"}),e({name:"EMERGENCY_LANE_KEEP_ASSIST_ENABLED",description:"Enable or disable Emergency Lane Keep Assist (ELKA).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x100D"}),e({name:"EMERGENCY_LANE_KEEP_ASSIST_STATE",description:"Current state of Emergency Lane Keep Assist (ELKA). Errors are surfaced via supported ErrorState values.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["EmergencyLaneKeepAssistState","ErrorState"],version:2,baseId:"0x100E"}),e({name:"CRUISE_CONTROL_ENABLED",description:"Enable or disable cruise control (shared by all CruiseControlType variants).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x100F"}),e({name:"CRUISE_CONTROL_TYPE",description:"Current type of cruise control (e.g. standard, adaptive, predictive).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["CruiseControlType","ErrorState"],version:2,baseId:"0x1010"}),e({name:"CRUISE_CONTROL_STATE",description:"Current state of cruise control.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["CruiseControlState","ErrorState"],version:2,baseId:"0x1011"}),e({name:"CRUISE_CONTROL_COMMAND",description:"Cruise control commands (e.g. activate, suspend). Errors are surfaced via supported ErrorState values.",changeMode:"ON_CHANGE",access:["WRITE"],area:"GLOBAL",dataType:"INT32",dataEnum:["CruiseControlCommand"],version:2,baseId:"0x1012"}),e({name:"CRUISE_CONTROL_TARGET_SPEED",description:"Current target speed for cruise control.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"FLOAT",unit:"VehicleUnit.METER_PER_SEC",version:2,baseId:"0x1013"}),e({name:"ADAPTIVE_CRUISE_CONTROL_TARGET_TIME_GAP",description:"Current target time gap for Adaptive or Predictive Cruise Control in milliseconds.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"INT32",unit:"VehicleUnit.MILLI_SECS",version:2,baseId:"0x1014"}),e({name:"ADAPTIVE_CRUISE_CONTROL_LEAD_VEHICLE_MEASURED_DISTANCE",description:"Measured distance from a leading vehicle when ACC/Predictive Cruise Control is engaged, in millimeters.",changeMode:"CONTINUOUS",access:["READ"],area:"GLOBAL",dataType:"INT32",unit:"VehicleUnit.MILLIMETER",version:2,baseId:"0x1015"}),e({name:"HANDS_ON_DETECTION_ENABLED",description:"Enable or disable Hands On Detection (HOD).",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:2,baseId:"0x1016"}),e({name:"HANDS_ON_DETECTION_DRIVER_STATE",description:"Whether the driver's hands are on the steering wheel. Errors are surfaced via supported ErrorState values.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["HandsOnDetectionDriverState","ErrorState"],version:2,baseId:"0x1017"}),e({name:"HANDS_ON_DETECTION_WARNING",description:"Whether a Hands On Detection warning is being sent to the driver.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["HandsOnDetectionWarning","ErrorState"],version:2,baseId:"0x1018"}),e({name:"DRIVER_DROWSINESS_ATTENTION_SYSTEM_ENABLED",description:"Enable or disable driver drowsiness and attention monitoring.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:3,baseId:"0x1019"}),e({name:"DRIVER_DROWSINESS_ATTENTION_STATE",description:"Driver drowsiness and attention level state, mapped to the Karolinska Sleepiness Scale.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["DriverDrowsinessAttentionState","ErrorState"],version:3,baseId:"0x101A"}),e({name:"DRIVER_DROWSINESS_ATTENTION_WARNING_ENABLED",description:"Enable or disable driver drowsiness and attention warnings.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:3,baseId:"0x101B"}),e({name:"DRIVER_DROWSINESS_ATTENTION_WARNING",description:"Whether a driver drowsiness/attention warning is being sent to the driver.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["DriverDrowsinessAttentionWarning","ErrorState"],version:3,baseId:"0x101C"}),e({name:"DRIVER_DISTRACTION_SYSTEM_ENABLED",description:"Enable or disable driver distraction monitoring.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:3,baseId:"0x101D"}),e({name:"DRIVER_DISTRACTION_STATE",description:"Current detected driver distraction state.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["DriverDistractionState","ErrorState"],version:3,baseId:"0x101E"}),e({name:"DRIVER_DISTRACTION_WARNING_ENABLED",description:"Enable or disable driver distraction warnings.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:3,baseId:"0x101F"}),e({name:"DRIVER_DISTRACTION_WARNING",description:"Whether a driver distraction warning is being sent to the driver.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["DriverDistractionWarning","ErrorState"],version:3,baseId:"0x1020"}),e({name:"LOW_SPEED_COLLISION_WARNING_ENABLED",description:"Enable or disable Low Speed Collision Warning. Different from FORWARD_COLLISION_WARNING_ENABLED which is for higher speeds.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:3,baseId:"0x1021"}),e({name:"LOW_SPEED_COLLISION_WARNING_STATE",description:"Current state of Low Speed Collision Warning.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["LowSpeedCollisionWarningState","ErrorState"],version:3,baseId:"0x1022"}),e({name:"CROSS_TRAFFIC_MONITORING_ENABLED",description:"Enable or disable Cross Traffic Monitoring.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:3,baseId:"0x1023"}),e({name:"CROSS_TRAFFIC_MONITORING_WARNING_STATE",description:"Current Cross Traffic Monitoring warning state.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["CrossTrafficMonitoringWarningState","ErrorState"],version:3,baseId:"0x1024"}),e({name:"LOW_SPEED_AUTOMATIC_EMERGENCY_BRAKING_ENABLED",description:"Enable or disable Low Speed Automatic Emergency Braking. Different from AUTOMATIC_EMERGENCY_BRAKING_ENABLED which is for higher speeds.",changeMode:"ON_CHANGE",access:["READ_WRITE","READ"],area:"GLOBAL",dataType:"BOOLEAN",version:3,baseId:"0x1025"}),e({name:"LOW_SPEED_AUTOMATIC_EMERGENCY_BRAKING_STATE",description:"Current state of Low Speed Automatic Emergency Braking.",changeMode:"ON_CHANGE",access:["READ"],area:"GLOBAL",dataType:"INT32",dataEnum:["LowSpeedAutomaticEmergencyBrakingState","ErrorState"],version:3,baseId:"0x1026"})],N=(t,s)=>({width:t,height:t,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:s,strokeLinecap:"round",strokeLinejoin:"round"}),ee=({size:t=16,className:s,style:i,strokeWidth:n=2})=>a.jsx("svg",{...N(t,n),className:s,style:i,children:a.jsx("path",{d:"M9 6l6 6-6 6"})}),ae=({size:t=16,className:s,style:i,strokeWidth:n=2})=>a.jsx("svg",{...N(t,n),className:s,style:i,children:a.jsx("path",{d:"M6 9l6 6 6-6"})}),te=({size:t=16,className:s,style:i,strokeWidth:n=2})=>a.jsxs("svg",{...N(t,n),className:s,style:i,children:[a.jsx("circle",{cx:"11",cy:"11",r:"7"}),a.jsx("path",{d:"M21 21l-4.35-4.35"})]}),se=({size:t=14,className:s,style:i,strokeWidth:n=2})=>a.jsxs("svg",{...N(t,n),className:s,style:i,children:[a.jsx("rect",{x:"9",y:"9",width:"11",height:"11",rx:"2"}),a.jsx("path",{d:"M5 15V5a2 2 0 0 1 2-2h10"})]}),ie=({size:t=14,className:s,style:i,strokeWidth:n=2.5})=>a.jsx("svg",{...N(t,n),className:s,style:i,children:a.jsx("path",{d:"M20 6L9 17l-5-5"})}),ne=({size:t=14,className:s,style:i,strokeWidth:n=2})=>a.jsx("svg",{...N(t,n),className:s,style:i,children:a.jsx("path",{d:"M12 5v14M5 12h14"})}),b=({size:t=20,className:s,style:i})=>a.jsx("svg",{width:t,height:t,viewBox:"0 0 24 24",fill:"currentColor",className:s,style:i,children:a.jsx("path",{d:"M17.523 15.341a1.005 1.005 0 1 1 0-2.01 1.005 1.005 0 0 1 0 2.01zm-11.046 0a1.005 1.005 0 1 1 0-2.01 1.005 1.005 0 0 1 0 2.01zm11.405-6.02 2.005-3.474a.42.42 0 1 0-.727-.42L17.13 8.943a12.474 12.474 0 0 0-10.26 0L4.84 5.428a.42.42 0 1 0-.727.42l2.005 3.474A11.43 11.43 0 0 0 .5 18.5h23a11.43 11.43 0 0 0-5.618-9.18z"})}),re=globalThis.React,{useEffect:S,useMemo:L,useState:G}=re,f=(...t)=>t.filter(Boolean).join(" "),oe=({signals:t,groupingMode:s,selectedSignal:i,onSelectSignal:n})=>{const[r,d]=G(""),[E,T]=G({}),l=L(()=>s==="area"?J(t):Q(t),[t,s]),p=L(()=>Object.keys(l).sort((o,c)=>o.localeCompare(c)),[l]),R=L(()=>{const o=r.trim().toLowerCase();if(!o)return l;const c={};for(const _ of p){if(_.toLowerCase().includes(o)){c[_]=l[_];continue}const h=l[_].filter(D=>D.name.toLowerCase().includes(o));h.length>0&&(c[_]=h)}return c},[l,p,r]),I=L(()=>Object.keys(R).sort((o,c)=>o.localeCompare(c)),[R]);S(()=>{T({})},[s]),S(()=>{if(!r.trim())return;const o={};for(const c of I)o[c]=!0;T(c=>({...c,...o}))},[r,I]),S(()=>{if(!i)return;const o=s==="area"?i.area:i.group;T(c=>c[o]?c:{...c,[o]:!0})},[i,s]);const A=o=>{T(c=>({...c,[o]:!c[o]}))};return a.jsxs("div",{className:"aaos-left",children:[a.jsxs("div",{className:"aaos-search-wrap",children:[a.jsx("span",{className:"aaos-search-icon",children:a.jsx(te,{})}),a.jsx("input",{className:"aaos-input",placeholder:s==="area"?"Search AAOS signal or vehicle area":"Search AAOS signal or group",value:r,onChange:o=>d(o.target.value)})]}),a.jsx("div",{className:"aaos-list",children:I.length===0?a.jsx("div",{className:"aaos-empty",children:"No AAOS signal found"}):I.map(o=>{const c=!!E[o],_=R[o];return a.jsxs("div",{className:"aaos-group",children:[a.jsxs("button",{type:"button",className:f("aaos-group-btn",c&&"is-open"),onClick:()=>A(o),children:[a.jsxs("span",{className:"aaos-group-left",children:[a.jsx("span",{className:"aaos-group-chevron",children:c?a.jsx(ae,{}):a.jsx(ee,{})}),a.jsx("span",{children:o})]}),a.jsx("span",{className:"aaos-badge",children:_.length})]}),c&&a.jsx("div",{className:"aaos-signals",children:_.map(h=>{const D=(i==null?void 0:i.name)===h.name;return a.jsxs("button",{type:"button",className:f("aaos-signal-btn",D&&"is-selected"),onClick:()=>n(h),children:[a.jsx("span",{className:"aaos-signal-name",children:h.name}),a.jsx("span",{className:"aaos-signal-tag",children:s==="area"?h.group:h.area})]},h.name)})})]},o)})})]})},ce=`
INFO_VIN | Vehicle.VehicleIdentification.VIN |
INFO_MAKE | Vehicle.VehicleIdentification.Brand |
INFO_MODEL | Vehicle.VehicleIdentification.Model |
INFO_MODEL_YEAR | Vehicle.VehicleIdentification.Year |
INFO_FUEL_CAPACITY | Vehicle.Powertrain.FuelSystem.TankCapacity |
INFO_FUEL_TYPE | Vehicle.Powertrain.FuelSystem.SupportedFuelTypes | Vehicle.Powertrain.FuelSystem.SupportedFuel
INFO_EV_BATTERY_CAPACITY | Vehicle.Powertrain.TractionBattery.GrossCapacity | Vehicle.Powertrain.TractionBattery.NetCapacity
INFO_EV_CONNECTOR_TYPE | Vehicle.Powertrain.TractionBattery.Charging.ChargePortType |
INFO_FUEL_DOOR_LOCATION | Vehicle.Powertrain.FuelSystem.RefuelPortPosition |
INFO_EV_PORT_LOCATION | Vehicle.Powertrain.TractionBattery.Charging.ChargePortPosition |
INFO_DRIVER_SEAT |  | Vehicle.Cabin.DriverPosition
INFO_EXTERIOR_DIMENSIONS | Vehicle.Width, Vehicle.Length, Vehicle.Height | Vehicle.WidthExcludingMirrors, Vehicle.WidthIncludingMirrors
INFO_MULTI_EV_PORT_LOCATIONS |  |
INFO_MODEL_TRIM | Vehicle.VehicleIdentification.VehicleConfiguration |
INFO_VEHICLE_SIZE_CLASS | Vehicle.VehicleIdentification.AcrissCode |
ABS_ACTIVE | Vehicle.ADAS.ABS.IsEngaged | Vehicle.ADAS.ABS.IsEnabled
ACCELERATOR_PEDAL_COMPRESSION_PERCENTAGE | Vehicle.Chassis.Accelerator.PedalPosition |
ADAPTIVE_CRUISE_CONTROL_LEAD_VEHICLE_MEASURED_DISTANCE | — | Vehicle.ADAS.CruiseControl (branch only, no lead-vehicle distance signal)
ADAPTIVE_CRUISE_CONTROL_TARGET_TIME_GAP | — | Vehicle.ADAS.CruiseControl (branch only, no time-gap or headway signal)
ANDROID_EPOCH_TIME | — |
AP_POWER_BOOTUP_REASON | — |
AP_POWER_STATE_REPORT | — |
AP_POWER_STATE_REQ | — |
AUTOMATIC_EMERGENCY_BRAKING_ENABLED | Vehicle.ADAS.EBA.IsEnabled | —
AUTOMATIC_EMERGENCY_BRAKING_STATE | Vehicle.ADAS.EBA.IsEngaged | —
BLIND_SPOT_WARNING_ENABLED | Vehicle.ADAS.BlindSpotDetection.IsEnabled | —
BLIND_SPOT_WARNING_STATE | Vehicle.ADAS.BlindSpotDetection.IsEngaged | —
BRAKE_FLUID_LEVEL_LOW | Vehicle.Chassis.Brake.FluidLevelLow | Vehicle.Chassis.Brake.FluidLevel
BRAKE_PAD_WEAR_PERCENTAGE | Vehicle.Chassis.Brake.PadWear |
BRAKE_PEDAL_COMPRESSION_PERCENTAGE | Vehicle.Chassis.Brake.PedalPosition | —
CABIN_LIGHTS_STATE | Vehicle.Cabin.Lights.Interior.IsOn | Vehicle.Cabin.Lights.Ambient.IsOn
CABIN_LIGHTS_SWITCH | — | Vehicle.Cabin.Lights.Interior.IsOn
CAMERA_SERVICE_CURRENT_STATE | — | Vehicle.Cabin.Camera (capability branch only)
CLUSTER_DISPLAY_STATE | — | Vehicle.Infotainment (display-oriented branch, not cluster UI state)
CLUSTER_HEARTBEAT | — | —
CLUSTER_NAVIGATION_STATE | — | Vehicle.Infotainment.Navigation (content/state, not cluster lifecycle)
CLUSTER_REPORT_STATE | — | —
CLUSTER_REQUEST_DISPLAY | — | Vehicle.Infotainment.Display
CLUSTER_SWITCH_UI | — | —
CREATE_USER | — | —
CRITICALLY_LOW_TIRE_PRESSURE | Vehicle.Chassis.Axle..Wheel..Tire.PressureLow | Vehicle.Chassis.Axle..Wheel..Tire.Pressure
CROSS_TRAFFIC_MONITORING_ENABLED | Vehicle.ADAS.RearCrossTrafficAlert.IsEnabled | —
CROSS_TRAFFIC_MONITORING_WARNING_STATE | Vehicle.ADAS.RearCrossTrafficAlert.IsEngaged | —
CRUISE_CONTROL_COMMAND | — |
CRUISE_CONTROL_ENABLED | Vehicle.ADAS.CruiseControl.IsEnabled | —
CRUISE_CONTROL_STATE | Vehicle.ADAS.CruiseControl.IsEngaged | —
CRUISE_CONTROL_TARGET_SPEED | Vehicle.ADAS.CruiseControl.SetSpeed | —
CRUISE_CONTROL_TYPE | — | Vehicle.ADAS.CruiseControl (feature presence only)
CURRENT_GEAR | Vehicle.Powertrain.Transmission.SelectedGear |
CURRENT_POWER_POLICY | — | Vehicle.LowVoltageSystemState
DISABLED_OPTIONAL_FEATURES | — | —
DISPLAY_BRIGHTNESS | Vehicle.Cabin.Infotainment.Display.Brightness | Vehicle.Cabin.InstrumentCluster.DisplayBrightness
DISTANCE_DISPLAY_UNITS | Vehicle.Cabin.Infotainment.HMI.DistanceUnit |
DOOR_CHILD_LOCK_ENABLED | Vehicle.Body.Door.*.ChildLock.IsEnabled | —
DOOR_LOCK | Vehicle.Body.Door.*.IsLocked | Vehicle.Body.Trunk.IsLocked
DOOR_MOVE | — |
DOOR_POS | Vehicle.Body.Door.*.Position | Vehicle.Body.Door.*.IsOpen
DRIVER_DISTRACTION_STATE | — | Vehicle.ADAS.DriverMonitoring.IsEngaged
DRIVER_DISTRACTION_SYSTEM_ENABLED | Vehicle.ADAS.DriverMonitoring.IsEnabled | —
DRIVER_DISTRACTION_WARNING | — | Vehicle.ADAS.DriverMonitoring.IsEngaged
DRIVER_DISTRACTION_WARNING_ENABLED | — | Vehicle.ADAS.DriverMonitoring.IsEnabled
DRIVER_DROWSINESS_ATTENTION_STATE | — | Vehicle.ADAS.DriverDrowsiness.IsEngaged
DRIVER_DROWSINESS_ATTENTION_SYSTEM_ENABLED |  | Vehicle.ADAS.DriverDrowsiness.IsEnabled
DRIVER_DROWSINESS_ATTENTION_WARNING | — | Vehicle.ADAS.DriverDrowsiness.IsEngaged
DRIVER_DROWSINESS_ATTENTION_WARNING_ENABLED | Vehicle.ADAS.DriverDrowsiness.IsEnabled |
ELECTRONIC_STABILITY_CONTROL_ENABLED | Vehicle.ADAS.ESC.IsEnabled | —
ELECTRONIC_STABILITY_CONTROL_STATE | Vehicle.ADAS.ESC.IsEngaged | —
ENGINE_COOLANT_TEMP | Vehicle.Powertrain.Engine.CoolantTemperature | —
ENGINE_IDLE_AUTO_STOP_ENABLED | Vehicle.Powertrain.Engine.StartStopSystem.IsEnabled | —
ENGINE_OIL_LEVEL | Vehicle.Powertrain.Engine.Oil.Level | —
ENGINE_OIL_TEMP | Vehicle.Powertrain.Engine.Oil.Temperature | —
ENGINE_RPM | Vehicle.Powertrain.Engine.Speed | —
ENV_OUTSIDE_TEMPERATURE | Vehicle.AmbientAirTemperature | —
EV_BATTERY_LEVEL | Vehicle.Powertrain.TractionBattery.StateOfCharge.Current | —
EV_CHARGE_PORT_CONNECTED | Vehicle.Powertrain.TractionBattery.Charging.IsPluggedIn | —
EV_CHARGE_PORT_OPEN | Vehicle.Body.ChargePort.IsOpen | —
EV_CHARGE_STATE | Vehicle.Powertrain.TractionBattery.Charging.State | —
EV_CHARGE_TIME_REMAINING | Vehicle.Powertrain.TractionBattery.Charging.TimeRemaining | —
FUEL_LEVEL | Vehicle.Powertrain.FuelSystem.Level | —
FUEL_LEVEL_LOW | Vehicle.Powertrain.FuelSystem.LevelLow | —
GEAR_SELECTION | Vehicle.Powertrain.Transmission.SelectedGear | Vehicle.Powertrain.Transmission.Gear
HAZARD_LIGHTS_STATE | Vehicle.Body.Lights.Hazard.IsOn | —
HEADLIGHTS_STATE | Vehicle.Body.Lights.Head.IsOn | Vehicle.Body.Lights.Head.Mode
HIGH_BEAM_LIGHTS_STATE | Vehicle.Body.Lights.HighBeam.IsOn | —
HVAC_AC_ON | Vehicle.Cabin.HVAC.AC.IsOn | —
HVAC_AUTO_ON | Vehicle.Cabin.HVAC.IsAutoMode | —
HVAC_DEFROSTER | Vehicle.Cabin.HVAC.Defrost.IsOn | —
HVAC_FAN_SPEED | Vehicle.Cabin.HVAC.FanSpeed | —
HVAC_POWER_ON | Vehicle.Cabin.HVAC.IsOn | —
HVAC_RECIRC_ON | Vehicle.Cabin.HVAC.Recirculation.IsOn | —
HVAC_TEMPERATURE_CURRENT | Vehicle.Cabin.HVAC.Temperature.Current | —
HVAC_TEMPERATURE_SET | Vehicle.Cabin.HVAC.Temperature.Setpoint | —
IGNITION_STATE | Vehicle.Powertrain.Ignition.State |
IMPACT_DETECTED | Vehicle.Crash.EventDetected |
LANE_CENTERING_ASSIST_ENABLED | Vehicle.ADAS.LaneCentering.IsEnabled | —
LANE_CENTERING_ASSIST_STATE | Vehicle.ADAS.LaneCentering.IsEngaged | —
LANE_DEPARTURE_WARNING_ENABLED | Vehicle.ADAS.LaneDepartureWarning.IsEnabled | —
LANE_DEPARTURE_WARNING_STATE | Vehicle.ADAS.LaneDepartureWarning.IsEngaged | —
LANE_KEEP_ASSIST_ENABLED | Vehicle.ADAS.LaneKeepAssist.IsEnabled | —
LANE_KEEP_ASSIST_STATE | Vehicle.ADAS.LaneKeepAssist.IsEngaged | —
LOCATION_CHARACTERIZATION | — | Vehicle.CurrentLocation
PARKING_BRAKE_ON | Vehicle.Chassis.ParkingBrake.IsEngaged | —
PERF_ODOMETER | Vehicle.TravelledDistance | —
PERF_STEERING_ANGLE | Vehicle.Chassis.SteeringWheel.Angle | Vehicle.Chassis.FrontAxle.SteeringAngle
PERF_VEHICLE_SPEED | Vehicle.Speed | —
RANGE_REMAINING | Vehicle.Powertrain.Range | Vehicle.Powertrain.TractionBattery.Range
SEAT_BELT_BUCKLED | Vehicle.Cabin.Seat.*.SeatBelt.IsBuckled | —
SEAT_OCCUPANCY | Vehicle.Cabin.Seat.*.IsOccupied | —
STEERING_WHEEL_LOCKED | Vehicle.Chassis.SteeringWheel.IsLocked | —
TIRE_PRESSURE | Vehicle.Chassis.Axle..Wheel..Tire.Pressure | —
TRACTION_CONTROL_ACTIVE | Vehicle.ADAS.TCS.IsEngaged | —
TURN_SIGNAL_STATE | Vehicle.Body.Lights.TurnSignal.IsOn | Vehicle.Body.Lights.TurnSignal.Left.IsOn / Right.IsOn
VEHICLE_CURB_WEIGHT | Vehicle.Mass.CurbWeight | —
VEHICLE_HORN_ENGAGED | Vehicle.Body.Horn.IsActive | —
WINDOW_POS | Vehicle.Body.Window.*.Position | —
WINDSHIELD_WIPERS_STATE | Vehicle.Body.Windshield.Wipers.IsOn | Vehicle.Body.Windshield.Wipers.Mode
`.trim(),de=t=>{const s=t.trim();return s===""||s==="—"||s==="-"||s.toLowerCase()==="n/a"},x=t=>{if(de(t))return[];const s=t.split(",").map(r=>r.trim()).flatMap(r=>r.includes(" / ")&&r.includes("Vehicle.")?r.split(" / ").map(d=>d.trim()):[r]).map(r=>r.trim()).filter(r=>r.length>0&&r!=="—"&&r!=="-"),i=new Set,n=[];for(const r of s)i.has(r)||(i.add(r),n.push(r));return n},Ee=()=>{const t={};for(const s of ce.split(`
`)){const i=s.trim();if(!i)continue;const n=i.split("|").map(T=>T.trim()),r=n[0],d=x(n[1]||""),E=x(n[2]||"");r&&(t[r]={exact:d,partial:E})}return t};let g=null;const Ae=t=>(g||(g=Ee()),g[t]||{exact:[],partial:[]}),le=globalThis.React,{useEffect:M,useState:B}=le,C=(...t)=>t.filter(Boolean).join(" "),Te=t=>{switch(t){case"STRING":return"string";case"BOOLEAN":return"boolean";case"INT32":return"int32";case"INT32_VEC":return"int32[]";case"INT64":return"int64";case"INT64_VEC":return"int64[]";case"FLOAT":return"float";case"FLOAT_VEC":return"float[]";case"BYTES":return"uint8[]";case"MIXED":default:return"string"}},pe=t=>t.access.includes("READ_WRITE")||t.access.includes("WRITE")?"actuator":"sensor",Ie=t=>`Aaos.${t.area}.${t.name}`,u=({text:t,ariaLabel:s})=>{const[i,n]=B(!1);M(()=>{if(!i)return;const d=setTimeout(()=>n(!1),1500);return()=>clearTimeout(d)},[i]);const r=async()=>{var d;try{if((d=navigator==null?void 0:navigator.clipboard)!=null&&d.writeText)await navigator.clipboard.writeText(t);else{const E=document.createElement("textarea");E.value=t,document.body.appendChild(E),E.select(),document.execCommand("copy"),document.body.removeChild(E)}n(!0)}catch(E){}};return a.jsx("button",{type:"button",className:C("aaos-copy-btn",i&&"is-done"),onClick:r,"aria-label":s||"Copy",title:i?"Copied!":"Copy",children:i?a.jsx(ie,{}):a.jsx(se,{})})},he=({signal:t,api:s,modelId:i})=>{const[n,r]=B({kind:"idle"});M(()=>{r({kind:"idle"})},[t.name]);const d=$(t),E=Z(t),T=Ie(t),l=Ae(t.name),p=typeof(s==null?void 0:s.createWishlistApi)=="function"&&!!i,R=async()=>{if(p)try{r({kind:"loading"}),await s.createWishlistApi({model:i,apiName:T,description:t.description,type:pe(t),datatype:Te(t.dataType),skeleton:T,isWishlist:!0,...t.unit?{unit:t.unit}:{}}),r({kind:"success",message:`Added "${T}" as a wishlist signal.`})}catch(A){const o=(A==null?void 0:A.message)||"Failed to add as wishlist signal. See host toast.";r({kind:"error",message:o})}},I=[{key:"Signal",value:t.name},{key:"Group (Name)",value:t.group},{key:"Full Path",value:E},{key:"Property ID",value:d},{key:"Description",value:t.description},{key:"Change Mode",value:t.changeMode},{key:"Access",value:t.access.join(", ")},{key:"Vehicle Area",value:t.area},{key:"Data Type",value:t.dataType},{key:"VHAL Version",value:String(t.version)}];return t.unit&&I.push({key:"Unit",value:t.unit}),t.dataEnum&&t.dataEnum.length>0&&I.push({key:"Data Enum",value:t.dataEnum.join(", ")}),t.dataEnumBitFlags&&I.push({key:"Bit Flags",value:"data_enum_bit_flags"}),a.jsxs("div",{className:"aaos-detail",children:[a.jsxs("div",{className:"aaos-detail-bar",children:[a.jsxs("div",{className:"aaos-detail-name",children:[a.jsx("span",{children:t.name}),a.jsx(u,{text:t.name,ariaLabel:"Copy signal name"})]}),a.jsx("div",{className:"aaos-area-pill",children:t.area})]}),a.jsxs("div",{className:"aaos-detail-body",children:[a.jsx("div",{className:"aaos-section-title",children:"AAOS VehicleProperty"}),a.jsx("table",{className:"aaos-prop-table",children:a.jsx("tbody",{children:I.map(A=>a.jsxs("tr",{children:[a.jsx("td",{className:"k",children:A.key}),a.jsx("td",{className:"v",children:A.value})]},A.key))})}),a.jsx("div",{className:"aaos-section-title has-spacing",children:"COVESA matching signals"}),a.jsx("table",{className:"aaos-prop-table",children:a.jsxs("tbody",{children:[a.jsxs("tr",{children:[a.jsx("td",{className:"k",children:"Exact matches"}),a.jsx("td",{className:"v",children:l.exact.length===0?a.jsx("span",{children:"—"}):a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:l.exact.map(A=>a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8},children:[a.jsx("span",{children:A}),a.jsx(u,{text:A,ariaLabel:"Copy exact COVESA match"})]},`exact-${A}`))})})]}),a.jsxs("tr",{children:[a.jsx("td",{className:"k",children:"Partial matches"}),a.jsx("td",{className:"v",children:l.partial.length===0?a.jsx("span",{children:"—"}):a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:6},children:l.partial.map(A=>a.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8},children:[a.jsx("span",{children:A}),a.jsx(u,{text:A,ariaLabel:"Copy partial COVESA match"})]},`partial-${A}`))})})]})]})}),a.jsx("div",{className:"aaos-section-title has-spacing",children:"Property ID Composition"}),a.jsx("table",{className:"aaos-prop-table",children:a.jsxs("tbody",{children:[a.jsxs("tr",{children:[a.jsx("td",{className:"k",children:"Base ID"}),a.jsx("td",{className:"v",children:t.baseId})]}),a.jsxs("tr",{children:[a.jsx("td",{className:"k",children:"Group"}),a.jsx("td",{className:"v",children:"SYSTEM (0x10000000)"})]}),a.jsxs("tr",{children:[a.jsx("td",{className:"k",children:"Vehicle Area"}),a.jsx("td",{className:"v",children:t.area})]}),a.jsxs("tr",{children:[a.jsx("td",{className:"k",children:"Data Type"}),a.jsx("td",{className:"v",children:t.dataType})]}),a.jsxs("tr",{children:[a.jsx("td",{className:"k",children:"Computed ID"}),a.jsx("td",{className:"v",children:d})]})]})}),a.jsxs("div",{className:"aaos-actions",children:[a.jsxs("button",{type:"button",className:C("aaos-btn",!p&&"is-secondary"),onClick:R,disabled:!p||n.kind==="loading",title:p?`Register ${T} as a wishlist signal on this model`:"Wishlist API is unavailable in this context",children:[a.jsx(ne,{}),n.kind==="loading"?"Adding…":"Add as wishlist signal"]}),a.jsx(u,{text:E,ariaLabel:"Copy full path"})]}),a.jsxs("div",{className:C("aaos-status",n.kind==="error"&&"is-error",n.kind==="success"&&"is-success",n.kind!=="error"&&n.kind!=="success"&&"is-info"),children:[n.kind==="success"&&n.message,n.kind==="error"&&n.message,n.kind==="idle"&&!p&&a.jsx("span",{children:s!=null&&s.createWishlistApi?"No model in context — wishlist signals require a model.":"Wishlist API not provided by host."})]})]})]})},_e=globalThis.React,{useState:V}=_e,H=(...t)=>t.filter(Boolean).join(" "),Ne=({data:t,api:s})=>{var l;const[i,n]=V("area"),[r,d]=V(null),E=i==="area"?new Set(m.map(p=>p.area)).size:new Set(m.map(p=>p.group)).size,T=(l=t==null?void 0:t.model)==null?void 0:l.id;return a.jsxs("div",{className:"aaos-root",children:[a.jsxs("div",{className:"aaos-header",children:[a.jsxs("div",{className:"aaos-header-title",children:[a.jsx(b,{}),a.jsx("span",{children:"AAOS Vehicle Properties · Group View"})]}),a.jsxs("div",{className:"aaos-header-right",children:[a.jsxs("div",{className:"aaos-mode-toggle",children:[a.jsx("span",{children:"Group by:"}),a.jsxs("div",{className:"aaos-mode-pillgroup",children:[a.jsx("button",{type:"button",className:H("aaos-mode-pill",i==="area"&&"is-active"),onClick:()=>n("area"),children:"Vehicle Area"}),a.jsx("button",{type:"button",className:H("aaos-mode-pill",i==="name"&&"is-active"),onClick:()=>n("name"),children:"Name"})]})]}),a.jsxs("div",{className:"aaos-header-counter",children:[m.length," signals · ",E," groups"]})]})]}),a.jsxs("div",{className:"aaos-body",children:[a.jsx(oe,{signals:m,groupingMode:i,selectedSignal:r,onSelectSignal:d}),a.jsx("div",{className:"aaos-right",children:r?a.jsx(he,{signal:r,api:s,modelId:T}):a.jsxs("div",{className:"aaos-placeholder",children:[a.jsx("div",{className:"aaos-placeholder-icon",children:a.jsx(b,{size:56})}),a.jsx("div",{className:"aaos-placeholder-title",children:"Select an AAOS signal to view its details"}),a.jsx("div",{className:"aaos-placeholder-sub",children:"Pick a signal from the list on the left"})]})})]})]})},W="aaos-plugin-styles",Re=`
.aaos-root {
  --aaos-bg: #ffffff;
  --aaos-fg: #0f172a;
  --aaos-muted: #64748b;
  --aaos-muted-soft: #94a3b8;
  --aaos-border: #e2e8f0;
  --aaos-border-strong: #cbd5e1;
  --aaos-primary: #aa1c5d;
  --aaos-primary-soft: rgba(170, 28, 93, 0.10);
  --aaos-primary-soft-2: rgba(170, 28, 93, 0.05);
  --aaos-radius: 6px;
  --aaos-shadow-sm: 0 1px 2px rgba(15, 23, 42, 0.05);

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 480px;
  background: var(--aaos-bg);
  color: var(--aaos-fg);
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.4;
  border-radius: var(--aaos-radius);
  overflow: hidden;
  box-sizing: border-box;
}
.aaos-root *,
.aaos-root *::before,
.aaos-root *::after { box-sizing: border-box; }

.aaos-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--aaos-border);
  flex-shrink: 0;
}
.aaos-header-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: var(--aaos-primary);
}
.aaos-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}
.aaos-header-counter {
  font-size: 12px;
  font-weight: 500;
  color: var(--aaos-muted);
}

.aaos-mode-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 500;
  color: var(--aaos-muted);
}
.aaos-mode-pillgroup {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--aaos-border);
  background: #f1f5f9;
  border-radius: 6px;
  padding: 2px;
}
.aaos-mode-pill {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--aaos-muted);
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}
.aaos-mode-pill:hover { color: var(--aaos-fg); }
.aaos-mode-pill.is-active {
  background: #ffffff;
  color: var(--aaos-primary);
  box-shadow: var(--aaos-shadow-sm);
}

.aaos-body {
  flex: 1 1 auto;
  display: flex;
  width: 100%;
  min-height: 0;
  overflow: hidden;
}

.aaos-left {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--aaos-border);
  overflow: hidden;
}
.aaos-right {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.aaos-search-wrap {
  position: relative;
  padding: 12px 12px 8px 12px;
}
.aaos-search-icon {
  position: absolute;
  left: 22px;
  top: 50%;
  transform: translateY(-25%);
  color: var(--aaos-muted);
  pointer-events: none;
}
.aaos-input {
  width: 100%;
  height: 36px;
  padding: 0 12px 0 36px;
  border: 1px solid var(--aaos-border-strong);
  border-radius: var(--aaos-radius);
  background: #ffffff;
  color: var(--aaos-fg);
  font: inherit;
  outline: none;
  transition: border-color 120ms ease, box-shadow 120ms ease;
}
.aaos-input::placeholder { color: var(--aaos-muted-soft); }
.aaos-input:focus {
  border-color: var(--aaos-primary);
  box-shadow: 0 0 0 3px var(--aaos-primary-soft);
}

.aaos-list {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 0 12px 12px 12px;
}
.aaos-empty {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 500;
  color: var(--aaos-muted);
  padding: 24px 0;
}

.aaos-group {
  display: flex;
  flex-direction: column;
}
.aaos-group-btn {
  appearance: none;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  border-radius: var(--aaos-radius);
  font: inherit;
  font-weight: 600;
  color: var(--aaos-fg);
  cursor: pointer;
  transition: background-color 120ms ease;
}
.aaos-group-btn:hover { background: var(--aaos-primary-soft); }
.aaos-group-btn.is-open { background: var(--aaos-primary-soft-2); }
.aaos-group-left {
  display: flex;
  align-items: center;
  gap: 8px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
.aaos-group-chevron { color: var(--aaos-muted); }
.aaos-badge {
  display: inline-flex;
  min-width: 22px;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border-radius: 4px;
  background: #e2e8f0;
  color: var(--aaos-muted);
  font-size: 11px;
  font-weight: 500;
}

.aaos-signals {
  display: flex;
  flex-direction: column;
  padding-left: 24px;
  margin: 2px 0 4px 0;
}
.aaos-signal-btn {
  appearance: none;
  border: 0;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  text-align: left;
  padding: 6px 8px;
  border-radius: 4px;
  font: inherit;
  font-size: 13px;
  color: var(--aaos-muted);
  cursor: pointer;
  transition: background-color 120ms ease, color 120ms ease;
}
.aaos-signal-btn:hover { background: var(--aaos-primary-soft); }
.aaos-signal-btn.is-selected {
  background: var(--aaos-primary-soft);
  color: var(--aaos-primary);
  font-weight: 500;
}
.aaos-signal-name {
  flex: 1 1 auto;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.aaos-signal-tag {
  flex: 0 0 auto;
  margin-left: 8px;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--aaos-muted-soft);
}

.aaos-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: var(--aaos-muted);
  text-align: center;
  padding: 24px;
}
.aaos-placeholder-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: var(--aaos-primary-soft);
  color: var(--aaos-primary);
}
.aaos-placeholder-title {
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
}
.aaos-placeholder-sub {
  margin-top: 4px;
  font-size: 12px;
  color: var(--aaos-muted-soft);
}

.aaos-detail { display: flex; flex-direction: column; width: 100%; }
.aaos-detail-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 8px 8px 16px;
  background: var(--aaos-primary-soft);
}
.aaos-detail-name {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--aaos-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.aaos-area-pill {
  display: inline-flex;
  align-items: center;
  height: 32px;
  padding: 0 10px;
  border-radius: var(--aaos-radius);
  background: var(--aaos-primary);
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.aaos-detail-body { padding: 16px; }
.aaos-section-title {
  display: flex;
  font-size: 14px;
  font-weight: 500;
  color: var(--aaos-fg);
  margin: 0 0 8px 0;
}
.aaos-section-title.has-spacing { padding-top: 16px; }

.aaos-prop-table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--aaos-border);
  border-radius: var(--aaos-radius);
  overflow: hidden;
  font-size: 13px;
}
.aaos-prop-table tr + tr { border-top: 1px solid var(--aaos-border); }
.aaos-prop-table td {
  padding: 8px 12px;
  vertical-align: top;
}
.aaos-prop-table td.k {
  width: 38%;
  background: #f8fafc;
  color: var(--aaos-muted);
  font-weight: 500;
}
.aaos-prop-table td.v {
  color: var(--aaos-fg);
  word-break: break-word;
}

.aaos-copy-btn {
  appearance: none;
  background: transparent;
  border: 1px solid var(--aaos-border-strong);
  color: var(--aaos-muted);
  padding: 4px 6px;
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: color 120ms ease, border-color 120ms ease, background-color 120ms ease;
}
.aaos-copy-btn:hover {
  color: var(--aaos-primary);
  border-color: var(--aaos-primary);
  background: var(--aaos-primary-soft);
}
.aaos-copy-btn.is-done {
  color: #16a34a;
  border-color: #16a34a;
  background: rgba(22, 163, 74, 0.08);
}

.aaos-actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
}
.aaos-btn {
  appearance: none;
  border: 1px solid var(--aaos-primary);
  background: var(--aaos-primary);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: var(--aaos-radius);
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: filter 120ms ease, opacity 120ms ease;
}
.aaos-btn:hover { filter: brightness(0.95); }
.aaos-btn:disabled { opacity: 0.6; cursor: not-allowed; }
.aaos-btn.is-secondary {
  background: transparent;
  color: var(--aaos-primary);
}
.aaos-btn.is-success {
  border-color: #16a34a;
  background: #16a34a;
}

.aaos-status {
  margin-top: 8px;
  font-size: 12px;
  min-height: 16px;
}
.aaos-status.is-error { color: #dc2626; }
.aaos-status.is-success { color: #16a34a; }
.aaos-status.is-info { color: var(--aaos-muted); }
`,Oe=()=>{if(typeof document=="undefined"||document.getElementById(W))return;const t=document.createElement("style");t.id=W,t.appendChild(document.createTextNode(Re)),document.head.appendChild(t)};window.DAPlugins||(window.DAPlugins={}),window.DAPlugins["page-plugin"]={components:{Page:Ne},unmount:t=>{t&&(t.innerHTML="")}},Oe()})(React);
//# sourceMappingURL=index.js.map
