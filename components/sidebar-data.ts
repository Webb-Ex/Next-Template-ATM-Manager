import { Boxes, Shield, Banknote, Calculator, PenIcon as UserPen, FolderKanban, Network, Wallet, Globe, SquareUser, Landmark, SmartphoneNfc, SquareTerminal, Receipt, MonitorIcon as MonitorCog } from 'lucide-react'

export const userData = {
  name: "Iris Admin",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
  role: "Administrator"
}

export const teamItems = [
  {
    name: "Insights",
    logo: Boxes,
    plan: "Enterprise",
  },
  {
    name: "Master Portal",
    logo: Shield,
    plan: "Startup",
  },
  {
    name: "Payments",
    logo: Banknote,
    plan: "Free",
  },
  {
    name: "Merchant and POS",
    logo: Calculator,
    plan: "Free",
  },
  {
    name: "ATM Manager",
    logo: SquareTerminal,
    plan: "Free",
  },
  {
    name: "Personalization",
    logo: UserPen,
    plan: "Free",
  },
  {
    name: "Product Manager",
    logo: FolderKanban,
    plan: "Free",
  },
  {
    name: "Distribution Network",
    logo: Network,
    plan: "Free",
  },
  {
    name: "Wallet Management",
    logo: Wallet,
    plan: "Free",
  },
  {
    name: "Remittance",
    logo: Globe,
    plan: "Free",
  },
  {
    name: "Customer Management",
    logo: SquareUser,
    plan: "Free",
  },
  {
    name: "Digital Banking",
    logo: Landmark,
    plan: "Free",
  },
  {
    name: "Payment Gateway",
    logo: SmartphoneNfc,
    plan: "Free",
  },
]

export const navMainItems = [
  {
    title: "ATMs",
    url: "#",
    icon: SquareTerminal,
    isActive: true,
    items: [
      {
        title: "Profiles",
        url: "#",
      },
      {
        title: "Schedule Downtime",
        url: "#",
      },
      {
        title: "Message",
        url: "#",
      },
      {
        title: "Templates",
        url: "#",
      },
    ],
  },
  {
    title: "ATM Receipts",
    url: "#",
    icon: Receipt,
    items: [
      {
        title: "Item1",
        url: "#",
      },
      {
        title: "Item2",
        url: "#",
      },
      {
        title: "Item3",
        url: "#",
      },
    ],
  },
  {
    title: "Configuration Groups",
    url: "#",
    icon: MonitorCog,
    items: [
      {
        title: "Configuration Profile",
        url: "#",
      },
      {
        title: "TM Bank",
        url: "#",
      },
    ],
  },
]
