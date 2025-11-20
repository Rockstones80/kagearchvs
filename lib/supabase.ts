import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Create client with fallback for build time
export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseKey || "placeholder-key"
);

// Types for our database
export interface OrderItem {
  product_id: string;
  title: string;
  price: string;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

export interface ShippingAddress {
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface Order {
  id: string;
  order_number: string;
  payment_reference: string;
  customer_email: string;
  customer_name: string;
  customer_phone: string;
  shipping_address: ShippingAddress;
  items: OrderItem[];
  total_amount: number;
  currency: string;
  payment_status: string;
  order_status: string;
  paid_at: string;
  created_at: string;
}
