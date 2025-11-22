"use client";

import { MessageCircle, Phone, X } from "lucide-react";
import { useState } from "react";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 left-4 z-50 flex flex-col items-start">
      {/* Floating Buttons */}
      <div
        className={`flex flex-col items-start transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
      >
        {/* Messenger */}
        <a
          href="https://m.me/legacylungi"
          target="_blank"
          className="w-12 h-12 mb-2 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <FaFacebookMessenger className="text-white" />
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/01742801735"
          target="_blank"
          className="w-12 h-12 mb-2 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
        >
          <FaWhatsapp className="text-white" />
        </a>

        {/* Call */}
        <a
          href="tel:01742801735"
          className="w-12 h-12 mb-2 bg-green-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <Phone className="text-white" />
        </a>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center shadow-xl"
      >
        {open ? (
          <X className="text-white" size={28} />
        ) : (
          <MessageCircle className="text-white" size={28} />
        )}
      </button>
    </div>
  );
}
