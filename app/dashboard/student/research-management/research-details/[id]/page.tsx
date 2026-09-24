import StudentDashboardLayout from "@/components/layouts/dashboard/student/Index";
import ResearchDetails from "@/components/layouts/dashboard/student/research-management/Research-Details";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <StudentDashboardLayout>
      <ResearchDetails id={id} />
    </StudentDashboardLayout>
  );
};

export default Page;
