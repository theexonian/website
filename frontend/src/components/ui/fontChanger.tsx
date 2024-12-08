"use client";

import React, { useState, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { BiFontFamily } from "react-icons/bi";
import { Label } from "@/components/ui/label";
import { Inter } from "next/font/google";
import { B612_Mono } from "next/font/google";
import { Roboto_Mono } from "next/font/google";
import { Merriweather } from "next/font/google";
import { Atkinson_Hyperlegible } from "next/font/google";
import { Lora } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const b612_mono = B612_Mono({ weight: "400", subsets: ["latin"] });
const roboto_mono = Roboto_Mono({ weight: "400", subsets: ["latin"] });
const merriweather = Merriweather({ weight: "400", subsets: ["latin"] });
const atkinson_hyperlegible = Atkinson_Hyperlegible({
	weight: "400",
	subsets: ["latin"],
});
const lora = Lora({ weight: "400", subsets: ["latin"] });

// Define font options
const FONT_OPTIONS = [
	{ name: "Default", value: "default", cssClass: "font-sans" },
	{ name: "Classic", value: "lora", cssClass: lora.className },
	{ name: "Rounded", value: "inter", cssClass: inter.className },
	{ name: "Coding", value: "roboto-mono", cssClass: roboto_mono.className },
	{
		name: "Legible Classic",
		value: "merriweather",
		cssClass: merriweather.className,
	},
	{
		name: "Legible Rounded",
		value: "atkinson-hyperlegible",
		cssClass: atkinson_hyperlegible.className,
	},
	{
		name: "Legible Coding",
		value: "b612",
		cssClass: b612_mono.className,
	},
];

const ArticleParagraphFontChanger = () => {
	const [selectedFont, setSelectedFont] = useState("default");

	// Effect to apply font class to paragraph tags within articles
	useEffect(() => {
		const articleParagraphs = document.querySelectorAll("article p");

		// Remove previous font classes from all article paragraphs
		articleParagraphs.forEach((p) => {
			p.classList.remove(...FONT_OPTIONS.map((font) => font.cssClass));
		});

		// Find the selected font
		const currentFont = FONT_OPTIONS.find(
			(font) => font.value === selectedFont
		);

		// Add new font class to all article paragraphs
		if (currentFont) {
			articleParagraphs.forEach((p) => {
				p.classList.add(currentFont.cssClass);
			});
		}
	}, [selectedFont]);

	return (
		<>
			<Select value={selectedFont} onValueChange={setSelectedFont}>
				<SelectTrigger id="paragraph-font-select" className="flex items-center gap-2 text-red-700 border-none p-0 group font-medium focus:ring-red-300/75 focus:ring-1">
					<BiFontFamily className="text-xl" /> <div className="underline-offset-4 group-hover:underline">Font</div>
				</SelectTrigger>
				<SelectContent>
					{FONT_OPTIONS.map((font) => (
						<SelectItem key={font.value} value={font.value} className="py-1 text-red-700">
							<span className={font.cssClass + " text-xs"}>{font.name}</span>
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</>
	);
};

export default ArticleParagraphFontChanger;
