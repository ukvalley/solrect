import './App.css';
import { useState,useEffect } from 'react';
import { Connection, PublicKey , Transaction, sendAndConfirmTransaction} from '@solana/web3.js';


import {
  BN,
  Program, Provider, web3
} from '@project-serum/anchor';
import idl from './idl.json';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Token,TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { set } from '@project-serum/anchor/dist/cjs/utils/features';
import axios from 'axios';  



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

function App() {
  const [value, setValue] = useState(null);
  const wallet = useWallet();
  const { connected, publicKey, signTransaction, sendTransaction } = useWallet()
  const [walletAddr, setWalletaddr] = useState();
  
  useEffect(() => {
      console.log(connected ? "true" : "false");

  });


  
  

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "http://127.0.0.1:8899";
    const connection = new Connection(network, opts.preflightCommitment);
    

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
  
    );
    setWalletaddr(wallet.publicKey.toBase58());
    console.log(walletAddr);

    return provider;
  }

  async function register(registration_address)
  {
    console.log("reg_address",registration_address);
    axios.get(`https://jsonholder.com/users`)  
      .then(res => {  
        const animals = res.data;  
        console.log('animals',animals);

    

  });
}


  async function takeandsendtoken()
  {
    const mint = new PublicKey('KtdsBGfMrnzKSXqQAaFw4n5r49aXxXK5AJrMRWa3q9q');
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    const network = "http://127.0.0.1:8899";
    const connection = new Connection(network, opts.preflightCommitment);
    let secretKeyAdmin = Uint8Array.from([245,201,51,124,100,242,137,82,137,177,105,163,59,239,7,177,55,146,162,204,225,250,95,74,87,228,98,162,213,244,36,103,78,227,20,122,131,210,250,15,236,113,135,120,205,246,235,53,97,170,106,214,19,7,101,1,167,227,76,212,177,0,105,96]);
    let AdminKeypair = Keypair.fromSecretKey(secretKeyAdmin);


    var myToken = new Token(
      provider.connection,
      mint,
      TOKEN_PROGRAM_ID,
      wallet.PublicKey
    );

    var fromWalletTokenAcc = await myToken.getOrCreateAssociatedAccountInfo(
      wallet.publicKey
    )

    var AdminWalletTokenAcc = await myToken.getOrCreateAssociatedAccountInfo(
      AdminKeypair.publicKey
    )


    const INTERACTION_FEE = 200000000000000;

    console.log('****');
    console.log('from',wallet.publicKey.toBase58())
    console.log('to',AdminKeypair.publicKey.toBase58())


    try {
      /* interact with the program via rpc */
     const tx =await   program.rpc.interaction(new BN(6000000000),{
        accounts: {
          from: fromWalletTokenAcc.address,
          to: AdminWalletTokenAcc.address,
          owner: publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
      });

      console.log(tx);

      
    } catch (err) {
      console.log("Transaction error: ", err);
    }


   let towall1 = new PublicKey('FEaoQUcvVR8BXU236RawxbMqNVG4TRDZ6nFGxjbJnX1h');
   let towall2 = new PublicKey('LRh5C9nRgebhXQwW8L1SL4ZpEkJ4ciFy77LdQZKgVR5');

   var toTokenAccount1 = await myToken.getOrCreateAssociatedAccountInfo(
    towall1
  )
  var toTokenAccount2 = await myToken.getOrCreateAssociatedAccountInfo(
    towall2
  )


  var transaction_token1 = new web3.Transaction()
    .add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        AdminWalletTokenAcc.address,
        toTokenAccount1.address,
        AdminKeypair.publicKey,
        [],
        1000000000
      )
    );
  // Sign transaction, broadcast, and confirm
  var signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction_token1,
    [AdminKeypair]
  );

    console.log(signature);

    await register(wallet.publicKey);


  }

  async function sendsol(){
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    const toPublicKey = new PublicKey('LRh5C9nRgebhXQwW8L1SL4ZpEkJ4ciFy77LdQZKgVR5');

  
    const network = "http://127.0.0.1:8899";
    const connection = new Connection(network, opts.preflightCommitment);
    

    let secretKey = Uint8Array.from([34,171,102,234,187,180,176,90,15,18,59,112,108,17,50,132,82,87,92,210,231,74,209,127,135,243,125,150,86,193,228,216,4,249,244,22,49,62,54,254,89,85,132,89,18,45,192,222,71,74,213,124,92,148,88,1,198,105,50,254,106,196,1,92]);
    
    let toKeypair = Keypair.fromSecretKey(secretKey);

    let secretKeyfrom = Uint8Array.from([245,201,51,124,100,242,137,82,137,177,105,163,59,239,7,177,55,146,162,204,225,250,95,74,87,228,98,162,213,244,36,103,78,227,20,122,131,210,250,15,236,113,135,120,205,246,235,53,97,170,106,214,19,7,101,1,167,227,76,212,177,0,105,96]);
    
    let fromKeypair1 = Keypair.fromSecretKey(secretKeyfrom);

    console.log("*****",fromKeypair1.publicKey.toBase58());
    console.log("*****",toKeypair.publicKey.toBase58());



    let transaction = new Transaction();



    let airdropSignature = await connection.requestAirdrop(
      fromKeypair1.publicKey,
      11100000000,
    );
    
    await connection.confirmTransaction(airdropSignature);
    
    



    transaction.add(
      SystemProgram.transfer({
        fromPubkey: fromKeypair1.publicKey,
        toPubkey: toPublicKey,
        lamports: 1000000000
      })
    );

    sendAndConfirmTransaction(
      connection,
      transaction,
      [fromKeypair1]
    );

    const mint = new PublicKey('KtdsBGfMrnzKSXqQAaFw4n5r49aXxXK5AJrMRWa3q9q');
    const toPublicKey_ = "LRh5C9nRgebhXQwW8L1SL4ZpEkJ4ciFy77LdQZKgVR5";

    var myToken = new Token(
      provider.connection,
      mint,
      TOKEN_PROGRAM_ID,
      wallet.PublicKey
    );


    var toWallet = new PublicKey("AHdFNCAL1dKoVCzE1cXrXJdyhkQzhsjgb3TCPV7hGJW6") 
    var fWallet = new PublicKey("6Jwdc6nm1nSpdma2c1QcMMr47acXhLwbYHzTk2bMAf2f") 

    

    var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      toWallet
    )

    var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      fWallet
    )


    var transaction_token = new web3.Transaction()
    .add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        fromTokenAccount.address,
        toTokenAccount.address,
        fromKeypair1.publicKey,
        [],
        1000000000
      )
    );
  // Sign transaction, broadcast, and confirm
  var signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction_token,
    [fromKeypair1]
  );



  }

  async function createCounter() {    
    const provider = await getProvider()
    /* create the program interface combining the idl, program ID, and provider */
    
    const program = new Program(idl, programID, provider);
    const mint = new PublicKey('KtdsBGfMrnzKSXqQAaFw4n5r49aXxXK5AJrMRWa3q9q');
    const toPublicKey = "LRh5C9nRgebhXQwW8L1SL4ZpEkJ4ciFy77LdQZKgVR5";

    
    console.log("publickey",publicKey.toBase58())
    
    var myToken = new Token(
      provider.connection,
      mint,
      TOKEN_PROGRAM_ID,
      wallet.PublicKey
    );

    let transaction = new Transaction();


    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.PublicKey,
        toPubkey: toPublicKey,
        lamports: 1
      })
    );
   
    
    var fromWallet = new PublicKey("12x7MQfh4JmVwWRtnjMZSWxXHCY4FBX1LrmQTy9XPxba");
    var fromTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
      wallet.publicKey
    )

    if (fromTokenAccount === null) {
 
      await myToken.createAssociatedTokenAccount(wallet.publicKey);
      
    }

    
      
    console.log("fromtoken",fromTokenAccount.address.toBase58())
    
   

   //  var fromWallet = new PublicKey("BeAN2qYrmcDD8QEqhDRkHBmkFKXFVacxXJc3bfnW3Efb") 

     var toWallet = new PublicKey("FEaoQUcvVR8BXU236RawxbMqNVG4TRDZ6nFGxjbJnX1h") 
    
    console.log(toWallet.toBase58())

   
    try{

      var toTokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
        toWallet
      )
      console.log(toTokenAccount.address.toBase58());

    }
    catch (err) {
      console.log("Account error: ", err);
    }    

    var toWallet1 = new PublicKey("EVBqEx5Z1qnnAVnfPLvnJjgBVhHHBKRajwDu82SpVS1v") 
    
    console.log(toWallet1.toBase58())

   
    try{

      var toTokenAccount1 = await myToken.getOrCreateAssociatedAccountInfo(
        toWallet1
      )
      console.log(toTokenAccount1.address.toBase58());

    }
    catch (err) {
      console.log("Account error: ", err);
    }    


    const INTERACTION_FEE = 200000000000000;

    console.log('*************', {
      from: fromTokenAccount.address.toBase58(),
      to: toTokenAccount.address.toBase58(),
      owner: publicKey.toBase58(),
      tokenProgram: TOKEN_PROGRAM_ID.toBase58(),
      
    });

    try {
      /* interact with the program via rpc */
     const tx =await   program.rpc.interaction(new BN(6000000000),{
        accounts: {
          from: fromTokenAccount.address,
          to: toTokenAccount1.address,
          owner: publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
      });

      console.log(tx);

      
    } catch (err) {
      console.log("Transaction error: ", err);
    }

    try {
      /* interact with the program via rpc */
     const tx =await   program.rpc.interaction(new BN(6000000000),{
        accounts: {
          from: fromTokenAccount.address,
          to: toTokenAccount.address,
          owner: publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
      });

      console.log(tx);

      
    } catch (err) {
      console.log("Transaction error: ", err);
    }

    
  }

  async function increment() {
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    await program.rpc.increment({
      accounts: {
        baseAccount: baseAccount.publicKey
      }
    });

    const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    console.log('account: ', account);
    setValue(account.count.toString());
  }

  

  if (!wallet.connected) {
    /* If the user's wallet is not connected, display connect wallet button. */
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop:'100px' }}>
        <WalletMultiButton />
      </div>
    )
  } else {
    return (
      <div className="App">
        <div>
          {
            !value && (<button onClick={takeandsendtoken}>Create counter {walletAddr}</button>)
          }
          {
            value && <button onClick={increment}>Increment counter</button>
          }

          {
            value && value >= Number(0) ? (
              <h2>{value}</h2>
            ) : (
              <h3>Please create the counter.</h3>
            )
          }
        </div>
      </div>
    );
  }
}

/* wallet configuration as specified here: https://github.com/solana-labs/wallet-adapter#setup */
const AppWithProvider = () => (
  <ConnectionProvider endpoint="http://127.0.0.1:8899">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)

export default AppWithProvider;