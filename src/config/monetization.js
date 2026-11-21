/**
 * Monetization & Affiliate Configuration for BillCraft
 * Easily customize your links, Gumroad/Razorpay checkout, and affiliate tool partners here.
 */

export const MONETIZATION_CONFIG = {
  // Pro Freelance Kit checkout link (Gumroad, LemonSqueezy, Razorpay Payment Link, Stripe, etc.)
  proKitCheckoutUrl: "https://gumroad.com/l/pro-freelance-kit",
  
  // Pro Freelance Kit pricing details
  proKitPrice: "$29",
  proKitOriginalPrice: "$79",
  proKitDiscount: "63% OFF",

  // Pro Freelance Kit Features list
  proKitFeatures: [
    "50+ Battle-Tested Freelance Contract & Proposal Templates",
    "Client Onboarding Notion Workspace & Scope Creep Playbook",
    "Cold Outreach Email Scripts with 35%+ Open Rates",
    "Value-Based Pricing Matrix & Retainer Pitch Decks",
    "Tax & Expense Tracking Spreadsheet (Global & Indian GST)",
    "Lifetime Updates & Access to Private Discord Community"
  ],

  // Curated Recommended Tools for Freelancers (affiliate ready)
  recommendedTools: [
    {
      name: "Wise for Business",
      category: "Global Payments & Banking",
      description: "Receive international client payments with real exchange rates and ultra-low fees.",
      badge: "Save 80% on FX",
      link: "https://wise.com",
      icon: "Globe"
    },
    {
      name: "Notion",
      category: "Project & CRM Workspace",
      description: "All-in-one workspace to manage client deliverables, project roadmaps, and meeting notes.",
      badge: "Free Tier",
      link: "https://notion.so",
      icon: "FileText"
    },
    {
      name: "Deel",
      category: "Contracts & Compliance",
      description: "Generate compliant international freelance agreements and shield yourself from legal liabilities.",
      badge: "Freelancer Friendly",
      link: "https://deel.com",
      icon: "ShieldCheck"
    },
    {
      name: "QuickBooks",
      category: "Accounting & Tax Filing",
      description: "Automate tax deductions, track business expenses, and stay audit-proof effortlessly.",
      badge: "Top Rated",
      link: "https://quickbooks.intuit.com",
      icon: "DollarSign"
    }
  ]
};
