export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  justify-center items-start h-full w-full ">
      {children}
    </div>
  );
}
