import {
  BarChart3,
  Receipt,
  PieChart,
  CreditCard,
  Globe,
  Zap,
} from "lucide-react";

// Stats Data
export const statsData = [
  {
    value: "50K+",
    label: "Trusted Users",
  },
  {
    value: "$2B+",
    label: "Transactions Managed",
  },
  {
    value: "99.9%",
    label: "System Reliability",
  },
  {
    value: "4.9/5",
    label: "Customer Satisfaction",
  },
];

// Features Data
export const featuresData = [
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "AI-Driven Analytics",
    description:
      "Gain powerful insights into your financial habits with advanced AI analytics.",
  },
  {
    icon: <Receipt className="h-8 w-8 text-blue-600" />,
    title: "Smart Receipt Scanner",
    description:
      "Seamlessly scan and digitize receipts with intelligent data extraction.",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "Budget Planning",
    description: "Plan, track, and optimize budgets with personalized recommendations.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "Multi-Account Support",
    description: "Manage multiple accounts and credit cards in one place",
  },
  {
    icon: <Globe className="h-8 w-8 text-blue-600" />,
    title: "Global Currency Support",
    description: "Track and convert expenses in real time across multiple currencies.",
  },
  {
    icon: <Zap className="h-8 w-8 text-blue-600" />,
    title: "Automated Insights",
    description: "Receive automated financial alerts, forecasts, and smart recommendations.",
  },
];

// How It Works Data
export const howItWorksData = [
  {
    icon: <CreditCard className="h-8 w-8 text-blue-600" />,
    title: "1. Sign Up Securely",
    description:
      "Create your account in just a few minutes with bank-grade security.",
  },
  {
    icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
    title: "2. Connect & Track",
    description:
      "Link your accounts and let BudgetIQ automatically track and categorize spending in real-time.",
  },
  {
    icon: <PieChart className="h-8 w-8 text-blue-600" />,
    title: "3. Gain Smart Insights",
    description:
      "Access AI-driven insights, personalized recommendations, and clear financial overviews.",
  },
];

// Testimonials Data
export const testimonialsData = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    // image: "https://randomuser.me/api/portraits/women/75.jpg",
    quote:
      "BudgetIQ completely changed how I handle my business finances. The AI insights revealed cost-saving opportunities I never noticed before.",
  },
  {
    name: "Michael Chen",
    role: "Freelancer",
    // image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "The receipt scanning feature saves me hours each month. Now I can focus on my work instead of manual data entry and expense tracking.",
  },
  {
    name: "Emily Rodriguez",
    role: "Financial Advisor",
    // image: "https://randomuser.me/api/portraits/women/74.jpg",
    quote:
      "I recommend BudgetIQ to all my clients. Its multi-currency support and deep analytics are perfect for global investors.",
  },
];