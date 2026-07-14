import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { products } from "@/lib/products";

interface IncomingItem {
  productId: string;
  quantity: number;
  size?: string;
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    // Validate required fields
    if (
      !orderData.paymentReference ||
      !orderData.customerEmail ||
      !orderData.customerName ||
      !orderData.items ||
      !orderData.totalAmount
    ) {
      return NextResponse.json(
        { error: "Missing required order fields" },
        { status: 400 }
      );
    }

    // Payment has already been taken at this point, so problems are flagged
    // on the order for manual follow-up instead of rejecting it.
    let orderStatus = "processing";

    for (const item of orderData.items as IncomingItem[]) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) continue;

      // Paid before the release moment (bypassed the UI gate)
      if (
        product.releaseDate &&
        Date.now() < new Date(product.releaseDate).getTime()
      ) {
        orderStatus = "flagged-prerelease";
      }

      // Atomically take stock; false = not enough left (oversold)
      if (product.stockManaged && item.size) {
        const { data: taken, error: stockError } = await supabase.rpc(
          "decrement_stock",
          {
            p_slug: product.slug,
            p_size: item.size,
            p_qty: item.quantity,
          }
        );
        if (stockError) {
          console.error("Stock decrement failed:", stockError);
          orderStatus = "flagged-stock-error";
        } else if (!taken) {
          orderStatus = "oversold";
        }
      }
    }

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)
      .toUpperCase()}`;

    // Insert order into Supabase
    const { data, error } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        payment_reference: orderData.paymentReference,
        customer_email: orderData.customerEmail,
        customer_name: orderData.customerName,
        customer_phone: orderData.customerPhone || "",
        shipping_address: {
          address: orderData.shippingAddress?.address || "",
          city: orderData.shippingAddress?.city || "",
          postal_code: orderData.shippingAddress?.postalCode || "",
          country: orderData.shippingAddress?.country || "",
        },
        items: orderData.items,
        total_amount: orderData.totalAmount,
        currency: orderData.currency || "NGN",
        payment_status: "completed",
        order_status: orderStatus,
        paid_at: orderData.paidAt || new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create order", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: data.id,
        orderNumber: data.order_number,
      },
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      {
        error: "Failed to create order",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
