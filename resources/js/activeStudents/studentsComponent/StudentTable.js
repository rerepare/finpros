import React, { useState } from 'react';
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import styled from "styled-components";

//MATERIAL UI
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { Table, TableHead, TableBody, TableCell, TableRow, TablePagination, TableFooter } from "@material-ui/core";
import { Paper, Grid, TextField, Typography } from "@material-ui/core";
import { DialogTitle, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import { Button, IconButton } from "@material-ui/core";
import LastPageIcon from '@material-ui/icons/LastPage';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, } from '@material-ui/core';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import Snackbar from '@material-ui/core/Snackbar';

const placements = [
    {
        value: '',
        label: '',
    },
    {
        value: 'PUSAT',
        label: 'Pusat',
    },
    {
        value: 'VILLA PERMATA',
        label: 'Villa Permata',
    },
    {
        value: 'VILLA 2',
        label: 'Villa 2',
    },
];

const genders = [
    {
        value: '',
        label: '',
    },
    {
        value: 'LAKI-LAKI',
        label: 'L',
    },
    {
        value: 'PEREMPUAN',
        label: 'P',
    },
];

const classTypes = [
    {
        value: '',
        label: '',
    },
    {
        value: 'PLAY GROUP',
        label: 'Play Group',
    },
    {
        value: 'TK A',
        label: 'TK A',
    },
    {
        value: 'TK B',
        label: 'TK B',
    },
];

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

export default function StudentTable(props) {
    const { student } = props;

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, student.length - page * rowsPerPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

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
    const [email, setEmail] = React.useState("");

    // UPLOAD IMAGE
    const classesUpload = useStylesUpload();
    const [photoFiles, setPhotoFiles] = React.useState([])
    const [photoPreview, setPhotoPreview] = React.useState([])

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [validation, setValidation] = React.useState(false);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

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
        setOpenDetailsDialog(true);
    };
    const handleCloseDetailsDialog = () => {
        datas = student
        setOpenDetailsDialog(false);
    };

    //FUNCTION ADD
    const addStudent = (event) => {
        event.preventDefault();

        if (validation) {
            // Show error snackbar message
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to add student. Please fill in all required fields.');
            setOpenSnackbar(true);
        }else{
            let data = {
                id: id,
                student_id:"STD"+(student[0].id),
                school_id: schoolId,
                image: photoFiles,
                fullName: studentName,
                gender: gender,
                classType: classType,
                parentName: parentName,
                contact: contact,
                email: email,
                balance: balance,
            };
            axios.post("/addStudent", data)
            .then(() => {
                // Show success snackbar message
                setSnackbarSeverity('success');
                setSnackbarMessage('Student added successfully!');
                setOpenSnackbar(true);

                // Reload the activeStudent page
                window.location.href = '/activeStudents';
            })
            .catch(() => {
                setSnackbarSeverity('error');
                setSnackbarMessage('Failed to add student. Please fill in all required fields.');
                setOpenSnackbar(true);
            });
        }
        setValidation(false);
    };

    const handleOpenAddDialog = () => {
        setStudentId("STD"+(student[0].id));
        setBalance(0);
        setOpenAddDialog(true);
    };


    const handleCloseAddDialog = () => {
        setId("");
        setStudentId("");
        setSchoolId("");
        setPhotoFiles([]);
        setPhotoPreview([]);
        setStudentName("");
        setGender("");
        setClassType("");
        setParentName("");
        setContact("");
        setEmail("");
        setBalance("");
        setOpenAddDialog(false);
    };

    //FUNCTION EDIT
    const editStudent = (e) => {
        e.preventDefault();

        if (validation) {
            setSnackbarSeverity('error');
            setSnackbarMessage('Failed to update student data. Please fill in all required fields.');
            setOpenSnackbar(true);
        }else{
            let data = {
                id: id,
                student_id : studentId,
                school_id: schoolId,
                image: photoFiles,
                fullName: studentName,
                gender: gender,
                classType: classType,
                parentName: parentName,
                contact: contact,
                email: email,
                balance: balance,
            };
            axios.post("/editStudent", data)
            .then(() => {
                setSnackbarSeverity('success');
                setSnackbarMessage('Student data edited successfully!');
                setOpenSnackbar(true);
                window.location.href = '/activeStudents';
            })
            .catch(() => {
                setSnackbarSeverity('error');
                setSnackbarMessage('Failed to update student data. Please fill in all required fields.');
                setOpenSnackbar(true);
            });
        }
        setValidation(false);
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
        setEmail(data.email);
        setBalance(data.balance);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        setId("");
        setStudentId("");
        setSchoolId("");
        setPhotoFiles([]);
        setPhotoPreview([]);
        setImage("")
        setStudentName("");
        setGender("");
        setClassType("");
        setParentName("");
        setContact("");
        setEmail("");
        setBalance("");
        setOpenEditDialog(false);
    };

     //FUNCTION DELETE
    const deleteStudent = (e) => {
        e.preventDefault();

        let data = {
            id: id,
        };
        axios.post("/deleteStudent", data).then(() => {
            handleCloseDeleteDialog();
            window.location.href = "/activeStudents";
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
            <Typography variant="h4">DATA SISWA</Typography>
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
                            size="small"
                            onChange={(event) => {
                            setSearchQuery(event.target.value);
                            }}
                            value={searchQuery}
                            label="Cari Siswa"
                            style={{ width: '300px', height: '50px' }}
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
                                      if (searchQuery === "") {
                                        return data;
                                      } else {
                                        const query = searchQuery.toLowerCase();
                                        return (
                                          data.fullName.toLowerCase().includes(query) ||
                                          data.student_id.toString().includes(query)
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
            <Dialog onClose={handleCloseDetailsDialog} open={openDetailsDialog} fullWidth={true} maxWidth={false} keepMounted>
                <DialogTitle className={classes.dialogTitle }>
                    DETAIL SISWA
                </DialogTitle>

                <DialogContent dividers>
                    <div>
                        <Grid container spacing ={1}>
                            <Grid item xs = {12}>
                                <Accordion expanded = {true} style = {{width: '100%'}}>
                                    <AccordionDetails>
                                        <Grid container direction='row' alignItems='center' justifyContent="center" spacing={1}>
                                            <Grid item = {2}>
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
                        </Grid>
                    </div>
                    
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
            <Dialog onClose={handleCloseAddDialog} open={openAddDialog} fullWidth={true} maxWidth={false} keepMounted>
                <DialogTitle>TAMBAH SISWA</DialogTitle>
                <DialogContent dividers>
                    <div>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                        >
                            {/* ======================== STUDENT IMAGE ======================== */}
                            <Grid item xs = {12} sm = {12} lg ={3}>
                                <div>
                                <Accordion expanded = {true} style = {{width: '100%'}}>
                                    <AccordionSummary>FOTO SISWA</AccordionSummary>
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
                                                            PILIH FOTO
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
                                <AccordionSummary>
                                    FORM
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Grid 
                                    container direction = 'row' alignItems='center' justifyContent='center' spacing = {3}>
                                        <Grid item xs={4}>
                                            <TextField
                                            disabled
                                            size = 'small'
                                            label="ID Siswa"
                                            fullWidth="true"
                                            variant="outlined"
                                            value={studentId}
                                            onChange={(event) => {
                                                setStudentId(event.target.value);
                                            }}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                            required
                                            size = 'small'
                                            label="Nama Siswa"
                                            fullWidth="true"
                                            variant="outlined"
                                            value={studentName}
                                            onChange={(event) => {
                                                setStudentName(event.target.value);
                                            }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                            select
                                            size = 'small'
                                            label="Cabang"
                                            value={schoolId}
                                            onChange={(event) => {
                                                setSchoolId(event.target.value);
                                            }}
                                            helperText="Please select student placement"
                                            SelectProps={{
                                                native: true,
                                            }}
                                            fullWidth="true"
                                            variant="outlined"
                                            >
                                                {placements.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                    {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                            select
                                            size = 'small'
                                            label="Jenis Kelamin"
                                            value={gender}
                                            onChange={(event) => {
                                                setGender(event.target.value);
                                            }}
                                            helperText="Please select student gender"
                                            SelectProps={{
                                                native: true,
                                            }}
                                            fullWidth="true"
                                            variant="outlined"
                                            >
                                                {genders.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                    {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                            select
                                            size = 'small'
                                            label="Kelas"
                                            value={classType}
                                            onChange={(event) => {
                                                setClassType(event.target.value);
                                            }}
                                            helperText="Please select student class type"
                                            SelectProps={{
                                                native: true,
                                            }}
                                            fullWidth="true"
                                            variant="outlined"
                                            >
                                                {classTypes.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                    {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                            label="Orang Tua/Wali"
                                            size = 'small'
                                            fullWidth="true"
                                            variant="outlined"
                                            value={parentName}
                                            onChange={(event) => {
                                                setParentName(event.target.value);
                                            }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                                label="Kontak"
                                                size = 'small'
                                                fullWidth="true"
                                                variant="outlined"
                                                value={contact}
                                                onChange={(event) => {
                                                    setContact(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                                label="Email"
                                                size = 'small'
                                                fullWidth="true"
                                                variant="outlined"
                                                value={email}
                                                onChange={(event) => {
                                                    setEmail(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Saldo Tabungan"
                                                size = 'small'
                                                fullWidth="true"
                                                variant="outlined"
                                                value={balance}
                                                onChange={(event) => {
                                                    setBalance(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Grid>
                        </Grid>
                    </div>
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
                        onClick={handleCloseAddDialog}
                    >
                        CLOSE
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ================================== EDIT STUDENT DIALOG =================================  */}
            <Dialog onClose={handleCloseEditDialog} open={openEditDialog} fullWidth={true} maxWidth={false} keepMounted>
                <DialogTitle>EDIT SISWA</DialogTitle>
                <DialogContent dividers>
                    <div>
                        <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={1}
                        >
                            {/* ======================== STUDENT IMAGE ======================== */}
                            <Grid item xs = {12} sm = {12} lg ={3}>
                                <div>
                                    <Accordion expanded = {true} style = {{width: '100%'}}>
                                        <AccordionSummary>FOTO SISWA</AccordionSummary>
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
                                                                            <img style = {{width:"100%",height:"250px",objectFit:"contain", margin:'auto'}} src = {"../images/student/" + image} />
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
                                                                PILIH FOTO
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
                                        <Grid item xs={4}>
                                            <TextField
                                                disabled
                                                size = 'small'
                                                label="ID Siswa"
                                                fullWidth="true"
                                                variant="outlined"
                                                value={studentId}
                                                onChange={(event) => {
                                                    setStudentId(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={8}>
                                            <TextField
                                            required
                                                label="Nama"
                                                size = 'small'
                                                fullWidth="true"
                                                variant="outlined"
                                                value={studentName}
                                                onChange={(event) => {
                                                    setStudentName(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                                select
                                                label="Cabang Sekolah"
                                                size = 'small'
                                                value={schoolId}
                                                onChange={(event) => {
                                                    setSchoolId(event.target.value);
                                                }}
                                                helperText="Please select student placement"
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                fullWidth="true"
                                                variant="outlined"
                                            >
                                                {placements.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                    {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                                select
                                                size = 'small'
                                                label="Jenis Kelamin"
                                                value={gender}
                                                onChange={(event) => {
                                                    setGender(event.target.value);
                                                }}
                                                helperText="Please select student gender"
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                fullWidth="true"
                                                variant="outlined"
                                            >
                                                {genders.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                    {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                                select
                                                size = 'small'
                                                label="Kelas"
                                                value={classType}
                                                onChange={(event) => {
                                                    setClassType(event.target.value);
                                                }}
                                                helperText="Please select student class type"
                                                SelectProps={{
                                                    native: true,
                                                }}
                                                fullWidth="true"
                                                variant="outlined"
                                            >
                                                {classTypes.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                    {option.label}
                                                    </option>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                                label="Orang Tua/Wali"
                                                size = 'small'
                                                fullWidth="true"
                                                variant="outlined"
                                                value={parentName}
                                                onChange={(event) => {
                                                    setParentName(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                                label="Kontak"
                                                size = 'small'
                                                fullWidth="true"
                                                variant="outlined"
                                                value={contact}
                                                onChange={(event) => {
                                                    setContact(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                            required
                                                label="Email"
                                                size = 'small'
                                                fullWidth="true"
                                                variant="outlined"
                                                value={email}
                                                onChange={(event) => {
                                                    setEmail(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                label="Saldo"
                                                 size = 'small'
                                                fullWidth="true"
                                                variant="outlined"
                                                value={balance}
                                                onChange={(event) => {
                                                    setBalance(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Grid>
                        </Grid>
                    </div>
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

            {/* ================================= DELETE STUDENT DIALOG ================================  */}
            <Dialog onClose={handleCloseDeleteDialog} open={openDeleteDialog}>
                <DialogTitle>HAPUS SISWA</DialogTitle>
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
                                Anda yakin ingin menghapus siswa ini?
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
                            Ya
                        </Button>
                    </form>
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={handleCloseDeleteDialog}
                    >
                        Tidak
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}