
import { Button , makeStyles , Table ,TableCell,TableRow,TableBody,TableHead} from "@material-ui/core";
import { categories } from "../../constants/Data";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
const useStyles=makeStyles((theme)=>({
   create:{
       margin:20,
       background:'red',
       color:'#FFFFFF',
       width:'86%'
   },
   table:{
     border:'1px solid rgba(224,224,224,1)'
   },
   link:{
       textDecoration:'none',
       color:'inherit'
   },
   cell:{
       
   }
}))
const Categories=()=>{
    const classes=useStyles();
    const {currentUser}=useAuth();
    return (
        <>
             {<Link to='/create' className={classes.link}><Button variant='contained' className={classes.create} >CREATE  BLOG</Button></Link>}
              <Table className={classes.table}>
                  <TableHead>
                      <TableRow>
                          <TableCell>
                              <Link to='/' className={classes.link}>All Categories</Link>
                          </TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody >
                      <TableRow className={classes.tbody}>
                          {
                              categories.map((category,index)=>(
                                  <TableRow className={classes.trow}>
                                     <TableCell className={classes.cell}>
                                        <Link key={Math.random()} to={`/?category=${category}`} className={classes.link}>{category}</Link>
                                     </TableCell>
                                  </TableRow>

                              ))
                          }
                      </TableRow>
                  </TableBody>
              </Table>
        </>
    )
}
export default Categories;