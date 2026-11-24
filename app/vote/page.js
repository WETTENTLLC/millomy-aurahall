'use client'

import './vote.css'

import { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export default function VotePage() {
  const [email, setEmail] = useState('')
  const [user, setUser] = useState(null)
  const [round, setRound] = useState(null)
  const [songs, setSongs] = useState([])
  const [selected, setSelected] = useState([])
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!supabase) {
      setError('Voting sign-in is not configured yet. Please check back soon.')
      setLoading(false)
      return
    }

    let alive = true
    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!alive) return
      if (sessionError) setError(sessionError.message)
      setUser(data.session?.user ?? null)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setMessage('')
      setError('')
    })
    return () => {
      alive = false
      listener.subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!supabase || !user) return
    let alive = true
    async function loadBallot() {
      setLoading(true)
      setError('')
      const { data: rounds, error: roundError } = await supabase
        .from('competition_rounds')
        .select('id, name, slug, max_selections, status, opens_at, closes_at')
        .eq('status', 'open')
        .order('opens_at', { ascending: true })
        .limit(1)

      if (!alive) return
      if (roundError) {
        setError('We could not load the voting round. Please try again later.')
        setLoading(false)
        return
      }
      const activeRound = rounds?.[0]
      const now = Date.now()
      if (!activeRound || !activeRound.opens_at || !activeRound.closes_at ||
          now < new Date(activeRound.opens_at).getTime() ||
          now >= new Date(activeRound.closes_at).getTime()) {
        setRound(null)
        setSongs([])
        setLoading(false)
        return
      }

      const { data: lineup, error: lineupError } = await supabase
        .from('competition_round_songs')
        .select('display_order, competition_songs(id, challenge_number, title)')
        .eq('round_id', activeRound.id)
        .order('display_order', { ascending: true })

      if (!alive) return
      if (lineupError) {
        setError('We could not load the song list. Please try again later.')
      } else {
        setRound(activeRound)
        setSongs((lineup || []).map(item => item.competition_songs).filter(Boolean))
      }
      setLoading(false)
    }
    loadBallot()
    return () => { alive = false }
  }, [user])

  const maxSelections = round?.max_selections ?? 0
  const canSubmit = useMemo(
    () => !!user && !!round && selected.length > 0 && selected.length <= maxSelections && !sending,
    [user, round, selected, maxSelections, sending]
  )

  async function sendLink(event) {
    event.preventDefault()
    if (!supabase) return
    setSending(true)
    setError('')
    setMessage('')
    const redirectTo = typeof window !== 'undefined' ? window.location.origin + '/vote' : undefined
    const { error: authError } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: redirectTo }
    })
    if (authError) setError(authError.message)
    else setMessage('Check your email for your secure sign-in link. Verify your email before returning here.')
    setSending(false)
  }

  function toggleSong(songId) {
    setSelected(current => {
      if (current.includes(songId)) return current.filter(id => id !== songId)
      if (current.length >= maxSelections) return current
      return [...current, songId]
    })
  }

  async function submitBallot() {
    if (!supabase || !canSubmit) return
    setSending(true)
    setError('')
    setMessage('')
    const { error: voteError } = await supabase.rpc('submit_competition_ballot', {
      p_round_id: round.id,
      p_song_ids: selected
    })
    if (voteError) {
      setError(voteError.message.includes('already been submitted')
        ? 'A ballot has already been submitted for this round.'
        : voteError.message)
    } else {
      setMessage('Your ballot has been securely submitted. Thank you for participating!')
      setSelected([])
      setRound(null)
      setSongs([])
    }
    setSending(false)
  }

  async function signOut() {
    if (supabase) await supabase.auth.signOut()
    setRound(null)
    setSongs([])
    setSelected([])
    setMessage('')
    setError('')
  }

  return (
    <main className="vote-page">
      <div className="vote-shell">
        <a className="vote-back" href="/">← Millo My & Aura Hall</a>
        <p className="vote-eyebrow">WETT GIRLS PRESENTS</p>
        <h1>30 SONGS.<br /><span>YOUR VOICE.</span></h1>
        <p className="vote-intro">The 30-song challenge is complete. The fans will help decide which songs move forward.</p>
        <div className="vote-status"><span /> OFFICIAL FAN BALLOT</div>

        {error && <div className="vote-alert vote-error" role="alert">{error}</div>}
        {message && <div className="vote-alert vote-message" role="status">{message}</div>}

        {loading ? (
          <p className="vote-panel">Loading secure ballot…</p>
        ) : !user ? (
          <form className="vote-panel" onSubmit={sendLink}>
            <h2>Verify your email to participate</h2>
            <p>We'll email you a secure sign-in link. A verified email is required, and each voter may submit one ballot per round.</p>
            <label htmlFor="voter-email">Email address</label>
            <input id="voter-email" type="email" autoComplete="email" required value={email} onChange={event => setEmail(event.target.value)} placeholder="you@example.com" />
            <button className="vote-submit" type="submit" disabled={sending || !supabase}>{sending ? 'Sending…' : 'Email me a sign-in link'}</button>
            <small>Your email is used to verify ballot eligibility and prevent duplicate voting.</small>
          </form>
        ) : !round ? (
          <section className="vote-panel">
            <h2>No voting round is open right now</h2>
            <p>Your sign-in is verified. The official ballot will appear here when WETT Girls opens a round. No votes are being accepted at this time.</p>
            <button className="vote-secondary" onClick={signOut}>Sign out</button>
          </section>
        ) : (
          <section className="vote-panel">
            <div className="vote-round-heading">
              <div><p className="vote-eyebrow">NOW VOTING</p><h2>{round.name}</h2></div>
              <strong>Choose up to {maxSelections}</strong>
            </div>
            <p className="vote-count">{selected.length} of {maxSelections} selections used</p>
            <div className="vote-song-list">
              {songs.map(song => (
                <label className={`vote-song ${selected.includes(song.id) ? 'is-selected' : ''}`} key={song.id}>
                  <input type="checkbox" checked={selected.includes(song.id)} onChange={() => toggleSong(song.id)} disabled={!selected.includes(song.id) && selected.length >= maxSelections} />
                  <span className="vote-song-number">{String(song.challenge_number).padStart(2, '0')}</span>
                  <span>{song.title}</span>
                </label>
              ))}
            </div>
            <button className="vote-submit" disabled={!canSubmit} onClick={submitBallot}>{sending ? 'Submitting…' : 'Submit my ballot'}</button>
            <small>One ballot per verified voter for this round. Your selections cannot be changed after submission.</small>
            <button className="vote-secondary" onClick={signOut}>Sign out</button>
          </section>
        )}
        <footer className="vote-footer">WETT GIRLS · MILLO MY & AURA HALL · OFFICIAL COMPETITION</footer>
      </div>
    </main>
  )
}
