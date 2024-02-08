import PoolersTable from './_components/poolers-table';
import PoolersTableMobile from './_components/poolers-table-mobile';

export default function PoolersPage() {
  return (
    <div className="h-full flex justify-center items-center bg-transparent">
      <PoolersTable />
      <PoolersTableMobile />
    </div>
  );
}
