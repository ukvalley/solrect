
import React, { useEffect, useState } from "react";
import axios from 'axios';  


import { Link } from "react-router-dom";
import Loader from "../../customer/layout/loader";






export default function Register() {

   
    const [siteSetting, setSiteSetting] = useState(null);
    const [sponsorData, setsponsorData] = useState(null);
    const [sponcerValue, setSponcerValue ] = useState(null);
    const [walletAddress, setwalletAddress ] = useState(null);
    const [loading, setLoading ] = useState(null);



    const header = {
        "Access-Control-Allow-Origin": "*"
      }
    
    
    
    
    useEffect(() => {
        if(siteSetting == null)
        { 
             fetchSetting();
         }
    });

    // end of useeffects

    async function fetchSetting(){
        setLoading(true);
        axios.get(`https://raisingfinanance.com/soulignite/api/show/1`)  
        .then(res => {  
          const animals = res.data;  
          setSiteSetting(res.data);
          setLoading(false);
        });

    }

    
    function register_user(sponcer_id,amount){ 

        setLoading(true);        
        setwalletAddress("ABC");

        const userdata = 
        {    
            email : 'walletAddress', 
            sponcer: sponcerValue
        };
        axios.post('https://raisingfinanance.com/soulignite/api/register_user1',userdata, {headers:header})
        .then(res => {  
            console.log(res) })    
        .catch(error => {
                console.error('There was an error!', error);
        });

        setLoading(false);

    }
    

    


    function handleSubmit(e) {
        e.preventDefault()
        console.log(e);
        const {sponsor } = e.target.elements;
        register_user(sponsor.value,100);
        console.log({sponsor: sponsor.value })
      };

if(loading == false)
{
  return (
    <div className="container">
       
    <div className="row d-flex justify-content-center mt20 ">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card py-3 px-2 shadow p-3 mb-5">
            <div className="row mx-auto ">
                    
                    <div className="col-12 photo">
                        <img className='img_logo pulse' src={require('../../../assets/soullogo1.png')} alt='import'></img>
                      
                     </div>
                </div>
                <p className="text-center mb-3 mt-2 yello-bg">Register through Solana Token Wallet {siteSetting['site_name']}</p>
                
                <div className="division">
                    <div className="row">
                       
                        <div className="col-12"><span className="bg-white">Wallet Address : Wallet Address</span></div>
                        
                    </div>
                </div>
                <form className="myform" onSubmit={handleSubmit}>
                    <div className="form-group"> 
                    <input 
                    type="text" 
                    id='sponsor'
                    className="form-control" 
                    
                    placeholder="Enter Sponsor User ID"/> 
                   
                    </div>
                    
                    <div className="row">
                        
                     
                       
                    </div>
                    <div className="form-group mt-3"> 
                    <button type="submit"   className="btn btn-secondary btn-lg full">
                        <small><i className="fa fa-credit-card"/>   Register & Pay</small>
                    </button> </div>
                </form>

               

               

                <div className='row mts30'>
                <Link to="/login"> <p>Already Registered Click here</p> </Link>
                </div>
            </div>
        </div>
    </div>
   
</div>
  );

}
else
{
    return (
      <Loader/>
    )
}
}


