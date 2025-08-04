import { useContext, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormLabel,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
// Components
import Todo from "./Todo";
// OHTERS
import { useToast } from "../contexts/ToastContext";
import { useTodos, useTodosDispatch } from "../contexts/TodosContext";
export default function TodoList() {
  const [titleInput, settitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [dialogTodo, setDialogTodo] = useState(null);
  const  todos = useTodos();
      const  dispatch  = useTodosDispatch();
  const { showHideToast } = useToast();
  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);
  const noncompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);
  let todosToBeRendered = todos;
  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = noncompletedTodos;
  } else {
    todosToBeRendered = todos;
  }
  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  function handleAddClick() {
    dispatch({ type: "added", payload: { newTitle: titleInput } });
    settitleInput("");
    showHideToast("Added Successfully ");
  }

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }
  // DIALOG
  //Delete Dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDeleteClose = () => {
    setShowDeleteDialog(false);
  };
  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }
  function handleDeleteClick() {
    dispatch({ type: "deleted", payload: dialogTodo });
    showHideToast("Deleted Successfully ");
    handleDeleteClose();
  }
  //Update Dialog
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }
  const handleUpdateClose = () => {
    setShowUpdateDialog(false);
  };

  function handleUpdateClick() {
    dispatch({
      type: "updated",
      payload: dialogTodo,
    });
    setShowUpdateDialog(false);
    showHideToast("Updated successfully");
  }
  const todosJsx = todosToBeRendered.map((t) => {
    return (
      <Todo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });
  return (
    <>
      {/* DELETE MODAL */}
      <Dialog
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure that you want to delete this task"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can not undo the deletion if you choose the (Delete) button.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#b23c17" }} onClick={handleDeleteClose}>
            Close
          </Button>
          <Button
            style={{ color: "#b23c17" }}
            onClick={handleDeleteClick}
            autoFocus
          >
            Yes, Delete it
          </Button>
        </DialogActions>
      </Dialog>
      {/* ========== DELETE MODAL ========== */}
      {/* UPDATE MODAL */}
      <Dialog
        open={showUpdateDialog}
        onClose={handleUpdateClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit task"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Task title"
            fullWidth
            multiline
            variant="standard"
            size="small"
            value={dialogTodo?.title || ""}
            onChange={(event) => {
              setDialogTodo({
                ...dialogTodo,
                title: event.target.value,
              });
            }}
          />
          <FormLabel>Details</FormLabel>
          <TextField
            autoFocus
            margin="dense"
            id="details"
            label="Task details"
            multiline
            fullWidth
            variant="standard"
            size="small"
            value={dialogTodo?.details || ""}
            onChange={(event) => {
              setDialogTodo({
                ...dialogTodo,
                details: event.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "#b23c17" }} onClick={handleUpdateClose}>
            Close
          </Button>
          <Button
            style={{ color: "#b23c17" }}
            onClick={handleUpdateClick}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* ========== UPDATE MODAL ========== */}
      <Container maxWidth="sm" sx={{ marginTop: "10px" }}>
        <Card sx={{ minWidth: 275, maxHeight: "80vh", overflow: "scroll" }}>
          <CardContent>
            <Typography variant="h2">My tasks</Typography>
            <Divider />
            {/* FILTER BUTTONS  */}
            <ToggleButtonGroup
              value={displayedTodosType}
              exclusive
              onChange={changeDisplayedType}
              aria-label="text alignment"
              style={{ marginTop: "30px" }}
              color="primary"
            >
              <ToggleButton
                value="all"
                aria-label="left aligned"
                // onClick={handleAllTasks}
              >
                all
              </ToggleButton>
              <ToggleButton
                value="completed"
                aria-label="centered"
                // onClick={handleDoneTasks}
              >
                done
              </ToggleButton>
              <ToggleButton
                value="non-completed"
                aria-label="right aligned"
                // onClick={handleTodoTasks}
              >
                to do
              </ToggleButton>
            </ToggleButtonGroup>
            {/* ======== FILTER BUTTONS =======  */}

            {/* ALL TODOS */}
            {todosJsx}
            {/* ======== ALL TODOS ======== */}

            {/* INPUT + ADD BUTTON */}
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              <Grid size={8}>
                <TextField
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Task title"
                  variant="outlined"
                  value={titleInput}
                  onChange={(e) => settitleInput(e.target.value)}
                />
              </Grid>
              <Grid size={4}>
                <Button
                  variant="contained"
                  style={{ width: "100%", height: "100%" }}
                  onClick={handleAddClick}
                  disabled={titleInput.length === 0}
                >
                  ADD
                </Button>
              </Grid>
            </Grid>
            {/* ======== INPUT + ADD BUTTON ======== */}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
