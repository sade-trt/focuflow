# Dashboard v2 — Plan

This is a large request spanning layout, auth, settings, and mobile. Rather than rewrite everything in one shot (which risks breaking the polished UI you already have), I'll ship it in 4 focused phases. You approve, I build phase 1, then we keep rolling.

## Phase 1 — Desktop fit-to-viewport (no scroll)
- Convert main grid to `h-screen` with `grid-rows` so the 3 columns fill viewport height exactly.
- Shrink TopBar height, tighten gaps (`gap-3` instead of `gap-5`), reduce widget padding.
- Make FocusTimer the flex-1 centerpiece — circular ring auto-scales to remaining vertical space.
- Cap widget heights and enable internal scroll inside Deadlines / Todo / Notes only.
- Add a compact Weather pill into the TopBar (per your spec) and remove the standalone right-column weather card or shrink it.
- Verify on 13"/15"/desktop heights (720, 800, 900, 1080).

## Phase 2 — Auth + Profile (Lovable Cloud)
- Enable Lovable Cloud.
- Email/password + Google sign-in via Supabase.
- `profiles` table: `username`, `school`, `major`, `avatar_url`, `study_streak`, `total_sessions`, `total_hours` (+ RLS, auto-create trigger on signup).
- Avatar upload to Supabase Storage.
- `/login` + `/signup` routes; `_authenticated` guard on dashboard.
- Profile button in TopBar opens a glass modal showing avatar, stats, and Edit / Logout / Settings buttons.
- Migrate existing localStorage data (todos, notes, timer settings) to user-scoped DB rows once signed in; keep localStorage fallback for anonymous use.

## Phase 3 — Expanded Settings panel
Replace current SettingsPanel with a tabbed slide-out:
- **Appearance** — theme, accent color, font family, font size, card transparency, blur intensity (live CSS var updates).
- **Background** — existing presets + add Dark Academia, upload, dim overlay slider, blur slider.
- **Ambience** — sound picker, volume, fade transitions, autoplay-on-startup toggle (move out of floating AmbienceControl into here, keep mini control in TopBar).
- **Timer** — focus/short break/long break lengths, notification sound, auto-start breaks.
- All settings persist to DB (when signed in) and localStorage.

## Phase 4 — Mobile redesign
Mobile-only stacked layout in the exact order you specified:
TopBar → Today's Focus → Quote → FocusTimer → Weekly Schedule → Todo → Deadlines → Notes.
Desktop layout untouched (uses `lg:` breakpoint). Larger tap targets, increased spacing between cards, sticky TopBar, horizontal-scroll schedule.

---

## Technical notes
- Auth uses Lovable Cloud (Supabase under the hood). All user data will be in Postgres with RLS scoped to `auth.uid()`.
- Settings stored as a single JSON row per user (`user_settings` table) for cheap reads.
- Live appearance settings drive CSS variables on `:root` so changes are instant and don't need re-render.
- Mobile reorder uses Tailwind `order-*` utilities + `flex-col lg:grid` switch — no duplicate components.

## Questions before I start
1. **Phase order OK?** I recommend 1 → 2 → 3 → 4. Phase 1 alone gives you the immediate "fits on one screen" win.
2. **Auth providers**: email/password + Google, or email/password only?
3. **Anonymous mode**: should the app stay usable without signing in (current behavior), or force login?

Reply with "go" to start Phase 1 with the defaults (email+Google, anonymous still allowed), or adjust.