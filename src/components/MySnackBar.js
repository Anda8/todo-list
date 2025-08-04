import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import SnackbarContent from "@mui/material/SnackbarContent";

export default function MySnackBar({open, message}) {


  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} >
        <SnackbarContent
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
          }}
          message={
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <TaskAltIcon />
              {/* Done Success */}
              {message}
            </span>
          }
          action={action}
        />
      </Snackbar>
    </>
  );
}
