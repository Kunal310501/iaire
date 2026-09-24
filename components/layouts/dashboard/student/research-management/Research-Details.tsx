"use client";
import React from "react";
import {
  Box,
  Card,
  Typography,
  CircularProgress,
  Grid,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import Breadcrumb from "@/components/widgets/Breadcrumb";
import { COLORS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import moment from "moment";
import { useGetResearchDetails } from "@/hooks/school/useResearch";

const ResearchDetails = ({ id }: { id: string }) => {
  const { loading, researchDetails } = useGetResearchDetails(Number(id));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress sx={{ color: COLORS.PRIMARY_NAVY }} />
      </Box>
    );
  }

  if (!researchDetails) {
    return (
      <Box p={3}>
        <Typography>Research submission not found.</Typography>
      </Box>
    );
  }

  const {
    title,
    description,
    topic,
    status,
    displayId,
    team,
    school,
    createdAt,
  } = researchDetails as any;

  return (
    <Box>
      <Breadcrumb
        title="Research Details"
        data={[
          { title: "Dashboard", href: "/dashboard/student" },
          {
            title: "Research Management",
            href: "/dashboard/student/research-management",
          },
          {
            title: "Details",
            href: `/dashboard/student/research-management/research-details/${id}`,
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
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={3}
        >
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: COLORS.PRIMARY_NAVY,
                fontWeight: 700,
                letterSpacing: "1px",
              }}
            >
              ID: {displayId || id}
            </Typography>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                color: "#111827",
                mt: 1,
                mb: 1,
                fontFamily: roboto.style.fontFamily,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ fontWeight: 500 }}
            >
              Submitted on {moment(createdAt).format("MMMM Do YYYY")}
            </Typography>
          </Box>
          <Chip
            label={status?.replace(/_/g, " ") || "UNKNOWN"}
            sx={{
              fontWeight: 800,
              fontFamily: roboto.style.fontFamily,
              borderRadius: "6px",
              padding: "4px 8px",
              textTransform: "uppercase",
              bgcolor: "#E5E7EB",
              color: "#374151",
              ...(status?.toUpperCase() === "PUBLISHED" && {
                bgcolor: "#ECFDF5",
                color: "#10B981",
              }),
              ...(status?.toUpperCase() === "PENDING" && {
                bgcolor: "#FFFBEB",
                color: "#F59E0B",
              }),
              ...(status?.toUpperCase() === "NOT_PUBLISHED" && {
                bgcolor: "#FEF2F2",
                color: "#EF4444",
              }),
              ...(status?.toUpperCase() === "ARCHIVED" && {
                bgcolor: "#F9FAFB",
                color: "#6B7280",
              }),
            }}
          />
        </Stack>

        <Divider sx={{ my: 4 }} />

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Box mb={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 2, color: "#1f2937" }}
              >
                Topic
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4b5563",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}
              >
                {topic || "No topic provided."}
              </Typography>
            </Box>
            <Box mb={4}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 2, color: "#1f2937" }}
              >
                Description
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "#4b5563",
                  lineHeight: 1.7,
                  whiteSpace: "pre-line",
                }}
              >
                {description || "No description provided."}
              </Typography>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              variant="outlined"
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: "#f9fafb",
                borderColor: "#e5e7eb",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  color: "#1f2937",
                  pb: 1,
                  borderBottom: "1px solid #e5e7eb",
                }}
              >
                Project Details
              </Typography>

              <Stack spacing={2.5}>
                {team && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{
                        fontWeight: 600,
                        display: "block",
                        mb: 0.5,
                        textTransform: "uppercase",
                      }}
                    >
                      Team
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#111827" }}
                    >
                      {team.title} (Code: {team.teamCode})
                    </Typography>
                  </Box>
                )}

                {school && (
                  <Box>
                    <Typography
                      variant="caption"
                      color="textSecondary"
                      sx={{
                        fontWeight: 600,
                        display: "block",
                        mb: 0.5,
                        textTransform: "uppercase",
                      }}
                    >
                      School
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 700, color: "#111827" }}
                    >
                      {school.name}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ResearchDetails;
