import React, { useState } from 'react';
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

var md5 = require("md5");

let renderValue = 0;
let allUser = [];

export default function Login(props) {
    if (renderValue == 0) {
        allUser = user;
        renderValue = 1;
    }

    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = allUser.filter(
            (data) =>
                data.userName == userName && data.password == md5(password)
        );

        let data = {
            userName: userName,
            password: password,
        };

        axios.post("/login_check", data).then(() => {
            if (user.length > 0) {
                // Success message
                setSnackbarSeverity('success');
                setSnackbarMessage('Login successful!');
                window.location.href = "/dashboard";
            } else {
                // Error message
                setSnackbarSeverity('error');
                setSnackbarMessage('Login failed. Please check your username and password.');
            }
            setOpenSnackbar(true);
        });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit(event);
        }
    };

    const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const LoginContainer = styled.div`
        display: grid;
        height: 100vh;
        overflow-x: hidden;
        grid-template-columns: 1fr 1fr;
        .image-container {
            display: grid;
            // place-items: center;
            
            // background-position: center;
            // background-repeat: no-repeat;
            // background-size: cover;
            img {
                // max-width: 100vh;
                height: 100vh;
                object-fit:cover;
                width:110vh;
                // maxHeight:100vh;
                
            }
        }
        .login-content {
            display: grid;
            padding: 2rem 1rem;
            place-items: center;   
            // background-color: #ff6d28;

        }
        .login-form {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background-color: #ff6d28;
        }
        }
    `;

    const Test = styled.div`
        display: flex;
        background-color: #ff6d28;
    `;

    return (
        <div>
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                direction="row"
                style={{
                    height: "100vh",
                    backgroundImage:
                        "linear-gradient(#FCE700 0%, #FF6D28 100%)",
                }}
            >
                <Grid item xs={12} md={8}>
                    <img
                        src="/school.jpg"
                        style={{
                            objectFit: "cover",
                            width: "145vh",
                            maxHeight: "100vh",
                        }}
                    />
                </Grid>
                   
                <Grid item xs={12} md={4} style={{ padding: "10px" }}>
                <Typography variant="h6"  style={{ color: "#FFFFFF", fontWeight:"bold"}}>
                STUDENT SAVING MANAGEMENT SYSTEM
                </Typography>
                    <Card>
                        <CardContent>
                            <form method="post" onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
                                <Typography
                                fontWeight="bold"
                                >Log In</Typography>
                                <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                spacing={1}>
                                    <Grid item xs={12}>
                                        <label className="pb-1">User Name</label>
                                        <TextField
                                            variant="outlined"
                                            placeholder="username"
                                            fullWidth={true}
                                            size="small"
                                            value={userName}
                                            onChange={(event) => {
                                                setUserName(event.target.value);
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <label className="pb-1">Password</label>
                                        <TextField
                                            variant="outlined"
                                            placeholder="password"
                                            fullWidth={true}
                                            size="small"
                                            value={password}
                                            type={showPassword ? "text" : "password"}
                                            onChange={(event) => {
                                                setPassword(event.target.value);
                                            }}
                                            InputProps={{
                                                endAdornment: (
                                                  <Button onClick={handleTogglePasswordVisibility}>
                                                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                                  </Button>
                                                ),
                                              }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth={true}
                                            type="submit"
                                        >
                                            login
                                        </Button>
                                        <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleSnackbarClose}>
                                            <MuiAlert elevation={6} variant="filled" onClose={handleSnackbarClose} severity={snackbarSeverity}>
                                                {snackbarMessage}
                                            </MuiAlert>
                                        </Snackbar>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}
