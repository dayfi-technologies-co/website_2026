import { wrap } from "framer-motion";
import React, { lazy } from "react";
import { Navigate, type RouteObject } from "react-router-dom";

// import DashboardLayout from "@/components/layout/DashboardLayout";
// import { TERMINAL_DEFAULT_PATH } from "@/constants/terminalNav";
// import { wrap, protect } from "@/utils/routes";

/* eslint-disable react-refresh/only-export-components */
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const TermsPage = lazy(() => import("@/pages/TermsPage"));
const PrivacyPage = lazy(() => import("@/pages/PrivacyPage"));
const SecurityPage = lazy(() => import("@/pages/SecurityPage"));
const GovernmentPage = lazy(() => import("@/pages/GovernmentPage"));

export const routes: RouteObject[] = [
  { path: "/", element: <LandingPage /> },
  { path: "/terms", element: <TermsPage /> },
  { path: "/privacy", element: <PrivacyPage /> },
  { path: "/security", element: <SecurityPage /> },
  { path: "/government", element: <GovernmentPage /> },
];
