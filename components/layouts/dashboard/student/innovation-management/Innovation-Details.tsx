"use client";
import React from "react";
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Grid,
  Divider,
} from "@mui/material";
import { useGetInnovationDetails } from "@/hooks/school/useInnovation";
import Breadcrumb from "@/components/widgets/Breadcrumb";
import { COLORS } from "@/utils/enum";

import InnovationHeader from "./components/InnovationHeader";
import InnovationContent from "./components/InnovationContent";
import InnovationProjectDetails from "./components/InnovationProjectDetails";

const InnovationDetails = ({ id }: { id: string }) => {
  const { loading, innovationDetails } = useGetInnovationDetails(Number(id));

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress sx={{ color: COLORS.PRIMARY_NAVY }} />
      </Box>
    );
  }

  if (!innovationDetails) {
    return (
      <Box p={3}>
        <Typography>Innovation not found.</Typography>
      </Box>
    );
  }

  const {
    title,
    problemDescription,
    solution,
    status,
    displayId,
    team,
    teamCode,
    mentor,
    assistantMentor,
    members,
    school,
    createdAt,
    attorneyTemplateDownloadUrl,
  } = innovationDetails as any;

  return (
    <Box>
      <Breadcrumb
        title="Innovation Details"
        data={[
          { title: "Dashboard", href: "/dashboard/student" },
          {
            title: "Innovation Management",
            href: "/dashboard/student/innovation-management",
          },
          {
            title: "Details",
            href: `/dashboard/student/innovation-management/innovation-details/${id}`,
          },
        ]}
      />

      <Card
        sx={{
          mt: 3,
          p: 4,
          borderRadius: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        <InnovationHeader
          id={id}
          displayId={displayId}
          title={title}
          createdAt={createdAt}
          status={status}
        />

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <InnovationContent
              problemDescription={problemDescription}
              solution={solution}
              attorneyTemplateDownloadUrl={attorneyTemplateDownloadUrl}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <InnovationProjectDetails
              team={team}
              teamCode={teamCode}
              mentor={mentor}
              assistantMentor={assistantMentor}
              members={members}
              school={school}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default InnovationDetails;
