import React from "react";
import {
  Box,
  Typography,
  Card,
  Grid,
  Stack,
  Chip,
  CircularProgress,
} from "@mui/material";
import {
  CheckCircle,
  MilitaryTech,
  School,
  AutoStories,
  Lightbulb,
} from "@mui/icons-material";
import { roboto, montserrat } from "@/utils/fonts";
import { COLORS } from "@/utils/enum";
import { glassCardStyle, goldGradient, glassBorder } from "./styles";

const formatTierName = (tier: string) => {
  if (!tier) return "Student Member";
  return tier.split('_').map((word: string) => word.charAt(0) + word.slice(1).toLowerCase()).join(' ');
};

const getTierIcon = (tierStr: string) => {
  if (!tierStr) return <School />;
  if (tierStr.includes("SCHOLAR") || tierStr.includes("ASSOCIATE")) return <AutoStories />;
  if (tierStr.includes("FELLOW") && tierStr.includes("STUDENT")) return <MilitaryTech />;
  if (tierStr.includes("FELLOW")) return <Lightbulb />;
  return <School />;
};

interface UpgradeMembershipProps {
  currentTier: string;
  nextTier: string;
  nextTierProgress: number;
  nextTierRequirements: any[];
  tierProgressDetails: any[];
}

const UpgradeMembership: React.FC<UpgradeMembershipProps> = ({
  currentTier,
  nextTier,
  nextTierProgress,
  nextTierRequirements,
  tierProgressDetails,
}) => {
  return (
    <Box sx={{ mt: 3 }}>
      {/* Dynamic Eligibility Dashboard Gauge */}
      <Card
        sx={{
          ...glassCardStyle,
          p: 5,
          background: "linear-gradient(135deg, #fff 0%, #F9F7F5 100%)",
        }}
      >
        <Grid container spacing={5} alignItems="center">
          {/* Left Gauge */}
          <Grid
            size={{ xs: 12, md: 4 }}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderRight: { md: `1.5px solid rgba(0,0,0,0.06)` },
            }}
          >
            <Box sx={{ position: "relative", display: "inline-flex", mb: 3 }}>
              <CircularProgress
                variant="determinate"
                value={100}
                size={146}
                thickness={6}
                sx={{ color: "rgba(0,0,0,0.04)", position: "absolute" }}
              />
              <CircularProgress
                variant="determinate"
                value={nextTierProgress}
                size={146}
                thickness={6}
                sx={{
                  color: "#C5A059",
                  "& .MuiCircularProgress-circle": {
                    strokeLinecap: "round",
                  },
                }}
              />
              <Box
                sx={{
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  position: "absolute",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontFamily: roboto.style.fontFamily,
                    color: COLORS.PRIMARY_NAVY,
                  }}
                >
                  {nextTierProgress}%
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "text.secondary",
                    fontWeight: 700,
                    letterSpacing: "1px",
                  }}
                >
                  ELIGIBLE
                </Typography>
              </Box>
            </Box>

            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 800,
                fontFamily: roboto.style.fontFamily,
                textAlign: "center",
                color: COLORS.PRIMARY_NAVY,
              }}
            >
              {currentTier}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: "#C5A059",
                fontWeight: 700,
                mt: 0.5,
                letterSpacing: "0.5px",
              }}
            >
              Next Rank: {nextTier}
            </Typography>
          </Grid>

          {/* Right Criteria Details */}
          <Grid size={{ xs: 12, md: 8 }} sx={{ pl: { md: 5 } }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontFamily: roboto.style.fontFamily,
                mb: 1,
                color: COLORS.PRIMARY_NAVY,
              }}
            >
              Advancement Tracker
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                mb: 4,
                fontFamily: montserrat.style.fontFamily,
              }}
            >
              Your academic advancement is evaluated dynamically based on
              standard criteria including training completion, submissions,
              and research mentorship.
            </Typography>

            <Stack spacing={3}>
              {nextTierRequirements.length > 0 ? (
                nextTierRequirements.map((req: any, idx: number) => {
                  const isReqMet = req.current >= req.required;
                  return (
                    <Box key={idx}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        sx={{ mb: 1 }}
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 700,
                            fontFamily: montserrat.style.fontFamily,
                          }}
                        >
                          {req.description} ({req.current} / {req.required} Submitted)
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 800,
                            color: isReqMet ? "#10B981" : "#6B7280",
                          }}
                        >
                          {isReqMet ? "Requirement Met" : `${req.required} Required`}
                        </Typography>
                      </Stack>
                      <Box
                        sx={{
                          width: "100%",
                          height: 6,
                          borderRadius: 3,
                          bgcolor: "#E5E7EB",
                          overflow: "hidden",
                        }}
                      >
                        <Box
                          sx={{
                            width: `${Math.min((req.current / req.required) * 100, 100)}%`,
                            height: "100%",
                            background: isReqMet ? goldGradient : "#E5E7EB",
                            borderRadius: 3,
                          }}
                        />
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  You have reached the maximum tier or no specific requirements for the next tier.
                </Typography>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Card>

      {/* Custom Timeline Layout */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 800,
          fontFamily: roboto.style.fontFamily,
          color: COLORS.PRIMARY_NAVY,
          mb: 4,
          mt: 5,
          textAlign: "center",
        }}
      >
        IAIRE Advancement Roadmap
      </Typography>

      <Stack spacing={4} sx={{ position: "relative", px: { xs: 1, md: 3 } }}>
        {tierProgressDetails && tierProgressDetails.length > 0 ? (
          tierProgressDetails.map((step: any, idx: number) => {
            const isMet = (!step.requirements || step.requirements.length === 0) || step.requirements.every((req: any) => req.current >= req.required);
            return (
              <Card
                key={idx}
                sx={{
                  ...glassCardStyle,
                  p: 3.5,
                  border: isMet
                    ? "1px solid rgba(16, 185, 129, 0.2)"
                    : glassBorder,
                  position: "relative",
                }}
              >
                <Grid container spacing={3} alignItems="flex-start">
                  <Grid
                    size={{ xs: 12, sm: 1 }}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Box
                      sx={{
                        width: 52,
                        height: 52,
                        borderRadius: "18px",
                        background: isMet
                          ? goldGradient
                          : "rgba(0, 0, 0, 0.05)",
                        color: isMet ? "#fff" : "rgba(0,0,0,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isMet
                          ? "0 8px 20px rgba(223, 186, 115, 0.3)"
                          : "none",
                      }}
                    >
                      {getTierIcon(step.membershipTier)}
                    </Box>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 11 }}>
                    <Stack spacing={1}>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            fontFamily: roboto.style.fontFamily,
                            color: COLORS.PRIMARY_NAVY,
                          }}
                        >
                          {formatTierName(step.membershipTier)}
                        </Typography>
                        <Chip
                          label={isMet ? "COMPLETED" : "LOCKED"}
                          size="small"
                          color={isMet ? "success" : "default"}
                          sx={{ fontWeight: 800, fontSize: "10px" }}
                        />
                      </Stack>

                      <Box
                        sx={{ pt: 1, borderTop: "1px dashed rgba(0,0,0,0.06)", mt: 2 }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: "text.secondary",
                            mb: 1,
                            display: "block",
                          }}
                        >
                          CRITERIA CHECKLIST:
                        </Typography>
                        <Stack spacing={1}>
                          {step.requirements?.map((req: any, cIdx: number) => {
                            const reqMet = req.current >= req.required;
                            return (
                              <Stack
                                key={cIdx}
                                direction="row"
                                spacing={1.5}
                                alignItems="center"
                              >
                                {reqMet ? (
                                  <CheckCircle
                                    sx={{ color: "#10B981", fontSize: 16 }}
                                  />
                                ) : (
                                  <Box
                                    sx={{
                                      width: 14,
                                      height: 14,
                                      borderRadius: "50%",
                                      border: "2px solid rgba(0,0,0,0.2)",
                                    }}
                                  />
                                )}
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: reqMet
                                      ? "text.primary"
                                      : "text.secondary",
                                    fontWeight: 500,
                                  }}
                                >
                                  {req.description} ({req.current}/{req.required})
                                </Typography>
                              </Stack>
                            );
                          })}
                        </Stack>
                      </Box>
                    </Stack>
                  </Grid>
                </Grid>
              </Card>
            );
          })
        ) : (
          <Typography sx={{ textAlign: "center", mt: 2, color: "text.secondary", fontFamily: montserrat.style.fontFamily }}>
            No tier progress details available.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default UpgradeMembership;
