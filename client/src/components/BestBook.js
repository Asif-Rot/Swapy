import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/userContext";
import {useHistory} from 'react-router-dom';
import Button from "@mui/material/Button";
import { Typography } from '@mui/material';

export default function SpringCarousel() {
    const [items, setItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const history=useHistory();
    const {user} = useContext(UserContext);

    const handleDetails =  async (itemID) => {
        await fetch('http://localhost:3001/item/' + itemID,{
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((json) => {
                // console.log(json)
            })
        history.push('/itemdetails/'+itemID,{
            item: itemID
        })
    }

    const getType = (type) => {
        if(type === "book")
            return "ספר"
        else
            return "משחק וידיאו"
    }

    const getAllItems = async () => {
            await fetch('http://localhost:3001/item/allitem')
                .then((res) => res.json())
                .then((json) => {
                    setItems(json)
                })
    }

    const getItemByGenreConsole = async () => {
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
                const rand = Math.floor(Math.random() * 3);
                fetch('http://localhost:3001/item/getitembygenreconsole/' + (user['sendUser'].genres[rand]) + '/'
                    + (user['sendUser'].console))
                    .then((res) => res.json())
                    .then((json) => {
                        setFavorites(json);
                    })
            }
        })
    }

    useEffect(() => {
        getAllItems()
        getItemByGenreConsole()
    }, [])

    return (
        <div>
            <Box display="flex"
                 alignItems="center"
                 justifyContent="center">
                <h2>הפריטים החדשים באתר :</h2>
            </Box>
        <Grid container justifyContent="center">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {md: 'row'},
                    alignItems: 'center',
                    bgcolor: 'background.paper',
                    // bgcolor:  'black',
                    overflow: 'auto',
                    borderRadius: '16px',
                    boxShadow: 15,
                    fontWeight: 'bold',
                    m: 10,
                    justifyContent: 'flex-start',
                    alignContent: 'flex-start',

                }}
            >
                {items.length?
                    items.slice(items.length-5,items.length).map((item, i) => (
                <Grid item mx={1} key={i}>                
                    <Card sx={{display: "flex",flexDirection: "column", boxShadow:2, height:400}}>
                    <Typography  variant="inherit" textAlign={'center'} maxHeight={25} marginTop={1.5}>{item.name}</Typography>
                        <Button onClick={handleDetails.bind(this,item._id)} sx={{height:320}}>
                        <img src={item.image}
                             alt='item_img'
                             width={200}
                        />
                        </Button>
                        <Typography   textAlign={'center'} > <b><u>קטגוריה</u>:</b> {getType(item.item_type)}</Typography>
                    </Card>
                </Grid>
                    )) : <p><br/>אין פריטים עדיין...</p>}
            </Box>
        </Grid>

            {/**
                The best five book in web
             */}

            <Box display="flex"
                 alignItems="center"
                 justifyContent="center">
                <h2>המומלצים ביותר עבורך :</h2>
            </Box>
            <Grid container justifyContent="center">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {md: 'row'},
                        alignItems: 'center',
                        bgcolor: 'background.paper',
                        overflow: 'auto',
                        borderRadius: '16px',
                        boxShadow: 15,
                        fontWeight: 'bold',
                        m: 10,
                        justifyContent: 'flex-start',
                        alignContent: 'flex-start',
                    }}
                >
                    {favorites.length?
                        favorites.map((item, i) => (
                            <Grid item mx={1} key={i}>
                                <Card sx={{display: "flex",flexDirection: "column", boxShadow:2, height:400}}>
                                    <Typography  variant="inherit" textAlign={'center'} maxHeight={25} marginTop={1.5}>{item.name}</Typography>
                                    <Button onClick={handleDetails.bind(this,item._id)} sx={{height:320}}>
                                        <img src={item.image}
                                             alt='item_img'
                                             width={200}
                                        />
                                    </Button>
                                    <Typography   textAlign={'center'} > <b><u>קטגוריה</u>:</b> {getType(item.item_type)}</Typography>
                                </Card>
                            </Grid>
                        )) : <p><br/>אין פריטים עדיין...</p>}
                </Box>
            </Grid>
        </div>
    );
}