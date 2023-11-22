import Link from "next/link";
import { HsKrkIcon } from "./icons/IconHskrk";

export function Menu() {
  return (
    <header className="w-full h-16 flex items-center px-4 md:px-6">
      <Link className="flex items-center justify-center mt-5" href="#">
        <HsKrkIcon theme={"dark"} className="h-20 w-20" />
        <span className="sr-only">HSKRK</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="https://hskrk.pl"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="https://auth.apps.hskrk.pl"
        >
          Login
        </Link>
      </nav>
    </header>
  );
}
