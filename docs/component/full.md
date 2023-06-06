# Everything, All at Once

This example provides a demonstration of using all the features of VTable at once:

```vue
<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
        :align="{
            id: 'left',
            name: 'center',
            email: 'right',
            'address.city': 'center',
        }"
        :title="{
            'address.city': 'City',
        }"
        :mapTitles="(title) => title.toUpperCase()"
        :orderable="['id', 'name']"
        v-model:order-by="orderBy"
        selectable
        v-model:selected="selectedItemIds"
        sortable
        @click="handleClick"
        @sort="handleSort"
    >
        <template #handle>
            <!-- Add your custom handle content here -->
        </template>

        <template #thead="{}">
            <!-- Add your custom thead content here -->
        </template>

        <template #tbody="{ item }">
            <!-- Add your custom tbody content here -->
        </template>

        <template #name="{ item }">
            <!-- Add your custom name field content here -->
        </template>

        <template #address.city="{ item }">
            <!-- Add your custom city field content here -->
        </template>
    </VTable>
</template>
```
