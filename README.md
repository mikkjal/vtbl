# vtbl

## Installation

```bash
npm i vtbl
```

```typescript
import VTable from '@vtbl';

import 'vtbl/style.css'; // Optional
```

If you don't want the default styling, you can add this comment somewhere in your project, and tailwind will pick up the styles being used in the component.

```ts
// mx-1.5 inline-flex w-10 w-full min-w-[40px] -rotate-180 !cursor-grab cursor-pointer flex-row-reverse items-center whitespace-nowrap text-left text-center text-right text-[10px] text-sm opacity-0 transition
```

## Props

| Prop         | Type     | Default   | Description                                                                                                                                                                                                                                                                                       |
| :----------- | :------- | :-------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `items`      | Array    | []        | The array of items to be displayed in the table. Each item represents a row.                                                                                                                                                                                                                      |
| `fields`     | Array    | []        | An optional array that specifies the fields in the items to be displayed as columns. If not provided, all fields in the items will be displayed.                                                                                                                                                  |
| `align`      | Object   | {}        | An optional object that specifies the alignment for each field. It can take `'left'`, `'center'`, or `'right'`. If not provided, the default alignment is `'left'`.                                                                                                                               |
| `title`      | Object   | {}        | An optional object that specifies the title for each field. If not provided, the field names will be used as titles.                                                                                                                                                                              |
| `orderable`  | Array    | []        | An optional array that specifies which fields can be ordered. If not provided, no fields can be ordered.                                                                                                                                                                                          |
| `orderBy`    | Array    | []        | An optional array that specifies the initial ordering of the items. It should be a two-element array, with the first element being the field name, and the second element being either `'asc'` for ascending order, or `'desc'` for descending order. If not provided, the items are not ordered. |
| `selectable` | Boolean  | false     | An optional boolean that specifies whether the items are selectable. If true, a checkbox will be displayed next to each item, and the selected items can be retrieved with the `update:selected` event.                                                                                           |
| `selected`   | Array    | []        | An optional array that specifies which items are initially selected. It should be an array of item IDs. If not provided, no items are initially selected.                                                                                                                                         |
| `sortable`   | Boolean  | false     | An optional boolean that specifies whether the items can be sorted by dragging and dropping. If true, a handle will be displayed next to each item, and the new order can be retrieved with the `sort` event.                                                                                     |
| `mapTitles`  | Function | undefined | An optional function that transforms the titles of the fields. It takes a field name as input and should return a string.                                                                                                                                                                         |

## Events

| Event             | Parameters | Description                                                                                                                                                                                                                      |
| :---------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `click`           | None       | Fired when a row in the table is clicked.                                                                                                                                                                                        |
| `sort`            | Array      | Fired when the items are sorted. It returns an array of the items in the new order.                                                                                                                                              |
| `update:selected` | Array      | Fired when the selected items are changed. It returns an array of the IDs of the selected items.                                                                                                                                 |
| `update:orderBy`  | Array      | Fired when the ordering of the items is changed. It returns a two-element array, with the first element being the field name, and the second element being either `'asc'` for ascending order, or `'desc'` for descending order. |

## Slots

| Slot                     | Props            | Description                                                                                                                                                           |
| :----------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `thead`                  | {}               | A slot for customizing the header of the table. If not provided, a default header will be created based on the `fields` prop.                                         |
| `handle`                 | {}               | A slot for customizing the handle for sorting items. This slot is only effective when `sortable` prop is `true`.                                                      |
| `tbody`                  | `{ item: Type }` | A slot for customizing the body of the table. If not provided, a default body will be created based on the `items` prop.                                              |
| `[K in TFields[number]]` | `{ item: Type }` | A slot for customizing the content of a specific field in the table. The slot's name should match the field's name, and it receives the corresponding item as a prop. |
