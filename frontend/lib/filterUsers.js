export function filterUsersByQuery(users, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === "") {
    return users;
  }

  return users.filter((user) => {
    const name = (user.name ?? "").toLowerCase();
    const username = (user.username ?? "").toLowerCase();
    const email = (user.email ?? "").toLowerCase();

    return (
      name.includes(normalizedQuery) ||
      username.includes(normalizedQuery) ||
      email.includes(normalizedQuery)
    );
  });
}
