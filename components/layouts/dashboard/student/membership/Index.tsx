import { useSignup } from "@/store/useSignup";
import { Box, Grid } from "@mui/material";
import React from "react";
import Membershipcard from "./MemberShipCard";

const MembershipManagementLayout = () => {
  const { data } = useSignup();

  console.log("studentData", data);
  return (
    <Box>
      <Box>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Membershipcard studentData={data} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default MembershipManagementLayout;
