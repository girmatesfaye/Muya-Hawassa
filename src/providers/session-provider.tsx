import {
  createContext,
  type PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";

export type UserRole = "client" | "worker";

type SessionUser = {
  name: string;
  role: UserRole;
};

type SessionContextValue = {
  user: SessionUser | null;
  signIn: (role: UserRole, name?: string) => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<SessionUser | null>({
    name: "Abebe",
    role: "client",
  });

  const value = useMemo<SessionContextValue>(
    () => ({
      user,
      signIn: (role, name) => {
        setUser({
          role,
          name:
            name?.trim() ||
            (role === "client" ? "Abebe" : "Abebe Kebede"),
        });
      },
      signOut: () => setUser(null),
    }),
    [user],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }

  return context;
}
