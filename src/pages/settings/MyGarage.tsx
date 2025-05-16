
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Settings, Wrench } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

// Define type for vehicle
interface Vehicle {
  id: number;
  name: string;
  make: string;
  model: string;
  year: number;
  image: string;
  lastModified: string;
  modifications: string[];
}

// Dummy data for vehicles
const vehicles: Vehicle[] = [
  {
    id: 1,
    name: "Night Fury",
    make: "Honda",
    model: "Civic Type R",
    year: 2022,
    image: "/placeholder.svg",
    lastModified: "2025-04-28",
    modifications: ["Performance ECU Tune", "Custom Exhaust System", "Carbon Fiber Hood"]
  },
  {
    id: 2,
    name: "Road Warrior",
    make: "Toyota",
    model: "Supra",
    year: 2021,
    image: "/placeholder.svg",
    lastModified: "2025-05-10",
    modifications: ["Wide Body Kit", "Coilover Suspension", "20\" Forged Wheels"]
  },
  {
    id: 3,
    name: "Blue Beast",
    make: "BMW",
    model: "M4",
    year: 2023,
    image: "/placeholder.svg",
    lastModified: "2025-03-15",
    modifications: ["Stage 2 ECU Tune", "Carbon Fiber Diffuser", "Sport Exhaust"]
  }
];

const MyGarage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Garage</h1>
          <p className="text-muted-foreground">
            Manage your vehicles and their modifications.
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add New Vehicle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden">
            <AspectRatio ratio={16/9}>
              <img 
                src={vehicle.image} 
                alt={vehicle.name} 
                className="object-cover w-full h-full"
              />
            </AspectRatio>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{vehicle.name}</CardTitle>
                  <CardDescription>
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-1">
                <p className="text-sm font-medium">Recent Modifications:</p>
                <ul className="text-sm text-muted-foreground space-y-0.5">
                  {vehicle.modifications.slice(0, 3).map((mod, index) => (
                    <li key={index} className="flex gap-2 items-center">
                      <div className="w-1 h-1 bg-primary rounded-full" />
                      {mod}
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-muted-foreground mt-2">
                  Last modified: {new Date(vehicle.lastModified).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full">
                <Button className="flex-1 gap-2">
                  <Wrench className="h-4 w-4" />
                  Customize
                </Button>
                <Button variant="outline" className="flex-1">View Details</Button>
              </div>
            </CardFooter>
          </Card>
        ))}

        {/* Add New Vehicle Card */}
        <Card className="border-dashed flex flex-col items-center justify-center min-h-[300px]">
          <CardContent className="flex flex-col items-center justify-center h-full py-8">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Plus className="h-8 w-8 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl mb-2">Add New Vehicle</CardTitle>
            <CardDescription className="text-center mb-4">
              Add your car details to get personalized modifications and services
            </CardDescription>
            <Button className="flex gap-2 items-center">
              <Plus className="h-4 w-4" />
              Add Vehicle
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyGarage;
