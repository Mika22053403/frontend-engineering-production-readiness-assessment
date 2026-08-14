import { cn } from "@/lib/utils";
import { PartnerBadges } from "./partner-badges";

interface SignupMarketingPanelProps {
  className?: string;
}

const STEPS = [
  {
    number: 1,
    title: "Connect your channels",
    description: "Official Meta WhatsApp Business API + your email domain",
  },
  {
    number: 2,
    title: "Import your contacts",
    description: "CSV, API, or Shopify. Segments build themselves",
  },
  {
    number: 3,
    title: "Launch your first journey",
    description: "Broadcasts, chatbots, and automations in ~10 minutes",
  },
];

export function SignupMarketingPanel({ className }: SignupMarketingPanelProps) {
  return (
    <div
      className={cn(
        "relative isolate flex flex-col justify-between overflow-hidden bg-brand-700 px-10 py-12 text-white xl:px-16",
        className,
      )}
    >
      {/* Decorative glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-success/20 blur-3xl"
      />

      <div className="relative">
        <p className="text-xs font-semibold tracking-[0.2em] text-warning">
          YOUR FIRST 10 MINUTES
        </p>

        <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
          From signup to your first campaign, today.
        </h2>

        <div className="relative mt-8 space-y-3">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex items-start gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-warning/20 text-sm font-bold text-warning">
                {step.number}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs text-white/60">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-10 border-t border-white/10 pt-6">
        <p className="text-sm text-white/70">
          No credit card required. Cancel anytime, your data stays yours.
        </p>

        <PartnerBadges />
      </div>
    </div>
  );
}