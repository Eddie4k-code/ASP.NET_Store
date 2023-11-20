export interface ICart {
    id: number;
    buyerId: string;
    items: ICartItem[];
  }

export interface ICartItem {
productId: number;
name: string;
price: number;
pictureUrl: string;
brand: string;
type: string;
quantity: number;
}