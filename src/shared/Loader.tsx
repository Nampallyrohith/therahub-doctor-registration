import { FourSquare } from "react-loading-indicators";

const Loader = () => {
  return (
    <div className="w-full h-screen mx-auto flex flex-col items-center justify-center">
      <FourSquare
        color="#FFBF69"
        size="small"
        text="Loading..."
        textColor=""
      />
    </div>
  );
};

export default Loader;
