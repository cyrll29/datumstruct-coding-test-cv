const EMPTY_FORM = {
  id: "",
  name: "",
  email: "",
  username: "",
};

export default function buildUserFormValues(user) {
  if (!user?.id) {
    return { ...EMPTY_FORM };
  }

  return {
    id: String(user.id),
    name: user.name ?? "",
    email: user.email ?? "",
    username: user.username ?? "",
  };
}
