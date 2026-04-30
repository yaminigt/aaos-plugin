import {
  AaosSignal,
  groupAaosSignals,
  groupAaosSignalsByArea,
} from '../data/aaos'
import { ChevronDown, ChevronRight, SearchIcon } from './icons'

const React: any = (globalThis as any).React
const { useEffect, useMemo, useState } = React

const cx = (...c: Array<string | false | null | undefined>) =>
  c.filter(Boolean).join(' ')

export type GroupingMode = 'area' | 'name'

type Props = {
  signals: AaosSignal[]
  groupingMode: GroupingMode
  selectedSignal: AaosSignal | null
  onSelectSignal: (signal: AaosSignal) => void
}

const AaosGroupList = ({
  signals,
  groupingMode,
  selectedSignal,
  onSelectSignal,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(
    {},
  )

  const grouped = useMemo(
    () =>
      groupingMode === 'area'
        ? groupAaosSignalsByArea(signals)
        : groupAaosSignals(signals),
    [signals, groupingMode],
  )

  const groupNames = useMemo(
    () => Object.keys(grouped).sort((a, b) => a.localeCompare(b)),
    [grouped],
  )

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase()
    if (!term) return grouped
    const result: Record<string, AaosSignal[]> = {}
    for (const group of groupNames) {
      if (group.toLowerCase().includes(term)) {
        result[group] = grouped[group]
        continue
      }
      const matches = grouped[group].filter((s: AaosSignal) =>
        s.name.toLowerCase().includes(term),
      )
      if (matches.length > 0) result[group] = matches
    }
    return result
  }, [grouped, groupNames, searchTerm])

  const filteredGroupNames = useMemo(
    () => Object.keys(filtered).sort((a: string, b: string) => a.localeCompare(b)),
    [filtered],
  )

  // Reset expansion when grouping mode changes (group keys differ).
  useEffect(() => {
    setExpandedGroups({})
  }, [groupingMode])

  // Auto expand groups that contain a search match.
  useEffect(() => {
    if (!searchTerm.trim()) return
    const next: Record<string, boolean> = {}
    for (const group of filteredGroupNames) next[group] = true
    setExpandedGroups((prev: Record<string, boolean>) => ({ ...prev, ...next }))
  }, [searchTerm, filteredGroupNames])

  // Make sure the selected signal's group is expanded.
  useEffect(() => {
    if (!selectedSignal) return
    const key =
      groupingMode === 'area' ? selectedSignal.area : selectedSignal.group
    setExpandedGroups((prev: Record<string, boolean>) =>
      prev[key] ? prev : { ...prev, [key]: true },
    )
  }, [selectedSignal, groupingMode])

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev: Record<string, boolean>) => ({
      ...prev,
      [group]: !prev[group],
    }))
  }

  return (
    <div className="aaos-left">
      <div className="aaos-search-wrap">
        <span className="aaos-search-icon">
          <SearchIcon />
        </span>
        <input
          className="aaos-input"
          placeholder={
            groupingMode === 'area'
              ? 'Search AAOS signal or vehicle area'
              : 'Search AAOS signal or group'
          }
          value={searchTerm}
          onChange={(e: any) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="aaos-list">
        {filteredGroupNames.length === 0 ? (
          <div className="aaos-empty">No AAOS signal found</div>
        ) : (
          filteredGroupNames.map((group: string) => {
            const isExpanded = !!expandedGroups[group]
            const list = filtered[group]
            return (
              <div className="aaos-group" key={group}>
                <button
                  type="button"
                  className={cx('aaos-group-btn', isExpanded && 'is-open')}
                  onClick={() => toggleGroup(group)}
                >
                  <span className="aaos-group-left">
                    <span className="aaos-group-chevron">
                      {isExpanded ? <ChevronDown /> : <ChevronRight />}
                    </span>
                    <span>{group}</span>
                  </span>
                  <span className="aaos-badge">{list.length}</span>
                </button>
                {isExpanded && (
                  <div className="aaos-signals">
                    {list.map((signal: AaosSignal) => {
                      const isSelected =
                        selectedSignal?.name === signal.name
                      return (
                        <button
                          key={signal.name}
                          type="button"
                          className={cx(
                            'aaos-signal-btn',
                            isSelected && 'is-selected',
                          )}
                          onClick={() => onSelectSignal(signal)}
                        >
                          <span className="aaos-signal-name">{signal.name}</span>
                          <span className="aaos-signal-tag">
                            {groupingMode === 'area' ? signal.group : signal.area}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default AaosGroupList
