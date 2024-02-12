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
    <div className="flex-col justify-center items-center hidden xl:flex">
      <div className="flex flex-row gap-8 mb-10">
        <Badge>
          <p className="text-lg">
            Unique Winners <span className="font-bold">20</span>
          </p>
        </Badge>
        <Badge>
          <div className="flex items-center gap-2 text-lg">
            <p>Total</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="w-5 h-5" src="/images/bsol-73.png" alt="logo" />
            <p>2,546</p>
          </div>
        </Badge>
      </div>

      <div className=" px-2 md:px-0">
        <Table className="bg-white mx-auto">
          <TableHeader>
            <TableRow className="text-lg lg:text-2xl">
              <TableHead>Address</TableHead>
              <TableHead>Balance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-[22px] font-normal">
            {[...Array(3)].map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">
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
