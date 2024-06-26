"use client"
import 'rc-slider/assets/index.css';

import {
  useEffect,
  useMemo,
  useState,
} from 'react';

import Slider from 'rc-slider';

import Footer from '@/components/footer';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import WelcomeBackground from '@/components/welcome-background';
import { Button } from '@mantine/core';
import { dasApi } from '@metaplex-foundation/digital-asset-standard-api';
import { mplCore } from '@metaplex-foundation/mpl-core';
import {
  generateSigner,
  signerIdentity,
} from '@metaplex-foundation/umi';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import {
  walletAdapterIdentity,
} from '@metaplex-foundation/umi-signer-wallet-adapters';
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import {
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react';
import {
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
  PublicKey,
  Transaction,
} from '@solana/web3.js';

import {
  depositSol,
  withdrawSol,
} from '../../spl-stake-pool';

const mintAddy = new PublicKey("5TvAagYQ7vLVsqWgig5RNag4twTxqHUonzNitG5UfBk")
const stakeAddy = new PublicKey("tJ2sKEdsGXsxsUZrtrgBcqUWopKEVd3ijkXJ2LR46z5")
export default function WelcomePage() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [amount, setAmount] = useState(0);

  const [lamports, setLamports] = useState(0);
  const [poolers, setPoolers] = useState(0);

  const stakePoolAddress = new PublicKey("GJwP3bZcMXgej4eGz7LBBexFjpJ8c5dXLqU4rJP5HzRE");
  
  const handleDepositSol = async () => {
    if (!wallet || !wallet.publicKey || !wallet.signTransaction) return;
    const lamports = amount * LAMPORTS_PER_SOL;
    try {
      const instructions = await depositSol(connection, stakePoolAddress, wallet.publicKey, lamports);
      const tx = new Transaction().add(
        ComputeBudgetProgram.setComputeUnitPrice({microLamports: 94000})).add(
        ...instructions.instructions);
    
      tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash
      tx.feePayer = wallet?.publicKey as PublicKey
      for (const signer of instructions.signers){
        tx.sign(signer)
      }
      const signed = await wallet.signTransaction(tx);
      await connection.sendRawTransaction(signed?.serialize() as any);
    } catch (error) {
      console.error("Failed to deposit SOL:", error);
    }
  };
  
  const handleWithdrawSol = async () => {
    if (!wallet || !wallet.publicKey || !wallet.signTransaction) return;
    try {
      const instructions = await withdrawSol(connection, stakePoolAddress, wallet.publicKey, wallet.publicKey, (amount));
      const tx = new Transaction().add(
        ComputeBudgetProgram.setComputeUnitPrice({microLamports: 94000})).add(...instructions.instructions);
      tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash
      tx.feePayer = wallet?.publicKey as PublicKey
      for (const signer of instructions.signers){
        tx.sign(signer)
      }
      const signed = await wallet.signTransaction(tx);
      await connection.sendRawTransaction(signed?.serialize() as any, {skipPreflight:false});
    } catch (error) {
      console.error("Failed to withdraw SOL:", error);
    }
  };
  useEffect(() => {
   
    connection.getBalance(stakeAddy)
      .then((data: any) => {
        setLamports(data);
      });
      connection.getParsedProgramAccounts(TOKEN_2022_PROGRAM_ID, {
        filters: [
          {
            memcmp: {
              offset: 0,
              bytes: mintAddy.toBase58(),
            }
          }
        ]
      }).then((data: any) => {
        console.log(data)
        setPoolers(data.length)
      })
  }, []);

  const umi = useMemo(() => {
    const u = createUmi(connection)
      .use(mplCore())
      .use(dasApi());

    if (wallet) {
      return u.use(walletAdapterIdentity(wallet));
    }
    const anonSigner = generateSigner(u);
    return u.use(signerIdentity(anonSigner));
  }, [wallet, connection]);
  const [checkTokenAccounts, setCheckTokensAccounts] = useState(false)
  useEffect(() => {
    const doit = async () => {
      if (!wallet.publicKey) return
      
    const accounts = await connection.getTokenAccountsByOwner(wallet.publicKey, { mint: mintAddy });
    setCheckTokensAccounts(accounts.value.length > 0)

  }
  if (wallet.publicKey) {
    doit()
  }
  }, [wallet.publicKey])

  return (
    <div className="">
      <WelcomeBackground />
      <div className="md:mt-44 flex justify-center items-center">
        <div className="max-w-screen-2xl w-full">
          <div className="flex flex-col lg:flex-row justify-center mx-auto px-4 py-6 gap-12 mg:gap-0">
            <div className="flex-1 p-4 space-y-3 max-w-[650px] w-full">
              <p className="text-base md:text-[22px]">
                Welcome to the simplest way to dive into decentralized finance with your friends. Here, you can pool your SOL to get meSOL, a token that not only represents your share but also gives you a chance to earn all future transaction fees from the pool. It's like getting a lottery ticket every time you participate!
              </p>
              {amount} Sol
              <Slider
                min={0}
                max={50}
                step={0.1}
                value={amount}
                onChange={(value) => setAmount(value as number)}
                marks={{
                  0: '0 SOL',
                  10: '10 SOL',
                  20: '20 SOL',
                  30: '30 SOL',
                  40: '40 SOL',
                  50: '50 SOL',
                }}
                trackStyle={{ backgroundColor: 'green', height: 10 }}
                handleStyle={{
                  borderColor: 'green',
                  height: 24,
                  width: 24,
                  marginLeft: -12,
                  marginTop: -7,
                  backgroundColor: 'white',
                }}
                railStyle={{ backgroundColor: 'gray', height: 10 }}
              /> <div className="flex space-x-4 mt-4 margin-top-10">
              <Button 
                onClick={handleDepositSol} 
                style={{
                  backgroundColor: '#28a745', 
                  color: 'white', 
                  borderRadius: '8px', 
                  padding: '10px 20px', 
                  fontSize: '16px', 
                  fontWeight: 'bold',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }} 
                size="lg" 
                className="hover:bg-green-700 transition duration-300 ease-in-out"
              >
                Invest in meSOL
              </Button>
              {checkTokenAccounts && (
                <Button 
                  onClick={handleWithdrawSol} 
                  style={{
                    backgroundColor: '#dc3545', 
                    color: 'white', 
                    borderRadius: '8px', 
                    padding: '10px 20px', 
                    fontSize: '16px', 
                    fontWeight: 'bold',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }} 
                  size="lg" 
                  className="hover:bg-red-700 transition duration-300 ease-in-out"
                >
                  Cash out meSOL
                </Button>
              )}
            </div>
              <h1 className="text-[35px] md:text-6xl font-extrabold leading-none">
                Friends with Benefits: Pool together & win big.
              </h1>
              <p className="hidden md:block text-[40px] font-extrabold">
                One-Click Mega Returns.
              </p>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end items-start">
              <Card className="max-w-[358px] w-full">
                <CardHeader className="">
                  <div className="flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-12 h-12"
                      src="/images/asset-1-8-6.png"
                      alt="logo"
                    />
                    <h1 className="font-bold text-2xl">The Vaults</h1>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="my-4 text-[22px]">
                    <div className="flex justify-between items-center">
                      <p>Total Locked Value</p>
                      <p>{lamports / 10 ** 9} Sol</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Participants</p>
                      <p>{poolers}</p>
                    </div>
                  </div>
                </CardContent>
                <Separator />
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full mt-12 mb-12 md:mt-44 md:mb-44">
        <div className="max-w-screen-2xl w-full mx-auto">
          <div className="flex flex-col md:flex-row gap-12 md:gap-12 px-6 py-12 justify-between relative">
            <div className="space-y-3 max-w-[437px] w-full">
              <p className="text-base md:text-[22px]">
                Join a new era of pooling funds with friends.
              </p>
              <h1 className="text-[33px] md:text-[40px] font-extrabold leading-none">
                How Friends with Benefits Works.
              </h1>
              <p className="text-[#707070] text-sm md:text-lg">
                It’s simple: invest together, earn together. The more you pool, the bigger the potential returns.
              </p>
            </div>
            {/* Map */}
            <div className="hidden xl:block absolute right-[50px] lg:right-[-100px] xl:right-[10px] 2xl:right-[150px] -top-[180px] sm:scale-[.4] md:scale-[.55]  lg:scale-[.50] xl:scale-[.70] 2xl:scale-[.9] transition transform ">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-[100%]"
                  src="/images/vector-335.png"
                  alt="logo"
                />
                <div className="absolute left-[225px] bottom-[-55px] space-y-2 max-w-[309px] w-full">
                  <div className="w-[64px] h-[64px] bg-white rounded-3xl flex justify-center items-center">
                    <div className="w-[23px] h-[23px] bg-gray-400 rounded-full"></div>
                  </div>
                  <h4 className="text-2xl font-bold">Deposit Funds</h4>
                  <p className="text-[#707070] text-lg">
                    Stake your funds and join the prize pool with friends. You can invest SOL for meSOL, or withdraw at any tiem. It is a nearly 0-cost lottery - unless you wait, in which case you assuredly make money .. vs sol!
                  </p>
                </div>

                <div className="absolute left-[650px] bottom-[100px] space-y-2 max-w-[309px] w-full">
                  <div className="w-[64px] h-[64px] bg-white rounded-3xl flex justify-center items-center">
                    <div className="w-[23px] h-[23px] bg-gray-400 rounded-full"></div>
                  </div>
                  <h4 className="text-2xl font-bold">Get Ticket</h4>
                  <p className="text-[#707070] text-lg">
                    Receive your raffle tickets for the prize pool. Keep your fingers crossed and hope for the best! You can become winner by transferring these tokens - on any transfer, a dice is rolled out of the transfrred ammount out of total supply and you might become winner! That is to say, you will earn 1% of all deposits and half the epoch rewards every few days. Wow!
                  </p>
                </div>
                <div className="absolute left-[950px] bottom-[330px] space-y-2 max-w-[309px] w-full">
                  <div className="w-[64px] h-[64px] bg-white rounded-3xl flex justify-center items-center">
                    <div className="w-[23px] h-[23px] bg-gray-400 rounded-full"></div>
                  </div>
                  <h4 className="text-2xl font-bold">Win Prizes</h4>
                  <p className="text-[#707070] text-lg">
                    Win exciting prizes and bragging rights! All participants can withdraw their funds at any time.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-14 xl:hidden xl:w-1/2">
              <div className="space-y-2 relative">
                <h4 className="text-2xl font-bold">Deposit Funds</h4>
                <p className="text-sm text-[#707070] leading-[30px]">
                  Stake your funds and join the prize pool with friends. You can invest SOL or other tokens.
                </p>
                <div className="-z-10 absolute text-[150px] font-bold top-[-68px] right-4 text-[#707070]/20">
                  1
                </div>
              </div>
              <div className="space-y-2 relative">
                <h4 className="text-2xl font-bold">Get Ticket</h4>
                <p className="text-sm text-[#707070] leading-[30px]">
                  Receive your raffle tickets for the prize pool. Keep your fingers crossed and hope for the best!
                </p>
                <div className="-z-10 absolute text-[150px] font-bold top-[-68px] right-4 text-[#707070]/20">
                  2
                </div>
              </div>
              <div className="space-y-2 relative">
                <h4 className="text-2xl font-bold">Win Prizes</h4>
                <p className="text-sm text-[#707070] leading-[30px]">
                  Win exciting prizes and bragging rights! All participants can withdraw their funds at any time.
                </p>
                <div className="-z-10 absolute text-[150px] font-bold top-[-68px] right-4 text-[#707070]/20">
                  3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}