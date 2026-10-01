import { roboto } from "@/utils/fonts";
import { TRAINING_BATCH_DATA_PROPS } from "@/utils/type";
import {
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { COLORS } from "@/utils/enum";
import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { useSelfNominateTeacher } from "@/hooks/mentor/useNominateTeacher";

const CollapsableTableRow = ({
  item,
  formik,
  selectedBatch,
  setSelectedBatch,
}: {
  item: TRAINING_BATCH_DATA_PROPS;
  formik?: any;
  selectedBatch?: any;
  setSelectedBatch?: any;
}) => {
  const [open, setOpen] = useState(false);

  const { loading, selfNominateTeacher } = useSelfNominateTeacher();

  const handleOpen = () => {
    setOpen(true);
    setSelectedBatch?.(item);
    formik?.resetForm();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNominationTeacher = (id: string | number) => {
    console.log("id", id);
  };

  return (
    <React.Fragment>
      <TableRow>
        <TableCell sx={{ width: 10 }}>
          {open ? (
            <KeyboardArrowUpOutlined
              onClick={handleClose}
              sx={{ cursor: "pointer" }}
            />
          ) : (
            <KeyboardArrowDownOutlined
              onClick={handleOpen}
              sx={{ cursor: "pointer" }}
            />
          )}
        </TableCell>
        <TableCell
          sx={{
            fontSize: 14,
            fontFamily: roboto.style.fontFamily,
            width: 200,
          }}
        >
          {item?.name}
        </TableCell>
        <TableCell sx={{ fontFamily: roboto.style.fontFamily, fontSize: 14 }}>
          {item?.category}
        </TableCell>
        <TableCell sx={{ fontFamily: roboto.style.fontFamily, fontSize: 14 }}>
          {moment(item.startDate).format("Do MMM YYYY")}
        </TableCell>
        <TableCell sx={{ fontFamily: roboto.style.fontFamily, fontSize: 14 }}>
          {moment(item.endDate).format("Do MMM YYYY")}
        </TableCell>
        {item.questions && item.questions.length < 1 && (
          <TableCell>
            <Button
              sx={{
                backgroundColor: COLORS.PRIMARY_NAVY,
                color: COLORS.WHITE,
                fontSize: 12,
                fontWeight: 500,
                textTransform: "none",
              }}
              onClick={() => handleNominationTeacher(item?.id)}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress
                  sx={{ width: 10, height: 10, color: COLORS.BLACK }}
                />
              ) : (
                "Nominate"
              )}
            </Button>
          </TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, paddingY: 2 }}>
              {item?.questions?.map((val: any, i: number) => {
                const fieldId = val.id || String(i);
                return (
                  <Box
                    key={fieldId}
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 2,
                      flexDirection: "column",
                      mt: 2,
                    }}
                  >
                    <Typography
                      sx={{ fontFamily: roboto.style.fontFamily, fontSize: 14 }}
                    >
                      Q{i + 1}. {val.question}
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      minRows={4}
                      placeholder="Write answer here..."
                      name={`answers.${fieldId}`}
                      value={formik?.values?.answers?.[fieldId] || ""}
                      onChange={formik?.handleChange}
                      onBlur={formik?.handleBlur}
                      error={
                        (formik?.submitCount > 0 ||
                          formik?.touched?.answers?.[fieldId]) &&
                        Boolean((formik?.errors?.answers as any)?.[fieldId])
                      }
                      helperText={
                        (formik?.submitCount > 0 ||
                          formik?.touched?.answers?.[fieldId]) &&
                        (formik?.errors?.answers as any)?.[fieldId]
                      }
                    />
                  </Box>
                );
              })}

              {item?.questions && item.questions.length > 0 && (
                <Box sx={{ display: "flex", mt: 3, mb: 1 }}>
                  <Button
                    variant="contained"
                    onClick={() => formik?.submitForm()}
                    sx={{
                      backgroundColor: COLORS.PRIMARY_NAVY,
                      color: COLORS.WHITE,
                      fontFamily: roboto.style.fontFamily,
                      fontWeight: 600,
                      width: "100px",
                      textTransform: "none",
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default CollapsableTableRow;
