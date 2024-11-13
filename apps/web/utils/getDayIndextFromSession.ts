const getDayIndexFromSession = () => {
  const session = sessionStorage
    .getItem("selected-date")
    ?.split("T")[0]
    .replace(/"/g, "");

  return session ? new Date(session).getDay() : new Date().getDay();
};

export default getDayIndexFromSession;
