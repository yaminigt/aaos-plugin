export type SomeipMode = 'get' | 'set'

export interface SomeipSignalPlaceholder {
  signal: string
  serviceId: string
  instanceId: string
  fieldIds: Record<SomeipMode, string>
}

// Tire-pressure VSOMEIP sample taken from vsomeip/vsomeip/tire_pressure_sample.json.
// The UI only renders this section for the AAOS TIRE_PRESSURE signal.
export const TIRE_PRESSURE_SOMEIP_SIGNALS: SomeipSignalPlaceholder[] = [
  {
    signal: 'Vehicle.Chassis.Axle.Wheel.Tire.Pressure',
    serviceId: '0x4100',
    instanceId: '0x1000',
    fieldIds: {
      get: '0x8410',
      set: '0x8411',
    },
  },
]
