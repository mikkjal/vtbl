# Getting Started

## Simple Usage

The following Vue component outlines the most basic usage of `vtbl`:

```vue{14}
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { UserService } from '@/services/user.service';

const users = ref([]);

onMounted(async () => {
	users.value = await UserService.all();
});
</script>

<template>
	<VTable :items="users" />
</template>
```
