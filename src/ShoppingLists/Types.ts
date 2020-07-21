export interface ShoppingList {
  name: string;
  id: string;
  owners: string[];
}

export interface ShoppingItem {
    name: string;
    amount: number;
    amount_unit: string;
    shoppingList: string;
    mode: "active" | "bought" | "not-in-store" | "removed";
}
