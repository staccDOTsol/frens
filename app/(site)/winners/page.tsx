import WinnerTable from './_components/winner-table';
import WinnerTableMobile from './_components/winner-table-mobile';

export default function WinnersDrawsPage() {
  return (
    <div className="h-full flex justify-center items-center bg-transparent">
      <div className="w-100">
        <WinnerTable />
        <WinnerTableMobile />
      </div>
    </div>
  );
}
