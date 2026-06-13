import { useState } from 'react'
import './LetsPlay.css'

const TOPICS = [
  'Present Simple vs Continuous',
  'Present Perfect vs Past Simple',
  'Present Perfect vs Perfect Continuous',
  'Will vs Going to',
  'Mixed Review',
]

export function LetsPlay({ matches, onBack }) {
  const [selectedTopic, setSelectedTopic] = useState(null)

  function toggleTopic(topic) {
    setSelectedTopic(t => (t === topic ? null : topic))
  }

  return (
    <div className="letsplay-page">
      <div className="letsplay-glow" />

      {/* ── Header ── */}
      <header className="letsplay-header">
        <div className="letsplay-badge">⚽ English World Cup 2026</div>
        <h1 className="letsplay-title">Let's Play!</h1>
      </header>

      {/* ── Fixture list ── */}
      <section className="fixture-section">
        <p className="section-label">Next Match</p>
        <div className="fixture-list">
          {matches.map((match, i) => (
            <div key={i} className="fixture-row">
              <div className="fixture-team fixture-team-left">
                <span className="fixture-flag">{match.a.flag}</span>
                <span className="fixture-name">{match.a.name}</span>
              </div>
              <span className="fixture-vs">VS</span>
              <div className="fixture-team fixture-team-right">
                {match.b ? (
                  <>
                    <span className="fixture-flag">{match.b.flag}</span>
                    <span className="fixture-name">{match.b.name}</span>
                  </>
                ) : (
                  <span className="fixture-bye">BYE</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Topic picker ── */}
      <section className="topics-section">
        <p className="section-label">Choose a Topic</p>
        <div className="topics-grid">
          {TOPICS.map(topic => (
            <button
              key={topic}
              type="button"
              className={`topic-card${selectedTopic === topic ? ' topic-active' : ''}`}
              onClick={() => toggleTopic(topic)}
            >
              {topic}
            </button>
          ))}
          <button
            type="button"
            className={`topic-card topic-random${selectedTopic === 'Random' ? ' topic-random-active' : ''}`}
            onClick={() => toggleTopic('Random')}
          >
            🎲 Random
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="letsplay-footer">
        <button type="button" className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <button
          type="button"
          className={`letsplay-start-btn${selectedTopic ? ' start-ready' : ''}`}
          disabled={!selectedTopic}
        >
          {selectedTopic ? `Start: ${selectedTopic} →` : 'Pick a topic first'}
        </button>
      </footer>
    </div>
  )
}
