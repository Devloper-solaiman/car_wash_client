import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@nextui-org/react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleThemeChange = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Button
      radius="full"
      isIconOnly
      size="md"
      variant="ghost"
      onClick={handleThemeChange}
      className={`${theme === "light" ? "text-warning" : "text-default-500"}`}
    >
      {theme === "light" ? <Sun size={20} /> : <Moon size={20} />}
    </Button>
  );
}
