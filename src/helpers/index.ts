export function flatten<T extends object>(object: T, prefix = ''): any {
	return Object.entries(object).reduce((previous: any, current: any) => {
		const [key, value] = current;

		const prefixedKey = prefix ? `${prefix}.${key}` : key;

		if (typeof value == 'object' && Object.keys(value).length) {
			return { ...previous, ...flatten(value, prefixedKey) };
		}

		previous[prefixedKey] = value;

		return previous;
	}, {});
}

export function restore(flatObject: any) {
	const result: any = {};

	for (const flatKey in flatObject) {
		const nestedKeys = flatKey.split('.');

		let currentNode = result;

		for (let i = 0; i < nestedKeys.length - 1; i++) {
			const key = nestedKeys[i];

			if (!currentNode[key]) {
				currentNode[key] = {};
			}

			currentNode = currentNode[key];
		}

		const leafKey = nestedKeys[nestedKeys.length - 1];

		currentNode[leafKey] = flatObject[flatKey];
	}

	return result;
}

export function arrayMove(array: any[], from: number, to: number): void {
	let element = array[from];

	array.splice(from, 1);
	array.splice(to, 0, element);
}
