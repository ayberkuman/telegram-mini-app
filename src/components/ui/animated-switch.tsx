import clsx from "clsx";
import { motion } from "framer-motion";
export const Switch = ({
  id,
  checked,
  setChecked,
}: {
  id: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) => {
  return (
    <form className="flex space-x-4  antialiased items-center">
      <label
        htmlFor={id}
        className={clsx(
          "h-6  flex items-center border border-transparent shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-full w-[50px] relative cursor-pointer transition duration-200",
          checked ? "bg-yellow-400" : "bg-slate-700 border-slate-500"
        )}
      >
        <motion.div
          initial={{
            width: "20px",
            x: checked ? 0 : 26,
          }}
          animate={{
            height: ["20px", "10px", "20px"],
            width: ["20px", "30px", "20px", "20px"],
            x: checked ? 26 : 0,
          }}
          transition={{
            duration: 0.3,
            delay: 0.1,
          }}
          key={String(checked)}
          className={clsx(
            "h-[20px] block rounded-full bg-white shadow-md z-10"
          )}
        ></motion.div>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          className="hidden"
          id={id}
        />
      </label>
    </form>
  );
};
