"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export default function NewsletterPopup() {
    const [visible, setVisibility] = useState(false);
    const [subscribed, setSubscription] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const { isLoaded, isSignedIn } = useUser();

    useEffect(() => {
        if (!isLoaded) {
            return;
        }

        if (isSignedIn) {
            setVisibility(false);
            return;
        }

        const alreadySubscribed = localStorage.getItem("subscribed") === "true";
        if (alreadySubscribed) {
            setSubscription(true);
            return;
        }

        // // 1/10 chance (10%) to show the newsletter popup
        // const shouldShow = Math.random() < 0.1;
        // if (!shouldShow) {
        //     return; // Don't show popup for this session
        // }

        // Show after initial 5s
        const initialDelay = setTimeout(() => {
            setVisibility(true);
        }, 5000);
        // Re-show every 5 minutes if user hasn't subscribed
        const intervalId = setInterval(() => {
            setVisibility(true);
        }, 300000);
        return () => {
            clearTimeout(initialDelay);
            clearInterval(intervalId);
        };
    }, [isLoaded, isSignedIn]);

    const addEmail = async () => {
        const apiUrl = "https://server.theexonian.net/api/newsletter/subscribe";
        const subscriberData = { email, name, lists: [3] };
        
        console.log("Attempting to subscribe with data:", subscriberData);
        
        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(subscriberData),
            });
            
            console.log("Response status:", response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                
                // Handle specific error cases
                if (response.status === 500 && errorData.error === "Failed to subscribe user.") {
                    setError("This email is already subscribed to our newsletter!");
                } else {
                    setError(`Failed to subscribe: ${errorData.error || 'Unknown error'}`);
                }
                return;
            }
            
            const data = await response.json();
            console.log("Subscriber added successfully:", data);
            
            // Show success message
            setShowSuccess(true);
            setError("");
            
            // Hide popup after 3 seconds
            setTimeout(() => {
                setVisibility(false);
                setSubscription(true);
                localStorage.setItem("subscribed", "true");
            }, 3000);
        } catch (err) {
            console.error("Error adding subscriber:", err);
            setError("Failed to subscribe. Please check your internet connection and try again.");
        }
    };

    return (
        <>
            {/* Backdrop overlay with gradient */}
            {visible && (
                <div 
                    className="fixed inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/15 z-40 animate-in fade-in duration-300 print:hidden"
                    onClick={() => {
                        setVisibility(false);
                        setShowSuccess(false);
                        setError("");
                    }}
                />
            )}

            {/* Newsletter popup - bottom slide-up style like WaPo */}
            <div 
                className={`
                    fixed bottom-0 left-0 right-0 z-50
                    bg-background shadow-2xl border-t border-border
                    transform transition-transform duration-300 ease-out
                    print:hidden
                    ${visible ? 'translate-y-0' : 'translate-y-full'}
                `}
            >
                {/* Gradient shadow at top edge - only when visible */}
                {visible && (
                    <div className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-t from-black/20 via-black/10 to-transparent pointer-events-none print:hidden" />
                )}
                
                {/* Close button */}
                <button
                    onClick={() => {
                        setVisibility(false);
                        setShowSuccess(false);
                        setError("");
                    }}
                    className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl z-10"
                >
                    ×
                </button>

                <div className="max-w-lg mx-auto p-8">
                    {/* Success State */}
                    {showSuccess ? (
                        <div className="text-center">
                            <div className="mb-4">
                                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-3 font-serif">
                                Successfully Subscribed!
                            </h2>
                            <p className="text-muted-foreground text-sm leading-relaxed font-serif">
                                Thank you for subscribing to The Exonian newsletter. You'll receive updates straight to your email!
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Header */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-bold text-foreground mb-3 font-serif">
                                    Subscribe to The Exonian
                                </h2>
                                <p className="text-muted-foreground text-sm leading-relaxed font-serif">
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
                                className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-serif bg-background text-foreground"
                            />
                        </div>
                        
                        <div className="relative">
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 border border-border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-serif bg-background text-foreground"
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
                            className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-3 px-4 rounded-md transition-colors disabled:bg-muted disabled:cursor-not-allowed font-serif"
                        >
                            Subscribe
                        </Button>

                        <div className="text-sm text-muted-foreground mb-2 font-serif text-center">
                            Click <a href="https://secure.touchnet.com/C25385_ustores/web/store_main.jsp?STOREID=2" className="text-red-500 hover:underline transition-all">here</a> for a paper subscription!
                        </div>
                    </div>
                        </>
                    )}
                </div>
            </div>

            {/* Development reset button */}
            {process.env.NODE_ENV === "development" && (
                <div className="fixed bottom-4 right-4 z-50 print:hidden">
                    <Button
                        variant="outline"
                        onClick={() => {
                            localStorage.removeItem("subscribed");
                            setSubscription(false);
                            setShowSuccess(false);
                            setError("");
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
