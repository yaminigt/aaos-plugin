/**
 * AAOS ↔ SOME/IP Signal Mapping
 *
 * Maps AAOS signal names to their corresponding SOME/IP service, instance, and field IDs.
 * `modes` controls which GET/SET buttons are enabled — driven by the AAOS signal access level.
 *   READ-only   → modes: ['get']
 *   WRITE-only  → modes: ['set']
 *   READ_WRITE  → modes: ['get', 'set']
 */

export type SomeipMode = 'get' | 'set'

export type SomeipMatch = {
  serviceId: string
  instanceId: string
  fieldIds?: {
    get?: string
    set?: string
  }
  modes: SomeipMode[]
}

/**
 * Mapping data: AAOS signal name → SOME/IP configuration
 */
const MAPPINGS: Record<string, SomeipMatch> = {
  // READ-only → GET only
  TIRE_PRESSURE: {
    serviceId: '0x4100',
    instanceId: '0x1000',
    fieldIds: {
      get: '0x8410',
      set: '0x8411',
    },
    modes: ['get'],
  },
  // READ-only → GET only
  CURRENT_GEAR: {
    serviceId: '0x2100',
    instanceId: '0x8210',
    modes: ['get'],
  },
  // READ-only → GET only
  PERF_VEHICLE_SPEED: {
    serviceId: '0x2100',
    instanceId: '0x8211',
    modes: ['get'],
  },
  // Add more AAOS signals here as SOME/IP configs become available
}

/**
 * Look up SOME/IP configuration for an AAOS signal.
 *
 * @param aaosSignalName - The AAOS signal name (e.g., 'TIRE_PRESSURE')
 * @returns SOME/IP match data if found, null otherwise
 */
export function getSomeipMatchForAaos(
  aaosSignalName: string,
): SomeipMatch | null {
  return MAPPINGS[aaosSignalName] || null
}

/**
 * Check if an AAOS signal has a SOME/IP mapping.
 */
export function hasAaosSomeipMatch(aaosSignalName: string): boolean {
  return aaosSignalName in MAPPINGS
}
