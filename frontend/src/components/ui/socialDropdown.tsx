"use client";

import { useState } from "react";
import {
	FacebookShareButton,
	TwitterShareButton,
	LinkedinShareButton,
	WhatsappShareButton,
	RedditShareButton,
	EmailShareButton,
} from "react-share";
import {
	FaFacebook,
	FaTwitter,
	FaLinkedin,
	FaWhatsapp,
	FaReddit,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoShareSocialOutline, IoMail } from "react-icons/io5";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

interface SocialShareDropdownProps {
	title: string;
}

export default function SocialShareDropdown({
	title,
}: SocialShareDropdownProps) {
	const [isOpen, setIsOpen] = useState(false);

	const socialPlatforms = [
		{ name: "Facebook", Button: FacebookShareButton, Icon: FaFacebook },
		{ name: "Twitter", Button: TwitterShareButton, Icon: FaTwitter },
		{ name: "LinkedIn", Button: LinkedinShareButton, Icon: FaLinkedin },
		{ name: "WhatsApp", Button: WhatsappShareButton, Icon: FaWhatsapp },
		{ name: "Reddit", Button: RedditShareButton, Icon: FaReddit },
		{ name: "Email", Button: EmailShareButton, Icon: IoMail },
	];

  const pathname = usePathname();

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger className="focus:!ring-red-300/75 focus:!ring-1" asChild>
				<Button
					variant="link"
					className="justify-between text-red-700 p-0"
				>
					<IoShareSocialOutline className="text-xl" />
					Share
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="p-2 text-red-700">
				{socialPlatforms.map(({ name, Button: ShareButton, Icon }) => (
					<DropdownMenuItem
						key={name}
						onSelect={() => setIsOpen(false)}
					>
						<ShareButton url={window.location.origin + pathname} title={title} className="w-full">
							<div className="flex items-center">
								<Icon className="h-4 w-4" />
								<span className="ml-2 text-xs">{name}</span>
							</div>
						</ShareButton>
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
