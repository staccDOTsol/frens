import Footer from '@/components/footer';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="h-full flex justify-center items-center">
      <div className="max-w-screen-2xl w-full">
        <div className="flex flex-col md:flex-row justify-center max-w-screen-2xl mx-auto px-4 py-6 gap-4">
          <div className="flex-1 p-4 space-y-3">
            <p className="text-xl">One-Click Megayield</p>
            <h1 className="text-6xl font-bold">
              Friends With Benefits. Deposit for a daily chance to win
            </h1>
            <ul className="text-xl text-gray-400 space-y-2">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-frensYellow rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>Deposit Funds to a vault.</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-frensYellow rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>Recieve pool tickets.</p>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 bg-frensYellow rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <p>Win pool prizes.</p>
              </li>
            </ul>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2 w-4/5 mx-auto">
              <Card>
                <CardHeader className="">
                  <div className="flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-12 h-12"
                      src="/images/asset-1-8-6.png"
                      alt="logo"
                    />
                    <h1 className="font-bold text-2xl">Frens Prizes</h1>
                  </div>
                </CardHeader>
                <Separator />
                <CardContent>
                  <div className="my-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <p className="text-base">Total Prize Pool</p>
                      <div className="flex items-center gap-2 ">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-5"
                          src="/images/bsol-73.png"
                          alt="logo"
                        />
                        <p>$2,546</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Grand Prize</p>
                      <div className="flex items-center gap-2 ">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-5"
                          src="/images/bsol-73.png"
                          alt="logo"
                        />
                        <p>$2,546</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Recent Daily Draw</p>
                      <div className="flex items-center gap-2 ">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-5"
                          src="/images/bsol-73.png"
                          alt="logo"
                        />
                        <p>$2,546</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardFooter>
                  <div className="w-2/3 mx-auto py-2 space-y-1">
                    <p className="text-xs text-center">
                      Deposit funds. Withdraws are available anytime
                    </p>
                    <button className="uppercase font-bold bg-frensYellow w-full py-3 rounded-full">
                      Join The Pool
                    </button>
                  </div>
                </CardFooter>
              </Card>
            </div>
            <div className="md:w-1/2 w-4/5 mx-auto">
              <Card>
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
                  <div className="my-4">
                    <div className="flex justify-between items-center">
                      <p>TLV</p>
                      <p>$948,067</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p>Poolers</p>
                      <p>367</p>
                    </div>
                  </div>
                </CardContent>
                <Separator />
                <CardContent>
                  <div className="my-4 space-y-4">
                    <div className="flex justify-between items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-12 h-12"
                        src="/images/solana-logo-5-1x-png.png"
                        alt="logo"
                      />
                      <p>703,266 USDC</p>
                    </div>
                    <div className="flex justify-between items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-12 h-12"
                        src="/images/solana-logo-5-1x-png.png"
                        alt="logo"
                      />
                      <p>703,266 USDC</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
