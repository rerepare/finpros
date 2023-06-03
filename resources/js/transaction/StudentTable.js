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

import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent,
  } from '@material-ui/core'

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from '@material-ui/icons/Close';
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

var datas = [];

export default function StudentTable(props) {
    const { student } = props;
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, student.length - page * rowsPerPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchName, setSearchName] = React.useState(""); 
    amount, details, payer, method
    const [amount, setAmount] = React.useState("")
    const [details, setDetails] = React.useState("")
    const [payer, setPayer] = React.useState("")
    const [method, setMethod] = React.useState("")
    const [type, setType] = React.useState("") 
    const [balance, setBalance] = React.useState(0)
    const [studentId, setStudentId] = React.useState("")
    const [openDialog, setOpenDialog] = React.useState(false)

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };    

    const handleCloseDialog = () => {
        datas = student
        console.log(datas)
        setOpenDialog(false)
    }
    const handleOpenDialog = (data) => {
        // datas.push(student.filter(x => x.id == data.id))
        datas = student.filter(x => x.id == data.id)
        console.log(datas[0])
        setOpenDialog(true)
    }

    const addTransaction = (event) => {
        event.preventDefault();

        let data = {
            amount: amount,
            transactionType: type,
            payer: payer,
            method: method,
            balance: balance,
            studentId: studentId

        };

        axios.post("/addTransaction", data).then(() => {
            window.location.href = "/transaction";
        });
    };
    

    return (
        <div>
            <Typography variant="h4">TRANSACTION</Typography>
            <Paper elevation={4} style={{ padding: "25px", height:"80vh" }}>
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
                                        Image
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Name
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Gender
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Class
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Placement
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Parent Name
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Contact
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
                                            {data.image}
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
                                            {data.gender}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.classType}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.placement}
                                        </StyledTableCell>
                                        <StyledTableCell
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
                                {
                                    datas.map((data, key) => (
                                        <div>
                                            <Typography>
                                                Name : {data.fullName}
                                            </Typography>
                                            <br />
                                            <Typography>
                                                Class : {data.classType}
                                            </Typography>
                                        </div>
                                    ))
                                }
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
                                            <Grid item xs = {12}>
                                                <TextField value = {amount} onChange = {(event) => {setAmount(event.target.value)}} fullWidth = {true} variant='outlined' label = 'Amount'
                                            />               
                                            </Grid>
                                            <Grid item xs = {12}>
                                                <TextField value = {details} onChange = {(event) => {setDetails(event.target.value)}} fullWidth = {true} variant='outlined' label = 'Details' />               
                                            </Grid>
                                            <Grid item xs = {6}>
                                                <TextField value = {payer} onChange={(event) => {setPayer(event.target.value)}} fullWidth = {true} variant='outlined' label = 'Payer' />               
                                            </Grid>  
                                            <Grid item xs = {6}>
                                                <TextField value = {method} onChange = {(event) => {setMethod(event.target.value)}} fullWidth = {true} variant='outlined' label = 'Method' />               
                                            </Grid>
                                            <Grid item xs = {6}>
                                                <form method="post" onSubmit={addTransaction}>
                                                    <Button variant='contained' color='secondary' style = {{float:'center', marginLeft:'10vw'}} onClick = {()=>{setType("Payment")}}>
                                                        PAYMENT
                                                    </Button> 
                                                </form>               
                                            </Grid>  
                                            <Grid item xs = {6}>
                                                <form method="post" onSubmit={addTransaction}>
                                                    <Button variant='contained' color='primary' style = {{float:"center", marginLeft:'10vw'}} onClick = {() => {setType("Saving")}}>
                                                        SAVING
                                                    </Button>
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
