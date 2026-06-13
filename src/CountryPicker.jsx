import { useState, useRef } from 'react'
import './CountryPicker.css'

const TEAMS = [
  // UEFA (16)
  { name: 'Germany',      flag: '🇩🇪', conf: 'UEFA' },
  { name: 'France',       flag: '🇫🇷', conf: 'UEFA' },
  { name: 'Spain',        flag: '🇪🇸', conf: 'UEFA' },
  { name: 'England',      flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', conf: 'UEFA' },
  { name: 'Portugal',     flag: '🇵🇹', conf: 'UEFA' },
  { name: 'Netherlands',  flag: '🇳🇱', conf: 'UEFA' },
  { name: 'Italy',        flag: '🇮🇹', conf: 'UEFA' },
  { name: 'Belgium',      flag: '🇧🇪', conf: 'UEFA' },
  { name: 'Croatia',      flag: '🇭🇷', conf: 'UEFA' },
  { name: 'Switzerland',  flag: '🇨🇭', conf: 'UEFA' },
  { name: 'Austria',      flag: '🇦🇹', conf: 'UEFA' },
  { name: 'Denmark',      flag: '🇩🇰', conf: 'UEFA' },
  { name: 'Türkiye',      flag: '🇹🇷', conf: 'UEFA' },
  { name: 'Poland',       flag: '🇵🇱', conf: 'UEFA' },
  { name: 'Scotland',     flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', conf: 'UEFA' },
  { name: 'Serbia',       flag: '🇷🇸', conf: 'UEFA' },
  // CONMEBOL (6)
  { name: 'Argentina',    flag: '🇦🇷', conf: 'CONMEBOL' },
  { name: 'Brazil',       flag: '🇧🇷', conf: 'CONMEBOL' },
  { name: 'Uruguay',      flag: '🇺🇾', conf: 'CONMEBOL' },
  { name: 'Colombia',     flag: '🇨🇴', conf: 'CONMEBOL' },
  { name: 'Ecuador',      flag: '🇪🇨', conf: 'CONMEBOL' },
  { name: 'Venezuela',    flag: '🇻🇪', conf: 'CONMEBOL' },
  // CONCACAF (6)
  { name: 'USA',          flag: '🇺🇸', conf: 'CONCACAF' },
  { name: 'Mexico',       flag: '🇲🇽', conf: 'CONCACAF' },
  { name: 'Canada',       flag: '🇨🇦', conf: 'CONCACAF' },
  { name: 'Panama',       flag: '🇵🇦', conf: 'CONCACAF' },
  { name: 'Costa Rica',   flag: '🇨🇷', conf: 'CONCACAF' },
  { name: 'Honduras',     flag: '🇭🇳', conf: 'CONCACAF' },
  // AFC (8)
  { name: 'Japan',        flag: '🇯🇵', conf: 'AFC' },
  { name: 'South Korea',  flag: '🇰🇷', conf: 'AFC' },
  { name: 'Australia',    flag: '🇦🇺', conf: 'AFC' },
  { name: 'Saudi Arabia', flag: '🇸🇦', conf: 'AFC' },
  { name: 'Iran',         flag: '🇮🇷', conf: 'AFC' },
  { name: 'Qatar',        flag: '🇶🇦', conf: 'AFC' },
  { name: 'Iraq',         flag: '🇮🇶', conf: 'AFC' },
  { name: 'Jordan',       flag: '🇯🇴', conf: 'AFC' },
  // CAF (9)
  { name: 'Morocco',      flag: '🇲🇦', conf: 'CAF' },
  { name: 'Senegal',      flag: '🇸🇳', conf: 'CAF' },
  { name: 'Nigeria',      flag: '🇳🇬', conf: 'CAF' },
  { name: 'Egypt',        flag: '🇪🇬', conf: 'CAF' },
  { name: 'Cameroon',     flag: '🇨🇲', conf: 'CAF' },
  { name: 'Ghana',        flag: '🇬🇭', conf: 'CAF' },
  { name: 'South Africa', flag: '🇿🇦', conf: 'CAF' },
  { name: 'Ivory Coast',  flag: '🇨🇮', conf: 'CAF' },
  { name: 'Tunisia',      flag: '🇹🇳', conf: 'CAF' },
  // OFC (1)
  { name: 'New Zealand',  flag: '🇳🇿', conf: 'OFC' },
  // Intercontinental playoff (2)
  { name: 'Paraguay',     flag: '🇵🇾', conf: 'CONMEBOL' },
  { name: 'Indonesia',    flag: '🇮🇩', conf: 'AFC' },
]

export function CountryPicker({ playerCount, onComplete }) {
  const [selected, setSelected] = useState([])
  const [flyingFlags, setFlyingFlags] = useState([])
  const slotsRef = useRef([])
  const flyCounter = useRef(0)
  const pendingRef = useRef(new Set())

  const isSelected = (team) => selected.some(t => t.name === team.name)
  const remaining = playerCount - selected.length

  function handleDeselect(team) {
    setSelected(prev => prev.filter(t => t.name !== team.name))
  }

  function handleSelect(team, e) {
    if (isSelected(team) || remaining === 0 || pendingRef.current.has(team.name)) return
    pendingRef.current.add(team.name)

    const cardRect = e.currentTarget.getBoundingClientRect()
    const slotEl = slotsRef.current[selected.length]
    let endX = cardRect.left + cardRect.width / 2
    let endY = cardRect.top + cardRect.height / 2
    if (slotEl) {
      const sr = slotEl.getBoundingClientRect()
      endX = sr.left + sr.width / 2
      endY = sr.top + sr.height / 2
    }

    const startX = cardRect.left + cardRect.width / 2
    const startY = cardRect.top + cardRect.height / 2
    const flyId = (flyCounter.current += 1)

    setFlyingFlags(prev => [...prev, {
      id: flyId,
      flag: team.flag,
      x: startX,
      y: startY,
      dx: endX - startX,
      dy: endY - startY,
    }])

    setTimeout(() => {
      setSelected(prev => {
        if (prev.some(t => t.name === team.name) || prev.length >= playerCount) return prev
        const next = [...prev, team]
        if (next.length >= playerCount) {
          setTimeout(() => onComplete(next), 800)
        }
        return next
      })
      setFlyingFlags(prev => prev.filter(f => f.id !== flyId))
      pendingRef.current.delete(team.name)
    }, 520)
  }

  return (
    <div className="picker-page">
      <div className="picker-glow" />

      {/* ── Left panel: header + selection slots ── */}
      <div className="picker-left">
        <div className="picker-header">
          <div className="picker-badge">⚽ English World Cup 2026</div>
          <h2 className="picker-title">Choose Your Country</h2>
          <p className="picker-status">
            {remaining > 0
              ? `${remaining} more ${remaining === 1 ? 'country' : 'countries'} to select`
              : '✓ All selected!'}
          </p>
        </div>

        <div className="selected-panel">
          <span className="panel-label">Your Selection</span>
          <div className="panel-slots">
            {Array.from({ length: playerCount }, (_, i) => (
              <div
                key={i}
                className={`selected-slot${selected[i] ? ' slot-filled' : ''}`}
                ref={el => (slotsRef.current[i] = el)}
                onClick={() => selected[i] && handleDeselect(selected[i])}
              >
                {selected[i] ? (
                  <>
                    <span className="slot-flag">{selected[i].flag}</span>
                    <span className="slot-name">{selected[i].name}</span>
                    <span className="slot-remove">✕</span>
                  </>
                ) : (
                  <span className="slot-placeholder">P{i + 1}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel: country grid ── */}
      <div className="picker-right">
        <div className="country-grid">
          {TEAMS.map(team => {
            const sel = isSelected(team)
            const disabled = remaining === 0 && !sel
            return (
              <button
                key={team.name}
                type="button"
                className={`country-card${sel ? ' card-selected' : ''}${disabled ? ' card-disabled' : ''}`}
                onClick={e => sel ? handleDeselect(team) : handleSelect(team, e)}
              >
                <span className="card-flag">{team.flag}</span>
                <span className="card-name">{team.name}</span>
                {sel && <span className="card-check card-uncheck">✕</span>}
              </button>
            )
          })}
        </div>
      </div>

      {flyingFlags.map(ff => (
        <div
          key={ff.id}
          className="flying-flag"
          style={{
            left: `${ff.x}px`,
            top: `${ff.y}px`,
            '--dx': `${ff.dx}px`,
            '--dy': `${ff.dy}px`,
          }}
        >
          {ff.flag}
        </div>
      ))}
    </div>
  )
}
