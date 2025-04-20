import { useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const x = 5;
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  //! this used to handle the success and the error in the Form,
  //! we don't use it to read the form values like email and name,
  const formErrors = useActionData();

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6 md:py-3"
          />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input
              type="tel"
              name="phone"
              required
              className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6 md:py-3"
            />
          </div>
          {formErrors?.phone && <p>{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input
              type="text"
              name="address"
              required
              className="w-full rounded-full border border-stone-200 px-4 py-2 text-sm transition-all duration-300 focus:ring focus:ring-yellow-400 focus:outline-none md:px-6 md:py-3"
            />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-1 focus:outline-none"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button
            // disabled={true}
            className="focus: transition-color mt-4 inline-block cursor-pointer rounded-full bg-yellow-400 px-4 py-3 font-semibold tracking-wide text-stone-800 uppercase ring-offset-2 duration-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:outline-none disabled:cursor-not-allowed"
          >
            Order now
          </button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  //! we use this request.formData() to read the Form values as key-value property
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  let errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone =
      "You have to write your correct phone number, to make us call u when we finish your order dude ;)";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }
  // console.log(order);

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
