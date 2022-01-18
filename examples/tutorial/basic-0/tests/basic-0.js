const anchor = require('@project-serum/anchor');
const assert = require('assert');
const serumCmn = require("@project-serum/common");

const {
	TOKEN_PROGRAM_ID,
	getTokenAccount,
	createMint,
	createTokenAccount,
	mintToAccount,
} = require("./utils");

describe('basic-0', () => {

  const MINT_TOKENS = 4200000000000000; // 42M with 8dp
  const MINT_DECIMALS = 8;


  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.Provider.env());

  let programSigner; 

  it('Is initialized!', async () => {
    const program = anchor.workspace.Basic0;

    // Add your test here.
    // dataAccount = await anchor.web3.Keypair.generate();

    // console.log(dataAccount);
    // Create USDC mint
    const [usdcMint,_god] =  await serumCmn.createMintAndVault(
      program.provider,
      new anchor.BN(MINT_TOKENS),
      undefined,
      MINT_DECIMALS
    );
    // console.log(usdcMint);

    // program signer PDA - sign transactions for the program
    
  

    let mint = null; // key for token mint
    let god = null; // main program account to pay from and sign
    let creatorAcc = anchor.web3.Keypair.generate(); // account to pay to
    let creatorTokenAcc = null; // token account for payment
    let creatorAcc1 = anchor.web3.Keypair.generate(); // account to pay to
    let creatorTokenAcc1 = null; // token account for payment

    god = _god;
    mint = usdcMint;

    console.log(usdcMint);

    creatorTokenAcc =await createTokenAccount(
      program.provider,
      mint,
      creatorAcc.publicKey
    );

    creatorTokenAcc1 =await createTokenAccount(
      program.provider,
      mint,
      creatorAcc1.publicKey
    );


    console.log('*************', {
      from: god.toBase58(),
      to1: creatorTokenAcc.toBase58(),
      to2: creatorTokenAcc1.toBase58(),
      tokenProgram: TOKEN_PROGRAM_ID.toBase58(),
    });

    
    
    const INTERACTION_FEE = 200000000000000;
    const amount_1_fee= 100000000000000;
    const amount_2_fee= 100000000000000;

    await program.rpc.initialize(new anchor.BN(INTERACTION_FEE), {
      accounts: {
        from: god,
        to: creatorTokenAcc,
        owner: program.provider.wallet.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
      },
    });

   
      
    });
    // console.log("Your transaction signature", tx);
    
  });

