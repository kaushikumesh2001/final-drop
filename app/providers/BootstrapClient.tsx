"use client";

import Script from "next/script";

export default function BootstrapClient() {
  return (
    <Script
      src="/bootstrap.bundle.min.js"
      strategy="afterInteractive"
    />
  );
}
