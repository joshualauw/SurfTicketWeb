import type { BaseEntity } from "~/types/api/BaseEntity";

export interface BasePlan extends BaseEntity {
    planCode: PlanCode;
}

export type PlanCode = "BASIC" | "STARTER" | "PRO";
