// Copyright (c) 2025 Eclipse Foundation.
//
// This program and the accompanying materials are made available under the
// terms of the MIT License which is available at
// https://opensource.org/licenses/MIT.
//
// SPDX-License-Identifier: MIT
//
// AAOS (Android Automotive OS) VehicleProperty signals.
//
// Source: android.hardware.automotive.vehicle.VehicleProperty AIDL.
// The data below is hand-curated from the AIDL definition so it can be rendered
// in a hierarchical group view (1st level: token before the first underscore,
// 2nd level: full property names) without requiring any backend support.

export type AaosVehicleArea =
  | 'GLOBAL'
  | 'SEAT'
  | 'WHEEL'
  | 'WINDOW'
  | 'MIRROR'
  | 'DOOR'
  | 'VENDOR'

export type AaosDataType =
  | 'STRING'
  | 'BOOLEAN'
  | 'INT32'
  | 'INT32_VEC'
  | 'INT64'
  | 'INT64_VEC'
  | 'FLOAT'
  | 'FLOAT_VEC'
  | 'BYTES'
  | 'MIXED'

export type AaosChangeMode = 'STATIC' | 'ON_CHANGE' | 'CONTINUOUS'

export type AaosAccessMode = 'READ' | 'WRITE' | 'READ_WRITE'

export interface AaosSignal {
  /** Property name as it appears in the AIDL, e.g. INFO_VIN */
  name: string
  /** First level group token (everything before the first underscore) */
  group: string
  /** Concise but informative description, derived from the AIDL Javadoc */
  description: string
  /** Change mode declared on the property */
  changeMode: AaosChangeMode
  /** Allowed access modes (multiple are allowed by the spec) */
  access: AaosAccessMode[]
  /** Optional unit annotation */
  unit?: string
  /** Optional data_enum annotations */
  dataEnum?: string[]
  /** Whether the property uses data_enum_bit_flags */
  dataEnumBitFlags?: boolean
  /** Vehicle area where the property applies */
  area: AaosVehicleArea
  /** Data type of the value */
  dataType: AaosDataType
  /** VHAL version when the property was introduced */
  version: number
  /** Base property id (the lower 16 bits) in 0xNNNN form */
  baseId: string
}

// VehiclePropertyGroup / VehicleArea / VehiclePropertyType bit flags taken from
// the AIDL VehiclePropertyGroup, VehicleArea and VehiclePropertyType enums.
const PROPERTY_GROUP_SYSTEM = 0x10000000

const AREA_FLAGS: Record<AaosVehicleArea, number> = {
  GLOBAL: 0x01000000,
  WINDOW: 0x03000000,
  MIRROR: 0x04000000,
  SEAT: 0x05000000,
  DOOR: 0x06000000,
  WHEEL: 0x07000000,
  VENDOR: 0x08000000,
}

const TYPE_FLAGS: Record<AaosDataType, number> = {
  STRING: 0x00100000,
  BOOLEAN: 0x00200000,
  INT32: 0x00400000,
  INT32_VEC: 0x00410000,
  INT64: 0x00500000,
  INT64_VEC: 0x00510000,
  FLOAT: 0x00600000,
  FLOAT_VEC: 0x00610000,
  BYTES: 0x00700000,
  MIXED: 0x00e00000,
}

/**
 * Returns the canonical first level group for an AAOS property name.
 * Strictly the substring before the first underscore (e.g. INFO_VIN -> INFO).
 */
export const getAaosGroupName = (signalName: string): string => {
  const idx = signalName.indexOf('_')
  return idx === -1 ? signalName : signalName.substring(0, idx)
}

/**
 * Computes the full numeric property id from the base id, area and type.
 * Returned as an upper-case hex string with leading 0x and 8 digits.
 */
export const getAaosPropertyId = (signal: AaosSignal): string => {
  const base = parseInt(signal.baseId, 16)
  const value =
    (PROPERTY_GROUP_SYSTEM +
      AREA_FLAGS[signal.area] +
      TYPE_FLAGS[signal.dataType] +
      base) >>>
    0
  return `0x${value.toString(16).toUpperCase().padStart(8, '0')}`
}

/**
 * Returns the full SYSTEM.<AREA>.<NAME> path used in the AIDL doc comments.
 */
export const getAaosFullPath = (signal: AaosSignal): string =>
  `SYSTEM.${signal.area}.${signal.name}`

/**
 * Groups an array of AAOS signals by their first level group token.
 * Returns a sorted record so callers can render groups in stable order.
 */
export const groupAaosSignals = (
  signals: AaosSignal[],
): Record<string, AaosSignal[]> => {
  const grouped: Record<string, AaosSignal[]> = {}
  for (const signal of signals) {
    if (!grouped[signal.group]) grouped[signal.group] = []
    grouped[signal.group].push(signal)
  }
  for (const key of Object.keys(grouped)) {
    grouped[key].sort((a, b) => a.name.localeCompare(b.name))
  }
  return grouped
}

/**
 * Groups an array of AAOS signals by their VehicleArea (GLOBAL, SEAT, WHEEL,
 * WINDOW, MIRROR, DOOR, VENDOR). Signals inside each area are sorted by name.
 */
export const groupAaosSignalsByArea = (
  signals: AaosSignal[],
): Record<string, AaosSignal[]> => {
  const grouped: Record<string, AaosSignal[]> = {}
  for (const signal of signals) {
    if (!grouped[signal.area]) grouped[signal.area] = []
    grouped[signal.area].push(signal)
  }
  for (const key of Object.keys(grouped)) {
    grouped[key].sort((a, b) => a.name.localeCompare(b.name))
  }
  return grouped
}

const s = (signal: Omit<AaosSignal, 'group'>): AaosSignal => ({
  ...signal,
  group: getAaosGroupName(signal.name),
})

export const AAOS_SIGNALS: AaosSignal[] = [
  // ---- INFO ---------------------------------------------------------------
  s({
    name: 'INFO_VIN',
    description: 'VIN of the vehicle.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'STRING',
    version: 1,
    baseId: '0x0100',
  }),
  s({
    name: 'INFO_MAKE',
    description:
      "Manufacturer of the vehicle. Communicates the vehicle's public brand name.",
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'STRING',
    version: 1,
    baseId: '0x0101',
  }),
  s({
    name: 'INFO_MODEL',
    description:
      "Model of the vehicle. Communicates the vehicle's public model name.",
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'STRING',
    version: 1,
    baseId: '0x0102',
  }),
  s({
    name: 'INFO_MODEL_YEAR',
    description:
      'Model year of the vehicle in YYYY format based on the Gregorian calendar.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    unit: 'VehicleUnit.YEAR',
    version: 1,
    baseId: '0x0103',
  }),
  s({
    name: 'INFO_FUEL_CAPACITY',
    description:
      'Maximum amount of fuel that can be stored in the vehicle, in milliliters. Does not apply to pure electric vehicles; for EVs use INFO_EV_BATTERY_CAPACITY.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.MILLILITER',
    version: 1,
    baseId: '0x0104',
  }),
  s({
    name: 'INFO_FUEL_TYPE',
    description:
      'List of fuels the vehicle may use. FUEL_TYPE_ELECTRIC must only be included if the vehicle is plug-in rechargeable.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    dataEnum: ['FuelType'],
    version: 1,
    baseId: '0x0105',
  }),
  s({
    name: 'INFO_EV_BATTERY_CAPACITY',
    description:
      'Nominal usable battery capacity for an EV or hybrid vehicle. This is the total usable capacity when the vehicle is new.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.WATT_HOUR',
    version: 1,
    baseId: '0x0106',
  }),
  s({
    name: 'INFO_EV_CONNECTOR_TYPE',
    description:
      'List of connectors this EV may use. If multiple charging ports exist, returns all possible connector types.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    dataEnum: ['EvConnectorType'],
    version: 1,
    baseId: '0x0107',
  }),
  s({
    name: 'INFO_FUEL_DOOR_LOCATION',
    description:
      'Fuel door location on the vehicle. Does not apply to pure electric vehicles.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['PortLocationType'],
    version: 1,
    baseId: '0x0108',
  }),
  s({
    name: 'INFO_EV_PORT_LOCATION',
    description:
      'EV port location for the fastest-charging port on the vehicle. Use INFO_MULTI_EV_PORT_LOCATIONS to expose all ports.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['PortLocationType'],
    version: 1,
    baseId: '0x0109',
  }),
  s({
    name: 'INFO_DRIVER_SEAT',
    description:
      "Driver's seat location. VHAL implementations must ignore the areaId and use VehicleArea:GLOBAL.",
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'INT32',
    dataEnum: ['VehicleAreaSeat'],
    version: 1,
    baseId: '0x010A',
  }),
  s({
    name: 'INFO_EXTERIOR_DIMENSIONS',
    description:
      'Exterior dimensions of the vehicle: height, length, width, width including mirrors, wheel base, track widths and curb-to-curb turning diameter.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    unit: 'VehicleUnit.MILLIMETER',
    version: 1,
    baseId: '0x010B',
  }),
  s({
    name: 'INFO_MULTI_EV_PORT_LOCATIONS',
    description:
      'Multiple EV port locations. Implement when the vehicle has more than one charging port.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    dataEnum: ['PortLocationType'],
    version: 1,
    baseId: '0x010C',
  }),
  s({
    name: 'INFO_MODEL_TRIM',
    description:
      "Public trim name of the vehicle. Empty for the base model and set to the trim name (e.g. 'Sport') for higher trims.",
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'STRING',
    version: 4,
    baseId: '0x010D',
  }),
  s({
    name: 'INFO_VEHICLE_SIZE_CLASS',
    description:
      'Vehicle Size Class. Returns the size classifications followed by the vehicle as enumerated in VehicleSizeClass.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    dataEnum: ['VehicleSizeClass'],
    version: 4,
    baseId: '0x010E',
  }),

  // ---- PERF ---------------------------------------------------------------
  s({
    name: 'PERF_ODOMETER',
    description: 'Current odometer value of the vehicle.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.KILOMETER',
    version: 1,
    baseId: '0x0204',
  }),
  s({
    name: 'PERF_VEHICLE_SPEED',
    description:
      'Speed of the vehicle. Positive when moving forward, negative when reversing. Independent of GEAR_SELECTION.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.METER_PER_SEC',
    version: 1,
    baseId: '0x0207',
  }),
  s({
    name: 'PERF_VEHICLE_SPEED_DISPLAY',
    description:
      'Speed of the vehicle as shown on the speedometer. May differ slightly from the actual speed.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.METER_PER_SEC',
    version: 1,
    baseId: '0x0208',
  }),
  s({
    name: 'PERF_STEERING_ANGLE',
    description:
      'Front bicycle-model steering angle for the vehicle in degrees. Left is negative. Independent of the steering wheel angle.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.DEGREES',
    version: 1,
    baseId: '0x0209',
  }),
  s({
    name: 'PERF_REAR_STEERING_ANGLE',
    description:
      'Rear bicycle-model steering angle for the vehicle in degrees. Left is negative.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.DEGREES',
    version: 1,
    baseId: '0x0210',
  }),

  // ---- INSTANTANEOUS ------------------------------------------------------
  s({
    name: 'INSTANTANEOUS_FUEL_ECONOMY',
    description:
      'Instantaneous fuel economy in L/100km. Independent of any *_DISPLAY_UNITS configuration.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    version: 4,
    baseId: '0x0211',
  }),
  s({
    name: 'INSTANTANEOUS_EV_EFFICIENCY',
    description:
      'Instantaneous EV battery efficiency in km/kWh. Independent of any *_DISPLAY_UNITS configuration.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    version: 4,
    baseId: '0x0212',
  }),

  // ---- ENGINE -------------------------------------------------------------
  s({
    name: 'ENGINE_COOLANT_TEMP',
    description: 'Temperature of engine coolant.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.CELSIUS',
    version: 1,
    baseId: '0x0301',
  }),
  s({
    name: 'ENGINE_OIL_LEVEL',
    description:
      'Engine oil level. The supportedEnumValues array must list the supported VehicleOilLevel states.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleOilLevel'],
    version: 1,
    baseId: '0x0303',
  }),
  s({
    name: 'ENGINE_OIL_TEMP',
    description: 'Temperature of engine oil.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.CELSIUS',
    version: 1,
    baseId: '0x0304',
  }),
  s({
    name: 'ENGINE_RPM',
    description: 'Engine RPM.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.RPM',
    version: 1,
    baseId: '0x0305',
  }),
  s({
    name: 'ENGINE_IDLE_AUTO_STOP_ENABLED',
    description:
      'Engine idle automatic stop feature. If true, the vehicle may automatically shut off the engine when not needed and restart it on demand.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0320',
  }),

  // ---- WHEEL_TICK ---------------------------------------------------------
  s({
    name: 'WHEEL_TICK',
    description:
      'Reports wheel ticks. The first element is a reset count; the next four are cumulative ticks for the four wheels (FL, FR, RR, RL).',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT64_VEC',
    version: 1,
    baseId: '0x0306',
  }),

  // ---- FUEL ---------------------------------------------------------------
  s({
    name: 'FUEL_LEVEL',
    description:
      'Current amount of fuel remaining in the vehicle in milliliters. Does not apply to pure electric vehicles.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.MILLILITER',
    version: 1,
    baseId: '0x0307',
  }),
  s({
    name: 'FUEL_DOOR_OPEN',
    description:
      'Whether the fuel door on the vehicle is open. Does not apply to pure electric vehicles.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0308',
  }),
  s({
    name: 'FUEL_LEVEL_LOW',
    description:
      'Warning for low fuel level. Once set, must not be cleared until more fuel is added.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0405',
  }),
  s({
    name: 'FUEL_VOLUME_DISPLAY_UNITS',
    description:
      'Units the car uses to display fuel volume to the user (e.g. LITER, GALLON). Updates may affect other *_DISPLAY_UNITS values.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleUnit'],
    version: 1,
    baseId: '0x0601',
  }),
  s({
    name: 'FUEL_CONSUMPTION_UNITS_DISTANCE_OVER_VOLUME',
    description:
      'Type of units used to display fuel consumption. True for distance/volume (MPG), false for volume/distance (L/100KM).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0604',
  }),

  // ---- EV -----------------------------------------------------------------
  s({
    name: 'EV_BATTERY_LEVEL',
    description:
      'Current battery level for an EV or hybrid vehicle. Will not exceed EV_CURRENT_BATTERY_CAPACITY.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.WATT_HOUR',
    version: 1,
    baseId: '0x0309',
  }),
  s({
    name: 'EV_CURRENT_BATTERY_CAPACITY',
    description:
      'Real-time usable battery capacity. Accounts for factors such as battery aging and temperature dependency.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.WATT_HOUR',
    version: 2,
    baseId: '0x030D',
  }),
  s({
    name: 'EV_CHARGE_PORT_OPEN',
    description:
      'EV charge port open. If multiple charging ports exist, returns true if any are open.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x030A',
  }),
  s({
    name: 'EV_CHARGE_PORT_CONNECTED',
    description:
      'EV charge port connected. If multiple charging ports exist, returns true if any are connected.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x030B',
  }),
  s({
    name: 'EV_BATTERY_INSTANTANEOUS_CHARGE_RATE',
    description:
      'EV instantaneous charge rate in milliwatts. Positive while charging, negative while discharging.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.MILLIWATTS',
    version: 1,
    baseId: '0x030C',
  }),
  s({
    name: 'EV_BATTERY_AVERAGE_TEMPERATURE',
    description:
      'EV battery average temperature. Should be the mean or weighted average across multiple sensors/batteries.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.CELSIUS',
    version: 3,
    baseId: '0x030E',
  }),
  s({
    name: 'EV_BRAKE_REGENERATION_LEVEL',
    description:
      'Regenerative braking level of an electric vehicle. minInt32Value indicates no regeneration; maxInt32Value indicates maximum energy regenerated.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 2,
    baseId: '0x040C',
  }),
  s({
    name: 'EV_STOPPING_MODE',
    description:
      'Current EV stopping mode. Supported values come from the EvStoppingMode enum.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['EvStoppingMode'],
    version: 2,
    baseId: '0x040D',
  }),
  s({
    name: 'EV_BATTERY_DISPLAY_UNITS',
    description:
      'Units used to display EV battery information to the user (e.g. WATT_HOUR, KILOWATT_HOUR, AMPERE_HOURS).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleUnit'],
    version: 1,
    baseId: '0x0603',
  }),
  s({
    name: 'EV_CHARGE_CURRENT_DRAW_LIMIT',
    description:
      'Selected AC EV charging draw limit in Amperes. configArray[0] specifies the max draw allowed at boot time.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.AMPERE',
    version: 1,
    baseId: '0x0F3F',
  }),
  s({
    name: 'EV_CHARGE_PERCENT_LIMIT',
    description:
      'Maximum charge percent threshold set by the user. Returns a float value from 0 to 100.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    version: 1,
    baseId: '0x0F40',
  }),
  s({
    name: 'EV_CHARGE_STATE',
    description:
      'Current EV charging state of the car. Must return STATE_FULLY_CHARGED when EV_CHARGE_PERCENT_LIMIT is reached.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['EvChargeState'],
    version: 1,
    baseId: '0x0F41',
  }),
  s({
    name: 'EV_CHARGE_SWITCH',
    description:
      'Start or stop charging the EV battery. true starts charging, false stops it.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0F42',
  }),
  s({
    name: 'EV_CHARGE_TIME_REMAINING',
    description:
      'Estimated EV charge time remaining in seconds. Returns 0 when the vehicle is not charging.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    unit: 'VehicleUnit.SECS',
    version: 1,
    baseId: '0x0F43',
  }),
  s({
    name: 'EV_REGENERATIVE_BRAKING_STATE',
    description:
      'Regenerative braking or one-pedal drive setting. EV_BRAKE_REGENERATION_LEVEL provides a more granular alternative.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['EvRegenerativeBrakingState'],
    version: 1,
    baseId: '0x0F44',
  }),

  // ---- RANGE / TIRE / PEDAL / BRAKE ---------------------------------------
  s({
    name: 'RANGE_REMAINING',
    description:
      'Meters remaining of fuel and charge. Sum of ranges from all energy sources in the vehicle.',
    changeMode: 'CONTINUOUS',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.METER',
    version: 1,
    baseId: '0x0308',
  }),
  s({
    name: 'TIRE_PRESSURE',
    description:
      "Tire pressure. Each tire is identified by its areaConfig.areaId. minFloatValue/maxFloatValue store the OEM's recommended pressure range.",
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'WHEEL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.KILOPASCAL',
    version: 1,
    baseId: '0x0309',
  }),
  s({
    name: 'CRITICALLY_LOW_TIRE_PRESSURE',
    description:
      'Critically low tire pressure threshold for each tire. Indicates when tires must be replaced or fixed.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'WHEEL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.KILOPASCAL',
    version: 1,
    baseId: '0x030A',
  }),
  s({
    name: 'TIRE_PRESSURE_DISPLAY_UNITS',
    description:
      'Units used to display tire pressure to the user (e.g. KILOPASCAL, PSI, BAR).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleUnit'],
    version: 1,
    baseId: '0x0602',
  }),
  s({
    name: 'ACCELERATOR_PEDAL_COMPRESSION_PERCENTAGE',
    description:
      'Accelerator pedal compression percentage from 0 (not compressed) to 100 (maximally compressed).',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    version: 4,
    baseId: '0x030F',
  }),
  s({
    name: 'BRAKE_PEDAL_COMPRESSION_PERCENTAGE',
    description:
      'Brake pedal compression percentage from 0 (not compressed) to 100 (maximally compressed).',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    version: 4,
    baseId: '0x0310',
  }),
  s({
    name: 'BRAKE_PAD_WEAR_PERCENTAGE',
    description:
      'Brake pad wear percentage accumulated by the vehicle from 0 (no wear) to 100 (maximally worn).',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'WHEEL',
    dataType: 'FLOAT',
    version: 4,
    baseId: '0x0311',
  }),
  s({
    name: 'BRAKE_FLUID_LEVEL_LOW',
    description:
      'Brake fluid low. Communicates that the brake fluid level in the vehicle is low according to the OEM.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 4,
    baseId: '0x0312',
  }),
  s({
    name: 'VEHICLE_PASSIVE_SUSPENSION_HEIGHT',
    description:
      "Real-time suspension displacement of the vehicle in mm relative to the suspension's neutral position.",
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'WHEEL',
    dataType: 'INT32',
    version: 4,
    baseId: '0x0313',
  }),

  // ---- IMPACT / HORN ------------------------------------------------------
  s({
    name: 'IMPACT_DETECTED',
    description:
      'Bit-flag property indicating whether an impact has been detected on a particular side of the vehicle (ImpactSensorLocation).',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['ImpactSensorLocation'],
    dataEnumBitFlags: true,
    version: 3,
    baseId: '0x0330',
  }),
  s({
    name: 'VEHICLE_HORN_ENGAGED',
    description:
      "Whether the vehicle's horn is currently engaged. true means engaged, false means disengaged.",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 4,
    baseId: '0x0340',
  }),

  // ---- GEAR / BRAKE / IGNITION -------------------------------------------
  s({
    name: 'GEAR_SELECTION',
    description:
      'Currently selected gear. The supported values list represents the list of supported gears for this vehicle.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleGear'],
    version: 1,
    baseId: '0x0400',
  }),
  s({
    name: 'CURRENT_GEAR',
    description:
      'Current gear actually engaged. May not match GEAR_SELECTION in non-manual transmissions.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleGear'],
    version: 1,
    baseId: '0x0401',
  }),
  s({
    name: 'PARKING_BRAKE_ON',
    description:
      "Parking brake state. true if the car's parking brake is currently engaged, false otherwise.",
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0402',
  }),
  s({
    name: 'PARKING_BRAKE_AUTO_APPLY',
    description:
      "Auto-apply parking brake. true if the vehicle's automatic parking brake feature is currently enabled.",
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0403',
  }),
  s({
    name: 'NIGHT_MODE',
    description:
      'Night mode. true means the night mode sensor has detected low light in the cabin environment.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0407',
  }),
  s({
    name: 'TURN_SIGNAL_STATE',
    description:
      "(Deprecated) State of the vehicle's turn signals. Replaced by TURN_SIGNAL_LIGHT_STATE and TURN_SIGNAL_SWITCH.",
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleTurnSignal'],
    version: 1,
    baseId: '0x0408',
  }),
  s({
    name: 'IGNITION_STATE',
    description:
      'Represents the ignition state. Supported values come from the VehicleIgnitionState enum.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleIgnitionState'],
    version: 1,
    baseId: '0x0409',
  }),
  s({
    name: 'ABS_ACTIVE',
    description:
      'ABS active. true while ABS is active. May pulse based on the real-time state of the ABS system.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x040A',
  }),
  s({
    name: 'TRACTION_CONTROL_ACTIVE',
    description:
      'Traction Control active. true while TC is active. May pulse based on the real-time state of the TC system.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x040B',
  }),
  s({
    name: 'ELECTRONIC_STABILITY_CONTROL_ENABLED',
    description:
      'Enable or disable Electronic Stability Control (ESC). When enabled, the system actively controls the tires to prevent skidding.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x040E',
  }),
  s({
    name: 'ELECTRONIC_STABILITY_CONTROL_STATE',
    description:
      'Current state of Electronic Stability Control (ESC). Errors must be conveyed via supported ErrorState values.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['ElectronicStabilityControlState', 'ErrorState'],
    version: 3,
    baseId: '0x040F',
  }),
  s({
    name: 'TURN_SIGNAL_LIGHT_STATE',
    description:
      'Actual state of the turn signal lights. Uses VehicleTurnSignal as a bit flag so multiple lights can be ORed together.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleTurnSignal'],
    dataEnumBitFlags: true,
    version: 4,
    baseId: '0x0410',
  }),
  s({
    name: 'TURN_SIGNAL_SWITCH',
    description:
      'Position of the turn signal lever/switch. Different from TURN_SIGNAL_LIGHT_STATE which represents the actual lights.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleTurnSignal'],
    version: 4,
    baseId: '0x0411',
  }),

  // ---- HVAC ---------------------------------------------------------------
  s({
    name: 'HVAC_FAN_SPEED',
    description:
      'Fan speed setting. Specified as a relative range between minInt32Value (lowest) and maxInt32Value (highest).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0500',
  }),
  s({
    name: 'HVAC_FAN_DIRECTION',
    description:
      'Current HVAC fan direction setting. Supported directions are exposed through HVAC_FAN_DIRECTION_AVAILABLE.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    dataEnum: ['VehicleHvacFanDirection'],
    version: 1,
    baseId: '0x0501',
  }),
  s({
    name: 'HVAC_TEMPERATURE_CURRENT',
    description: 'HVAC current temperature.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.CELSIUS',
    version: 1,
    baseId: '0x0502',
  }),
  s({
    name: 'HVAC_TEMPERATURE_SET',
    description:
      'HVAC target temperature set in Celsius. Supports a Celsius<->Fahrenheit lookup table via configArray.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.CELSIUS',
    version: 1,
    baseId: '0x0503',
  }),
  s({
    name: 'HVAC_DEFROSTER',
    description: 'Fan-based defrost for the designated window.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'WINDOW',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0504',
  }),
  s({
    name: 'HVAC_AC_ON',
    description: 'On/off AC for the designated areaId.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0505',
  }),
  s({
    name: 'HVAC_MAX_AC_ON',
    description:
      'On/off MAX AC. The ECU may adjust vent position, fan speed and temperature to cool the vehicle as quickly as possible.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0506',
  }),
  s({
    name: 'HVAC_MAX_DEFROST_ON',
    description:
      'On/off MAX DEFROST. The ECU may adjust vent position, fan speed and temperature to defrost the windows as quickly as possible.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0507',
  }),
  s({
    name: 'HVAC_RECIRC_ON',
    description: 'Recirculation on/off. Controls the supply of exterior air to the cabin.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0508',
  }),
  s({
    name: 'HVAC_DUAL_ON',
    description:
      'Enable temperature coupling between areas. Synchronises temperature for the affected areas.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0509',
  }),
  s({
    name: 'HVAC_AUTO_ON',
    description: 'On/off automatic climate control.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x050A',
  }),
  s({
    name: 'HVAC_SEAT_TEMPERATURE',
    description:
      'Seat heating/cooling. Range from minInt32Value (max cooling, or 0) to maxInt32Value (max heating).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x050B',
  }),
  s({
    name: 'HVAC_SIDE_MIRROR_HEAT',
    description:
      'Side mirror heat. minInt32Value=0 (no heating) to maxInt32Value (maximum heating level).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'MIRROR',
    dataType: 'INT32',
    version: 1,
    baseId: '0x050C',
  }),
  s({
    name: 'HVAC_STEERING_WHEEL_HEAT',
    description:
      'Steering wheel heating/cooling. minInt32Value indicates max cooling (or 0) and maxInt32Value indicates max heating.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 1,
    baseId: '0x050D',
  }),
  s({
    name: 'HVAC_TEMPERATURE_DISPLAY_UNITS',
    description:
      'Temperature units used for display. Must be one of VehicleUnit.CELSIUS or VehicleUnit.FAHRENHEIT.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleUnit'],
    version: 1,
    baseId: '0x050E',
  }),
  s({
    name: 'HVAC_ACTUAL_FAN_SPEED_RPM',
    description: 'Actual fan speed.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x050F',
  }),
  s({
    name: 'HVAC_POWER_ON',
    description:
      'Global HVAC power state. Setting to false may mark some HVAC sub-system properties UNAVAILABLE.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0510',
  }),
  s({
    name: 'HVAC_FAN_DIRECTION_AVAILABLE',
    description:
      'List of supported fan directions in the vehicle. Bit mask of VehicleHvacFanDirection per area ID.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'INT32_VEC',
    dataEnum: ['VehicleHvacFanDirection'],
    dataEnumBitFlags: true,
    version: 1,
    baseId: '0x0511',
  }),
  s({
    name: 'HVAC_AUTO_RECIRC_ON',
    description:
      'Automatic recirculation on/off. The HVAC system may switch to recirculation mode if poor air quality is detected.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0512',
  }),
  s({
    name: 'HVAC_SEAT_VENTILATION',
    description:
      'Seat ventilation. minInt32Value=0 to maxInt32Value (max ventilation). Independent from seat cooling.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0513',
  }),
  s({
    name: 'HVAC_ELECTRIC_DEFROSTER_ON',
    description: "Electric defrosters' status.",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'WINDOW',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0514',
  }),
  s({
    name: 'HVAC_TEMPERATURE_VALUE_SUGGESTION',
    description:
      'Suggested values for setting HVAC temperature. Helps applications find the closest supported value in Celsius or Fahrenheit.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE'],
    area: 'GLOBAL',
    dataType: 'FLOAT_VEC',
    version: 1,
    baseId: '0x0515',
  }),

  // ---- DISTANCE / VEHICLE display units -----------------------------------
  s({
    name: 'DISTANCE_DISPLAY_UNITS',
    description:
      'Units the car uses to display distances (e.g. METER, KILOMETER, MILE).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleUnit'],
    version: 1,
    baseId: '0x0600',
  }),
  s({
    name: 'VEHICLE_SPEED_DISPLAY_UNITS',
    description:
      'Units the car uses to display speed to the user (e.g. M/S, MPH, KM/H).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleUnit'],
    version: 1,
    baseId: '0x0605',
  }),

  // ---- TIME ---------------------------------------------------------------
  s({
    name: 'EXTERNAL_CAR_TIME',
    description:
      'Current date and time suggestion for the car, encoded as Epoch time in milliseconds.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT64',
    unit: 'VehicleUnit.MILLI_SECS',
    version: 1,
    baseId: '0x0608',
  }),
  s({
    name: 'ANDROID_EPOCH_TIME',
    description:
      "Current date and time encoded as Epoch time in ms. CarServices writes Android's system time to share with the VHAL.",
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'INT64',
    unit: 'VehicleUnit.MILLI_SECS',
    version: 1,
    baseId: '0x0606',
  }),
  s({
    name: 'STORAGE_ENCRYPTION_BINDING_SEED',
    description:
      'External encryption binding seed (16 bytes). Mixed with the local key storage encryption key and persisted on a separate ECU.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE'],
    area: 'GLOBAL',
    dataType: 'BYTES',
    version: 1,
    baseId: '0x0607',
  }),

  // ---- ENV ---------------------------------------------------------------
  s({
    name: 'ENV_OUTSIDE_TEMPERATURE',
    description:
      'Outside temperature reading from the environment outside the vehicle. Should be the mean of all sensors when multiple exist.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.CELSIUS',
    version: 1,
    baseId: '0x0703',
  }),

  // ---- AP / DISPLAY / VALET / HEAD ---------------------------------------
  s({
    name: 'AP_POWER_STATE_REQ',
    description:
      'Property to control the power state of the application processor. Carries a VehicleApPowerStateReq value.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    version: 1,
    baseId: '0x0A00',
  }),
  s({
    name: 'AP_POWER_STATE_REPORT',
    description:
      'Property used to report the application processor power state, with optional wake-up time in ms.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    version: 1,
    baseId: '0x0A01',
  }),
  s({
    name: 'AP_POWER_BOOTUP_REASON',
    description:
      'Reports the bootup reason for the current power-on cycle. A static property for the duration until power off.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0A02',
  }),
  s({
    name: 'DISPLAY_BRIGHTNESS',
    description:
      'Brightness of the display. Use PER_DISPLAY_BRIGHTNESS for vehicles with displays controlled separately.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0A03',
  }),
  s({
    name: 'PER_DISPLAY_BRIGHTNESS',
    description:
      'Brightness of displays controlled separately. int32Values[0]=display port, int32Values[1]=brightness.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    version: 2,
    baseId: '0x0A04',
  }),
  s({
    name: 'PER_DISPLAY_MAX_BRIGHTNESS',
    description:
      'Max brightness of displays controlled separately. Pairs of [display port, max brightness] entries.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    version: 3,
    baseId: '0x0F4E',
  }),
  s({
    name: 'VALET_MODE_ENABLED',
    description:
      'Valet mode enabled. Prevents an untrusted driver from accessing more private areas (glove box, trunk).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x0A05',
  }),
  s({
    name: 'HEAD_UP_DISPLAY_ENABLED',
    description:
      "Head-up display (HUD) enabled. Each HUD should be assigned to the seat that is intended to use it.",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x0A06',
  }),

  // ---- HW INPUT -----------------------------------------------------------
  s({
    name: 'HW_KEY_INPUT',
    description:
      'Property to feed hardware key input events to Android: action, key code, target display and an optional repeat count.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    version: 1,
    baseId: '0x0A10',
  }),
  s({
    name: 'HW_KEY_INPUT_V2',
    description:
      'Hardware key input events V2 with target display, key code, action, repeat count and a precise down-time.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'MIXED',
    version: 2,
    baseId: '0x0A11',
  }),
  s({
    name: 'HW_MOTION_INPUT',
    description:
      'Hardware motion input events: source, action, button state, pointer count plus per-pointer data and timing.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'MIXED',
    version: 2,
    baseId: '0x0A12',
  }),
  s({
    name: 'HW_ROTARY_INPUT',
    description:
      'Hardware rotary events: rotary type, number of detents (clockwise/counterclockwise), target display and inter-detent timings.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    dataEnum: ['RotaryInputType'],
    version: 1,
    baseId: '0x0A20',
  }),
  s({
    name: 'HW_CUSTOM_INPUT',
    description:
      'Custom OEM partner input event used for events not supported by Android. Identified by a CustomInputType.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    dataEnum: ['CustomInputType'],
    version: 1,
    baseId: '0x0A30',
  }),

  // ---- DOOR ---------------------------------------------------------------
  s({
    name: 'DOOR_POS',
    description:
      'Door position. minInt32Value=0 (closed) and maxInt32Value (fully open). Some vehicles may open the door electronically.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'DOOR',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B00',
  }),
  s({
    name: 'DOOR_MOVE',
    description:
      'Door move. Magnitude indicates speed; sign indicates direction. Resets to 0 once the door reaches its limit.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'DOOR',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B01',
  }),
  s({
    name: 'DOOR_LOCK',
    description: 'Door lock. true indicates the door is locked.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'DOOR',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0B02',
  }),
  s({
    name: 'DOOR_CHILD_LOCK_ENABLED',
    description:
      'Door child lock feature enabled. When true, the door cannot be opened from the inside.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'DOOR',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0B03',
  }),

  // ---- MIRROR -------------------------------------------------------------
  s({
    name: 'MIRROR_Z_POS',
    description:
      'Mirror Z (tilt up/down) position. Negative values tilt down, positive tilt up; 0 means no tilt in either direction.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'MIRROR',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B40',
  }),
  s({
    name: 'MIRROR_Z_MOVE',
    description:
      'Mirror Z move. Magnitude indicates speed; sign indicates direction. Resets to 0 at positional limits.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'MIRROR',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B41',
  }),
  s({
    name: 'MIRROR_Y_POS',
    description:
      'Mirror Y (tilt left/right) position. Negative tilts to the left, positive to the right.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'MIRROR',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B42',
  }),
  s({
    name: 'MIRROR_Y_MOVE',
    description:
      'Mirror Y move. Magnitude indicates speed; sign indicates direction.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'MIRROR',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B43',
  }),
  s({
    name: 'MIRROR_LOCK',
    description:
      'Mirror lock. true indicates mirror positions are locked and not changeable.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0B44',
  }),
  s({
    name: 'MIRROR_FOLD',
    description: 'Mirror fold. true indicates mirrors are folded.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0B45',
  }),
  s({
    name: 'MIRROR_AUTO_FOLD_ENABLED',
    description:
      "Mirror auto fold feature. true when the vehicle's side mirrors will fold automatically (e.g. when the vehicle is locked).",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'MIRROR',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0B46',
  }),
  s({
    name: 'MIRROR_AUTO_TILT_ENABLED',
    description:
      "Mirror auto tilt feature. true when the vehicle's side mirrors tilt automatically (e.g. on reverse).",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'MIRROR',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0B47',
  }),

  // ---- SEAT ---------------------------------------------------------------
  s({
    name: 'SEAT_MEMORY_SELECT',
    description:
      'Seat memory select. Selects which preset memory slot to apply to the seat position.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B80',
  }),
  s({
    name: 'SEAT_MEMORY_SET',
    description:
      'Seat memory set. Saves the current seat position settings into the selected preset slot.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B81',
  }),
  s({
    name: 'SEAT_BELT_BUCKLED',
    description:
      'Seat belt buckled. true indicates the belt is buckled.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0B82',
  }),
  s({
    name: 'SEAT_BELT_HEIGHT_POS',
    description:
      "Seat belt height position. Adjusts the shoulder belt anchor between its lowest and highest positions.",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B83',
  }),
  s({
    name: 'SEAT_BELT_HEIGHT_MOVE',
    description:
      "Seat belt height move. Speed of moving the seat belt's shoulder anchor up or down.",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B84',
  }),
  s({
    name: 'SEAT_FORE_AFT_POS',
    description:
      'Seat fore/aft position. Sets the seat position forward and backward.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B85',
  }),
  s({
    name: 'SEAT_FORE_AFT_MOVE',
    description:
      'Seat fore/aft move. Moves the entire seat forward/backward in the direction it is facing.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B86',
  }),
  s({
    name: 'SEAT_BACKREST_ANGLE_1_POS',
    description:
      'Seat backrest angle 1 position. Backrest angle 1 is the actuator closest to the bottom of the seat.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B87',
  }),
  s({
    name: 'SEAT_BACKREST_ANGLE_1_MOVE',
    description: 'Seat backrest angle 1 move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B88',
  }),
  s({
    name: 'SEAT_BACKREST_ANGLE_2_POS',
    description:
      'Seat backrest angle 2 position. Backrest angle 2 is the next actuator up from the bottom of the seat.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B89',
  }),
  s({
    name: 'SEAT_BACKREST_ANGLE_2_MOVE',
    description: 'Seat backrest angle 2 move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B8A',
  }),
  s({
    name: 'SEAT_HEIGHT_POS',
    description:
      'Seat height position. minInt32Value (lowest) to maxInt32Value (highest position).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B8B',
  }),
  s({
    name: 'SEAT_HEIGHT_MOVE',
    description: 'Seat height move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B8C',
  }),
  s({
    name: 'SEAT_DEPTH_POS',
    description:
      'Seat depth position. Distance from back rest to front edge of the seat.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B8D',
  }),
  s({
    name: 'SEAT_DEPTH_MOVE',
    description: 'Seat depth move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B8E',
  }),
  s({
    name: 'SEAT_TILT_POS',
    description:
      'Seat tilt position. Angles the seat bottom from its lowest to its highest angular position.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B8F',
  }),
  s({
    name: 'SEAT_TILT_MOVE',
    description: 'Seat tilt move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B90',
  }),
  s({
    name: 'SEAT_LUMBAR_FORE_AFT_POS',
    description:
      'Lumbar fore/aft position. minInt32Value (rearward most, least supportive) to maxInt32Value (most supportive).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B91',
  }),
  s({
    name: 'SEAT_LUMBAR_FORE_AFT_MOVE',
    description: 'Lumbar fore/aft move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B92',
  }),
  s({
    name: 'SEAT_LUMBAR_SIDE_SUPPORT_POS',
    description:
      'Lumbar side support position. minInt32Value (thinnest, most support) to maxInt32Value (widest, least support).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B93',
  }),
  s({
    name: 'SEAT_LUMBAR_SIDE_SUPPORT_MOVE',
    description: 'Lumbar side support move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B94',
  }),
  s({
    name: 'SEAT_HEADREST_HEIGHT_POS',
    description:
      '(Deprecated) Headrest height position. Use SEAT_HEADREST_HEIGHT_POS_V2 (per seat) instead.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B95',
  }),
  s({
    name: 'SEAT_HEADREST_HEIGHT_POS_V2',
    description:
      'Headrest height position per seat. minInt32Value (lowest) to maxInt32Value (highest position).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0BA4',
  }),
  s({
    name: 'SEAT_HEADREST_HEIGHT_MOVE',
    description: 'Headrest height move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B96',
  }),
  s({
    name: 'SEAT_HEADREST_ANGLE_POS',
    description:
      'Headrest angle position. minInt32Value (full recline) to maxInt32Value (most upright/forward position).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B97',
  }),
  s({
    name: 'SEAT_HEADREST_ANGLE_MOVE',
    description: 'Headrest angle move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B98',
  }),
  s({
    name: 'SEAT_HEADREST_FORE_AFT_POS',
    description:
      'Headrest fore/aft position. minInt32Value (rearward-most) to maxInt32Value (forward-most position).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B99',
  }),
  s({
    name: 'SEAT_HEADREST_FORE_AFT_MOVE',
    description: 'Headrest fore/aft move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0B9A',
  }),
  s({
    name: 'SEAT_FOOTWELL_LIGHTS_STATE',
    description:
      'Current state of the seat footwell lights. May differ from CABIN_LIGHTS_STATE if implemented separately.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'INT32',
    dataEnum: ['VehicleLightState'],
    version: 2,
    baseId: '0x0B9B',
  }),
  s({
    name: 'SEAT_FOOTWELL_LIGHTS_SWITCH',
    description:
      'Position of the switch controlling the seat footwell lights.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    dataEnum: ['VehicleLightSwitch'],
    version: 2,
    baseId: '0x0B9C',
  }),
  s({
    name: 'SEAT_EASY_ACCESS_ENABLED',
    description:
      'Seat easy access feature. When true, the seat will adjust automatically to make it easier to enter and exit the vehicle.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0B9D',
  }),
  s({
    name: 'SEAT_AIRBAG_ENABLED',
    description:
      "Whether a seat's airbags can deploy when triggered (e.g. by a crash). Does not indicate deployment status.",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0B9E',
  }),
  s({
    name: 'SEAT_AIRBAGS_DEPLOYED',
    description:
      "Bit-flag property reporting which airbags have been deployed at each seat. Per-seat VehicleAirbagLocation.",
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'INT32',
    dataEnum: ['VehicleAirbagLocation'],
    version: 3,
    baseId: '0x0BA5',
  }),
  s({
    name: 'SEAT_CUSHION_SIDE_SUPPORT_POS',
    description:
      "Seat cushion side support position. minInt32Value (thinnest, most support) to maxInt32Value (widest, least support).",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0B9F',
  }),
  s({
    name: 'SEAT_CUSHION_SIDE_SUPPORT_MOVE',
    description: 'Seat cushion side support move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0BA0',
  }),
  s({
    name: 'SEAT_LUMBAR_VERTICAL_POS',
    description:
      "Seat lumbar support vertical position. minInt32Value (lowest) to maxInt32Value (highest position).",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0BA1',
  }),
  s({
    name: 'SEAT_LUMBAR_VERTICAL_MOVE',
    description: 'Seat lumbar vertical move (speed/direction).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0BA2',
  }),
  s({
    name: 'SEAT_WALK_IN_POS',
    description:
      'Current walk-in position of the seat. minInt32Value=0 (normal) to maxInt32Value (full walk-in position).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0BA3',
  }),
  s({
    name: 'SEAT_BELT_PRETENSIONER_DEPLOYED',
    description:
      'Whether the seat belt pretensioner has been deployed for this seat due to a collision.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x0BA6',
  }),
  s({
    name: 'SEAT_OCCUPANCY',
    description:
      "Whether a particular seat is occupied or not. Values come from the VehicleSeatOccupancyState enum.",
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'INT32',
    dataEnum: ['VehicleSeatOccupancyState'],
    version: 1,
    baseId: '0x0BB0',
  }),

  // ---- WINDOW -------------------------------------------------------------
  s({
    name: 'WINDOW_POS',
    description:
      'Window position. 0 indicates the window is closed; positive values indicate it is opening; negative values open it out of plane (e.g. sunroof vent).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'WINDOW',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0BC0',
  }),
  s({
    name: 'WINDOW_MOVE',
    description:
      'Window move. Magnitude indicates speed; sign indicates direction. Resets to 0 once the window reaches its limit.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'WINDOW',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0BC1',
  }),
  s({
    name: 'WINDOW_LOCK',
    description: 'Window child lock. true indicates the window is child-locked.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'WINDOW',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0BC4',
  }),

  // ---- WINDSHIELD ---------------------------------------------------------
  s({
    name: 'WINDSHIELD_WIPERS_PERIOD',
    description:
      'Instantaneous time period in milliseconds for one full wiper cycle. Set to 0 during the pause of an intermittent wiper setting.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'WINDOW',
    dataType: 'INT32',
    unit: 'VehicleUnit.MILLI_SECS',
    version: 2,
    baseId: '0x0BC5',
  }),
  s({
    name: 'WINDSHIELD_WIPERS_STATE',
    description:
      'Current state of the windshield wipers. May not match WINDSHIELD_WIPERS_SWITCH (e.g. AUTO switch with the wipers currently ON).',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'WINDOW',
    dataType: 'INT32',
    dataEnum: ['WindshieldWipersState'],
    version: 2,
    baseId: '0x0BC6',
  }),
  s({
    name: 'WINDSHIELD_WIPERS_SWITCH',
    description:
      'Position of the switch controlling the windshield wipers. May not match WINDSHIELD_WIPERS_STATE.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'WINDOW',
    dataType: 'INT32',
    dataEnum: ['WindshieldWipersSwitch'],
    version: 2,
    baseId: '0x0BC7',
  }),

  // ---- STEERING -----------------------------------------------------------
  s({
    name: 'STEERING_WHEEL_DEPTH_POS',
    description:
      'Steering wheel depth position. minInt32Value (closest to driver) to maxInt32Value (furthest).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0BE0',
  }),
  s({
    name: 'STEERING_WHEEL_DEPTH_MOVE',
    description:
      'Steering wheel depth movement. Magnitude indicates speed; sign indicates direction.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0BE1',
  }),
  s({
    name: 'STEERING_WHEEL_HEIGHT_POS',
    description:
      'Steering wheel height position. minInt32Value (lowest) to maxInt32Value (highest position).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0BE2',
  }),
  s({
    name: 'STEERING_WHEEL_HEIGHT_MOVE',
    description:
      'Steering wheel height movement. Magnitude indicates speed; sign indicates direction.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0BE3',
  }),
  s({
    name: 'STEERING_WHEEL_THEFT_LOCK_ENABLED',
    description:
      'Steering wheel theft lock feature. When enabled, the steering wheel locks automatically to prevent theft.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0BE4',
  }),
  s({
    name: 'STEERING_WHEEL_LOCKED',
    description:
      "Steering wheel locked. true indicates the steering wheel's position is locked.",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0BE5',
  }),
  s({
    name: 'STEERING_WHEEL_EASY_ACCESS_ENABLED',
    description:
      "Steering wheel easy access feature. When enabled, the driver's steering wheel adjusts to make it easier to enter and exit the vehicle.",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0BE6',
  }),
  s({
    name: 'STEERING_WHEEL_LIGHTS_STATE',
    description:
      'Current state of the steering wheel lights. May differ from STEERING_WHEEL_LIGHTS_SWITCH (e.g. AUTOMATIC switch with the lights currently ON).',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightState'],
    version: 2,
    baseId: '0x0F0C',
  }),
  s({
    name: 'STEERING_WHEEL_LIGHTS_SWITCH',
    description:
      'Position of the switch controlling the steering wheel lights.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightSwitch'],
    version: 2,
    baseId: '0x0F0D',
  }),

  // ---- GLOVE --------------------------------------------------------------
  s({
    name: 'GLOVE_BOX_DOOR_POS',
    description:
      "Current position of the glove box door. minInt32Value=0 (closed) to maxInt32Value (fully open).",
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0BF0',
  }),
  s({
    name: 'GLOVE_BOX_LOCKED',
    description:
      'Lock or unlock the glove box. true indicates the glove box is locked.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0BF1',
  }),

  // ---- VMS / LOCATION / ULTRASONICS --------------------------------------
  s({
    name: 'VEHICLE_MAP_SERVICE',
    description:
      'Vehicle Maps Service (VMS) message. MIXED data carrying VMS messages defined by the VMS protocol.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0C00',
  }),
  s({
    name: 'LOCATION_CHARACTERIZATION',
    description:
      "Bit flags from LocationCharacterization describing what data and sensor inputs are fused into the vehicle's GNSS location updates.",
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 2,
    baseId: '0x0C10',
  }),
  s({
    name: 'ULTRASONICS_SENSOR_POSITION',
    description:
      "Static position [x, y, z] in mm of each ultrasonic sensor relative to the Android Automotive sensor coordinate frame.",
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'VENDOR',
    dataType: 'INT32_VEC',
    version: 3,
    baseId: '0x0C20',
  }),
  s({
    name: 'ULTRASONICS_SENSOR_ORIENTATION',
    description:
      "Static orientation [qw, qx, qy, qz] of each ultrasonic sensor as a quaternion.",
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'VENDOR',
    dataType: 'FLOAT_VEC',
    version: 3,
    baseId: '0x0C21',
  }),
  s({
    name: 'ULTRASONICS_SENSOR_FIELD_OF_VIEW',
    description:
      'Static field of view [horizontal, vertical] in degrees for each ultrasonic sensor.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'VENDOR',
    dataType: 'INT32_VEC',
    version: 3,
    baseId: '0x0C22',
  }),
  s({
    name: 'ULTRASONICS_SENSOR_DETECTION_RANGE',
    description:
      'Static detection range [minimum, maximum] in millimeters for each ultrasonic sensor.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'VENDOR',
    dataType: 'INT32_VEC',
    version: 3,
    baseId: '0x0C23',
  }),
  s({
    name: 'ULTRASONICS_SENSOR_SUPPORTED_RANGES',
    description:
      'Supported ranges of each ultrasonic sensor in millimeters as pairs of [range_min_n, range_max_n].',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'VENDOR',
    dataType: 'INT32_VEC',
    version: 3,
    baseId: '0x0C24',
  }),
  s({
    name: 'ULTRASONICS_SENSOR_MEASURED_DISTANCE',
    description:
      'Measured distance to the nearest detected object per sensor in millimeters, with optional distance error.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'VENDOR',
    dataType: 'INT32_VEC',
    version: 3,
    baseId: '0x0C25',
  }),

  // ---- OBD2 ---------------------------------------------------------------
  s({
    name: 'OBD2_LIVE_FRAME',
    description:
      'Reports a snapshot of the current values of all available OBD2 sensors. Encoded as MIXED data.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0D00',
  }),
  s({
    name: 'OBD2_FREEZE_FRAME',
    description:
      'Snapshot of OBD2 sensors at the time of a fault, plus an optional diagnostic troubleshooting code.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0D01',
  }),
  s({
    name: 'OBD2_FREEZE_FRAME_INFO',
    description:
      'Lists the freeze frame timestamps currently stored in vehicle memory and available via OBD2_FREEZE_FRAME.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0D02',
  }),
  s({
    name: 'OBD2_FREEZE_FRAME_CLEAR',
    description:
      'Allows deletion of freeze frames. Empty int64Values clears all; otherwise clears the listed timestamps.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0D03',
  }),

  // ---- LIGHTS -------------------------------------------------------------
  s({
    name: 'HEADLIGHTS_STATE',
    description: 'Current state of the headlights.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightState'],
    version: 1,
    baseId: '0x0E00',
  }),
  s({
    name: 'HIGH_BEAM_LIGHTS_STATE',
    description: 'Current state of the high beam lights.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightState'],
    version: 1,
    baseId: '0x0E01',
  }),
  s({
    name: 'FOG_LIGHTS_STATE',
    description:
      'Current state of the fog lights. Use FRONT_FOG_LIGHTS_STATE / REAR_FOG_LIGHTS_STATE when fog lights are independently controlled.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightState'],
    version: 1,
    baseId: '0x0E02',
  }),
  s({
    name: 'HAZARD_LIGHTS_STATE',
    description: 'Current state of the hazard lights.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightState'],
    version: 1,
    baseId: '0x0E03',
  }),
  s({
    name: 'HEADLIGHTS_SWITCH',
    description: 'Headlight switch position requested by the user.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightSwitch'],
    version: 1,
    baseId: '0x0E10',
  }),
  s({
    name: 'HIGH_BEAM_LIGHTS_SWITCH',
    description: 'High beam light switch position requested by the user.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightSwitch'],
    version: 1,
    baseId: '0x0E11',
  }),
  s({
    name: 'FOG_LIGHTS_SWITCH',
    description:
      'Fog light switch position requested by the user. Use FRONT/REAR variants when applicable.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightSwitch'],
    version: 1,
    baseId: '0x0E12',
  }),
  s({
    name: 'HAZARD_LIGHTS_SWITCH',
    description: 'Hazard light switch position requested by the user.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightSwitch'],
    version: 1,
    baseId: '0x0E13',
  }),
  s({
    name: 'CABIN_LIGHTS_STATE',
    description: 'Current state of the cabin lights.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightState'],
    version: 1,
    baseId: '0x0F01',
  }),
  s({
    name: 'CABIN_LIGHTS_SWITCH',
    description:
      'Position of the physical switch controlling the cabin lights.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightSwitch'],
    version: 1,
    baseId: '0x0F02',
  }),
  s({
    name: 'READING_LIGHTS_STATE',
    description: 'Current state of the reading lights, per seat.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'SEAT',
    dataType: 'INT32',
    dataEnum: ['VehicleLightState'],
    version: 1,
    baseId: '0x0F03',
  }),
  s({
    name: 'READING_LIGHTS_SWITCH',
    description:
      'Position of the physical switch controlling the reading lights, per seat.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'SEAT',
    dataType: 'INT32',
    dataEnum: ['VehicleLightSwitch'],
    version: 1,
    baseId: '0x0F04',
  }),
  s({
    name: 'FRONT_FOG_LIGHTS_STATE',
    description:
      'Current state of the front fog lights. Use only when front and rear fog lights are independently controlled.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightState'],
    version: 1,
    baseId: '0x0F3B',
  }),
  s({
    name: 'FRONT_FOG_LIGHTS_SWITCH',
    description:
      'Front fog light switch. Use only when front and rear fog lights are independently controlled.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightSwitch'],
    version: 1,
    baseId: '0x0F3C',
  }),
  s({
    name: 'REAR_FOG_LIGHTS_STATE',
    description:
      'Current state of the rear fog lights. Use only when front and rear fog lights are independently controlled.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightState'],
    version: 1,
    baseId: '0x0F3D',
  }),
  s({
    name: 'REAR_FOG_LIGHTS_SWITCH',
    description:
      'Rear fog light switch. Use only when front and rear fog lights are independently controlled.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleLightSwitch'],
    version: 1,
    baseId: '0x0F3E',
  }),

  // ---- VENDOR / SUPPORT ---------------------------------------------------
  s({
    name: 'SUPPORT_CUSTOMIZE_VENDOR_PERMISSION',
    description:
      'Whether the VHAL supports customising permissions for vendor properties via the configArray.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 1,
    baseId: '0x0F05',
  }),
  s({
    name: 'DISABLED_OPTIONAL_FEATURES',
    description:
      'Comma-separated list of optional features that should be disabled in CarService.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'STRING',
    version: 1,
    baseId: '0x0F06',
  }),

  // ---- USER MANAGEMENT ----------------------------------------------------
  s({
    name: 'INITIAL_USER_INFO',
    description:
      'Defines the initial Android user to be used during initialization. Format defined by InitialUserInfoRequest/Response.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0F07',
  }),
  s({
    name: 'SWITCH_USER',
    description:
      'Defines a request to switch the foreground Android user. Supports several SwitchUserMessageType values.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0F08',
  }),
  s({
    name: 'CREATE_USER',
    description:
      'Notifies the HAL that an Android user was created so it can create its equivalent user. Async with HAL response.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0F09',
  }),
  s({
    name: 'REMOVE_USER',
    description:
      'Notifies the HAL that an Android user was removed so it can remove its equivalent user. Write-only.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0F0A',
  }),
  s({
    name: 'USER_IDENTIFICATION_ASSOCIATION',
    description:
      'Associate (or query) the current user with vehicle-specific identification mechanisms such as a key fob.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0F0B',
  }),

  // ---- EVS / POWER POLICY / WATCHDOG / CLUSTER / ETC ---------------------
  s({
    name: 'EVS_SERVICE_REQUEST',
    description:
      'Request to enable/disable an EVS service. int32[0]=EvsServiceType, int32[1]=EvsServiceState.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    version: 1,
    baseId: '0x0F10',
  }),
  s({
    name: 'POWER_POLICY_REQ',
    description:
      'Request to apply a car power policy by ID. The car power policy service applies the matching policy.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'STRING',
    version: 1,
    baseId: '0x0F21',
  }),
  s({
    name: 'POWER_POLICY_GROUP_REQ',
    description:
      'Request to set the power policy group used to choose a default power policy per power-status transition.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'STRING',
    version: 1,
    baseId: '0x0F22',
  }),
  s({
    name: 'CURRENT_POWER_POLICY',
    description:
      'Notifies the VHAL of the currently applied car power policy by ID.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE'],
    area: 'GLOBAL',
    dataType: 'STRING',
    version: 1,
    baseId: '0x0F23',
  }),
  s({
    name: 'WATCHDOG_ALIVE',
    description:
      'Heartbeat from car watchdog. Set to system uptime in milliseconds about every 3 seconds.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'INT64',
    version: 1,
    baseId: '0x0F31',
  }),
  s({
    name: 'WATCHDOG_TERMINATED_PROCESS',
    description:
      'Records a process terminated by car watchdog and the reason for termination.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0F32',
  }),
  s({
    name: 'VHAL_HEARTBEAT',
    description:
      'Heartbeat from the VHAL itself. Should be updated every 3 seconds; otherwise watchdog considers the VHAL unhealthy.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT64',
    version: 1,
    baseId: '0x0F33',
  }),
  s({
    name: 'CLUSTER_SWITCH_UI',
    description:
      'Asks the cluster display to show a specific ClusterUI. 0 indicates ClusterHome; other values are OEM-defined.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0F34',
  }),
  s({
    name: 'CLUSTER_DISPLAY_STATE',
    description:
      'Changes the state of the cluster display. Carries on/off, bounds and inset values.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    version: 1,
    baseId: '0x0F35',
  }),
  s({
    name: 'CLUSTER_REPORT_STATE',
    description:
      'Reports the current cluster display state and ClusterUI state from ClusterHome to ClusterOS.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 1,
    baseId: '0x0F36',
  }),
  s({
    name: 'CLUSTER_REQUEST_DISPLAY',
    description:
      'Request to power on the cluster display to show a specific ClusterUI when it is currently off.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0F37',
  }),
  s({
    name: 'CLUSTER_NAVIGATION_STATE',
    description:
      'Current navigation state from the cluster as a serialised NavigationStateProto message.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'BYTES',
    version: 1,
    baseId: '0x0F38',
  }),
  s({
    name: 'CLUSTER_HEARTBEAT',
    description:
      'Heartbeat from ClusterHome to ClusterOS. Carries epoch time, ClusterUI visibility and optional metadata.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'MIXED',
    version: 3,
    baseId: '0x0F4B',
  }),

  // ---- ELECTRONIC TOLL COLLECTION ----------------------------------------
  s({
    name: 'ELECTRONIC_TOLL_COLLECTION_CARD_TYPE',
    description:
      'Type of ETC card attached to the vehicle, or UNAVAILABLE when no card is detected.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['ElectronicTollCollectionCardType'],
    version: 1,
    baseId: '0x0F39',
  }),
  s({
    name: 'ELECTRONIC_TOLL_COLLECTION_CARD_STATUS',
    description:
      'Status of the ETC card in the vehicle, or UNAVAILABLE when no card is detected.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['ElectronicTollCollectionCardStatus'],
    version: 1,
    baseId: '0x0F3A',
  }),

  // ---- TRAILER / VEHICLE STATIC METADATA ---------------------------------
  s({
    name: 'TRAILER_PRESENT',
    description:
      'Indicates whether a trailer is currently present and connected to the vehicle.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['TrailerState'],
    version: 1,
    baseId: '0x0F45',
  }),
  s({
    name: 'VEHICLE_CURB_WEIGHT',
    description:
      "Vehicle's curb weight in kilograms. configArray[0] specifies the gross weight in kilograms.",
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    version: 1,
    baseId: '0x0F46',
  }),
  s({
    name: 'GENERAL_SAFETY_REGULATION_COMPLIANCE_REQUIREMENT',
    description:
      "EU General Safety Regulation compliance requirement. Returns whether compliance is required and what type.",
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['GsrComplianceRequirementType'],
    version: 2,
    baseId: '0x0F47',
  }),
  s({
    name: 'SUPPORTED_PROPERTY_IDS',
    description:
      '(Deprecated for AIDL) List of all supported property IDs. Required for HIDL VHAL with payloads exceeding the binder limit.',
    changeMode: 'STATIC',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    version: 2,
    baseId: '0x0F48',
  }),
  s({
    name: 'SHUTDOWN_REQUEST',
    description:
      'Request the head unit to be shutdown (for remote-task scenarios). Carries a VehicleApPowerStateShutdownParam value.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleApPowerStateShutdownParam'],
    version: 2,
    baseId: '0x0F49',
  }),
  s({
    name: 'VEHICLE_IN_USE',
    description:
      'Whether the vehicle is currently in use by a human user. Differs from AP_POWER_BOOTUP_REASON: may change multiple times per boot cycle.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x0F4A',
  }),
  s({
    name: 'VEHICLE_DRIVING_AUTOMATION_CURRENT_LEVEL',
    description:
      'Current SAE J3016_202104 vehicle automation level (0-5). 0 means no automation, 5 means full driving automation.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleAutonomousState'],
    version: 3,
    baseId: '0x0F4C',
  }),
  s({
    name: 'VEHICLE_DRIVING_AUTOMATION_TARGET_LEVEL',
    description:
      'Target SAE J3016_202104 vehicle automation level (0-5). Equal to the current level once the target has been reached.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['VehicleAutonomousState'],
    version: 4,
    baseId: '0x0F4F',
  }),
  s({
    name: 'CAMERA_SERVICE_CURRENT_STATE',
    description:
      'Reports the current state of each CarEvsService type (rearview, surroundview, frontview, etc.).',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'INT32_VEC',
    dataEnum: ['CameraServiceState'],
    version: 3,
    baseId: '0x0F4D',
  }),

  // ---- ADAS ---------------------------------------------------------------
  s({
    name: 'AUTOMATIC_EMERGENCY_BRAKING_ENABLED',
    description:
      'Enable or disable Automatic Emergency Braking (AEB) for higher-speed applications.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x1000',
  }),
  s({
    name: 'AUTOMATIC_EMERGENCY_BRAKING_STATE',
    description:
      'Current state of Automatic Emergency Braking (AEB). Errors are surfaced via supported ErrorState values.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['AutomaticEmergencyBrakingState', 'ErrorState'],
    version: 2,
    baseId: '0x1001',
  }),
  s({
    name: 'FORWARD_COLLISION_WARNING_ENABLED',
    description: 'Enable or disable Forward Collision Warning (FCW).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x1002',
  }),
  s({
    name: 'FORWARD_COLLISION_WARNING_STATE',
    description:
      'Current state of Forward Collision Warning (FCW). Errors are surfaced via supported ErrorState values.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['ForwardCollisionWarningState', 'ErrorState'],
    version: 2,
    baseId: '0x1003',
  }),
  s({
    name: 'BLIND_SPOT_WARNING_ENABLED',
    description: 'Enable or disable Blind Spot Warning (BSW).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x1004',
  }),
  s({
    name: 'BLIND_SPOT_WARNING_STATE',
    description:
      'Current state of Blind Spot Warning (BSW), per mirror area. Errors are surfaced via supported ErrorState values.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'MIRROR',
    dataType: 'INT32',
    dataEnum: ['BlindSpotWarningState', 'ErrorState'],
    version: 2,
    baseId: '0x1005',
  }),
  s({
    name: 'LANE_DEPARTURE_WARNING_ENABLED',
    description: 'Enable or disable Lane Departure Warning (LDW).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x1006',
  }),
  s({
    name: 'LANE_DEPARTURE_WARNING_STATE',
    description:
      'Current state of Lane Departure Warning (LDW). Errors are surfaced via supported ErrorState values.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['LaneDepartureWarningState', 'ErrorState'],
    version: 2,
    baseId: '0x1007',
  }),
  s({
    name: 'LANE_KEEP_ASSIST_ENABLED',
    description:
      'Enable or disable Lane Keep Assist (LKA). Different from Lane Centering Assist (LCA).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x1008',
  }),
  s({
    name: 'LANE_KEEP_ASSIST_STATE',
    description:
      'Current state of Lane Keep Assist (LKA). Errors are surfaced via supported ErrorState values.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['LaneKeepAssistState', 'ErrorState'],
    version: 2,
    baseId: '0x1009',
  }),
  s({
    name: 'LANE_CENTERING_ASSIST_ENABLED',
    description:
      'Enable or disable Lane Centering Assist (LCA). Different from Lane Keep Assist (LKA).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x100A',
  }),
  s({
    name: 'LANE_CENTERING_ASSIST_COMMAND',
    description:
      'Lane Centering Assist (LCA) commands. ACTIVATE moves the state machine through ACTIVATION_REQUESTED to ACTIVATED.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['LaneCenteringAssistCommand'],
    version: 2,
    baseId: '0x100B',
  }),
  s({
    name: 'LANE_CENTERING_ASSIST_STATE',
    description:
      'Current state of Lane Centering Assist (LCA). Errors are surfaced via supported ErrorState values.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['LaneCenteringAssistState', 'ErrorState'],
    version: 2,
    baseId: '0x100C',
  }),
  s({
    name: 'EMERGENCY_LANE_KEEP_ASSIST_ENABLED',
    description: 'Enable or disable Emergency Lane Keep Assist (ELKA).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x100D',
  }),
  s({
    name: 'EMERGENCY_LANE_KEEP_ASSIST_STATE',
    description:
      'Current state of Emergency Lane Keep Assist (ELKA). Errors are surfaced via supported ErrorState values.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['EmergencyLaneKeepAssistState', 'ErrorState'],
    version: 2,
    baseId: '0x100E',
  }),
  s({
    name: 'CRUISE_CONTROL_ENABLED',
    description:
      'Enable or disable cruise control (shared by all CruiseControlType variants).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x100F',
  }),
  s({
    name: 'CRUISE_CONTROL_TYPE',
    description:
      'Current type of cruise control (e.g. standard, adaptive, predictive).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['CruiseControlType', 'ErrorState'],
    version: 2,
    baseId: '0x1010',
  }),
  s({
    name: 'CRUISE_CONTROL_STATE',
    description: 'Current state of cruise control.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['CruiseControlState', 'ErrorState'],
    version: 2,
    baseId: '0x1011',
  }),
  s({
    name: 'CRUISE_CONTROL_COMMAND',
    description:
      'Cruise control commands (e.g. activate, suspend). Errors are surfaced via supported ErrorState values.',
    changeMode: 'ON_CHANGE',
    access: ['WRITE'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['CruiseControlCommand'],
    version: 2,
    baseId: '0x1012',
  }),
  s({
    name: 'CRUISE_CONTROL_TARGET_SPEED',
    description: 'Current target speed for cruise control.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'FLOAT',
    unit: 'VehicleUnit.METER_PER_SEC',
    version: 2,
    baseId: '0x1013',
  }),
  s({
    name: 'ADAPTIVE_CRUISE_CONTROL_TARGET_TIME_GAP',
    description:
      'Current target time gap for Adaptive or Predictive Cruise Control in milliseconds.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    unit: 'VehicleUnit.MILLI_SECS',
    version: 2,
    baseId: '0x1014',
  }),
  s({
    name: 'ADAPTIVE_CRUISE_CONTROL_LEAD_VEHICLE_MEASURED_DISTANCE',
    description:
      'Measured distance from a leading vehicle when ACC/Predictive Cruise Control is engaged, in millimeters.',
    changeMode: 'CONTINUOUS',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    unit: 'VehicleUnit.MILLIMETER',
    version: 2,
    baseId: '0x1015',
  }),
  s({
    name: 'HANDS_ON_DETECTION_ENABLED',
    description: 'Enable or disable Hands On Detection (HOD).',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 2,
    baseId: '0x1016',
  }),
  s({
    name: 'HANDS_ON_DETECTION_DRIVER_STATE',
    description:
      "Whether the driver's hands are on the steering wheel. Errors are surfaced via supported ErrorState values.",
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['HandsOnDetectionDriverState', 'ErrorState'],
    version: 2,
    baseId: '0x1017',
  }),
  s({
    name: 'HANDS_ON_DETECTION_WARNING',
    description:
      'Whether a Hands On Detection warning is being sent to the driver.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['HandsOnDetectionWarning', 'ErrorState'],
    version: 2,
    baseId: '0x1018',
  }),
  s({
    name: 'DRIVER_DROWSINESS_ATTENTION_SYSTEM_ENABLED',
    description:
      'Enable or disable driver drowsiness and attention monitoring.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x1019',
  }),
  s({
    name: 'DRIVER_DROWSINESS_ATTENTION_STATE',
    description:
      'Driver drowsiness and attention level state, mapped to the Karolinska Sleepiness Scale.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['DriverDrowsinessAttentionState', 'ErrorState'],
    version: 3,
    baseId: '0x101A',
  }),
  s({
    name: 'DRIVER_DROWSINESS_ATTENTION_WARNING_ENABLED',
    description:
      'Enable or disable driver drowsiness and attention warnings.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x101B',
  }),
  s({
    name: 'DRIVER_DROWSINESS_ATTENTION_WARNING',
    description:
      'Whether a driver drowsiness/attention warning is being sent to the driver.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['DriverDrowsinessAttentionWarning', 'ErrorState'],
    version: 3,
    baseId: '0x101C',
  }),
  s({
    name: 'DRIVER_DISTRACTION_SYSTEM_ENABLED',
    description: 'Enable or disable driver distraction monitoring.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x101D',
  }),
  s({
    name: 'DRIVER_DISTRACTION_STATE',
    description: 'Current detected driver distraction state.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['DriverDistractionState', 'ErrorState'],
    version: 3,
    baseId: '0x101E',
  }),
  s({
    name: 'DRIVER_DISTRACTION_WARNING_ENABLED',
    description: 'Enable or disable driver distraction warnings.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x101F',
  }),
  s({
    name: 'DRIVER_DISTRACTION_WARNING',
    description:
      'Whether a driver distraction warning is being sent to the driver.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['DriverDistractionWarning', 'ErrorState'],
    version: 3,
    baseId: '0x1020',
  }),
  s({
    name: 'LOW_SPEED_COLLISION_WARNING_ENABLED',
    description:
      'Enable or disable Low Speed Collision Warning. Different from FORWARD_COLLISION_WARNING_ENABLED which is for higher speeds.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x1021',
  }),
  s({
    name: 'LOW_SPEED_COLLISION_WARNING_STATE',
    description: 'Current state of Low Speed Collision Warning.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['LowSpeedCollisionWarningState', 'ErrorState'],
    version: 3,
    baseId: '0x1022',
  }),
  s({
    name: 'CROSS_TRAFFIC_MONITORING_ENABLED',
    description: 'Enable or disable Cross Traffic Monitoring.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x1023',
  }),
  s({
    name: 'CROSS_TRAFFIC_MONITORING_WARNING_STATE',
    description: 'Current Cross Traffic Monitoring warning state.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['CrossTrafficMonitoringWarningState', 'ErrorState'],
    version: 3,
    baseId: '0x1024',
  }),
  s({
    name: 'LOW_SPEED_AUTOMATIC_EMERGENCY_BRAKING_ENABLED',
    description:
      'Enable or disable Low Speed Automatic Emergency Braking. Different from AUTOMATIC_EMERGENCY_BRAKING_ENABLED which is for higher speeds.',
    changeMode: 'ON_CHANGE',
    access: ['READ_WRITE', 'READ'],
    area: 'GLOBAL',
    dataType: 'BOOLEAN',
    version: 3,
    baseId: '0x1025',
  }),
  s({
    name: 'LOW_SPEED_AUTOMATIC_EMERGENCY_BRAKING_STATE',
    description: 'Current state of Low Speed Automatic Emergency Braking.',
    changeMode: 'ON_CHANGE',
    access: ['READ'],
    area: 'GLOBAL',
    dataType: 'INT32',
    dataEnum: ['LowSpeedAutomaticEmergencyBrakingState', 'ErrorState'],
    version: 3,
    baseId: '0x1026',
  }),
]

/** Convenience helper that returns the AAOS signals grouped by first level token. */
export const getAaosGroupedSignals = (): Record<string, AaosSignal[]> =>
  groupAaosSignals(AAOS_SIGNALS)
