/**
 * AAOS ↔ SOME/IP Signal Mapping
 *
 * Maps AAOS signal names to their corresponding SOME/IP routing metadata.
 * `modes` controls which GET/SET buttons are enabled — driven by the AAOS
 * signal access level plus what the SOME/IP config actually exposes.
 */

export type SomeipMode = 'get' | 'set'

export type SomeipOperationKind = 'event' | 'field' | 'method'

export type SomeipOperation = {
  id: string
  kind: SomeipOperationKind
  eventGroupId?: string
  transport?: 'reliable' | 'unreliable'
  port?: string
  updateCycleMs?: number
}

export type SomeipMatch = {
  serviceId: string
  instanceId: string
  operations?: Partial<Record<SomeipMode, SomeipOperation>>
  modes: SomeipMode[]
  notes?: string
}

export type SomeipLookupResult = {
  aaosSignalName: string
  mode: SomeipMode
  match: SomeipMatch
}

export type AaosToSomeipEnvelope = {
  aaosSignalName: string
  mode: SomeipMode
  value?: string | number | boolean | null
  someip: {
    serviceId: string
    instanceId: string
    operationId: string
    operationKind: SomeipOperationKind
    eventGroupId?: string
    transport?: 'reliable' | 'unreliable'
    port?: string
    updateCycleMs?: number
  }
}

/**
 * Mapping data: AAOS signal name → SOME/IP configuration
 */
const MAPPINGS: Record<string, SomeipMatch> = {
  // READ-only → GET only
  TIRE_PRESSURE: {
    serviceId: '0x4100',
    instanceId: '0x1000',
    operations: {
      get: {
        id: '0x8410',
        kind: 'event',
        eventGroupId: '0x9410',
        transport: 'reliable',
        port: '4100',
        updateCycleMs: 3000,
      },
    },
    modes: ['get'],
    notes:
      'Derived from vsomeip/vsomeip/tire_pressure_sample.json. This config exposes publish/subscribe events, not a writable SOME/IP method for SET.',
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

export function buildSomeipEnvelopeForAaos(
  aaosSignalName: string,
  mode: SomeipMode,
  value?: string | number | boolean | null,
): AaosToSomeipEnvelope | null {
  const match = getSomeipMatchForAaos(aaosSignalName)
  const operation = match?.operations?.[mode]
  if (!match || !operation || !match.modes.includes(mode)) {
    return null
  }

  return {
    aaosSignalName,
    mode,
    value,
    someip: {
      serviceId: match.serviceId,
      instanceId: match.instanceId,
      operationId: operation.id,
      operationKind: operation.kind,
      eventGroupId: operation.eventGroupId,
      transport: operation.transport,
      port: operation.port,
      updateCycleMs: operation.updateCycleMs,
    },
  }
}

export function findAaosSignalForSomeip(
  serviceId: string,
  instanceId: string,
  operationId?: string,
): SomeipLookupResult | null {
  for (const [aaosSignalName, match] of Object.entries(MAPPINGS)) {
    if (match.serviceId !== serviceId || match.instanceId !== instanceId) {
      continue
    }

    if (!operationId) {
      const firstMode = match.modes[0]
      return { aaosSignalName, mode: firstMode, match }
    }

    for (const mode of match.modes) {
      const operation = match.operations?.[mode]
      if (operation?.id === operationId) {
        return { aaosSignalName, mode, match }
      }
    }
  }

  return null
}

/**
 * Check if an AAOS signal has a SOME/IP mapping.
 */
export function hasAaosSomeipMatch(aaosSignalName: string): boolean {
  return aaosSignalName in MAPPINGS
}
