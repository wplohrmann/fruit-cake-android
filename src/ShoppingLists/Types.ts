export interface Unique {
    id: string;
}
export interface ShoppingList {
  name: string;
  owners: string[];
}

export interface ShoppingItem {
    name: string;
    amount: number;
    amount_unit: string;
    shoppingList: string;
    active: boolean;
    mode: "sought" | "bought" | "not-in-store" | "removed";
}

export type UniqueShoppingList = Unique & ShoppingList
export type UniqueShoppingItem = Unique & ShoppingItem

