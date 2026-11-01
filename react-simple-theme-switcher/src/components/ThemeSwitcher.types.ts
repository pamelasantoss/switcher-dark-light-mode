export type Theme = "light" | "dark";

export interface ThemeSwitcherProps {
  defaultTheme?: Theme;
  onThemeChange?: (theme: Theme) => void;
  className?: string;
}
