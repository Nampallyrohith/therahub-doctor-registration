import { Link } from "react-router-dom";
import Logo from "@/assets/images/Logo.png";
import { Button } from "@/components/ui/button";
import { IoMdLogOut } from "react-icons/io";

const Header = () => {
  return (
    <nav className="flex justify-center items-center py-5 fixed w-full z-10 bg-[#CBF6EF] drop-shadow-lg">
      <div className="flex justify-around gap-30 mx-3 md:gap-60 items-center w-full">
        <Link to="/dashboard">
          <img src={Logo} alt="app-logo" className="w-[200px]" />
        </Link>
        <Button
          type="button"
          className="text-white hidden md:block shadow-inset bg-[#FD5B1B] px-8 py-2 rounded-lg text-sm hover:bg-[#FD5B1B] cursor-pointer hover:shadow-lg"
        >
          Logout
        </Button>
        <Button
          type="button"
          className="text-white block md:hidden shadow-inset bg-[#FD5B1B] p-2 rounded-lg text-sm hover:bg-[#FD5B1B] cursor-pointer hover:shadow-lg"
        >
          <IoMdLogOut />
        </Button>
      </div>
    </nav>
  );
};

export default Header;
