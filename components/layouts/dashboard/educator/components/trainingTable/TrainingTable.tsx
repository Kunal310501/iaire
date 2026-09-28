"use client";
import { TRAINING_TABLE_NOMINATION_HEADER } from "@/utils/constant";
import { roboto } from "@/utils/fonts";
import { TRAINING_BATCH_RESPONSE } from "@/utils/type";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import CollapsableTableRow from "./CollapsableTableRow";

const TrainingTable = ({
  batchData,
  batchLoading,
  formik,
  selectedBatch,
  setSelectedBatch,
}: {
  batchData?: TRAINING_BATCH_RESPONSE;
  batchLoading?: boolean;
  formik?: any;
  selectedBatch?: any;
  setSelectedBatch?: any;
}) => {
  console.log("new BatchData", batchData);

  return (
    <Box>
      <TableContainer>
        <Table stickyHeader>
          <TableRow>
            <TableCell></TableCell>
            {TRAINING_TABLE_NOMINATION_HEADER.map((item, index) => (
              <TableCell
                sx={{
                  fontSize: 16,
                  fontWeight: 600,
                  fontFamily: roboto.style.fontFamily,
                }}
              >
                {item}
              </TableCell>
            ))}
          </TableRow>
          <TableBody>
            {batchData?.data?.map((item, index) => (
              <CollapsableTableRow
                key={index}
                item={item}
                formik={formik}
                selectedBatch={selectedBatch}
                setSelectedBatch={setSelectedBatch}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TrainingTable;
