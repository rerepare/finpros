import React from "react";

import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

var md5 = require("md5");

let renderValue = 0;
let allUser = [];

export default function Login() {
    if (renderValue == 0) {
        allUser = user;
        renderValue = 1;
    }

    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

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
                window.location.href = "/dashboard";
            } else {
                //failed message
                console.log("FAILED :(");
            }
        });
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSubmit(event);
        }
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
                <Grid item xs={12} md={4} style={{ padding: "30px" }}>
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
                                            type="password"
                                            onChange={(event) => {
                                                setPassword(event.target.value);
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
