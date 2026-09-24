import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { COLORS } from "@/utils/enum";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "next/link";

interface InnovationContentProps {
  problemDescription?: string;
  solution?: string;
  attorneyTemplateDownloadUrl?: string;
}

const InnovationContent = ({
  problemDescription,
  solution,
  attorneyTemplateDownloadUrl,
}: InnovationContentProps) => {
  return (
    <>
      <Box mb={4}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 2, color: "#1f2937" }}
        >
          Problem Description
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#4b5563",
            lineHeight: 1.7,
            whiteSpace: "pre-line",
          }}
        >
          {problemDescription || "No description provided."}
        </Typography>
      </Box>
      <Box mb={4}>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, mb: 2, color: "#1f2937" }}
        >
          Proposed Solution
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#4b5563",
            lineHeight: 1.7,
            whiteSpace: "pre-line",
          }}
        >
          {solution || "No solution provided."}
        </Typography>
      </Box>

      {attorneyTemplateDownloadUrl && (
        <Box mb={4}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, mb: 2, color: "#1f2937" }}
          >
            Attachments
          </Typography>
          <Button
            component={Link}
            href={attorneyTemplateDownloadUrl}
            target="_blank"
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{
              borderColor: COLORS.PRIMARY_NAVY,
              color: COLORS.PRIMARY_NAVY,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Download Attorney Template
          </Button>
        </Box>
      )}
    </>
  );
};

export default InnovationContent;
