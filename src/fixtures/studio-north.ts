/**
 * Studio North — the fictional multi-vertical social agency we use for demo
 * content. Three sample clients exist across the Vibe Kit fixtures so the
 * demos and Looms tell a consistent story.
 *
 * For Brief Translator specifically, we want messy client messages that show
 * the killer features (open-questions + parallel-asks) clearly. Each fixture
 * intentionally encodes a different flavor of mess:
 *
 *   - Aurelia Lashes: contains a parallel ask ("Anna wants Mother's Day")
 *   - Mantra Yoga: contains a parallel ask (typo fix on last week's post)
 *   - Dr. Eckhardt Clinic: clean-ish, no parallel ask — shows the tool
 *     behaving correctly when there's nothing to flag
 */
export interface BriefSample {
  id: "aurelia-lashes" | "mantra-yoga" | "eckhardt-clinic";
  client: string;
  vertical: string;
  message: string;
}

export const BRIEF_SAMPLES: BriefSample[] = [
  {
    id: "aurelia-lashes",
    client: "Aurelia Lashes",
    vertical: "Beauty",
    message:
      "hey can we do a reel for the new lash glue, target young women, like the last one but better. also Anna wants something for Mother's Day??? deadline soonish would be great",
  },
  {
    id: "mantra-yoga",
    client: "Mantra Yoga",
    vertical: "Yoga studio",
    message:
      "Need the mat launch reel by Friday — vertical, 15-30 sec, our usual style. Audience is moms 35+, key message is 'finally a mat that doesn't slip during vinyasa'. Also can you fix the typo in last week's caption on @mantrayoga while you're in there?",
  },
  {
    id: "eckhardt-clinic",
    client: "Dr. Eckhardt Clinic",
    vertical: "Professional services (medical)",
    message:
      "Educational carousel about our new keratin scalp treatment — 6 slides, formal but warm tone, brand colors only, no stock photos. By next Friday please. Goal is to educate existing patients (we'll boost it to them, not run it cold).",
  },
];

export function findSample(id: string): BriefSample | undefined {
  return BRIEF_SAMPLES.find((s) => s.id === id);
}
