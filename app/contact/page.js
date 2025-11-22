export default function ContactPage() {
  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <div className="md:flex">
          {/* Left side: Contact form */}
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-extrabold mb-6 text-black text-center md:text-left">
              Contact Us
            </h1>
            <p className="mb-6 text-black text-center md:text-left">
              Reach us via WhatsApp:{" "}
              <a
                href="https://wa.me/8801742801735"
                target="_blank"
                className="text-[#063238] font-semibold hover:underline"
              >
                01742801735
              </a>
            </p>

            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#063238] focus:border-transparent text-black placeholder-gray-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#063238] focus:border-transparent text-black placeholder-gray-500"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#063238] focus:border-transparent text-black placeholder-gray-500"
              />
              <button className="bg-[#063238] text-white p-3 rounded-xl hover:bg-[#074652] font-semibold transition-all shadow-md hover:shadow-lg">
                Send Message
              </button>
            </form>
          </div>

          {/* Right side: Map & Address */}
          <div className="md:w-1/2">
            {/* Stable Google Map Embed */}
            <iframe
              src="https://www.google.com/maps?q=Eastern+Housing,+Rupnagar+2nd+phase,+J+Block,+Road+no:2,+House+no:10&output=embed"
              width="100%"
              height="100%"
              className="h-80 md:h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="p-4 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Address
              </h2>
              <p className="text-gray-700">
                Eastern Housing, Rupnagar 2nd phase, J Block, Road no:2, House
                no:10
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
