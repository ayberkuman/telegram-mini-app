import {
  type ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface CheckboxContextProps {
  id: string;
  isChecked: boolean;
  setIsChecked: (isChecked: boolean) => void;
  onChange?: (checked: boolean) => void;
  pendingDelete?: boolean;
  setPendingDelete?: (pending: boolean) => void;
}

const CheckboxContext = createContext<CheckboxContextProps>({
  id: "",
  isChecked: false,
  setIsChecked: () => {},
});

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 },
};

const boxVariants = {
  hover: { scale: 1.05, strokeWidth: 60 },
  pressed: { scale: 0.95, strokeWidth: 35 },
  checked: { stroke: "#2563eb" },
  unchecked: { stroke: "#ddd", strokeWidth: 50 },
};

interface CheckboxProps {
  children: ReactNode;
  id: string;
  onChange?: (checked: boolean) => void;
}

function Checkbox({ children, id, onChange }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [pendingDelete, setPendingDelete] = useState(false);
  const handleSetIsChecked = (checked: boolean) => {
    setIsChecked(checked);
    if (onChange && checked) {
      setPendingDelete(true);
    } else if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className="flex items-center gap-2 max-w-1/2">
      <CheckboxContext.Provider
        value={{
          id,
          isChecked,
          setIsChecked: handleSetIsChecked,
          onChange,
          pendingDelete,
          setPendingDelete,
        }}
      >
        {children}
      </CheckboxContext.Provider>
    </div>
  );
}

function CheckboxIndicator({ onClick }: { onClick?: React.MouseEventHandler }) {
  const {
    id,
    isChecked,
    setIsChecked,
    onChange,
    pendingDelete,
    setPendingDelete,
  } = useContext(CheckboxContext);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  // Fallback: if animation doesn't complete, call onChange after 500ms
  useEffect(() => {
    if (pendingDelete && isChecked && onChange) {
      const timeout = setTimeout(() => {
        onChange(true);
        if (setPendingDelete) setPendingDelete(false);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [pendingDelete, isChecked, onChange, setPendingDelete]);

  return (
    <button
      className="relative flex items-center z-50"
      tabIndex={-1}
      onClick={onClick}
    >
      <input
        type="checkbox"
        className="peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-blue-gray-200 checked:border-blue-500"
        onChange={() => setIsChecked(!isChecked)}
        id={id}
        checked={isChecked}
        readOnly
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <motion.svg
          initial={false}
          animate={isChecked ? "checked" : "unchecked"}
          whileHover="hover"
          whileTap="pressed"
          width="24"
          height="24"
          viewBox="0 0 440 440"
        >
          <motion.path
            d="M 72 136 C 72 100.654 100.654 72 136 72 L 304 72 C 339.346 72 368 100.654 368 136 L 368 304 C 368 339.346 339.346 368 304 368 L 136 368 C 100.654 368 72 339.346 72 304 Z"
            fill="transparent"
            strokeWidth="50"
            stroke="#2563eb"
            variants={boxVariants}
          />
          <motion.path
            d="M 0 128.666 L 128.658 257.373 L 341.808 0"
            transform="translate(54.917 88.332) rotate(-4 170.904 128.687)"
            fill="transparent"
            strokeWidth="65"
            stroke="hsl(0, 0%, 100%)"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={tickVariants}
            style={{ pathLength, opacity }}
            custom={isChecked}
            onAnimationComplete={() => {
              if (pendingDelete && onChange) {
                onChange(true);
                if (setPendingDelete) setPendingDelete(false);
              }
            }}
          />
          <motion.path
            d="M 0 128.666 L 128.658 257.373 L 341.808 0"
            transform="translate(54.917 68.947) rotate(-4 170.904 128.687)"
            fill="transparent"
            strokeWidth="65"
            stroke="#2563eb"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={tickVariants}
            style={{ pathLength, opacity }}
            custom={isChecked}
          />
        </motion.svg>
      </div>
    </button>
  );
}

// Attach Indicator and Label as static properties
Checkbox.Indicator = CheckboxIndicator;

interface CheckboxLabelProps {
  children: ReactNode;
  onClick?: React.MouseEventHandler;
}

function CheckboxLabel({ children, onClick }: CheckboxLabelProps) {
  const { id, isChecked } = useContext(CheckboxContext);

  return (
    <motion.label
      className="relative ml-2 overflow-hidden text-sm line-through"
      htmlFor={id}
      animate={{
        x: isChecked ? [0, -4, 0] : [0, 4, 0],
        color: isChecked
          ? "#a1a1aa dark:text-white"
          : "#27272a dark:text-white",
        textDecorationLine: isChecked ? "line-through" : "none",
      }}
      initial={false}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      onClick={onClick}
    >
      {children}
    </motion.label>
  );
}

// Attach Label as static property
Checkbox.Label = CheckboxLabel;

const ExportedCheckbox = Object.assign(Checkbox, {
  Indicator: CheckboxIndicator,
  Label: CheckboxLabel,
});

export default ExportedCheckbox;
