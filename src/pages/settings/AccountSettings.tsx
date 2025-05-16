
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const AccountSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [account, setAccount] = useState({
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });
  const [newEmail, setNewEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account updated",
        description: "Your account information has been updated successfully.",
      });
    }, 1000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your new passwords match.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setPasswords({ current: '', new: '', confirm: '' });
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });
    }, 1000);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmail) {
      toast({
        title: "Email required",
        description: "Please enter a new email address.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    // Simulate API request
    setTimeout(() => {
      setIsLoading(false);
      setAccount(prev => ({ ...prev, email: newEmail }));
      setNewEmail('');
      toast({
        title: "Email updated",
        description: "Your email has been updated successfully.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account details, email, and password.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Update your account contact details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="email"
                    value={account.email}
                    readOnly
                    className="bg-muted"
                  />
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" type="button">Change</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Change Email Address</DialogTitle>
                        <DialogDescription>
                          Enter your new email address below.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleEmailSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="newEmail">New Email Address</Label>
                          <Input 
                            id="newEmail"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Enter your new email"
                            type="email"
                            required
                          />
                        </div>
                        <DialogFooter>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Updating..." : "Update Email"}
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={account.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </Card>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your account password to keep it secure.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current">Current Password</Label>
              <Input 
                id="current"
                name="current"
                type="password"
                value={passwords.current}
                onChange={handlePasswordChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input 
                  id="new"
                  name="new"
                  type="password"
                  value={passwords.new}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input 
                  id="confirm"
                  name="confirm"
                  type="password"
                  value={passwords.confirm}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountSettings;
