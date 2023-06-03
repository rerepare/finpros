import React from "react";
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

export default function SchoolTable(props) {
    const { school } = props;
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, school.length - page * rowsPerPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchName, setSearchName] = React.useState("");
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);
    
    const [id, setId] = React.useState("");
    const [schoolId, setSchoolId] = React.useState("");
    const [schoolName, setSchoolName] = React.useState("");
    const [location, setLocation] = React.useState("");

    const addSchool = (event) => {
        event.preventDefault();

        let data = {
            id: id,
            school_id: "SCH"+school[0].id+1,
            name: schoolName,
            location: location,
        };

        axios.post("/addSchool", data).then(() => {
            window.location.href = "/schools";
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenAddDialog = () => {
        setSchoolId(school[0].id+1)
        setOpenAddDialog(true);
    };
    const handleCloseAddDialog = () => {
        setId("");
        setSchoolId("");
        setSchoolName("");
        setLocation("");
        setOpenAddDialog(false);
    };
    const handleOpenEditDialog = (data) => {
        setId(data.id);
        setSchoolId(data.school_id);
        setSchoolName(data.name);
        setLocation(data.location);

        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        setId("");
        setSchoolId("");
        setSchoolName("");
        setLocation("");
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
    const editSchool = (e) => {
        e.preventDefault();

        let data = {
            id: id,
            school_id: schoolId,
            name: schoolName,
            location: location,
        };
        axios.post("/editSchool", data).then(() => {
            handleCloseEditDialog();
            window.location.href = "/schools";
        });
    };

    const deleteSchool = (e) => {
        e.preventDefault();

        let data = {
            id: id,
        };
        axios.post("/deleteSchool", data).then(() => {
            handleCloseEditDialog();
            window.location.href = "/schools";
        });
    };

    const Subheader = styled.div`
        display: flex;
        flex-direction: row;
    `;

    return (
        <div>
            <Typography variant="h4">School Data</Typography>
            <Paper elevation={4} style={{ padding: "25px", height:"80vh" }}>
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
                                style={{ float: "right" }}
                            >
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
                                        ID
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        School ID
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        School Name
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Location
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
                                    ? school
                                          .filter((data) => {
                                              if (searchName == "") {
                                                  return data;
                                              } else if (
                                                  data.name
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
                                    : school
                                ).map((data, key) => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.id}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.school_id}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.name}
                                        </StyledTableCell>

                                        <StyledTableCell
                                            style={{ width: 160 }}
                                            align="center"
                                        >
                                            {data.location}
                                        </StyledTableCell>

                                        <StyledTableCell
                                            style={{ width: 160 }}
                                            align="center"
                                        >
                                            <Button
                                                variant="contained"
                                                startIcon={<EditIcon />}
                                                style={{
                                                    backgroundColor: "#6EFF33",
                                                }}
                                                onClick={() => {
                                                    handleOpenEditDialog(data);
                                                }}
                                            >
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => {
                                                    handleOpenDeleteDialog(
                                                        data
                                                    );
                                                }}
                                            >
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
                                        count={school.length}
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
            <Dialog onClose={handleCloseAddDialog} open={openAddDialog}>
                <DialogTitle>ADD  SCHOOL</DialogTitle>
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
                                label="ID"
                                fullWidth="true"
                                variant="outlined"
                                value={id}
                                onChange={(event) => {
                                    setId(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="School ID"
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
                                label="School Name"
                                fullWidth="true"
                                variant="outlined"
                                value={schoolName}
                                onChange={(event) => {
                                    setSchoolName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Location"
                                fullWidth="true"
                                variant="outlined"
                                value={location}
                                onChange={(event) => {
                                    setLocation(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={addSchool}>
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
            {/* =================================== EDIT SCHOOL DIALOG =================================  */}
            <Dialog onClose={handleCloseEditDialog} open={openEditDialog}>
                <DialogTitle>EDIT SCHOOL</DialogTitle>
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
                                label="ID"
                                fullWidth="true"
                                variant="outlined"
                                value={id}
                                onChange={(event) => {
                                    setId(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="School ID"
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
                                label="School Name"
                                fullWidth="true"
                                variant="outlined"
                                value={schoolName}
                                onChange={(event) => {
                                    setSchoolName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Location"
                                fullWidth="true"
                                variant="outlined"
                                value={location}
                                onChange={(event) => {
                                    setLocation(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={editSchool}>
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
            {/* =================================== DELETE SCHOOL DIALOG =================================  */}
            <Dialog onClose={handleCloseDeleteDialog} open={openDeleteDialog}>
                <DialogTitle>DELETE SCHOOL</DialogTitle>
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
                                Are you sure you want to delete this school?
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={deleteSchool}>
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
