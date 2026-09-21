import "../styles.css";
import SiteShell from "../components/SiteShell";

export const metadata = {
  title: {
    default: "주엽 기록실.log",
    template: "%s | 주엽 기록실.log",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
