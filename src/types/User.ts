export interface Address {
    street: string;
    city: string;
  }
  
  export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    address: Address;
    company?: { name: string };
    website?: string;
  }
  