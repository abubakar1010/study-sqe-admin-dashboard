import { useLocation } from "react-router";
import placeholderImg from "../../assets/images/placeholderProfile.jpg";
import { IoMdNotificationsOutline } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
export default function Header({ title }: { title?: string }) {
  const pathname = useLocation().pathname;
  const { user } = useAuth() as any;
  return (
    <div>
      <div className="text-white space-y-3">
        <div className="flex sm:flex-row flex-col gap-5 justify-between items-center bg-[#a6797c] p-3 ">
          <div>
            {pathname === "/" ? (
              <h2 className="text-2xl font-bold">
                Welcome Back, {user?.username}
              </h2>
            ) : null}
          </div>
          <div className="flex items-center gap-5">
            <IoMdNotificationsOutline
              className="hover:-translate-y-3 translate-x-3 duration-500 cursor-pointer "
              size={30}
            />
            <div className="flex gap-2 items-center">
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={user?.avatar.length <= 0 ? placeholderImg : user?.avatar}
                alt=""
              />
              <div>
                {" "}
                <h2>{user?.username}</h2>
                <p>{user?.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3 flex justify-between items-center bg-[#a6797c] p-3">
          <p className="text-xl">{title}</p>
        </div>
      </div>
    </div>
  );
}
