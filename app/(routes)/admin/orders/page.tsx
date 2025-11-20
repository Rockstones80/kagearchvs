import React from "react";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { supabase, type Order } from "@/lib/supabase";
import { formatDate } from "@/lib/utils";
import { Package, User, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { LogoutButton } from "@/components/admin/logout-button";

const OrdersPage = async () => {
  // Check authentication
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session?.value) {
    redirect("/admin/login");
  }

  // Fetch orders from Supabase
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching orders:", error);
  }

  const ordersList: Order[] = orders || [];

  const formatPrice = (price: number) => {
    return (
      "₦" +
      price.toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-black">
                Orders Dashboard
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Manage all customer orders
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="px-4 py-2 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                Back to Store
              </Link>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-2xl font-bold text-black">{ordersList.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Processing</p>
            <p className="text-2xl font-bold text-blue-600">
              {ordersList.filter((o) => o.order_status === "processing").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Shipped</p>
            <p className="text-2xl font-bold text-purple-600">
              {ordersList.filter((o) => o.order_status === "shipped").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Delivered</p>
            <p className="text-2xl font-bold text-green-600">
              {ordersList.filter((o) => o.order_status === "delivered").length}
            </p>
          </div>
        </div>

        {/* Orders List */}
        {ordersList.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-black mb-2">
              No orders yet
            </h3>
            <p className="text-gray-600">
              Orders will appear here once customers make purchases.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {ordersList.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Order Number</p>
                        <p className="font-bold text-black">
                          {order.order_number}
                        </p>
                      </div>
                      <div className="hidden md:block">
                        <p className="text-sm text-gray-600">Payment Ref</p>
                        <p className="text-sm font-mono text-gray-800">
                          {order.payment_reference}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(
                          order.order_status
                        )}`}
                      >
                        {order.order_status}
                      </span>
                      <p className="text-lg font-bold text-black">
                        {formatPrice(order.total_amount)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Customer Info */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Customer Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <User className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-gray-600">Name</p>
                            <p className="font-medium text-black">
                              {order.customer_name}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Mail className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-gray-600">Email</p>
                            <p className="font-medium text-black break-all">
                              {order.customer_email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-gray-600">Phone</p>
                            <p className="font-medium text-black">
                              {order.customer_phone}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-gray-600">Address</p>
                            <p className="font-medium text-black">
                              {order.shipping_address.address}
                              <br />
                              {order.shipping_address.city},{" "}
                              {order.shipping_address.postal_code}
                              <br />
                              {order.shipping_address.country}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Calendar className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-gray-600">Order Date</p>
                            <p className="font-medium text-black">
                              {formatDate(order.created_at)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="lg:col-span-2">
                      <h3 className="font-semibold text-black mb-3 flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Order Items ({order.items.length})
                      </h3>
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="relative w-20 h-20 shrink-0 bg-white rounded">
                              <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-black mb-1">
                                {item.title}
                              </p>
                              {(item.size || item.color) && (
                                <p className="text-xs text-gray-500 mb-1">
                                  {item.size && `Size: ${item.size}`}
                                  {item.size && item.color && " • "}
                                  {item.color && `Color: ${item.color}`}
                                </p>
                              )}
                              <div className="flex items-center justify-between text-sm">
                                <p className="text-gray-600">
                                  Qty: {item.quantity} × {item.price}
                                </p>
                                <p className="font-semibold text-black">
                                  {item.price}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default OrdersPage;
