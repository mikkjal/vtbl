<script setup lang="ts" generic="Type extends {[key: string]: any}, TFields extends readonly string[]">
import { computed, onMounted, ref } from 'vue';

import { flatten, arrayMove } from '../helpers';

// Types

type OrderBy = [string, 'asc' | 'desc'];

type Alignment = 'left' | 'center' | 'right';

// Props

const props = defineProps<{
    items: Type[];
    fields?: TFields;
    align?: Partial<Record<TFields[number], Alignment>> & { [key: string]: Alignment };
    title?: Partial<Record<TFields[number], string>> & { [key: string]: string };
    map?: Partial<Record<TFields[number], (item: any) => string>>;
    orderable?: TFields[number][];
    orderBy?: OrderBy;
    selectable?: boolean;
    selected?: (number | string)[];
    selectedModifiers?: { [key: string]: boolean };
    sortable?: boolean;
    mapTitles?: (title: TFields[number]) => string;
}>();

// Emits

const emit = defineEmits<{
    click: [];
    sort: [value: Type[]];
    'update:selected': [value: (number | string)[]];
    'update:orderBy': [value: OrderBy];
}>();

// Slots

defineSlots<{
    [K in TFields[number]]?: (props: { item: Type }) => any;
}>();

// Data

const container = ref(null); // <tbody>

let idField = 'id'; // The id field can be set with v-model:selected.[field]

if (props.selectedModifiers) {
    idField = Object.keys(props.selectedModifiers)[0];
}

// Lifecycle Hooks

onMounted(() => {
    initSortable();
});

// Computed

const flattenedItems = computed(() => {
    return props.items.map((item: any) => {
        return flatten(item);
    });
});

const visibleFields = computed(() => {
    if (props.fields) {
        return props.fields;
    }

    let keys = new Set();

    for (const item of flattenedItems.value) {
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

        selected.value = props.items.map((entry: any) => entry[idField]);
    },
});

// Functions

async function initSortable(): Promise<void> {
    if (!props.sortable) {
        return;
    }

    if (!container.value) {
        return;
    }

    const Sortable = (await import('sortablejs')).default;

    new Sortable(container.value, {
        handle: '.handle',
        animation: 175,
        draggable: '.draggable',

        onEnd(e) {
            arrayMove(props.items, e.oldIndex || 0, e.newIndex || 0);

            emit('sort', props.items);
        },
    });
}

function getAlignment(field: TFields[number]): '' | `text-${Alignment}` {
    if (!props.align?.[field]) {
        return '';
    }

    return `text-${props.align[field]}`;
}

function getTitle(field: TFields[number]): string {
    const title = (props.title as any)?.[field] ?? field;

    return props.mapTitles ? props.mapTitles(title) : title;
}

function setOrderBy(field: TFields[number]): void {
    if (!props.orderable?.includes(field)) {
        return;
    }

    if (!props.orderBy) {
        emit('update:orderBy', [field, 'asc']);

        return;
    }

    const [orderBy, direction] = props.orderBy;

    emit('update:orderBy', [field, orderBy == field && direction == 'asc' ? 'desc' : 'asc']);
}

function getOrderableClasses(field: TFields[number]) {
    if (!props.orderable?.includes(field)) {
        return {};
    }

    let classes = {
        orderable: props.orderable?.includes(field),
    };

    if (!props.orderBy) {
        return classes;
    }

    const [orderBy, direction] = props.orderBy;

    return {
        ...classes,
        'order-by': orderBy == field,
        desc: orderBy == field && direction == 'desc',
    };
}

function getFieldFromRow(field: TFields[number], item: Type) {
    if (props.map?.[field]) {
        return props.map[field]?.call(null, item[field]);
    }

    return item[field];
}

function toggleRow(item: any): void {
    if (selected.value?.includes(item[idField])) {
        selected.value = selected.value?.filter((rowId) => rowId != item[idField]);

        return;
    }

    selected.value = [...(selected.value || []), item[idField]];
}

function getItemAtIndex(index: number): Type {
    return props.items[index];
}
</script>

<template>
    <table class="v-table">
        <thead>
            <tr>
                <th
                    v-if="sortable"
                    class="sortable"
                ></th>

                <th
                    v-if="selectable"
                    class="selectable"
                >
                    <input
                        v-model="allRowsAreSelected"
                        type="checkbox"
                        @click.stop
                    />
                </th>

                <th
                    v-for="field in visibleFields"
                    :key="field"
                    @click="setOrderBy(field)"
                    :class="{
                        [field]: true,
                        [getAlignment(field)]: true,
                        ...getOrderableClasses(field),
                    }"
                >
                    {{ getTitle(field) }}
                </th>
            </tr>
        </thead>

        <tbody ref="container">
            <tr
                v-for="(item, index) in flattenedItems"
                :key="item[idField]"
                @click.stop="$emit('click', getItemAtIndex(index))"
                :data-id="item[idField]"
                class="draggable"
            >
                <td
                    v-if="sortable"
                    class="sortable handle"
                ></td>

                <td
                    v-if="selectable"
                    class="selectable"
                >
                    <input
                        type="checkbox"
                        :checked="selected?.includes(item[idField])"
                        @click.stop="toggleRow(item)"
                    />
                </td>

                <template
                    v-for="field in visibleFields"
                    :key="field"
                >
                    <slot
                        v-if="$slots[field]"
                        :name="field"
                        :item="getItemAtIndex(index)"
                    />

                    <td
                        v-if="!$slots[field]"
                        :class="{
                            [field]: true,
                            [getAlignment(field)]: true,
                        }"
                    >
                        <span v-html="getFieldFromRow(field, item)"></span>
                    </td>
                </template>
            </tr>
        </tbody>
    </table>
</template>
