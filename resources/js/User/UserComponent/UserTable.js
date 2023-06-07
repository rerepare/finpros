import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styled from "styled-components";

//MATERIAL UI
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { Table, TableHead, TableBody, TableCell, TableRow, TablePagination, TableFooter } from "@material-ui/core";
import { Paper, Grid, TextField, Typography } from "@material-ui/core";
import { DialogTitle, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import EditIcon from "@material-ui/icons/Edit";
import LastPageIcon from "@material-ui/icons/LastPage";
import DeleteIcon from "@material-ui/icons/Delete";
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, } from '@material-ui/core';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

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

var datas = [];

export default function UserTable(props) {
    const { user } = props;

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, user.length - page * rowsPerPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchName, setSearchName] = React.useState("");
    const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
    const [openRegistDialog, setOpenRegistDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    //GET DATABASE
    const [id, setId] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [image, setImage] = React.useState("");
    const [name, setName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isSuperAdmin, setIsSuperAdmin] = React.useState(true);

    //FUNCTION OPERATIONAL
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleOpenDetailsDialog = (data) => {
        datas = user.filter(x => x.id == data.id)
        console.log(datas[0])
        setOpenDetailsDialog(true);
    };
    const handleCloseDetailsDialog = () => {
        datas = user
        setOpenDetailsDialog(false);
    };

    //FUNCTION REGIST
    const register = (event) => {
        event.preventDefault();

        let data = {
            id: id,
            user_id: "USER"+(user[0].id),
            image: image,
            name: name,
            userName: userName,
            password: password,
            isSuperAdmin: isSuperAdmin,
        };
        console.log(userId)
        axios.post("/registration", data).then(() => {
            window.location.href = "/user";
        });
    };
    const handleOpenRegistDialog = () => {
        setUserId("USER"+(user[0].id));
        setOpenRegistDialog(true);
    };
    const handleCloseRegistDialog = () => {
        setId("");
        setUserId("");
        setImage("");
        setName("");
        setUserName("");
        setPassword("");
        setOpenRegistDialog(false);
    };

    //FUNCTION EDIT
    const editUser = (e) => {
        e.preventDefault();

        let data = {
            id: id,
            user_id: userId,
            image: image,
            name: name,
            userName: userName,
            password: password,
            isSuperAdmin: isSuperAdmin,
        };
        axios.post("/editUser", data).then(() => {
            handleCloseEditDialog();
            window.location.href = "/user";
        });
    };
    const handleOpenEditDialog = (data) => {
        setId(data.id);
        setUserId(data.user_id);
        setImage(data.image);
        setName(data.name);
        setUserName(data.userName);
        setPassword(data.password);

        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        setId("");
        setUserId("");
        setImage("");
        setName("");
        setUserName("");
        setPassword("");
        setOpenEditDialog(false);
    };

    //FUNCTION DELETE
    const deleteUser = (e) => {
        e.preventDefault();

        let data = {
            id: id,
        };
        axios.post("/deleteUser", data).then(() => {
            handleCloseEditDialog();
            window.location.href = "/user";
        });
    };
    const handleOpenDeleteDialog = (data) => {
        setId(data.id);

        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setId("");
        setOpenDeleteDialog(false);
    };
    
    //OTHERS
    const Subheader = styled.div`
        display: flex;
        flex-direction: row;
    `;

    return (
        <div>
            <Typography variant="h4">User Data</Typography>
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
                                onClick={handleOpenRegistDialog}
                                startIcon={<AddIcon />}
                                color="primary"
                                style={{ float: "right" }}>
                                REGIST HERE
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <Table
                            className={classes.table}
                            aria-label="customized table"
                        >
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
                                        User ID
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Full Name
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Level
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
                                    ? user
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
                                    : user
                                ).map((data, key) => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.user_id}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.name}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {(()=>{
                                                if(data.isSuperAdmin == 1)
                                                {
                                                    return(
                                                        <Typography>
                                                            Super Admin
                                                        </Typography>
                                                    )
                                                }
                                                else{
                                                    return(
                                                        <Typography>
                                                            Admin
                                                        </Typography>
                                                    )
                                                }
                                            })()}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            <Button
                                                variant="contained"                                                
                                                style={{
                                                    backgroundColor: "#FFD93D",
                                                    marginBottom:'5px',
                                                    height:"5vh",
                                                    width:"2vw",                                                    
                                                }}
                                                onClick={() => {
                                                    handleOpenDetailsDialog(data);
                                                }}
                                            >
                                                <UnfoldMoreIcon />
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
                                        count={user.length}
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

            {/* ================================= DETAILS USER DIALOG ===============================  */}
            <Dialog onClose={handleCloseDetailsDialog} open={openDetailsDialog} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle }>
                    DETAILS USER
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing ={1}>
                        <Grid item xs = {12}>
                            <div>
                            <Accordion expanded = {true} style = {{width: '100%'}}>
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
                                                                User ID : {data.user_id}
                                                            </Typography>
                                                            <Typography>
                                                                Full Name : {data.name}
                                                            </Typography>
                                                            <Typography>
                                                                Username : {data.userName}
                                                            </Typography>
                                                            <Typography>
                                                                Password : {data.password}
                                                            </Typography>
                                                            <Typography>
                                                                Level : {(()=>{
                                                                    if(data.isSuperAdmin == 1)
                                                                    {
                                                                        return(
                                                                            <Typography>
                                                                                Super Admin
                                                                            </Typography>
                                                                        )
                                                                    }
                                                                    else{
                                                                        return(
                                                                            <Typography>
                                                                                Admin
                                                                            </Typography>
                                                                        )
                                                                    }
                                                                })()}
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

            {/* ================================= REGIST USER DIALOG ===============================  */}
            <Dialog onClose={handleCloseRegistDialog} open={openRegistDialog}>
                <DialogTitle>REGISTER USER</DialogTitle>
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
                                disabled
                                label="User ID"
                                fullWidth="true"
                                variant="outlined"
                                value={userId}
                                onChange={(event) => {
                                    setUserId(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                fullWidth="true"
                                variant="outlined"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
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
                                label="User Name"
                                fullWidth="true"
                                variant="outlined"
                                value={userName}
                                onChange={(event) => {
                                    setUserName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                fullWidth="true"
                                variant="outlined"
                                value={password}
                                type="password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Level"
                                fullWidth="true"
                                variant="outlined"
                                value={isSuperAdmin}
                                type="password"
                                onChange={(event) => {
                                    setIsSuperAdmin(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={register}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            style={{ float: "right" }}
                        >
                            REGIST
                        </Button>
                    </form>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseRegistDialog}
                    >
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>

            {/* =================================== EDIT USER DIALOG =================================  */}
            <Dialog onClose={handleCloseEditDialog} open={openEditDialog}>
                <DialogTitle>EDIT USER</DialogTitle>
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
                                disabled
                                label="User ID"
                                fullWidth="true"
                                variant="outlined"
                                value={userId}
                                onChange={(event) => {
                                    setUserId(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                fullWidth="true"
                                variant="outlined"
                                value={name}
                                onChange={(event) => {
                                    setName(event.target.value);
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
                                label="User Name"
                                fullWidth="true"
                                variant="outlined"
                                value={userName}
                                onChange={(event) => {
                                    setUserName(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                fullWidth="true"
                                variant="outlined"
                                value={password}
                                type="password"
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="isSuperAdmin"
                                fullWidth="true"
                                variant="outlined"
                                value={isSuperAdmin}
                                type="password"
                                onChange={(event) => {
                                    setIsSuperAdmin(event.target.value);
                                }}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={editUser}>
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

            {/* =================================== DELETE USER DIALOG =================================  */}
            <Dialog onClose={handleCloseDeleteDialog} open={openDeleteDialog}>
                <DialogTitle>DELETE USER</DialogTitle>
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
                                Are you sure you want to delete this user?
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={deleteUser}>
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
