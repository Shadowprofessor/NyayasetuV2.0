'use client';

import React from 'react';
import { X, Delete } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export interface HindiKeyboardProps {
  isOpen: boolean;
  onKeyPress: (char: string) => void;
  onBackspace: () => void;
  onClose: () => void;
}

// ─── Keyboard Layout ──────────────────────────────────────────────────────────
const ROWS: string[][] = [
  // Row 1 — Vowels
  ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'],
  // Row 2 — Consonants Part 1
  ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ', 'ट', 'ठ'],
  // Row 3 — Consonants Part 2
  ['ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न', 'प', 'फ', 'ब', 'भ', 'म'],
  // Row 4 — Remaining + Matras
  ['य', 'र', 'ल', 'व', 'श', 'ष', 'स', 'ह', 'ा', 'ि', 'ी', 'ु', 'ू'],
  // Row 5 — More Matras + Punctuation
  ['े', 'ै', 'ो', 'ौ', 'ं', 'ः', 'ँ', '्', 'ज़', 'ड़', 'ढ़', '।', ' '],
];

// ─── Key button ───────────────────────────────────────────────────────────────
function Key({
  label,
  onClick,
  wide = false,
}: {
  label: string;
  onClick: () => void;
  wide?: boolean;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        // Prevent the textarea/input from losing focus on mousedown
        e.preventDefault();
        onClick();
      }}
      className={`
        ${wide ? 'px-4' : 'min-w-[2.5rem] px-2'}
        h-10 rounded-md border border-gray-200 bg-white text-gray-800
        text-sm font-devanagari hover:bg-indigo-50 hover:border-indigo-300
        active:scale-95 active:bg-indigo-100 transition-all select-none
        focus:outline-none
      `}
      aria-label={label === ' ' ? 'Space' : label}
    >
      {label === ' ' ? <span className="text-xs text-gray-400">space</span> : label}
    </button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function HindiKeyboard({
  isOpen,
  onKeyPress,
  onBackspace,
  onClose,
}: HindiKeyboardProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50
        bg-gray-50 border-t border-gray-200 shadow-2xl
        animate-slideUp
      "
      role="dialog"
      aria-label={t('keyboard.title', { defaultValue: 'Hindi Keyboard' })}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100">
        <span className="text-xs font-semibold text-indigo-700 tracking-wide">
          {t('keyboard.title', { defaultValue: '🇮🇳 हिन्दी कीबोर्ड'})}
        </span>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); onClose(); }}
          className="p-1.5 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label={t('keyboard.close', { defaultValue: 'Close keyboard' })}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Keys */}
      <div className="px-3 py-3 space-y-2 max-w-3xl mx-auto">
        {ROWS.map((row, rowIdx) => (
          <div key={rowIdx} className="flex flex-wrap gap-1 justify-center">
            {row.map((char) => (
              <Key
                key={char}
                label={char}
                onClick={() => onKeyPress(char)}
                wide={char === ' '}
              />
            ))}
          </div>
        ))}

        {/* Backspace row */}
        <div className="flex justify-end pt-1">
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); onBackspace(); }}
            className="flex items-center gap-1.5 px-4 h-10 rounded-md
              border border-red-200 bg-red-50 text-red-600 text-sm
              hover:bg-red-100 hover:border-red-300 active:scale-95
              transition-all select-none focus:outline-none"
            aria-label={t('keyboard.backspace', { defaultValue: 'Backspace' })}
          >
            <Delete className="w-4 h-4" />
            <span className="text-xs">{t('keyboard.backspace', { defaultValue: 'Backspace' })}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
