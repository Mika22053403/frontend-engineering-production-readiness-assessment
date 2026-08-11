import Image from "next/image";

import { cn } from "@/lib/utils";

interface CampaignHQLogoProps {
  className?: string;
  /** Show only the mascot mark, without the "campaign HQ" wordmark. */
  markOnly?: boolean;
  /** Use the cream mark suited for dark backgrounds instead of the navy wordmark/mark. */
  variant?: "navy" | "cream";
  /** Pixel height to render the logo at. Width scales to match the source aspect ratio. */
  height?: number;
}

const WORDMARK_ASPECT = 1559 / 412;
const MARK_ASPECT = 295 / 318;

export function CampaignHQLogo({
  className,
  markOnly,
  variant = "navy",
  height = 28,
}: CampaignHQLogoProps) {
  if (variant === "cream") {
    const size = height;
    return (
      <span className={cn("inline-flex shrink-0 overflow-hidden rounded-lg", className)}>
        <Image
          src="/brand/campaignhq-mark-cream-tile.png"
          alt="CampaignHQ"
          width={size}
          height={size}
          className="size-full object-cover"
          priority
        />
      </span>
    );
  }

  if (markOnly) {
    const width = Math.round(height * MARK_ASPECT);
    return (
      <span className={cn("inline-flex shrink-0", className)}>
        <Image
          src="/brand/campaignhq-mark-navy.png"
          alt="CampaignHQ"
          width={width}
          height={height}
          className="h-full w-auto"
          priority
        />
      </span>
    );
  }

  const width = Math.round(height * WORDMARK_ASPECT);
  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <Image
        src="/brand/campaignhq-wordmark.png"
        alt="CampaignHQ"
        width={width}
        height={height}
        className="h-full w-auto"
        priority
      />
    </span>
  );
}