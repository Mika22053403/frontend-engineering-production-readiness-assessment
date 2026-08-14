"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@tanstack/react-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";

import { authMutations } from "@/queries/auth.query";
import { useAuthStore } from "@/stores/auth-store";
import { signupSchema } from "@/schemas/signup.schema";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CampaignHQLogo } from "@/components/layout/campaignhq-logo";

export default function SignupForm() {
  const router = useRouter();

  const login = useAuthStore((state) => state.login);

  const mutation = useMutation(authMutations.signup());

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      workEmail: "",
      password: "",
      companyName: "",
    },

    validators: {
      onChange: signupSchema,
    },

    onSubmit: async ({ value }) => {
      const result = await mutation.mutateAsync(value);

      login(result.token, result.user);

      router.push("/");
    },
  });

  return (
    <div className="w-full max-w-sm">
      <div className="flex flex-col items-center text-center">
        <CampaignHQLogo markOnly height={56} />

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          7-day free trial &middot; no credit card required
        </p>
      </div>

      <form
        className="mt-8 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          event.stopPropagation();
          form.handleSubmit();
        }}
      >
        <form.Field name="workEmail">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="workEmail">Work email</Label>
              <Input
                id="workEmail"
                type="email"
                autoComplete="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={field.state.meta.errors.length > 0}
                className="bg-white"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive" aria-live="polite">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                  className="bg-white pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="size-4" />
                  ) : (
                    <Eye className="size-4" />
                  )}
                </button>
              </div>
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive" aria-live="polite">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Field name="companyName">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="companyName">Company / workspace name</Label>
              <Input
                id="companyName"
                autoComplete="organization"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={field.state.meta.errors.length > 0}
                className="bg-white"
              />
              {field.state.meta.errors.length > 0 && (
                <p className="text-sm text-destructive" aria-live="polite">
                  {String(field.state.meta.errors[0])}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.values, state.isSubmitting] as const}
        >
          {([values, isSubmitting]) => {
            const isValid = signupSchema.safeParse(values).success;

            return (
              <Button
                type="submit"
                className="h-11 w-full text-base"
                size="lg"
                disabled={!isValid || isSubmitting || mutation.isPending}
              >
                {(isSubmitting || mutation.isPending) && (
                  <Loader2 className="size-4 animate-spin" />
                )}
                {isSubmitting || mutation.isPending
                  ? "Starting your trial..."
                  : "Start free trial"}
              </Button>
            );
          }}
        </form.Subscribe>
      </form>

      <p className="mt-5 text-center text-xs leading-relaxed text-muted-foreground">
        By signing up, you agree to our{" "}
        <Link href="#" className="font-semibold text-foreground">
          Terms of use
        </Link>{" "}
        and{" "}
        <Link href="#" className="font-semibold text-foreground">
          Privacy policy
        </Link>
        . We never sell or share your contact lists.
      </p>

      <p className="mt-4 text-center text-sm text-muted-foreground">
        Want a walkthrough first?{" "}
        <Link href="#" className="font-semibold text-foreground">
          Book a demo
        </Link>
      </p>
    </div>
  );
}