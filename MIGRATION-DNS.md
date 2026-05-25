# DNS cutover · pipoh.ai → pipoh-marketing (Phase 1.3)

**Time:** ~10 min · founder action via Vercel dashboard
**Risk:** Low · `pipoh.ai` apex domain moves between 2 Vercel projects within the same team
**Rollback:** Re-add domain to `pipoh-landing` project · ~2 min

---

## Pre-flight checks

Before initiating the swap, confirm:

- [ ] Phase 1.3 commit pushed to `gigosoftware/pipoh-marketing` `main`
- [ ] Vercel has auto-deployed the new commit to a Preview URL · founder verifies preview works
- [ ] All 3 pages render on the preview URL: `/`, `/pricing`, `/manifesto`
- [ ] Showcase ISR section shows 12 real creations (or hides cleanly if upstream is down)
- [ ] CTAs link to `studio.pipoh.ai/sign-up` and `studio.pipoh.ai/explore`
- [ ] Env vars set in **pipoh-marketing** Vercel project Settings → Environment Variables:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID=rpw2fj02`
  - `NEXT_PUBLIC_SANITY_DATASET=production`

---

## Cutover steps (founder, ~10 min)

1. **Vercel Dashboard** → https://vercel.com/gigo-studios
2. Open the **`pipoh-landing`** project (this is the current host of `pipoh.ai`)
3. Settings → Domains → locate `pipoh.ai`
4. Click **Remove** and confirm the removal
5. Open the **`pipoh-marketing`** project
6. Settings → Domains → **Add Domain** → enter `pipoh.ai`
7. Vercel verifies DNS automatically · ~1–2 min · no manual DNS change needed since both projects live under the same Vercel team
8. Toggle **Production Domain** so `pipoh.ai` becomes the canonical host
9. Vercel re-issues the SSL cert automatically · ~30 s
10. Open `https://pipoh.ai` in a fresh window · confirm the V2 marketing site renders (Hero floating tiles · Pain · PipohWay · Showcase · Pricing · FinalCTA · Footer)

---

## Post-cutover

- **Don't archive the old `pipoh-landing` project yet.** Keep it as a hot rollback for ~7 days after launch.
- After the 7-day cooling period (assuming no regressions), archive both:
  - Vercel `pipoh-landing` project (Settings → bottom → Pause / Delete)
  - GitHub `pipoh-landing` repo (Settings → bottom → Archive this repository)
- Hero placeholder tiles in `public/hero/tile-{1..8}.webp` should be swapped with real Pipoh creations before announcing publicly. The labelled placeholders (Atelier · Reel · Spark · etc.) are obvious giveaways.

---

## Rollback (if V2 ships a regression)

1. Vercel → **pipoh-marketing** → Settings → Domains → remove `pipoh.ai`
2. Vercel → **pipoh-landing** → Settings → Domains → add `pipoh.ai` back
3. Wait ~2 min for DNS to propagate (re-toggle Production Domain on `pipoh-landing` if needed)
4. Open a GitHub issue on `gigosoftware/pipoh-marketing` documenting what broke · attach screenshots, browser console output, Vercel runtime logs
5. Fix in a follow-up PR · re-test on Preview before re-attempting the cutover

---

## Useful URLs

- Vercel team: https://vercel.com/gigo-studios
- pipoh-marketing project: https://vercel.com/gigo-studios/pipoh-marketing
- pipoh-landing project: https://vercel.com/gigo-studios/pipoh-landing
- Domain config docs: https://vercel.com/docs/projects/domains
- Marketing repo: https://github.com/gigosoftware/pipoh-marketing
