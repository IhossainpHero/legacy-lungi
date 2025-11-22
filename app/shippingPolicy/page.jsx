import Link from "next/link";

export default function ShippingPolicy() {
  return (
    <main
      id="main-content"
      className="w-full flex justify-center py-10 bg-gray-50"
      role="main"
    >
      <div className="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        <section className="space-y-10">
          {/* Header */}
          <div className="text-center mt-4 mb-10">
            <Link href="/" className="hover:text-blue-600">
              Home
            </Link>{" "}
            /{" "}
            <span className="font-semibold text-gray-700">Shopping Policy</span>
            <p className="text-gray-500 mt-2">
              Everything you need to know about our delivery process
            </p>
          </div>

          {/* Shop Info */}
          <div className="bg-gray-50 p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Shop Information
            </h2>
            <p>
              <strong>Shop Name:</strong> Legacy
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a href="tel:01742801735" className="text-blue-600">
                01742801735
              </a>
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:legacylungi@gmail.com" className="text-blue-600">
                legacylungi@gmail.com
              </a>
            </p>
            <p>
              <strong>Address:</strong> Gopalpur-6740,Enayetpur, Belkuchi,
              Sirajganj
            </p>
          </div>

          {/* Processing Time */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Processing Time
            </h2>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              <li>
                Orders are processed within <strong>1–2 business days</strong>{" "}
                after confirmation.
              </li>
              <li>
                Orders placed on weekends or public holidays will be processed
                on the next working day.
              </li>
            </ul>
          </div>

          {/* Delivery Info */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Shipping Methods &amp; Delivery Time
            </h2>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              <li>
                We deliver products all over Bangladesh through trusted courier
                partners.
              </li>
              <li>
                Standard delivery time is <strong>2–5 business days</strong>{" "}
                depending on your location.
              </li>
              <li>
                For remote or rural areas, delivery may take a little longer.
              </li>
            </ul>
          </div>

          {/* Charges */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Shipping Charges
            </h2>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              <li>
                A standard shipping charge will be applied based on the courier
                service.
              </li>
              <li>
                Free shipping may be offered on special promotions or bulk
                orders.
              </li>
            </ul>
          </div>

          {/* Tracking */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Order Tracking
            </h2>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              <li>
                Once your order is shipped, you will receive a confirmation
                SMS/call with tracking details.
              </li>
              <li>
                You can track your order directly through the courier partner’s
                tracking system.
              </li>
            </ul>
          </div>

          {/* Delay */}
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Delays &amp; Issues
            </h2>
            <ul className="list-disc ml-6 space-y-1 text-gray-700">
              <li>
                Delivery delays may occur due to weather, courier issues, or
                other unforeseen circumstances.
              </li>
              <li>
                If your order is delayed for more than <strong>7 days</strong>,
                please contact us directly.
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 p-6 rounded-xl border">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">
              Contact Us
            </h2>
            <p className="text-gray-700">
              For any shipping-related inquiries, please contact us:
            </p>
            <p>
              📞{" "}
              <a href="tel:01742801735" className="text-blue-600">
                01742801735
              </a>
            </p>
            <p>
              📧{" "}
              <a
                href="mailto:shilpomoylungi@gmail.com"
                className="text-blue-600"
              >
                legacylungi@gmail.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
