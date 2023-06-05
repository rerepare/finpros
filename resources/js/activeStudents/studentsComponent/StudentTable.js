import React, {useEffect} from "react";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
  } from '@material-ui/core'

import AddIcon from "@material-ui/icons/Add";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import EditIcon from "@material-ui/icons/Edit";
import LastPageIcon from "@material-ui/icons/LastPage";
import DeleteIcon from "@material-ui/icons/Delete";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.modal + 1,
        color: "#fff",
    },
    dialogTitle: {
        textAlign: 'center',
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: "#212121",
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
        wordBreak: "break-word",
    },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
    root: {
        "&:nth-of-type(odd)": {
            backgroundColor: "#eeeeee",
        },
        "&:nth-of-type(even)": {
            backgroundColor: "#bdbdbd",
        },
    },
}))(TableRow);

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    rootDialog: {
        width: "100%",
    },
    heading: {
        fontSize: theme.typography.pxToRem(18),
        fontWeight: theme.typography.fontWeightRegular,
        color: "black",
    },
    table: {
        minWidth: "100%",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 300,
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div
            className={classes.root}
            style={{
                borderBottomLeftRadius: "1vw",
                borderBottomRightRadius: "1vw",
            }}
        >
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
                style={(() => {
                    if (page == 0) {
                        return { color: "#9e9e9e" };
                    } else {
                        return { color: "white" };
                    }
                })()}
            >
                {theme.direction === "rtl" ? (
                    <LastPageIcon />
                ) : (
                    <FirstPageIcon />
                )}
            </IconButton>
            <IconButton
                style={(() => {
                    if (page == 0) {
                        return { color: "#9e9e9e" };
                    } else {
                        return { color: "white" };
                    }
                })()}
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                style={(() => {
                    if (page >= Math.ceil(count / rowsPerPage) - 1) {
                        return { color: "#9e9e9e" };
                    } else {
                        return { color: "white" };
                    }
                })()}
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
            <IconButton
                style={(() => {
                    if (page >= Math.ceil(count / rowsPerPage) - 1) {
                        return { color: "#9e9e9e" };
                    } else {
                        return { color: "white" };
                    }
                })()}
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === "rtl" ? (
                    <FirstPageIcon />
                ) : (
                    <LastPageIcon />
                )}
            </IconButton>
        </div>
    );
}

var datas = [];

export default function StudentTable(props) {
    const { student } = props;
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, student.length - page * rowsPerPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchName, setSearchName] = React.useState("");
    const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const [id, setId] = React.useState("");
    const [studentId, setStudentId] = React.useState("");
    const [schoolId, setSchoolId] = React.useState("");
    const [image, setImage] = React.useState("");
    const [studentName, setStudentName] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [classType, setClassType] = React.useState("");
    const [parentName, setParentName] = React.useState("");
    const [contact, setContact] = React.useState("");
    const [balance, setBalance] = React.useState("");

    const addStudent = (event) => {
        event.preventDefault();

        let data = {
            id: id,
            student_id : studentId,
            school_id: schoolId,
            image: image,
            fullName: studentName,
            gender: gender,
            classType: classType,
            parentName: parentName,
            contact: contact,
            balance: balance,
        };
        console.log(studentId)
        axios.post("/addStudent", data).then(() => {
            window.location.href = "/activeStudents";
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDetailsDialog = (data) => {
        datas = student.filter(x => x.id == data.id)
        console.log(datas[0])
        setOpenDetailsDialog(true);
    };

    const handleCloseDetailsDialog = () => {
        datas = student
        setOpenDetailsDialog(false);
    };

    const handleOpenAddDialog = () => {
        setBalance(0)
        setStudentId(parseInt("STD"+student[0].id+1))
        console.log(studentId)
        setOpenAddDialog(true);
    };
    const handleCloseAddDialog = () => {
        setId("");
        setStudentId("");
        setSchoolId("");
        setImage("");
        setStudentName("");
        setGender("");
        setClassType("");
        setParentName("");
        setContact("");
        setBalance(0);
        setOpenAddDialog(false);
    };
    const handleOpenEditDialog = (data) => {
        setId(data.id);
        setStudentId(data.student_id);
        setSchoolId(data.school_id);
        setImage(data.image);
        setStudentName(data.fullName);
        setGender(data.gender);
        setClassType(data.classType);
        setParentName(data.parentName);
        setContact(data.contact);
        setBalance(data.balance);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        setId("");
        setStudentId("");
        setSchoolId("");
        setImage("");
        setStudentName("");
        setGender("");
        setClassType("");
        setParentName("");
        setContact("");
        setBalance("");
        setOpenEditDialog(false);
    };
    const handleOpenDeleteDialog = (data) => {
        setId(data.id);

        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setId("");
        setOpenDeleteDialog(false);
    };
    const editStudent = (e) => {
        e.preventDefault();

        let data = {
            id: id,
            student_id : studentId,
            school_id: schoolId,
            image: image,
            fullName: studentName,
            gender: gender,
            classType: classType,
            parentName: parentName,
            contact: contact,
            balance: balance,
        };
        axios.post("/editStudent", data).then(() => {
            handleCloseEditDialog();
            window.location.href = "/activeStudents";
        });
    };

    const deleteStudent = (e) => {
        e.preventDefault();

        let data = {
            id: id,
        };
        axios.post("/deleteStudent", data).then(() => {
            handleCloseEditDialog();
            window.location.href = "/activeStudents";
        });
    };

    const Subheader = styled.div`
        display: flex;
        flex-direction: row;
    `;

    return (
        <div>
            <Typography variant="h4">Student Data</Typography>
            <Paper elevation={4} style={{ padding: "25px", minHeight:"80vh" }}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            variant="outlined"
                            onChange={(event) => {
                                setSearchName(event.target.value);
                            }}
                            value={searchName}
                            label="search"
                            fullWidth={true}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <div className="mr-auto">
                            <Button
                                variant="contained"
                                onClick={handleOpenAddDialog}
                                startIcon={<AddIcon />}
                                color="primary"
                                style={{ float: "right" }}>
                                ADD
                            </Button>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Table
                            className={classes.table}
                            aria-label="customized table">
                            <TableHead>
                                <StyledTableRow
                                    style={{
                                        borderTopLeftRadius: "1vw",
                                        borderTopRightRadius: "1vw",
                                    }}
                                >                                   
                                    <StyledTableCell
                                        align="center"
                                        style={{ borderTopLeftRadius: "1vw" }}
                                    >
                                        Student ID
                                    </StyledTableCell>
                                    {/* <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Image
                                    </StyledTableCell> */}
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Full Name
                                    </StyledTableCell>
                                    {/* <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Gender
                                    </StyledTableCell> */}
                                    {/* <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Class Type
                                    </StyledTableCell> */}
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        School Placement
                                    </StyledTableCell>
                                    {/* <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Parent Name
                                    </StyledTableCell> */}
                                    {/* <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Contact
                                    </StyledTableCell> */}
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Balance
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ borderTopRightRadius: "1vw" }}
                                    >
                                        Actions
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? student
                                          .filter((data) => {
                                              if (searchName == "") {
                                                  return data;
                                              } else if (
                                                  data.fullName
                                                      .toLowerCase()
                                                      .includes(
                                                          searchName.toLowerCase()
                                                      )
                                              ) {
                                                  return data;
                                              }
                                          })
                                          .slice(
                                              page * rowsPerPage,
                                              page * rowsPerPage + rowsPerPage
                                          )
                                    : student
                                ).map((data, key) => (
                                    <StyledTableRow key={key}>                                        
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.student_id}
                                        </StyledTableCell>
                                        {/* <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.image}
                                        </StyledTableCell> */}
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.fullName}
                                        </StyledTableCell>
                                        {/* <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.gender}
                                        </StyledTableCell> */}
                                        {/* <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.classType}
                                        </StyledTableCell> */}
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.school_id}
                                        </StyledTableCell>
                                        {/* <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.parentName}
                                        </StyledTableCell>

                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.contact}
                                        </StyledTableCell> */}
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.balance}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            <Button
                                                variant="contained"                                                
                                                style={{
                                                    backgroundColor: "#6EFF33",
                                                    marginBottom:'5px',
                                                    height:"5vh",
                                                    width:"2vw",                                                    
                                                }}
                                                onClick={() => {
                                                    handleOpenDetailsDialog(data);
                                                }}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                variant="contained"                                                
                                                style={{
                                                    backgroundColor: "#6EFF33",
                                                    marginBottom:'5px',
                                                    height:"5vh",
                                                    width:"2vw",                                                    
                                                }}
                                                onClick={() => {
                                                    handleOpenEditDialog(data);
                                                }}
                                            >
                                                <EditIcon />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"                                               
                                                style={{marginBottom:'5px',height:"5vh",
                                                width:"2vw"}}
                                                onClick={() => {
                                                    handleOpenDeleteDialog(data);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}

                                {emptyRows > 0 && (
                                    <TableRow
                                        style={{ height: 33 * emptyRows }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <StyledTableRow
                                    style={{
                                        backgroundColor: "#212121",
                                        borderBottomLeftRadius: "1vw",
                                        borderBottomRightRadius: "1vw",
                                    }}
                                >
                                    <TablePagination
                                        style={{
                                            color: "white",
                                            borderBottomLeftRadius: "1vw",
                                            borderBottomRightRadius: "1vw",
                                            align: "flex-start",
                                        }}
                                        rowsPerPageOptions={[]}
                                        colSpan={9}
                                        count={student.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                "aria-label": "rows per page",
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={
                                            handleChangeRowsPerPage
                                        }
                                        ActionsComponent={
                                            TablePaginationActions
                                        }
                                    />
                                </StyledTableRow>
                            </TableFooter>
                        </Table>
                    </Grid>
                </Grid>
            </Paper>
            {/* ================================= DETAILS STUDENT DIALOG ===============================  */}
            <Dialog onClose={handleCloseDetailsDialog} open={openDetailsDialog} fullWidth={true}>
                <DialogTitle 
                className={classes.dialogTitle }
                >
                    DETAILS STUDENT</DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing ={1}>
                        <Grid item xs = {12}>
                            <div>
                            <Accordion expanded = {true} style = {{width: '100%'}}>
                                {/* <AccordionSummary
                                classes={{ content: classes.content }}
                                >
                                STUDENT PROFILE
                                </AccordionSummary> */}
                                <AccordionDetails>
                                    <Grid container direction='row' alignItems='center' justifyContent="center" spacing={1}>
                                        <Grid item = {6}>
                                            <Card>
                                                <CardContent>
                                                misalnya ini foto
                                                {
                                                    datas.map((data, key) => (
                                                        <image></image>
                                                    ))
                                                }
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item = {6}>
                                            <Card>
                                                <CardContent>
                                                {
                                                    datas.map((data, key) => (
                                                        <div>
                                                            <Typography>
                                                                Student ID : {data.student_id}
                                                            </Typography>
                                                            <Typography>
                                                                School ID : {data.school_id}
                                                            </Typography>
                                                            <Typography>
                                                                Name : {data.fullName}
                                                            </Typography>
                                                            <Typography>
                                                                Gender : {data.gender}
                                                            </Typography>
                                                            <Typography>
                                                                Class Type : {data.classType}
                                                            </Typography>
                                                            <Typography>
                                                                Parent : {data.parentName}
                                                            </Typography>
                                                            <Typography>
                                                                Contact : {data.contact}
                                                            </Typography>
                                                            <Typography>
                                                                Balance : {data.balance}
                                                            </Typography>
                                                        </div>
                                                    ))
                                                }
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>                                
                                </AccordionDetails>
                            </Accordion>
                            </div>
                        </Grid>
                    </Grid>
                    
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseDetailsDialog}
                    >
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ================================= ADD STUDENT DIALOG ===============================  */}
            <Dialog onClose={handleCloseAddDialog} open={openAddDialog}>
                <DialogTitle>ADD  STUDENT</DialogTitle>
                <DialogContent dividers>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                    >
                        <Grid item xs={12}>
                            <TextField
                                label="Student ID"
                                fullWidth="true"
                                variant="outlined"
                                value={studentId}
                                onChange={(event) => {
                                    setStudentId(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="School Placement"
                                fullWidth="true"
                                variant="outlined"
                                value={schoolId}
                                onChange={(event) => {
                                    setSchoolId(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Image"
                                fullWidth="true"
                                variant="outlined"
                                value={image}
                                onChange={(event) => {
                                    setImage(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Student Name"
                                fullWidth="true"
                                variant="outlined"
                                value={studentName}
                                onChange={(event) => {
                                    setStudentName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Gender"
                                fullWidth="true"
                                variant="outlined"
                                value={gender}
                                onChange={(event) => {
                                    setGender(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Class Type"
                                fullWidth="true"
                                variant="outlined"
                                value={classType}
                                onChange={(event) => {
                                    setClassType(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Parent Name"
                                fullWidth="true"
                                variant="outlined"
                                value={parentName}
                                onChange={(event) => {
                                    setParentName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contact"
                                fullWidth="true"
                                variant="outlined"
                                value={contact}
                                onChange={(event) => {
                                    setContact(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Balance"
                                fullWidth="true"
                                variant="outlined"
                                value={balance}
                                onChange={(event) => {
                                    setBalance(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <form method="post" onSubmit={addStudent}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ float: "right" }}
                        >
                            ADD
                        </Button>
                    </form>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseAddDialog}
                    >
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ================================== EDIT STUDENT DIALOG =================================  */}
            <Dialog onClose={handleCloseEditDialog} open={openEditDialog}>
                <DialogTitle>EDIT STUDENT</DialogTitle>
                <DialogContent dividers>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                    >
                        <Grid item xs={12}>
                            <TextField
                                label="Student ID"
                                fullWidth="true"
                                variant="outlined"
                                value={studentId}
                                onChange={(event) => {
                                    setStudentId(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="School Placement"
                                fullWidth="true"
                                variant="outlined"
                                value={schoolId}
                                onChange={(event) => {
                                    setSchoolId(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="image"
                                fullWidth="true"
                                variant="outlined"
                                value={image}
                                onChange={(event) => {
                                    setImage(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Student Name"
                                fullWidth="true"
                                variant="outlined"
                                value={studentName}
                                onChange={(event) => {
                                    setStudentName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="gender"
                                fullWidth="true"
                                variant="outlined"
                                value={gender}
                                onChange={(event) => {
                                    setGender(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Class Type"
                                fullWidth="true"
                                variant="outlined"
                                value={classType}
                                onChange={(event) => {
                                    setClassType(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Parent Name"
                                fullWidth="true"
                                variant="outlined"
                                value={parentName}
                                onChange={(event) => {
                                    setParentName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contact"
                                fullWidth="true"
                                variant="outlined"
                                value={contact}
                                onChange={(event) => {
                                    setContact(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="balance"
                                fullWidth="true"
                                variant="outlined"
                                value={balance}
                                onChange={(event) => {
                                    setBalance(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={editStudent}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ float: "right" }}
                        >
                            EDIT
                        </Button>
                    </form>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseEditDialog}
                    >
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>
            {/* ================================= DELETE STUDENT DIALOG ================================  */}
            <Dialog onClose={handleCloseDeleteDialog} open={openDeleteDialog}>
                <DialogTitle>DELETE STUDENT</DialogTitle>
                <DialogContent dividers>
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                    >
                        <Grid item xs={12}>
                            <Typography>
                                Are you sure you want to delete this student?
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={deleteStudent}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ float: "right" }}
                        >
                            YES
                        </Button>
                    </form>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseDeleteDialog}
                    >
                        NO
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}