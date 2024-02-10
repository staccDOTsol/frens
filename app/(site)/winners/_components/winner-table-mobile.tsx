import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Badge from '@/components/badge';

export default function WinnerTableMobile() {
  return (
    <div className="md:hidden my-12">
      <div className="flex flex-row gap-8 mb-10">
        <Badge>
          <p>
            Unique Winners <span className="font-bold">20</span>
          </p>
        </Badge>
        <Badge>
          <div className="flex items-center gap-2">
            <p>Total</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-5 h-5" src="/images/bsol-73.png" alt="logo" />
            <p>2,546</p>
          </div>
        </Badge>
      </div>

      <Table className="bg-white max-w-96">
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>3EGBW...hqKLSg7f</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 ">
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
  );
}
