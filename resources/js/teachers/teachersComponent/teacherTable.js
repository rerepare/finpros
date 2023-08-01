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
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, } from '@material-ui/core';
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

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

export default function TeacherTable(props) {
    const { teacher } = props;

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const emptyRows =
        rowsPerPage - Math.min(rowsPerPage, teacher.length - page * rowsPerPage);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchName, setSearchName] = React.useState("");
    const [searchQuery, setSearchQuery] = useState('');
    const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
    const [openAddDialog, setOpenAddDialog] = React.useState(false);
    const [openEditDialog, setOpenEditDialog] = React.useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

    //GET DATABASE
    const [id, setId] = React.useState("");
    const [teacherId, setTeacherId] = React.useState("");
    const [schoolId, setSchoolId] = React.useState("");
    const [image, setImage] = React.useState("");
    const [teacherName, setTeacherName] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [classType, setClassType] = React.useState("");
    const [contact, setContact] = React.useState("");

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
        datas = teacher.filter(x => x.id == data.id)
        console.log(datas[0])
        setOpenDetailsDialog(true);
    };
    const handleCloseDetailsDialog = () => {
        datas = teacher
        setOpenDetailsDialog(false);
    };

    //FUNCTION ADD
    const addTeacher = (event) => {
        event.preventDefault();

        let data = {
            id: id,
            teacher_id: "TCH"+(teacher[0].id),
            school_id: schoolId,
            image: photoFiles,
            fullName: teacherName,
            gender: gender,
            classType: classType,
            contact: contact,
        };
        console.log(teacherId)
        axios.post("/addTeacher", data).then(() => {
            window.location.href = "/teachers";
        });
    };
    const handleOpenAddDialog = () => {
        setTeacherId("TCH"+teacher[0].id)
        setOpenAddDialog(true);
    };
    const handleCloseAddDialog = () => {
        setId("");
        setTeacherId("");
        setSchoolId("");
        setPhotoFiles([]);
        setPhotoPreview([]);
        setTeacherName("");
        setGender("");
        setClassType("");
        setContact("");
        setOpenAddDialog(false);
    };

    //FUNCTION EDIT
    const editTeacher = (e) => {
        e.preventDefault();

        let data = {
            id: id,
            teacher_id: teacherId,
            school_id: schoolId,
            image: photoFiles,
            fullName: teacherName,
            gender: gender,
            classType: classType,
            contact: contact,
        };
        axios.post("/editTeacher", data).then(() => {
            handleCloseEditDialog();
            window.location.href = "/teachers";
        });
    };
    const handleOpenEditDialog = (data) => {
        setId(data.id);
        setTeacherId(data.teacher_id);
        setSchoolId(data.school_id);
        setImage(data.image);
        setTeacherName(data.fullName);
        setGender(data.gender);
        setClassType(data.classType);
        setContact(data.contact);
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        setId("");
        setTeacherId("");
        setSchoolId("");
        setPhotoFiles([]);
        setPhotoPreview([]);
        setImage("")
        setImage("");
        setTeacherName("");
        setGender("");
        setClassType("");
        setContact("");
        setOpenEditDialog(false);
    };

    //FUNCTION DELETE
    const deleteTeacher = (e) => {
        e.preventDefault();

        let data = {
            id: id,
        };
        axios.post("/deleteTeacher", data).then(() => {
            handleCloseEditDialog();
            window.location.href = "/teachers";
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
            <Typography variant="h4">DATA GURU</Typography>
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
                            label="Cari Guru"
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
                            aria-label="customized table"
                        >
                            <TableHead>
                                <StyledTableRow
                                    style={{
                                        borderTopLeftRadius: "1vw",
                                        borderTopRightRadius: "1vw",
                                    }}>
                                    <StyledTableCell
                                        align="center"
                                        style={{ borderTopLeftRadius: "1vw" }}
                                    >
                                        Teacher ID
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
                                        Placement
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        Class Type
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
                                    ? teacher
                                    .filter((data) => {
                                      if (searchQuery === "") {
                                        return data; // No search criteria provided, return all data
                                      } else {
                                        const query = searchQuery.toLowerCase();
                                        return (
                                          data.fullName.toLowerCase().includes(query) ||
                                          data.teacher_id.toString().includes(query)// Assuming student_id is a number
                                        );
                                      }
                                    })
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : teacher
                                ).map((data, key) => (
                                    <StyledTableRow key={key}>
                                        <StyledTableCell
                                            component="th"
                                            align="center"
                                            scope="row"
                                        >
                                            {data.teacher_id}
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
                                            {data.classType}
                                        </StyledTableCell>
                                        <StyledTableCell
                                            style={{ width: 250 }}
                                            align="center"
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
                                        count={teacher.length}
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

            {/* ================================= DETAILS TEACHER DIALOG ===============================  */}
            <Dialog onClose={handleCloseDetailsDialog} open={openDetailsDialog} fullWidth={true} >
                <DialogTitle className={classes.dialogTitle }>
                    DETAIL GURU
                </DialogTitle>

                <DialogContent dividers>
                    <Grid container spacing ={1}>
                        <Grid item xs = {12}>
                            <div>
                            <Accordion expanded = {true} style = {{width: '100%'}}>
                                <AccordionDetails>
                                    <Grid container direction='row' alignItems='center' justifyContent="center" spacing={1}>
                                        <Grid item = {4}>
                                            <Card style = {{height:'50vh'}}>
                                                <CardContent>
                                                {
                                                    datas.map((data, key) => (
                                                        <img style = {{width:'100%', height:"250px", objectFit:'contain', margin:'auto' }} src = {"../images/teacher/" + data.image} />
                                                    ))
                                                }
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item = {8}>
                                            <Card>
                                                <CardContent>
                                                {
                                                    datas.map((data, key) => (
                                                        <div>
                                                            <Table>
                                                                <TableRow>
                                                                    <TableCell>
                                                                        ID Guru :
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {data.teacher_id}
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell>
                                                                       Penempatan :
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
                                                                        Kontak :
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {data.contact}
                                                                    </TableCell>
                                                                </TableRow>
                                                            </Table>
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

            {/* ================================= ADD TEACHER DIALOG ===============================  */}
            <Dialog onClose={handleCloseAddDialog} open={openAddDialog} fullWidth={true} maxWidth={false} keepMounted>
                <DialogTitle>ADD  TEACHER</DialogTitle>
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
                                        <AccordionSummary>TEACHER IMAGE</AccordionSummary>
                                        <AccordionDetails>
                                            <Grid
                                            container direction = 'row'
                                            alignItems='center'
                                            justifyContent='center'
                                            spacing={2}>
                                                <Grid
                                                item xs = {12} alignItems='center'
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
                                        <Grid item xs={4}>
                                            <TextField
                                                disabled
                                                size = 'small'
                                                label="Teacher ID"
                                                fullWidth="true"
                                                variant="outlined"
                                                value={teacherId}
                                                onChange={(event) => {
                                                    setTeacherId(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="Teacher Name"
                                                size = 'small'
                                                fullWidth="true"
                                                variant="outlined"
                                                value={teacherName}
                                                onChange={(event) => {
                                                    setTeacherName(event.target.value);
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                label="contact"
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
                                                select
                                                label="School Placement"
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
                                                select
                                                label="Gender"
                                                size = 'small'
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
                                                select
                                                label="Class Type"
                                                size = 'small'
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
                                    </Grid>
                                </AccordionDetails>
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={addTeacher}>
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

            {/* =================================== EDIT TEACHER DIALOG =================================  */}
            <Dialog onClose={handleCloseEditDialog} open={openEditDialog} fullWidth={true} maxWidth={false} keepMounted>
                <DialogTitle>EDIT TEACHER</DialogTitle>
                <DialogContent dividers>
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
                                        <AccordionSummary>TEACHER IMAGE</AccordionSummary>
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
                                                                            <img style = {{width:"100%",height:"250px",objectFit:"contain", margin:'auto'}} src = {"../images/teacher/" + image} />
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
                                    <Grid item xs={4}>
                                        <TextField
                                            disabled
                                            label="Teacher ID"
                                            size = 'small'
                                            fullWidth="true"
                                            variant="outlined"
                                            value={teacherId}
                                            onChange={(event) => {
                                                setTeacherId(event.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="Teacher Name"
                                            size = 'small'
                                            fullWidth="true"
                                            variant="outlined"
                                            value={teacherName}
                                            onChange={(event) => {
                                                setTeacherName(event.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            label="contact"
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
                                            select
                                            label="School Placement"
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
                                            select
                                            label="Gender"
                                            size = 'small'
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
                                            select
                                            label="Class Type"
                                            size = 'small'
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
                                </Grid>
                            </AccordionDetails>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={editTeacher}>
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
                    >CLOSE</Button>
                </DialogActions>
            </Dialog>

            {/* =================================== DELETE TEACHER DIALOG =================================  */}
            <Dialog onClose={handleCloseDeleteDialog} open={openDeleteDialog}>
                <DialogTitle>DELETE TEACHER</DialogTitle>
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
                                Are you sure you want to delete this teacher?
                            </Typography>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <form method="post" onSubmit={deleteTeacher}>
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
