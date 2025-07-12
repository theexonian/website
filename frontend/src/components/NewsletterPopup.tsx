"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function NewsletterPopup() {
    const [visible, setVisibility] = useState(false);
    const [subscribed, setSubscription] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const alreadySubscribed = localStorage.getItem("subscribed") === "true";
        if (alreadySubscribed) {
            setSubscription(true); // update local state just in case you want to use it
            return; // don’t set timers if already subscribed
        }
        // Show after initial 5s
        const initialDelay = setTimeout(() => {
            setVisibility(true);
        }, 5000);
        // Re-show every 5 minutes if user hasn’t subscribed
        const intervalId = setInterval(() => {
            setVisibility(true);
        }, 300000);
        return () => {
            clearTimeout(initialDelay);
            clearInterval(intervalId);
        };
    }, []);
    const addEmail = async () => {
        const apiUrl = "https://server.theexonian.net/api/newsletter/subscribe";
        const subscriberData = { email, name, lists: [3] };
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subscriberData),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            console.log("Subscriber added successfully:", data);
            setVisibility(false);
            setSubscription(true);
            setError("");
            localStorage.setItem("subscribed", "true");
        } catch (err) {
            console.error("Error adding subscriber:", err);
            setError("Failed to subscribe. Please check your input and try again.");
        }
    };

    return (
        <>
            {/* Backdrop overlay with gradient */}
            {visible && (
                <div 
                    className="fixed inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/15 z-40 animate-in fade-in duration-300"
                    onClick={() => setVisibility(false)}
                />
            )}

            {/* Newsletter popup - bottom slide-up style like WaPo */}
            <div 
                className={`
                    fixed bottom-0 left-0 right-0 z-50
                    bg-white shadow-2xl
                    transform transition-transform duration-300 ease-out
                    ${visible ? 'translate-y-0' : 'translate-y-full'}
                `}
            >
                {/* Gradient shadow at top edge - only when visible */}
                {visible && (
                    <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-black/20 via-black/10 to-transparent pointer-events-none" />
                )}
                
                {/* Close button */}
                <button
                    onClick={() => setVisibility(false)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl z-10"
                >
                    ×
                </button>

                <div className="max-w-lg mx-auto p-8">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 font-serif">
                            Subscribe to The Exonian
                        </h2>
                        <p className="text-gray-600 text-sm leading-relaxed font-serif">
                            Subscribe to our online newsletter and receive regular updates from The Exonian straight to your email!
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div className="relative">
                            <Input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-serif"
                            />
                        </div>
                        
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-serif"
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm text-center font-serif">
                                {error}
                            </div>
                        )}

                        <Button
                            onClick={addEmail}
                            disabled={!name.trim() || !email.trim()}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-serif"
                        >
                            Subscribe
                        </Button>

                        <div className="text-sm text-gray-600 mb-2 font-serif text-center">
                            Click <a href="https://secure.touchnet.com/C25385_ustores/web/store_main.jsp?STOREID=2" className="text-red-500 hover:underline transition-all">here</a> for a paper subscription!
                        </div>
                    </div>
                </div>
            </div>

            {/* Development reset button */}
            {process.env.NODE_ENV === "development" && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Button
                        variant="outline"
                        onClick={() => {
                            localStorage.removeItem("subscribed");
                            setSubscription(false);
                            setVisibility(true);
                        }}
                        className="bg-white/90 backdrop-blur-sm"
                    >
                        Reset Newsletter (Dev)
                    </Button>
                </div>
            )}
        </>
    );
}
