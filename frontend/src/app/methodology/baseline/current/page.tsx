import { redirect } from "next/navigation";
import { baselinePath, getCurrentBaseline } from "@/lib/baselines";

/**
 * Stable link to whichever Baseline is current. Use it in newsletters and
 * general links; inside an assessment use the dated link, so the assessment
 * keeps pointing at the version it actually used.
 */
export default function CurrentBaselinePage() {
  redirect(baselinePath(getCurrentBaseline().id));
}
