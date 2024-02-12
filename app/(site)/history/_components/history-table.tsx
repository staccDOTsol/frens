import Badge from '@/components/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export default function HistoryTable() {
  return (
    <div className="flex-col justify-center items-center gap-6 hidden xl:flex">
      <div className="flex gap-6">
        <Badge>
          <p className="text-lg">
            Total Prizes <span className="font-bold">2,222</span>
          </p>
        </Badge>
        <Badge>
          <div className="flex items-center gap-2 text-lg">
            <p>Total Won</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-5 h-5" src="/images/bsol-73.png" alt="logo" />
            <p>2,546</p>
          </div>
        </Badge>
        <Badge>
          <div className="flex items-center gap-2 text-lg">
            <p>Average Per Draw</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-5 h-5" src="/images/bsol-73.png" alt="logo" />
            <p>2,546</p>
          </div>
        </Badge>
      </div>

      <div className="w-full max-w-5xl px-2 md:px-0">
        <Table className="bg-white">
          <TableHeader>
            <TableRow className="text-lg lg:text-2xl">
              <TableHead>Draw</TableHead>
              <TableHead>Unique Winners</TableHead>
              <TableHead>Prizes Won</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[22px] font-normal">
            {[...Array(5)].map((_, i) => (
              <TableRow key={i} className="font-medium">
                <TableCell>Draw {i}</TableCell>
                <TableCell>31</TableCell>
                <TableCell>31</TableCell>
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
