import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function VaultTableMobile({ data }: { data: any }) {
  return (
    <div className="space-y-12 my-12">
      {data.map((data: any, i: number) => (
        <Table key={i} className="block md:hidden max-w-3xl bg-white mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] text-center">
                <div className="flex flex-row items-center justify-between">
                  <h3>Vault</h3>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/bsol-73.png" alt="" />
                  <p>bSOL-SOL</p>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <div className="flex flex-row justify-between items-center">
                  <p>Poolers</p>
                  <p>200</p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex flex-row justify-between items-center">
                  <div className="w-2/3">7d Yield</div>
                  <div className="w-1/3 flex items-center justify-between">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-5" src="/images/bsol-73.png" alt="logo" />
                    <p>2.3</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex flex-row justify-between items-center">
                  <div>Vault APR</div>
                  <p>9.8%</p>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex flex-row justify-between items-center">
                  <p className="w-2/3">7d Prize</p>
                  <div className="w-1/3 flex items-center justify-between">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-5" src="/images/bsol-73.png" alt="logo" />
                    <p>100,000</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <div className="flex flex-row justify-between items-center">
                  <div className="w-2/3">TLV</div>
                  <div className="w-1/3 flex items-center justify-between">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-5" src="/images/bsol-73.png" alt="logo" />
                    <p>100,000</p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </div>
  );
}
