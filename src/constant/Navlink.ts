// import type { NavLink } from "../interface/interface";
export const navLinks= [
  {
    name: "Dashboard",
    path: "SimpleDashboard",
    icon: "home",
    children: [],
    visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER']
  },
  {
    name: "KYC",
    path: "#",
    icon: "shield",
    visible: ['APP_USER', 'API_USER', "PAYOUT_API_USER", 'PAYOUT_APP_USER'],
    children: [
      { name: "Submit KYC", path: "/kyc/submit", icon: "upload", visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER'], },
    ],
  },
  {
    name: "Pay‑In",
    path: "#",
    icon: "arrow-down",
    visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER'],
    children: [
      { name: "New", path: "/payin/new", icon: "plus-circle", visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER'] },
      { name: "Pending", path: "/payin/pending", icon: "clock", visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER'], },
      { name: "Completed", path: "/payin/completed", icon: "check-circle", visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER'], },
      { name: "Rejected", path: "/payin/rejected", icon: "x-circle", visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER'], },
    ],
    
  },
  {
    name: "Payout",
    path: "#",
    icon: "arrow-up",
    visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER'],
    children: [
      { name: "Initiate", path: "/payout/new", icon: "send", visible: ['APP_USER', 'PAYOUT_APP_USER', 'PAYOUT_API_USER',], },
      { name: "Bulk Payout", path: "/payout/bulk", icon: "upload-cloud", visible: ['APP_USER', 'PAYOUT_APP_USER'], },
      { name: "Pending", path: "/payout/pending", icon: "clock", visible: ['APP_USER', 'API_USER', 'PAYOUT_APP_USER'], },
      { name: "Completed", path: "/payout/completed", icon: "check-circle", visible: ['APP_USER', 'API_USER', 'PAYOUT_APP_USER', 'PAYOUT_API_USER'], },
      { name: "Rejected", path: "/payout/rejected", icon: "x-circle", visible: ['APP_USER', 'API_USER', 'PAYOUT_APP_USER', 'PAYOUT_API_USER'], },
    ],
  },
  {
    name: "Report",
    path: "#",
    icon: "bar-chart-2",
    visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER'],
    children: [
      { name: "Report", path: "/report", icon: "file-text", visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER'], },
      { name: "Tickets Raised", path: "/support/ticket", icon: "tag", visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER'], },
    ]
  },
  {
    name: "My Transactions",
    path: "/transaction",
    icon: "file-text",
    visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER', 'PAYOUT_APP_USER']
  },
  {
    name: "My Account",
    path: "#",
    icon: "user",
    visible: ['APP_USER', 'API_USER', 'PAYOUT_API_USER','PAYOUT_APP_USER'],
    children: [
      { name: "Profile", path: "/profile", icon: "user", visible: ['APP_USER', 'API_USER', 'PAYOUT_APP_USER', 'PAYOUT_API_USER'], },
      { name: "Change Password", path: "/change-password", icon: "lock", visible: ['APP_USER', 'API_USER', 'PAYOUT_APP_USER', 'PAYOUT_API_USER'], },
      { name: "Change MPIN", path: "/change-mpin", icon: "key", visible: ['APP_USER', 'API_USER', 'PAYOUT_APP_USER', 'PAYOUT_API_USER'] },
    ],
  },
 {
  name: "Authentication",
  path: "#",
  icon: "lock", // lock_person -> lock
  visible: ['API_USER', 'PAYOUT_API_USER'],
  children: [
    { 
      name: "Client", 
      path: "ClientScreen", 
      icon: "user", // identity_platform -> user
      visible: ['API_USER', 'PAYOUT_API_USER'] 
    },
    {
      name: "Payin Webhooks",
      path: "PayinScreen",
      icon: "arrow-down-circle", // arrow_downward
      visible: ['API_USER', 'PAYOUT_API_USER']
    },
    {
      name: "Payout Webhooks",
      path: "PayoutScreen",
      icon: "arrow-up-circle", // arrow_upward
      visible: ['API_USER', 'PAYOUT_API_USER']
    }
  ],
},
{
  name: "Developer Guide",
  visible: ['API_USER', 'PAYOUT_API_USER'],
  path: "#",
  icon: "code", // developer_guide -> code
  children: [
    { 
      name: "Deposit", 
      path: "DepositScreen", 
      icon: "dollar-sign", // savings
      visible: ['API_USER'] 
    },
    { 
      name: "Withdraw", 
      path: "WithdrawScreen", 
      icon: "credit-card", 
      visible: ['API_USER', 'PAYOUT_API_USER'] 
    },
    { 
      name: "Bank", 
      path: "BankScreen", 
      icon: "home", // no direct bank icon in feather
      visible: ['API_USER', 'PAYOUT_API_USER'] 
    },
    {
      name: "Payin Webhook",
      path: "PayinDocsScreen",
      icon: "arrow-down-circle",
      visible: ["API_USER"]
    },
    {
      name: "Payout Webhook",
      path: "PayoutDocsScreen",
      icon: "arrow-up-circle",
      visible: ["API_USER", "PAYOUT_API_USER"]
    }
  ],
}
];
