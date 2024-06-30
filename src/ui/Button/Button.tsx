import "./button.css";

interface IProps {
  onClick: () => void;
  children: React.ReactNode;
  type: "red" | "green" | "disabled";
  className?: string;
}

export const Button = ({ onClick, children, type, className }: IProps) => {
  return (
    <button
      className={`btn ${type} ${className}`}
      disabled={type === "disabled"}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
