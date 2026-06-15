import { useState, useEffect } from 'react'
import { FACTS, ALL_TOPIC_KEYS } from './facts'
import { playGoalSound, playFailedSound } from './sounds'
import './Kickoff.css'

const DURATION     = 15000
const POINT_VALUES = [100, 200, 300, 400, 500]

// ── Helpers ──────────────────────────────────────────────────────────────────

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickSentenceByPoints(topic, points) {
  const key  = topic === 'Random' ? pickRandom(ALL_TOPIC_KEYS) : topic
  const pool = FACTS[key].filter(f => f.points === points)
  return pool.length > 0 ? pickRandom(pool) : pickRandom(FACTS[key])
}

function pointsLabel(points) {
  if (points === 100) return 'Easy'
  if (points === 200) return 'Easy+'
  if (points === 300) return 'Medium'
  if (points === 400) return 'Hard-'
  return 'Hard'
}

function formatTime(ms) {
  const clamped = Math.max(0, ms)
  const s  = Math.floor(clamped / 1000)
  const cs = Math.floor((clamped % 1000) / 10)
  return `${s}.${String(cs).padStart(2, '0')}`
}

function timerColorClass(ms) {
  if (ms > 8000) return 'timer-green'
  if (ms > 4000) return 'timer-yellow'
  return 'timer-red'
}

// ── Component ─────────────────────────────────────────────────────────────────

export function Kickoff({ match, topic, onBack }) {
  // phase: 'picking' → 'answering' → (switch teams or evaluate) → 'tie' | 'matchOver'
  const [phase, setPhase]           = useState('picking')
  const [activeTeam, setActiveTeam] = useState('a')       // 'a' | 'b'
  const [sentence, setSentence]     = useState(null)
  const [result, setResult]         = useState(null)       // null | 'goal' | 'failed'
  const [timedOut, setTimedOut]     = useState(false)
  const [scores, setScores]         = useState({ a: 0, b: 0 })
  const [round, setRound]           = useState(1)
  const [questionId, setQuestionId] = useState(0)
  const [timeLeft, setTimeLeft]     = useState(DURATION)

  const activeCountry = activeTeam === 'a' ? match.a : (match.b ?? match.a)
  const isAnswering   = phase === 'answering'
  const colorClass    = timerColorClass(timeLeft)
  const isUrgent      = timeLeft <= 4000 && isAnswering && !result && !timedOut

  function handlePickPoints(pts) {
    setSentence(pickSentenceByPoints(topic, pts))
    setPhase('answering')
    setResult(null)
    setTimedOut(false)
    setTimeLeft(DURATION)
    setQuestionId(id => id + 1)
  }

  function handleGoal() {
    playGoalSound()
    setScores(s => ({ ...s, [activeTeam]: s[activeTeam] + sentence.points }))
    setResult('goal')
  }

  function handleFailed() {
    playFailedSound()
    setResult('failed')
  }

  function handleNext() {
    if (activeTeam === 'a' && match.b) {
      // Team A done → switch to Team B
      setActiveTeam('b')
      setPhase('picking')
      setSentence(null)
      setResult(null)
      setTimedOut(false)
      setTimeLeft(DURATION)
    } else {
      // Both teams done → evaluate round
      // scores here reflect the just-applied goal (state settled between renders)
      if (scores.a === scores.b) {
        setPhase('tie')
      } else {
        setPhase('matchOver')
      }
    }
  }

  function handleNextRound() {
    setRound(r => r + 1)
    setActiveTeam('a')
    setPhase('picking')
    setSentence(null)
    setResult(null)
    setTimedOut(false)
    setTimeLeft(DURATION)
  }

  // Countdown — runs only during answering phase, pauses when answered or timed out
  useEffect(() => {
    if (!isAnswering || result !== null || timedOut) return

    setTimeLeft(DURATION)
    const start = Date.now()
    let rafId

    function tick() {
      const remaining = Math.max(0, DURATION - (Date.now() - start))
      setTimeLeft(remaining)
      if (remaining === 0) {
        setTimedOut(true)
        return
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [questionId, isAnswering, result, timedOut])

  const nextBtnLabel = activeTeam === 'a' && match.b
    ? `${match.b.name}'s Turn →`
    : 'See Results →'

  return (
    <div className="kickoff-page">
      <div className="kickoff-glow" />

      {/* ── Timer ── */}
      <div className={`kickoff-timer ${isAnswering ? colorClass : 'timer-green'}${isUrgent ? ' timer-urgent' : ''}${!isAnswering ? ' timer-inactive' : ''}`}>
        <span className="timer-label">TIME</span>
        <span className="timer-value">
          {isAnswering ? formatTime(timeLeft) : formatTime(DURATION)}
        </span>
      </div>

      {/* ── Header ── */}
      <header className="kickoff-header">
        <div className="kickoff-badge">⚽ English World Cup 2026</div>
        <h1 className="kickoff-title">Kickoff</h1>
        <div className="kickoff-topic-tag">{topic}</div>
      </header>

      {/* ── Scoreboard ── */}
      <div className="kickoff-scoreboard">
        <div className="sb-team">
          <span className="sb-flag">{match.a.flag}</span>
          <span className="sb-name">{match.a.name}</span>
          <span className={`sb-score${activeTeam === 'a' && isAnswering ? ' sb-score-active' : ''}`}>
            {scores.a}
          </span>
        </div>
        <div className="sb-center">
          <span className="sb-q">Round {round}</span>
          <span className="sb-turn">
            {activeTeam === 'a' ? match.a.name : (match.b?.name ?? '')}
          </span>
        </div>
        <div className="sb-team sb-team-right">
          <span className={`sb-score${activeTeam === 'b' && isAnswering ? ' sb-score-active' : ''}`}>
            {scores.b}
          </span>
          <span className="sb-name">{match.b?.name ?? 'BYE'}</span>
          <span className="sb-flag">{match.b?.flag ?? ''}</span>
        </div>
      </div>

      {/* ── Main ── */}
      <main className="kickoff-main">
        <div className="kickoff-country" key={`${activeTeam}-${round}-c`}>
          <span className="kickoff-flag">{activeCountry.flag}</span>
          <span className="kickoff-country-name">{activeCountry.name}</span>
          <span className="kickoff-kicks">
            {phase === 'picking' ? 'choose a question by difficult!' : 'kicks off!'}
          </span>
        </div>

        {/* ── Point picker ── */}
        {phase === 'picking' && (
          <div className="point-picker" key={`${activeTeam}-${round}-p`}>
            <div className="point-picker-grid">
              {POINT_VALUES.map(pts => (
                <button
                  key={pts}
                  type="button"
                  className={`point-btn point-btn-${pts}`}
                  onClick={() => handlePickPoints(pts)}
                >
                  <span className="point-btn-value">{pts}</span>
                  <span className="point-btn-label">{pointsLabel(pts)}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Question ── */}
        {phase === 'answering' && sentence && (
          <>
            <div className="kickoff-sentence-card" key={`${questionId}-s`}>
              <div className="kickoff-points-badge">
                ⭐ {sentence.points} pts · {pointsLabel(sentence.points)}
              </div>
              <p className="kickoff-sentence">{sentence.blank}</p>
              <span className="kickoff-hint">{sentence.hint}</span>
              {result && (
                <div className={`kickoff-answer kickoff-answer-${result}`}>
                  <span className="answer-label">Answer:</span>
                  <span className="answer-text">{sentence.answer}</span>
                </div>
              )}
            </div>

            {!result ? (
              <div className="kickoff-actions">
                <button type="button" className="kickoff-btn goal-btn" onClick={handleGoal}>
                  ⚽ Goal!
                </button>
                <button type="button" className="kickoff-btn failed-btn" onClick={handleFailed}>
                  ✗ Failed!
                </button>
              </div>
            ) : (
              <div className="kickoff-result">
                <div className={`result-banner result-banner-${result}`}>
                  {result === 'goal' ? '⚽ GOAL!' : '✗ FAILED!'}
                </div>
                <button type="button" className="kickoff-next-btn" onClick={handleNext}>
                  {nextBtnLabel}
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="kickoff-footer">
        <button type="button" className="kickoff-back-btn" onClick={onBack}>
          ← Back
        </button>
      </footer>

      {/* ── Time Out overlay ── */}
      {timedOut && isAnswering && (
        <div className="kickoff-overlay">
          <div className="kickoff-overlay-card timeout-card">
            <div className="overlay-icon">⏱</div>
            <h2 className="overlay-title">Time Out!</h2>
            <p className="overlay-sub">No answer submitted in time.</p>
            <div className="kickoff-answer kickoff-answer-failed">
              <span className="answer-label">Answer:</span>
              <span className="answer-text">{sentence?.answer}</span>
            </div>
            <button type="button" className="kickoff-next-btn" onClick={handleNext}>
              {nextBtnLabel}
            </button>
          </div>
        </div>
      )}

      {/* ── Tie overlay ── */}
      {phase === 'tie' && (
        <div className="kickoff-overlay">
          <div className="kickoff-overlay-card tie-card">
            <div className="overlay-icon">🤝</div>
            <h2 className="overlay-title">It's a Tie!</h2>
            <p className="overlay-sub">Both teams are level — play another round!</p>
            <div className="final-scores">
              <div className="final-team">
                <span className="final-flag">{match.a.flag}</span>
                <span className="final-pts">{scores.a}</span>
                <span className="final-name">{match.a.name}</span>
              </div>
              <span className="final-vs">VS</span>
              <div className="final-team">
                <span className="final-flag">{match.b?.flag ?? ''}</span>
                <span className="final-pts">{scores.b}</span>
                <span className="final-name">{match.b?.name ?? 'BYE'}</span>
              </div>
            </div>
            <button type="button" className="kickoff-next-btn" onClick={handleNextRound}>
              Round {round + 1} →
            </button>
          </div>
        </div>
      )}

      {/* ── Match Over overlay ── */}
      {phase === 'matchOver' && (
        <div className="kickoff-overlay">
          <div className="kickoff-overlay-card matchover-card">
            <div className="overlay-icon">🏆</div>
            <h2 className="overlay-title">Match Over!</h2>

            <div className="final-scores">
              <div className="final-team">
                <span className="final-flag">{match.a.flag}</span>
                <span className="final-pts">{scores.a}</span>
                <span className="final-name">{match.a.name}</span>
              </div>
              <span className="final-vs">VS</span>
              <div className="final-team">
                <span className="final-flag">{match.b?.flag ?? ''}</span>
                <span className="final-pts">{scores.b}</span>
                <span className="final-name">{match.b?.name ?? 'BYE'}</span>
              </div>
            </div>

            <div className="winner-banner winner-win">
              {scores.a > scores.b
                ? `${match.a.name} wins! 🏆`
                : `${match.b?.name} wins! 🏆`}
            </div>

            <button type="button" className="kickoff-back-btn-lg" onClick={onBack}>
              ← Back to Topics
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
