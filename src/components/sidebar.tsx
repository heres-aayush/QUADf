"use client"

import { Car, Clock, CreditCard, Home, MapPin, Settings, Star, Users, LogInIcon as Subscription } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface SidebarProps {
  userType: "COMMUTER_SELF" | "COMMUTER_PARENT" | "DRIVER" | "AGENCY"
}

export function Sidebar({ userType }: SidebarProps) {
  const navItems = {
    COMMUTER_SELF: [
      { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "#" },
      { icon: <Clock className="h-5 w-5" />, label: "Upcoming Rides", href: "#" },
      { icon: <MapPin className="h-5 w-5" />, label: "Find a Ride", href: "#" },
      { icon: <Clock className="h-5 w-5" />, label: "Ride History", href: "#" },
      { icon: <Subscription className="h-5 w-5" />, label: "Subscriptions", href: "/subscriptions" },
      { icon: <Settings className="h-5 w-5" />, label: "Profile & Preferences", href: "#" },
    ],
    COMMUTER_PARENT: [
      { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "#" },
      { icon: <Clock className="h-5 w-5" />, label: "Child's Scheduled Rides", href: "#" },
      { icon: <MapPin className="h-5 w-5" />, label: "Book a Ride", href: "#" },
      { icon: <Users className="h-5 w-5" />, label: "Trusted Drivers", href: "#" },
      { icon: <Subscription className="h-5 w-5" />, label: "Subscriptions", href: "/subscriptions" },
      { icon: <Settings className="h-5 w-5" />, label: "Emergency Contacts", href: "#" },
    ],
    DRIVER: [
      { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "#" },
      { icon: <Clock className="h-5 w-5" />, label: "Upcoming Trips", href: "#" },
      { icon: <Users className="h-5 w-5" />, label: "Ride Requests", href: "#" },
      { icon: <CreditCard className="h-5 w-5" />, label: "Earnings", href: "#" },
      { icon: <Star className="h-5 w-5" />, label: "Ratings & Feedback", href: "#" },
      { icon: <Car className="h-5 w-5" />, label: "Car Details", href: "#" },
    ],
    AGENCY: [
      { icon: <Home className="h-5 w-5" />, label: "Dashboard", href: "#" },
      { icon: <Car className="h-5 w-5" />, label: "Fleet Management", href: "#" },
      { icon: <Users className="h-5 w-5" />, label: "Driver Assignments", href: "#" },
      { icon: <MapPin className="h-5 w-5" />, label: "Rides Overview", href: "#" },
      { icon: <CreditCard className="h-5 w-5" />, label: "Earnings & Reports", href: "#" },
      { icon: <Settings className="h-5 w-5" />, label: "Customer Support", href: "#" },
    ],
  }

  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Car className="h-6 w-6 text-primary" />
          <span>RideShare</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          {navItems[userType].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                item.href === "/subscriptions" && window.location.pathname === "/subscriptions"
                  ? "bg-accent text-accent-foreground"
                  : index === 0
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}
