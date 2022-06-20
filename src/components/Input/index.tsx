interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  containerStyles?: string;
  labelString: string;
}

const Input = ({ containerStyles, labelString, ...props }: Props) => {
  return (
    <div className={`flex flex-col gap-2 mb-2 ${containerStyles}`}>
      <label
        className="text-base font-light text-secondary text-opacity-80"
        htmlFor={`${props.name}Field`}
      >
        {labelString}
      </label>
      <input id={`${props.name}Field`} name={`${props.name}Field`} {...props} />
    </div>
  );
};

export default Input;
