"use client";

import ProfileCard from "./profile-card";
import PreferencesCard from "./preferences-card";
import NotificationsCard from "./notifications-card";

export default function SettingsPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Settings</h1>

        <p className="mt-2 text-muted-foreground">
          Manage your profile, preferences and notification settings.
        </p>
      </div>

      <ProfileCard />

      <PreferencesCard />

      <NotificationsCard />
    </div>
  );
}
