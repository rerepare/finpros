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

    const login = (event) => {
        event.preventDefault();

        const user = allUser.filter(
            (data) =>
                data.userName == userName && data.password == md5(password)
        );

        let data = {
            username: userName,
            password: password,
        };

        axios.post("/login_check", data).then(() => {
            if (user.length > 0) {
                window.location.href = "/dashboard";
            } else {
                console.log("FAILED :(");
            }
        });
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

    // const Label = styled.label`
    //     font-weight: 500;
    // `

    const Test = styled.div`
        display: flex;
        background-color: #ff6d28;
    `;

    // return (
    //     <LoginContainer>
    //         <div className="image-container">
    //             <img src="/school.jpg" alt="logo mostrans" />
    //         </div>
    //         <div className="login-content">
    //             <h3 className="mb-1">Login</h3>
    //             <Grid item xs={12}>
    //                 <div className="pb-2">
    //                     <label>User Name</label>
    //                     <input
    //                         fullWidth={true}
    //                         value={userName}
    //                         onChange={(event) => {
    //                             setUserName(event.target.value);
    //                         }}
    //                         className="form-control"
    //                         aria-describedby="emailHelp"
    //                         placeholder="Enter username"
    //                     />
    //                 </div>
    //                 <div>
    //                     <label>Password</label>
    //                     <input
    //                         placeholder="Password"
    //                         // fullWidth={true}
    //                         value={password}
    //                         onChange={(event) => {
    //                             setPassword(event.target.value);
    //                         }}
    //                         className="form-control"
    //                     />
    //                 </div>
    //             </Grid>
    //             <form method="post" onSubmit={login}>
    //                 <Button
    //                     type="submit"
    //                     variant="contained"
    //                     className="mt-2"
    //                     color="primary"
    //                 >
    //                     Login
    //                 </Button>
    //             </form>
    //         </div>
    //     </LoginContainer>
    // );

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
                    <Grid
                        container
                        direction="row"
                        alignItems="center"
                        justifyContent="center"
                        spacing={1}
                    >
                        <Card>
                            <CardContent>
                                {/* <Grid item xs = {12}>
                    <Typography align='center'>
                      Hi, here's a little present for the second most beautiful person in the whole world that i love so much, hope this little present could help you out, once again, ilysb.
                    </Typography>
                    <Typography align='center'>
                      ini bisa dipake untuk sambutan nama aplikasi yaa sayaangg
                    </Typography>
                  </Grid> */}
                                <Grid>
                                    <Typography variant="h6" className="pb-2">
                                        Log In
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className="pb-2">
                                    <label className="pb-1">User Name</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth={true}
                                        size="small"
                                        value={userName}
                                        onChange={(event) => {
                                            setUserName(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12} className="pb-2">
                                    <label className="pb-1">Password</label>
                                    <TextField
                                        variant="outlined"
                                        fullWidth={true}
                                        size="small"
                                        value={password}
                                        onChange={(event) => {
                                            setPassword(event.target.value);
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <form method="post" onSubmit={login}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            fullWidth={true}
                                            type="submit"
                                        >
                                            login
                                        </Button>
                                    </form>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}
