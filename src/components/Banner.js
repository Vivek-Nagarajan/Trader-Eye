import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import Carousel from "./Carousel";

const useStyles=makeStyles(()=>({
    Banner:{
        backgroundImage:"url(./banner1.jpg)"
    },
    bannerContent:{
        display:"flex",
        height:400,
        flexDirection:"column",
        paddingTop:25,
        justifyContent:"space-around"
    },
    tagline:{
        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
        color:"darkgrey",
        fontFamily:"Poppins",
    }
}))

export const Banner=()=>{

    const classes=useStyles();
    return(
        <div className={classes.Banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography variant="h2" style={{
                        fontWeight:"bold",
                    }}>Trader Eye</Typography>
                    <Typography variant="h5" style={{
                        fontWeight:"normal",
                        fontSize:15
                    }}>Know Your Crypto</Typography>
                </div>
                <Carousel/>
            </Container>
        </div>
    )
}

export default Banner;