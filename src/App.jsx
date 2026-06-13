import { useState, useRef } from 'react'
import { CountryPicker } from './CountryPicker'
import { Bracket } from './Bracket'
import './App.css'

const TEAMS = [
  { name: 'Argentina', flag: '🇦🇷' },
  { name: 'Brazil', flag: '🇧🇷' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Germany', flag: '🇩🇪' },
  { name: 'Spain', flag: '🇪🇸' },
  { name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
  { name: 'Portugal', flag: '🇵🇹' },
  { name: 'Netherlands', flag: '🇳🇱' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Belgium', flag: '🇧🇪' },
  { name: 'Croatia', flag: '🇭🇷' },
  { name: 'USA', flag: '🇺🇸' },
  { name: 'Mexico', flag: '🇲🇽' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Australia', flag: '🇦🇺' },
  { name: 'Morocco', flag: '🇲🇦' },
  { name: 'Senegal', flag: '🇸🇳' },
  { name: 'Nigeria', flag: '🇳🇬' },
  { name: 'Colombia', flag: '🇨🇴' },
  { name: 'Uruguay', flag: '🇺🇾' },
  { name: 'Ecuador', flag: '🇪🇨' },
  { name: 'Turkey', flag: '🇹🇷' },
  { name: 'Switzerland', flag: '🇨🇭' },
  { name: 'Denmark', flag: '🇩🇰' },
  { name: 'Austria', flag: '🇦🇹' },
  { name: 'Serbia', flag: '🇷🇸' },
  { name: 'Poland', flag: '🇵🇱' },
  { name: 'Saudi Arabia', flag: '🇸🇦' },
  { name: 'Iran', flag: '🇮🇷' },
  { name: 'Egypt', flag: '🇪🇬' },
  { name: 'Cameroon', flag: '🇨🇲' },
  { name: 'Ghana', flag: '🇬🇭' },
  { name: 'Panama', flag: '🇵🇦' },
  { name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
]

const MAX_PLAYERS = 16

function App() {
  const [screen, setScreen] = useState('start') // 'start' | 'players' | 'game' | 'bracket'
  const [playerCount, setPlayerCount] = useState(2)
  const [selectedTeams, setSelectedTeams] = useState([])
  const [musicOn, setMusicOn] = useState(true)
  const [musicPaused, setMusicPaused] = useState(false)
  const audioRef = useRef(null)

  function startMusic() {
    if (!audioRef.current) return
    audioRef.current.volume = 0.4
    audioRef.current.play().catch(() => {})
  }

  function toggleMute() {
    if (!audioRef.current) return
    const newMusicOn = !musicOn
    audioRef.current.muted = !newMusicOn
    setMusicOn(newMusicOn)
  }

  function togglePause() {
    if (!audioRef.current) return
    if (musicPaused) {
      audioRef.current.play().catch(() => {})
      setMusicPaused(false)
    } else {
      audioRef.current.pause()
      setMusicPaused(true)
    }
  }

  function handleCountChange(e) {
    const v = parseInt(e.target.value, 10)
    if (!isNaN(v) && v >= 1) setPlayerCount(Math.min(MAX_PLAYERS, v))
  }

  function decrement() {
    setPlayerCount(c => Math.max(1, c - 1))
  }

  function increment() {
    setPlayerCount(c => Math.min(MAX_PLAYERS, c + 1))
  }

  function handleNext() {
    setScreen('game')
  }

  return (
    <>
      {/* Persistent audio — never unmounts so music survives screen changes */}
      <audio ref={audioRef} src="/La_copa_de_todos.mp3" loop preload="auto" />

      {/* Music controls — shown on all screens */}
      <div className="music-controls">
        <button
          className="music-btn"
          onClick={togglePause}
          aria-label={musicPaused ? 'Play music' : 'Pause music'}
          title={musicPaused ? 'Play music' : 'Pause music'}
        >
          {musicPaused ? '▶' : '⏸'}
        </button>
        <button
          className="music-btn"
          onClick={toggleMute}
          aria-label={musicOn ? 'Mute music' : 'Unmute music'}
          title={musicOn ? 'Mute music' : 'Unmute music'}
        >
          {musicOn ? '🔊' : '🔇'}
        </button>
      </div>

      {screen === 'game' && (
        <CountryPicker
          playerCount={playerCount}
          onComplete={teams => {
            setSelectedTeams(teams)
            setScreen('bracket')
          }}
        />
      )}

      {screen === 'bracket' && (
        <Bracket
          teams={selectedTeams}
          onBack={() => setScreen('game')}
        />
      )}

      {(screen === 'start' || screen === 'players') && (
        <div className="press-start-page">
          <div className="stadium-glow" />

          <main className="content">
            <div className="badge">⚽ English World Cup 2026</div>
            <h1 className="title">
              <span>English</span>
              <span>World Cup</span>
              <span>Game</span>
            </h1>

            {screen === 'start' && (
              <button
                className="start-btn"
                type="button"
                onClick={() => {
                  startMusic()
                  setScreen('players')
                }}
              >
                Press Start
              </button>
            )}

            {screen === 'players' && (
              <div className="player-setup">
                <label className="player-label" htmlFor="player-count">
                  Number of Players
                </label>
                <div className="player-counter">
                  <button type="button" className="counter-btn" onClick={decrement} aria-label="Decrease">
                    ▼
                  </button>
                  <input
                    id="player-count"
                    className="player-input"
                    type="number"
                    value={playerCount}
                    onChange={handleCountChange}
                    onFocus={e => e.target.select()}
                    onKeyDown={e => e.key === 'Enter' && handleNext()}
                    autoFocus
                  />
                  <button type="button" className="counter-btn" onClick={increment} aria-label="Increase">
                    ▲
                  </button>
                </div>
                <p className="player-hint">↑ ↓ keys or type · max {MAX_PLAYERS} · Enter to confirm</p>
                <button type="button" className="next-btn" onClick={handleNext}>
                  Next
                </button>
              </div>
            )}
          </main>

          <div className="flags-strip">
            <div className="flags-track" aria-hidden="true">
              {[...TEAMS, ...TEAMS].map((team, i) => (
                <div key={i} className="flag-item">
                  <span className="flag-emoji">{team.flag}</span>
                  <span className="flag-name">{team.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
