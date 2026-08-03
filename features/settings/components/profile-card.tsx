"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfileCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Full Name</Label>
          <Input defaultValue="John Doe" />
        </div>

        <div className="space-y-2">
          <Label>Email</Label>
          <Input type="email" defaultValue="john@example.com" />
        </div>
      </CardContent>
    </Card>
  );
}
