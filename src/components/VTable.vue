<script setup lang="ts" generic="Type, TFields extends readonly string[]">
import { computed, onMounted, ref } from 'vue';

import Sortable from 'sortablejs';

import { arrayMove, flatten } from '../helpers';

type OrderBy = [string, 'asc' | 'desc'];

// Props

const props = defineProps<{
	items: Type[];
	fields?: TFields;
	align?: Partial<Record<TFields[number], 'left' | 'center' | 'right'>> & { [key: string]: 'left' | 'center' | 'right' };
	title?: Partial<Record<TFields[number], string>> & { [key: string]: string };
	orderable?: TFields[number][];
	orderBy?: OrderBy;
	selectable?: boolean;
	selected?: (number | string)[];
	sortable?: boolean;
	mapTitles?: (title: TFields[number]) => string;
}>();

// Emit

const emit = defineEmits<{
	click: [];
	sort: [value: Type[]];
	'update:selected': [value: (number | string)[]];
	'update:orderBy': [value: OrderBy];
}>();

// Slots

defineSlots<
	{
		thead?: (props: {}) => any;
		handle?: (props: {}) => any;
		tbody?: (props: { item: Type }) => any;
	} & {
		[K in TFields[number]]?: (props: { item: Type }) => any;
	}
>();

// Data

const element = ref(null);

// Lifecycle Hooks

onMounted(() => {
	if (!element.value) {
		return;
	}

	// Add sortable
	new Sortable(element.value, {
		handle: '.handle',
		animation: 175,
		draggable: '.draggable',

		onEnd(e) {
			arrayMove(props.items, e.oldIndex || 0, e.newIndex || 0);

			emit('sort', props.items);
		},
	});
});

// Computed

const items = computed(() => {
	return props.items.map((item: any) => {
		return flatten(item);
	});
});

const fields = computed(() => {
	if (!props.items.length) {
		return [];
	}

	if (props.fields) {
		return props.fields;
	}

	let keys: any = new Set();

	for (const item of items.value) {
		keys = new Set([...keys, ...Object.keys(item)]);
	}

	return [...keys] as string[];
});

const selected = computed({
	get() {
		return props.selected as (number | string)[];
	},
	set(value: (number | string)[]) {
		emit('update:selected', value);
	},
});

const allRowsAreSelected = computed({
	get() {
		return selected.value?.length == props.items.length;
	},

	set(value) {
		if (!value) {
			selected.value = [];

			return;
		}

		selected.value = props.items.map((entry: any) => entry.id);
	},
});

// Functions

function getTitle(field: string): string {
	const title = (props.title as any)?.[field] ?? field;

	return props.mapTitles ? props.mapTitles(title) : title;
}

function getFieldFromRow(field: string, row: Type) {
	return (row as any)[field];
}

function toggleRow(row: any): void {
	if (selected.value?.includes(row.id)) {
		selected.value = selected.value?.filter((rowId) => rowId != row.id);

		return;
	}

	selected.value = [...(selected.value || []), row.id];
}

function getItemAtIndex(index: number): Type {
	return props.items[index];
}
</script>

<template>
	<table
		v-cloak
		class="v-table w-full"
		aria-describedby=""
	>
		<thead v-if="fields.length">
			<th
				v-if="sortable"
				class="w-10"
			></th>

			<th
				v-if="selectable"
				class="w-10 text-center"
			>
				<input
					v-model="allRowsAreSelected"
					type="checkbox"
					@click.stop
				/>
			</th>

			<template
				v-for="field in fields"
				:key="field"
			>
				<th
					class="whitespace-nowrap text-left"
					:class="{
						[field]: true,
						'orderable': orderable?.includes(field),
						'text-center': (align as any)?.[field] == 'center',
						'text-right': (align as any)?.[field] == 'right',
					}"
				>
					<span
						@click="orderable?.includes?.(field) && $emit('update:orderBy', orderBy?.[0] == field ? [field, orderBy?.[1] == 'asc' ? 'desc' : 'asc'] : [field, 'asc'])"
						class="inline-flex items-center"
						:class="{
							'cursor-pointer': orderable?.includes?.(field),
							'flex-row-reverse': (align as any)?.[field] == 'right',
						}"
					>
						<span>{{ getTitle(field) }}</span>

						<i
							v-if="orderBy && orderable?.includes(field)"
							class="text-[10px] transition mx-1.5"
							:class="{
                            '-rotate-180': orderBy[0] == field && (orderBy as [string, string])[1].toLowerCase() == 'desc',
                            'opacity-0': orderBy[0] != field,
                        }"
						>
							↓
						</i>
					</span>
				</th>
			</template>

			<slot
				v-if="$slots.thead"
				name="thead"
			/>
		</thead>

		<tbody ref="element">
			<tr
				v-for="(item, index) in items"
				:key="item.id"
				@click.stop="$emit('click', getItemAtIndex(index))"
				:data-id="item.id"
				class="draggable group"
			>
				<td
					v-if="sortable"
					class="handle w-10 min-w-[40px] !cursor-grab text-center text-sm"
				>
					<svg
						v-if="!$slots.handle"
						width="16px"
						viewBox="0 -6 20 20"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						class="opacity-50"
					>
						<path
							d="M1 8C0.44772 8 0 7.5523 0 7C0 6.4477 0.44772 6 1 6H19C19.5523 6 20 6.4477 20 7C20 7.5523 19.5523 8 19 8H1zM1 2C0.44772 2 0 1.55228 0 1C0 0.44772 0.44772 0 1 0H19C19.5523 0 20 0.44772 20 1C20 1.55228 19.5523 2 19 2H1z"
							fill="currentColor"
						/>
					</svg>

					<slot
						v-if="$slots.handle"
						name="handle"
					/>
				</td>

				<td
					v-if="selectable"
					class="w-10 min-w-[40px] text-center"
				>
					<input
						type="checkbox"
						:checked="selected?.includes(item.id)"
						@click.stop="toggleRow(item)"
					/>
				</td>

				<template
					v-for="field in fields"
					:key="field"
				>
					<slot
						v-if="($slots as any)[field]"
						:name="field"
						:item="getItemAtIndex(index)"
					/>

					<td
						v-if="!($slots as any)[field]"
						:class="{
							[field]: true,
							'text-center': (align as any)?.[field] == 'center',
							'text-right': (align as any)?.[field] == 'right',
						}"
					>
						<span v-html="getFieldFromRow(field, item)"></span>
					</td>
				</template>

				<slot
					v-if="$slots.tbody"
					name="tbody"
					:item="getItemAtIndex(index)"
				/>
			</tr>
		</tbody>
	</table>
</template>
