# Slots

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
