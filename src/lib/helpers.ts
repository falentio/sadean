import { error, type Action, fail, type HttpError } from "@sveltejs/kit";
import { parse, type BaseSchema, type Output, ValiError, type ObjectSchema } from "valibot";
import { known } from "./schema";

export function getRequestData<T extends ObjectSchema<any>>(req: Request, schema: T): Promise<Output<T>> {
    return req
        .formData()
        .then(data => Object.fromEntries(data))
        .then(data => known(schema, data))
}

export function wrapAction(action: Action): Action {
    return async (event) => {
        try {
            return await action(event)
        } catch (e) {
            if (e instanceof ValiError) {
                return fail(400, {
                    message: e.issues?.[0]?.message || "Invalid body"
                })
            }
            if ("status" in (e as object)) {
                const _e = e as HttpError
                if (((_e.status as number) / 100 | 0) === 3) {
                    throw e
                }
                return fail(_e.status, {
                    message: _e.body
                })
            }
            throw e
        }
    }
}