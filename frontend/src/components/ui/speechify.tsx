"use client";

import React, { useRef, useState } from "react";
import { MdOutlineSpatialAudioOff } from "react-icons/md";

// Function to get the audio stream from our secure API route
function getAudioStream(inputText: string): Promise<Response> {
	return fetch('/api/speechify', {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			input: inputText,
		}),
	});
}

interface SpeechifyProps {
	inputText: string;
}

export function Speechify({ inputText }: SpeechifyProps) {
	const [showAudio, setShowAudio] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const [audioReady, setAudioReady] = useState<boolean>(false);

	// Reference to the <audio> HTML element
	const audioRef = useRef<HTMLAudioElement>(null);

	const handleConvert = async () => {
		if (!inputText) {
			setError("No text content available");
			return;
		}

		setIsLoading(true);
		setError("");
		setAudioReady(false);
		setShowAudio(true);

		try {
			// Simple and reliable approach: download complete audio as blob
			const response = await getAudioStream(inputText);
			
			if (!response.ok) {
				const errorText = await response.text().catch(() => "Unknown error");
				throw new Error(`HTTP ${response.status}: ${errorText}`);
			}
			
			const audioBlob = await response.blob();
			const audioUrl = URL.createObjectURL(audioBlob);
			
			if (audioRef.current) {
				audioRef.current.src = audioUrl;
				
				// Set up event listeners
				audioRef.current.onloadeddata = () => {
					setAudioReady(true);
					setIsLoading(false);
				};
				
				audioRef.current.onerror = (e) => {
					console.error("Audio playback error:", e);
					setError("Failed to load audio");
					setIsLoading(false);
					setShowAudio(false);
				};
				
				// Clean up the blob URL when done
				audioRef.current.onended = () => {
					URL.revokeObjectURL(audioUrl);
				};
			}
		} catch (error) {
			console.error("Audio generation error:", error);
			setError("Failed to generate audio. Please try again.");
			setIsLoading(false);
			setShowAudio(false);
		}
	};

	return (
		<div className="space-y-2">
			<div 
				className={`flex items-center gap-2 hover:cursor-pointer transition-colors duration-200 ${
					isLoading ? "text-muted-foreground" : "text-red-700 hover:text-red-900"
				} ${showAudio ? "text-red-900" : ""}`} 
				onClick={!isLoading ? handleConvert : undefined}
			>
				{/* <MdOutlineSpatialAudioOff className="text-xl"/> */}
				{/* {isLoading ? "Generating audio..." : "Listen to this article"} */}
			</div>
			
			{error && (
				<div className="text-sm text-red-500 ml-6">
					{error}
				</div>
			)}
			
			{showAudio && (
				<div className="ml-6">
					{isLoading && !audioReady && (
						<div className="text-sm text-muted-foreground">
							Loading audio...
						</div>
					)}
					<audio
						ref={audioRef}
						controls
						className={`w-full max-w-md ${audioReady ? "" : "hidden"}`}
					/>
				</div>
			)}
		</div>
	);
}
