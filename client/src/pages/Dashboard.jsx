import { useContext } from "react";
import Footer from "../components/Footer";
import { UserContext } from "../context/user/context";
export default function Dashboard() {
  const { setUser } = useContext(UserContext);
  return (
    <>
      <div className="min-h-screen">
        <div className="shadow">
          <div className="flex justify-between  p-6 max-w-[1800px] mx-auto">
            <div className="text-blue-900 ">Dashboard</div>
            <DashboardNav />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function DashboardNav() {
  return (
    <div>
      <ul className="flex gap-6 ">
        <li>Connect</li>
        <li>Connect</li>
        <li>Connect</li>
      </ul>
    </div>
  );
}
