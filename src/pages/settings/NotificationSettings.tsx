
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

type NotificationType = 'email' | 'push' | 'sms';

type NotificationSetting = {
  type: string;
  email: boolean;
  push: boolean;
  sms: boolean;
  description: string;
};

const NotificationSettings = () => {
  const { toast } = useToast();
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      type: 'bookings',
      email: true,
      push: true,
      sms: false,
      description: 'Notifications about your service bookings and updates.'
    },
    {
      type: 'comments',
      email: false,
      push: true,
      sms: false,
      description: 'Get notified when someone comments on your posts or replies to you.'
    },
    {
      type: 'likes',
      email: false,
      push: true,
      sms: false,
      description: 'Get notified when someone likes your content.'
    },
    {
      type: 'offers',
      email: true,
      push: false,
      sms: false,
      description: 'Special offers, deals, and promotions from our partners.'
    },
    {
      type: 'system',
      email: true,
      push: true,
      sms: true,
      description: 'Important system notifications and security alerts.'
    }
  ]);

  const handleToggle = (index: number, channel: NotificationType) => {
    const updatedSettings = [...notificationSettings];
    updatedSettings[index] = {
      ...updatedSettings[index],
      [channel]: !updatedSettings[index][channel]
    };
    
    setNotificationSettings(updatedSettings);
    
    // Show toast notification
    toast({
      title: "Notification preference updated",
      description: `${updatedSettings[index].type} notifications via ${channel} ${updatedSettings[index][channel] ? 'enabled' : 'disabled'}.`
    });
  };

  const handleSaveAll = () => {
    // Simulate saving to backend
    toast({
      title: "All notification settings saved",
      description: "Your notification preferences have been updated."
    });
  };

  const toggleAll = (channel: NotificationType, value: boolean) => {
    const updatedSettings = notificationSettings.map(setting => ({
      ...setting,
      [channel]: value
    }));
    
    setNotificationSettings(updatedSettings);
    
    toast({
      title: `All ${channel} notifications ${value ? 'enabled' : 'disabled'}`,
      description: `Successfully updated your ${channel} notification settings.`
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Notification Settings</h1>
        <p className="text-muted-foreground">
          Manage how and when you receive notifications.
        </p>
      </div>

      <Tabs defaultValue="email">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="push">Push</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
          </TabsList>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleSaveAll}
          >
            Save All Changes
          </Button>
        </div>

        <TabsContent value="email" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Email Notifications</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleAll('email', true)}
                  >
                    Enable All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleAll('email', false)}
                  >
                    Disable All
                  </Button>
                </div>
              </div>
              <CardDescription>
                Manage what emails you receive from us.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationSettings.map((setting, index) => (
                <div key={setting.type} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={`${setting.type}-email`} className="capitalize">{setting.type}</Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch 
                    id={`${setting.type}-email`}
                    checked={setting.email}
                    onCheckedChange={() => handleToggle(index, 'email')}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="push" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Push Notifications</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleAll('push', true)}
                  >
                    Enable All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleAll('push', false)}
                  >
                    Disable All
                  </Button>
                </div>
              </div>
              <CardDescription>
                Manage notifications that appear on your device.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationSettings.map((setting, index) => (
                <div key={setting.type} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={`${setting.type}-push`} className="capitalize">{setting.type}</Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch 
                    id={`${setting.type}-push`}
                    checked={setting.push}
                    onCheckedChange={() => handleToggle(index, 'push')}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>SMS Notifications</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => toggleAll('sms', true)}
                  >
                    Enable All
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => toggleAll('sms', false)}
                  >
                    Disable All
                  </Button>
                </div>
              </div>
              <CardDescription>
                Manage text message notifications sent to your phone.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {notificationSettings.map((setting, index) => (
                <div key={setting.type} className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor={`${setting.type}-sms`} className="capitalize">{setting.type}</Label>
                    <p className="text-sm text-muted-foreground">
                      {setting.description}
                    </p>
                  </div>
                  <Switch 
                    id={`${setting.type}-sms`}
                    checked={setting.sms}
                    onCheckedChange={() => handleToggle(index, 'sms')}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationSettings;
