export type AdminRole = "admin" | "superadmin";

export type JwtPayload = {
  sub: string;
  email: string;
  role: AdminRole;
};

export type AdminProfile = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
  createdAt: string;
};
