import { Infinity as InfinityIcon } from "lucide-react";

export function PartnerBadges() {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-2">
      <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
        <InfinityIcon className="size-3.5 text-blue-400" />
        Meta Tech Provider
      </div>
      <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90">
        <span className="text-[0.65rem] font-bold tracking-wide text-warning">
          aws
        </span>
        AWS Partner
      </div>
    </div>
  );
}