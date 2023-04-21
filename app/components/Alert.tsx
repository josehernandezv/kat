import clsx from "clsx";
import {
  HiOutlineXCircle,
  HiOutlineXMark,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineExclamationTriangle,
} from "react-icons/hi2";

interface AlertProps {
  type?: "success" | "error" | "warning" | "info" | "default";
  message: string;
  className?: string;
  onClose?: () => void;
}

function getIcon(type: AlertProps["type"]) {
  switch (type) {
    case "success":
      return <HiOutlineCheckCircle size={24} />;
    case "error":
      return <HiOutlineXCircle size={24} />;
    case "warning":
      return <HiOutlineExclamationTriangle size={24} />;
    case "info":
      return <HiOutlineExclamationCircle size={24} />;
    default:
      return null;
  }
}

export default function Alert({
  type = "default",
  message,
  className = "",
  onClose,
}: AlertProps) {
  return (
    <div
      className={clsx("alert shadow-lg", className, {
        "alert-success": type === "success",
        "alert-error": type === "error",
        "alert-warning": type === "warning",
        "alert-info": type === "info",
      })}
      role="alert"
    >
      <div>
        {getIcon(type)}
        <span>{message}</span>
      </div>
      {onClose && (
        <div className="flex-none">
          <button className="btn-ghost btn-sm btn-circle btn" onClick={onClose}>
            <HiOutlineXMark size={24} />
          </button>
        </div>
      )}
    </div>
  );
}
