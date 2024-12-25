import { MdMenu } from "react-icons/md";
import logo from "/assets/logo.svg";
import { useParams } from "react-router-dom";

const Navbar = () => {
  const { id } = useParams();

  return (
    <nav
      className={`flex mt-4 xl:hidden sticky top-0 left-0 right-0 bg-[#16191C] ${id ? "hidden" : ""}  items-center justify-between px-4`}
    >
      <img src={logo} alt="logo" />
      <MdMenu size={24} color="#ffffff" />
    </nav>
  );
};

export default Navbar;
