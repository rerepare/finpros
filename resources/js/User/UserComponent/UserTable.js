import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styled from "styled-components";
import axios from "axios";

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
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, } from '@material-ui/core';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Snackbar from '@material-ui/core/Snackbar';

const levels = [
    {
        value: '',
        label: '',
    },
    {
        value: '1',
        label: 'HEADMASTER',
    },
    {
        value: '0',
        label: 'ADMIN',
    },
];

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.modal + 1,
        color: "#fff",
    },
}));

const useStylesUpload = makeStyles((theme) => ({
    img: {
        height: 100,
        display: 'block',
        maxWidth: 200,
        overflow: 'hidden',
        width: '100%',
        borderRadius:"5px",
        boxShadow:"0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)"
    },
    input: {
        display: 'none',
    },
    root: {
        '& > *': {
        margin: theme.spacing(1),
        },
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
    const { userTable } = props;

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, userTable.length - page * rowsPerPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchName, setSearchName] = React.useState("");
    const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
    const [openRegistDialog, setOpenRegistDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };


    //GET DATABASE
    const [id, setId] = React.useState("");
    const [userId, setUserId] = React.useState("");
    const [image, setImage] = React.useState([]);
    const [name, setName] = React.useState("");
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [isSuperAdmin, setIsSuperAdmin] = React.useState(true);

    // UPLOAD IMAGE
    const classesUpload = useStylesUpload();
    const [photoFiles, setPhotoFiles] = React.useState([])
    const [photoPreview, setPhotoPreview] = React.useState([])

    //FUNCTION OPERATIONAL
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleOpenDetailsDialog = (data) => {
        datas = userTable.filter(x => x.id == data.id)
        console.log(datas[0])
        setOpenDetailsDialog(true);
    };
    const handleCloseDetailsDialog = () => {
        datas = userTable
        setOpenDetailsDialog(false);
    };
    
    //FUNCTION REGIST
    const register = (event) => {
        event.preventDefault();
    
        // Check if passwords match
        if (password !== confirmPassword) {
            // Passwords don't match, show error message
            setSnackbarSeverity('error');
            setSnackbarMessage('Passwords do not match. Please make sure your passwords match.');
            setOpenSnackbar(true);
            return;
        }
    
        let data = {
            id: id,
            user_id: "USER" + (userTable[0].id),
            image: photoFiles,
            name: name,
            userName: userName,
            password: password,
            isSuperAdmin: isSuperAdmin,
        };
        
        // Submit the registration data
        axios.post("/registration", data)
        .then(() => {
            handleCloseEditDialog();
            setSnackbarSeverity('success');
            setSnackbarMessage('User added successfully!');
            setOpenSnackbar(true);
            window.location.href = "/user";
        })
        .catch(() => {
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to add user.');
            setOpenSnackbar(true);
        });
    };
     

    const handleOpenRegistDialog = () => {
        setUserId("USER"+(userTable[0].id));
        setOpenRegistDialog(true);
    };
    const handleCloseRegistDialog = () => {
        setId("");
        setUserId("");
        setPhotoFiles([]);
        setPhotoPreview([]);
        setName("");
        setUserName("");
        setPassword("");
        setOpenRegistDialog(false);
    };

    //FUNCTION EDIT
    const editUser = (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            // Passwords don't match, show error message
            setSnackbarSeverity('error');
            setSnackbarMessage('Passwords do not match. Please make sure your passwords match.');
            setOpenSnackbar(true);
            return;
        }
    
        let data = {
            id: id,
            user_id: userId,
            image: photoFiles,
            name: name,
            userName: userName,
            password: password,
            isSuperAdmin: isSuperAdmin,
        };
    
        // Edit the user data
        axios.post("/editUser", data)
        .then(() => {
            handleCloseEditDialog();
            setSnackbarSeverity('success');
            setSnackbarMessage('User edited successfully!');
            setOpenSnackbar(true);
            window.location.href = "/user";
        })
        .catch(() => {
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to edit user.');
            setOpenSnackbar(true);
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
        setPhotoFiles([]);
        setPhotoPreview([]);
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
    
    // Upload Image
    const imageHandleChange = (e) => {        
        if(e.target.files){
            setPhotoFiles([]);
            const fileArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
            setPhotoPreview(fileArray);
            Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
            for (let index = 0; index < e.target.files.length; index++) {                
                const reader = new FileReader();
                const file = e.target.files[index]

                reader.onload = (e) => {
                    setPhotoFiles( previousData => previousData.concat(e.target.result))                    
                };
                reader.readAsDataURL(file)
            }
        }
    }
    const imageResult = (sources) => {
        return sources.map( (data) => {
            return (
                <Grid item xl = {12} lg = {12} md = {12} sm = {12} xs = {12}>
                    <img 
                    src   = {data} 
                    key   = {data} 
                    style = { { width:"100%",height:"250px",objectFit:"contain", margin:'auto' } }
                />
                </Grid>
                
            )
        })
    }
    
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
                    <Grid item xs={12}>
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
                                    ? userTable
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
                                    : userTable
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
                                                            Headmaster
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
                                                    width:"6vw",                                                   
                                                }}
                                                onClick={() => {
                                                    handleOpenDetailsDialog(data);
                                                }}
                                            >
                                                More
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
                                        count={userTable.length}
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
            <Dialog onClose={handleCloseDetailsDialog} open={openDetailsDialog} maxWidth={false} keepMounted>
                <DialogTitle className={classes.dialogTitle }>
                    DETAIL USER
                </DialogTitle>
                
                <DialogContent dividers>
                    <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing={2}>
                        <Grid item xs = {12} sm = {12} lg ={12}>
                            <Accordion expanded = {true} style = {{width: '100%'}}>
                                <AccordionDetails>
                                    <Grid container direction='row' alignItems='center' justifyContent="center" spacing={1}>
                                        <Grid item xs = {3}>
                                            <Card style = {{height:'40vh'}}>
                                                <CardContent>
                                                {
                                                    datas.map((data, key) => (
                                                        <img style = {{width:'100%', height:"200px", objectFit:'contain', margin:'auto' }} src = {"../images/user/" + data.image} />
                                                    ))
                                                }
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs = {9}>
                                            <Card>
                                                <CardContent>
                                                    <Typography>
                                                    {
                                                        datas.map((data, key) => (
                                                            <div>
                                                                <Table>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            ID User :
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {data.user_id}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            Nama User :
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {data.name}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            Username :
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {data.userName}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            Password :
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {data.password}
                                                                        </TableCell>
                                                                    </TableRow>
                                                                    <TableRow>
                                                                        <TableCell>
                                                                            User Level :
                                                                        </TableCell>
                                                                        <TableCell>
                                                                            {(()=>{
                                                                                if(data.isSuperAdmin == 1)
                                                                                {
                                                                                    return(
                                                                                        <Typography>
                                                                                            Headmaster
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
                                                                        </TableCell>
                                                                    </TableRow>
                                                                </Table>
                                                            </div>
                                                        ))
                                                    }
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    </Grid>        
                                </AccordionDetails>
                            </Accordion>
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
            <Dialog onClose={handleCloseRegistDialog} open={openRegistDialog} fullWidth={true} maxWidth={false} keepMounted>
                <DialogTitle>REGISTER USER</DialogTitle>
                <DialogContent dividers>
                    <div>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                        >
                            {/* ======================== USER IMAGE ======================== */}
                            <Grid item xs = {12} sm = {12} lg ={3}>
                                <div>
                                <Accordion expanded = {true} style = {{width: '100%'}}>
                                    <AccordionSummary>USER IMAGE</AccordionSummary>
                                    <AccordionDetails>
                                        <Grid 
                                        container direction = 'row'
                                        alignItems='center'
                                        justifyContent='center'
                                        spacing={2}>
                                            <Grid item xs = {12} alignItems='center'
                                            justifyContent='center'>                                                
                                                <Grid 
                                                container direction = 'row'
                                                alignItems='center'
                                                justifyContent='center'>
                                                    <Card style = {{height:'40vh', width:'30vh'}}>
                                                            <Grid 
                                                                container direction = 'row'
                                                                alignItems='center'
                                                                justifyContent='center'>
                                                                    {imageResult(photoPreview)}
                                                            </Grid>
                                                    </Card>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs = {12}>
                                                <div style={{ '> *': { margin: '1vw' } }}>
                                                    <input 
                                                        accept = "image/*"
                                                        className = {classesUpload.input}
                                                        id = "contained-button-file"
                                                        type = "file"
                                                        onChange={(event) => {imageHandleChange(event)}}
                                                        name = "photo[]"
                                                    />
                                                    <label htmlFor="contained-button-file" style = {{width : "100%"}}>
                                                        <Button
                                                            variant = "contained"
                                                            color = "primary"
                                                            component = "span"
                                                            style = {{ width : "100%", marginTop : "15px", float:'center'}}
                                                        >
                                                            CHOOSE IMAGE
                                                        </Button>
                                                    </label>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </AccordionDetails>
                                </Accordion>
                                </div>
                            </Grid>
                            {/* ======================== FORM ========================== */}
                            <Grid item xs={12} sm = {12} lg ={9}>
                                <AccordionSummary>FORM</AccordionSummary>
                                <AccordionDetails>
                                    <Grid 
                                    container direction = 'row' alignItems='center' justifyContent='center' spacing = {3}>
                                        <Grid item xs={2}>
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
                                        <Grid item xs={5}>
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
                                        <Grid item xs={5}>
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
                                        <Grid item xs={4}>
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
<Grid item xs={4}>
    <TextField
        label="Confirm Password"
        fullWidth="true"
        variant="outlined"
        value={confirmPassword}
        type="password"
        onChange={(event) => {
            setConfirmPassword(event.target.value);
        }}
    />
</Grid>

                                        <Grid item xs={4}>
                                            <TextField
                                                select
                                                label="Level"
                                                value={isSuperAdmin}
                                                onChange={(event) => {
                                                    setIsSuperAdmin(event.target.value);
                                                }}
                                                helperText="Please select user level"
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                fullWidth="true"
                                                variant="outlined">
                                                    {levels.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                    {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Grid>
                        </Grid>
                    </div>
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
                        <Snackbar
                        open={openSnackbar}
                        autoHideDuration={2500}
                        onClose={handleSnackbarClose}
                        message={snackbarMessage}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        ContentProps={{
                            style: {
                            backgroundColor: snackbarSeverity === 'error' ? '#f44336' : '#4caf50',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            },
                        }}
                        />
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
            <Dialog onClose={handleCloseEditDialog} open={openEditDialog} fullWidth={true} maxWidth={false} keepMounted>
                <DialogTitle>EDIT USER</DialogTitle>
                <DialogContent dividers>
                    <div>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                        >
                            {/* ======================== USER IMAGE ======================== */}
                            <Grid item xs = {12} sm = {12} lg ={3}>
                                <div>
                                    <Accordion expanded = {true} style = {{width: '100%'}}>
                                        <AccordionSummary>USER IMAGE</AccordionSummary>
                                        <AccordionDetails>
                                            <Grid
                                            container direction = 'row'
                                            alignItems='center'
                                            justifyContent='center'
                                            spacing={2}>
                                                <Grid item xs = {12} alignItems='center'
                                                justifyContent='center'>
                                                    <Grid
                                                    container direction = 'row'
                                                    alignItems='center'
                                                    justifyContent='center'>
                                                        <Card style = {{height:'40vh', width:'30vh'}}>
                                                            <Grid 
                                                            container direction = 'row'
                                                            alignItems='center'
                                                            justifyContent='center'>
                                                                {(()=>{
                                                                    if(photoPreview < 1 || photoFiles < 1)
                                                                    {
                                                                        return(
                                                                            <img style = {{width:"100%",height:"250px",objectFit:"contain", margin:'auto'}} src = {"../images/user/" + image} />
                                                                        )
                                                                    }
                                                                    else
                                                                    {
                                                                        return(
                                                                            <Grid container direction="row" justifyContent="center" alignContent="center" spacing={1}>
                                                                                {imageResult(photoPreview)}
                                                                            </Grid>
                                                                        )
                                                                    }
                                                                })()}
                                                            </Grid>
                                                        </Card>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs = {12} alignItems='center'
                                                justifyContent='center'>
                                                    <div style={{ '> *': { margin: '1vw' } }}>
                                                        <input 
                                                            accept = "image/*"
                                                            className = {classesUpload.input}
                                                            id = "contained-button-file"
                                                            type = "file"
                                                            onChange={(event) => {imageHandleChange(event)}}
                                                            name = "photo[]"
                                                        />
                                                        <label htmlFor="contained-button-file" style = {{width : "100%"}}>
                                                            <Button
                                                                variant = "contained"
                                                                color = "primary"
                                                                component = "span"
                                                                style = {{ width : "100%", marginTop : "15px", float:'center'}}
                                                            >
                                                                CHOOSE IMAGE
                                                            </Button>
                                                        </label>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </AccordionDetails>
                                    </Accordion>
                                </div>
                            </Grid>

                            {/* ======================== FORM ======================== */}
                            <Grid item xs = {12} sm = {12} lg ={9}>
                                <AccordionSummary>FORM</AccordionSummary>
                                <AccordionDetails>
                                    <Grid
                                    container direction = 'row' alignItems='center' justifyContent='center' spacing = {3}>
                                        <Grid item xs={2}>
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
                                        <Grid item xs={5}>
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
                                        <Grid item xs={5}>
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
                                        
                                        <Grid item xs={4}>
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
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Confirm Password"
                                                fullWidth={true}
                                                variant="outlined"
                                                value={confirmPassword}
                                                type="password"
                                                onChange={(event) => {
                                                    setConfirmPassword(event.target.value);
                                                }}
                                            />
                                        </Grid>

                                        <Grid item xs={4}>
                                        <TextField
                                                select
                                                label="Level"
                                                value={isSuperAdmin}
                                                onChange={(event) => {
                                                    setIsSuperAdmin(event.target.value);
                                                }}
                                                helperText="Please select user level"
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                fullWidth="true"
                                                variant="outlined">
                                                    {levels.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                    {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Grid>
                        </Grid>
                    </div>
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
                        <Snackbar
                        open={openSnackbar}
                        autoHideDuration={2500}
                        onClose={handleSnackbarClose}
                        message={snackbarMessage}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        ContentProps={{
                            style: {
                            backgroundColor: snackbarSeverity === 'error' ? '#f44336' : '#4caf50',
                            color: '#ffffff',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            },
                        }}
                        />
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
