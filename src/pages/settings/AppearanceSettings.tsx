
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Moon, Sun } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Define types for language and theme
type Language = 'en' | 'hi' | 'ar' | 'es' | 'fr';
type Theme = 'light' | 'dark' | 'system';

interface LanguageOption {
  value: Language;
  label: string;
  flag: string;
}

// Language options
const languages: LanguageOption[] = [
  { value: 'en', label: 'English', flag: '🇺🇸' },
  { value: 'hi', label: 'Hindi', flag: '🇮🇳' },
  { value: 'ar', label: 'Arabic', flag: '🇸🇦' },
  { value: 'es', label: 'Spanish', flag: '🇪🇸' },
  { value: 'fr', label: 'French', flag: '🇫🇷' }
];

const AppearanceSettings = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('system');
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Mock effect for system theme detection
  useEffect(() => {
    const isDarkPreferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (theme === 'system') {
      setIsDarkMode(isDarkPreferred);
      document.documentElement.classList.toggle('dark', isDarkPreferred);
    } else {
      setIsDarkMode(theme === 'dark');
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    
    toast({
      title: "Theme updated",
      description: `Theme preference set to ${newTheme}.`
    });
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    
    toast({
      title: "Language updated",
      description: `Language changed to ${languages.find(l => l.value === newLanguage)?.label}.`
    });
  };

  const toggleDarkMode = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
    setIsDarkMode(!isDarkMode);
    
    toast({
      title: "Theme updated",
      description: `Dark mode ${!isDarkMode ? 'enabled' : 'disabled'}.`
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Appearance Settings</h1>
        <p className="text-muted-foreground">
          Customize your language preference and application theme.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Language Settings</CardTitle>
          <CardDescription>
            Choose your preferred language for the application interface.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="language">Select Language</Label>
            <Select value={language} onValueChange={(value) => handleLanguageChange(value as Language)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    <div className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Theme Settings</CardTitle>
          <CardDescription>
            Choose your preferred application theme and color scheme.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                <Sun className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="theme-toggle">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark theme
                </p>
              </div>
            </div>
            <Switch 
              id="theme-toggle"
              checked={isDarkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>

          <div className="space-y-1">
            <Label>Theme Preference</Label>
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div 
                className={`border rounded-md p-3 cursor-pointer flex flex-col items-center gap-2 hover:border-primary transition-colors ${theme === 'light' ? 'border-primary bg-primary/10' : ''}`}
                onClick={() => handleThemeChange('light')}
              >
                <Sun className="h-6 w-6" />
                <span className="text-sm font-medium">Light</span>
              </div>
              <div 
                className={`border rounded-md p-3 cursor-pointer flex flex-col items-center gap-2 hover:border-primary transition-colors ${theme === 'dark' ? 'border-primary bg-primary/10' : ''}`}
                onClick={() => handleThemeChange('dark')}
              >
                <Moon className="h-6 w-6" />
                <span className="text-sm font-medium">Dark</span>
              </div>
              <div 
                className={`border rounded-md p-3 cursor-pointer flex flex-col items-center gap-2 hover:border-primary transition-colors ${theme === 'system' ? 'border-primary bg-primary/10' : ''}`}
                onClick={() => handleThemeChange('system')}
              >
                <div className="flex">
                  <Sun className="h-6 w-6" />
                  <Moon className="h-6 w-6 -ml-2" />
                </div>
                <span className="text-sm font-medium">System</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
