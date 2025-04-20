import CreateUser from "../features/user/CreateUser";
function Home() {
  return (
    <div className="mt-10 mb-10 text-center">
      <h1 className="mb-8 text-xl font-semibold text-stone-700 md:text-3xl">
        The best pizza.
        <br />
        <span className="mx-5 text-yellow-500">
          Straight out of the oven, straight to you ♥.
        </span>
      </h1>
      <CreateUser />
    </div>
  );
}

export default Home;
