# Props

## Items

This prop is used to pass the data that will be displayed in the table:

```vue{3}
<template>
    <VTable
        :items="items"
    />
</template>
```

## Fields

The `fields` prop is used to specify which fields of the items should be displayed in the table:

```vue{4}
<template>
    <VTable
        :items="items"
        :fields="['id', 'name', 'email', 'address.city']"
    />
</template>
```

For TypeScript users wanting to enable IntelliSense, you can ensure type safety by using `as const`:

```vue{4}
<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
    />
</template>
```

## Align

The `align` prop is used to align the contents of the columns. You can align the content to the `left`, `center`, or `right`:

```vue{6,7}
<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
        :align="{
            id: 'center',
            'address.city': 'right',
        }"
    />
</template>
```

## Title

The `title` prop is used to provide custom titles for the columns:

```vue{6}
<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
        :title="{
            'address.city': 'City',
        }"
    />
</template>
```

You can integrate this with the `vue-i18n` library for internationalization:

```vue{5,6,7,8}
<VTable
	:items="items"
	:fields="(['id', 'name', 'email', 'address.city'] as const)"
	:title="{
		'id': $t('ID')
		'name': $t('Name')
		'email': $t('Email')
		'address.city': $t('City')
	}"
/>
```

## Map Titles

The `map-titles` prop can be used to apply a function to all titles. For example, you can translate all the titles with `vue-i18n` like this:

```vue{5}
<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
        :map-titles="$t"
    />
</template>
```

Or if you want to add `my-table` as a prefix:

```vue{5}
<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
        :map-titles="(title) => $t(`my-table.${title}`)"
    />
</template>
```

## Orderable

The `orderable` prop can be used to allow sorting of columns:

```vue{4,11,12}
<script setup lang="ts">
import { ref } from 'vue';

const orderBy = ref(['id', 'asc'] as [string, 'asc' | 'desc']);
</script>

<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
        :orderable="['id', 'name']"
        v-model:order-by="orderBy"
    />
</template>
```

`vtbl` does not modify the data. To sort the data, you need to implement a watcher for `orderBy` and decide how to handle sorting.

## Selectable

The `selectable` prop allows rows in the table to be selectable:

```vue{4,11,12}
<script setup lang="ts">
import { ref } from 'vue';

const selected = ref([]);
</script>

<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
        selectable
        v-model:selected="selected"
    />

    {{ selected }}
    <!-- [1, 4, 6] -->
</template>
```

You can also specify which field should be the `id` field for selection:

```vue{6}
<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
        selectable
        v-model:selected.email="selected"
    />

    {{ selected }}
    <!-- ['user1@example.com', 'user2@example.com'] -->
</template>
```

## Sortable

The `sortable` prop is used to enable dragging and dropping of rows to rearrange them. When a row is moved, the `sort` event is emitted with the new item order:

```vue{11,12}
<script setup lang="ts">
function sortItems(items: Items) {
    sendNewItemOrderToServer(items.map(item => item.id));
}
</script>

<template>
    <VTable
        :items="items"
        :fields="(['id', 'name', 'email', 'address.city'] as const)"
        sortable
        @sort="sortItems"
    />
</template>
```

`VTable` uses `sortablejs` to sort the table rows.
