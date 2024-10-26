import { useEffect, useRef, useState } from "react";
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";

const Layout = ({ pages }) => {
  const sidebarRef = useRef(null);
  const [isOpen, setisOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const doctorEmail = Cookies.get("digniteAdminEmail");
    const doctorName = Cookies.get("digniteAdminName");
    setEmail(doctorEmail);
    setName(doctorName);
  }, []);

  const toggleModal = () => {
    setisOpen(!isOpen);
  };

  return (
    <div className="w-screen h-screen flex justify-start items-start">
      <div
        onClick={toggleModal}
        className={`w-screen h-screen fixed top-0 left-0 transition-all duration-500  ${
          isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
        } lg:static  z-[2000] lg:z-auto px-3 lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 lg:h-full `}
      >
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 transition-all duration-200  ${
            isOpen ? " lg:translate-x-0" : "-translate-x-full lg:translate-x-0"
          } lg:static w-[60%] z-[2000] lg:z-auto lg:w-60 xl:w-72 flex flex-col gap-3 items-center justify-start py-0 h-full bg-white`}
        >
          <Sidebar />
        </div>
      </div>

      <div className="w-full relative lg:w-[calc(100%-15rem)] xl:w-[calc(100%-18rem)] h-full  overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 left-0 w-full h-16 bg-white border-b flex items-center justify-between lg:justify-end px-4 z-20">
          <button
            onClick={() => setisOpen((prev) => !prev)}
            className="lg:hidden block"
          >
            <HiOutlineMenuAlt2 className="text-2xl" />
          </button>
          <div className="flex gap-3 items-center  py-4 font-normal text-gray-900">
            <div className="relative bg-[#c00000]/[0.05] rounded-full h-10 w-10">
              <img
                className="h-full w-full rounded-full object-cover object-center"
                src={
                  "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
                }
                alt="user-profile"
              />
            </div>
            <div className="text-sm flex flex-col justify-start items-start">
              <div className="font-semibold text-gray-700 leading-tight">
                {name}
              </div>
              <div className="text-gray-400">{email}</div>
            </div>
          </div>
        </div>
        <div className="w-full bg-gray-100 p-6">{pages}</div>
      </div>
    </div>
  );
};

export default Layout;
