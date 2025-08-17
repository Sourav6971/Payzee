import { FaPaperPlane } from "react-icons/fa";
import { IoMdSwap } from "react-icons/io";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { IoQrCode } from "react-icons/io5";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

function Input({
  value,
  onChange,
  placeholder,
  type,
  classProps,
  required = false,
}) {
  return (
    <input
      className={`${classProps} py-4 px-6 rounded bg-slate-100 placeholder:text-slate-500 placeholder:text-md`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      required={required}
    />
  );
}
function SideBar() {
  return (
    <div className="h-[500px] max-w-[80px] bg-white shadow shadow-slate-300 mx-8 my-36 rounded-xl">
      <div className="flex flex-col justify-around h-full py-6">
        <span className="flex justify-center cursor-pointer">
          <Tooltip
            title="Send"
            arrow
            placement="right"
            slots={{
              transition: Zoom,
            }}
            slotProps={{
              transition: { timeout: 100 },
            }}
          >
            <FaPaperPlane color="#0047AB" size={30} />
          </Tooltip>
        </span>
        <span className="flex justify-center cursor-pointer">
          <Tooltip
            title="Swap"
            arrow
            placement="right"
            slots={{
              transition: Zoom,
            }}
            slotProps={{
              transition: { timeout: 100 },
            }}
          >
            <IoMdSwap color="#0047AB" size={30} />
          </Tooltip>
        </span>
        <span className="flex justify-center cursor-pointer">
          <Tooltip
            title="Buy"
            arrow
            placement="right"
            slots={{
              transition: Zoom,
            }}
            slotProps={{
              transition: { timeout: 100 },
            }}
          >
            <FaCircleDollarToSlot color="#0047AB" size={30} />
          </Tooltip>
        </span>

        <span className="flex justify-center cursor-pointer">
          <Tooltip
            title="Recieve"
            arrow
            placement="right"
            slots={{
              transition: Zoom,
            }}
            slotProps={{
              transition: { timeout: 100 },
            }}
          >
            <IoQrCode color="#0047AB" size={30} />
          </Tooltip>
        </span>
      </div>
    </div>
  );
}

export { Input, SideBar };
