import ZN_1pWMfiB7kzLU9UD from "./integration-tests/b1-prv/ZN_1pWMfiB7kzLU9UD";
import ZN_2EyJTvRl0kjxmgC from "./integration-tests/b1-prv/ZN_2EyJTvRl0kjxmgC";
import ZN_2YnYLD0FLPY7yKv from "./integration-tests/b1-prv/ZN_2YnYLD0FLPY7yKv";
import ZN_3DqJL8DLS52pfUQ from "./integration-tests/b1-prv/ZN_3DqJL8DLS52pfUQ";
import ZN_3PbE4oFVtHVf9eP from "./integration-tests/b1-prv/ZN_3PbE4oFVtHVf9eP";
import ZN_bmfmN4BHs2iI3v3 from "./integration-tests/b1-prv/ZN_bmfmN4BHs2iI3v3";
import defaultZone from "./delfin1b1/default";

const zoneToScript: Record<string, string> = {
    'ZN_1pWMfiB7kzLU9UD': ZN_1pWMfiB7kzLU9UD,
    'ZN_2EyJTvRl0kjxmgC': ZN_2EyJTvRl0kjxmgC,
    'ZN_2YnYLD0FLPY7yKv': ZN_2YnYLD0FLPY7yKv,
    'ZN_3DqJL8DLS52pfUQ': ZN_3DqJL8DLS52pfUQ,
    'ZN_3PbE4oFVtHVf9eP': ZN_3PbE4oFVtHVf9eP,
    'ZN_bmfmN4BHs2iI3v3': ZN_bmfmN4BHs2iI3v3
};

export default function getTrackingScriptForZone(zoneId: string) {
    if (zoneId in zoneToScript) {
        console.log(zoneToScript[zoneId])
        return zoneToScript[zoneId];
    }

    return defaultZone;
}