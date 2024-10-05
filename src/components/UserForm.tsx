import React, { useState, useEffect } from "react";
import { User } from "../types/User";

interface UserFormProps {
  onSubmit: any;
  user?: User | any;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, user }) => {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    phone: "",
    username: "",
    address: { street: "", city: "" },
    company: { name: "" },
    website: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        username: user.username || "",
        address: {
          street: user.address?.street || "",
          city: user.address?.city || "",
        },
        company: { name: user.company?.name || "" },
        website: user.website || "",
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes("address.") || name.includes("company.")) {
      // Handle nested fields for address and company
      const [parent, child] = name.split(".");
      setFormData((prevFormData) => ({
        ...prevFormData,
        [parent]: {
          ...prevFormData,
          [child]: value,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-full gap-2 lg:gap-4"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="border border-black border-opacity-50 py-2 px-4 outline-none bg-transparent rounded w-full"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="border border-black border-opacity-50 py-2 px-4 outline-none bg-transparent rounded w-full"
      />
      <input
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
        className="border border-black border-opacity-50 py-2 px-4 outline-none bg-transparent rounded w-full"
      />
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        className="border border-black border-opacity-50 py-2 px-4 outline-none bg-transparent rounded w-full"
      />
      <input
        type="text"
        name="address.street"
        value={formData.address.street}
        onChange={handleChange}
        placeholder="Street"
        className="border border-black border-opacity-50 py-2 px-4 outline-none bg-transparent rounded w-full"
      />
      <input
        type="text"
        name="address.city"
        value={formData.address.city}
        onChange={handleChange}
        placeholder="City"
        className="border border-black border-opacity-50 py-2 px-4 outline-none bg-transparent rounded w-full"
      />
      <input
        type="text"
        name="company.name"
        value={formData.company?.name}
        onChange={handleChange}
        placeholder="Company"
        className="border border-black border-opacity-50 py-2 px-4 outline-none bg-transparent rounded w-full"
      />
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        placeholder="Website"
        className="border border-black border-opacity-50 py-2 px-4 outline-none bg-transparent rounded w-full"
      />

      <div className="flex justify-end items-center w-full">
        <button
          type="submit"
          className="flex justify-center items-center rounded-md font-medium shadow-input text-white bg-blue-900 px-6 py-2"
        >
          {user ? "Update" : "Create"} User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
