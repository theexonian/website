"use client";

import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// Define font options
const FONT_OPTIONS = [
  { name: 'Inter', value: 'inter', cssClass: 'font-sans' },
  { name: 'Roboto Mono', value: 'roboto-mono', cssClass: 'font-mono' },
  { name: 'Merriweather', value: 'merriweather', cssClass: 'font-serif' },
  { name: 'Open Sans', value: 'open-sans', cssClass: 'font-sans' },
  { name: 'Courier New', value: 'courier', cssClass: 'font-mono' }
];

const ArticleParagraphFontChanger = () => {
  const [selectedFont, setSelectedFont] = useState('inter');

  // Effect to apply font class to paragraph tags within articles
  useEffect(() => {
    const articleParagraphs = document.querySelectorAll('article p');

    // Remove previous font classes from all article paragraphs
    articleParagraphs.forEach(p => {
      p.classList.remove(...FONT_OPTIONS.map(font => font.cssClass));
    });

    // Find the selected font
    const currentFont = FONT_OPTIONS.find(font => font.value === selectedFont);

    // Add new font class to all article paragraphs
    if (currentFont) {
      articleParagraphs.forEach(p => {
        p.classList.add(currentFont.cssClass);
      });
    }
  }, [selectedFont]);

  return (
    <div className="space-y-2">
      <Label htmlFor="paragraph-font-select" className="block">
        Change Article Paragraph Font
      </Label>
      <Select
        value={selectedFont}
        onValueChange={setSelectedFont}
      >
        <SelectTrigger id="paragraph-font-select" className="w-[180px]">
          <SelectValue placeholder="Select a paragraph font" />
        </SelectTrigger>
        <SelectContent>
          {FONT_OPTIONS.map((font) => (
            <SelectItem key={font.value} value={font.value}>
              {font.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ArticleParagraphFontChanger;