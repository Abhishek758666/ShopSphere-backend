export interface OrderData {
  phoneNumber: string;
  shippingAddress: string;
  totalAmount: number;
  paymentDetails: {
    paymentMethod: string;
    paymentStatus?: string;
    pidx?: string;
  };
  items: OrderDetails[];
}

export interface OrderDetails {
  quantity: number;
  productId: string;
}
export enum PaymentMethod {
  Cod = "cod",
  Khalti = "khalti",
  Esewa = "esewa",
}
export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
}
export interface khaltiResponse {
  pidx: string;
  payment_url: string;
  expires_at: string;
  expires_in: number;
}

export interface khaltiLookupResponse {
  pidx: string;
  total_amount: number;
  status: string;
  transaction_id: string;
  fee: number;
  refunded: boolean;
}

export enum TransactionStatus {
  Completed = "Completed",
  Pending = "Pending",
  Initiated = "Initiated",
  Refunded = "Refunded",
  Expired = "Expired",
  UserCanceled = "User canceled",
}

export enum OrderStatus {
  Processing = "processing",
  Pending = "pending",
  Shipped = "shipped",
  Delivered = "delivered",
  Cancelled = "cancelled",
}
