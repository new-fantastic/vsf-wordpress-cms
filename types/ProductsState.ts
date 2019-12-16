/**
 * Products fetched from category
 */
interface Categories {
  [key: number]: Array<any>
}

/**
 * Products fetched based on custom stuff and saved in slot
 */
interface Slots {
  [key: string]: Array<any>
}

export interface ProductsState {
  categories: Categories,
  slots: Slots
}
