import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { Grid, Card, CardContent, Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import StudentTableDashboard from '../activeStudents/studentsComponent/StudentTableDashboard';
import { makeStyles, useTheme } from '@material-ui/core/styles';

//Pages
import Transaction from '../transaction/Transaction';
import History from '../history/History';
import Report from '../history/Report';

let render = 0

const useStyles = makeStyles((theme) => ({
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

export default function Dashboard() {
  const classes = useStyles();
  const theme = useTheme();
  const [totalBalance, setTotalBalance] = React.useState(0)
  

  if(render == 0){
    for (let index = 0; index < student.length; index++) {
      const element = student[index];     
      setTotalBalance(prevTotal => prevTotal + parseInt(element.balance))              
    }
    
    render = 1
  }

    const cardStyles = {
      cursor: "pointer",
      background: "linear-gradient(to bottom, #7E1717 0%, #E55807 100%)",
      
      borderRadius: "8px",
      color: "#FFFFFF",
      height: "100px", // Add height to fill the entire grid item
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    };
  
    const handleClick = (path) => {
      window.location.href = path;
    };

  return (
    <div>
        {(()=>{
          if(user.isSuperAdmin == true)
          {
            return(
              <div>
                <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1}>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Card style={{background:'linear-gradient(to right, #434343 0%, #000000 100%)'}}>
                      <CardContent className="p-3">
                        <div className="d-flex align-items-start">
                          <div style={{fontWeight:"bold"}}>
                            <small className="text-white-50 d-block mb-1 text-uppercase">
                              Active Students
                            </small>
                            <span className="font-size-xxl mt-1" style={{fontSize:50, color:"#FFFFFF", fontWeight:"bolder"}}>{totalStudent}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Card style={{background:'linear-gradient(to right, #2b5876 0%, #4e4376 100%)'}}>
                      <CardContent className="p-3">
                        <div className="d-flex align-items-start">
                          <div style={{fontWeight:"bold"}}>
                            <small className="text-white-50 d-block mb-1 text-uppercase">
                              Current Balance
                            </small>
                            <span style={{fontSize:50, color:"#FFFFFF", fontWeight:"bolder"}}>{totalBalance}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Card style={{background:'linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)'}}>
                      <CardContent className="p-3">
                        <div className="d-flex align-items-start">
                          <div style={{fontWeight:"bold"}}>
                            <small className="text-white-50 d-block mb-1 text-uppercase">
                              User Totals
                            </small>
                            <span className="font-size-xxl mt-1" style={{fontSize:50, color:"#FFFFFF", fontWeight:"bolder"}}>{totalUser}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>                
              </div>
            )
          }
          else
          {
            return(
              <div>
                <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Card>
                      <CardContent>
                        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1}>
                        <Grid item lg={4} md={4} sm={4} xs={12} onClick={() => {window.location.href="/transaction"}}>
                          <div style={cardStyles}>
                            <Typography variant="h6" style={{ fontWeight: "bold" }}>
                              TRANSAKSI
                            </Typography>
                          </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12} onClick={() => {window.location.href="/history"}}>
                          <div style={cardStyles}>
                            <Typography variant="h6" style={{ fontWeight: "bold" }}>
                              RIWAYAT TRANSAKSI
                            </Typography>
                          </div>
                        </Grid>

                        <Grid item lg={4} md={4} sm={4} xs={12} onClick={() => {window.location.href="/report"}}>
                          <div style={cardStyles}>
                            <Typography variant="h6" style={{ fontWeight: "bold" }}>
                              LAPORAN SISWA
                            </Typography>
                          </div>
                        </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>                        
              </div>
            )
          }
        })()}

        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={2}>
          <Grid item xs={12}>
            <div>
              <StudentTableDashboard student = {student}/>
            </div>
          </Grid>
        </Grid> 

      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Router>
            <Switch>
                <Route path='/transaction' exact component={Transaction}/>
                <Route path='/history' exact component={History}/>
                <Route path='/report' exact component={Report}/>
            </Switch>
        </Router>
      </main>
    </div>
  );
}