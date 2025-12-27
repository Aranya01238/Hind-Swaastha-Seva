"use client"
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class" // This is a common and good practice for next-themes
      defaultTheme="light" // Ensures light mode is the default
      enableSystem={false} // Prevents automatic detection of system theme
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
