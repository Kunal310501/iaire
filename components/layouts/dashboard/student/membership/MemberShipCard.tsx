import { COLORS } from "@/utils/enum";
import { Box, Card, Typography, Divider, Stack, Chip } from "@mui/material";
import React from "react";
import moment from "moment";
import {
  glassCardStyle,
  goldGradient,
  navyGradient,
} from "../membership-management/styles";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LockIcon from "@mui/icons-material/Lock";
import StarsIcon from "@mui/icons-material/Stars";
import PaymentsIcon from "@mui/icons-material/Payments";

const formatTierName = (tier: string) => {
  if (!tier) return "N/A";
  return tier
    .split("_")
    .map((word: string) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(" ");
};

const Membershipcard = ({ studentData }: { studentData?: any }) => {
  if (!studentData) return null;

  const {
    membershipCode,
    membershipTier,
    payments,
    tierProgressDetails,
    role,
  } = studentData;
  const progressDetails = role ? tierProgressDetails?.[role] || [] : [];

  // Find active payment
  const activePayment = payments?.find(
    (p: any) => p.status === "SUCCESS" && p.membership?.status === "ACTIVE",
  );

  return (
    <Box sx={{ p: { xs: 1, md: 2 } }}>
      {/* Top Main Card */}
      <Card
        sx={{
          ...glassCardStyle,
          p: { xs: 3, md: 5 },
          background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
          mb: 4,
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box sx={{ flex: 1, textAlign: { xs: "center", md: "left" } }}>
            <Typography
              variant="overline"
              sx={{
                color: "#C5A059",
                fontWeight: 800,
                letterSpacing: "1.5px",
                mb: 1,
                display: "block",
              }}
            >
              Membership Overview
            </Typography>
            <Typography
              variant="h4"
              sx={{ fontWeight: 900, color: "#1A2847", mb: 2 }}
            >
              {formatTierName(membershipTier)}
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent={{ xs: "center", md: "flex-start" }}
              spacing={1.5}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  fontWeight: 600,
                  bgcolor: "rgba(0,0,0,0.04)",
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                }}
              >
                ID: {membershipCode || "N/A"}
              </Typography>
              <Chip
                size="small"
                label="VERIFIED"
                color="success"
                sx={{ fontWeight: 800, fontSize: "10px" }}
              />
            </Stack>
          </Box>
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              background: goldGradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 12px 30px rgba(197, 160, 89, 0.3)",
              position: "relative",
            }}
          >
            <WorkspacePremiumIcon sx={{ color: "#fff", fontSize: 64 }} />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 32,
                height: 32,
                borderRadius: "50%",
                bgcolor: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 3,
              }}
            >
              <StarsIcon sx={{ color: "#C5A059", fontSize: 20 }} />
            </Box>
          </Box>
        </Stack>
      </Card>

      {/* Subscription Card */}
      <Card
        sx={{
          ...glassCardStyle,
          p: 0,
          mb: 4,
          overflow: "hidden",
          background: navyGradient,
        }}
      >
        <Box
          sx={{
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", md: "center" },
            gap: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Box
              sx={{
                p: 2,
                borderRadius: 3,
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <PaymentsIcon sx={{ color: "#C5A059", fontSize: 32 }} />
            </Box>
            <Box>
              <Typography
                variant="overline"
                sx={{
                  color: "rgba(255,255,255,0.7)",
                  fontWeight: 700,
                  letterSpacing: "1px",
                }}
              >
                Current Plan
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#fff", fontWeight: 800, mb: 0.5 }}
              >
                {activePayment ? activePayment.plan?.name : "No Active Plan"}
              </Typography>
              {activePayment && (
                <Typography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Billed {activePayment.plan?.billingCycle.toLowerCase()} •{" "}
                  {activePayment.amount} {activePayment.currency}
                </Typography>
              )}
            </Box>
          </Box>
          {activePayment && (
            <Box
              sx={{
                textAlign: { xs: "left", md: "right" },
                p: 2,
                borderRadius: 3,
                background: "rgba(0,0,0,0.2)",
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.6)",
                  fontWeight: 600,
                  display: "block",
                  mb: 0.5,
                }}
              >
                RENEWS ON
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{ color: "#C5A059", fontWeight: 800 }}
              >
                {moment(activePayment.membership?.expiryDate).format(
                  "MMM DD, YYYY",
                )}
              </Typography>
            </Box>
          )}
        </Box>
      </Card>

      {/* Roadmap Section */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: "#1A2847" }}>
          Advancement Roadmap
        </Typography>
        <Box
          sx={{
            flex: 1,
            height: "1px",
            background:
              "linear-gradient(90deg, rgba(26, 40, 71, 0.1) 0%, rgba(26, 40, 71, 0) 100%)",
          }}
        />
      </Box>

      <Stack spacing={3}>
        {progressDetails.length > 0 ? (
          progressDetails.map((tier: any, idx: number) => {
            const currentTierIdx = progressDetails.findIndex(
              (t: any) => t.membershipTier === membershipTier,
            );

            const isCompleted = idx < currentTierIdx;
            const isActive = idx === currentTierIdx;
            const isLocked = idx > currentTierIdx;

            const isBaseTierActive = currentTierIdx === -1 && idx === 0;
            const actualIsActive = isActive || isBaseTierActive;

            let cardBg = "#ffffff";
            let borderColor = "rgba(0,0,0,0.05)";
            let iconBg = "rgba(0,0,0,0.04)";
            let iconColor = "#9CA3AF";

            if (isCompleted) {
              cardBg = "linear-gradient(145deg, #ffffff 0%, #f0fdf4 100%)";
              borderColor = "rgba(16, 185, 129, 0.2)";
              iconBg = "rgba(16, 185, 129, 0.1)";
              iconColor = "#10B981";
            } else if (actualIsActive) {
              cardBg = "linear-gradient(145deg, #ffffff 0%, #eff6ff 100%)";
              borderColor = "rgba(59, 130, 246, 0.3)";
              iconBg = "rgba(59, 130, 246, 0.1)";
              iconColor = "#3B82F6";
            }

            return (
              <Card
                key={idx}
                sx={{
                  ...glassCardStyle,
                  p: { xs: 2.5, md: 3.5 },
                  background: cardBg,
                  border: `1px solid ${borderColor}`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Status Indicator Line */}
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 4,
                    background: isCompleted
                      ? "#10B981"
                      : actualIsActive
                        ? "#3B82F6"
                        : "#E5E7EB",
                  }}
                />

                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={3}
                  alignItems="flex-start"
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: "16px",
                      background: iconBg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {isCompleted ? (
                      <CheckCircleIcon
                        sx={{ color: iconColor, fontSize: 28 }}
                      />
                    ) : actualIsActive ? (
                      <StarsIcon sx={{ color: iconColor, fontSize: 28 }} />
                    ) : (
                      <LockIcon sx={{ color: iconColor, fontSize: 28 }} />
                    )}
                  </Box>

                  <Box sx={{ flex: 1, width: "100%" }}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      justifyContent="space-between"
                      alignItems={{ xs: "flex-start", md: "center" }}
                      spacing={2}
                      sx={{ mb: 1 }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          color: isCompleted
                            ? "#065F46"
                            : actualIsActive
                              ? "#1E3A8A"
                              : "#4B5563",
                        }}
                      >
                        {formatTierName(tier.membershipTier)}
                      </Typography>
                      <Chip
                        label={
                          isCompleted
                            ? "COMPLETED"
                            : actualIsActive
                              ? "ACTIVE (Current)"
                              : "LOCKED"
                        }
                        size="small"
                        sx={{
                          fontWeight: 800,
                          fontSize: "10px",
                          bgcolor: isCompleted
                            ? "#10B981"
                            : actualIsActive
                              ? "#3B82F6"
                              : "#E5E7EB",
                          color:
                            isCompleted || actualIsActive ? "#fff" : "#6B7280",
                        }}
                      />
                    </Stack>

                    {tier.requirements && tier.requirements.length > 0 && (
                      <Box
                        sx={{
                          mt: 2,
                          pt: 2.5,
                          borderTop: `1px dashed ${borderColor}`,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            fontWeight: 700,
                            color: "text.secondary",
                            mb: 2,
                            display: "block",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px",
                          }}
                        >
                          Requirements to Advance
                        </Typography>
                        <Stack spacing={2}>
                          {tier.requirements.map((req: any, rIdx: number) => {
                            const reqMet = req.current >= req.required;
                            const progressPercent = Math.min(
                              (req.current / req.required) * 100,
                              100,
                            );
                            return (
                              <Box key={rIdx}>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  sx={{ mb: 1 }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: reqMet
                                        ? "text.primary"
                                        : "text.secondary",
                                      fontWeight: reqMet ? 700 : 600,
                                      flex: 1,
                                      pr: 2,
                                    }}
                                  >
                                    {req.description}
                                  </Typography>
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      fontWeight: 800,
                                      color: reqMet
                                        ? "#10B981"
                                        : "text.secondary",
                                      flexShrink: 0,
                                      bgcolor: "rgba(0,0,0,0.04)",
                                      px: 1,
                                      py: 0.5,
                                      borderRadius: 1,
                                    }}
                                  >
                                    {req.current} / {req.required}
                                  </Typography>
                                </Stack>
                                <Box
                                  sx={{
                                    width: "100%",
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: "rgba(0,0,0,0.06)",
                                    overflow: "hidden",
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: `${progressPercent}%`,
                                      height: "100%",
                                      background: reqMet
                                        ? "#10B981"
                                        : goldGradient,
                                      borderRadius: 4,
                                      transition: "width 1s ease-in-out",
                                    }}
                                  />
                                </Box>
                              </Box>
                            );
                          })}
                        </Stack>
                      </Box>
                    )}
                  </Box>
                </Stack>
              </Card>
            );
          })
        ) : (
          <Box
            sx={{
              p: 4,
              textAlign: "center",
              border: "1px dashed rgba(0,0,0,0.1)",
              borderRadius: 3,
            }}
          >
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ fontWeight: 500 }}
            >
              No roadmap details available yet.
            </Typography>
          </Box>
        )}
      </Stack>
    </Box>
  );
};

export default Membershipcard;
