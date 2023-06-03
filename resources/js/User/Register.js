import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Register() {

const [fullName, setFullName] = React.useState("")
const [userName, setUserName] = React.useState("")
const [password, setPassword] = React.useState("")

const register = (event) => {
    event.preventDefault();

    let data = {
        fullName : fullName,
        userName : userName,
        password : password
    }

    axios.post('/registration',data).then(()=>{
        window.location.href = "/register"
      })
}

  return (
    <Fragment>        
        <Grid container direction='row' alignItems='center' justifyContent='center' spacing = {1}>
            <Grid item xs={4}>
                <Card style = {{padding:'5px'}}>
                    <CardContent>
                        <Grid container direction='row' alignItems='center' justifyContent='center' spacing={1}>
                            <Grid item xs = {12}>
                                <TextField                                
                                label="Full Name"
                                fullWidth="true"                                                                
                                variant="outlined" 
                                value={fullName}
                                onChange={(event) => {setFullName(event.target.value)}}                               
                                />
                            </Grid>
                            <Grid item xs = {12}>
                                <TextField                                
                                label="User Name"
                                fullWidth="true"                                                                
                                variant="outlined"
                                value={userName}
                                onChange={(event) => {setUserName(event.target.value)}}                                 
                                />
                            </Grid>
                            <Grid item xs = {12}>
                                <TextField                                
                                label="Password"
                                fullWidth="true"                                                                
                                variant="outlined"
                                value={password}
                                type="password"
                                onChange={(event) => {setPassword(event.target.value)}}                                 
                                />
                            </Grid>    
                            <Grid item xs = {12}>
                                <form method="post" onSubmit={register}>
                                    <Button variant='contained' color='primary' type="submit" style={{float:'right'}}>
                                        REGIST ME!
                                    </Button>
                                </form>
                            </Grid>                                                    
                        </Grid>                       
                    </CardContent>                    
                </Card>
            </Grid>
        </Grid>

        <Grid>
        
        </Grid>
    </Fragment>
  )
}
