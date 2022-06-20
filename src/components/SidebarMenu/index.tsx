import { Link } from "react-router-dom";

interface Props {
  show: boolean;
}

const SidebarMenu = ({ show }: Props) => {
  return (
    <div
      className={`bg-primary shadow-md h-full w-full md:w-2/4 lg:w-2/5 fixed 
      top-0 transform transition-all right-0 flex items-center pl-6
      ${show ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex flex-col gap-4 text-secondary mb-8">
        <Link className="text-4xl" to="#">
          Projects
        </Link>
        <Link className="text-4xl" to="#">
          Templates
        </Link>
        <Link className="text-4xl" to="#">
          Settings
        </Link>
        <Link className="text-4xl" to="#">
          About
        </Link>
      </div>
    </div>
  );
};

export default SidebarMenu;
