import type { MerchantUser } from "~/types/state/MerchantUser";

export default function () {
    const merchantUser = useState<MerchantUser | null>("merchantUser", () => null);

    function setMerchantUser(state: MerchantUser) {
        merchantUser.value = state;
    }

    return { merchantUser, setMerchantUser };
}
