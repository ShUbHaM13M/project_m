import { useRef, useState } from "react";
import AddIcon from "./AddIcon";

interface Props {
  onSubmit: (title: string) => void;
}

const AddCardButton = ({ onSubmit }: Props) => {
  const [title, setTitle] = useState("");
  const [active, setActive] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function onAddButtonClick() {
    setActive(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  function handleSubmit(e: any) {
    if (!title.length) return;
    onSubmit(title);
    setTitle("");
    setActive(false);
  }

  return (
    <>
      {!active && (
        <button
          onClick={onAddButtonClick}
          className="flex items-center gap-2 p-4 rounded-md shadow-sm shadow-slate-300"
        >
          <AddIcon />
          <p className="text-gray-500 text-sm">Add a new card</p>
        </button>
      )}
      {active && (
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            value={title}
            placeholder="Enter title"
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && handleSubmit(e)}
            className="max-w-none w-full p-2 h-14 bg-gray-200 text-primary outline-none rounded-md text-base shadow-sm shadow-slate-300"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => {
                setTitle("");
                setActive(false);
              }}
              className="text-primary rounded-md p-0 text-2xl"
            >
              &times;
            </button>
            <button
              onClick={handleSubmit}
              className="bg-accent text-secondary p-2 text-xs rounded-md "
            >
              Add card
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCardButton;
