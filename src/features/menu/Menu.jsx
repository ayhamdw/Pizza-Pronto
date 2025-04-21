import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { motion } from "framer-motion";

function Menu() {
  const menu = useLoaderData();

  return (
    <motion.ul
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {menu.map((pizza, index) => (
        <motion.li
          key={pizza.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <MenuItem pizza={pizza} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
