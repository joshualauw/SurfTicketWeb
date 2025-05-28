import type { LoggedUser } from "~/types/state/LoggedUser";

export default function () {
    const loggedUser = useState<LoggedUser | null>("loggedUser", () => null);

    function setLoggedUser(state: LoggedUser | null) {
        loggedUser.value = state;
    }

    return { loggedUser, setLoggedUser };
}
