"use client"

import { useState } from "react"
import { AlertCircle, Calendar, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
// import { toast } from "@/components/ui/use-toast"

interface SubscriptionManagementProps {
  currentPlan: {
    name: string
    price: string
    billingCycle: string
    nextBillingDate: string
    status: "active" | "canceled" | "paused"
  }
}

export function SubscriptionManagement({ currentPlan }: SubscriptionManagementProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [subscriptionStatus, setSubscriptionStatus] = useState<"active" | "canceled" | "paused">(currentPlan.status)

  const handleCancelSubscription = () => {
    setSubscriptionStatus("canceled")
    setIsDialogOpen(false)

    // toast({
    //   title: "Subscription Canceled",
    //   description: "Your subscription has been canceled and will end on your next billing date.",
    // })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Current Subscription</CardTitle>
        <CardDescription>Manage your carpooling subscription</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Plan</p>
            <p className="text-lg font-semibold">{currentPlan.name}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Price</p>
            <p className="text-lg font-semibold">{currentPlan.price}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Billing Cycle</p>
            <p className="text-lg font-semibold">{currentPlan.billingCycle}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Next Billing Date</p>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              <p className="text-lg font-semibold">{currentPlan.nextBillingDate}</p>
            </div>
          </div>
        </div>

        {subscriptionStatus === "active" && (
          <Alert>
            <Check className="h-4 w-4" />
            <AlertTitle>Active Subscription</AlertTitle>
            <AlertDescription>
              Your subscription is active and will automatically renew on {currentPlan.nextBillingDate}.
            </AlertDescription>
          </Alert>
        )}

        {subscriptionStatus === "canceled" && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Subscription Canceled</AlertTitle>
            <AlertDescription>
              Your subscription has been canceled and will end on {currentPlan.nextBillingDate}.
            </AlertDescription>
          </Alert>
        )}

        {/* {subscriptionStatus === "paused" && (
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Subscription Paused</AlertTitle>
            <AlertDescription>Your subscription is currently paused. You can resume it at any time.</AlertDescription>
          </Alert>
        )} */}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Update Payment Method</Button>

        {subscriptionStatus === "active" && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Cancel Subscription</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cancel Subscription</DialogTitle>
                <DialogDescription>
                  Are you sure you want to cancel your subscription? You will still have access until the end of your
                  current billing period.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Keep Subscription
                </Button>
                <Button variant="destructive" onClick={handleCancelSubscription}>
                  Yes, Cancel
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {subscriptionStatus === "canceled" && (
          <Button
            onClick={() => {
              setSubscriptionStatus("active")
            //   toast({
            //     title: "Subscription Reactivated",
            //     description: "Your subscription has been reactivated.",
            //   })
            }}
          >
            Reactivate Subscription
          </Button>
        )}

        {subscriptionStatus === "paused" && (
          <Button
            onClick={() => {
              setSubscriptionStatus("active")
            //   toast({
            //     title: "Subscription Resumed",
            //     description: "Your subscription has been resumed.",
            //   })
            // 
            }
        }
          >
            Resume Subscription
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
