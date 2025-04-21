import { useState } from "react";
import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { updateName } from "./userSlice";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CreateUser() {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate("/menu");
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <p className="mb-6 text-lg text-amber-900">
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mr-2 inline-block"
        >
          👋
        </motion.span>
        Welcome pizza lover! What should we call you?
      </p>

      <motion.div whileHover={{ scale: 1.02 }} className="mb-6">
        <input
          type="text"
          placeholder="Your delicious name..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-full border-2 border-amber-300 px-6 py-4 text-lg shadow-sm transition-all duration-300 outline-none hover:shadow-md focus:border-red-400 focus:ring-2 focus:ring-red-200"
        />
      </motion.div>

      {username !== "" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center"
        >
          <Button to="/menu" type="primary">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mr-2 inline-block"
            >
              🍕
            </motion.span>
            Start Your Pizza Adventure!
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
              className="ml-2 inline-block"
            >
              🔥
            </motion.span>
          </Button>
        </motion.div>
      )}
    </motion.form>
  );
}

export default CreateUser;
