import React from 'react'
import {useState, useEffect} from 'react'
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import NavBar from '../components/NavBar'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import {TextField} from '@mui/material';
import Grid from '@mui/material/Grid';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import { useContext} from "react";
import { UserContext } from "../context/userContext";
import Rating from '@mui/material/Rating';

const theme = createTheme();


/**
 * Profile page for show info about user
 * @returns {JSX.Element}
 * @constructor
 */
export default function Profile() {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birth, setBirth] = React.useState('');
    const [imgProfile, setImgProfile] = React.useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [profile, setProfile] = useState('');
    const [city, setCity] = useState('');
    const [rating, setRating] = useState(0);
    const [numOfRating, setNumOfRating] = useState(0);
    const {user} = useContext(UserContext);


    const getUser = async () => {
        const id = user.id;
        await fetch("http://localhost:3001/user/" + id, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (response) {
            return response.json();
        }).then(function (user) {
            if (user) {
                setProfile(user['sendUser']);
                setEmail(user['sendUser'].email)
                setFirstName(user['sendUser'].firstName)
                setLastName(user['sendUser'].lastName)
                setBirth(user['sendUser'].birth)
                setImgProfile(user['sendUser'].imageProfile)
                setIsLoading(false);
                setCity(user['sendUser'].city)
                setRating(user['sendUser'].rating)
                setNumOfRating(user['sendUser'].numOfRating)
                return;

            } else {
                console.log('no user');
            }
        });
    }
    useEffect(() => {
        getUser()
    }, [])


    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    };
    const handleChangeFirstName = (event) => {
        setFirstName(event.target.value);
    };
    const handleChangeLastName = (event) => {
        setLastName(event.target.value);
    };
    const handleChangeBirth = (event) => {
        setBirth(event.target.value);
    };
    const getUrl =()=>{
        return imgProfile.toString()
    }

    return (

        <ThemeProvider theme={theme}>

            <NavBar/>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div>
                    {/* load spinner */}
                    <Backdrop
                        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
                        open={isLoading}
                    >
                        <CircularProgress color="inherit"/>
                    </Backdrop>

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                        <Avatar
                            alt="Remy Sharp"
                            src={imgProfile}
                            sx={{width: 80, height: 80}}
                        />
                        <Rating name="rating" value={rating/numOfRating} precision={0.5} dir={"ltr"} readOnly />
                        <Box component="form"
                             sx={{
                                 marginTop: 4,
                                 display: 'flex',
                                 flexDirection: 'column',
                                 alignItems: 'center',
                                 mt: 2
                             }}>

                            <TextField
                                id="outlined-multiline-flexible"
                                margin="normal"

                                label="אימייל"
                                multiline
                                maxRows={4}
                                value={email}
                                onChange={handleChangeEmail}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                margin="normal"
                                label="שם פרטי"
                                multiline
                                maxRows={4}
                                value={firstName}
                                onChange={handleChangeFirstName}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                margin="normal"
                                label="שם משפחה"
                                multiline
                                maxRows={4}
                                value={lastName}
                                onChange={handleChangeLastName}
                            />

                            <Grid item xs={12} margin="normal"
                                  sx={{ width: 184, mt: 2}}>
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <DatePicker
                                        label="תאריך לידה"
                                        value={birth}
                                        onChange={(newValue) => {
                                            setBirth(newValue);
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                            </Grid>
                        </Box>
                    </Box>
                </div>
            </Container>
        </ThemeProvider>
    );
}

