# Installation

To integrate and use `vtbl` in your Vue application, follow the steps outlined in this section.

## Install with NPM

To install the `vtbl` library, run the following command in your terminal:

```bash
npm i vtbl
```

## Import

After installing `vtbl`, you can import it into individual Vue components or views like this:

```vue{4,5}
<script setup lang="ts">
import { ref } from 'vue';

import VTable from 'vtbl';
import 'vtbl/style.css'; // Optional

const items = ref([]);
</script>

<template>
  <VTable :items="items" />
</template>
```

## Use Globally

You might want to use `VTable` across many parts of your application. To do this, you can register it globally in your `main.ts` file and declare its type in the `env.d.ts` file.

::: code-group

```ts [main.ts]
import VTable from 'vtbl';

app.component('VTable', VTable);
```

```ts [env.d.ts]
/// <reference types="vite/client" />

import VTable from 'vtbl';

declare module '@vue/runtime-core' {
	export interface GlobalComponents {
		VTable: ComponentPublicInstance<typeof VTable>;
	}
}
```

:::

_Remember that global registration should be done judiciously to avoid bloating the bundle size with unnecessary components. If you're using `VTable` in many places throughout your application, global registration is justified. If it's only in a few places, consider using local registration instead._
