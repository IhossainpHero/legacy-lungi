import { Phone } from "lucide-react";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
        {/* Logo + Text */}
        <div>
          <img
            src="/images/logo.jpg"
            alt="logo"
            className="w-20 rounded-2xl mb-2"
          />
          <p className="text-xs leading-snug">
            Legacy Lungi – আমাদের বিশ্বাসযোগ্য নাম হচ্ছে ঐতিহ্য। ট্রেডিশনাল
            পোশাক এর জন্য বাংলাদেশের সবচেয়ে বিশ্বাসযোগ্য ব্র্যান্ড। পাইকারি বা
            খুচরা পণ্য ক্রয় করতে এখনই Legacy Lungi ব্র্যান্ডের সাথে যোগাযোগ
            করুন।
          </p>

          {/* Social Buttons */}
          <div className="flex items-center gap-2 mt-3">
            <a
              href="https://m.me/legacylungi"
              target="_blank"
              className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
            >
              <FaFacebookMessenger className="text-white text-lg" />
            </a>
            <a
              href="https://wa.me/01742801735"
              target="_blank"
              className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
            >
              <FaWhatsapp className="text-white text-lg" />
            </a>
            <a
              href="tel:01742801735"
              className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center shadow-md hover:scale-105 transition"
            >
              <Phone className="text-white text-lg" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="about" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="contact" className="hover:text-white">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Store Location
              </a>
            </li>
            <li>
              <a href="shippingPolicy" className="hover:text-white">
                Shipping Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Privacy Page */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Privacy Page</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white">
                Order Tracking
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
          <p className="text-sm leading-snug">
            Address: Eastern Housing, Rupnagar 2nd phase, J block, Road no:2,
            House no:10
            <br />
            Contact: 01742801735
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t pt-4 mt-4">
        <div className="text-center text-xs text-gray-400">
          Copyright © 2025{" "}
          <span className="font-semibold text-white">Legacy Lungi</span> -
          Developed by{" "}
          <a
            href="https://imran-hossain-portfolio.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-pink-400 hover:via-yellow-300 hover:to-blue-400 transition-colors duration-500"
          >
            Imran
          </a>
        </div>
      </div>
    </footer>
  );
}
