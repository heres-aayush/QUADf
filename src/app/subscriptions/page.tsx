"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check, Info } from "lucide-react"
import Navigation from "@/components/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
// import { toast } from "@/components/ui/use-toast"

export default function SubscriptionsPage() {
  const router = useRouter()
  const [userType, setUserType] = useState<"COMMUTER_SELF" | "COMMUTER_PARENT" | null>(null)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [paymentMethod, setPaymentMethod] = useState<string>("credit-card")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Get user data from localStorage
  useState(() => {
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/auth")
      return
    }

    const { userType: storedUserType } = JSON.parse(userData)
    if (storedUserType !== "COMMUTER_SELF" && storedUserType !== "COMMUTER_PARENT") {
      router.push("/")
      return
    }

    setUserType(storedUserType)
  })

  const handleSubscribe = (plan: string) => {
    setSelectedPlan(plan)
    setIsDialogOpen(true)
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsDialogOpen(false)

    // toast({
    //   title: "Subscription Successful!",
    //   description: `You have successfully subscribed to the Rs.{selectedPlan} plan.`,
    // })
  }

  if (!userType) {
    return null // or a loading spinner
  }

  return (
    <>
      <Navigation />
      <DashboardLayout userType={userType}>
        <div className="container mx-auto py-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Carpooling Subscriptions</h1>
            <p className="text-muted-foreground mt-2">Choose a subscription plan that works for your commuting needs</p>
          </div>

          <Tabs defaultValue="monthly" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="monthly" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SubscriptionCard
                  title="Basic"
                  price="Rs.49"
                  description="Perfect for occasional commuters"
                  features={["10 rides per month", "Standard pickup windows", "Basic route options", "Email support"]}
                  onSubscribe={() => handleSubscribe("Basic Monthly")}
                />

                <SubscriptionCard
                  title="Standard"
                  price="Rs.99"
                  description="Great for regular commuters"
                  popular={true}
                  features={[
                    "20 rides per month",
                    "Priority pickup",
                    "Flexible route options",
                    "24/7 phone support",
                    "Ride rescheduling",
                  ]}
                  onSubscribe={() => handleSubscribe("Standard Monthly")}
                />

                <SubscriptionCard
                  title="Premium"
                  price="Rs.149"
                  description="For daily commuters with premium needs"
                  features={[
                    "Unlimited rides",
                    "Premium vehicles",
                    "Custom pickup times",
                    "Priority support",
                    "Ride sharing with family",
                    "Emergency rides",
                  ]}
                  onSubscribe={() => handleSubscribe("Premium Monthly")}
                />
              </div>
            </TabsContent>

            <TabsContent value="quarterly" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SubscriptionCard
                  title="Basic"
                  price="Rs.129"
                  description="Perfect for occasional commuters"
                  features={["10 rides per month", "Standard pickup windows", "Basic route options", "Email support"]}
                  discount="Save 12%"
                  onSubscribe={() => handleSubscribe("Basic Quarterly")}
                />

                <SubscriptionCard
                  title="Standard"
                  price="Rs.269"
                  description="Great for regular commuters"
                  popular={true}
                  features={[
                    "20 rides per month",
                    "Priority pickup",
                    "Flexible route options",
                    "24/7 phone support",
                    "Ride rescheduling",
                  ]}
                  discount="Save 10%"
                  onSubscribe={() => handleSubscribe("Standard Quarterly")}
                />

                <SubscriptionCard
                  title="Premium"
                  price="Rs.399"
                  description="For daily commuters with premium needs"
                  features={[
                    "Unlimited rides",
                    "Premium vehicles",
                    "Custom pickup times",
                    "Priority support",
                    "Ride sharing with family",
                    "Emergency rides",
                  ]}
                  discount="Save 11%"
                  onSubscribe={() => handleSubscribe("Premium Quarterly")}
                />
              </div>
            </TabsContent>

            <TabsContent value="yearly" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <SubscriptionCard
                  title="Basic"
                  price="Rs.469"
                  description="Perfect for occasional commuters"
                  features={["10 rides per month", "Standard pickup windows", "Basic route options", "Email support"]}
                  discount="Save 20%"
                  onSubscribe={() => handleSubscribe("Basic Yearly")}
                />

                <SubscriptionCard
                  title="Standard"
                  price="Rs.949"
                  description="Great for regular commuters"
                  popular={true}
                  features={[
                    "20 rides per month",
                    "Priority pickup",
                    "Flexible route options",
                    "24/7 phone support",
                    "Ride rescheduling",
                  ]}
                  discount="Save 20%"
                  onSubscribe={() => handleSubscribe("Standard Yearly")}
                />

                <SubscriptionCard
                  title="Premium"
                  price="Rs.1,399"
                  description="For daily commuters with premium needs"
                  features={[
                    "Unlimited rides",
                    "Premium vehicles",
                    "Custom pickup times",
                    "Priority support",
                    "Ride sharing with family",
                    "Emergency rides",
                  ]}
                  discount="Save 22%"
                  onSubscribe={() => handleSubscribe("Premium Yearly")}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-12 bg-muted/50 p-6 rounded-lg">
            <div className="flex items-start gap-4">
              <Info className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-medium">Subscription Benefits</h3>
                <p className="text-muted-foreground mt-1">
                  All subscriptions include access to our mobile app, ride tracking, and 24/7 customer service. You can
                  cancel or change your subscription at any time. Subscriptions automatically renew at the end of each
                  billing period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Complete Your Subscription</DialogTitle>
            <DialogDescription>
              You're subscribing to the {selectedPlan} plan. Please enter your payment details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePaymentSubmit}>
            <div className="grid gap-4 py-4">
              <RadioGroup defaultValue="credit-card" value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card">Credit Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>

              {paymentMethod === "credit-card" && (
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name on Card</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <div className="text-center p-4">
                  <p className="text-sm text-muted-foreground">
                    You will be redirected to PayPal to complete your payment.
                  </p>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Subscribe Now
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

interface SubscriptionCardProps {
  title: string
  price: string
  description: string
  features: string[]
  popular?: boolean
  discount?: string
  onSubscribe: () => void
}

function SubscriptionCard({
  title,
  price,
  description,
  features,
  popular = false,
  discount,
  onSubscribe,
}: SubscriptionCardProps) {
  return (
    <Card className={`flex flex-col Rs.{popular ? "border-primary shadow-md" : ""}`}>
      {popular && (
        <div className="absolute top-0 right-0 -mt-2 -mr-2">
          <Badge className="bg-primary text-primary-foreground">Popular</Badge>
        </div>
      )}
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <span>{title}</span>
          <span className="text-3xl font-bold">
            {price}
            <span className="text-sm font-normal text-muted-foreground">/mo</span>
          </span>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
        {discount && (
          <Badge variant="outline" className="mt-2 text-green-600 border-green-200 bg-green-50">
            {discount}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-primary flex-shrink-0 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button onClick={onSubscribe} className="w-full" variant={popular ? "default" : "outline"}>
          Subscribe
        </Button>
      </CardFooter>
    </Card>
  )
}
