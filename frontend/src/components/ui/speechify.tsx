"use client";

import React, { useRef, useState, useEffect } from "react";
import { MdOutlineSpatialAudioOff } from "react-icons/md";

// The MIME type of the audio stream
const AUDIO_MIME_TYPE = "audio/mpeg";

// Function to get the audio stream from the Speechify AI API
function getAudioStream(
	speechifyAuthToken: string,
	inputText: string
): Promise<Response> {
	// You can ignore this line, unless you know that you want
	// to use a different Speechify API host
	const speechifyHost = "https://api.sws.speechify.com";

	// Use the access token that you obtained from the /api/token route
	if (!speechifyAuthToken) {
		console.error("Unauthorized");
		throw new Error("No authorization token provided");
	}

	// Request the audio stream _directly_ from the Speechify AI API.
	return fetch(`${speechifyHost}/v1/audio/stream`, {
		method: "POST",
		headers: {
			// The Authorization header should contain the access token
			Authorization: `Bearer ${speechifyAuthToken}`,
			// The payload is JSON
			"Content-Type": "application/json",
			// The expected MIME type of the audio stream
			Accept: AUDIO_MIME_TYPE,
		},
		body: JSON.stringify({
			input: inputText,
			voice_id: "cliff",
		}),
	});
}

async function playAudioStream(
	sourceBuffer: SourceBuffer,
	audioPlayer: HTMLAudioElement,
	speechifyAuthToken: string,
	inputText: string
): Promise<void> {
	// Fetch the audio stream from the Speechify AI API
	const audioStreamRes = await getAudioStream(speechifyAuthToken, inputText);

	if (!audioStreamRes.ok) {
		console.error("Network response was not ok");
		return;
	}

	if (!audioStreamRes.body) {
		console.error("Response body is null");
		return;
	}

	// Read the audio stream as a ReadableStream
	const reader = audioStreamRes.body.getReader();
	let isFirstChunk = true;

	while (true) {
		const { done, value } = await reader.read();

		if (done) {
			break;
		}

		// Append the audio stream chunk to the source buffer
		sourceBuffer.appendBuffer(value);

		// Start playing the audio stream when the first chunk is received
		if (isFirstChunk) {
			isFirstChunk = false;
			audioPlayer.play();
		}

		// Wait for the source buffer to finish updating before appending the next chunk
		await new Promise<void>((resolve) => {
			sourceBuffer.onupdateend = () => resolve();
		});
	}
}

async function runTextToSpeech(
	mediaSource: MediaSource,
	sourceBuffer: SourceBuffer,
	audioPlayer: HTMLAudioElement,
	speechifyAuthToken: string,
	inputText: string
): Promise<void> {
	if (!inputText) {
		return;
	}

	const play = () => {
		playAudioStream(
			sourceBuffer,
			audioPlayer,
			speechifyAuthToken,
			inputText
		);
	};

	// Ensure the media source is open before playing the audio stream
	if (mediaSource.readyState === "open") {
		play();
	} else {
		mediaSource.addEventListener("sourceopen", play);
	}
}

interface SpeechifyProps {
	inputText: string;
}

export function Speechify({ inputText }: SpeechifyProps) {
	const [showAudio, setShowAudio] = useState<boolean>(false);

	// Reference to the <audio> HTML element
	const audioRef = useRef<HTMLAudioElement>(null);

	// The MediaSource interface of the Media Source Extensions API
	const mediaSourceRef = useRef<MediaSource | null>(
		typeof MediaSource !== "undefined" ? new MediaSource() : null
	);

	// The source buffer to append the audio stream chunks
	const sourceBufferRef = useRef<SourceBuffer | null>(null);

	useEffect(() => {
		// Bind the audio player to the media source
		if (audioRef.current && mediaSourceRef.current) {
			audioRef.current.src = URL.createObjectURL(mediaSourceRef.current);
		}
	}, []);

	const handleConvert = () => {
		// Create a new source buffer if it doesn't exist.
		// Set the MIME type of the source buffer to the audio MIME type.
		if (!sourceBufferRef.current && mediaSourceRef.current) {
			try {
				sourceBufferRef.current =
					mediaSourceRef.current.addSourceBuffer(AUDIO_MIME_TYPE);
			} catch (error) {
				console.warn(
					"Error adding source buffer, it likely already exists:",
					error
				);
			}
		}

		if (
			!inputText ||
			!sourceBufferRef.current ||
			!audioRef.current ||
			!mediaSourceRef.current
		) {
			return;
		}

		// Toggle the display of the audio player
		setShowAudio(true);

		const authToken = process.env.SPEECHIFY_API_KEY || "";

		runTextToSpeech(
			mediaSourceRef.current,
			sourceBufferRef.current,
			audioRef.current,
			authToken,
			inputText
		);
	};

	return (
		<div className={`flex items-center gap-2 hover:cursor-pointer text-red-700 ${showAudio ? "text-red-900" : " "}`} onClick={handleConvert}>
			<MdOutlineSpatialAudioOff className="text-xl"/>
			Listen, powered by Speechify
			<audio
				ref={audioRef}
				controls
				// className={`mt-6 w-full${showAudio ? "" : " hidden"}`}
				className="hidden"
			/>
		</div>
	);
}
