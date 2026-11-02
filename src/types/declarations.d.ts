declare module "lucide-react" {
  import * as React from "react";

  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }

  export type LucideIcon = React.ForwardRefExoticComponent<
    LucideProps & React.RefAttributes<SVGSVGElement>
  >;

  export const ArrowRight: LucideIcon;
  export const ArrowRightLeft: LucideIcon;
  export const Calculator: LucideIcon;
  export const Check: LucideIcon;
  export const CheckCircle: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const DollarSign: LucideIcon;
  export const ExternalLink: LucideIcon;
  export const FileText: LucideIcon;
  export const HelpCircle: LucideIcon;
  export const HeartHandshake: LucideIcon;
  export const Info: LucideIcon;
  export const Layers: LucideIcon;
  export const Lock: LucideIcon;
  export const Mail: LucideIcon;
  export const Menu: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Percent: LucideIcon;
  export const PiggyBank: LucideIcon;
  export const PieChart: LucideIcon;
  export const Printer: LucideIcon;
  export const Send: LucideIcon;
  export const Shield: LucideIcon;
  export const ShieldAlert: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Table: LucideIcon;
  export const TrendingDown: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const X: LucideIcon;
  export const Award: LucideIcon;
  export const Code: LucideIcon;
  export const Cpu: LucideIcon;
  export const Calendar: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const ChevronUp: LucideIcon;
  export const Copy: LucideIcon;
  export const CreditCard: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const AlertTriangle: LucideIcon;
  export const BookOpen: LucideIcon;
  export const Download: LucideIcon;
  export const Save: LucideIcon;
  export const RotateCcw: LucideIcon;

  const icons: Record<string, LucideIcon>;
  export default icons;
}
