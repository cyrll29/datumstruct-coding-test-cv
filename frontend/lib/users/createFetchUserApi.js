import HttpError from "@/lib/http/HttpError";
import request from "@/lib/http/request";

const API_URL = "http://localhost:4000/api";

export default function createFetchUserApi() {
  const readUsers = () => request(`${API_URL}/users`);

  const readUser = async (userIdentifier) => {
    try {
      return await request(`${API_URL}/users/${userIdentifier}`);
    } catch (error) {
      if (error instanceof HttpError && error.status === 404) {
        return null;
      }
      throw error;
    }
  };

  const createUser = (user) =>
    request(`${API_URL}/users`, {
      method: "POST",
      body: JSON.stringify(user),
    });

  const updateUser = (userIdentifier, user) =>
    request(`${API_URL}/users/${userIdentifier}`, {
      method: "PUT",
      body: JSON.stringify(user),
    });

  const deleteUser = (userIdentifier) =>
    request(`${API_URL}/users/${userIdentifier}`, {
      method: "DELETE",
    });

  return {
    readUsers,
    readUser,
    createUser,
    updateUser,
    deleteUser,
  };
}
