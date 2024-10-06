import axios from "axios";
import { User } from "../types/User";

const API_URL = "https://jsonplaceholder.typicode.com/users";

// Fetch all users
export const fetchUsers = async (): Promise<User[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Create a new user
export const createUser = async (user: User): Promise<User> => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Update an existing user
export const updateUser = async (
  id: number,
  user: Partial<User>
): Promise<User> => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};

// export const updateUser = async (
//   id: number,
//   user: Partial<User>
// ): Promise<User> => {
//   const response = await axios.patch(`${API_URL}/${id}`, user);
//   return response.data;
// };

// Delete a user
export const deleteUser = async (userId: number): Promise<void> => {
  await axios.delete(`${API_URL}/${userId}`);
};
