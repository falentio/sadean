import { account } from "$lib/schema";
import { instance, merge, object, omit, string } from "valibot";

export const signup = merge([
    account,
    object({ confirmation: account.object.password, image: instance(Blob) }),
])