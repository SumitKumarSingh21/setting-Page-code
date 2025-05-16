
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, MoreHorizontal, Star } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Define type for booking status
type BookingStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

// Define type for booking
interface Booking {
  id: number;
  garageName: string;
  serviceName: string;
  date: string;
  time: string;
  status: BookingStatus;
  location: string;
  price: number;
  description: string;
  rating?: number; // Optional rating for completed bookings
}

// Dummy data for bookings
const bookings: Booking[] = [
  {
    id: 1,
    garageName: "FastTrack Auto Service",
    serviceName: "Oil Change & Filter Replacement",
    date: "2025-05-20",
    time: "10:00 AM",
    status: "pending",
    location: "123 Main St, Cityville",
    price: 49.99,
    description: "Standard oil change with premium synthetic oil and filter replacement."
  },
  {
    id: 2,
    garageName: "Pro Tuning Workshop",
    serviceName: "ECU Remapping & Performance Tune",
    date: "2025-05-18",
    time: "2:30 PM",
    status: "in-progress",
    location: "456 Tuner Ave, Enginetown",
    price: 299.99,
    description: "Professional ECU remapping for improved performance and fuel efficiency."
  },
  {
    id: 3,
    garageName: "Custom Kings Garage",
    serviceName: "Body Kit Installation",
    date: "2025-04-12",
    time: "9:00 AM",
    status: "completed",
    location: "789 Styling Blvd, Modcity",
    price: 1299.99,
    description: "Complete body kit installation including front splitter, side skirts, and rear diffuser.",
    rating: 5
  },
  {
    id: 4,
    garageName: "Sound Masters",
    serviceName: "Premium Audio System Installation",
    date: "2025-04-05",
    time: "11:00 AM",
    status: "completed",
    location: "321 Beat St, Basstown",
    price: 849.99,
    description: "Complete audio system upgrade with subwoofer, amplifier, and premium speakers.",
    rating: 4
  },
  {
    id: 5,
    garageName: "Wheel Wizards",
    serviceName: "Wheel Alignment & Balancing",
    date: "2025-05-25",
    time: "3:00 PM",
    status: "pending",
    location: "555 Smooth Rd, Driveville",
    price: 89.99,
    description: "Professional wheel alignment and balancing for improved handling and tire longevity."
  }
];

const MyBookings = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Filter bookings based on active tab
  const filteredBookings = activeTab === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === activeTab);
  
  // Get status badge variant
  const getStatusBadgeVariant = (status: BookingStatus) => {
    switch(status) {
      case 'pending': return 'outline';
      case 'in-progress': return 'secondary';
      case 'completed': return 'default';
      case 'cancelled': return 'destructive';
      default: return 'outline';
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Bookings</h1>
        <p className="text-muted-foreground">
          View and manage your service bookings and modification orders.
        </p>
      </div>
      
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">
              All Bookings
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value={activeTab} className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{booking.serviceName}</h3>
                    <p className="text-muted-foreground">{booking.garageName}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusBadgeVariant(booking.status)} className="capitalize">
                      {booking.status.replace('-', ' ')}
                    </Badge>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DialogTrigger asChild onClick={() => setSelectedBooking(booking)}>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                        </DialogTrigger>
                        {booking.status === 'pending' && (
                          <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                        )}
                        {booking.status === 'completed' && !booking.rating && (
                          <DropdownMenuItem>Leave Review</DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{new Date(booking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm">{booking.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="text-sm truncate">{booking.location}</span>
                  </div>
                </div>
                
                {booking.status === 'completed' && booking.rating && (
                  <div className="flex items-center mt-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < booking.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm ml-2">Your rating</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          
          {filteredBookings.length === 0 && (
            <Card>
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground py-8">No {activeTab === 'all' ? '' : activeTab} bookings found.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog>
        <DialogContent className="max-w-md">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBooking.serviceName}</DialogTitle>
                <DialogDescription>{selectedBooking.garageName}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="flex justify-between">
                  <span className="font-medium">Status</span>
                  <Badge variant={getStatusBadgeVariant(selectedBooking.status)} className="capitalize">
                    {selectedBooking.status.replace('-', ' ')}
                  </Badge>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span>{new Date(selectedBooking.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time</span>
                    <span>{selectedBooking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span>{selectedBooking.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price</span>
                    <span>${selectedBooking.price.toFixed(2)}</span>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium mb-2">Service Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedBooking.description}</p>
                </div>
                
                {selectedBooking.status === 'pending' && (
                  <div className="flex justify-end">
                    <Button variant="destructive">Cancel Booking</Button>
                  </div>
                )}
                
                {selectedBooking.status === 'completed' && !selectedBooking.rating && (
                  <div className="flex justify-end">
                    <Button>Leave a Review</Button>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyBookings;
