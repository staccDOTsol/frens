
"use client"
import {
  useEffect,
  useState,
} from 'react';

import Footer from '@/components/footer';
import Navbar from '@/components/navbar';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import WelcomeBackground from '@/components/welcome-background';
import { TOKEN_2022_PROGRAM_ID } from '@solana/spl-token';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';

const mintAddy = new PublicKey("5TvAagYQ7vLVsqWgig5RNag4twTxqHUonzNitG5UfBk")
const stakeAddy = new PublicKey("tJ2sKEdsGXsxsUZrtrgBcqUWopKEVd3ijkXJ2LR46z5")
export default function WelcomePage() {
  const [lamports, setLamports] = useState(0);
  const [poolers, setPoolers] = useState(0);
  const { connection } = useConnection();
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

  return (
    <div className="">
      <WelcomeBackground />
      <Navbar />
      <div className="md:mt-44 flex justify-center items-center">
        <div className="max-w-screen-2xl w-full">
          <div className="flex flex-col lg:flex-row justify-center mx-auto px-4 py-6 gap-12 mg:gap-0">
            <div className="flex-1 p-4 space-y-3 max-w-[650px] w-full">
              <p className="text-base md:text-[22px]">
                A prize pool protocol with friends.
              </p>
              <h1 className="text-[35px] md:text-6xl font-extrabold leading-none">
                Frens with Benefits. Pool together & win.
              </h1>
              <p className="hidden md:block text-[40px] font-extrabold">
                One-Click Megayield.
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
                      <p>TLV</p>
                      <p>{lamports / 10 ** 9} Sol</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Poolers</p>
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
                A prize pool protocol with friends.
              </p>
              <h1 className="text-[33px] md:text-[40px] font-extrabold leading-none">
                Learn How Frens with Benefits Works.
              </h1>
              <p className="text-[#707070] text-sm md:text-lg">
                It’s a one click megayield button. ATOW bsol yield is 6.471% and
                bsol, which you re-stake 76% of, is 6.969%. You will yield 1 *
                6.471% + 0.74 * 6.969% = 11.76744% per $ deposited.
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
                    Deposit your funds to stake & join the prize pool with
                    frens. You can deposit bSOL or SOL.
                  </p>
                </div>

                <div className="absolute left-[650px] bottom-[100px] space-y-2 max-w-[309px] w-full">
                  <div className="w-[64px] h-[64px] bg-white rounded-3xl flex justify-center items-center">
                    <div className="w-[23px] h-[23px] bg-gray-400 rounded-full"></div>
                  </div>
                  <h4 className="text-2xl font-bold">Get Ticket</h4>
                  <p className="text-[#707070] text-lg">
                    Receive your raffle tickets for the prize pool, cross your
                    fingers and hold your breath until you win.
                  </p>
                </div>
                <div className="absolute left-[950px] bottom-[330px] space-y-2 max-w-[309px] w-full">
                  <div className="w-[64px] h-[64px] bg-white rounded-3xl flex justify-center items-center">
                    <div className="w-[23px] h-[23px] bg-gray-400 rounded-full"></div>
                  </div>
                  <h4 className="text-2xl font-bold">Win Prizes</h4>
                  <p className="text-[#707070] text-lg">
                    Receive your raffle tickets for the prize pool, cross your
                    fingers and hold your breath until you win.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-14 xl:hidden xl:w-1/2">
              <div className="space-y-2 relative">
                <h4 className="text-2xl font-bold">Deposit Funds</h4>
                <p className="text-sm text-[#707070] leading-[30px]">
                  Deposit your funds to stake & join the prize pool with frens.
                  You can deposit bSOL or SOL.
                </p>
                <div className="-z-10 absolute text-[150px] font-bold top-[-68px] right-4 text-[#707070]/20">
                  1
                </div>
              </div>
              <div className="space-y-2 relative">
                <h4 className="text-2xl font-bold">Get Ticket</h4>
                <p className="text-sm text-[#707070] leading-[30px]">
                  Receive your raffle tickets for the prize pool, cross your
                  fingers and hold your breath until you win.
                </p>
                <div className="-z-10 absolute text-[150px] font-bold top-[-68px] right-4 text-[#707070]/20">
                  2
                </div>
              </div>
              <div className="space-y-2 relative">
                <h4 className="text-2xl font-bold">Win Prizes</h4>
                <p className="text-sm text-[#707070] leading-[30px]">
                  Win prizes and make fun of your friends if you win. All users
                  can withdraw funds at any time.
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
