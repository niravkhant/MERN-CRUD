import Login from "@/components/Login/Login";
import Dashboard from "@/components/dashboard/Dashboard";
import { useAuth } from "@/context/authContext";

export default function Home() {

  return (
    <main className="home-section">
      <Dashboard />
    </main>
  );
}
