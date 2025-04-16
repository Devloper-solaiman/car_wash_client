"use client";

import { Link } from "@nextui-org/react";
import { Mail, MapPin, Facebook, Linkedin, Twitter, Music } from "lucide-react";

export default function ContactHeader() {
  return (
    <div className="w-full border-b border-default-100">
      <div className="max-w-7xl mx-auto px-2 md:px-6">
        <div className="flex items-center justify-between h-12 text-sm text-default-600">
          {/* Contact Information */}
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <Link
                href="mailto:info@carwash.com"
                className="text-default-500 hover:text-default-900 hidden md:inline"
              >
                info@webmail.com
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span className="hidden md:inline">15/A, Nest Tower, NYC</span>
              <span className="md:hidden">NYC</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="#"
              className="text-default-500 hover:text-default-900 transition-colors hidden md:inline-flex"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="text-default-500 hover:text-default-900 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="text-default-500 hover:text-default-900 transition-colors hidden md:inline-flex"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </Link>
            <Link
              href="#"
              className="text-default-500 hover:text-default-900 transition-colors"
              aria-label="TikTok"
            >
              <Music className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
