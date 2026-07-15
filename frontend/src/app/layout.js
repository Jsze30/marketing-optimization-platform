import "./global.css";

export const metadata = {
  title: "Uplift",
  description: "Marketing optimization dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
