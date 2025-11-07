import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";
import { Search, User } from "lucide-react";
import { PiBagSimpleThin } from "react-icons/pi";

export interface NavIcon {
  Icon: LucideIcon | IconType;
  iconProps?: {
    className?: string;
    strokeWidth?: number;
  };
}

export const navIcons: NavIcon[] = [
  {
    Icon: Search,
    iconProps: {
      className: "w-6 h-6",
      strokeWidth: 1.0,
    },
  },
  {
    Icon: User,
    iconProps: {
      className: "w-6 h-6",
      strokeWidth: 1.0,
    },
  },
  {
    Icon: PiBagSimpleThin,
    iconProps: {
      className: "w-6 h-6",
      strokeWidth: 1.5,
    },
  },
];
