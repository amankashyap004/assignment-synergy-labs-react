import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { User } from "../types/User";
import { fetchUsers } from "../services/userService";
import Spinner from "../components/ui/Spinner";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | any | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const usersData = await fetchUsers();
      const selectedUser = usersData.find((user) => user.id === Number(id));
      setUser(selectedUser || null);
    };
    loadUser();
  }, [id]);

  if (!user)
    return (
      <div className="py-48">
        <Spinner />
      </div>
    );

  return (
    <div className="container px-4 lg:px-10 py-6 flex justify-center items-center w-full">
      <div className="flex flex-col justify-center items-center w-full lg:w-3/4">
        <h1 className="text-2xl font-semibold text-center mb-6">
          User Details
        </h1>
        <div className="text-sm lg:text-base">
          <table className="min-w-full border border-gray-200">
            <tbody>
              <tr>
                <td className="px-6 py-4 border-b font-medium">Name</td>
                <td className="px-6 py-4 border-b">{user.name}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b font-medium">Email</td>
                <td className="px-6 py-4 border-b">{user.email}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b font-medium">Phone</td>
                <td className="px-6 py-4 border-b">{user.phone}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b font-medium">Address</td>
                <td className="px-6 py-4 border-b">
                  {user.address.street}, {user.address.suite},{" "}
                  {user.address.city} - {user.address.zipcode}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b font-medium">Website</td>
                <td className="px-6 py-4 border-b">
                  <a
                    href={`http://${user.website}`}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b font-medium">Company</td>
                <td className="px-6 py-4 border-b">{user.company.name}</td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b font-medium">Catchphrase</td>
                <td className="px-6 py-4 border-b">
                  {user.company.catchPhrase}
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 border-b font-medium">Business</td>
                <td className="px-6 py-4 border-b">{user.company.bs}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
