import { useState, useEffect } from 'react'
import './Bracket.css'

// ── Pure helpers ──────────────────────────────────────────────────────────────

function nextPow2(n) {
  if (n <= 1) return 2
  let p = 1
  while (p < n) p <<= 1
  return p
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildDraw(teams) {
  const size       = Math.max(2, nextPow2(teams.length))
  const matchCount = size / 2
  const byeCount   = size - teams.length
  const rounds     = Math.log2(size)

  const shuffled = shuffle(teams)
  const matches  = []

  // First byeCount matches get one real team + BYE
  for (let i = 0; i < byeCount; i++) {
    matches.push({ a: shuffled[i], b: null })
  }
  // Remaining matches are real pairs
  let idx = byeCount
  while (idx < shuffled.length) {
    matches.push({ a: shuffled[idx], b: shuffled[idx + 1] })
    idx += 2
  }

  // Shuffle so byes aren't always grouped at the front
  return { matches: shuffle(matches), matchCount, rounds }
}

// ── Bracket component ─────────────────────────────────────────────────────────

export function Bracket({ teams, onBack }) {
  const [draw]                   = useState(() => buildDraw(teams))
  const [revealed, setRevealed]  = useState(0)

  const { matches, matchCount, rounds } = draw
  const allRevealed = revealed === matchCount

  // Auto-reveal first match after 2 s on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setRevealed(r => Math.min(r + 1, matchCount))
    }, 2000)
    return () => clearTimeout(timer)
  }, [matchCount])

  function handleNext() {
    if (!allRevealed) setRevealed(r => r + 1)
  }

  // Build TBD rows for rounds above round 1
  const higherRounds = []
  for (let r = rounds - 1; r >= 1; r--) {
    const slotCount = Math.pow(2, r - 1)
    higherRounds.push({ r, slotCount })
  }

  return (
    <div className="bracket-page">
      <div className="bracket-glow" />

      {/* ── Trophy header ── */}
      <header className="bracket-header">
        <div className="trophy-icon">🏆</div>
        <div className="trophy-label">World Cup</div>
        <div className="bracket-badge">⚽ English World Cup 2026</div>
      </header>

      {/* ── Bracket diagram ── */}
      <div className="bracket-diagram">

        {/* Higher rounds (Final, Semi, Quarter…) — TBD placeholders */}
        {higherRounds.map(({ r, slotCount }) => (
          <div
            key={r}
            className="bracket-round"
            style={{ '--slot-count': slotCount }}
          >
            {Array.from({ length: slotCount }, (_, i) => (
              <div key={i} className="tbd-node">
                <span className="tbd-label">TBD</span>
              </div>
            ))}
          </div>
        ))}

        {/* Connector line from highest TBD row down to round-1 */}
        <div className="bracket-connector" />

        {/* Round 1 — the draw */}
        <div className="bracket-round round-1">
          {matches.map((match, i) => {
            if (i >= revealed) {
              return (
                <div key={i} className="match-node match-hidden">
                  <span className="match-question">?</span>
                </div>
              )
            }
            return (
              <div
                key={i}
                className={`match-node match-revealed${i === revealed - 1 ? ' match-newest' : ''}`}
              >
                <TeamSlot team={match.a} />
                <div className="vs-center">
                  <div className="vs-line" />
                  <span className="vs-text">VS</span>
                  <div className="vs-line" />
                </div>
                <TeamSlot team={match.b} />
              </div>
            )
          })}
        </div>

      </div>

      {/* ── Footer nav ── */}
      <footer className="bracket-footer">
        <button
          type="button"
          className="back-btn"
          onClick={onBack}
        >
          ← Back
        </button>

        <div className="draw-status">
          {allRevealed
            ? <span className="draw-complete-label">✓ Draw Complete</span>
            : <span className="draw-progress">{revealed} / {matchCount} drawn</span>
          }
        </div>

        <button
          type="button"
          className="next-btn bracket-next"
          onClick={handleNext}
          disabled={allRevealed}
        >
          {allRevealed ? 'Draw Complete' : 'Next →'}
        </button>
      </footer>
    </div>
  )
}

function TeamSlot({ team }) {
  if (!team) {
    return (
      <div className="team-slot bye-slot">
        <span className="bye-label">BYE</span>
      </div>
    )
  }
  return (
    <div className="team-slot">
      <span className="team-flag">{team.flag}</span>
      <span className="team-name">{team.name}</span>
    </div>
  )
}
