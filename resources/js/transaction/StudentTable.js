import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import PropTypes from "prop-types";
import styled from "styled-components";

//page
import Dashboard from '../dashboard/Dashboard';

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

const payMethods1 = [
    {
        value: '',
        label: '',
    },
    {
        value: 'Bayar dengan saldo tabungan',
        label: 'Bayar dengan saldo tabungan',
    },
    {
        value: 'Lainnya',
        label: 'Lainnya',
    },
];

const payMethods2 = [
    {
        value: '',
        label: '',
    },
    {
        value: 'CASH',
        label: 'Cash',
    },
    {
        value: 'Lainnya',
        label: 'Lainnya',
    },
];

const actors = [
    {
        value: '',
        label: '',
    },
    {
        value: 'SISWA',
        label: 'Siswa',
    },
    {
        value: 'Lainnya',
        label: 'Lainnya',
    },
];

const descriptions1 = [
    {
        value: '',
        label: '',
    },
    {
        value: 'Tabungan Harian',
        label: 'Tabungan Harian',
    },
    {
        value: 'Lainnya',
        label: 'Lainnya',
    },
];

const descriptions = [
    {
        value: '',
        label: '',
    },
    {
        value: 'Pembayaran SPP',
        label: 'Pembayaran SPP',
    },
    {
        value: 'Pembayaran SDPP',
        label: 'Pembayaran SDPP',
    },
    {
        value: 'Pembayaran LBV',
        label: 'Pembayaran LBV',
    },
    {
        value: 'Pembayaran Les',
        label: 'Pembayaran Les',
    },
    {
        value: 'Lainnya',
        label: 'Lainnya',
    },
];

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.modal + 1,
        color: "#fff",
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
      },
      content: {
        flexGrow: 1,
        padding: theme.spacing(3),
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

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, student.length - page * rowsPerPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const [id, setId] = React.useState("")
    const [studentId, setStudentId] = React.useState("")
    const [studentName, setStudentName] = React.useState("")
    const [amount, setAmount] = React.useState("")
    const [payMethod, setPayMethod] = React.useState("")
    const [otherPayMethod, setOtherPayMethod] = React.useState("")
    const [otherDescription, setOtherDescription] = React.useState("")
    const [otherActor, setOtherActor] = React.useState("")
    const [actor, setActor] = React.useState("")
    const [transType, setTransType] = React.useState("") 
    const [description, setDescription] = React.useState("")
    const [balance, setBalance] = React.useState(0)
    const [openDialog, setOpenDialog] = React.useState(false)
    const [openDialogSetoran, setOpenDialogSetoran] = React.useState(false)
    const [newBalance, setNewBalance] = React.useState(0);
    const [validation, setValidation] = React.useState(false)
    const [image, setImage] = React.useState("");

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
    const handleCloseDialogSetoran = () => {
        datas = student
        setStudentId("")
        setBalance("")
        setTransType("")
        setDescription("")
        setAmount(0)
        setActor("")
        setPayMethod("")
        setOpenDialogSetoran(false)
    }
    const handleOpenDialog = (data) => {
        // datas.push(student.filter(x => x.id == data.id))
        datas = student.filter(x => x.id == data.id)
        setStudentId(data.student_id)
        setStudentName(data.fullName)
        setBalance(data.balance)
        console.log(datas[0])
        setOpenDialog(true)
    }
    const handleOpenDialogSetoran = (data) => {
        // datas.push(student.filter(x => x.id == data.id))
        datas = student.filter(x => x.id == data.id)
        setStudentId(data.student_id)
        setStudentName(data.fullName)
        setBalance(data.balance)
        console.log(datas[0])
        setOpenDialogSetoran(true)
    }

    const handleAmountChange = (event) => {
        const input = event.target.value;
        const regex = /^[0-9]*$/; // Regular expression to match only numbers
    
        if (regex.test(input) || input === '') {
          setAmount(input);
        }
    };

    const handlePayMethodChange = (event) => {
        const value = event.target.value;
        // setPayMethod(value === 'Lainnya' ? '' : value);
    };

    const handleActorChange = (event) => {
        const value = event.target.value;
        setActor(value === 'Lainnya' ? '' : value);
    };

    const saving = () => {
        setValidation(false)
        setNewBalance(0)
        let calculate = 0
        calculate = parseInt(balance) + parseInt(amount)        
        setTransType("Setoran")
        setNewBalance(calculate)        
        
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
        setTransType("Pembayaran")
        setNewBalance(calculate)                
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
                // controller = js
                id: id,
                student_id: studentId,
                user_id: user.id,
                amount: amount,                
                //  payMethod: condition ? true : false, (ini nama tehnik nya tennary)
                payMethod: payMethod.toLowerCase() == "lainnya" ? otherPayMethod : payMethod,
                actor: actor.toLowerCase() == "lainnya" ? otherActor : actor,
                description: description.toLowerCase() == "lainnya" ? otherDescription : description,
                transType: transType,
                balance: balance,
                newBalance : newBalance,
                email: emails.email,     
                studentName: studentName,           
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
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h4">TRANSAKSI</Typography>
                {(()=>{
                    if(user.isSuperAdmin == false)
                    {
                    return(
                        <div>
                        <Button variant="contained" style={{ backgroundColor: "#A8A196", color: "#ffffff" }} onClick={() => {window.location.href="/dashboard"}}>
                            Dashboard
                        </Button>
                        </div>
                        )
                    }
                })()}
            </div>
            
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
                            size="small"
                            onChange={(event) => {
                            setSearchQuery(event.target.value);
                            }}
                            value={searchQuery}
                            label="Cari Siswa"
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
                                        ID Siswa
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Nama
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Sekolah
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Saldo
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ borderTopRightRadius: "1vw" }}
                                    >
                                        Action
                                    </StyledTableCell>
                                </StyledTableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? student
                                    .filter((data) => {
                                      if (searchQuery === "") {
                                        return data; // No search criteria provided, return all data
                                      } else {
                                        const query = searchQuery.toLowerCase();
                                        return (
                                          data.fullName.toLowerCase().includes(query) ||
                                          data.student_id.toString().includes(query)// Assuming student_id is a number
                                        );
                                      }
                                    })
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                            <Button variant = 'contained' color = 'primary' onClick = {() => {handleOpenDialogSetoran(data)}}>
                                                SETORAN
                                            </Button>
                                            <Button variant = 'contained' color = 'secondary' onClick = {() => {handleOpenDialog(data)}}>
                                                PEMBAYARAN
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

            {/* ================================ PEMBAYARAN DIALOG ==============================  */}
             <Dialog onClose={handleCloseDialog} open={openDialog} fullWidth={true} maxWidth={false} keepMounted>
                <DialogTitle>
                    PEMBAYARAN SISWA
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
                            <Grid item xs = {12} sm = {12} lg ={12}>
                                <Accordion expanded = {true}>
                                    <AccordionDetails>
                                        <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing={1}>
                                            <Grid item xs = {2}>
                                                <Card style = {{height:'40vh'}}>
                                                    <CardContent>
                                                    {
                                                        datas.map((data, key) => (
                                                            <img style = {{width:'100%', height:"200px", objectFit:'contain', margin:'auto' }} src = {"../images/student/" + data.image} />
                                                        ))
                                                    }
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs = {5}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography>
                                                            {
                                                                datas.map((data, key) => (
                                                                    <div>
                                                                        <Table>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    ID Siswa :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.student_id}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Sekolah :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.school_id}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Nama :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.fullName}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Jenis Kelamin :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.gender}
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
                                            <Grid item xs = {5}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography>
                                                            {
                                                                datas.map((data, key) => (
                                                                    <div>
                                                                        <Table>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Kelas :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.classType}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Orang Tua/Wali :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.parentName}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Kontak :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.contact}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Saldo :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.balance}
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

                            {/* ======================== FORM ========================== */}
                            <Grid item xs = {12} sm = {12} lg ={12}>
                                <Accordion expanded = {true}>
                                    <AccordionSummary>
                                        FORM TRANSAKSI
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing = {1}>
                                            {/* AMOUNT */}
                                            <Grid item xs = {12}>
                                                <TextField
                                                    label="Jumlah"
                                                    variant="filled"
                                                    fullWidth="true"
                                                    size = 'small'
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                                                      }}
                                                    value = {amount}
                                                    onChange={handleAmountChange}
                                                />                                  
                                            </Grid>

                                            {/* DESCRIPTION */}
                                            <Grid item xs = {12}>
                                                <TextField
                                                    select
                                                    label="Tujuan Pembayaran:"
                                                    variant="outlined"
                                                    fullWidth="true"
                                                    size = 'small'
                                                    value = {description}
                                                    onChange = {(event) => {setDescription(event.target.value)}}
                                                    SelectProps={{
                                                    native: true,
                                                    }}
                                                >
                                                    {descriptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                    ))}
                                                </TextField>
                                                {(()=>{
                                                    if(description.toLowerCase() == "lainnya")
                                                    {
                                                        return(
                                                            <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing = {1} style={{ marginTop: '5px' }}>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                    label="Isi metode pembayaran"
                                                                    value={otherDescription}
                                                                    onChange={(event) => setOtherDescription(event.target.value)}
                                                                    fullWidth
                                                                    size = 'small'
                                                                    variant="outlined"
                                                                    />
                                                                    </Grid>
                                                            </Grid>
                                                        )   
                                                    }
                                                })()}
                                            </Grid>

                                           {/* PAYMENT METHOD */}
                                            <Grid item xs={6}>
                                                <TextField
                                                    select
                                                    label="Metode pembayaran:"
                                                    variant="outlined"
                                                    fullWidth
                                                    size = 'small'
                                                    value={payMethod}
                                                    onChange = {(event) => {setPayMethod(event.target.value)}}
                                                    SelectProps={{
                                                    native: true,
                                                    }}
                                                >
                                                    {payMethods1.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                    ))}
                                                </TextField>
                                                {(()=>{
                                                    if(payMethod.toLowerCase() == "lainnya")
                                                    {
                                                        return(
                                                            <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing = {1} style={{ marginTop: '5px' }}>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                    label="Isi metode pembayaran"
                                                                    value={otherPayMethod}
                                                                    onChange={(event) => setOtherPayMethod(event.target.value)}
                                                                    fullWidth
                                                                    size = 'small'
                                                                    variant="outlined"
                                                                    />
                                                                    </Grid>
                                                            </Grid>
                                                        )   
                                                    }
                                                })()}
                                            </Grid>     

                                             {/* ACTOR */}
                                            <Grid item xs = {6}>
                                                <TextField
                                                    select
                                                    label="Telah diterima dari:"
                                                    variant="outlined"
                                                    fullWidth="true"
                                                    size = 'small'
                                                    value = {actor}
                                                    onChange = {(event) => {setActor(event.target.value)}} 
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                >
                                                    {actors.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                    ))}
                                                </TextField>   
                                                {(()=>{
                                                    if(actor.toLowerCase() == "lainnya")
                                                    {
                                                        return(
                                                            <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing = {1} style={{ marginTop: '5px' }}>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                    label="Telah diterima dari:"
                                                                    value={otherActor}
                                                                    onChange={(event) => setOtherActor(event.target.value)}
                                                                    fullWidth
                                                                    size = 'small'
                                                                    variant="outlined"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        )   
                                                    }
                                                })()}        
                                            </Grid>                                                                                     
                                            
                                             

                                            {/* ACTIONS */}
                                            <Grid item xs = {12}>
                                                <form method="post" onSubmit={addTransaction}>
                                                    <Button 
                                                    variant='contained' 
                                                    type = "submit"
                                                    color='secondary' 
                                                    style = {{float:'center', marginBottom: '-2vh', width:"100%"}} 
                                                    onClick = {payments}>
                                                        PEMBAYARAN
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

            {/* ================================ SETORAN DIALOG ==============================  */}
            <Dialog onClose={handleCloseDialogSetoran} open={openDialogSetoran} fullWidth={true} maxWidth={false} keepMounted>
                <DialogTitle>
                    SETORAN SISWA
                    <IconButton
                        variant="contained"
                        color="secondary"                        
                        style = {{float:'right'}}
                        onClick={handleCloseDialogSetoran}
                    >           
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>
                    <div>
                        <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing={2}>
                            {/* ======================== STUDENT PROFILE ======================== */}
                            <Grid item xs = {12} sm = {12} lg ={12}>
                                <Accordion expanded = {true}>
                                    <AccordionDetails>
                                        <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing={1}>
                                            <Grid item xs = {2}>
                                                <Card style = {{height:'40vh'}}>
                                                    <CardContent>
                                                    {
                                                        datas.map((data, key) => (
                                                            <img style = {{width:'100%', height:"200px", objectFit:'contain', margin:'auto' }} src = {"../images/student/" + data.image} />
                                                        ))
                                                    }
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid item xs = {5}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography>
                                                            {
                                                                datas.map((data, key) => (
                                                                    <div>
                                                                        <Table>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    ID Siswa :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.student_id}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Sekolah :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.school_id}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Nama :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.fullName}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Jenis Kelamin :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.gender}
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
                                            <Grid item xs = {5}>
                                                <Card>
                                                    <CardContent>
                                                        <Typography>
                                                            {
                                                                datas.map((data, key) => (
                                                                    <div>
                                                                        <Table>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Kelas :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.classType}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Orang Tua/Wali :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.parentName}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Kontak :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.contact}
                                                                                </TableCell>
                                                                            </TableRow>
                                                                            <TableRow>
                                                                                <TableCell>
                                                                                    Saldo :
                                                                                </TableCell>
                                                                                <TableCell>
                                                                                    {data.balance}
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

                            {/* ======================== FORM ========================== */}
                            <Grid item xs = {12} sm = {12} lg ={12}>
                                <Accordion expanded = {true}>
                                    <AccordionSummary>
                                        FORM TRANSAKSI
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing = {1}>
                                            {/* JUMLAH */}
                                            <Grid item xs = {12}>
                                                <TextField
                                                    label="Jumlah"
                                                    variant="filled"
                                                    fullWidth="true"
                                                    size = 'small'
                                                    InputProps={{
                                                        startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                                                      }}
                                                    value = {amount}
                                                    onChange={handleAmountChange}
                                                />                                  
                                            </Grid>

                                            {/* TUJUAN */}
                                            <Grid item xs = {12}>
                                                <TextField
                                                    select
                                                    label="Tujuan Pembayaran:"
                                                    variant="outlined"
                                                    fullWidth="true"
                                                    size = 'small'
                                                    value = {description}
                                                    onChange = {(event) => {setDescription(event.target.value)}}
                                                    SelectProps={{
                                                    native: true,
                                                    }}
                                                >
                                                    {descriptions1.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                    ))}
                                                </TextField>  
                                                {(()=>{
                                                    if(description.toLowerCase() == "lainnya")
                                                    {
                                                        return(
                                                            <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing = {1} style={{ marginTop: '5px' }}>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                    label="Isi metode pembayaran"
                                                                    value={otherDescription}
                                                                    onChange={(event) => setOtherDescription(event.target.value)}
                                                                    fullWidth
                                                                    size = 'small'
                                                                    variant="outlined"
                                                                    />
                                                                    </Grid>
                                                            </Grid>
                                                        )   
                                                    }
                                                })()}         
                                            </Grid>

                                           {/* PAYMENT METHOD */}
                                            <Grid item xs={6}>
                                                <TextField
                                                    select
                                                    label="Metode pembayaran:"
                                                    variant="outlined"
                                                    fullWidth
                                                    size = 'small'
                                                    value={payMethod}
                                                    onChange = {(event) => {setPayMethod(event.target.value)}}
                                                    SelectProps={{
                                                    native: true,
                                                    }}
                                                >
                                                    {payMethods2.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                    ))}
                                                </TextField>
                                                {(()=>{
                                                    if(payMethod.toLowerCase() == "lainnya")
                                                    {
                                                        return(
                                                            <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing = {1} style={{ marginTop: '5px' }}>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                    label="Isi metode pembayaran"
                                                                    value={otherPayMethod}
                                                                    onChange={(event) => setOtherPayMethod(event.target.value)}
                                                                    fullWidth
                                                                    size = 'small'
                                                                    variant="outlined"
                                                                    />
                                                                    </Grid>
                                                            </Grid>
                                                        )   
                                                    }
                                                })()}
                                            </Grid>     

                                             {/* ACTOR */}
                                            <Grid item xs = {6}>
                                                <TextField
                                                    select
                                                    label="Telah diterima dari:"
                                                    variant="outlined"
                                                    fullWidth="true"
                                                    size = 'small'
                                                    value = {actor}
                                                    onChange = {(event) => {setActor(event.target.value)}} 
                                                    SelectProps={{
                                                        native: true,
                                                    }}
                                                >
                                                    {actors.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                    ))}
                                                </TextField>   
                                                {(()=>{
                                                    if(actor.toLowerCase() == "lainnya")
                                                    {
                                                        return(
                                                            <Grid container direction = 'row' alignItems='center' justifyContent='center' spacing = {1} style={{ marginTop: '5px' }}>
                                                                <Grid item xs={12}>
                                                                    <TextField
                                                                    label="Telah diterima dari:"
                                                                    value={otherActor}
                                                                    onChange={(event) => setOtherActor(event.target.value)}
                                                                    fullWidth
                                                                    size = 'small'
                                                                    variant="outlined"
                                                                    />
                                                                </Grid>
                                                            </Grid>
                                                        )   
                                                    }
                                                })()}        
                                            </Grid>                                                                                     
                                            {/* ACTIONS */}
                                            <Grid item xs = {12}>                                                   
                                                <form method="post" onSubmit={addTransaction}>
                                                    <Button 
                                                    variant='contained' 
                                                    color='primary'
                                                    type = "submit"
                                                    style = {{float:"center",width:"100%"}} 
                                                    onClick = 
                                                    {saving}
                                                    >
                                                        SETORAN
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

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Router>
                    <Switch>
                        <Route path='/dashboard' exact component={Dashboard}/>
                    </Switch>
                </Router>
            </main>      
        </div>
    );
}
