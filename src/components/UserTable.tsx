import React from "react";
import { User } from "../types/User";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="flex justify-start lg:justify-center items-center w-full overflow-x-scroll">
      <table className="min-w-full bg-[#16A085] text-white border border-gray-200 text-sm lg:text-base">
        <thead>
          <tr>
            <th className="px-2 lg:px-6 py-2 lg:py-3 border-b text-center lg:text-left">
              Name
            </th>
            <th className="px-2 lg:px-6 py-2 lg:py-3 border-b text-center lg:text-left">
              Email
            </th>
            <th className="px-2 lg:px-6 py-2 lg:py-3 border-b text-center lg:text-left">
              Phone
            </th>
            <th className="px-2 lg:px-6 py-2 lg:py-3 border-b text-center lg:text-left">
              Username
            </th>
            <th className="px-2 lg:px-6 py-2 lg:py-3 border-b text-center lg:text-left">
              Address
            </th>
            <th className="px-2 lg:px-6 py-2 lg:py-3 border-b text-center lg:text-left">
              Company
            </th>
            <th className="px-2 lg:px-6 py-2 lg:py-3 border-b text-center lg:text-left">
              Website
            </th>
            <th className="px-2 lg:px-6 py-2 lg:py-3 border-b text-center lg:text-left">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-[#2C3E50] hover:bg-opacity-50">
              <td className="px-2 lg:px-6 py-3 lg:py-4 border-b">
                {user.name || "N/A"}
              </td>
              <td className="px-2 lg:px-6 py-3 lg:py-4 border-b">
                {user.email || "N/A"}
              </td>
              <td className="px-2 lg:px-6 py-3 lg:py-4 border-b">
                {user.phone || "N/A"}
              </td>
              <td className="px-2 lg:px-6 py-3 lg:py-4 border-b">
                {user.username || "N/A"}
              </td>
              <td className="px-2 lg:px-6 py-3 lg:py-4 border-b">
                {user.address
                  ? `${user.address.street}, ${user.address.city}`
                  : "N/A"}
              </td>
              <td className="px-2 lg:px-6 py-3 lg:py-4 border-b">
                {user.company?.name || "N/A"}
              </td>
              <td className="px-2 lg:px-6 py-3 lg:py-4 border-b">
                {user.website || "N/A"}
              </td>
              <td className="px-2 lg:px-6 py-6 lg:py-6 border-b">
                <div className="flex justify-center items-center w-full gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <a
                    href={`/user/${user.id}`}
                    className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  >
                    View
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
