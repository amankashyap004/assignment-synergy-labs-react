import React, { useEffect, useState } from "react";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";
import { User } from "../types/User";
import UserTable from "../components/UserTable";
import UserForm from "../components/UserForm";
import Modal from "../components/ui/Modal";
import Spinner from "../components/ui/Spinner";

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      handleMessage("Failed to load users", true);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (user: any) => {
    try {
      const newUser = await createUser(user);
      setUsers([...users, newUser]);
      handleMessage("User created successfully");
    } catch (error) {
      handleMessage("Failed to create user", true);
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleUpdateUser = async (user: User) => {
    try {
      const updatedUser = await updateUser(user.id, user);
      setUsers(users.map((u) => (u.id === user.id ? updatedUser : u)));
      handleMessage("User updated successfully");
    } catch (error) {
      handleMessage("Failed to update user", true);
    } finally {
      setIsModalOpen(false);
      setEditingUser(null);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((user) => user.id !== id));
      handleMessage("User deleted successfully");
    } catch (error) {
      handleMessage("Failed to delete user", true);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleMessage = (msg: string, isError: boolean = false) => {
    setMessage(isError ? `Error: ${msg}` : msg);
    setShowMessageModal(true);
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container px-4 lg:px-10 flex flex-col justify-center items-center w-full">
      <div className="flex justify-center lg:justify-start items-center w-full pb-4">
        <button
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create User
        </button>
      </div>
      <div className="flex justify-center lg:justify-start items-center w-full pb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 mb-4 mr-4 rounded bg-transparent w-full"
        />
      </div>

      {loading ? (
        <div className="py-40">
          <Spinner />
        </div>
      ) : (
        <UserTable
          users={searchTerm ? filteredUsers : users}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? "Update User" : "Create User"}
      >
        <UserForm
          onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
          user={editingUser}
        />
      </Modal>
      <Modal
        isOpen={showMessageModal}
        onClose={closeMessageModal}
        title="Notification"
      >
        <p className="font-medium">{message}</p>
        <div className="flex justify-start items-center w-full">
          <button
            onClick={closeMessageModal}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Done
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
