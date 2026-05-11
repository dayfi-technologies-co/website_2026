import React from "react";
import { Link } from "react-router-dom";

const SecurityPage: React.FC = () => (
  <div className="min-h-screen bg-zap-bg p-8 text-zap-ink">
    <Link to="/" className="font-body text-sm text-zap-brand hover:text-zap-brand-hover">
      ← Home
    </Link>
    <h1 className="font-display mt-6 text-2xl font-semibold">Security</h1>
    <p className="font-body mt-2 text-zap-ink-muted">Content coming soon.</p>
  </div>
);

export default SecurityPage;
