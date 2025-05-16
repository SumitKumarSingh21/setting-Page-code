
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Edit, Settings, Shield, Bell, Bookmark, List, Car, Languages, HelpCircle, Bug } from 'lucide-react';
import SettingsSearch from '@/components/settings/SettingsSearch';

const Index = () => {
  // Dashboard sections
  const settingsSections = [
    { 
      icon: Edit, 
      title: 'Edit Profile', 
      description: 'Update your profile information',
      path: '/settings/profile'
    },
    { 
      icon: Settings, 
      title: 'Account Settings', 
      description: 'Manage security and personal details',
      path: '/settings/account'
    },
    { 
      icon: Shield, 
      title: 'Privacy Settings', 
      description: 'Control who can see your content',
      path: '/settings/privacy'
    },
    { 
      icon: Bell, 
      title: 'Notification Settings', 
      description: 'Choose what alerts you receive',
      path: '/settings/notifications'
    },
    { 
      icon: Bookmark, 
      title: 'Saved Posts', 
      description: 'View your bookmarked content',
      path: '/settings/saved'
    },
    { 
      icon: List, 
      title: 'My Bookings', 
      description: 'Manage service appointments',
      path: '/settings/bookings'
    },
    { 
      icon: Car, 
      title: 'My Garage', 
      description: 'Your vehicles and modifications',
      path: '/settings/garage'
    },
    { 
      icon: Languages, 
      title: 'Language & Theme', 
      description: 'Customize your app experience',
      path: '/settings/appearance'
    },
    { 
      icon: HelpCircle, 
      title: 'Help & Support', 
      description: 'Get assistance with any issues',
      path: '/settings/help'
    },
    { 
      icon: Bug, 
      title: 'Report a Problem', 
      description: 'Let us know about bugs or issues',
      path: '/settings/report'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">CarMod Settings</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Find all your account, privacy, and app settings in one place
        </p>
        
        {/* Settings Search Component */}
        <SettingsSearch />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {settingsSections.map((section) => (
          <Link to={section.path} key={section.title}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="bg-primary/10 p-2 rounded-md">
                  <section.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
