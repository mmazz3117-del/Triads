# Pentatonic Triads

A mobile-first guitar practice tool. Visualizes pentatonic scale positions, triads, and plays chord progressions with real guitar samples and synthesized drums.

**[Live app →](https://mmazz3117-del.github.io/Triads/)**

---

## Modes

| Toggle | What it does |
|--------|-------------|
| **Pentatonic / Modal** | Switch between pentatonic and modal (Dorian / Mixolydian) families |
| **Major / Minor** | Pentatonic: major or minor pent · Modal: Mixolydian or Dorian |
| **⇄ Rel. minor/major** | Jump to the relative key |

Pick any of the 12 root keys from the key buttons.

---

## Fretboard Positions

5 positions per mode. Tap a position header to expand it.

- **Colored dots** = triad tones. Tap any dot to hear that note.
- **Root dots** have a ring around them.
- Tap **all / none** to select all or clear triads for that position.
- **P1–P5 buttons** (Neck view) toggle which positions are visible.

---

## Triad Cards

Each position shows 7 triad cards (one per scale degree).

- Tap a card to **highlight** its notes on the fretboard.
- **♪** plays the chord.
- **7 / 9** adds extensions (maj7, min7, dom7, maj9…).
- **→ min / → maj** borrows the parallel quality (shown as "borrowed").
- Tap notes inside a card to hear individual pitches.

---

## Chord Progression Builder

Enable with **🎼 Prog**.

- **Tap chord names** in the "TAP TO ADD" row to add to the progression.
- **Tap a chord name** in the progression to focus it (highlights its notes on the fretboard above).
- **◀ ▶** reorder · **⎘** duplicate · **✕** remove.
- Per-chord controls: beats (1/2/4/8), ext (7th/9th), → min/maj toggle.
- **▶ AUTO** plays through the progression. Count-in and loop count selectable.
- **TAP** for tap tempo.
- **Default beats** sets the beat count for newly added chords.
- **PRESETS** — common progressions (I–V–vi–IV, 12-bar Blues, etc.) auto-populate for the current mode.
- **💾 Save** — name and save a progression. Loads persist across sessions.

---

## Drums

Enable in the Prog panel under **drums: on**.

10 patterns: Shuffle, Blues, SlowBlues, BluesRock, Boogie, Jazz, SwingJazz, Bossa, Rock, Funk.

- Pattern switches live while playing.
- **vol** slider controls drum volume independently.

---

## Guitar Audio

Tap **🎸 Guitar** to load real MP3 samples (E2–D5). Requires an internet connection on first load (fetches from the GitHub repo). Falls back to a synthesized pluck if samples aren't available.

Chords strum string-by-string (38ms offset per string).

---

## Toolbar Buttons

| Button | Function |
|--------|----------|
| 🎵 Metro | Standalone metronome with tap tempo and 3/4 · 4/4 · 6/4 |
| ♭5 Blues | Adds the blue note (b5) to the fretboard display |
| 7 Notes | Shows all 7 scale tones behind the 5 pentatonic dots |
| 🎼 Prog | Chord progression builder |
| ⬡ Shape | Chord shape drawing tool (tap dots to mark fingerings) |
| ◉ Neck | Full-neck merged view of all selected positions |

---

## Neck View

Shows all 5 positions merged on one wide fretboard.

- Toggle positions with **P1–P5**.
- **all / none** selects triads across the full neck.
- Zoom slider scales the fretboard width.
- Position brackets labeled below the neck.

---

## Shape Tool

Enable **⬡ Shape**, then tap any dot on the fretboard to mark it.

- Up to 4 dots per chord group; auto-starts a new group after 4.
- Assign quality (maj / min / dim / 7 / 9) per group.
- **✕** clears a group's dots. **clear all** resets everything.
- When a progression chord is focused, shapes are stored per chord.

---

## Tips

- All 12 keys work — positions transpose automatically.
- Pentatonic positions 1–5 follow the standard CAGED system ordering.
- Dorian and Mixolydian use the same 5-position framework with mode-appropriate triads.
- Saved progressions survive page refresh (localStorage).
