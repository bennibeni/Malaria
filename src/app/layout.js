import "./globals.css";

export const metadata = {
  title: "Malaria",
  description: "A malaria prediction app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
