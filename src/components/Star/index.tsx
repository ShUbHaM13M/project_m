interface Props {
  isFilled?: boolean;
  onClick?: () => void;
}

const Star = ({ isFilled, onClick }: Props) => {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick && onClick();
      }}
      className={onClick ? "cursor-pointer" : ""}
    >
      <svg
        width="31"
        height="31"
        viewBox="0 0 31 31"
        className={`transition-colors duration-250 ease-out ${
          isFilled ? "fill-accent" : "fill-transparent"
        }`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.135 2.53719L18.9975 10.3622L27.635 11.6247L21.385 17.7122L22.86 26.3122L15.135 22.2497L7.41001 26.3122L8.88501 17.7122L2.63501 11.6247L11.2725 10.3622L15.135 2.53719Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={onClick ? "stroke-accent" : "stroke-secondary"}
        />
      </svg>
    </div>
  );
};

export default Star;
