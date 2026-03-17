import { level01 } from "./level01";
import { level02 } from "./level02";
import { level03, level04 } from "./levels0304";
import { REFERENCES, getReferencesForItem } from "./references";
import type { Level } from "../types";

export const LEVELS: readonly Level[] = [level01, level02, level03, level04];
export { REFERENCES, getReferencesForItem };
