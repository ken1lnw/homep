"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";

const AuthContext = React.createContext<
  | {
    user: UserData | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
    isPageLoading: boolean;
    hasRole: (role: string | string[]) => boolean; // Updated to accept string array
    hasPermission: (permission: string | string[]) => boolean; // Updated to accept string array
    hasAllRoles: (roles: string[]) => boolean;
    hasAllPermissions: (permissions: string[]) => boolean;
    changePassword: (
      currentPassword: string,
      newPassword: string
    ) => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    verifyOTP: (email: string, otp: string) => Promise<void>;
    resetPassword: (email: string, newPassword: string) => Promise<void>;
    fetchAvatarUrl: (avatarUrl: string) => Promise<string | null>;
    avatarSignedUrls: Record<string, string>;
    getApplicationsAccess: () => Application[];
  }
  | undefined
>(undefined);

const APP_TOKEN = process.env.NEXT_PUBLIC_FLOW_MANAGER_TOKEN;
const FLOW_MANAGER_API_URL = process.env.NEXT_PUBLIC_FLOW_MANAGER_API_URL;
const FLOW_MANAGER_SIGN_IN_URL = "/Admin/Login";
const FLOW_MANAGER_AFTER_SIGN_IN_URL = "/Admin/dashboard/ManageProducts";
const FLOW_MANAGER_AFTER_SIGN_OUT_URL = "/Admin/Login";
if (!APP_TOKEN || !FLOW_MANAGER_API_URL) {
  throw new Error(
    "Application token or Flow Manager API URL is not defined in .env file. The application cannot start."
  );
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true); // Set loading to true initially
  const [isPageLoading, setPageIsLoading] = React.useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [redirectUrl, setRedirectUrl] = React.useState<string | null>(null);
  const [avatarSignedUrls, setAvatarSignedUrls] = React.useState<
    Record<string, string>
  >({});
  const [token, setToken] = React.useState<string | null>(null);


  const fun = {
    fetchUserApplications: async (userId: number): Promise<Application[]> => {
      try {
        const response = await fetch(
          `${FLOW_MANAGER_API_URL}/api/users/${userId}/applications`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${APP_TOKEN}`,
              "Content-Type": "application/json",
            },
            credentials: "include", // This is important for including cookies in the request
          }
        );
        console.log({ response });
        if (!response.ok) throw new Error("Failed to fetch user applications");
        return await response.json();
      } catch (error) {
        console.error("Error fetching user applications:", error);
        return [];
      }
    },
    refreshToken: async () => {
      try {
        //get sessionToken from cookie
        const sessionToken = document.cookie
          .split("; ")
          .find((row) => row.startsWith("sessionToken="))
          ?.split("=")[1];
        const response = await fetch(
          `${FLOW_MANAGER_API_URL}/api/auth/refresh`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${APP_TOKEN}`,
              Cookie: `sessionToken=${sessionToken}`,
            },
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("sessionToken", data.token);
          return data.token;
        } else {
          throw new Error("Failed to refresh token");
        }
      } catch (error) {
        console.error("Token refresh failed:", error);
        logout();
        return null;
      }
    },
    verifySession: async () => {
      const token = localStorage.getItem("sessionToken");

      if (token) {
        try {
          const decoded = jwtDecode<JWTPayload>(token);
          const currentTime = Date.now() / 1000;

          if (decoded.exp - currentTime < 300) {
            const newToken = await refreshToken();
            if (newToken) {
              const newDecoded = jwtDecode<JWTPayload>(newToken);
              const applications = await fetchUserApplications(newDecoded.id);
              setUser({
                ...newDecoded,
                applications,
              });
                        }
          } else if (decoded.exp > currentTime) {
            setUser({
              ...decoded,
            });          
          } else {
            await refreshToken();
          }

          if (pathname == "/") {
            router.push(FLOW_MANAGER_AFTER_SIGN_IN_URL);
          } else {
            setPageIsLoading(false);
          }
        } catch (error) {
          console.error("Failed to decode token:", error);
          localStorage.removeItem("sessionToken");
          setUser(null);
          router.push(FLOW_MANAGER_SIGN_IN_URL);
        }
      } else {
        if (pathname == FLOW_MANAGER_SIGN_IN_URL) {
          setPageIsLoading(false);
        }
        router.push(FLOW_MANAGER_SIGN_IN_URL);
      }
      setPageIsLoading(false);
      setIsLoading(false);
    },
    login: async (email: string, password: string) => {
      setIsLoading(true);

      try {
        const response = await fetch(`${FLOW_MANAGER_API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${APP_TOKEN}`,
          },
          body: JSON.stringify({ email, password }),
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();

          if (!data.token) {
            throw new Error("Token not received in response");
          }

          localStorage.setItem("sessionToken", data.token);

          const decoded = jwtDecode<JWTPayload>(data.token);

          const fullUser = {
            ...decoded,
            applications: await fetchUserApplications(decoded.id),
          };
          setUser(fullUser);

          localStorage.setItem("user", JSON.stringify(fullUser));

          const targetUrl = redirectUrl || FLOW_MANAGER_AFTER_SIGN_IN_URL;
          setRedirectUrl(null);
          router.push(targetUrl);
          return true
        } else {
          // Handle different error scenarios
          if (response.status === 401) {
            toast.error(
              response.statusText ||
              "Invalid email or password. Please try again."
            );
          } else {
            const errorText = await response.text();
            try {
              const errorData = JSON.parse(errorText);
              toast.error(errorData.error || "Login failed. Please try again.");
            } catch (e) {
              toast.error("An error occurred during login. Please try again.");
            }
          }
          // Clear user data on failed login
          setUser(null);
          localStorage.removeItem("user");
          localStorage.removeItem("sessionToken");
          return false
        }
      } catch (error) {
        toast.error("An unexpected error occurred. Please try again later.");
        return false
      } finally {
        setIsLoading(false);
      }
    },
    logout: async () => {
      setIsLoading(true)
      const response = await fetch(`${FLOW_MANAGER_API_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${APP_TOKEN}`,
        },
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("sessionToken");
        localStorage.removeItem("user");
        localStorage.removeItem("roles");
        localStorage.removeItem("permissions");

        if (token) {
          const response =
            await fetch(`${FLOW_MANAGER_API_URL}/api/notification/subscription`, {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${APP_TOKEN}`,
              },
              body: JSON.stringify({ token: token })
            });

        }

        // Remove sessionToken cookie
        document.cookie =
          "sessionToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        setUser(null);

        router.push(FLOW_MANAGER_AFTER_SIGN_OUT_URL);
      } else {
        console.error("Logout failed. Response:", response);
        setIsLoading(false)

      }
    },
    changePassword: async (currentPassword: string, newPassword: string) => {
      const userId = user?.id;
      const response = await fetch(
        `${FLOW_MANAGER_API_URL}/api/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${APP_TOKEN}`,
          },
          body: JSON.stringify({ userId, currentPassword, newPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Change password response data:", data);
        return data;
      } else {
        const errorText = await response.text();
        console.error("Change password failed. Response:", errorText);
        try {
          const errorData = JSON.parse(errorText);
          toast.error(
            errorData.error || "Change password failed. Please try again later."
          );
        } catch (e) {
          toast.error(
            "An error occurred while changing the password. Please try again."
          );
        }
        throw new Error("Change password failed. Please try again later.");
      }
    },
    resetPassword: async (email: string, newPassword: string) => {
      const response = await fetch(
        `${FLOW_MANAGER_API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${APP_TOKEN}`,
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Reset password response data:", data);
        return data;
      } else {
        const errorText = await response.text();
        console.error("Reset password failed. Response:", errorText);
        try {
          const errorData = JSON.parse(errorText);
          toast.error(
            errorData.error || "Reset password failed. Please try again later."
          );
        } catch (e) {
          toast.error(
            "An error occurred while resetting the password. Please try again."
          );
        }
        throw new Error("Reset password failed. Please try again later.");
      }
    },
    forgotPassword: async (email: string) => {
      const response = await fetch(
        `${FLOW_MANAGER_API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${APP_TOKEN}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Forgot password response data:", data);
        return data;
      } else {
        const errorText = await response.text();
        console.error("Forgot password failed. Response:", errorText);
        let errorMessage = "Forgot password failed. Please try again later.";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage =
            errorData.error ||
            "An error occurred while processing the forgot password request. Please try again.";
        } catch (e) {
          // Handle JSON parsing error if needed
        }
        throw new Error(errorMessage);
      }
    },
    verifyOTP: async (email: string, otp: string) => {
      const response = await fetch(
        `${FLOW_MANAGER_API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${APP_TOKEN}`,
          },
          body: JSON.stringify({ email, otp }),
        }
      );

      console.log("Verify OTP response:", response);
      if (response.ok) {
        const data = await response.json();
        console.log("Verify OTP response data:", data);
        return data;
      } else {
        const errorText = await response.text();
        console.error("Verify OTP failed. Response:", errorText);
        let errorMessage =
          "An error occurred while verifying the OTP. Please try again.";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          console.error("Error parsing error response:", e);
        }
        throw new Error(errorMessage);
      }
    },
    getApplicationsAccess: (): Application[] => {
      console.log("User applications:", user?.applications);
      return user?.applications || [];
    },
    hasRole: (role: string | string[]): boolean => {
      if (!user) return false;
      console.log("User roles:", user.roles);
      const userRoles = user.roles.map((r: Role) => r.name);
      console.log("User roles:", userRoles);
      if (Array.isArray(role)) {
        return role.some((r) => userRoles.includes(r));
      }
      return userRoles.includes(role);
    },
    hasPermission: (permission: string | string[]): boolean => {
      if (!user) return false;
      const userPermissions = user.permissions.flatMap((rp: Permission) =>
        rp.permissions.map((p) => p.name)
      );
      console.log("User permissions:", userPermissions);
      if (Array.isArray(permission)) {
        return permission.some((p) => userPermissions.includes(p));
      }
      return userPermissions.includes(permission);
    },
    hasAllRoles: (roles: string[]): boolean => {
      if (!user) return false;
      const userRoles = user.roles.map((r: Role) => r.name);
      return roles.every((role) => userRoles.includes(role));
    },
    hasAllPermissions: (permissions: string[]): boolean => {
      if (!user) return false;
      const userPermissions = user.permissions.flatMap((rp: Permission) =>
        rp.permissions.map((p) => p.name)
      );
      return permissions.every((permission) =>
        userPermissions.includes(permission)
      );
    },
  };

  const {
    changePassword,
    fetchUserApplications,
    forgotPassword,
    getApplicationsAccess,
    hasAllPermissions,
    hasAllRoles,
    hasPermission,
    hasRole,
    login,
    logout,
    refreshToken,
    resetPassword,
    verifyOTP,
    verifySession
  } = fun;

  const { } = useQuery({
    queryKey: ["AuthProvider", pathname],
    queryFn: async () => {

      verifySession();
      return null;
    },
    // cacheTime: 0, // ลบ cache ทันทีหลังจากใช้งาน
    staleTime: 0, // ดึงข้อมูลใหม่ทุกครั้งที่เรียกใช้
  });


  const fetchAvatarUrl = React.useCallback(async (avatarUrl: string) => {
    if (avatarUrl) {
      const cachedUrl = localStorage.getItem(`avatar_${avatarUrl}`);
      const cachedTimestamp = localStorage.getItem(
        `avatar_timestamp_${avatarUrl}`
      );
      const currentTime = new Date().getTime();

      // Check if we have a cached URL and it's less than 1 hour old
      if (
        cachedUrl &&
        cachedTimestamp &&
        currentTime - parseInt(cachedTimestamp) < 3600000
      ) {
        console.log('test');

        // setAvatarSignedUrls((prev) => ({ ...prev, [avatarUrl]: cachedUrl }));
        return cachedUrl == 'undefined' ? null : cachedUrl;
      }
      else {
        try {
          const response = await fetch(avatarUrl);
          const data = await response.json();
          setAvatarSignedUrls((prev) => ({
            ...prev,
            [avatarUrl]: data.signedUrl,
          }));

          // Cache the new signed URL and timestamp
          localStorage.setItem(`avatar_${avatarUrl}`, data.signedUrl);
          localStorage.setItem(
            `avatar_timestamp_${avatarUrl}`,
            currentTime.toString()
          );

          return data.signedUrl;
        } catch (error) {
          console.error("Error fetching avatar URL:", error);
          return null;
        }
      }
    }
    return null;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isPageLoading,
        hasRole,
        hasPermission,
        hasAllRoles,
        hasAllPermissions,
        changePassword,
        forgotPassword,
        verifyOTP,
        resetPassword,
        fetchAvatarUrl,
        avatarSignedUrls,
        getApplicationsAccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useFlowManager = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useFlowManager must be used within a FlowManagerProvider");
  }
  return context;
};

export const FlowManagerProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <Client>{children}</Client>
    </AuthProvider>
  );
};

export const Client = ({ children }: { children: React.ReactNode }) => {
  const { isPageLoading } = useFlowManager();

  return <>{isPageLoading ? null : children}</>;
};