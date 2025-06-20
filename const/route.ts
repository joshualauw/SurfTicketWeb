export const RouteKey = {
    ADMIN_DASHBOARD: "admin-dashboard",
    ADMIN_VENUE: "admin-venue",
    ADMIN_VENUE_CREATE: "admin-venue-create",
    ADMIN_VENUE_DETAIL: "admin-venue-detail",
    ADMIN_TICKET: "admin-ticket",
    ADMIN_REVENUE: "admin-revenue",
    ADMIN_SCAN: "admin-scan",
    ADMIN_CHAT: "admin-chat",
    ADMIN_SETTING: "admin-setting",
    AUTH_LOGIN: "auth-login",
    AUTH_REGISTER: "auth-register",
    AUTH_CONFIRM_EMAIL: "auth-confirm-email",
    AUTH_FORGOT_PASSWORD: "auth-forgot-password",
    AUTH_RESET_PASSWORD: "auth-reset-password",
    SETTING_ACCOUNT: "setting-account",
    SETTING_MERCHANT: "setting-merchant",
    SETTING_BILLING: "setting-billing",
    HOME: "home",
    DENIED: "denied",
} as const;

export type RouteKey = (typeof RouteKey)[keyof typeof RouteKey];
