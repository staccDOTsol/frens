'use client';
import { vaultsData } from '@/data/vaultsData';
import VaultTable from './_components/vault-table';
import VaultTableMobile from './_components/vault-table-mobile';

export default function ValutsPage() {
  return (
    <div className="h-full flex justify-center items-center bg-transparent">
      <div className="w-100">
        <VaultTable data={vaultsData} />
        <VaultTableMobile data={vaultsData} />
      </div>
    </div>
  );
}
