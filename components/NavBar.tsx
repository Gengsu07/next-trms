"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const PathName = usePathname().replace("/", "");

  return (
    <main className="flex flex-col md:flex-row justify-center items-center gap-5  px-5 py-5 ">
      <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
        <Link
          href="/dashboard"
          className={classNames({
            "font-semibold border-b-2 border-accent-foreground":
              PathName === "dashboard",
            "cursor-pointer hover:font-semibold text-sm": true,
          })}
        >
          <p>Dashboard</p>
        </Link>
        <Link
          href="/sektoral"
          className={classNames({
            "font-semibold  border-b-2 border-accent-foreground":
              PathName === "sektoral",
            "cursor-pointer hover:font-semibold text-sm": true,
          })}
        >
          <p>Sektoral</p>
        </Link>
      </div>
    </main>
  );
};
export default NavBar;
