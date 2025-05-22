import type { PlanCode } from "~/types/atoms/PlanCode";

export interface MeResponse {
    userId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    activePlan: PlanCode;
}
