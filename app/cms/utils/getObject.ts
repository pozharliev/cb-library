import payload, { GeneratedTypes } from "payload";


export default async function getObject<C extends keyof GeneratedTypes["collections"]>(
	obj: GeneratedTypes["collections"][C] | number,
	collection: C
): Promise<GeneratedTypes["collections"][C]> {
	if (typeof obj === "number") {
		return await payload.findByID({
			collection: collection,
			id: obj,
		});
	} else {
		return obj;
	}
}