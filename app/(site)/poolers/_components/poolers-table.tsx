import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Badge from '@/components/badge';

export default function PoolersTable() {
  return (
    <div className=" flex-col justify-center items-center hidden md:flex">
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

      <div className="w-full max-w-xl px-2 md:px-0">
        <Table className="bg-white mx-auto">
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium ">
                  <div className="font-normal truncate">
                    3EGBWpVrkrnVjCGvGsk9WbMwHJLt2yNuhqKLSg7fU3xh
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
