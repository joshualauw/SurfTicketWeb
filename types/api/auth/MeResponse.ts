import type { PlanCode } from "~/types/api/plan/BasePlan";

export interface MeResponse {
    userId: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    activePlan: PlanCode;
}
