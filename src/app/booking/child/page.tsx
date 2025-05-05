"use client"
import Navigation from "@/components/navigation"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Car, Clock, CreditCard, GraduationCap, Info, MapPin, School, Shield, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { BookingChildMap } from "@/components/booking-child-map"

export default function ChildBookingPage() {
    const router = useRouter()
    const [date, setDate] = useState<Date>()
    const [bookingStep, setBookingStep] = useState(1)
    const [rideType, setRideType] = useState("standard")
    const [selectedDriver, setSelectedDriver] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState("card")
    const [pickupLocation, setPickupLocation] = useState("")
    const [destination, setDestination] = useState("")
    
    // Child-specific state
    const [childName, setChildName] = useState("")
    const [childClass, setChildClass] = useState("")
    const [pickupTime, setPickupTime] = useState("")
    const [latestEntryTime, setLatestEntryTime] = useState("")

    const handleNextStep = () => {
        if (bookingStep < 4) {
            setBookingStep(bookingStep + 1)
            window.scrollTo(0, 0)
        } else {
            // Booking complete, redirect to confirmation
            router.push("/booking/confirmation")
        }
    }

    const handlePreviousStep = () => {
        if (bookingStep > 1) {
            setBookingStep(bookingStep - 1)
            window.scrollTo(0, 0)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
            <Navigation />
            <div className="container mx-auto py-8 px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">Book a Ride for Your Child</h1>
                    <p className="text-muted-foreground">Schedule a safe and reliable ride for your child</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <Card className="shadow-md rounded-2xl">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <CardTitle>Booking Details</CardTitle>
                                    <div className="flex items-center gap-2">
                                        <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", 
                                        bookingStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>1</span>
                                        <Separator className="w-8" />
                                        <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", 
                                        bookingStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>2</span>
                                        <Separator className="w-8" />
                                        <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", 
                                        bookingStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>3</span>
                                        <Separator className="w-8" />
                                        <span className={cn("flex h-8 w-8 items-center justify-center rounded-full", 
                                        bookingStep >= 4 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground")}>4</span>
                                    </div>
                                </div>
                                <CardDescription>
                                    {bookingStep === 1 && "Enter your child's details"}
                                    {bookingStep === 2 && "Choose your ride type"}
                                    {bookingStep === 3 && "Select your driver"}
                                    {bookingStep === 4 && "Review and payment"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {bookingStep === 1 && (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="childName">Child's Name</Label>
                                                    <div className="relative">
                                                        <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Input 
                                                            id="childName" 
                                                            placeholder="Enter child's name" 
                                                            className="pl-9" 
                                                            value={childName}
                                                            onChange={(e) => setChildName(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="childClass">Class/Grade</Label>
                                                    <div className="relative">
                                                        <GraduationCap className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Select value={childClass} onValueChange={setChildClass}>
                                                            <SelectTrigger id="childClass" className="pl-9">
                                                                <SelectValue placeholder="Select class" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="nursery">Nursery</SelectItem>
                                                                <SelectItem value="kg">Kindergarten</SelectItem>
                                                                <SelectItem value="1">Class 1</SelectItem>
                                                                <SelectItem value="2">Class 2</SelectItem>
                                                                <SelectItem value="3">Class 3</SelectItem>
                                                                <SelectItem value="4">Class 4</SelectItem>
                                                                <SelectItem value="5">Class 5</SelectItem>
                                                                <SelectItem value="6">Class 6</SelectItem>
                                                                <SelectItem value="7">Class 7</SelectItem>
                                                                <SelectItem value="8">Class 8</SelectItem>
                                                                <SelectItem value="9">Class 9</SelectItem>
                                                                <SelectItem value="10">Class 10</SelectItem>
                                                                <SelectItem value="11">Class 11</SelectItem>
                                                                <SelectItem value="12">Class 12</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="pickup">Pickup Location (Home)</Label>
                                                <div className="relative">
                                                    <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input 
                                                        id="pickup" 
                                                        placeholder="Enter home address" 
                                                        className="pl-9" 
                                                        value={pickupLocation}
                                                        onChange={(e) => setPickupLocation(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="destination">Drop Location (School)</Label>
                                                <div className="relative">
                                                    <School className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                    <Input 
                                                        id="destination" 
                                                        placeholder="Enter school address" 
                                                        className="pl-9" 
                                                        value={destination}
                                                        onChange={(e) => setDestination(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="date">Date</Label>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant="outline"
                                                                className={cn(
                                                                    "w-full justify-start text-left font-normal",
                                                                    !date && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {date ? format(date, "PPP") : "Select date"}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <CalendarComponent
                                                                mode="single"
                                                                selected={date}
                                                                onSelect={setDate}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="pickupTime">Pickup Time</Label>
                                                    <div className="relative">
                                                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Select value={pickupTime} onValueChange={setPickupTime}>
                                                            <SelectTrigger id="pickupTime" className="pl-9">
                                                                <SelectValue placeholder="Select time" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="6:00">6:00 AM</SelectItem>
                                                                <SelectItem value="6:15">6:15 AM</SelectItem>
                                                                <SelectItem value="6:30">6:30 AM</SelectItem>
                                                                <SelectItem value="6:45">6:45 AM</SelectItem>
                                                                <SelectItem value="7:00">7:00 AM</SelectItem>
                                                                <SelectItem value="7:15">7:15 AM</SelectItem>
                                                                <SelectItem value="7:30">7:30 AM</SelectItem>
                                                                <SelectItem value="7:45">7:45 AM</SelectItem>
                                                                <SelectItem value="8:00">8:00 AM</SelectItem>
                                                                <SelectItem value="8:15">8:15 AM</SelectItem>
                                                                <SelectItem value="8:30">8:30 AM</SelectItem>
                                                                <SelectItem value="8:45">8:45 AM</SelectItem>
                                                                <SelectItem value="9:00">9:00 AM</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="latestEntryTime">Latest School Entry Time</Label>
                                                    <div className="relative">
                                                        <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                                        <Select value={latestEntryTime} onValueChange={setLatestEntryTime}>
                                                            <SelectTrigger id="latestEntryTime" className="pl-9">
                                                                <SelectValue placeholder="Select time" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                <SelectItem value="7:30">7:30 AM</SelectItem>
                                                                <SelectItem value="8:00">8:00 AM</SelectItem>
                                                                <SelectItem value="8:30">8:30 AM</SelectItem>
                                                                <SelectItem value="9:00">9:00 AM</SelectItem>
                                                                <SelectItem value="9:30">9:30 AM</SelectItem>
                                                                <SelectItem value="10:00">10:00 AM</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="notes">Special Instructions</Label>
                                                <Textarea id="notes" placeholder="Any special requirements or instructions for your child's ride" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {bookingStep === 2 && (
                                    <div className="space-y-6">
                                        <RadioGroup defaultValue="standard" value={rideType} onValueChange={setRideType}>
                                            <div className="space-y-4">
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="standard" id="standard" />
                                                    <Label htmlFor="standard" className="flex-1 cursor-pointer">
                                                        <Card className={cn("cursor-pointer", rideType === "standard" ? "border-primary" : "")}>
                                                            <CardContent className="p-4">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="bg-primary/10 p-3 rounded-full">
                                                                            <Car className="h-6 w-6 text-primary" />
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="font-medium">Standard</h3>
                                                                            <p className="text-sm text-muted-foreground">Affordable everyday rides</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="font-medium">100.50 Rs</p>
                                                                        <p className="text-sm text-muted-foreground">20 min</p>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="comfort" id="comfort" />
                                                    <Label htmlFor="comfort" className="flex-1 cursor-pointer">
                                                        <Card className={cn("cursor-pointer", rideType === "comfort" ? "border-primary" : "")}>
                                                            <CardContent className="p-4">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="bg-primary/10 p-3 rounded-full">
                                                                            <Car className="h-6 w-6 text-primary" />
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="font-medium">Comfort</h3>
                                                                            <p className="text-sm text-muted-foreground">Newer cars with extra legroom</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="font-medium">187 Rs</p>
                                                                        <p className="text-sm text-muted-foreground">20 min</p>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </Label>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <RadioGroupItem value="premium" id="premium" />
                                                    <Label htmlFor="premium" className="flex-1 cursor-pointer">
                                                        <Card className={cn("cursor-pointer", rideType === "premium" ? "border-primary" : "")}>
                                                            <CardContent className="p-4">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="bg-primary/10 p-3 rounded-full">
                                                                            <Car className="h-6 w-6 text-primary" />
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="font-medium">Premium</h3>
                                                                            <p className="text-sm text-muted-foreground">Luxury vehicles with top-rated drivers</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="font-medium">250 Rs</p>
                                                                        <p className="text-sm text-muted-foreground">20 min</p>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </Label>
                                                </div>
                                            </div>
                                        </RadioGroup>

                                        <div className="space-y-4 pt-4">
                                            <h3 className="font-medium">Child Safety Options</h3>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Label htmlFor="child-seat">Child Seat</Label>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                                                                    <Info className="h-4 w-4" />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                Request a vehicle with an appropriate child seat for your child's age.
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <Switch id="child-seat" />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Label htmlFor="female-driver">Female Driver Preferred</Label>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                                                                    <Info className="h-4 w-4" />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                Request a female driver for your child's ride.
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <Switch id="female-driver" />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Label htmlFor="school-escort">School Escort Service</Label>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full p-0">
                                                                    <Info className="h-4 w-4" />
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent>
                                                                Driver will escort your child to the school entrance.
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>
                                                    <Switch id="school-escort" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {bookingStep === 3 && (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroup defaultValue="standar" value={rideType} onValueChange={setRideType} >
                                                    <RadioGroupItem value="any" id="any" defaultChecked />
                                                    <Label htmlFor="any" className="flex-1 cursor-pointer">
                                                        <Card className="cursor-pointer border-primary">
                                                            <CardContent className="p-4">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex items-center gap-4">
                                                                        <div className="bg-primary/10 p-3 rounded-full">
                                                                            <User className="h-6 w-6 text-primary" />
                                                                        </div>
                                                                        <div>
                                                                            <h3 className="font-medium">Any Available Driver</h3>
                                                                            <p className="text-sm text-muted-foreground">We&apos;ll match you with the best available driver</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </Label>
                                                </RadioGroup>
                                            </div>
                                            <div className="pt-4">
                                                <h3 className="font-medium mb-4">Or choose a trusted driver:</h3>
                                                <div className="space-y-4">
                                                    {[1, 2, 3].map((i) => (
                                                        <Card
                                                            key={i}
                                                            className={cn(
                                                                "cursor-pointer hover:border-primary",
                                                                selectedDriver === i && "border-primary bg-primary/10"
                                                            )}
                                                            onClick={() => setSelectedDriver(i)}
                                                        >
                                                            <CardContent className="p-4">
                                                                <div className="flex justify-between items-center">
                                                                    <div className="flex items-center gap-4">
                                                                        <Avatar className="h-12 w-12">
                                                                            <AvatarImage src="/placeholder.svg" alt="Driver" />
                                                                            <AvatarFallback>{`D${i}`}</AvatarFallback>
                                                                        </Avatar>
                                                                        <div>
                                                                            <h3 className="font-medium">{["Michael Smith", "Sarah Johnson", "Robert Brown"][i-1]}</h3>
                                                                            <div className="flex items-center gap-2">
                                                                                <Badge variant="outline" className="text-xs">4.{8 + i} ★</Badge>
                                                                                <span className="text-xs text-muted-foreground">{100 + i*50}+ rides</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <p className="font-medium">{["Toyota Camry", "Honda Civic", "Ford Escape"][i-1]}</p>
                                                                        <p className="text-xs text-muted-foreground">{["Silver", "Blue", "Black"][i-1]} • {["ABC-1234", "XYZ-5678", "DEF-9012"][i-1]}</p>
                                                                    </div>
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {bookingStep === 4 && (
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <h3 className="font-medium">Child's Ride Summary</h3>
                                            <Card>
                                                <CardContent className="p-4">
                                                    <div className="space-y-4">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center gap-2">
                                                                <User className="h-4 w-4 text-muted-foreground" />
                                                                <span>{childName || "Your Child"}</span>
                                                            </div>
                                                            <Badge>{childClass ? `Class ${childClass}` : "Student"}</Badge>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center gap-2">
                                                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                                                <span>{pickupLocation || "Home Address"}</span>
                                                            </div>
                                                            <Badge>Pickup</Badge>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center gap-2">
                                                                <School className="h-4 w-4 text-muted-foreground" />
                                                                <span>{destination || "School Address"}</span>
                                                            </div>
                                                            <Badge>School</Badge>
                                                        </div>
                                                        <Separator />
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                                <span>{date ? format(date, "PPP") : "Selected Date"}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                                <span>{pickupTime || "Pickup Time"}</span>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex items-center gap-2">
                                                                <Car className="h-4 w-4 text-muted-foreground" />
                                                                <span>{rideType === "standard" ? "Standard" : rideType === "comfort" ? "Comfort" : "Premium"}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Clock className="h-4 w-4 text-muted-foreground" />
                                                                <span>Latest Entry: {latestEntryTime || "School Entry Time"}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            <h3 className="font-medium pt-4">Payment Method</h3>
                                            <RadioGroup defaultValue="card" value={paymentMethod} onValueChange={setPaymentMethod}>
                                                <div className="space-y-4">
                                                    <div className="flex items-center space-x-2">
                                                        <RadioGroupItem value="card" id="card" />
                                                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                                                            <Card className={cn("cursor-pointer", paymentMethod === "card" ? "border-primary" : "")}>
                                                                <CardContent className="p-4">
                                                                    <div className="flex justify-between items-center">
                                                                        <div className="flex items-center gap-4">
                                                                            <div className="bg-primary/10 p-3 rounded-full">
                                                                                <CreditCard className="h-6 w-6 text-primary" />
                                                                            </div>
                                                                            <div>
                                                                                <h3 className="font-medium">Credit Card</h3>
                                                                                <p className="text-sm text-muted-foreground">**** **** **** 4242</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                        </Label>
                                                    </div>
                                                </div>
                                            </RadioGroup>

                                            <div className="pt-4 space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Base fare</span>
                                                    <span className="font-medium">₹100.00</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Child safety fee</span>
                                                    <span className="font-medium">₹25.00</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-muted-foreground">Taxes</span>
                                                    <span className="font-medium">₹15.00</span>
                                                </div>
                                                <Separator />
                                                <div className="flex justify-between font-bold">
                                                    <span>Total</span>
                                                    <span>₹140.00</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                {bookingStep > 1 ? (
                                    <Button variant="outline" onClick={handlePreviousStep}>
                                        Back
                                    </Button>
                                ) : (
                                    <div></div>
                                )}
                                <Button onClick={handleNextStep}>
                                    {bookingStep < 4 ? "Continue" : "Confirm Booking"}
                                </Button>
                            </CardFooter>
                        </Card>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="space-y-6">
                            <Card className="shadow-md rounded-2xl">
                                <CardHeader>
                                    <CardTitle>Route Preview</CardTitle>
                                    <CardDescription>Your child's ride route</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-[300px] rounded-lg overflow-hidden">
                                        <BookingChildMap 
                                            pickupLocation={pickupLocation} 
                                            destination={destination} 
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md rounded-2xl">
                                <CardHeader>
                                    <CardTitle>Ride Details</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Distance</span>
                                            <span className="font-medium">3.5 km</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Estimated Time</span>
                                            <span className="font-medium">15 minutes</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Estimated Arrival</span>
                                            <span className="font-medium">8:15 AM</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="shadow-md rounded-2xl">
                                <CardHeader>
                                    <CardTitle>Safety Features</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <Shield className="h-4 w-4 text-green-600" />
                                            </div>
                                            <span className="text-sm">Background verified drivers</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <Phone className="h-4 w-4 text-green-600" />
                                            </div>
                                            <span className="text-sm">Live ride tracking</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-green-100 p-2 rounded-full">
                                                <School className="h-4 w-4 text-green-600" />
                                            </div>
                                            <span className="text-sm">School notification on arrival</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
