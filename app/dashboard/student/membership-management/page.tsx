"use client";
import React from "react";
import StudentDashboardLayout from "@/components/layouts/dashboard/student/Index";
import MembershipManagement from "@/components/layouts/dashboard/student/membership-management/Index";
import MembershipManagementLayout from "@/components/layouts/dashboard/student/membership/Index";

const MembershipManagementPage = () => {
  return (
    <StudentDashboardLayout>
      {/* <MembershipManagement /> */}
      <MembershipManagementLayout />
    </StudentDashboardLayout>
  );
};

export default MembershipManagementPage;
