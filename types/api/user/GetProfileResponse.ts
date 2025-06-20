import type { MeResponse } from "~/types/api/auth/MeResponse";

export type GetProfileResponse = Pick<MeResponse, "email" | "username" | "firstName" | "lastName">;
