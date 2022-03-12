

import Typewriter from "typewriter-effect";
import { makeStyles ,Box, Typography} from "@material-ui/core";
import MovingComponent from 'react-moving-text'
const useStyles=makeStyles((theme)=>({
    image:{
       background:`url(${'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg'}) center/55% repeat-x #000`,
       width:'100%',
       height:'50vh',
       alignItems:'center',
       display:'flex',
       flexDirection:'column',
       justifyContent:'center',
       '& :first-child':{
           fontSize:70,
        
           lineHeight:1
       },
       '& :last-child':{
           fontSize:20,
           
       },
       [theme.breakpoints.down('md')]: {
        '& :first-child':{
            fontSize:20,
            lineHeight:1
        },
    }
    },
    blog:{
        width:'55%',
        margin:'auto',
        background:'black',
        height:'348px',
        
    },
    blog2:{
          width:'100%',
          height:'100px',
          background:'hotpink',
          marginTop:'120px',
          color:'white',
          fontSize:'10px',
          borderRadius:'5px',
          boxShadow:'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px',
          [theme.breakpoints.down('md')]: {
            paddingTop:20,
            paddingLeft:30
          }
        }   
    }
))
const Banner=()=>{

    const classes=useStyles();
    const url='https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg';
    return(
      <Box className={classes.image}>
          <Box className={classes.blog}>
             <Box className={classes.blog2}>
             <MovingComponent type="typewriter"
               dataText={[
               'Interview  Blog',
                 'Welcomes You !'
                ]} />
             </Box>
          </Box>
      </Box>
    )
}
export default Banner;