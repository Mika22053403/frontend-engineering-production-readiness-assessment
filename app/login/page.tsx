import { ArrowRight, Star } from "lucide-react";

import LoginForm from "@/features/auth/components/login-form";
import { CampaignHQLogo } from "@/components/layout/campaignhq-logo";
import { LoginMarketingPanel } from "@/components/layout/login-marketing-panel";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen bg-cream lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <div className="flex items-center justify-between">
          <CampaignHQLogo />

          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-sm text-muted-foreground">
              New to CampaignHQ?
            </span>
            <Button size="sm" variant="default">
              Start Free
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-10">
          <LoginForm />
        </div>

        <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <div className="flex text-warning" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" />
            ))}
          </div>
          <span>4.6 on G2 &middot; Trusted by NxtWave, YuppTV, Volopay and more</span>
        </div>
      </div>

      <LoginMarketingPanel className="hidden lg:flex" />
    </main>
  );
}