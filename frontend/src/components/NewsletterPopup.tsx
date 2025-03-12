"use client"
import React, { useState, useEffect } from 'react';
import { axios } from "@pipedream/platform"

import {
    Button,
  } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {Label} from "@/components/ui/label"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

export default function NewsletterPopup() {
    const [visible, setVisibility] = useState(false);
    const [subscribed, setSubscription] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    useEffect(() => {
        const initialDelay = setTimeout(() => {
          setVisibility(true);
          const intervalId = setInterval(() => {
            setVisibility(true);
          }, 300000);
    
          return () => {
            clearInterval(intervalId);
          };
        }, 5000);
    
        return () => clearTimeout(initialDelay);
      }, [subscribed]);

      const addEmail = async () => {
        const apiUrl = "http://localhost:1337/subscribe"; // Point to your backend
    
        const subscriberData = { 
            email, 
            name, 
        };
    
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
            return data;
        } catch (error) {
            console.error("Error adding subscriber:", error);
        }
    };

      return (
        <div className = "popup">
            <Sheet open = {visible} modal = {false}>
              <SheetContent className = "top-[58%] [&>button]:hidden min-w-full"> 
                <SheetHeader>
                  <Newspaper/>
                  <SheetTitle>Subscribe!</SheetTitle>
                  <SheetDescription>
                    Subscribe to receive regular updates about the Exonian straight to your email!
                  </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" onChange = {(e) => setName(e.target.value)} />
                    {/* is this fine????*/}
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" className="col-span-3" onChange = {(e) => setEmail(e.target.value)} />
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild> 
                    <Button type="submit" onClick = {addEmail}>Submit</Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
        </div>
      )
}