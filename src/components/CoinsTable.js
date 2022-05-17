import { Container, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CoinList } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { Typography,createTheme } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { numberWithCommas } from "./Carousel";
import { Pagination } from "@material-ui/lab";

export const CoinsTable=()=>{
    const [coins,setCoins]=useState([]);
    const [loading,setLoading]=useState(false);
    const [search,setSearch]=useState("");
    const [page,setPage]=useState(1);
    const {currency,symbol}=CryptoState();

    const fectCoinsList= async()=>{
        setLoading(true);
        const {data}=await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    }

    useEffect(()=>{
        fectCoinsList();
    },[currency]);
    
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:"dark"
        }
    });

    const useStyles=makeStyles(()=>({
        row:{
            backgroundColor:"#16171a",
            cursor:"pointer",
            fontFamily:"Poppins",
            "&:hover":{
                backgroundColor:"#131111"
            }
        },
        Pagination:{
            "& .MuiPaginationItem-root":{
                  color:"gold"
            }
        }
    }))

    const classes=useStyles();
    const history=useNavigate();

    const handleSearch=()=>{
        return coins.filter((coin)=>
            coin.name.toLowerCase().includes(search)  ||
            coin.symbol.toLowerCase().includes(search)
        );
    }

    return(
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign:"center"}}>
            <Typography variant="h4" style={{
                fontFamily:"Poppins"
                    }}>Coins Prices by Marketcap</Typography>

                    <TextField label="Search for coin" variant="outlined"
                    style={{marginBottom:20,width:"100%"}}
                    onChange={(e)=>setSearch(e.target.value)}></TextField>
                    <TableContainer>
                       { loading ? <LinearProgress style={{background:"gold"}}></LinearProgress>
                       :<Table>
                            <TableHead style={{backgroundColor:"#EEBC1D"}}>
                            <TableRow>
                                {["Coin","Price","24h Change","MarketCap"].map((head)=>(
                                    <TableCell style={{color:"black",fontFamily:"Poppins",fontWeight:700}}
                                key={head}
                                align={head==="Coin"?"left":"right"}>{head}</TableCell>
                                ))}
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                    {handleSearch().slice((page-1)*10, (page-1)*10 +10).map((row)=>{
                                        const profit=row.price_change_percentage_24h >=0;
                                        return(
                                            <TableRow className={classes.row} onClick={()=>history(`/coins/${row.id}`)} key={row.name}>
                                                <TableCell component="th" scope="row" style={{display:"flex",gap:15}}>
                                                <img src={row?.image} alt={row.name} height="50" style={{marginBottom:10}} />
                                                <div style={{display:"flex",flexDirection:"column"}}>
                                                    <span style={{textTransform:"uppercase",fontSize:15}}>{row?.symbol}</span>
                                                    <span style={{color:"darkgrey"}}>{row?.name}</span>
                                                </div>
                                                </TableCell>                   
                                                <TableCell align="right">{symbol}{""}{numberWithCommas(row.current_price.toFixed(2))}</TableCell>
                                                <TableCell align="right" style={{color:profit>0 ?"rgb(14,203,129)" : "red", fontWeight:500}}>{profit && "+"}{row.price_change_percentage_24h.toFixed(2)}</TableCell>
                                                <TableCell align="right">{symbol}{""}{numberWithCommas(row.market_cap.toString().slice(0,-6))}</TableCell>

                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                        }
                    </TableContainer>
                    <Pagination classes={{ul:classes.Pagination}} 
                    onChange={(_,value)=>{
                        setPage(value);
                        window.scroll(0,450);
                    }}
                    style={{padding:20,width:"100%",display:"flex",justifyContent:"center"}}
                    count={(handleSearch()?.length/10).toFixed(0)}></Pagination>
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable;