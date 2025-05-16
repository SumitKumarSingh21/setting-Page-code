
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const PrivacySettings = () => {
  const { toast } = useToast();
  const [privacySettings, setPrivacySettings] = useState({
    privateProfile: false,
    restrictMessages: true,
    hideActivity: false,
    hideLocation: true,
    allowTagging: true,
    showOnlineStatus: true,
  });

  const handleToggle = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => {
      const newSettings = { ...prev, [setting]: !prev[setting] };
      
      // Simulate saving to backend
      toast({
        title: "Setting updated",
        description: `Privacy setting has been ${newSettings[setting] ? 'enabled' : 'disabled'}.`,
      });
      
      return newSettings;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Privacy Settings</h1>
        <p className="text-muted-foreground">
          Control who can see your content and how your information is shared.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Privacy</CardTitle>
          <CardDescription>
            Manage how others see and interact with your profile.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="privateProfile">Make profile private</Label>
              <p className="text-sm text-muted-foreground">
                Only approved followers can see your posts and information.
              </p>
            </div>
            <Switch 
              id="privateProfile"
              checked={privacySettings.privateProfile}
              onCheckedChange={() => handleToggle('privateProfile')}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="restrictMessages">Only receive messages from followers</Label>
              <p className="text-sm text-muted-foreground">
                Restrict who can send you direct messages.
              </p>
            </div>
            <Switch 
              id="restrictMessages"
              checked={privacySettings.restrictMessages}
              onCheckedChange={() => handleToggle('restrictMessages')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="hideActivity">Hide activity status</Label>
              <p className="text-sm text-muted-foreground">
                Others won't see when you're active on the platform.
              </p>
            </div>
            <Switch 
              id="hideActivity"
              checked={privacySettings.hideActivity}
              onCheckedChange={() => handleToggle('hideActivity')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="hideLocation">Hide location information</Label>
              <p className="text-sm text-muted-foreground">
                Your location won't be shared with posts or in your profile.
              </p>
            </div>
            <Switch 
              id="hideLocation"
              checked={privacySettings.hideLocation}
              onCheckedChange={() => handleToggle('hideLocation')}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interaction Privacy</CardTitle>
          <CardDescription>
            Control how others can interact with you on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allowTagging">Allow tagging</Label>
              <p className="text-sm text-muted-foreground">
                Others can tag you in their posts and photos.
              </p>
            </div>
            <Switch 
              id="allowTagging"
              checked={privacySettings.allowTagging}
              onCheckedChange={() => handleToggle('allowTagging')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="showOnlineStatus">Show online status</Label>
              <p className="text-sm text-muted-foreground">
                Others can see when you're active on the platform.
              </p>
            </div>
            <Switch 
              id="showOnlineStatus"
              checked={privacySettings.showOnlineStatus}
              onCheckedChange={() => handleToggle('showOnlineStatus')}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacySettings;
