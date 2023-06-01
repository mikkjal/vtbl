# Slots

## THead and TBody

These slots allow you to customize the table header and body. The `tbody` slot has access to the column's item:

```vue{6,12}
<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
    >
        <template #thead>
            <th>Additional Title 1</th>

            <th>Additional Title 2</th>
        </template>

        <template #tbody="{ item }">
            <td>{{ item.address.geo.lng }}, {{ item.address.geo.lat }}</td>

            <td>{{ item.username }}</td>
        </template>
    </VTable>
</template>
```

## Handle

The `handle` slot can be used when the `sortable` prop is enabled to customize the handle used for sorting:

```vue{6}
<template>
    <VTable
        :items="items"
        sortable
    >
        <template #handle>
            <icon name="my-custom-handle" />
        </template>
    </VTable>
</template>
```

## Fields

You can use the `fields` slots to replace any field in the table:

```vue{6,14}
<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
    >
        <template #name="{ item }">
            <td>
                <span class="p-1 bg-blue-500 text-white text-xs rounded">
                    {{ item.name }}
                </span>
            </td>
        </template>

        <template #address.city="{ item }">
            <td>{{ item.address.city }}</td>
        </template>
    </VTable>
</template>
```

In this example, we customize the rendering of the 'name' and 'address.city' fields. The item associated with the current row is available in the slot's scope, allowing you to access any property of the item.
