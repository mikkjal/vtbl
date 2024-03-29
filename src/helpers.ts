export function flatten<T extends object>(object: T, prefix = ''): any {
    return Object.entries(object).reduce((previous: any, current: any) => {
        const [key, value] = current;

        const prefixedKey = prefix ? `${prefix}.${key}` : key;

        if (value && typeof value == 'object' && Object.keys(value).length) {
            return { ...previous, ...flatten(value, prefixedKey) };
        }

        previous[prefixedKey] = value;

        return previous;
    }, {});
}

export function arrayMove(array: any[], from: number, to: number): void {
    let element = array[from];

    array.splice(from, 1);
    array.splice(to, 0, element);
}
