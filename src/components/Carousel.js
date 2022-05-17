import { makeStyles } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrendingCoins } from "../config/api";
import { CryptoState } from "../CryptoContext";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import { findByLabelText } from "@testing-library/react";

const useStyles=makeStyles((theme)=>({
    Carousel:{
        height:"50%",
        display:"flex",
        alignItems:"center"
    },
    CarouselItems:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        cursor:"pointer",
        textTransform:"uppercase",
        color:"white"
    }
}))


export function numberWithCommas(x) {
    if(x===null || x===undefined)
        return 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

export const Carousel=()=>{
    const [trending,setTrending]=useState([]);
    const classes=useStyles();
    const {currency}=CryptoState();
    const fetchTrendingCoins= async()=>{
        console.log("Called");
        const {data}= await axios.get(TrendingCoins(currency));
        console.log("Data",data);
        setTrending(data);
    };
    console.log("Trending",trending);
    useEffect(()=>{
        console.log("use effect");
        fetchTrendingCoins();
    },[currency]);

    const responsive={
        0:{
            items:2
        },
        512:{
            items:4
        }
    }


    const {symbol}=CryptoState();
    const items=trending.map((coin)=>{
        let profit=coin.price_change_percentage_24h >=0
        return(
            <Link className={classes.CarouselItems} to={`/coins/${coin.id}`}>
                <img src={coin?.image} alt={coin?.name} height="80" style={{marginBottom:10}} />
                <span>{coin?.symbol} &nbsp; <span>{ profit && "+"}{coin.price_change_percentage_24h?.toFixed(2)}</span> </span>
                <span style={{fontSize:22,fontWeight:500}}>{symbol}{numberWithCommas(coin?.current_price.toFixed(2))}</span>
            </Link> 
        )
    })

    return(
        <div className={classes.Carousel}>
            <AliceCarousel 
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1500}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}>
            </AliceCarousel>
        </div>
    )
}

export default Carousel;