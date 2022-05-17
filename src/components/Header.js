import react from "react";
import { AppBar, Container, createTheme, makeStyles, Menu, MenuItem, Select, ThemeProvider, Toolbar, Typography } from "@material-ui/core";
import {useNavigate} from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles=makeStyles(()=>({
    title:{
        flex:1,
        color:"gold",
        fontFamily:"Poppins",
        fontWeight:"bold",
        cursor:"pointer"
    }
}))



const Header =()=>{
    const classes=useStyles();
    const history=useNavigate();
    const darkTheme=createTheme({
        palette:{
            primary:{
                main:"#fff"
            },
            type:"dark"
        }
    });
    const {currency,setCurrency}=CryptoState();

    console.log(currency);
    return(
        <div>
            <ThemeProvider theme={darkTheme}>
            <AppBar color="transparent" position="static">
                <Container>
                    <Toolbar>
                        <Typography onClick={()=>history("/")} className={classes.title}>
                            Trader Eye
                        </Typography>

                        <Select variant="outlined" style={{
                            width:100, height:40, marginLeft:15
                        }} value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                            <MenuItem value="INR">INR</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar>
            </ThemeProvider>
        </div>
    )
}

export default Header;