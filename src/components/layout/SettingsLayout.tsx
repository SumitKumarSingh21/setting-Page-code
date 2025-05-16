
import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Edit, Settings, Shield, Bell, Bookmark, 
  List, Car, Languages, HelpCircle, Bug, LogOut 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

// Type for our settings navigation items
type SettingsNavItem = {
  icon: React.ElementType;
  label: string;
  path: string;
  description?: string;
};

// Define our settings navigation items
const settingsNavItems: SettingsNavItem[] = [
  { 
    icon: Edit, 
    label: 'Edit Profile', 
    path: '/settings/profile',
    description: 'Change your name, bio and profile picture'
  },
  { 
    icon: Settings, 
    label: 'Account Settings', 
    path: '/settings/account',
    description: 'Manage your account details and security'
  },
  { 
    icon: Shield, 
    label: 'Privacy Settings', 
    path: '/settings/privacy',
    description: 'Control who can see your content'
  },
  { 
    icon: Bell, 
    label: 'Notification Settings', 
    path: '/settings/notifications',
    description: 'Choose what alerts you receive'
  },
  { 
    icon: Bookmark, 
    label: 'Saved Posts', 
    path: '/settings/saved',
    description: 'View your bookmarked content'
  },
  { 
    icon: List, 
    label: 'My Bookings', 
    path: '/settings/bookings',
    description: 'Manage your service appointments'
  },
  { 
    icon: Car, 
    label: 'My Garage', 
    path: '/settings/garage',
    description: 'View and manage your vehicles'
  },
  { 
    icon: Languages, 
    label: 'Language & Theme', 
    path: '/settings/appearance',
    description: 'Customize your app experience'
  },
  { 
    icon: HelpCircle, 
    label: 'Help & Support', 
    path: '/settings/help',
    description: 'Get assistance with any issues'
  },
  { 
    icon: Bug, 
    label: 'Report a Problem', 
    path: '/settings/report',
    description: 'Let us know if something isn\'t working'
  },
];

const SettingsLayout = () => {
  const location = useLocation();
  const { toast } = useToast();

  const handleLogout = () => {
    // This would typically include actual logout logic
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    // Redirect to home page after logout
    window.location.href = "/";
  };

  return (
    <div className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 space-y-6">
          <div className="sticky top-6">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <nav className="space-y-1">
              {settingsNavItems.map((item) => (
                <Link 
                  to={item.path} 
                  key={item.path} 
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors hover:bg-muted",
                    location.pathname === item.path && "bg-muted font-medium"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
              <Button 
                variant="ghost" 
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </nav>
          </div>
        </aside>
        
        {/* Main content area */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SettingsLayout;
