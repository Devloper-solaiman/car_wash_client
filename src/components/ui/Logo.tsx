import { FaCarAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to={"/"}>
      <div
        className={`flex items-center gap-3rounded-full  py-1 justify-center w-full`}
      >
        <FaCarAlt className="text-warning" size={35} />
        <h2 className="font-semibold text-warning text-sm md:text-xl hidden md:block">
          Car Wash
        </h2>
      </div>
    </Link>
  );
}
