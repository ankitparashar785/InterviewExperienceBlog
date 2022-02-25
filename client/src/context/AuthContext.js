import { createContext,useContext,useEffect,useState } from "react";
import { auth } from "../utils/init-firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendSignInLinkToEmail,
    sendPasswordResetEmail,
    confirmPasswordReset
} from "firebase/auth";
import Login from "../components/post/LoginForm";

const AuthContext=createContext({
    currentUser:null,
    register:()=>Promise,
    login:()=>Promise,
    logout:()=>Promise,
    isSuccess:false,
    forgotPass:()=>Promise,
    resetPassword:()=>Promise,
    liked:false,
    setLiked:()=>Promise
})

export const useAuth=()=>useContext(AuthContext)

export default function AuthContextProvider({children}){
    const [currentUser,setCurrUser]=useState(null)
    const [isSuccess,setisSeccess]=useState(false)
    const [liked,setLiked]=useState(false)
    useEffect(()=>{
      const unsubscribe=onAuthStateChanged(auth,user=>{
         
        // console.log(user.email)
        
          setCurrUser(user)
      })
      return ()=>{
        
          unsubscribe();
      }
    },[])
   
    function register(email,password){
      return createUserWithEmailAndPassword(auth,email,password)
    }
    function login(email,password){
      return signInWithEmailAndPassword(auth,email,password)
    }
    function logout()
    {
      return signOut(auth)
    }
    function forgotPass(email){
      return sendPasswordResetEmail(auth,email,{
          url:'http://localhost:3000/login'
      })
    }
    function  resetPassword(oobCode,newPassword){
        return confirmPasswordReset(auth,oobCode,newPassword)
    }
    const value={
        currentUser,
        register,
        login,
        logout,
        isSuccess,
        forgotPass,
        resetPassword,
        liked,
        setLiked
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}