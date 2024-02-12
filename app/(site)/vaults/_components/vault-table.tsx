import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function VaultTable({ data }: { data: any }) {
  return (
    <Table className="hidden xl:block max-w-[1545px] w-full bg-white mx-auto">
      <TableHeader>
        <TableRow className="text-lg lg:text-2xl">
          <TableHead>Vault</TableHead>
          <TableHead>Poolers</TableHead>
          <TableHead>7 Day Yield</TableHead>
          <TableHead>Valut APR</TableHead>
          <TableHead>7 Day Prize</TableHead>
          <TableHead>Deposits</TableHead>
          <TableHead>TLV</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-[22px] font-medium">
        {data.map((data: any, i: number) => (
          <TableRow key={i}>
            <TableCell>
              <div className="flex flex-row items-center gap-2">
                <div className="flex -space-x-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-10"
                    src="/images/solana-logo-19.png"
                    alt="logo"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-10" src="/images/bsol-73.png" alt="logo" />
                </div>
                <p>bSOL - SOL</p>
                <div className="bg-yellow-500 p-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-2" src="/images/arrow-2.png" alt="arrow" />
                </div>
              </div>
            </TableCell>
            <TableCell>100</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-5" src="/images/bsol-73.png" alt="logo" />
                <p>2.3</p>
              </div>
            </TableCell>
            <TableCell>4.6%</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-5" src="/images/bsol-73.png" alt="logo" />
                <p>2.3</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-5" src="/images/bsol-73.png" alt="logo" />
                <p>2,546</p>
              </div>
            </TableCell>
            <TableCell>$948,067</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
