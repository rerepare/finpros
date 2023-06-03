import React, { Fragment } from 'react';
import CardDashboard from './dashboardComponent/cardDashboard';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Grid, Card, CardContent, Typography } from '@material-ui/core';

export default function Dashboard(props) {
  
  return (
    <div>
      <Grid container spacing={4}>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          {/* <Card className="card-box bg-premium-dark border-0 text-light mb-4"> */}
          <Card style={{background:'linear-gradient(to right, #434343 0%, #000000 100%)'}}>
            <CardContent className="p-3">
              <div className="d-flex align-items-start">
                <div style={{fontWeight:"bold"}}>
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    Active Students
                  </small>
                  <span className="font-size-xxl mt-1" style={{fontSize:30, color:"#FFFFFF", fontWeight:"bolder"}}>586,356</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-success d-50 rounded-circle d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="font-size-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="text-success mr-1"
                />
                <span className="text-success pr-1">15.4%</span>
                <span className="text-white-50">increase this month</span>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          {/* <Card className="card-box bg-midnight-bloom text-light mb-4"> */}
          <Card style={{background:'linear-gradient(to right, #2b5876 0%, #4e4376 100%)'}}>
            <CardContent className="p-3">
              <div className="d-flex align-items-start">
                <div style={{fontWeight:"bold"}}>
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    Current Balance
                  </small>
                  <span style={{fontSize:30, color:"#FFFFFF", fontWeight:"bolder"}}>23,274</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-primary d-50 rounded-circle d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['far', 'lightbulb']}
                      className="font-size-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="text-warning mr-1"
                />
                <span className="text-warning pr-1">7.4%</span>
                <span className="text-white-50">same as before</span>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          {/* <Card className="card-box bg-plum-plate text-light mb-4"> */}
          <Card style={{background:'linear-gradient(to right, #667eea 0%, #764ba2 100%)'}}>
            <CardContent className="p-3">
              <div className="d-flex align-items-start">
                <div style={{fontWeight:"bold"}}>
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    [Month] Earnings
                  </small>
                  <span style={{fontSize:30, color:"#FFFFFF", fontWeight:"bolder"}}>345</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-primary d-50 rounded-circle d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="font-size-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-down']}
                  className="text-white mr-1"
                />
                <span className="text-white px-1">15.4%</span>
                <span className="text-white-50">less orders</span>
              </div>
            </CardContent>
          </Card>
        </Grid>

        <Grid item lg={3} md={4} sm={6} xs={12}>
          {/* <Card className="card-box bg-premium-dark border-0 text-light mb-4"> */}
          <Card style={{background:'linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%)'}}>
            <CardContent className="p-3">
              <div className="d-flex align-items-start">
                <div style={{fontWeight:"bold"}}>
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    User Totals
                  </small>
                  <span className="font-size-xxl mt-1" style={{fontSize:30, color:"#FFFFFF", fontWeight:"bolder"}}>586,356</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-success d-50 rounded-circle d-flex align-items-center justify-content-center">
                    <FontAwesomeIcon
                      icon={['far', 'chart-bar']}
                      className="font-size-xl"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <FontAwesomeIcon
                  icon={['fas', 'arrow-up']}
                  className="text-success mr-1"
                />
                <span className="text-success pr-1">15.4%</span>
                <span className="text-white-50">increase this month</span>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <CardDashboard />

    </div>
  );
}