"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function NotificationsCard() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label>Email Notifications</Label>

            <p className="text-sm text-muted-foreground">
              Receive updates about your account.
            </p>
          </div>

          <Switch
            checked={emailNotifications}
            onCheckedChange={setEmailNotifications}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Marketing Emails</Label>

            <p className="text-sm text-muted-foreground">
              Receive product news and offers.
            </p>
          </div>

          <Switch
            checked={marketingEmails}
            onCheckedChange={setMarketingEmails}
          />
        </div>
      </CardContent>
    </Card>
  );
}
