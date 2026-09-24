"use client";
import Breadcrumb from "@/components/widgets/Breadcrumb";
import { useGetInnovationDetails, useUpdateStudentInnovation } from "@/hooks/school/useInnovation";
import { editEducatorInnovationValidationSchema } from "@/utils/validationSchema";
import { Box, Card, CircularProgress, Typography, Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import InnovationForm from "@/components/layouts/dashboard/institution/innovation-management/components/InnovationForm";
import { COLORS } from "@/utils/enum";
import DownloadIcon from "@mui/icons-material/Download";

const EditInnovation = ({ id }: { id: string }) => {
  const { loading, innovationDetails } = useGetInnovationDetails(Number(id));

  const { loading: updateLoading, updateStudentInnovation } = useUpdateStudentInnovation();

  const formik = useFormik({
    initialValues: {
      title: "",
      problemDescription: "",
      solutionDescription: "",
      file: null as File | null,
      isDraft: false,
    },
    enableReinitialize: true,
    validationSchema: editEducatorInnovationValidationSchema,
    onSubmit: (values: any) => {
      updateStudentInnovation(Number(id), values, values.isDraft);
    },
  });

  useEffect(() => {
    if (innovationDetails) {
      const details = innovationDetails as any;
      formik.setValues({
        title: details.title || "",
        problemDescription: details.problemDescription || "",
        solutionDescription: details.solution || "",
        file: null, // Files generally cannot be rehydrated directly
        isDraft: details.status === "DRAFT",
      });
    }
  }, [innovationDetails]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress sx={{ color: COLORS.PRIMARY_NAVY }} />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Card
        sx={{
          p: 4,
          borderRadius: "20px",
          boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.05)",
        }}
      >
        <Breadcrumb
          title="Edit Innovation"
          data={[
            {
              title: "Dashboard",
              href: "/dashboard/student",
            },
            {
              title: "Innovation Management",
              href: "/dashboard/student/innovation-management",
            },
            {
              title: "Edit Innovation",
              href: `/dashboard/student/innovation-management/edit-innovation/${id}`,
            },
          ]}
        />

        <InnovationForm
          formik={formik}
          submitLoading={updateLoading}
          hideTeam={true}
          existingFileName={
            innovationDetails && (innovationDetails as any).attorneyTemplateDownloadUrl
              ? (innovationDetails as any).attomeyFinalTemplate?.split("/").pop() || "Uploaded File"
              : null
          }
          existingFileUrl={
            innovationDetails ? (innovationDetails as any).attorneyTemplateDownloadUrl : null
          }
        />
      </Card>
    </Box>
  );
};

export default EditInnovation;
