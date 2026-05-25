import { redirect } from "next/navigation";

/** Phase 1.2 stub · redirects to studio's authoritative terms page.
 *  Phase 1.3 may bring a standalone marketing-side version. */
export default function TermsPage() {
  redirect("https://studio.pipoh.ai/terms");
}
