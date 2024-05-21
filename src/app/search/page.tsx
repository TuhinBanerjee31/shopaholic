"use client";
import { usePathname, useSearchParams } from "next/navigation";

export default function Search() {
  // const router = useRouter();
  const pathname = usePathname()
  const searchParams = useSearchParams();
  const data = searchParams.get('search');

  console.log("PATHNAME: ", pathname)
  console.log("SEARCHPARAM: ", data)
  return (
    <div>
      <h1>{data}</h1>
      <button>logout</button>
    </div>
  );
}
