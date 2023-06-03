# Emits

## Click

`VTable` emits a `click` event when a row is clicked. Note that adding the `clickable` class changes the cursor to a pointer when hovering over rows:

```vue{10,11}
<script setup lang="ts">
function handleUserClick(user: User) {
    router.push({ name: 'user.show', { params: { id: user.id } } });
}
</script>

<template>
    <VTable
        :items="items"
        @click="handleUserClick"
        class="clickable"
    />
</template>
```

## Sort

`VTable` emits a `sort` event when the order of rows changes (if `sortable` is enabled):

```vue{10,11}
<script setup lang="ts">
function sortItems(items: Items) {
    sendNewItemOrderToServer(items.map(item => item.id));
}
</script>

<template>
    <VTable
        :items="items"
        sortable
        @sort="sortItems"
    />
</template>
```

## Update Selected

The `update:selected` event is emitted when the selection changes (if `selectable` is enabled):

```vue{4}
<VTable
    :items="items"
    selectable
    v-model:selected="selected"
/>
```

## Update Order By

The `update:orderBy` event is emitted when the order criteria changes (if `orderable` is enabled):

```vue{4}
<VTable
    :items="items"
    :orderable="['id', 'name']"
    v-model:order-by="orderBy"
/>
```
