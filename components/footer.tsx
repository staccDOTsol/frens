import Link from 'next/link';

export default function Footer() {
  return (
    <div className="bg-white">
      <div className="bg-frensYellow/25">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-start md:items-start max-w-screen-2xl mx-auto py-16 gap-12 px-8 md:px0">
          <div className="flex-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-[250px]"
              src="/images/frens-logo-17.png"
              alt="logo"
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-2xl">Frens with benefits</h3>
            <p className="text-[22px] text-[#707070]">
              It’s a one click megayield. Deposit fund, get poll tickets and
              win. Users can withdraw their funds at any time.
            </p>
            <div className="flex items-center gap-4 justify-center md:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-[65px] h-[65px]"
                src="/images/kisspng-discord-teamspeak-computer-icons-logo-game-buttorn-5ad1d-6.png"
                alt="logo"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="w-[65px] h-[65px]"
                src="/images/vector-6.png"
                alt="logo"
              />
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-2xl">Explore</h4>
            <ul className="text-xl text-[#707070] space-y-1">
            
              <li>
                <Link href="/">Welcome</Link>
              </li>
            </ul>
          </div>
          <div className="spcae-y-4 hidden md:block">
            <h4 className="font-bold text-2xl">How It Works</h4>
            <p className="text-[22px] text-[#707070]">
              Yield stakes bsol, deposits bsol to mrgnfi, borrows sol, stakes
              bsol. Unyield unstakes bsol, repays sol, unstakes bsol.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white flex justify-center py-6 text-center px-4">
        <p>
          Copyright @ Meerkat Millionaires Country Club. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
