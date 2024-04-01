import React, { ReactNode } from "react";
import { Outfit } from "next/font/google";
import { ReduxProvider } from "@/redux/provider";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "@/components/Themes/ThemeProvider";
const outfit = Outfit({ subsets: ["latin"] });

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
    <html lang="en">
      <body className={outfit.className}>
        <ReduxProvider>
          <Toaster />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
      {/* <html lang="en">
        <body className={outfit.className}>{children}</body>
      </html> */}
    </>
  );
};

export default layout;
