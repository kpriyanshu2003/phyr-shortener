import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Shortener | A product of Phyr",
  description:
    "Shorten your links with ease. Share them with the world. Protect them with a password.",
  openGraph: {
    title: "Shortener | A product of Phyr",
    description:
      "Shorten your links with ease. Share them with the world. Protect them with a password.",
    type: "website",
    authors: ["Priyangsu Banerjee", "Masoom Choudhury", "Priyanshu Kumar"],
    images: [
      {
        url: "https://sh.phyr.in/open-graph.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://sh.phyr.in/open-graph.png",
        width: 1800,
        height: 1600,
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Layout>{children}</Layout>
          <Toaster
            position="bottom-right"
            containerStyle={{
              bottom: "40px",
              right: "40px",
            }}
            toastOptions={{
              style: {
                background: "#111111",
                color: "#cdcdcd",
                padding: "10px 15px",
                fontSize: "14px",
                borderRadius: "8px",
                border: "1px solid #1c1c1c",
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
