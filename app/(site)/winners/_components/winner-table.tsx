import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Badge from '@/components/badge';

export default function WinnerTable() {
  return (
    <div className="flex-col justify-center items-center gap-6 hidden xl:flex">
      <div className="flex gap-6">
        <Badge>
          <p className="text-lg">
            Vaults <span className="font-bold">2</span>
          </p>
        </Badge>
        <Badge>
          <p className="text-lg">
            Unique Winners <span className="font-bold">20</span>
          </p>
        </Badge>
        <Badge>
          <div className="flex items-center gap-2">
            <p className="text-lg">Total</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-5 h-5" src="/images/bsol-73.png" alt="logo" />
            <p className="text-lg">2,546</p>
          </div>
        </Badge>
      </div>
      <div>
        <Table className="hidden xl:block bg-white mx-auto">
          <TableHeader>
            <TableRow className="text-lg lg:text-2xl">
              <TableHead>Address</TableHead>
              <TableHead>Vault</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[22px] font-normal">
            {[...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div>3EGBWpVrkrnVjCGvGsk9WbMwHJLt2yNuhqKLSg7fU3xh</div>
                </TableCell>
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
                      <img
                        className="w-10"
                        src="/images/bsol-73.png"
                        alt="logo"
                      />
                    </div>
                    <p>bSOL - SOL</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="w-5" src="/images/bsol-73.png" alt="logo" />
                    <p>2,546</p>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
