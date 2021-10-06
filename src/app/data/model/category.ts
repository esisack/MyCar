import { ItemType } from "./item-type"

export class Category {
    itemType!: ItemType
    categoryId!: number
    categoryCode!: string
    categoryName!: string
    categoryParent!: number
}