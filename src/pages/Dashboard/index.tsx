import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../components/firebase/context";
import Header from "../../components/Header";
import SidebarMenu from "../../components/SidebarMenu";
import ProjectProvider, { useProject } from "../../context/ProjectContext";
import HamIcon from "./HamIcon";
import ProjectContainer from "./ProjectContainer";

const Dashboard = () => {
  const { signOutUser, isAuthenticated, isVerified } = useFirebase();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  const { projects } = useProject();

  const handleOnHamClick = useCallback(() => {
    setShowSidebar((prev) => !prev);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) navigate("/login", { replace: true });
    if (!isVerified) navigate("/not-verified");
  }, [isAuthenticated, isVerified]);

  return (
    <ProjectProvider>
      <div className="w-full self-stretch">
        <Header title="Projects" />

        <button onClick={signOutUser}>Sign out</button>

        <ProjectContainer />

        {/* End Contents */}
        <div
          className={`pointer-events-none fixed transition-colors duration-300 ease-out top-0 left-0 w-full h-full bg-black ${
            showSidebar ? "bg-opacity-60" : "bg-opacity-0"
          }`}
        ></div>
        <SidebarMenu show={showSidebar} />

        <HamIcon isOpen={showSidebar} onClick={handleOnHamClick} />
      </div>
    </ProjectProvider>
  );
};

export default Dashboard;
