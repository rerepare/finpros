import React, { useState } from 'react';
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styled from "styled-components";
import clsx from 'clsx';

//MATERIAL UI
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { Table, TableHead, TableBody, TableCell, TableRow, TablePagination, TableFooter } from "@material-ui/core";
import { Paper, Grid, TextField, Typography } from "@material-ui/core";
import { DialogTitle, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import Snackbar from '@material-ui/core/Snackbar';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import InputAdornment from '@material-ui/core/InputAdornment';


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
};

var datas = [];

export default function StudentTable(props) {
    const { student } = props;
    const { allHistory } = props;

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, student.length - page * rowsPerPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchName, setSearchName] = React.useState(""); 

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

  
    //GET DATABASE
    const [id, setId] = React.useState("")
    const [studentId, setStudentId] = React.useState("")
    const [amount, setAmount] = React.useState("")
    const [payMethod, setPayMethod] = React.useState("")
    const [actor, setActor] = React.useState("")
    const [transType, setTransType] = React.useState("") 
    const [description, setDescription] = React.useState("")
    const [balance, setBalance] = React.useState(0)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [newBalance, setNewBalance] = React.useState(0);
    const [validation, setValidation] = React.useState(false)

    //FUNCTION OPERATIONAL
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };    

    const handleCloseDialog = () => {
        datas = student
        setStudentId("")
        setBalance("")
        setTransType("")
        setDescription("")
        setAmount(0)
        setActor("")
        setPayMethod("")
        setOpenDialog(false)
    }
    const handleOpenDialog = (data) => {
        // datas.push(student.filter(x => x.id == data.id))
        datas = student.filter(x => x.id == data.id)
        setStudentId(data.student_id)
        setBalance(data.balance)
        console.log(datas[0])
        setOpenDialog(true)
    }

    const saving = () => {
        setValidation(false)
        setNewBalance(0)
        let calculate = 0
        calculate = parseInt(balance) + parseInt(amount)        
        setTransType("Saving")
        setNewBalance(calculate)
        console.log(newBalance)
        
    }
    const payments = () => {
        setValidation(false)
        setNewBalance(0)
        let calculate = 0
        calculate = parseInt(balance) - parseInt(amount)
        if(calculate < 0)
        {
            setValidation(true)
        }
        setTransType("Payment")
        setNewBalance(calculate)  
        console.log(newBalance)      
    }

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
      };

    //FUNCTION ADD TRANSACTION
    
    const addTransaction = (event) => {
        event.preventDefault();
        let emails = student.find(x => x.student_id == studentId);

        if(validation == false)
        {
            let data = {
                id: id,
                student_id: studentId,
                user_id: user.id,
                amount: amount,
                payMethod: payMethod,
                actor: actor,
                transType: transType,
                description: description,
                balance: balance,
                newBalance : newBalance,
                email: emails.email,
            };

            axios.post("/addTransaction", data).then(() => {
                window.location.href = "/transaction";
            });
            setSnackbarSeverity('success');
            setSnackbarMessage('Successfully Saved!');
            
        }else{
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to pay :( Your balance is not enough.');
            // handleCloseDialog();
        }
        setOpenSnackbar(true);
    };
    
     //OTHERS
     const Subheader = styled.div`
        display: flex;
        flex-direction: row;
     `;

    return (
        <div>
            <Typography variant="h4">TRANSACTION</Typography>
            <Paper elevation={4} style={{ padding: "25px", minHeight:"80vh" }}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    spacing={2}>                                     
                    <Grid item xs={12}>
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

                    {/* ADD TRANSACTION HERE */}

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
                                        Student ID
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
                                        School Placement
                                    </StyledTableCell>
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
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.fullName}
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
                                            {data.balance}
                                        </StyledTableCell>
                                        <StyledTableCell
                                             component="th"
                                             align="center"
                                             scope="row"
                                        >
                                            <Button variant = 'contained' color = 'primary' onClick = {() => {handleOpenDialog(data)}}>
                                                OPEN
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
                                        colSpan={5}
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

            {/* ================================ ADD TRANSACTION DIALOG ==============================  */}
             <Dialog onClose={handleCloseDialog} open={openDialog} fullWidth={true} maxWidth={false} keepMounted>
                <DialogTitle>
                    ADD  TRANSACTION
                    <IconButton
                        variant="contained"
                        color="secondary"                        
                        style = {{float:'right'}}
                        onClick={handleCloseDialog}
                    >           
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <div>
                        <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing={2}>
                            {/* ======================== STUDENT PROFILE ======================== */}
                            <Grid item xs = {12} sm = {12} lg ={4}>
                                <Accordion expanded = {true}>
                                    <AccordionSummary>
                                    STUDENT PROFILE
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Card style = {{height:'40vh'}}>
                                            <CardContent>
                                                misalnya ini foto
                                            </CardContent>
                                        </Card>
                                        <Typography>
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
                                        </Typography>
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>

                            {/* ======================== FORM ========================== */}
                            <Grid item xs = {12} sm = {12} lg ={8}>
                                <Accordion expanded = {true}>
                                    <AccordionSummary>
                                        FORM
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing = {1}>
                                            {/* AMOUNT */}
                                            <Grid item xs = {12}>
                                                <TextField
                                                    label="Amount"
                                                    variant="filled"
                                                    fullWidth="true"
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                                                      }}
                                                    value = {amount}
                                                    onInput = {(event) => {setAmount(event.target.value);console.log("ini amount => " + amount)}}
                                                />                                  
                                            </Grid>

                                            {/* DESCRIPTION */}
                                            <Grid item xs = {6}>
                                                <TextField
                                                    label="Description"
                                                    variant="outlined"
                                                    fullWidth="true"
                                                    value = {description}
                                                    onChange = {(event) => {setDescription(event.target.value)}}
                                                />               
                                            </Grid>

                                            {/* ACTOR */}
                                            <Grid item xs = {6}>
                                                <TextField
                                                    label="Payer"
                                                    variant="outlined"
                                                    fullWidth="true"
                                                    value = {actor}
                                                    onChange = {(event) => {setActor(event.target.value)}} 
                                                />            
                                            </Grid>  

                                            {/* PAYMENT METHOD */}
                                            <Grid item xs = {6}>
                                                <TextField
                                                    label="Payment Method"
                                                    variant="outlined"
                                                    fullWidth="true"
                                                    value = {payMethod}
                                                    onChange = {(event) => {setPayMethod(event.target.value)}}
                                                />             
                                            </Grid>

                                            {/* ACTIONS */}
                                            <Grid item xs = {6}>
                                                <form method="post" onSubmit={addTransaction}>
                                                    <Button 
                                                    variant='contained' 
                                                    type = "submit"
                                                    color='secondary' 
                                                    style = {{float:'center', marginLeft:'10vw'}} 
                                                    onClick = {payments}>
                                                        PAYMENT
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
                                                <br/>   
                                                <form method="post" onSubmit={addTransaction}>
                                                    <Button 
                                                    variant='contained' 
                                                    color='primary'
                                                    type = "submit"
                                                    style = {{float:"center", marginLeft:'10vw'}} 
                                                    onClick = 
                                                    {saving}
                                                    >
                                                        SAVING
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
                                            </Grid>
                                        </Grid>                      
                                    </AccordionDetails>
                                </Accordion>
                            </Grid>        
                        </Grid>
                    </div>
                </DialogContent>                
            </Dialog>       
        </div>
    );
}
