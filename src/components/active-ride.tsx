"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Car, Clock, MapPin, Navigation, Phone, Shield, UserCircle, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookingMap } from "@/components/booking-map"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function ActiveRide() {
  const router = useRouter()
  const [rideStatus, setRideStatus] = useState<"preparing" | "started" | "completed">("preparing")
  const [showAlert, setShowAlert] = useState(false)
  
  const handleStartRide = () => {
    setRideStatus("started")
  }
  
  const handleCompleteRide = () => {
    setShowAlert(true)
  }
  
  const confirmCompleteRide = () => {
    setRideStatus("completed")
    setShowAlert(false)
  }
  
  const handleReturnToDashboard = () => {
    router.push("/")
  }

  return (
    <div className="grid gap-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Live Navigation</span>
              {rideStatus === "started" && (
                <Badge className="bg-green-500">In Progress</Badge>
              )}
              {rideStatus === "completed" && (
                <Badge className="bg-blue-500">Completed</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px] rounded-lg overflow-hidden mb-4">
              <BookingMap 
                pickupLocation="Downtown, Main Street" 
                destination="Suburbs, Oak Avenue" 
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pickup</p>
                  <p className="font-medium">Downtown, Main Street</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Destination</p>
                  <p className="font-medium">Suburbs, Oak Avenue</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button 
              variant="default" 
              className="flex-1"
              onClick={rideStatus === "preparing" ? handleStartRide : handleCompleteRide}
              disabled={rideStatus === "completed"}
            >
              {rideStatus === "preparing" && "Start Ride"}
              {rideStatus === "started" && "Complete Ride"}
              {rideStatus === "completed" && "Ride Completed"}
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleReturnToDashboard}>
              Return to Dashboard
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-6">
          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Passenger Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg" alt="Passenger" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <div className="flex items-center text-yellow-500">
                    <span className="text-sm text-muted-foreground mr-1">4.8</span>
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  Call Passenger
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <UserCircle className="h-4 w-4" />
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-2xl">
            <CardHeader>
              <CardTitle className="text-lg">Ride Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">Estimated Duration</p>
                    <p className="font-medium">45 minutes</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">Distance</p>
                    <p className="font-medium">12.5 km</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">Fare</p>
                    <p className="font-medium">₹450</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Navigation className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">Payment Method</p>
                    <p className="font-medium">Cash</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {rideStatus === "started" && (
            <Card className="shadow-md rounded-2xl border-yellow-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span>Safety Checklist</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Verify passenger identity
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Confirm destination
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Ensure seatbelts are fastened
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Follow traffic rules
                  </li>
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete this ride?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the current ride as completed. Make sure you've reached the destination and the passenger has exited the vehicle.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmCompleteRide}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
