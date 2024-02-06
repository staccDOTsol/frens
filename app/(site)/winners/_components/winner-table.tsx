import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function WinnerTable() {
  return (
    <Table className="hidden md:block max-w-4xl bg-white mx-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Address</TableHead>
          <TableHead>Vault</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(3)].map((_, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium w-64">
              <div className="font-normal">
                3EGBWpVrkrnVjCGvGsk9WbMwHJLt2yNuhqKLSg7fU3xh
              </div>
            </TableCell>
            <TableCell className="font-medium w-64">
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
