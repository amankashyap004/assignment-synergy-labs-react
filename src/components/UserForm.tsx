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
    username: "USER-",
    address: { street: "", city: "" },
    company: { name: "" },
    website: "",
  });

  const [errors, setErrors] = useState({
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

    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const validate = () => {
    const newErrors: any = {};

    if (formData.name.length < 3) {
      newErrors.name = "Name is required and must be at least 3 characters.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "A valid email is required.";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "A valid phone number is required.";
    }
    if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters.";
    }
    if (formData.address.street === "" || formData.address.city === "") {
      newErrors.address = {
        street: "Street is required.",
        city: "City is required.",
      };
    }
    if (formData.company?.name && formData.company.name.length < 3) {
      newErrors.company.name = "Company name must be at least 3 characters.";
    }
    if (formData.website && !/^https?:\/\/[^\s]+$/.test(formData.website)) {
      newErrors.website = "A valid URL is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center w-full gap-2 lg:gap-4"
    >
      <InputField
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        errorMessage={errors.name}
      />
      <InputField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        errorMessage={errors.email}
      />
      <InputField
        type="tel"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        errorMessage={errors.phone}
      />
      <InputField
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
        disabled
        errorMessage={errors.username}
      />
      <InputField
        type="text"
        name="address.street"
        value={formData.address.street}
        onChange={handleChange}
        placeholder="Street"
        errorMessage={errors.address?.street}
      />
      <InputField
        type="text"
        name="address.city"
        value={formData.address.city}
        onChange={handleChange}
        placeholder="City"
        errorMessage={errors.address?.city}
      />
      <InputField
        type="text"
        name="company.name"
        value={formData.company?.name || ""}
        onChange={handleChange}
        placeholder="Company"
        errorMessage={errors.company?.name}
      />
      <InputField
        type="text"
        name="website"
        value={formData.website || ""}
        onChange={handleChange}
        placeholder="Website"
        errorMessage={errors.website}
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


interface InputFieldProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  disabled?: boolean;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  disabled,
  errorMessage,
}) => {
  return (
    <div className="flex flex-col w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={`border border-black border-opacity-50 py-2 px-4 outline-none bg-transparent rounded w-full ${
          errorMessage ? "border-red-500" : ""
        }`}
      />
      {errorMessage && (
        <span className="text-red-500 text-sm">{errorMessage}</span>
      )}
    </div>
  );
};


