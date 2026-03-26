'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, Delete } from 'lucide-react';

interface IndicKeyboardProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  defaultLang?: string;
}

type KeyboardLayout = string[][];

const LAYOUTS: Record<string, KeyboardLayout> = {
  hi: [
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'ं', 'ः'],
    ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ'],
    ['ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न'],
    ['प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श'],
    ['ष', 'स', 'ह', 'क्ष', 'त्र', 'ज्ञ', 'ा', 'ि', 'ी', 'ु'],
    ['ू', 'े', 'ै', 'ो', 'ौ', '्', '१', '२', '३', '४', '५'],
    ['६', '७', '८', '९', '०', '।', '.', ',', '?']
  ],
  bn: [
    ['অ', 'আ', 'ই', 'ঈ', 'উ', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ', 'ং', 'ঃ'],
    ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ'],
    ['ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন'],
    ['প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'র', 'ল', 'ব', 'শ'],
    ['ষ', 'স', 'হ', 'ক্ষ', 'ত্র', 'জ্ঞ', 'া', 'ি', 'ী', 'ু'],
    ['ূ', 'ে', 'ৈ', 'ো', 'ৌ', '্', '১', '২', '৩', '৪', '৫'],
    ['৬', '৭', '৮', '৯', '০', '।', '.', ',', '?']
  ],
  ta: [
    ['அ', 'ஆ', 'இ', 'ஈ', 'உ', 'ஊ', 'எ', 'ஏ', 'ஐ', 'ஒ', 'ஓ', 'ஔ'],
    ['க', 'ங', 'ச', 'ஞ', 'ட', 'ண', 'த', 'ந', 'ப', 'ம'],
    ['ய', 'ர', 'ல', 'வ', 'ழ', 'ள', 'ற', 'ன', 'ஜ', 'ஷ'],
    ['ஸ', 'ஹ', 'ா', 'ி', 'ீ', 'ு', 'ூ', 'ெ', 'ே', 'ை'],
    ['ொ', 'ோ', 'ௌ', '்', '௧', '௨', '௩', '௪', '௫'],
    ['௬', '௭', '௮', '௯', '௰', '.', ',', '?']
  ],
  te: [
    ['అ', 'ఆ', 'ఇ', 'ఈ', 'ఉ', 'ఊ', 'ఋ', 'ఎ', 'ఏ', 'ఐ', 'ఒ', 'ఓ', 'ఔ', 'ం', 'ః'],
    ['క', 'ఖ', 'గ', 'ఘ', 'ఙ', 'చ', 'ఛ', 'జ', 'ఝ', 'ఞ'],
    ['ట', 'ఠ', 'డ', 'ఢ', 'ణ', 'త', 'థ', 'ద', 'ధ', 'న'],
    ['ప', 'ఫ', 'బ', 'భ', 'మ', 'య', 'ర', 'ల', 'వ', 'శ'],
    ['ష', 'స', 'హ', 'క్ష', 'త్ర', 'జ్ఞ', 'ా', 'ి', 'ీ', 'ు'],
    ['ూ', 'ె', 'ే', 'ై', 'ొ', 'ో', 'ౌ', '్', '౧', '౨', '౩', '౪', '౫'],
    ['౬', '౭', '౮', '౯', '౦', '.', ',', '?']
  ],
  mr: [
    ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'ॲ', 'ऑ'],
    ['क', 'ख', 'ग', 'घ', 'ङ', 'च', 'छ', 'ज', 'झ', 'ञ'],
    ['ट', 'ठ', 'ड', 'ढ', 'ण', 'त', 'थ', 'द', 'ध', 'न'],
    ['प', 'फ', 'ब', 'भ', 'म', 'य', 'र', 'ल', 'व', 'श'],
    ['ष', 'स', 'ह', 'ळ', 'क्ष', 'ज्ञ', 'ा', 'ि', 'ी', 'ु', 'ू'],
    ['े', 'ै', 'ो', 'ौ', 'ॅ', 'ॉ', 'ं', 'ः', '्', 'ऱ', '।'],
    ['१', '२', '३', '४', '५', '६', '७', '८', '९', '०', '.', ',', '?']
  ],
  gu: [
    ['અ', 'આ', 'ઇ', 'ઈ', 'ઉ', 'ઊ', 'ઋ', 'એ', 'ઐ', 'ઓ', 'ઔ', 'ં', 'ઃ'],
    ['ક', 'ખ', 'ગ', 'ઘ', 'ઙ', 'ચ', 'છ', 'જ', 'ઝ', 'ઞ'],
    ['ટ', 'ઠ', 'ડ', 'ઢ', 'ણ', 'ત', 'થ', 'દ', 'ધ', 'ન'],
    ['પ', 'ફ', 'બ', 'ભ', 'મ', 'ય', 'ર', 'લ', 'વ', 'શ'],
    ['ષ', 'સ', 'હ', 'ળ', 'ક્ષ', 'જ્ઞ', 'ા', 'િ', 'ી', 'ુ'],
    ['ૂ', 'ે', 'ૈ', 'ો', 'ૌ', '્', '૧', '૨', '૩', '૪', '૫'],
    ['૬', '૭', '૮', '૯', '૦', '.', ',', '?']
  ],
  kn: [
    ['ಅ', 'ಆ', 'ಇ', 'ಈ', 'ಉ', 'ಊ', 'ಋ', 'ಎ', 'ಏ', 'ಐ', 'ಒ', 'ಓ', 'ಔ', 'ಂ', 'ಃ'],
    ['ಕ', 'ಖ', 'ಗ', 'ಘ', 'ಙ', 'ಚ', 'ಛ', 'ಜ', 'ಝ', 'ಞ'],
    ['ಟ', 'ಠ', 'ಡ', 'ಢ', 'ಣ', 'ತ', 'ಥ', 'ದ', 'ಧ', 'ನ'],
    ['ಪ', 'ಫ', 'ಬ', 'ಭ', 'ಮ', 'ಯ', 'ರ', 'ಲ', 'ವ', 'ಶ'],
    ['ಷ', 'ಸ', 'ಹ', 'ಳ', 'ಕ್ಷ', 'ಜ್ಞ', 'ಾ', 'ಿ', 'ೀ', 'ು'],
    ['ೂ', 'ೆ', 'ೇ', 'ೈ', 'ೊ', 'ೋ', 'ೌ', '್', '೧', '೨', '೩', '೪', '೫'],
    ['೬', '೭', '೮', '೯', '೦', '.', ',', '?']
  ],
  ml: [
    ['അ', 'ആ', 'ഇ', 'ഈ', 'ഉ', 'ഊ', 'ഋ', 'എ', 'ഏ', 'ഐ', 'ഒ', 'ഓ', 'ഔ', 'ം', 'ഃ'],
    ['ക', 'ഖ', 'ഗ', 'ഘ', 'ങ', 'ച', 'ഛ', 'ജ', 'ഝ', 'ഞ'],
    ['ട', 'ഠ', 'ഡ', 'ഢ', 'ണ', 'ത', 'ഥ', 'ദ', 'ധ', 'ന'],
    ['പ', 'ഫ', 'ബ', 'ഭ', 'മ', 'യ', 'ര', 'ല', 'വ', 'ശ'],
    ['ഷ', 'സ', 'ഹ', 'ള', 'ഴ', 'റ', 'ാ', 'ി', 'ീ', 'ു'],
    ['ൂ', 'െ', 'േ', 'ൈ', 'ൊ', 'ോ', 'ൌ', '്', '൧', '൨', '൩', '൪', '൫'],
    ['൬', '൭', '൮', '൯', '൦', '.', ',', '?']
  ],
  pa: [
    ['ਅ', 'ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ', 'ਂ', 'ਃ', 'ੰ'],
    ['ਕ', 'ਖ', 'ਗ', 'ਘ', 'ਙ', 'ਚ', 'ਛ', 'ਜ', 'ਝ', 'ਞ'],
    ['ਟ', 'ਠ', 'ਡ', 'ਢ', 'ਣ', 'ਤ', 'ਥ', 'ਦ', 'ਧ', 'ਨ'],
    ['ਪ', 'ਫ', 'ਬ', 'ਭ', 'ਮ', 'ਯ', 'ਰ', 'ਲ', 'ਵ', 'ਸ਼'],
    ['ਸ', 'ਹ', 'ਲ਼', 'ਖ਼', 'ਗ਼', 'ਜ਼', 'ੜ', 'ਫ਼', 'ਾ', 'ਿ', 'ੀ', 'ੁ'],
    ['ੂ', 'ੇ', 'ੈ', 'ੋ', 'ੌ', '੍', '੧', '੨', '੩', '੪', '੫'],
    ['੬', '੭', '੮', '੯', '੦', '।', '.', ',', '?']
  ]
};

const LANGUAGES = [
  { code: 'hi', key: 'keyboard.lang_hi', name: 'Hindi' },
  { code: 'bn', key: 'keyboard.lang_bn', name: 'Bengali' },
  { code: 'te', key: 'keyboard.lang_te', name: 'Telugu' },
  { code: 'mr', key: 'keyboard.lang_mr', name: 'Marathi' },
  { code: 'ta', key: 'keyboard.lang_ta', name: 'Tamil' },
  { code: 'gu', key: 'keyboard.lang_gu', name: 'Gujarati' },
  { code: 'kn', key: 'keyboard.lang_kn', name: 'Kannada' },
  { code: 'ml', key: 'keyboard.lang_ml', name: 'Malayalam' },
  { code: 'pa', key: 'keyboard.lang_pa', name: 'Punjabi' }
];

export function IndicKeyboard({ 
  isOpen, 
  onClose, 
  onKeyPress, 
  onBackspace,
  defaultLang = 'hi'
}: IndicKeyboardProps) {
  const { t } = useTranslation();
  const [activeLang, setActiveLang] = useState(defaultLang);

  if (!isOpen) return null;

  const currentLayout = LAYOUTS[activeLang] || LAYOUTS.hi;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.1)] border-t border-gray-200 z-50 transform transition-transform duration-300 ease-out animate-slide-up">
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setActiveLang(lang.code)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeLang === lang.code
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t(lang.key, lang.name)}
              </button>
            ))}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 ml-2"
            aria-label={t('keyboard.close', 'Close keyboard')}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2">
          {currentLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center gap-1.5 sm:gap-2">
              {row.map((key, keyIndex) => (
                <button
                  key={`${rowIndex}-${keyIndex}`}
                  onClick={() => onKeyPress(key)}
                  className="min-w-[2.5rem] sm:min-w-[3rem] h-10 sm:h-12 bg-gray-50 hover:bg-indigo-50 
                           text-gray-800 hover:text-indigo-600 font-medium text-lg sm:text-xl rounded-lg
                           border border-gray-200 shadow-sm transition-all active:scale-95 flex items-center justify-center
                           px-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  {key}
                </button>
              ))}
              {/* Add backspace to the last row */}
              {rowIndex === currentLayout.length - 1 && (
                <button
                  onClick={onBackspace}
                  className="min-w-[3.5rem] sm:min-w-[4rem] h-10 sm:h-12 bg-gray-100 hover:bg-gray-200 
                           text-gray-700 rounded-lg border border-gray-300 shadow-sm transition-all 
                           active:scale-95 flex items-center justify-center px-2
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  aria-label={t('keyboard.backspace', 'Backspace')}
                >
                  <Delete className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              )}
            </div>
          ))}
          {/* Spacebar Row */}
          <div className="flex justify-center gap-2 mt-4 pt-2 border-t border-gray-100">
            <button
              onClick={() => onKeyPress(' ')}
              className="w-full max-w-sm h-12 bg-gray-50 hover:bg-indigo-50 
                       text-gray-800 font-medium rounded-lg
                       border border-gray-200 shadow-sm transition-all active:scale-95 flex items-center justify-center
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {t('keyboard.space', { defaultValue: 'Space' })}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
