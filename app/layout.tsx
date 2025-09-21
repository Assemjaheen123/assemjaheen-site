export const metadata = {
  title: "Assem Jaheen — Asset Management",
  description: "assemjaheen.com"
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
