
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Bug, Upload } from 'lucide-react';

// Define problem types
const problemTypes = [
  { value: 'bug', label: 'Bug or Error' },
  { value: 'feature', label: 'Feature Request' },
  { value: 'account', label: 'Account Issue' },
  { value: 'payment', label: 'Payment Problem' },
  { value: 'content', label: 'Inappropriate Content' },
  { value: 'performance', label: 'Performance Issue' },
  { value: 'other', label: 'Other' }
];

const ReportProblem = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reportForm, setReportForm] = useState({
    problemType: '',
    title: '',
    description: '',
    email: '',
    screenshot: null as File | null
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setReportForm(prev => ({ ...prev, problemType: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReportForm(prev => ({ ...prev, screenshot: file }));
      // Create a preview URL for the image
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportForm.problemType) {
      toast({
        title: "Missing information",
        description: "Please select a problem type.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Report submitted",
        description: "Thank you for your report. We'll look into it as soon as possible."
      });
      
      // Reset form
      setReportForm({
        problemType: '',
        title: '',
        description: '',
        email: '',
        screenshot: null
      });
      setPreviewUrl(null);
    }, 1500);
  };

  const handleRemoveScreenshot = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setReportForm(prev => ({ ...prev, screenshot: null }));
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Report a Problem</h1>
        <p className="text-muted-foreground">
          Let us know if you're experiencing any issues with the application.
        </p>
      </div>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Problem Details</CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help us investigate the issue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="problemType">Problem Type</Label>
              <Select value={reportForm.problemType} onValueChange={handleSelectChange}>
                <SelectTrigger id="problemType">
                  <SelectValue placeholder="Select a problem type" />
                </SelectTrigger>
                <SelectContent>
                  {problemTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title"
                name="title"
                placeholder="Brief summary of the issue"
                value={reportForm.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                name="description"
                placeholder="Please describe the issue in detail including any steps to reproduce it"
                rows={5}
                value={reportForm.description}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="Where we can contact you about this report"
                value={reportForm.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="screenshot">Screenshot (Optional)</Label>
              <div className="flex items-center gap-2">
                <Label htmlFor="screenshot" className="cursor-pointer">
                  <div className="bg-muted hover:bg-muted/80 flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors">
                    <Upload className="h-4 w-4" />
                    Upload Image
                  </div>
                  <Input 
                    id="screenshot" 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </Label>
                {reportForm.screenshot && (
                  <span className="text-sm text-muted-foreground flex-1 truncate">
                    {reportForm.screenshot.name}
                  </span>
                )}
                {reportForm.screenshot && (
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="sm"
                    onClick={handleRemoveScreenshot}
                  >
                    Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Accepted formats: JPG, PNG, GIF. Max size: 5MB
              </p>
            </div>
            
            {previewUrl && (
              <div className="border rounded-md overflow-hidden mt-2">
                <img 
                  src={previewUrl} 
                  alt="Screenshot preview" 
                  className="max-h-[300px] mx-auto"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button type="submit" disabled={isSubmitting} className="ml-auto flex items-center gap-2">
              <Bug className="h-4 w-4" />
              {isSubmitting ? "Submitting Report..." : "Submit Report"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ReportProblem;
