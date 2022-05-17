import { makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinInfo from "../components/CoinInfo";
import { SingleCoin } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { numberWithCommas } from "../components/Carousel";

const SeparateCoin =()=>{

    const {id}=useParams();
    const [coin, setCoin] = useState();
    const {currency,symbol}=CryptoState();

    const fetchSeparateCoin= async()=>{
        const {data}=await axios.get(SingleCoin(id));
        setCoin(data);
        console.log(coin,data);
    }

    useEffect(()=>{
        fetchSeparateCoin(id);
        console.log("Sep ",id);
        console.log(coin);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const useStyles=makeStyles((theme)=>({
        container:{
            display:"flex",
            [theme.breakpoints.down("md")]:{
                flexDirection:"column",
                alignItems:"center"
            }
        },
        sidebar:{
            width:"30%",
            [theme.breakpoints.down("md")]:{
                width:"30%"
            },
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            marginTop:25 
        },
        heading:{
            fontWeight:"bold",
            marginBottom:20,
            fontFamily:"Poppins"
        },
        description:{
            width:"100%",
            padding:25,
            paddingBottom:15,
            paddingTop:0,
            fontFamily:"Poppins",
            textAlign:"justify"
        },
        marketData:{
            alignSelf:"start",
            padding:25,
            paddingTop:10,
            width:"100%",
            [theme.breakpoints.down("md")]:{
                display:"flex",
                justifyContent:"space-around"
            },
            [theme.breakpoints.down("sm")]:{
                flexDirection:"column",
                alignItems:"center"
            },
            [theme.breakpoints.down("xs")]:{
                alignItems:"start"
            }
        }
    }));

    const classes=useStyles();

    return(
        <div className={classes.container}>
            <div className={classes.sidebar}>
                <img src={coin?.image.large} alr={coin?.name} height="200" style={{marginBottom:20}}/>
                <Typography variant="h3" className={classes.heading}>{coin?.name}</Typography>
                
                <div className={classes.marketData}>
                    <span style={{display:"flex"}}>
                        <Typography variant="h6" style={{ fontFamily:"Poppins"}}>Rank:</Typography>
                        &nbsp; &nbsp;
                        <Typography variant="" style={{fontWeight:"400", fontFamily:"Poppins",padding:5}}>{coin?.market_cap_rank}</Typography>
                    </span>
                    <span style={{display:"flex"}}>
                        <Typography variant="h6" style={{fontFamily:"Poppins"}}>Current Price:</Typography>
                        &nbsp; &nbsp;
                        <Typography variant="" style={{fontWeight:"400", fontFamily:"Poppins",padding:5}}>{symbol}{" "}{numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}</Typography>
                    </span>
                    <span style={{display:"flex"}}>
                        <Typography variant="h6" style={{ fontFamily:"Poppins"}}>Market Cap:</Typography>
                        &nbsp; &nbsp;
                        <Typography variant="" style={{fontWeight:"400", fontFamily:"Poppins", padding:5}}>{symbol}{" "}{numberWithCommas(coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0,-6))}</Typography>
                    </span>
                </div>
            </div>
           {coin!==undefined ? <CoinInfo coin={coin} /> :<></>}
        </div>
    )
}

export default SeparateCoin;