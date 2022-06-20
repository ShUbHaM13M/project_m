import { useFirebase } from "../firebase/context";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  const { user } = useFirebase();
  const userAvatar = 
    user?.photoURL || "https://www.svgrepo.com/show/100468/user.svg";

  return (
    <div className="w-full shadow-sm p-4 px-4 md:px-8 flex justify-between items-center">
      <h2>{title}</h2>
      <button className="focus:outline-none border border-secondary w-14 h-14 overflow-hidden p-0 rounded-full">
        <img className="w-full h-full" src={userAvatar} alt="user avatar" />
      </button>
    </div>
  );
};

export default Header;
