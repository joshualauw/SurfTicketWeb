import type { LoggedUser } from "~/types/state/LoggedUser";

export default function () {
    const loggedUser = useState<LoggedUser | null>("loggedUser", () => null);

    function setLoggedUser(payload: LoggedUser) {
        loggedUser.value = payload;
    }

    return { loggedUser, setLoggedUser };
}
