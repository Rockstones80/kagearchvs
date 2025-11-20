import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json();

    if (!reference) {
      return NextResponse.json(
        { error: "Payment reference is required" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      console.error("PAYSTACK_SECRET_KEY is not set in environment variables");
      return NextResponse.json(
        { error: "Payment verification is not configured" },
        { status: 500 }
      );
    }

    // Verify payment with Paystack
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Paystack verification failed:", data);
      return NextResponse.json(
        { error: "Payment verification failed", details: data },
        { status: response.status }
      );
    }

    // Check if payment was successful
    if (data.status && data.data.status === "success") {
      return NextResponse.json({
        success: true,
        data: {
          reference: data.data.reference,
          amount: data.data.amount / 100, // Convert from kobo to naira
          currency: data.data.currency,
          status: data.data.status,
          paidAt: data.data.paid_at,
          customer: {
            email: data.data.customer.email,
          },
          metadata: data.data.metadata,
        },
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Payment was not successful",
          status: data.data.status,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return NextResponse.json(
      { error: "An error occurred while verifying payment" },
      { status: 500 }
    );
  }
}
