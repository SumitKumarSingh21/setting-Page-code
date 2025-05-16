
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Search } from 'lucide-react';

// Define settings categories and their paths
const settingsOptions = [
  { title: 'Edit Profile', path: '/settings/profile', keywords: ['profile', 'bio', 'name', 'picture'] },
  { title: 'Account Settings', path: '/settings/account', keywords: ['account', 'email', 'password', 'username', 'phone'] },
  { title: 'Privacy Settings', path: '/settings/privacy', keywords: ['privacy', 'private', 'messages', 'activity'] },
  { title: 'Notification Settings', path: '/settings/notifications', keywords: ['notifications', 'email', 'push', 'sms'] },
  { title: 'Saved Posts', path: '/settings/saved', keywords: ['saved', 'bookmarks', 'posts'] },
  { title: 'My Bookings', path: '/settings/bookings', keywords: ['bookings', 'orders', 'service'] },
  { title: 'My Garage', path: '/settings/garage', keywords: ['garage', 'vehicles', 'cars'] },
  { title: 'Appearance Settings', path: '/settings/appearance', keywords: ['appearance', 'theme', 'language', 'dark', 'light'] },
  { title: 'Help & Support', path: '/settings/help', keywords: ['help', 'support', 'faq'] },
  { title: 'Report a Problem', path: '/settings/report', keywords: ['report', 'problem', 'bug', 'issue'] },
];

const SettingsSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<typeof settingsOptions>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.length > 0) {
      const filteredResults = settingsOptions.filter(option => 
        option.title.toLowerCase().includes(term) || 
        option.keywords.some(keyword => keyword.includes(term))
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  };

  const goToSetting = (path: string) => {
    navigate(path);
    setSearchTerm('');
    setResults([]);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative">
        <Input 
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for settings (e.g., profile, theme...)" 
          className="w-full pl-9"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>
      
      {results.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 p-2 max-h-[300px] overflow-y-auto shadow-lg">
          {results.map((result) => (
            <div 
              key={result.path} 
              className="p-2 hover:bg-muted rounded cursor-pointer text-left text-sm md:text-base"
              onClick={() => goToSetting(result.path)}
            >
              {result.title}
            </div>
          ))}
        </Card>
      )}
    </div>
  );
};

export default SettingsSearch;
