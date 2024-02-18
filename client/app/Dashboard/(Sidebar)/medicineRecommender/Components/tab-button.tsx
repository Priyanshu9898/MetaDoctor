import { cn } from "@/lib/utils";

export interface TabButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  activeTab: string;
  isPending?: boolean;
}

export default function TabButton({
  value,
  activeTab,
  isPending,
  children,
  ...props
}: TabButtonProps) {
  return (
    <button
      className={cn(
        activeTab === value
          ? "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          : "bg-gray-100 dark:bg-gray-800",
        isPending && "opacity-50",
        "flex-grow flex-shrink h-8 rounded-lg text-sm min-w-[30%] md:min-w-[20%]"
      )}
      {...props}
    >
      {isPending ? "Loading..." : children}
    </button>
  );
}
