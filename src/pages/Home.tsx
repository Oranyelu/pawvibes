import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="text-center py-12 px-4">
      {/* Animated Heading */}
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Welcome to PawVibe 🐾
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        className="text-lg text-gray-600 mb-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        Your favorite place to find pets, food, and accessories!
      </motion.p>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <Link
          to="/shop"
          className="inline-block bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          Start Shopping
        </Link>
      </motion.div>

      {/* Service Banners */}
      <div className="mt-16 space-y-8">
        <div className="bg-yellow-100 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-2">Pet Grooming Services</h2>
          <p className="text-gray-700">
            Get your pet looking fresh with our expert grooming partners!
          </p>
        </div>

        <div className="bg-purple-100 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-2">Adoption Events</h2>
          <p className="text-gray-700">
            Give a lovely pet a forever home at our upcoming adoption drives.
          </p>
        </div>

        <div className="bg-blue-100 p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-2">Pet Food Delivery</h2>
          <p className="text-gray-700">
            Fresh food, straight to your door. Healthy pets, happy life.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
