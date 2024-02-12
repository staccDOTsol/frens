import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Badge from '@/components/badge';

export default function PoolersTableMobile() {
  return (
    <div className="xl:hidden my-12">
      <div className="flex flex-row gap-8 mb-10">
        <Badge>
          <p className="text-sm">
            Total Prizes <span className="font-bold">2,038</span>
          </p>
        </Badge>
        <Badge>
          <div className="flex items-center gap-2 text-sm">
            <p>Total Won</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-5 h-5" src="/images/bsol-73.png" alt="logo" />
            <p>2,546</p>
          </div>
        </Badge>
      </div>

      <Table className="bg-white max-w-96">
        <TableHeader>
          <TableRow className="text-lg">
            <TableHead>Address</TableHead>
            <TableHead>Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>3EGBW...hqKLSg7f</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 ">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="w-5" src="/images/bsol-73.png" alt="logo" />
                  <p>200</p>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
