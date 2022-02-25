import { Category } from "./category"
import { Document } from "./document"
import { ItemType } from "./item-type"
import { Make } from "./make"
import { Model } from "./model"
import { Trim } from "./trim"

export class Item {

    entityId!: number
    itemId!: number
    itemCode!: string
    used!: string
    itemName!: string
    description!: string
    itemType!: ItemType
    category!: Category
    make!: Make
    model!: Model
    trim!: Trim
    year!: number
    km!: number
    price!: number
    salePrice!: number
    retailPrice!: number
    transmition!: string
    fuel!: string
    color!: string
    documents!: Document[]

}