import b1ZoneToSCript from "./integration-tests/b1-prv/b1-zones";
import g1ZoneToScript from "./integration-tests/g1-cmh/g1-zones";
import fra1ZoneToScript from "./integration-tests/fra1/fra1-zones";
import lhr1ZoneToScript from "./integration-tests/lhr1/lhr1-zones";
import iad1ZoneToScript from "./integration-tests/iad1/iad1-zones";
import sin1ZoneToScript from "./integration-tests/sin1/sin1-zones";
import syd1ZoneToScript from "./integration-tests/syd1/syd1-zones";
import defaultZone from "./delfin1b1/default";

const zoneToScript: Record<string, string> = {
    ... b1ZoneToSCript,
    ... g1ZoneToScript,
    ... sin1ZoneToScript,
    ... syd1ZoneToScript,
    ... fra1ZoneToScript,
    ... lhr1ZoneToScript,
    ... iad1ZoneToScript
};

export default function getTrackingScriptForZone(zoneId: string) {
    if (zoneId in zoneToScript) {
        console.log(zoneToScript[zoneId])
        return zoneToScript[zoneId];
    }

    return defaultZone;
}