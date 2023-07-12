import React, {useEffect} from "react";
import PropTypes from "prop-types";
import ReactToPrint from "react-to-print";
import styled from "styled-components";

//MATERIAL UI
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { Table, TableHead, TableBody, TableCell, TableRow, TablePagination, TableFooter } from "@material-ui/core";
import { Paper, Grid, TextField, Typography } from "@material-ui/core";
import { DialogTitle, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PrintIcon from '@material-ui/icons/Print';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, } from '@material-ui/core';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.modal + 1,
        color: "#fff",
    },
    dialogTitle: {
        textAlign: 'center',
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

var print = [];

export default function ReportTable(props) {
    const { student, allHistory } = props;    

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, student.length - page * rowsPerPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchName, setSearchName] = React.useState("");
    const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
    const [printData, setPrintData] = React.useState([])

    //GET DATABASE
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


    //FUNCTION OPERATIONAL
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleOpenDetailsDialog = (data) => {
        datas = student.filter(x => x.id == data.id)  
        print = allHistory.filter(x => x.studentId == data.studentId)
                
        setOpenDetailsDialog(true);
    };
    const handleCloseDetailsDialog = () => {
        datas = student
        setOpenDetailsDialog(false);
    };    

    //PRINT
    class ComponentToPrint extends React.Component {    
        render() {            
            // console.log(this.props.detailData)
            // const { print } = this.props;
            // console.log(print)
          return (
            <div className='print-source'>
                <Grid container direction = 'row' alignItems={'center'} justifyContent={'center'} spacing = {1}>
                    <Grid item xs = {11} style = {{margin:'auto', padding : '20px'}}>
                        <Grid container direction = 'row' alignItems="center" justifyContent={'center'} spacing = {1}>
                            <Grid item xs = {3}>
                                <Typography variant = "h4" style={{fontWeight:'bolder'}}>
                                    <img style = {{width:'100%', height:"150px", objectFit:'contain', margin:'auto' }}src="../images/app/logo.png" />
                                </Typography>
                            </Grid>
                            <Grid item xs = {9}>
                                <Typography variant = "h4" style = {{color:'#e4d96f', fontWeight:'bold'}}>
                                    LAPORAN TABUNGAN SISWA 
                                </Typography>
                                <Typography variant = "h4" style = {{color:'#e4d96f', fontWeight:'bold'}}>
                                    TKIT AL MANSHURIYYAH
                                </Typography>
                                <Typography variant = "h4" style = {{color:'#e4d96f', fontWeight:'bold'}}>
                                    TAHUN PELAJARAN 2022-2023
                                </Typography>                                
                            </Grid> 
                            <hr />  
                            <Grid item xs = {12}>
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
                                                ID Siswa
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="center"
                                                style={{ wordBreak: "break-word"}}
                                            >
                                                Nama
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="center"
                                                style={{ wordBreak: "break-word" }}
                                            >
                                                Pembayaran
                                            </StyledTableCell>
                                            <StyledTableCell
                                                align="center"
                                                style={{ wordBreak: "break-word",  borderTopRightRadius: "1vw" }}
                                            >
                                                Tipe Transaksi
                                            </StyledTableCell>
                                           
                                        </StyledTableRow>
                                    </TableHead>
                                    <TableBody>
                                        {print.map((data, key) => (
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
                                                    {data.actor}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    component="th"
                                                    align="center"
                                                    scope="row"
                                                >
                                                    {data.payMethod}
                                                </StyledTableCell>
                                                <StyledTableCell
                                                    component="th"
                                                    align="center"
                                                    scope="row"
                                                >
                                                    {data.transType}
                                                </StyledTableCell>                                              
                                            </StyledTableRow>
                                        ))}

                                        {emptyRows > 0 && (
                                            <TableRow
                                                style= {{height: 33 * emptyRows}}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>                                   
                                </Table>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
          );
        }
    }
    class Example extends React.Component {
        render() {
        const { data } = this.props;
        // print = student.filter(x => x.student_id == data.student_id)
        
          return (
            <div>
              <ReactToPrint
                trigger={() => 
                <Button 
                variant="contained"
                onClick = {() => {filterData(data)}}
                style={{
                    backgroundColor: "#FFD93D",
                    marginBottom:'5px',
                    height:"5vh",
                    width:"2vw",                                                    
                }}>
                    <PrintIcon />
                </Button> }
                content={() => this.componentRef}
              />
                  <div style = {{display : "none"}}>
                      <ComponentToPrint ref={el => (this.componentRef = el)} />
                  </div>
            </div>
          );
        }
    }


   // OTHERS
    
    const Subheader = styled.div`
        display: flex;
        flex-direction: row;
    `;

    return (
        <div>
            <Typography variant="h4">LAPORAN TABUNGAN SISWA</Typography>
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
                                        ID Siswa
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word", width: 350}}
                                    >
                                        Nama
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Cabang Sekolah
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
                                                <InfoOutlinedIcon />
                                            </Button>                                            
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}

                                {emptyRows > 0 && (
                                    <TableRow
                                        style= {{height: 33 * emptyRows}}
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
                <DialogTitle className={classes.dialogTitle }>
                    DETAIL SISWA
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
                                                {
                                                    datas.map((data, key) => (
                                                        <img style = {{width:'100%', height:"250px", objectFit:'contain', margin:'auto' }} src = {"../images/student/" + data.image} />
                                                    ))
                                                }
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item = {6}>
                                            <Card>
                                                <CardContent >
                                                {
                                                    datas.map((data, key) => (
                                                        <div>
                                                            <Typography>
                                                                ID Siswa : {data.student_id}
                                                            </Typography>
                                                            <Typography>
                                                                Cabang Sekolah : {data.school_id}
                                                            </Typography>
                                                            <Typography>
                                                                Nama : {data.fullName}
                                                            </Typography>
                                                            <Typography>
                                                                Jenis Kelamin : {data.gender}
                                                            </Typography>
                                                            <Typography>
                                                                Kelas : {data.classType}
                                                            </Typography>
                                                            <Typography>
                                                                Orang Tua : {data.parentName}
                                                            </Typography>
                                                            <Typography>
                                                                Kontak : {data.contact}
                                                            </Typography>
                                                            <Typography>
                                                                Saldo : {data.balance}
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
                    <Example />
                </DialogActions>
            </Dialog>
        </div>
    );
}