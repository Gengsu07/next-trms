"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = () => {
  const PathName = usePathname().replace("/", "");

  return (
    <main className="flex flex-col md:flex-row justify-center items-center gap-5  h-15 px-5 py-5 ">
      <div className="flex flex-col md:flex-row gap-5 justify-center items-center">
        <Link
          href="/dashboard"
          className={classNames({
            "font-semibold border-b-2 border-accent-foreground":
              PathName === "dashboard",
            "cursor-pointer hover:font-semibold": true,
          })}
        >
          <h1>Dashboard</h1>
        </Link>
        <Link
          href="/report"
          className={classNames({
            "font-semibold  border-b-2 border-accent-foreground":
              PathName === "report",
            "cursor-pointer hover:font-semibold": true,
          })}
        >
          <h1>Report</h1>
        </Link>
      </div>
    </main>
  );
};
export default NavBar;
