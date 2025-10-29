"use client";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function DropdownFilter({
  title,
  options,
  activeValue,
  onSelect,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full sm:w-1/2" ref={dropdownRef}>
      <label className="text-xs font-semibold text-gray-500 mb-1 block">
        {title}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-700 hover:border-blue-500 transition"
      >
        <span>{activeValue.label}</span>
        <ChevronDown
          className={`h-4 w-4 ml-2 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 text-gray-700"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
