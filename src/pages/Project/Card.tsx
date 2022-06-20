import Tag from "./Tag";
import { Card as CardType } from "../../context/ProjectDataContext/utils";

import descriptionIcon from "../../assets/images/description.svg";
import clockIcon from "../../assets/images/clock.svg";
import editIcon from "../../assets/images/edit.svg";
import todo from "../../assets/images/todo.svg";
import { useMemo, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";

interface CardProps {
  card: CardType;
  index: number;
}

const Card = ({ card, index }: CardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { todos } = card;
  const getCompletedTodos = () =>
    todos?.reduce((count, todo) => (todo.isCompleted ? count + 1 : count), 0);
  const completed = useMemo(() => getCompletedTodos(), [todos]);
  const total = todos?.length || 0;

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          id={card.id}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`flex flex-col p-2 rounded-md shadow-sm shadow-slate-300 bg-secondary relative transform ${
            snapshot.isDragging && "bg-opacity-80"
          }`}
        >
          <div className="flex gap-1 my-2">
            {card?.tags?.map((tag) => (
              <Tag key={tag} tag={tag} />
            ))}
          </div>
          <p className="text-primary text-sm">{card.title}</p>
          <div className="flex gap-2 my-2 items-center">
            {card.description && <Icon icon={descriptionIcon} />}
            {card.todos && total > 0 && (
              <div className="flex gap-1">
                <Icon icon={todo} />
                <p className="text-black text-opacity-60 text-xs">
                  {completed} / {total}
                </p>
              </div>
            )}
            {card.schedule && <Icon icon={clockIcon} />}
          </div>
          <div
            className={`absolute top-2 right-2 transition-opacity duration-150 ease-out ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Icon icon={editIcon} />
          </div>
        </div>
      )}
    </Draggable>
  );
};

const Icon = ({ icon }: { icon: string }) => {
  return <img className="h-4.5 w-4.5 select-none" src={icon} alt="" />;
};

export default Card;
