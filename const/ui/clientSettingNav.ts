import type { ClientSettingNav } from "~/types/ui/ClientSettingNav";

export const CLIENT_SETTING_ACCOUNT_NAV: ClientSettingNav[] = [
    {
        name: "Profile",
        target: "#profile",
    },
    {
        name: "Notifications",
        target: "#notification",
    },
    {
        name: "Password",
        target: "#password",
    },
];

export const CLIENT_SETTING_MERCHANT_NAV: ClientSettingNav[] = [];

export const CLIENT_SETTING_BILLING_NAV: ClientSettingNav[] = [];
