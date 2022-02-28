import React, { useState,useEffect } from 'react';
import { FaHeart, FaBars } from 'react-icons/fa';
import {  useNavigate  } from "react-router-dom";
import Loader from "../../customer/layout/loader";
import axios from 'axios';  
import logo from '../../../assets1/soullogo1.png';
import leg1 from '../../../assets1/leg1.png';
import leg2 from '../../../assets1/leg2.png';
import leg3 from '../../../assets1/leg3.png';




export default function Main(collapsed,
   rtl,
   image,
   handleToggleSidebar,
   handleCollapsedChange,
   handleRtlChange,
   handleImageChange,
   name,) {
  
  
   const [user,setUser] = useState(null);
   const navigate = useNavigate();
   const [loading, setLoading ] = useState();
   const [wallets, setWallets ] = useState();
   const [packages, setPackages ] = useState();
   const [userdata, setUserData ] = useState();


   const [fetch,setFetch] = useState(false);

   const header = {
      "Access-Control-Allow-Origin": "*"
    }

    const loggedInUser = localStorage.getItem("loggedInUser");

  


   


   useEffect(() => {

      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
         console.log(loggedInUser);
        
      }
      else{
         navigate('/login');
      }

      if(fetch == false)
      {

     
      console.log('a')
      setLoading(true);
      

      fetch_dashboard_info(loggedInUser)

      
   }
    }, [wallets,userdata,packages,loading,fetch]);


   async  function fetch_dashboard_info(loggedInUser)
    {

     await axios.get('https://raisingfinanance.com/soulignite/api/fetch_dashboard_information/'+loggedInUser, {headers:header})
      .then(res => { 

         console.log(res.data)
           
            setUserData(res.data);
            setFetch(true)
            setLoading(false);
         })    
      .catch(error => {
              console.error('There was an error!', error);
      });

    }

   
   
  

   if(loading == true || loading == null )
   
   {
      return(
         <Loader/> 
         )
      
      
   }

   if (!userdata.wallets) return (<Loader/>)

   else {
  
  return (
    <main>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)} >
        <FaBars />
      </div>

      <header>
        <div className='row mb10'>
          <img className='logo_dashboard' src={logo} alt='import'></img>
          <h4 className='text-gradient text-center-wall'>{userdata.user_data.email}</h4>
        </div>
      <div className="container bootstrap snippets bootdey">
    <div className="row">
        

        <div className="col-md-4 col-sm-6 col-xs-12">
        	<div className="panel panel-dark panel-colorful">
        		<div className="panel-body text-center">
        			<p className="text-uppercase mar-btm text-sm">ILLUMINATING MATRIX</p>
        			<img className='widget_image' src={leg3}></img>
        			<hr/>
             
        			<p className="h2 text-thin text-gradient">{userdata.wallets['three_leg']}</p>
        		</div>
        	</div>
        </div>

        <div className="col-md-4 col-sm-6 col-xs-12">
        	<div className="panel panel-dark panel-colorful">
        		<div className="panel-body text-center">
        			<p className="text-uppercase mar-btm text-sm">RAPID FIRE MATRIX</p>
            <img className='widget_image' src={leg2}></img>
        			<hr/>
        			<p className="h2 text-thin text-gradient">{userdata.wallets.two_leg}</p>
        		</div>
        	</div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
        	<div className="panel panel-dark panel-colorful">
        		<div className="panel-body text-center">
        			<p className="text-uppercase mar-btm text-sm">LIGHTENING MATRIX</p>
            <img className='widget_image' src={leg1}></img>
        			<hr/>
        			<p className="h2 text-thin text-gradient">{userdata.wallets.single_leg}</p>
        		</div>
        	</div>
        </div>        

      </div>
    </div>
      </header>

      <div className='block'>
        <div className='row'>

        {userdata.packages.map((package1) => (  

        <div className="col-md-4 col-sm-6 col-xs-12">
      <div className="card1">
   

   <div className="card-badge"></div>
   <div className="card-heading-1 text-white">{package1}</div>
   <div className="card-label">
      <div className="label-purchased"><i className="fa fa-check"></i> Purchased</div>
   </div>
   <div className="tree-view">
      <div className="master-leaf"></div>
      <ul>
         <li className="leaf-1 ">
            <i className="icon-customer"></i><a title="Account: 2554" ><i className="icon-hexagon"></i></a>
            <ul>
               <li className="leaf-1 "><i className="icon-customer"></i><a title="Account: 2978" ><i className="icon-hexagon"></i></a></li>
               <li className="leaf-1 "><i className="icon-customer"></i><a title="Account: 3775" ><i className="icon-hexagon"></i></a></li>
            </ul>
         </li>
         <li className="leaf-1 ">
            <i className="icon-customer"></i><a title="Account: 2779" ><i className="icon-hexagon"></i></a>
            <ul>
               <li className=" "><i className="icon-customer"></i><a title="" ><i className="icon-hexagon"></i></a></li>
               <li className=" "><i className="icon-customer"></i><a title="" ><i className="icon-hexagon"></i></a></li>
            </ul>
         </li>
      </ul>
   </div>
   <div className="card-stats text-gradient">
      <div className="stats-1">Partners: <span>2 &nbsp;|</span></div> 
      <div className="stats-2">&nbsp; Reinvest: <span>0 </span></div>
   </div>
</div>
</div>

))}  
      </div>

      

      </div>
    
    </main>
  );
        }
};

