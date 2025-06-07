"use client";
import React, { useState, useEffect } from "react";
import { Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
        const apiUrl = "http://localhost:1337/api/newsletter/subscribe";
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
        <div className="popup">
            <Sheet open={visible} onOpenChange={setVisibility} modal={false}>
                <SheetContent side = "bottom" className="!w-screen rounded-none p-6 shadow-xl bg-gradient-to-t from-white via-white/90 to-transparent max-h-50 sm:max-h-70 lg:max-h-82">
                    <SheetHeader>
                        <Newspaper />
                        <SheetTitle>Subscribe!</SheetTitle>
                        <SheetDescription>
                            Subscribe to receive regular updates about the Exonian straight to your email!
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                className="col-span-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                className="col-span-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4 min-h-[2px]">
                            {error && (
                                <span className="col-span-4 text-red-500 text-sm text-center">
                                    {error}
                                </span>
                            )}
                        </div>
                    </div>
                    <SheetFooter>
                        <Button type="submit" onClick={addEmail}>
                            Submit
                        </Button>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
            {/* Optional dev button to clear the subscription (for testing) */}
            {process.env.NODE_ENV === "development" && (
                <div className="fixed bottom-4 right-4 z-50">
                    <Button
                        variant="outline"
                        onClick={() => {
                            localStorage.removeItem("subscribed");
                            setSubscription(false);
                            setVisibility(true);
                        }}
                    >
                        Reset Subscription (Dev)
                    </Button>
                </div>
            )}
        </div>
    );
}
