import StudentDashboardLayout from "@/components/layouts/dashboard/student/Index";
import InnovationDetails from "@/components/layouts/dashboard/student/innovation-management/Innovation-Details";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <StudentDashboardLayout>
      <InnovationDetails id={id} />
    </StudentDashboardLayout>
  );
};

export default Page;
