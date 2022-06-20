const AddNewBtn = () => {
  return (
    <button className="flex gap-2 bg-accent p-6 lg:py-8 rounded-md">
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.4541 5.94574V19.9457"
          stroke="#F9F9F9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.4541 12.9457H19.4541"
          stroke="#F9F9F9"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p className="flex-1">New Project</p>
    </button>
  );
};

export default AddNewBtn;
