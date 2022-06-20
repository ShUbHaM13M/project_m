import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useFirebase } from "../../components/firebase/context";
import { Project, ProjectProps, getAllUserProjects } from "./utils";

const ProjectContext = createContext<Partial<ProjectProps>>({});

export function useProject() {
  return useContext(ProjectContext);
}

const ProjectProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const { user } = useFirebase();

  const getProjects = useCallback(() => {
    setLoading(true);
    getAllUserProjects(user?.uid)
      .then((data) => {
        setProjects(data);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, [user?.uid]);

  useEffect(() => {
    if (!user) return;
    getProjects();
  }, [user?.uid]);

  const value = {
    projects,
    setProjects,
    loading,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export default ProjectProvider;
