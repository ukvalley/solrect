


import { Alert } from 'bootstrap';
import { Link, useNavigate  } from "react-router-dom";
import axios from 'axios';
import Loader from "../../customer/layout/loader";

import { useState,useEffect } from 'react';
import { Connection, PublicKey , Transaction, sendAndConfirmTransaction} from '@solana/web3.js';
import {
    BN,
    Program, Provider, web3
  } from '@project-serum/anchor';
  import idl from '../../../idl.json';
  import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
  import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
  import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
  import { Token,TOKEN_PROGRAM_ID } from '@solana/spl-token';
  import { set } from '@project-serum/anchor/dist/cjs/utils/features';
  require('@solana/wallet-adapter-react-ui/styles.css');



  const wallets = [
    /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
    getPhantomWallet()
  ] 

  const { SystemProgram, Keypair } = web3;
/* create an account  */
const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed"
}


const programID = new PublicKey(idl.metadata.address);





 function Login() {

    const [walletdata, setwalletdata] = useState();

    const wallet = useWallet();
    const { connected, publicKey, signTransaction, sendTransaction } = useWallet()
    const [walletAddr, setWalletaddr] = useState();
    const [value, setvalue] = useState();
    const [increment, setincrement] = useState();
    
    const navigate = useNavigate();
    const [loading, setLoading ] = useState(null);
    const header = {"Access-Control-Allow-Origin": "*"}

    const [siteSetting, setSiteSetting] = useState(null);

    useEffect(() => {

        console.log(connected ? "true" : "false");
  
    });

      useEffect(() => {
        if(siteSetting == null)
        { 
             fetchSetting();
         }
    });


    async function getProvider() {
        /* create the provider and return it to the caller */
        /* network set to local network for now */
        const network = "https://api.devnet.solana.com";
        const connection = new Connection(network, opts.preflightCommitment);
        
    
        const provider = new Provider(
          connection, wallet, opts.preflightCommitment,
      
        );
        setWalletaddr(wallet.publicKey.toBase58());
        console.log(wallet.publicKey.toBase58());
    
        return provider;
      }
    
    

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

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true);
       // console.log(e);
        const {idnumber } = e.target.elements
      //  console.log({idnumber: idnumber.value })

        axios.get('https://raisingfinanance.com/soulignite/api/fetch_user_data/'+idnumber.value, {headers:header})
        .then(res => {
            
            if(res.data.status == null)
            {
                console.log(res.data);
                localStorage.clear();
                localStorage.setItem('loggedInUser', res.data.first_name);                
                navigate('/dashboard');
              //  console.log(res.data); 
            }
            else{
                console.log('userid not present');
            }
        })
        .catch(error => {
                console.error('There was an error!', error);
        });

        setLoading(false);
      };

      function login_user_with_wallet()
      {
        getProvider();

        setLoading(true);
            const wallet_addr = wallet.publicKey.toBase58();
            const url = "https://raisingfinanance.com/soulignite/api/fetch_user_data_email/"+walletAddr;
            console.log(url);
            axios.get('https://raisingfinanance.com/soulignite/api/fetch_user_data_email/'+wallet_addr, {headers:header})
        .then(res => {
            
            if(res.data.status == null)
            {
                if(res.data.email != null)
                {
                console.log(res.data);
                localStorage.clear();
                localStorage.setItem('loggedInUser', res.data.email);                
                navigate('/Dashboard');

                }
                else
                {
                    console.log(res.data);
                    console.log('userid not present');

                }
                
              //  console.log(res.data); 
            }
            else{
                console.log('userid not present');
            }
        })
        .catch(error => {
                console.error('There was an error!', error);
        });

        
        setLoading(false);
      }


      if (!wallet.connected) {
        /* If the user's wallet is not connected, display connect wallet button. */
        return (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop:'100px' }}>
            <WalletMultiButton />
          </div>
        )
      }
      
      else{

      

 if(loading == true)
 {
    return (
        <Loader/>
      )
 }
 else{

    

 
  return (
    <div className="container">
       
    <div className="row d-flex justify-content-center mt20">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card py-3 px-2 shadow p-3 mb-5">
            <div className="row mx-auto ">
                    
                    <div className="col-12 photo">
                        <img className='img_logo pulse' src={require('../../../assets/soullogo1.png')} alt='import'></img>
                     </div>
                </div>
                <p className="text-center mb-3 mt-2 yello-bg">Sign in through Wallet OR Enter ID</p>
                
                <div className="division">
                    <div className="row">
                       
                        <div className="col-12"><span className="bg-white">Wallet Address : {walletAddr}</span></div>
                        
                    </div>
                </div>
                <form className="myform" onSubmit={handleSubmit}>
                    <div className="form-group"> 
                    <input 
                    type="number" 
                    id='idnumber'
                    className="form-control" 
                    placeholder="Enter ID Number"/> 
                    </div>
                    
                    <div className="row">
                        
                     
                       
                    </div>
                    <div className="form-group mt-3"> 
                    <button type="submit"   className="btn btn-primary btn-lg full">
                        <small><i className="fa fa-lock"/>  Login</small>
                    </button> </div>
                </form>

               

                <div className='row mts30'>
                <button type="button" onClick={login_user_with_wallet}   className="btn btn-secondary btn-lg ">
                        <small> <i className="fa fa-caret-right"/> Login With Wallet</small>
                    </button>
                </div>

                <div className='row mts30'>
                <Link to="/register"> <p>Not Registered yet, Login here</p> </Link>
                </div>
            </div>
        </div>
    </div>
   
</div>
  );

  
}
      }

}

const AppWithProvider = () => (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Login />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
  
  export default AppWithProvider;





