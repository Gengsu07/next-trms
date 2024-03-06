import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  return (
    <main className="w-screen h-screen">
      {session?.user && redirect("/dashboard")}
    </main>
  );
}
