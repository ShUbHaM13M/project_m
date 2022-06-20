import { disableNetwork, enableNetwork } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getProjectCards, Column } from "./utils";
import { db } from "../../components/firebase/firebase";

type ProjectDataProps = {
  columns: Column;
  setColumns: React.Dispatch<React.SetStateAction<Column>>;
};

const ProjectDataContext = createContext<Partial<ProjectDataProps>>({});

export function useProjectData() {
  return useContext(ProjectDataContext);
}

interface ProjectDataProviderProps {
  children: React.ReactNode;
  projectId: string;
}

export default function ProjectDataProvider({
  children,
  projectId,
}: ProjectDataProviderProps) {
  const [columns, setColumns] = useState<Column>({});

  useEffect(() => {
    getProjectCards(projectId).then((data) => {
      setColumns(data);
      disableNetwork(db);
    });
    //TODO When the user leaves the project add the changes to firestore
    return () => enableNetwork(db);
  }, [projectId]);

  const value = { columns, setColumns };
  return (
    <ProjectDataContext.Provider value={value}>
      {children}
    </ProjectDataContext.Provider>
  );
}
