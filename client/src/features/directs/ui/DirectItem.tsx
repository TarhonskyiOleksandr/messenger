/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserAvatar } from "@/shared/ui";
import { useNavigate } from "react-router-dom";

interface IDirectProps {
  name: string;
  message: string;
  time: string;
  id: string;
}

const DirectItem: React.FC<IDirectProps> = ({ name, message, id }) => {
  const navigate = useNavigate();

  return (
    <li
      className="relative flex flex-auto w-full items-center py-3 px-5 bg-transparent hover:bg-slate-500 rounded-lg cursor-pointer"
      onClick={() => navigate(`/directs/${id}`)}
    >
      <div className="absolute">
      <UserAvatar name={name} />
      </div>
      <div className="flex flex-col justify-between pl-11 overflow-hidden">
        <p className="text-white font-medium text-lg">
          {name}
        </p>
        <p className=" text-gray-300 truncate">
          {message}
        </p>
      </div>
    </li>
  );
};

export default DirectItem;
