export const getUserId = async () => {
  const user = localStorage.getItem("UserData");
  if (user) {
    const auth = JSON.parse(user);
    return auth.userId;
  } else {
    return null;
  }
};
