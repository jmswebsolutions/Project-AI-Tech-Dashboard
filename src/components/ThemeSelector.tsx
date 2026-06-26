import { useState, useEffect, useRef } from 'react';
import { Palette, Check, X, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import type { ThemeMode } from '../constants/themes';
import './ThemeSelector.css';

export function ThemeSelector() {
  const { themeId, mode, effectiveMode, setTheme, setMode, presets } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleModeChange = (newMode: ThemeMode) => {
    setMode(newMode);
  };

  const handlePresetClick = (presetId: string) => {
    setTheme(presetId);
  };

  return (
    <div className="theme-selector" ref={dropdownRef}>
      <button
        className="theme-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open theme selector"
      >
        <Palette size={18} />
        <span className="theme-selector-label">Theme</span>
      </button>

      {isOpen && (
        <div className="theme-selector-dropdown">
          <div className="theme-selector-header">
            <h3>Theme</h3>
            <button
              className="theme-selector-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close theme selector"
            >
              <X size={16} />
            </button>
          </div>

          <div className="theme-selector-content">
            <div className="theme-section">
              <h4>Mode</h4>
              <div className="mode-toggle-group">
                <button
                  className={`mode-toggle ${mode === 'dark' ? 'active' : ''}`}
                  onClick={() => handleModeChange('dark')}
                  title="Dark mode"
                >
                  <Moon size={16} />
                  <span>Dark</span>
                </button>
                <button
                  className={`mode-toggle ${mode === 'light' ? 'active' : ''}`}
                  onClick={() => handleModeChange('light')}
                  title="Light mode"
                >
                  <Sun size={16} />
                  <span>Light</span>
                </button>
                <button
                  className={`mode-toggle ${mode === 'system' ? 'active' : ''}`}
                  onClick={() => handleModeChange('system')}
                  title="System preference"
                >
                  <Monitor size={16} />
                  <span>System</span>
                </button>
              </div>
              {mode === 'system' && (
                <div className="system-indicator">
                  Currently: {effectiveMode === 'dark' ? 'Dark' : 'Light'}
                </div>
              )}
            </div>

            <div className="theme-section">
              <h4>Color Theme</h4>
              <div className="theme-grid">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    className={`theme-preset ${themeId === preset.id ? 'active' : ''}`}
                    onClick={() => handlePresetClick(preset.id)}
                    title={preset.description}
                  >
                    <div className="theme-preview-dual">
                      <div
                        className="theme-preview-half dark"
                        style={{
                          background: preset.darkColors.bg,
                          borderColor: preset.darkColors.line,
                        }}
                      >
                        <div
                          className="theme-preview-accent"
                          style={{ background: preset.darkColors.accent }}
                        />
                      </div>
                      <div
                        className="theme-preview-half light"
                        style={{
                          background: preset.lightColors.bg,
                          borderColor: preset.lightColors.line,
                        }}
                      >
                        <div
                          className="theme-preview-accent"
                          style={{ background: preset.lightColors.accent }}
                        />
                      </div>
                    </div>
                    <span className="theme-name">{preset.name}</span>
                    {themeId === preset.id && (
                      <Check size={14} className="theme-check" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
