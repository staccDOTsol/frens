export default function Background() {
  return (
    <div className="-z-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/vector-1580-10.png"
        alt=""
        className="fixed -top-20 -left-20 w-1/2 rotate-0 ring-2"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/vector-1580-9.png"
        alt=""
        className="fixed -bottom-20 -right-20 w-1/2 rotate-0"
      />

      <div className="fixed bottom-24 left-24">
        <div className="relative inset-0 w-32 h-24 -rotate-45">
          <div className="rounded-full h-12 w-12 bg-frensYellow opacity-50 fixed right-0 bottom-0"></div>
          <div className="rounded-full h-12 w-12 bg-frensYellow fixed left-1/2 -translate-x-1/2"></div>
          <div className="rounded-full h-12 w-12 bg-frensYellow opacity-50 fixed left-0 bottom-0"></div>
        </div>
      </div>
      <div className="fixed top-44 -right-4">
        <div className="relative inset-0 w-32 h-24 -rotate-45">
          <div className="rounded-full h-12 w-12 bg-frensYellow opacity-50 fixed right-0 bottom-0"></div>
          <div className="rounded-full h-12 w-12 bg-frensYellow fixed left-1/2 -translate-x-1/2"></div>
          <div className="rounded-full h-12 w-12 bg-frensYellow opacity-50 fixed left-0 bottom-0"></div>
        </div>
      </div>
    </div>
  );
}
