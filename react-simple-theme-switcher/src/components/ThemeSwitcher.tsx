import { useState } from "react";
import type { Theme, ThemeSwitcherProps } from "./ThemeSwitcher.types";

export function ThemeSwitcher({
  defaultTheme = "light",
  onThemeChange,
}: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  const onToggleTheme = () => {
    const updateTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(updateTheme);
    onThemeChange?.(updateTheme);
  };

  console.log("theme: ", theme);

  return (
    <div className="Switch">
      <input
        id="switch-toggle-btn"
        className="SwitchToggle"
        type="checkbox"
        checked={theme === "dark"}
        onChange={onToggleTheme}
      />
      <label htmlFor="switch-toggle-btn">
        <span className="material-icons-outlined">light_mode</span>
        <span className="material-icons-outlined">dark_mode</span>
      </label>
    </div>
  );
}
