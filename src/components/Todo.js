import {
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
// ICONS
import CheckIcon from "@mui/icons-material/Check";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useTodosDispatch } from "../contexts/TodosContext";
import { useToast } from "../contexts/ToastContext";

export default function Todo({ todo,showDelete, showUpdate }) {
    const  dispatch  = useTodosDispatch();
  
  const {showHideToast} = useToast()

  
  // EVENT HANDLER
  function handleCheckClick() {
    dispatch({type:"toggledCompleted", payload:todo})
    showHideToast("edited sucessfully")
  }

  //Delete Dialog
  const handleDeleteOpen = () => {
    showDelete(todo);
  };
  const handleUpdateOpen = () => {
    showUpdate(todo);
  };
  return (
    <>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          backgroundColor: "#283593",
          color: "white",
          marginTop: 2,
        }}
      >
        <CardContent>
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid size={8}>
              <Typography
                variant="h5"
                style={{
                  textAlign: "left",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>
              <Typography variant="h6" style={{ textAlign: "left" }}>
                {todo.details}
              </Typography>
              <Divider />
            </Grid>
            <Grid
              size={4}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
              }}
            >
              {/* ACTION BUTTONS */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  backgroundColor: todo.isCompleted ? "#8bc34a" : "white",
                  border: "3px solid #8bc34a",
                }}
                onClick={handleCheckClick}
              >
                <CheckIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  backgroundColor: "white",
                  border: "3px solid #1769aa",
                }}
                onClick={handleUpdateOpen}
              >
                <EditRoundedIcon />
              </IconButton>
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  backgroundColor: "white",
                  border: "3px solid #b23c17",
                }}
                onClick={handleDeleteOpen}
              >
                <DeleteOutlineRoundedIcon />
              </IconButton>
              {/*  ======== ACTION BUTTONS ======== */}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
