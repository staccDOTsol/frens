export default function WelcomeBackground() {
  return (
    <div className="-z-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/vector-1580-10.png"
        alt=""
        className="invisible md:visible absolute -top-20 -left-20 w-1/2 rotate-0 -z-10"
      />

      <div className="absolute top-[800px] left-[500px] -z-10">
        <div className="relative inset-0 w-32 h-24 -rotate-45">
          <div className="rounded-full h-12 w-12 bg-frensYellow opacity-50 absolute right-0 bottom-0"></div>
          <div className="rounded-full h-12 w-12 bg-frensYellow absolute left-1/2 -translate-x-1/2"></div>
          <div className="rounded-full h-12 w-12 bg-frensYellow opacity-50 absolute left-0 bottom-0"></div>
        </div>
      </div>

      <div className="w-[465px] h-[465px] rounded-full bg-frensYellow absolute -z-10 right-[-350px] top-[550px] invisible md:visible"></div>
    </div>
  );
}
