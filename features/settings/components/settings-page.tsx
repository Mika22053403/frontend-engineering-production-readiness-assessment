"use client";

import ProfileCard from "./profile-card";
import PreferencesCard from "./preferences-card";
import NotificationsCard from "./notifications-card";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile, preferences and notification settings.
        </p>
      </div>

      <ProfileCard />

      <PreferencesCard />

      <NotificationsCard />
    </div>
  );
}