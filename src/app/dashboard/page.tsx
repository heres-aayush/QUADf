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

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      // If no user data, redirect to login
      router.push('/auth');
      return;
    }

    const { userType: storedUserType } = JSON.parse(userData);
    setUserType(storedUserType as UserType);
  }, [router]);

  if (!userType) {
    return null; // or a loading spinner
  }

  return (
    <> 
      <Navigation/>
      <DashboardLayout userType={userType}>
        {userType === "COMMUTER_SELF" && <CommuterDashboard />}
        {userType === "COMMUTER_PARENT" && <ParentDashboard />}
        {userType === "DRIVER" && <DriverDashboard />}
        {userType === "AGENCY" && <AgencyDashboard />}
      </DashboardLayout>   
    </>
  );
}
