export type CovesaMatches = {
  exact: string[]
  partial: string[]
}

// Source: AAOS VHAL signals compared to COVESA (user-provided mapping).
// We keep the raw table text and parse it at runtime to avoid error-prone
// manual quoting of hundreds of strings and to make future updates easy.
const RAW = `
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
`.trim()

const isEmptyCell = (value: string) => {
  const v = value.trim()
  return v === '' || v === '—' || v === '-' || v.toLowerCase() === 'n/a'
}

const splitMatches = (cell: string): string[] => {
  if (isEmptyCell(cell)) return []
  // Split by comma always. Also split by " / " only when the cell looks like it
  // contains multiple VSS paths (e.g. "Left.IsOn / Right.IsOn").
  const parts = cell
    .split(',')
    .map((p) => p.trim())
    .flatMap((p) => {
      if (p.includes(' / ') && p.includes('Vehicle.')) {
        return p.split(' / ').map((x) => x.trim())
      }
      return [p]
    })
    .map((p) => p.trim())
    .filter((p) => p.length > 0 && p !== '—' && p !== '-')
  // De-dupe while preserving order
  const seen = new Set<string>()
  const out: string[] = []
  for (const p of parts) {
    if (seen.has(p)) continue
    seen.add(p)
    out.push(p)
  }
  return out
}

const parse = (): Record<string, CovesaMatches> => {
  const out: Record<string, CovesaMatches> = {}
  for (const line of RAW.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue
    const cols = trimmed.split('|').map((c) => c.trim())
    const aaos = cols[0]
    const exact = splitMatches(cols[1] || '')
    const partial = splitMatches(cols[2] || '')
    if (!aaos) continue
    out[aaos] = { exact, partial }
  }
  return out
}

let CACHE: Record<string, CovesaMatches> | null = null

export const getCovesaMatchesForAaos = (aaosSignalName: string): CovesaMatches => {
  if (!CACHE) CACHE = parse()
  return CACHE[aaosSignalName] || { exact: [], partial: [] }
}

