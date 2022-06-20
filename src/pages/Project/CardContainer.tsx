import { Droppable } from "react-beautiful-dnd";
import AddCardButton from "./AddCardButton";
import Card from "./Card";
import ThreeDotMenu from "./ThreeDotMenu";
import { Card as CardType } from "../../context/ProjectDataContext/utils";
import { useProjectData } from "../../context/ProjectDataContext";

interface CardContainerProps {
  listName: string;
  containerId: string;
  cards: CardType[];
}
//! This shouldn't be here
//* This is more important
//TODO need to change the state and add new cards
//? Should i keep this or not

const CardContainer = ({
  listName,
  cards,
  containerId,
}: CardContainerProps) => {
  const { columns, setColumns } = useProjectData();

  function onAddNewCard(title: string) {
    const newCard = new CardType(title, title, listName);
    const updatedColumns = columns;
    if (updatedColumns) {
      const previousCards = updatedColumns[listName].cards;
      updatedColumns[listName] = {
        ...updatedColumns[listName],
        cards: [...previousCards, newCard],
      };
      setColumns && setColumns({ ...updatedColumns });
    }
  }

  return (
    <Droppable droppableId={containerId}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          className={`${
            snapshot.isDraggingOver ? "bg-gray-300" : "bg-secondary"
          } flex flex-col rounded-md p-4 md:w-80 gap-2 
        selection:bg-primary selection:text-secondary`}
        >
          <div className="flex justify-between items-center">
            <p className="text-primary font -medium">{listName}</p>
            <ThreeDotMenu />
          </div>
          <div className="divider w-full my-2 bg-primary bg-opacity-20"></div>
          <div
            className="flex-1 flex w-60 md:w-full flex-col gap-2"
            {...provided.droppableProps}
          >
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder}
          </div>
          <AddCardButton onSubmit={onAddNewCard} />
        </div>
      )}
    </Droppable>
  );
};

export default CardContainer;
