import React from "react";
import { Box, Card, Typography, Stack } from "@mui/material";

interface InnovationProjectDetailsProps {
  team?: any;
  teamCode?: string;
  mentor?: any;
  assistantMentor?: any;
  members?: any[];
  school?: any;
}

const InnovationProjectDetails = ({
  team,
  teamCode,
  mentor,
  assistantMentor,
  members,
  school,
}: InnovationProjectDetailsProps) => {
  return (
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

        {!team && teamCode && (
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
              Team Details
            </Typography>
            <Typography
              variant="body2"
              sx={{ fontWeight: 700, color: "#111827", mb: 1 }}
            >
              Code: {teamCode}
            </Typography>

            {mentor && (
              <Typography variant="body2" sx={{ color: "#374151", mb: 0.5 }}>
                <strong>Mentor:</strong> {mentor.firstName} {mentor.lastName}
              </Typography>
            )}

            {assistantMentor && (
              <Typography variant="body2" sx={{ color: "#374151", mb: 1 }}>
                <strong>Asst. Mentor:</strong> {assistantMentor.firstName}{" "}
                {assistantMentor.lastName}
              </Typography>
            )}

            {members && members.length > 0 && (
              <Box mt={1.5}>
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 600, color: "#111827", mb: 0.5 }}
                >
                  Members:
                </Typography>
                <Stack spacing={0.5}>
                  {members.map((member: any) => (
                    <Typography
                      key={member.id}
                      variant="body2"
                      sx={{ color: "#4b5563" }}
                    >
                      • {member.student?.firstName} {member.student?.lastName}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            )}
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
  );
};

export default InnovationProjectDetails;
