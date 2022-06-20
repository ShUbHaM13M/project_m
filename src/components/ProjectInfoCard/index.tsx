import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../context/ProjectContext/utils";
import Star from "../Star";

interface Props {
  project: Project;
}

const ProjectInfoCard = ({ project }: Props) => {
  const [filled, setFilled] = useState(project.isStared);
  const navigate = useNavigate();
  const onStarClicked = () => {
    setFilled((prev) => !prev);
  };
  const onCardClicked = () => {
    navigate(`/home/project/${project.id}`, {
      state: { project },
    });
  };
  return (
    <div
      onKeyDown={(e) => e.key === "Enter" && onCardClicked()}
      tabIndex={0}
      onClick={onCardClicked}
      className="flex gap-2 bg-secondary p-6 lg:py-8 rounded-md 
      focus:outline-dashed focus:outline-secondary focus:outline-2 focus:outline-offset-1"
    >
      <p className="flex-1 selection:text-secondary selection:bg-primary text-primary">
        {project.title}
      </p>
      <Star isFilled={filled} onClick={onStarClicked} />
    </div>
  );
};

export default ProjectInfoCard;
