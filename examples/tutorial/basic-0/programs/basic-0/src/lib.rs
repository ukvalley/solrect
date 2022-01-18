use anchor_lang::prelude::*;
use anchor_spl::token::{self, TokenAccount, Transfer, Mint, Token};


declare_id!("6a3nXoqf6JwrA1xMAtNpNBVUWwrFJaHDRtBpQ9LwXsP");

#[program]
mod basic_0 {
    use super::*;
    pub fn initialize(ctx: Context<InitialMultiAirdrop>, interaction_fee: u64, ) -> ProgramResult {
        
        let cpi_accounts1 = Transfer {
            from: ctx.accounts.from.to_account_info().clone(),
            to: ctx.accounts.to.to_account_info().clone(),
            authority: ctx.accounts.owner.clone(),
        };
        let cpi_program1 = ctx.accounts.token_program.clone();
        let cpi_ctx1 = CpiContext::new(cpi_program1, cpi_accounts1);
        token::transfer(cpi_ctx1, interaction_fee)?;
        Ok(())
        
    }

    pub fn interaction(ctx: Context<InitialAirdrop>, interaction_fee: u64) -> ProgramResult {
        let cpi_accounts = Transfer {
            from: ctx.accounts.from.to_account_info().clone(),
            to: ctx.accounts.to.to_account_info().clone(),
            authority: ctx.accounts.owner.clone(),
        };
        let cpi_program = ctx.accounts.token_program.clone();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, interaction_fee)?;
       
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitialAirdrop<'info> {
    #[account(mut, has_one = owner)]
    from: Account<'info, TokenAccount>,
    #[account(mut,"from.mint == to.mint")]
    to: Account<'info, TokenAccount>,
    #[account(signer)]
    owner: AccountInfo<'info>,
    token_program: AccountInfo<'info>,

}

#[derive(Accounts)]
pub struct InitialMultiAirdrop<'info> {
    #[account(mut, has_one = owner)]
    from: Account<'info, TokenAccount>,
    #[account(mut,"from.mint == to.mint")]
    to: Account<'info, TokenAccount>,
    #[account(signer)]
    owner: AccountInfo<'info>,
    token_program: AccountInfo<'info>,


}

