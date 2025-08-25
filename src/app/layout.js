import "./globals.css";

export const metadata = {
  title: "Stock Ticker Application",
  description: "A simple stock ticker application.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
