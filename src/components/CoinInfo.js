import { Button, CircularProgress, createTheme, LinearProgress, makeStyles, ThemeProvider } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart }            from 'react-chartjs-2'
import { HistoricalChart } from "../config/api";
import { CryptoState } from "../CryptoContext";
import { chartDays } from "../config/data";
import SelectButtons from "./SelectButtons";

export const CoinInfo=(coin)=>{

    const [hData,setHData]=useState([]);
    const [days,setDays]=useState(1);

    const {currency}=CryptoState();
    const [loading,setLoading]=useState(true)

    const fetchHData=async()=>{
        const {data}=await axios.get(HistoricalChart(coin.coin['id'],days,currency));
        console.log("Data ",data,coin.coin['id'],days,currency);
        setLoading(false);
        setHData(data.prices);
    }

    useEffect(()=>{
        fetchHData();
        console.log("coin",coin.coin);
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[days]);

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:"dark"
        }
    });

    const useStyles = makeStyles((theme) => ({
        container: {
          width: "75%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
          padding: 40,
          [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
          },
        },
      }));
    
      const classes = useStyles();

    //const classes=useStyles();

    return(
        <ThemeProvider>
            <div className={classes.container}>
                {!hData || loading ? <LinearProgress  style={{ color: "gold" }} /> :
                 <Line
                    data={{
                        labels:hData.map((coin)=>{
                          let date= new Date(coin[0]);
                          let time = date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                            : `${date.getHours()}:${date.getMinutes()} AM`;
                        return days === 1 ? time : date.toLocaleDateString();
                        }),
                        datasets:[
                            {
                                data:hData.map((coin)=>coin[1]),
                                label:`Price ( past ${days} Day(s)) in ${currency}`,
                                borderColor:"#EEBC1D"
                            }
                        ]
                    }}
                    options={{
                        elements:{
                            point:{
                                radius:1
                            }
                        }
                    }}
                />
                }
                <div style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%"
              }}>
                    {chartDays.map(day=>
                        <SelectButtons key={day.value} onClick={()=>{setDays(day.value);
                            setLoading(false);}}
                        selected={day.value===days} >{day.label}</SelectButtons>
                    )}
                </div>
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo;