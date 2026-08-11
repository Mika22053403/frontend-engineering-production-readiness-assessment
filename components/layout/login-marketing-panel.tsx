import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface LoginMarketingPanelProps {
  className?: string;
}

export function LoginMarketingPanel({ className }: LoginMarketingPanelProps) {
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
          WHATSAPP &middot; EMAIL &middot; SMS
        </p>

        <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight tracking-tight xl:text-4xl">
          One workspace for every customer conversation.
        </h2>

        <div className="relative mt-10 h-40">
          <div className="w-fit max-w-xs rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="flex items-center gap-1.5 text-xs font-medium text-success">
              <span className="size-1.5 rounded-full bg-success" />
              WhatsApp &middot; Order update
            </p>
            <p className="mt-1.5 text-sm text-white/90">
              Your order #4821 is out for delivery 🎉
            </p>
          </div>

          <div className="absolute right-0 top-20 w-fit max-w-xs rounded-xl border border-warning/30 bg-brand-600/80 p-4 backdrop-blur-sm">
            <p className="text-xs font-medium text-warning">
              Campaign delivered
            </p>
            <p className="mt-1.5 text-sm text-white/90">
              62,400 messages &middot; 98.5% delivered
            </p>
          </div>
        </div>
      </div>

      <div className="relative mt-10 border-l-2 border-warning pl-4">
        <p className="text-sm leading-relaxed text-white/90">
          Bringing WhatsApp and email into one workspace let our team see
          which journeys actually drive revenue.
        </p>

        <div className="mt-3 flex items-center gap-2.5">
          <Avatar size="sm">
            <AvatarFallback className="bg-white/15 text-xs text-white">
              AM
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-white">Alex Morgan</p>
            <p className="text-xs text-white/60">Head of Growth</p>
          </div>
        </div>
      </div>

      <div className="relative mt-10 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
        <div>
          <p className="text-xl font-bold text-warning">50M+</p>
          <p className="text-xs text-white/60">Messages delivered</p>
        </div>
        <div>
          <p className="text-xl font-bold text-warning">15%</p>
          <p className="text-xs text-white/60">More carts recovered</p>
        </div>
        <div>
          <p className="text-xl font-bold text-warning">10 min</p>
          <p className="text-xs text-white/60">To first journey</p>
        </div>
      </div>
    </div>
  );
}