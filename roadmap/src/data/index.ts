import { level01 } from "./level01";
import { level02 } from "./level02";
import { level03, level04 } from "./levels0304";
import { REFERENCES, getReferencesForItem } from "./references";

export const LEVELS = [level01, level02, level03, level04] as const;
export { REFERENCES, getReferencesForItem };
