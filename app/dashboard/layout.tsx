import Header from "@/components/Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="w-screen h-screen">{children}</div>;
};
export default AuthLayout;
