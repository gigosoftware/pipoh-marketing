import { redirect } from "next/navigation";

/** Phase 1.2 stub · redirects to studio's authoritative privacy page.
 *  Phase 1.3 may bring a standalone marketing-side version. */
export default function PrivacyPage() {
  redirect("https://studio.pipoh.ai/account/privacy");
}
