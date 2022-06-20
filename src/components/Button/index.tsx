interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: React.ReactNode;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className={`text-secondary bg-accent rounded-xl 
        p-4 px-20
        text-lg shadow-sm
        focus:shadow-none hover:animate-pulse
        transition-shadow duration-300 ease-out
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
