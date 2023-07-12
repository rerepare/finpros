import React, {useEffect} from "react";
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
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
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

export default function HistoryTable(props) {
  const { allHistory } = props;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, allHistory.length - page * rowsPerPage);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTransType, setSearchTransType] = React.useState("");
  const [openDetailsDialog, setOpenDetailsDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  //GET DATABASE
  const [id, setId] = React.useState("");
  const [studentId, setStudentId] = React.useState("");
  const [userId, setUserId] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [payMethod, setPayMethod] = React.useState("");
  const [actor, setActor] = React.useState("");
  const [transType, setTransType] = React.useState("");
  const [description, setDescription] = React.useState("");

  //FUNCTION OPERATIONAL
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
  };
  const handleOpenDetailsDialog = (data) => {
      datas = allHistory.filter(x => x.id == data.id)        
      setOpenDetailsDialog(true);
  };
  const handleCloseDetailsDialog = () => {
      datas = allHistory
      setOpenDetailsDialog(false);
  };

  //FUNCTION DELETE
  const deleteHistory = (e) => {
    e.preventDefault();

    let data = {
        id: id,
    };
    axios.post("/deleteHistory", data).then(() => {
        handleCloseEditDialog();
        window.location.href = "/history";
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
      {console.log(allHistory)}
      <Typography variant="h4">RIWAYAT TRANSAKSI</Typography>
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
                      setSearchTransType(event.target.value);
                  }}
                  value={searchTransType}
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
                              style={{ wordBreak: "break-word"}}
                          >
                              Tanggal
                          </StyledTableCell>
                          <StyledTableCell
                              align="center"
                              style={{ wordBreak: "break-word" }}
                          >
                              Tipe Transaksi
                          </StyledTableCell>
                          <StyledTableCell
                              align="center"
                              style={{ wordBreak: "break-word"}}
                          >
                              Amount
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
                          ? allHistory
                                .filter((data) => {
                                    if (searchTransType == "") {
                                        return data;
                                    } else if (
                                        data.transType
                                            .toLowerCase()
                                            .includes(
                                                searchTransType.toLowerCase()
                                            )
                                    ) {
                                        return data;
                                    }
                                })
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                          : allHistory
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
                                  {data.created_at}
                              </StyledTableCell>
                              <StyledTableCell
                                  component="th"
                                  align="center"
                                  scope="row"
                              >
                                  {data.transType}
                              </StyledTableCell>
                              <StyledTableCell
                                  component="th"
                                  align="center"
                                  scope="row"
                              >
                                  {data.amount}
                              </StyledTableCell>
                              <StyledTableCell
                                  component="th"
                                  align="center"
                                  scope="row"
                              >
                                  {data.newBalance}
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
                              count={allHistory.length}
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

      {/* ================================= DETAILS TRANSACTION DIALOG ===============================  */}
      <Dialog onClose={handleCloseDetailsDialog} open={openDetailsDialog} fullWidth={true}>
                <DialogTitle className={classes.dialogTitle }>
                    DETAIL TRANSAKSI
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container spacing ={1}>
                        <Grid item xs = {12}>
                            <div>
                            <Accordion expanded = {true} style = {{width: '100%'}}>
                                <AccordionDetails>
                                    <Grid container direction='row' alignItems='center' justifyContent="center" spacing={1}>
                                        <Grid item = {12}>
                                            <Card>
                                                <CardContent >
                                                {
                                                    datas.map((data, key) => (
                                                        <div>
                                                          <Typography>
                                                                ID Transaksi : {data.id}
                                                            </Typography>
                                                            <Typography>
                                                                ID Siswa : {data.student_id}
                                                            </Typography>
                                                            <Typography>
                                                                Admin : {data.user_id}
                                                            </Typography>
                                                            <Typography>
                                                                Tipe Transaksi : {data.transType}
                                                            </Typography>
                                                            <Typography>
                                                                Amount : {data.amount}
                                                            </Typography>
                                                            <Typography>
                                                                Saldo : {data.newBalance}
                                                            </Typography>
                                                            <Typography>
                                                                Metode Pembayaran : {data.payMethod}
                                                            </Typography>
                                                            <Typography>
                                                                Payer : {data.actor}
                                                            </Typography>
                                                            <Typography>
                                                                Deskripsi : {data.description}
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

      {/* ================================= DELETE TRANSAKSI DIALOG ================================  */}
      <Dialog onClose={handleCloseDeleteDialog} open={openDeleteDialog}>
        <DialogTitle>HAPUS TRANSAKSI</DialogTitle>
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
                        Anda yakin ingin menghapus riwayat transaksi ini?
                    </Typography>
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <form method="post" onSubmit={deleteHistory}>
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
  )
}
