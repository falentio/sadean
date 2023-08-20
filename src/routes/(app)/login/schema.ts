import { account } from "$lib/schema";
import { pick } from "valibot";

export const login = pick(account, ["name", "password"])