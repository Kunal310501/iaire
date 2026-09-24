import StudentDashboardLayout from "@/components/layouts/dashboard/student/Index";
import EditInnovation from "@/components/layouts/dashboard/student/innovation-management/Edit-Innovation";
import React from "react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <StudentDashboardLayout>
      <EditInnovation id={id} />
    </StudentDashboardLayout>
  );
};

export default Page;
