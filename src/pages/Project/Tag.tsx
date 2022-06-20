import { Tags } from "../../context/ProjectDataContext/utils";

const Tag = ({ tag }: { tag: string }) => {
  return <div className={`h-2.5 w-6 rounded-full ${Tags[tag]}`}></div>;
};

export default Tag;
