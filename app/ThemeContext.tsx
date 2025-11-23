'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface ThemeColors {
  name: string;
  primary: string;
  primaryLight: string;
  secondary: string;
  secondaryLight: string;
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
}

export const themes: Record<string, ThemeColors> = {
  minimal: {
    name: '화이트 미니멀',
    primary: '#1a1a1a',
    primaryLight: '#333333',
    secondary: '#8b5cf6',
    secondaryLight: '#a78bfa',
    bgPrimary: '#ffffff',
    bgSecondary: '#f8f9fa',
    bgTertiary: '#f1f3f5',
    textPrimary: '#1a1a1a',
    textSecondary: '#4a4a4a',
    textMuted: '#6b7280',
  },
  v1dark: {
    name: 'v1 다크 (보라/핑크)',
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    secondary: '#8b5cf6',
    secondaryLight: '#ec4899',
    bgPrimary: '#000000',
    bgSecondary: '#0a0a0a',
    bgTertiary: '#0d0d0d',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    textMuted: '#888888',
  },
  dark: {
    name: '다크 모던',
    primary: '#8b5cf6',
    primaryLight: '#a78bfa',
    secondary: '#ec4899',
    secondaryLight: '#f472b6',
    bgPrimary: '#000000',
    bgSecondary: '#0a0a0a',
    bgTertiary: '#0d0d0d',
    textPrimary: '#ffffff',
    textSecondary: '#cccccc',
    textMuted: '#888888',
  },
  professional: {
    name: '프로페셔널',
    primary: '#1e3a5f',
    primaryLight: '#2d5a8b',
    secondary: '#d4a574',
    secondaryLight: '#e5c4a8',
    bgPrimary: '#0f172a',
    bgSecondary: '#1e293b',
    bgTertiary: '#334155',
    textPrimary: '#f8fafc',
    textSecondary: '#cbd5e1',
    textMuted: '#94a3b8',
  },
};

interface ThemeContextType {
  theme: ThemeColors;
  themeName: string;
  setTheme: (name: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: themes.v1dark,
  themeName: 'v1dark',
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeName, setThemeName] = useState<string>('v1dark');
  const [mounted, setMounted] = useState(false);

  // Load saved theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('querydaily-theme');
    if (saved && themes[saved]) {
      setThemeName(saved);
    } else {
      // Apply v1dark theme CSS variables immediately
      const theme = themes.v1dark;
      const root = document.documentElement;
      root.style.setProperty('--color-primary', theme.primary);
      root.style.setProperty('--color-primary-light', theme.primaryLight);
      root.style.setProperty('--color-secondary', theme.secondary);
      root.style.setProperty('--color-secondary-light', theme.secondaryLight);
      root.style.setProperty('--color-bg-primary', theme.bgPrimary);
      root.style.setProperty('--color-bg-secondary', theme.bgSecondary);
      root.style.setProperty('--color-bg-tertiary', theme.bgTertiary);
      root.style.setProperty('--color-text-primary', theme.textPrimary);
      root.style.setProperty('--color-text-secondary', theme.textSecondary);
      root.style.setProperty('--color-text-muted', theme.textMuted);
    }
    setMounted(true);
  }, []);

  // Apply CSS variables when theme changes
  useEffect(() => {
    if (!mounted) return;

    const theme = themes[themeName];
    const root = document.documentElement;

    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-primary-light', theme.primaryLight);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-secondary-light', theme.secondaryLight);
    root.style.setProperty('--color-bg-primary', theme.bgPrimary);
    root.style.setProperty('--color-bg-secondary', theme.bgSecondary);
    root.style.setProperty('--color-bg-tertiary', theme.bgTertiary);
    root.style.setProperty('--color-text-primary', theme.textPrimary);
    root.style.setProperty('--color-text-secondary', theme.textSecondary);
    root.style.setProperty('--color-text-muted', theme.textMuted);

    // Save to localStorage
    localStorage.setItem('querydaily-theme', themeName);
  }, [themeName, mounted]);

  const setTheme = (name: string) => {
    if (themes[name]) {
      setThemeName(name);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], themeName, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Theme Selector Component
export function ThemeSelector() {
  const { themeName, setTheme, theme: currentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const selectorStyles: React.CSSProperties = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 1001,
  };

  const toggleStyles: React.CSSProperties = {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: currentTheme.bgPrimary,
    border: '2px solid rgba(0, 0, 0, 0.1)',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
    color: currentTheme.textPrimary,
  };

  const menuStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: '60px',
    right: '0',
    background: currentTheme.bgPrimary,
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    padding: '8px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    minWidth: '180px',
  };

  const optionStyles = (isActive: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    width: '100%',
    padding: '12px',
    border: 'none',
    background: isActive ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    textAlign: 'left' as const,
  });

  const previewStyles = (themeColors: ThemeColors): React.CSSProperties => ({
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    flexShrink: 0,
    background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`,
  });

  const nameStyles: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: 500,
    color: currentTheme.textPrimary,
  };

  return (
    <div style={selectorStyles}>
      <button
        style={toggleStyles}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="테마 선택"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      </button>

      {isOpen && (
        <div style={menuStyles}>
          {Object.entries(themes).map(([key, theme]) => (
            <button
              key={key}
              style={optionStyles(themeName === key)}
              onClick={() => {
                setTheme(key);
                setIsOpen(false);
              }}
            >
              <span style={previewStyles(theme)} />
              <span style={nameStyles}>{theme.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
