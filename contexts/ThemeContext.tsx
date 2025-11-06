import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type CursorStyle = 'system' | 'custom';
type AccentColor = 'cyan' | 'blue' | 'pink' | 'orange';

interface UIContextType {
  theme: Theme;
  toggleTheme: () => void;
  cursorStyle: CursorStyle;
  setCursorStyle: (style: CursorStyle) => void;
  accentColor: AccentColor;
  setAccentColor: (color: AccentColor) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark'); // Default theme is dark
  const [cursorStyle, setCursorStyle] = useState<CursorStyle>('system');
  const [accentColor, setAccentColor] = useState<AccentColor>('cyan');

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('dark');
    if (theme === 'dark') {
      root.classList.add('dark');
    }
    
    root.dataset.accent = accentColor;

  }, [theme, accentColor]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <UIContext.Provider value={{ theme, toggleTheme, cursorStyle, setCursorStyle, accentColor, setAccentColor }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
