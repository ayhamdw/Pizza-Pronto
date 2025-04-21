import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser";
import Button from "./Button";
import { motion } from "framer-motion";

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-red-50 to-amber-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl text-center"
      >
        <h1 className="mb-8 font-serif text-4xl font-bold tracking-tight text-red-600 md:text-6xl">
          <span className="inline-block transform transition-transform hover:rotate-2">
            Pizza
          </span>{" "}
          <span className="inline-block transform transition-transform hover:-rotate-2">
            Perfection
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mb-12 text-lg font-medium text-amber-800 md:text-2xl"
        >
          <span className="inline-block animate-pulse">🍕</span> Straight from
          our fiery oven
          <span className="mx-2 inline-block animate-bounce">🔥</span>
          to your hungry heart{" "}
          <span className="inline-block animate-pulse">♥</span>
        </motion.p>

        <div className="rounded-xl border border-amber-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm">
          {username === "" ? (
            <CreateUser />
          ) : (
            <Button to="/menu" type="primary">
              Continue Your Pizza Journey, {username}!
            </Button>
          )}
        </div>
      </motion.div>

      {/* Animated pizza slices in the background */}
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: Math.random() * 360,
            }}
            animate={{
              x: [null, Math.random() * 100 - 50],
              y: [null, Math.random() * 100 - 50],
              rotate: [null, Math.random() * 360],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            🍕
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
