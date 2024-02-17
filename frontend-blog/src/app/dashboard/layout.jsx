import SideBar from "@/components/Header/SideBar";

export default function DashboardLayout({children}) {
    return (
      <section className="dashboardMainLayout">
        <div className="sideBarMain">
        <SideBar/>
        </div>
        <div className="dashboardContentMain">
        {children}
        </div>
      </section>
    )
  }