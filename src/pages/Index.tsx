
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
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="text-center mb-6 md:mb-10">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">CarMod Settings</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto mb-6 md:mb-8">
          Find all your account, privacy, and app settings in one place
        </p>
        
        {/* Settings Search Component - Full width on mobile */}
        <div className="px-2 md:px-0">
          <SettingsSearch />
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6 md:mt-8">
        {settingsSections.map((section) => (
          <Link to={section.path} key={section.title}>
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center gap-3 md:gap-4 pb-2">
                <div className="bg-primary/10 p-2 rounded-md">
                  <section.icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base md:text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs md:text-sm">{section.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
