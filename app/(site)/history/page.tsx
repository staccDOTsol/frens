import HistoryTable from './_components/history-table';
import HistoryTableMobile from './_components/history-table-mobile';

export default function HistoryPage() {
  return (
    <div className="h-full flex flex-col space-y-6 justify-center items-center bg-transparent">
      <div className="w-full">
        <HistoryTable />
        <HistoryTableMobile />
      </div>
    </div>
  );
}
