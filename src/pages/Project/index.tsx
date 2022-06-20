import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { Project as ProjectType } from "../../context/ProjectContext/utils";
import CardContainer from "./CardContainer";
import ProjectDataProvider, {
  useProjectData,
} from "../../context/ProjectDataContext";
import { getUnFormattedProjectCards } from "../../context/ProjectDataContext/utils";

const onDragEnd = (result: DropResult, columns: any, setColumns: any) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.cards];
    const destItems = [...destColumn.cards];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        cards: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        cards: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.cards];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        cards: copiedItems,
      },
    });
  }
};

const Project = () => {
  const location = useLocation();
  const { state }: any = location;
  const { project }: { project: ProjectType } = state;
  // TODO segregating the docs from firestore to different lists - Todo Ongoing,... - DONE
  // TODO: Not yet storing the data on the backend

  return (
    <ProjectDataProvider projectId={project.id}>
      <Data project={project} />
    </ProjectDataProvider>
  );
};

const Data = ({ project }: { project: ProjectType }) => {
  const { columns, setColumns } = useProjectData();

  return (
    <DragDropContext
      onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
    >
      <div className="w-full self-stretch">
        <Header title={project.title} />
        <p className="mx-4 md:mx-8">{project.description}</p>
        <div className="div flex flex-1 h-full gap-4 mt-8 px-8 items-start overflow-x-auto">
          {Object.entries(columns).map(([columnId, column]: any) => (
            <CardContainer
              key={columnId}
              cards={column.cards}
              containerId={columnId}
              listName={column.name}
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Project;
