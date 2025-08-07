import { NextRequest, NextResponse } from 'next/server';

const AUDIO_MIME_TYPE = "audio/mpeg";

export async function POST(request: NextRequest) {
  try {
    // Get the input text from the request body
    const { input } = await request.json();

    if (!input) {
      return NextResponse.json(
        { error: 'No input text provided' },
        { status: 400 }
      );
    }

    // Get the API key from server-side environment variables
    const speechifyAuthToken = process.env.SPEECHIFY_API_KEY;

    if (!speechifyAuthToken) {
      console.error('Speechify API key not configured');
      return NextResponse.json(
        { error: 'Text-to-speech service not configured' },
        { status: 500 }
      );
    }

    // Make the request to Speechify API
    const speechifyHost = "https://api.sws.speechify.com";
    
    const response = await fetch(`${speechifyHost}/v1/audio/stream`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${speechifyAuthToken}`,
        "Content-Type": "application/json",
        Accept: AUDIO_MIME_TYPE,
      },
      body: JSON.stringify({
        input: input,
        voice_id: "cliff",
      }),
    });

    if (!response.ok) {
      console.error('Speechify API error:', response.status, response.statusText);
      
      // Handle specific error codes with user-friendly messages
      if (response.status === 402) {
        return NextResponse.json(
          { error: 'Text-to-speech service temporarily unavailable due to billing. Please try again later.' },
          { status: 503 }
        );
      } else if (response.status === 401) {
        return NextResponse.json(
          { error: 'Text-to-speech service authentication failed' },
          { status: 503 }
        );
      } else if (response.status === 429) {
        return NextResponse.json(
          { error: 'Text-to-speech service rate limit exceeded. Please try again later.' },
          { status: 429 }
        );
      }
      
      return NextResponse.json(
        { error: 'Text-to-speech service temporarily unavailable' },
        { status: 503 }
      );
    }

    // Stream the audio response back to the client
    return new NextResponse(response.body, {
      headers: {
        'Content-Type': AUDIO_MIME_TYPE,
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Speechify API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
