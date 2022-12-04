import Link from "next/link";

export default function Header() {
  return (
    <div className="flex flex-col items-center p-3 gap-y-3 bg-[#12bca2]">
      <h1 className="text-4xl text-white font-bold ">Supa Smoothies</h1>
      <div className="text-xl text-white space-x-5 underline font-light">
        <Link href="/">Home</Link>
        <Link href="/create">Make a new one</Link>
      </div>
    </div>
  );
}
