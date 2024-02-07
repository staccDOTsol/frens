import Badge from '@/components/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function HistoryTableMobile() {
  return (
    <div className="flex-col justify-center items-center gap-6 flex md:hidden ">
      <div className="flex gap-6">
        <Badge>
          <p>
            Total Prizes <span className="font-bold">2,222</span>
          </p>
        </Badge>
        <Badge>
          <div className="flex items-center gap-2">
            <p>Total Won</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-5 h-5" src="/images/bsol-73.png" alt="logo" />
            <p>2,546</p>
          </div>
        </Badge>
      </div>

      <div className="w-100">
        <Table className="bg-white mx-auto w-[358px]">
          <TableHeader>
            <TableRow>
              <TableHead>Draw</TableHead>
              <TableHead>Prizes Won</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium"># {i}</TableCell>
                <TableCell className="font-medium">62</TableCell>
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
