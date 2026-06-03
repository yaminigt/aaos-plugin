/**
 * AAOS ↔ SOME/IP Signal Mapping
 *
 * Maps AAOS signal names to their corresponding SOME/IP service, instance, and field IDs.
 * Currently sparse: only signals with available SOME/IP configuration are included.
 *
 * Structure:
 *   TIRE_PRESSURE → { serviceId, instanceId, fieldIds: { get, set } }
 */

export type SomeipMatch = {
  serviceId: string
  instanceId: string
  fieldIds: {
    get: string
    set: string
  }
}

/**
 * Mapping data: AAOS signal name → SOME/IP configuration
 * Format: Raw lookup object for quick access
 */
const MAPPINGS: Record<string, SomeipMatch> = {
  TIRE_PRESSURE: {
    serviceId: '0x4100',
    instanceId: '0x1000',
    fieldIds: {
      get: '0x8410',
      set: '0x8411',
    },
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
