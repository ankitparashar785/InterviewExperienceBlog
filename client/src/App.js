import logo from './logo.svg';
import './App.css';
import React from 'react';
import DetailView from './components/post/DetailView';
import { Box } from '@material-ui/core';
import Header from './components/Header';
import {BrowserRouter,Switch,Route, Redirect} from 'react-router-dom'
import LoginForm from './components/post/LoginForm'
import Home from './components/Home/Home';
import CreateView from './components/post/CreateView';
import UpdateView from './components/post/UpdateView';
import ForgotPassword from './components/post/ForgotPassword';
import RegisterForm from './components/post/RegisterForm'
import AuthContextProvider from './context/AuthContext';
import ResetPassword from './components/post/ResetPasswordPage';
import { useAuth } from './context/AuthContext';
import { useLocation } from 'react-router-dom';
function App() {
  const {currentUser}=useAuth();
 // const loc=useLocation();
 // console.log(loc.state)
 if(currentUser)
 {
 //   if(!currentUser.emailVerified)
 //   return null;
 }
 
  return (

    
    <BrowserRouter>
    <AuthContextProvider>
     <Header/>
      <Box style={{marginTop:64}}>
        <Switch>
          <ProtectedRoute exact path='/' component={Home}><Home/></ProtectedRoute> 
          <ProtectedRoute path='/details/:id' component={DetailView}><DetailView/></ProtectedRoute> 
          <ProtectedRoute path='/create' component={CreateView}></ProtectedRoute>
          <Route path='/update/:id' component={UpdateView}></Route>
          <AuthContextProvider>
          <ProtectedRoute path='/login' component={LoginForm}></ProtectedRoute>
          <ProtectedRoute path='/register' component={RegisterForm}></ProtectedRoute>
          <Route path='/forgotPassword' component={ForgotPassword}></Route>
          <Route path='/resetPassword' component={ResetPassword}></Route>
          
          </AuthContextProvider>
        </Switch>
       
      </Box>
      </AuthContextProvider>
    </BrowserRouter>
  )
}
function ProtectedRoute(props){
  const {currentUser}=useAuth();
  const {path}=props;
 
  if((path==='/login') || path==='/register' || path==='/forgotPassword' || path==='resetPassword')
  {
    return currentUser  ?(<Redirect to={'/'}/>) : (<Route {...props}/>)
  }
  return currentUser ? <Route {...props}/> : <Redirect to={{

    pathname:'/login',
    state:{from :path}
  }}/>;
}
export default App;
