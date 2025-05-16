
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Search, MessageSquare } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HelpSupport = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dummy FAQ data
  const faqs = [
    {
      question: "How do I book a service appointment?",
      answer: "To book a service appointment, navigate to the Services section from the main menu, choose your service type, select your preferred garage, pick an available date and time, and confirm your booking. You can manage all your bookings from the My Bookings section in Settings."
    },
    {
      question: "How can I modify my vehicle preferences?",
      answer: "You can modify your vehicle preferences by going to the My Garage section in Settings. Select the vehicle you want to modify, click on the Customize button, and make your desired changes. You can update everything from basic vehicle information to specific modification preferences."
    },
    {
      question: "How do I save a post for later?",
      answer: "To save a post for later viewing, click the bookmark icon on any post you're interested in. All your saved posts will be available in the Saved Posts section in Settings, where you can filter them by type (Posts, Reels, or Customizations)."
    },
    {
      question: "How do I change my notification preferences?",
      answer: "To change your notification preferences, go to the Notification Settings in your Settings menu. You can toggle notifications for different channels (email, push, SMS) and different types of activities (bookings, comments, likes, offers, etc.)."
    },
    {
      question: "Can I make my profile private?",
      answer: "Yes, you can make your profile private by going to Privacy Settings in your Settings menu. Toggle the 'Make profile private' option to ON. This will ensure that only approved followers can see your posts and information."
    },
    {
      question: "How do I change my password?",
      answer: "To change your password, go to Account Settings in your Settings menu. Scroll to the 'Change Password' section, enter your current password, then your new password, and confirm it. Click the Update Password button to save your changes."
    }
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent",
        description: "We've received your message and will respond shortly."
      });
      setContactForm({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch with our support team.
        </p>
      </div>
      
      <Tabs defaultValue="faq">
        <TabsList className="mb-4">
          <TabsTrigger value="faq">FAQ</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Find quick answers to the most common questions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search for help topics..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>

              {filteredFaqs.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  <Button 
                    variant="link" 
                    className="mt-2"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Support</CardTitle>
              <CardDescription>
                Send us a message and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitContact} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={handleContactChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      value={contactForm.email}
                      onChange={handleContactChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea 
                      id="message"
                      name="message"
                      placeholder="How can we help you?"
                      rows={5}
                      value={contactForm.message}
                      onChange={handleContactChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end pt-2">
                  <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="bg-primary/10 rounded-full p-4">
                  <MessageSquare className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="font-semibold text-lg mb-1">Live Chat Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Get instant help from our support team through live chat.
                  </p>
                  <Button variant="outline" className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    Start Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelpSupport;
