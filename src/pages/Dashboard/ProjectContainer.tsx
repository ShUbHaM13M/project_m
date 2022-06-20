import ProjectInfoCard from "../../components/ProjectInfoCard";
import Star from "../../components/Star";
import { useProject } from "../../context/ProjectContext";
import AddNewBtn from "./AddNewBtn";

const ProjectContainer = () => {
  const { projects } = useProject();

  return (
    <>
      <div className="flex flex-col p-4 px4 md:px-8 gap-4">
        <div className="flex gap-2">
          <Star />
          <h3>Stared projects</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects
            ?.filter((project) => project.isStared)
            .map((project) => (
              <ProjectInfoCard key={project.id} project={project} />
            ))}
        </div>
      </div>

      <div className="flex flex-col p-4 px4 md:px-8 gap-4">
        <h3>Your projects</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {projects?.map((project) => (
            <ProjectInfoCard key={project.id} project={project} />
          ))}
          <AddNewBtn />
        </div>
      </div>
    </>
  );
};

export default ProjectContainer;
