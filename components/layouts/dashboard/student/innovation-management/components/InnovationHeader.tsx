import React from "react";
import { Box, Typography, Chip, Stack } from "@mui/material";
import { COLORS, USER_STATUS } from "@/utils/enum";
import { roboto } from "@/utils/fonts";
import moment from "moment";

interface InnovationHeaderProps {
  id: string;
  displayId?: string;
  title: string;
  createdAt: string;
  status: string;
}

const InnovationHeader = ({ id, displayId, title, createdAt, status }: InnovationHeaderProps) => {
  return (
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
        label={status?.replace(/_/g, " ")}
        sx={{
          fontWeight: 800,
          fontFamily: roboto.style.fontFamily,
          borderRadius: "6px",
          padding: "4px 8px",
          textTransform: "uppercase",
          bgcolor: "#E5E7EB",
          color: "#374151",
          ...(status?.toUpperCase() === USER_STATUS.ACTIVE && {
            bgcolor: "#ECFDF5",
            color: "#10B981",
          }),
          ...(status?.toUpperCase() === USER_STATUS.PENDING && {
            bgcolor: "#FFFBEB",
            color: "#F59E0B",
          }),
          ...(status?.toUpperCase() === USER_STATUS.INACTIVE && {
            bgcolor: "#FEF2F2",
            color: "#EF4444",
          }),
          ...(status?.toUpperCase() === USER_STATUS.BANNED && {
            bgcolor: "#F9FAFB",
            color: "#6B7280",
          }),
        }}
      />
    </Stack>
  );
};

export default InnovationHeader;
