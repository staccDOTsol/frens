export default function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white p-3 shadow-lg rounded-md text-sm">{children}</div>
  );
}
