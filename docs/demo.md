# Demo

This example demonstrates how to fetch and display data from an API using our VTable component. The demo fetches a list of users from `jsonplaceholder`:

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    
    import VTable from '../src/components/VTable.vue';

    const users = ref([]);
    const selectedEmails = ref([]);

    onMounted(async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        users.value = await response.json();
    });
</script>

<VTable
    :items="users"
    :fields="['id', 'name', 'username', 'email', 'address.city']"
    selectable
    v-model:selected.email="selectedEmails"
    sortable
/>

<strong>Selected:</strong> {{ selectedEmails }}

To replicate this demo in your own project, here is the complete code snippet:

```vue
<script setup lang="ts">
import { onMounted, ref } from 'vue';

import VTable from '../src/components/VTable.vue';

const users = ref([]);
const selectedEmails = ref([]);

onMounted(async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    users.value = await response.json();
});
</script>

<VTable :items="users" :fields="(['id', 'name', 'username', 'email', 'address.city'] as const)" selectable v-model:selected.email="selectedEmails" sortable />

<strong>Selected:</strong>
{{ selectedEmails }}
```

<style>
.v-table .handle {
    cursor: grab;
    font-size: 1rem;
}

.v-table .handle::after {
    content: '═';
}
</style>
