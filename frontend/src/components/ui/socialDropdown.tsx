'use client'

import { useState } from 'react'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  RedditShareButton,
} from 'react-share'
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaReddit } from 'react-icons/fa'
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SocialShareDropdownProps {
  url: string
  title: string
}

export default function SocialShareDropdown({ url, title }: SocialShareDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const socialPlatforms = [
    { name: 'Facebook', Button: FacebookShareButton, Icon: FaFacebook },
    { name: 'Twitter', Button: TwitterShareButton, Icon: FaTwitter },
    { name: 'LinkedIn', Button: LinkedinShareButton, Icon: FaLinkedin },
    { name: 'WhatsApp', Button: WhatsappShareButton, Icon: FaWhatsapp },
    { name: 'Reddit', Button: RedditShareButton, Icon: FaReddit },
  ]

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-between">
          Share
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {socialPlatforms.map(({ name, Button: ShareButton, Icon }) => (
          <DropdownMenuItem key={name} onSelect={() => setIsOpen(false)}>
            <ShareButton url={url} title={title} className="w-full">
              <div className="flex items-center">
                <Icon className="h-5 w-5" />
                <span className="ml-2">{name}</span>
              </div>
            </ShareButton>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}