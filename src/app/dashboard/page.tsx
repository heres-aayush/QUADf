"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/navigation"
import { DashboardLayout } from "@/components/dashboard-layout";
import { CommuterDashboard } from "@/components/commuter-dashboard";
import { ParentDashboard } from "@/components/parent-dashboard";
import { DriverDashboard } from "@/components/driver-dashboard";
import { AgencyDashboard } from "@/components/agency-dashboard";
import { useRouter } from 'next/navigation';

type UserType = "COMMUTER_SELF" | "COMMUTER_PARENT" | "DRIVER" | "AGENCY";

export default function Home() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Get user data from localStorage
      const userData = localStorage.getItem('user');
      if (!userData) {
        router.push('/auth');
        return;
      }

      const parsedData = JSON.parse(userData);
      
      // Check if user is logged in
      if (!parsedData.isLoggedIn) {
        router.push('/auth');
        return;
      }

      // Validate user type
      const storedUserType = parsedData.userType;
      if (!storedUserType || !["COMMUTER_SELF", "COMMUTER_PARENT", "DRIVER", "AGENCY"].includes(storedUserType)) {
        console.error("Invalid user type:", storedUserType);
        localStorage.removeItem('user');
        router.push('/auth');
        return;
      }

      setUserType(storedUserType as UserType);
    } catch (error) {
      console.error("Error accessing user data:", error);
      localStorage.removeItem('user');
      router.push('/auth');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Only render dashboard if we have a valid user type
  if (!userType) {
    return null;
  }

  return (
    <> 
      <Navigation />
      <DashboardLayout userType={userType}>
        {userType === "COMMUTER_SELF" && <CommuterDashboard />}
        {userType === "COMMUTER_PARENT" && <ParentDashboard />}
        {userType === "DRIVER" && <DriverDashboard />}
        {userType === "AGENCY" && <AgencyDashboard />}
      </DashboardLayout>   
    </>
  );
}
