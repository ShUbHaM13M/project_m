interface Props {
  isOpen: boolean;
  onClick: () => void;
}

const HamIcon = ({ isOpen, onClick }: Props) => {
  return (
    <svg
      onClick={onClick}
      width={60}
      height={61}
      fill="none"
      xmlns="http:www.w3.org/2000/svg"
      className="rounded-full fixed bottom-4 right-4 md:bottom-8 md:right-8 
      shadow-md shadow-gray-800"
    >
      <g filter="url(#filter0_d_27_37)">
        <rect
          x="1"
          y="0"
          width="60"
          height="60"
          rx="30"
          className={`transition-color duration-300 ease-out ${
            isOpen ? "fill-tag-red" : "fill-accent"
          }`}
        />
      </g>
      <rect
        x="14.99119"
        y="19.4586"
        width="30"
        height="4"
        rx="2"
        className={`transition-transform transform origin-center fill-secondary ${
          isOpen ? "translate-y-1.5 -translate-x-1 rotate-45" : "rotate-0"
        } `}
      />
      <rect
        x="14.99119"
        y="28"
        width="30"
        height="4"
        rx="2"
        className={`transition-all duration-200 ease-in fill-secondary ${
          isOpen ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
        }`}
      />
      <rect
        x="14.99119"
        y="36.5414"
        width="30"
        height="4"
        rx="2"
        className={`transition-transform transform origin-center fill-secondary ${
          isOpen ? "-translate-y-1.5 -translate-x-1 -rotate-45" : "rotate-0"
        } `}
      />
      <defs>
        <filter
          id="filter0_d_27_37"
          x="0.528809"
          y="0"
          width="72"
          height="72"
          filterUnits="userSpaceOnUse"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="3" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_27_37"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_27_37"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default HamIcon;
