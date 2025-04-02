interface Role {
    id: number;
    roleId: number;
    name: string;
  }
  
  interface Permission {
    roleId: number;
    roleName: string;
    permissions: {
      id: number;
      name: string;
      description: string;
    }[];
  }
  
  interface Application {
    id: number;
    name: string;
    url: string;
  }
  
  type UserData = {
    id: number; // Changed to number to match the provided data
    name: string;
    email: string;
    employeeId: number;
    roles: Role[]; // No change needed here
    permissions: Permission[]; // No change needed here
    applications: Application[];
  };
  
  type JWTPayload = {
    id: number; // Changed to number to match UserData
    name: string;
    email: string;
    employeeId: number;
    roles: Role[]; // Changed to Role[] to match UserData
    permissions: Permission[]; // Changed to Permission[] to match UserData
    applications: Application[];
    exp: number;
  };
  