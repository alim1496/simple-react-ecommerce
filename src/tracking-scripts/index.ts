import b1ZoneToSCript from "./integration-tests/b1-prv/b1-zones";
import g1ZoneToScript from "./integration-tests/g1-cmh/g1-zones";
import defaultZone from "./delfin1b1/default";

const zoneToScript: Record<string, string> = {
    ... b1ZoneToSCript,
    ... g1ZoneToScript
};

export default function getTrackingScriptForZone(zoneId: string) {
    if (zoneId in zoneToScript) {
        console.log(zoneToScript[zoneId])
        return zoneToScript[zoneId];
    }

    return defaultZone;
}