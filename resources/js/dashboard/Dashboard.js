import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Card, CardContent, Typography } from '@material-ui/core';

import StudentTableDashboard from '../activeStudents/studentsComponent/StudentTableDashboard';

let render = 0

export default function Dashboard() {

  const [totalBalance, setTotalBalance] = React.useState(0)

  if(render == 0){
    for (let index = 0; index < student.length; index++) {
      const element = student[index];     
      setTotalBalance(prevTotal => prevTotal + parseInt(element.balance))              
    }
    
    render = 1
  }

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
                  <Grid item lg={6} md={6} sm={6} xs={12}>
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

                  <Grid item lg={6} md={6} sm={6} xs={12}>
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
                </Grid>                        
              </div>
            )
          }
        })()}

        <Grid container direction='row' justifyContent='center' alignItems='center' spacing={1}>
          <Grid item xs={12}>
            <div>
              <StudentTableDashboard student = {student}/>
            </div>
          </Grid>
        </Grid>

         {/* <Grid item lg={3} md={4} sm={6} xs={12}>
          <Card style={{background:'linear-gradient(to right, #667eea 0%, #764ba2 100%)'}}>
            <CardContent className="p-3">
              <div className="d-flex align-items-start">
                <div style={{fontWeight:"bold"}}>
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    [Month] Earnings
                  </small>
                  <span style={{fontSize:50, color:"#FFFFFF", fontWeight:"bolder"}}>345</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </Grid> */}      
    </div>
  );
}