import type { AdminEvent } from "~/types/state/AdminEvent";

export default function () {
    const event = useState<AdminEvent | null>("adminEvent", () => null);

    function emitEvent(name: AdminEvent) {
        event.value = name;
    }

    function clearEvent() {
        event.value = null;
    }

    return { event, emitEvent, clearEvent };
}
