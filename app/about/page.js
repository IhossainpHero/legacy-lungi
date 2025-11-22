import Link from "next/link";

export default function AboutUs() {
  return (
    <main className="container mx-auto px-4 py-12" role="main">
      <div className="text-center mb-4">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>{" "}
        / <span className="font-semibold text-gray-700">About Us</span>
      </div>
      <section className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* About Us */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
        <p className="text-gray-700 mb-4">
          Welcome to <strong>Legacy</strong>!<br />
          We are dedicated to producing and delivering premium quality{" "}
          <strong>lungis</strong> that combine tradition with comfort. Our
          mission is to provide our customers with authentic, durable, and
          affordable products while preserving the heritage of Bangladeshi
          craftsmanship.
        </p>
        <p className="text-gray-700 mb-6">
          At <strong>Legacy</strong>, every piece we create reflects care,
          dedication, and passion. We believe in bringing comfort and elegance
          into your daily lifestyle while keeping the rich tradition of handmade
          textiles alive.
        </p>

        {/* Why Choose Us */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          Why Choose Legacy?
        </h3>
        <ul className="list-disc list-inside mb-6 text-gray-700 space-y-1">
          <li>High-quality fabrics</li>
          <li>Durable and comfortable products</li>
          <li>Affordable pricing</li>
          <li>Fast and reliable delivery</li>
          <li>100% customer satisfaction</li>
        </ul>

        {/* Our Vision */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          Our Vision
        </h3>
        <p className="text-gray-700 mb-6">
          To promote local tradition and craftsmanship, making high-quality
          lungis a part of every household in Bangladesh and beyond.
        </p>

        {/* Contact Us */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-3">
          Contact Us
        </h3>
        <p className="text-gray-700 space-y-1">
          📞 Phone: <strong>01742801735</strong> <br />
          📧 Email:{" "}
          <strong>
            <a
              href="mailto:shilpomoylungi@gmail.com"
              className="text-blue-600 hover:underline"
            >
              legacylungi@gmail.com
            </a>
          </strong>{" "}
          <br />
          📍 Address:{" "}
          <strong>
            Eastern Housing , Rupnagar 2nd phase , J block , Road no:2 , House
            no:10
          </strong>
        </p>
      </section>
    </main>
  );
}
