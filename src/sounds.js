function makeCtx() {
  return new (window.AudioContext || window.webkitAudioContext)()
}

export function playGoalSound() {
  try {
    const ac  = makeCtx()
    const now = ac.currentTime

    // Rising fanfare: C5 → E5 → G5 → C6
    const fanfare = [523.25, 659.25, 783.99, 1046.5]
    fanfare.forEach((freq, i) => {
      const osc  = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain)
      gain.connect(ac.destination)

      osc.type = 'triangle'
      osc.frequency.value = freq

      const t = now + i * 0.15
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.4, t + 0.02)
      gain.gain.setValueAtTime(0.4, t + 0.13)
      gain.gain.linearRampToValueAtTime(0, t + 0.22)
      osc.start(t)
      osc.stop(t + 0.25)
    })

    // Sustained C-major chord after the fanfare
    const chordT = now + fanfare.length * 0.15 + 0.05
    ;[523.25, 659.25, 783.99].forEach(freq => {
      const osc  = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain)
      gain.connect(ac.destination)

      osc.type = 'triangle'
      osc.frequency.value = freq
      gain.gain.setValueAtTime(0.28, chordT)
      gain.gain.exponentialRampToValueAtTime(0.001, chordT + 1.0)
      osc.start(chordT)
      osc.stop(chordT + 1.1)
    })

    setTimeout(() => ac.close(), 3000)
  } catch (_) { /* silently fail if Web Audio unavailable */ }
}

export function playFailedSound() {
  try {
    const ac  = makeCtx()
    const now = ac.currentTime

    // Sad trombone: G4 → F4 → Eb4 → C4
    const notes = [392, 349.23, 311.13, 261.63]
    notes.forEach((freq, i) => {
      const osc  = ac.createOscillator()
      const gain = ac.createGain()
      osc.connect(gain)
      gain.connect(ac.destination)

      osc.type = 'sawtooth'
      osc.frequency.value = freq

      const t = now + i * 0.22
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.25, t + 0.05)
      gain.gain.setValueAtTime(0.25, t + 0.17)
      gain.gain.linearRampToValueAtTime(0, t + 0.26)
      osc.start(t)
      osc.stop(t + 0.3)
    })

    setTimeout(() => ac.close(), 2000)
  } catch (_) { /* silently fail */ }
}
