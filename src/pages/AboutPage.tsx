import React from "react";
import { LegalDocsLayout } from "@/components/legal/LegalDocsLayout";
import {
  LavenderLegalHero,
  LavenderSectionCards,
} from "@/components/legal/lavenderLegalUi";
import type { LavenderLegalSection } from "@/components/legal/lavenderLegalUi";

const aboutSections: LavenderLegalSection[] = [
  {
    title: "1. Who we are",
    content: [
      "DayFi Technologies Inc. (DayFi) is a financial technology company building modern point-of-sale and money-movement tools for merchants who need fast checkout, transparent payment status, and practical access to NGN and digital settlement options.",
      "We were founded on the belief that merchants in Nigeria—and in cross-border contexts where Nigeria plays a role—deserve infrastructure that is honest about how money moves, clear about fees and timing, and built on regulated rails rather than workarounds. We are not a bank. We are a technology layer that connects you to licensed infrastructure that is.",
      "Our team has experience across payments, fintech product design, and regulated financial services. We build with compliance as a constraint from day one, not as an afterthought applied at the end.",
    ],
  },
  {
    title: "2. What DayFi does",
    content: [
      "DayFi is a merchant operating platform. That means it is designed around the workflows of people running a business—not just a payment gateway bolted onto a spreadsheet.",
      "At its core, DayFi gives merchants:",
      "• A catalog and item management system to define what they sell, including prices, variants, taxes, and discounts.",
      "• A checkout and cart flow that handles item selection, customer association, tender selection, and receipt generation in a single session.",
      "• Customer records that accumulate history across transactions, making it easier to identify repeat customers, apply loyalty flows, and maintain accurate business records.",
      "• A sales and reporting view that surfaces revenue trends, payment method mix, and transaction-level detail without needing a separate analytics tool.",
      "• A wallet and ledger that shows your incoming credits, settled balance, pending amounts, and a line-by-line history of every debit and credit on your DayFi account.",
      "• Real-time notifications for payment events, security actions, and product updates, so you are not checking a dashboard to know whether a payment landed.",
      "Payment paths available or in development include NGN bank transfer to a dedicated Flutterwave virtual account, outbound NGN bank withdrawals, stablecoin settlement (including Stellar USDC and supported EVM-network paths), gift-card checkout, cash and other recorded tender, and tap-to-pay or NFC-based device checkout on compatible hardware. Not every path is available in every market, at every verification level, or on every device. We label features clearly as live, limited access, or coming soon so you can plan accordingly.",
    ],
  },
  {
    title: "3. Our infrastructure partners",
    content: [
      "DayFi does not hold a banking license. We build on top of regulated partners who do.",
      "Flutterwave is our primary partner for NGN payment infrastructure. When you enable virtual-account features, Flutterwave issues and operates the dedicated NGN virtual account associated with your DayFi merchant profile. Inbound bank transfers are received by Flutterwave and notified to DayFi via webhook; outbound NGN bank payouts you initiate from DayFi are routed through Flutterwave's payout infrastructure. Flutterwave is a licensed financial institution regulated by the Central Bank of Nigeria (CBN) and holds licenses in multiple additional jurisdictions.",
      "For stablecoin settlement paths, we use public blockchain networks—including the Stellar network for USDC flows and supported EVM networks. On-chain transactions are public and irreversible once confirmed. We monitor for on-chain confirmations and credit your DayFi wallet accordingly.",
      "We work with additional technology and infrastructure partners for hosting, notifications, identity verification, and other services. See our Privacy Notice for categories of sub-processors and the data they may touch.",
      "Our partnership model is built around transparency: we aim to describe, in product copy and legal documents, which partner is responsible for which part of any given flow, so you know where to look if something needs resolution.",
    ],
  },
  {
    title: "4. Our approach to trust and compliance",
    content: [
      "Financial products earn trust by being clear, not by being clever. Our product copy and legal documents are written to tell you what actually happens with your money—not to create impressions that do not hold up under scrutiny.",
      "We conduct know-your-customer (KYC) and anti-money-laundering (AML) checks appropriate to the products you use and the jurisdiction you are in. For NGN virtual account features, this includes collecting and transmitting your BVN to Flutterwave as part of the onboarding process they require. We do not collect more than we need, and we handle what we do collect in line with our Privacy Notice.",
      "We are not subject to every regulation in every jurisdiction. Where we operate in a regulated space, we aim to meet applicable requirements and to work with partners who are themselves regulated. Where the regulatory framework is unclear or evolving—for example in relation to stablecoin settlement—we take a conservative posture and describe that uncertainty to you rather than asserting certainty we do not have.",
      "We reserve the right to decline onboarding, restrict features, or close accounts where we are required to by law or partner obligations, or where we have reasonable compliance or risk concerns. We will always try to communicate clearly about what is happening and why, within the limits the law allows.",
    ],
  },
  {
    title: "5. Transparency about what is live",
    content: [
      "DayFi is an active product under development. Some features described in our documentation, on our website, or in this page are in staged rollout, available only to specific account types, or marked coming soon. We label these as precisely as we can in the product interface itself.",
      "We do not believe in vaporware. Every feature we describe as coming soon is something we are actively building or integrating. But until a feature is labeled live for your account, do not depend on it for production transactions.",
      "If you are unsure whether a specific payment path, limit, or feature is active for your account, the most reliable source is the DayFi app itself, followed by our support team at support@dayfi.co.",
    ],
  },
  {
    title: "6. Geographic scope",
    content: [
      "DayFi's primary market is Nigeria. Our NGN virtual account infrastructure, outbound bank transfer paths, and regulatory relationships are designed with Nigerian merchants in mind.",
      "We also support merchants operating in cross-border contexts—for example, businesses that receive funds from customers abroad, or that want to settle in stablecoins as a bridge to USD or other currencies. These use cases are supported where our payment paths and partner capabilities allow, but they are subject to additional verification requirements and may be limited by applicable law in the merchant's or customer's jurisdiction.",
      "DayFi Technologies Inc. is incorporated in the United States (Delaware). Our operations and primary user base are in Nigeria. Our Terms of Use provide jurisdiction-specific governing law provisions for Nigerian and non-Nigerian users.",
    ],
  },
  {
    title: "7. Contact us",
    content: [
      "We are a small, focused team. The best way to reach us is:",
      "General support and account issues: support@dayfi.co",
      "Privacy and data rights inquiries: privacy@dayfi.co",
      "We do not currently have a public press kit or a formal partnership inquiry process. If you have a partnership proposal or press inquiry, email support@dayfi.co with a brief description and we will route it appropriately.",
    ],
  },
];

const AboutPage: React.FC = () => (
  <LegalDocsLayout
    customHeader={
      <LavenderLegalHero
        title="About DayFi"
        tagline="We build merchant checkout and money-movement tools on regulated NGN rails, optional stablecoin settlement, and device-based payment experiences—designed for clarity at every step."
        effectiveDateLine="Last updated: 11 May 2026"
      />
    }
  >
    <LavenderSectionCards sections={aboutSections} />
  </LegalDocsLayout>
);

export default AboutPage;