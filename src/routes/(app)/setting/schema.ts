import { accountPublic } from "$lib/schema";
import { pick } from "valibot";

export const updateSchema = pick(accountPublic, ["facebook", "instagram", "twitter", "whatsapp"])