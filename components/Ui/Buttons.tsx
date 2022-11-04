import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const SuccessButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.success.main,
  color: "white",
  fontSize: ".7rem",
  "&:hover": {
    backgroundColor: theme.palette.success.dark,
  },
}));

export const OutlineButton = styled(Button)(({ theme }) => ({
  backgroundColor: "transparent",
  color: theme.palette.success.main,
  fontSize: ".7rem",
  "&:hover": {
    backgroundColor: "transparent",
    textDecoration: "underline",
  },
}));