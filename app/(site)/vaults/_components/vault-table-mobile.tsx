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
    <div className="space-y-12 block xl:hidden my-12">
      {data.map((data: any, i: number) => (
        <Table key={i} className="max-w-3xl bg-white mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px] text-center">
                <div className="flex flex-row items-center justify-between">
                  <h3 className="text-lg">Vault</h3>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/images/bsol-73.png" alt="" />
                  <p className="text-base">bSOL-SOL</p>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-base">
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
                  <div>7d Yield</div>
                  <div className="w-[40%] flex items-center justify-between">
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
                  <p>7d Prize</p>
                  <div className="w-[40%] flex items-center justify-between">
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
                  <div>TLV</div>
                  <div className="w-[40%] flex items-center justify-between">
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
