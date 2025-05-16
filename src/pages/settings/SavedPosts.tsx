
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bookmark, Heart, MessageSquare, MoreVertical, Share2 } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Dummy data for saved posts
const savedPosts = [
  {
    id: 1,
    type: 'post',
    title: 'Ultimate Guide to Car Modifications',
    image: '/placeholder.svg',
    author: 'Mike Mechanic',
    date: '2 days ago',
    likes: 324,
    comments: 56
  },
  {
    id: 2,
    type: 'post',
    title: 'Top 10 Performance Upgrades Under $1000',
    image: '/placeholder.svg',
    author: 'Tuning Tom',
    date: '1 week ago',
    likes: 812,
    comments: 124
  },
  {
    id: 3,
    type: 'reel',
    title: 'Watch This Engine Transformation',
    image: '/placeholder.svg',
    author: 'Engine Eddie',
    date: '3 days ago',
    likes: 1436,
    comments: 87
  },
  {
    id: 4,
    type: 'reel',
    title: 'Sound Check: Before and After Exhaust Upgrade',
    image: '/placeholder.svg',
    author: 'Sound Sally',
    date: '5 days ago',
    likes: 967,
    comments: 42
  },
  {
    id: 5,
    type: 'customization',
    title: 'My Honda Civic Full Body Kit',
    image: '/placeholder.svg',
    author: 'Custom Carlos',
    date: '1 month ago',
    likes: 2345,
    comments: 187
  },
  {
    id: 6,
    type: 'customization',
    title: 'Muscle Car Restoration Project',
    image: '/placeholder.svg',
    author: 'Restoration Rachel',
    date: '2 weeks ago',
    likes: 1523,
    comments: 94
  }
];

const SavedPosts = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter posts based on active tab
  const filteredPosts = activeTab === 'all' 
    ? savedPosts 
    : savedPosts.filter(post => post.type === activeTab);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Saved Posts</h1>
        <p className="text-muted-foreground">
          View and manage all the content you've saved.
        </p>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">{savedPosts.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="post">
              Posts
              <Badge variant="secondary" className="ml-2">
                {savedPosts.filter(post => post.type === 'post').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="reel">
              Reels
              <Badge variant="secondary" className="ml-2">
                {savedPosts.filter(post => post.type === 'reel').length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="customization">
              Customizations
              <Badge variant="secondary" className="ml-2">
                {savedPosts.filter(post => post.type === 'customization').length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <div className="relative">
                  <AspectRatio ratio={16/9}>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </AspectRatio>
                  <div className="absolute top-2 right-2">
                    <Badge>{post.type}</Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg truncate">{post.title}</h3>
                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>{post.author}</span>
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          <span className="text-sm">{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          <span className="text-sm">{post.comments}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Bookmark className="h-4 w-4 fill-primary" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SavedPosts;
