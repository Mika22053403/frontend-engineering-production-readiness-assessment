import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SignupForm from "@/features/auth/components/signup-form";
import { CampaignHQLogo } from "@/components/layout/campaignhq-logo";
import { SignupMarketingPanel } from "@/components/layout/signup-marketing-panel";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  return (
    <main className="grid min-h-screen bg-cream lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
        <div className="flex items-center justify-between">
          <CampaignHQLogo />

          <div className="hidden items-center gap-4 sm:flex">
            <Link
              href="#"
              className="text-sm font-medium text-foreground hover:text-primary"
            >
              Pricing
            </Link>

            <span className="h-4 w-px bg-border" aria-hidden />

            <span className="text-sm text-muted-foreground">
              Already have an account?
            </span>

            <Button size="sm" variant="default" asChild>
              <Link href="/login">
                Log in
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center py-10">
          <SignupForm />
        </div>

        <p className="text-center text-xs text-muted-foreground sm:hidden">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-foreground">
            Log in
          </Link>
        </p>
      </div>

      <SignupMarketingPanel className="hidden lg:flex" />
    </main>
  );
}