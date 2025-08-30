export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Root layout is intentionally minimal; per-locale layout handles HTML, fonts and providers
  return children as React.ReactElement;
}

