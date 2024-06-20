import { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";
import { twMerge } from "tailwind-merge";

export function Overlay({
  show,
  setShow,
  children,
  className,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <>
      {show && (
        <>
          <div
            className="fixed left-0 right-0 top-0 bottom-0 bg-gray-800 dark:bg-gray-400 opacity-50 z-10 flex"
            onClick={() => setShow(false)}
          ></div>
          <div
            className={twMerge(
              "fixed left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] bg-base-100 z-10 shadow-lg rounded-xl flex flex-col pt-4 px-10 pb-10",
              className || ""
            )}
          >
            <IoMdClose
              size={28}
              className="absolute right-6 top-6"
              onClick={() => setShow(false)}
            />
            {children}
          </div>
        </>
      )}
    </>
  );
}

export default Overlay;
