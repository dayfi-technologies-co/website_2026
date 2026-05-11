import React from "react";
import { LegalDocsLayout } from "@/components/legal/LegalDocsLayout";
import {
  LavenderLegalHero,
  LavenderSectionCards,
} from "@/components/legal/lavenderLegalUi";
import type { LavenderLegalSection } from "@/components/legal/lavenderLegalUi";

const securitySections: LavenderLegalSection[] = [
  {
    title: "1. Security at DayFi",
    content: [
      "DayFi is a financial platform. That means security is not an afterthought—it is designed into the architecture of how we handle accounts, move money, and process payment events. Whether you are collecting NGN through a Flutterwave virtual account, settling to a stablecoin wallet, or using tap-to-pay on a compatible device, your data and funds should be protected at every step.",
      "This page describes our approach to security for the platform as it stands today. As we add features, partners, and payment rails, we will update our practices and this description accordingly.",
    ],
  },
  {
    title: "2. Account security and authentication",
    content: [
      "We authenticate API requests and app sessions using industry-standard mechanisms, including signed session tokens and secure credential storage appropriate to our stack. Sensitive credentials are never stored in plaintext.",
      "You are responsible for safeguarding your account password, the unlock security of any device you use with DayFi, and any API keys or integration secrets we issue to you. Do not share these with anyone—DayFi staff will never ask for your password.",
      "We may implement additional account protections as features mature, including step-up verification for high-value or sensitive actions such as large withdrawals or changes to payout bank accounts. We will communicate these controls through in-app guidance.",
      "If you suspect that your account has been accessed without your authorization, contact support@dayfi.co immediately. We will work with you to secure your account, investigate the incident, and—where applicable—coordinate with Flutterwave or other partners to protect any in-flight funds.",
    ],
  },
  {
    title: "3. Data in transit",
    content: [
      "All network connections between the DayFi mobile app, our web properties, and our backend services are encrypted using TLS (Transport Layer Security). We enforce a minimum TLS version and reject unencrypted or downgraded connections.",
      "API endpoints used for payment orchestration, webhook delivery, and account management are accessible only over HTTPS. We apply certificate pinning in the mobile application where appropriate to prevent man-in-the-middle attacks on the device.",
      "Webhook payloads sent to merchant integrations are signed so you can verify they originated from DayFi and have not been tampered with in transit.",
    ],
  },
  {
    title: "4. Data at rest",
    content: [
      "Sensitive values stored in our databases—including certain credentials, API keys, and optional encrypted BVN data where the operating environment supports it—are protected using modern cryptographic practices. Encryption keys are managed separately from the data they protect and are rotated on a defined schedule.",
      "We apply the principle of least privilege to database and infrastructure access: team members and automated systems are granted only the access they need for their specific role, and all privileged access is logged.",
      "Backups of customer data are encrypted and stored with access controls consistent with the primary data store.",
    ],
  },
  {
    title: "5. Payments integrity and partner security",
    content: [
      "Inbound NGN virtual-account credits and outbound bank payouts are coordinated with Flutterwave using transaction references, webhook signatures, and reconciliation checks. This allows us to match inbound funds to the correct merchant intent and detect discrepancies before they affect your balance.",
      "Flutterwave is a licensed financial institution and payment processor operating under the oversight of the Central Bank of Nigeria (CBN). They maintain their own extensive security and compliance program, including PCI-DSS certification and AML controls. Our integration with Flutterwave is designed to leverage those controls rather than bypass them.",
      "Stablecoin payment paths rely on the security properties of the underlying blockchain network—including consensus mechanisms and public auditability—combined with our own monitoring to confirm on-chain events and credit the correct merchant intent. Public blockchain data is visible to anyone with network access; this is a property of the technology, not a vulnerability in our implementation.",
    ],
  },
  {
    title: "6. Device-based payment security (tap-to-pay, NFC, gift cards)",
    content: [
      "Tap-to-pay and NFC-based checkout flows use device radios and, where available, the hardware secure element on your device to process payment credentials. The security of these flows depends on the device hardware, operating system version, and the permissions granted during setup.",
      "To protect tap-based payment capabilities, you should: keep your device operating system and DayFi app updated; enable device lock (PIN, biometrics, or passphrase); and only authorize tap-to-pay features on devices you own and control.",
      "Gift-card and other checkout modules may be in staged rollout or marked coming soon in some builds. Follow in-app labels to understand what is active versus in preview, and avoid treating preview features as production-ready for high-value transactions until we announce general availability.",
    ],
  },
  {
    title: "7. Fraud prevention and monitoring",
    content: [
      "We monitor account activity and transaction patterns for indicators of fraud, account takeover, structuring, or policy violations. Our monitoring systems are designed to act quickly on detected anomalies—for example by placing a temporary hold on suspicious transactions—while minimizing impact on legitimate merchant activity.",
      "We review significant anomalies manually where needed and maintain an escalation path to Flutterwave and relevant authorities where the law requires us to act.",
      "Merchants can help by keeping their contact information current (so we can reach you quickly if we need to verify activity), reviewing their transaction history regularly, and reporting any unfamiliar transactions to support@dayfi.co promptly.",
    ],
  },
  {
    title: "8. Reporting a security vulnerability",
    content: [
      "We welcome responsible disclosure of security vulnerabilities in DayFi's platform, APIs, or mobile app. If you believe you have identified a security issue, please contact us at support@dayfi.co with:",
      "• A clear description of the vulnerability and its potential impact.",
      "• Reproduction steps or a proof-of-concept (without exploiting the issue against real user data or production systems).",
      "• Your contact information so we can follow up.",
      "Please do not disclose the vulnerability publicly until we have had a reasonable opportunity to investigate and address it—typically 90 days from acknowledgment. We take all credible reports seriously and will work to resolve confirmed issues promptly. We do not currently offer a paid bug bounty, but we may recognize researchers who follow this process responsibly.",
    ],
  },
  {
    title: "9. Infrastructure and operational security",
    content: [
      "DayFi's infrastructure is hosted on cloud providers that maintain SOC 2, ISO 27001, and other security certifications relevant to financial services. We configure our cloud environment with private networking, restricted egress, and separation between production, staging, and development environments.",
      "We conduct security reviews for significant product changes, dependency updates, and third-party integrations. Code changes are reviewed by team members before deployment, and sensitive configuration is managed through secrets management tooling—not hardcoded in source.",
      "We maintain incident response procedures so that if a security event occurs, we can contain it quickly, notify affected parties as required by law, and learn from it to improve our defenses.",
    ],
  },
];

const SecurityPage: React.FC = () => (
  <LegalDocsLayout
    customHeader={
      <LavenderLegalHero
        title="Security"
        tagline="How we protect accounts, payment data, and device-based checkout across the DayFi platform."
        effectiveDateLine="Effective date: 11 May 2026"
      />
    }
    shellClassName="bg-[#F3F6F3]"
  >
    <LavenderSectionCards sections={securitySections} />
  </LegalDocsLayout>
);

export default SecurityPage;