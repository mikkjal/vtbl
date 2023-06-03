# Getting Started

## Simple Usage

The following Vue component outlines the most basic usage of `VTable`:

```vue{4,14}
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import VTable from 'vtbl';

const users = ref([]);

onMounted(async () => {
	users.value = await fetchUsers();
});
</script>

<template>
	<VTable :items="users" />
</template>
```
