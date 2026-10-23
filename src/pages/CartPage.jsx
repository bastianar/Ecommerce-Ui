import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, CheckCircle2, Landmark, Wallet, QrCode, Truck } from "lucide-react";

import { useCart } from "../context/CartContext";
import { convertToIDR } from "../utils/Currency";

const paymentMethods = [
  { id: "bank", label: "Transfer Bank", description: "BCA, Mandiri, BNI, BRI", icon: Landmark },
  { id: "ewallet", label: "E-Wallet", description: "GoPay, OVO, DANA", icon: Wallet },
  { id: "qris", label: "QRIS", description: "Scan dengan aplikasi apa pun", icon: QrCode },
  { id: "cod", label: "Bayar di Tempat", description: "Bayar saat barang tiba", icon: Truck },
];

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, clearCart, totalItems, subtotal } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [order, setOrder] = useState(null);

  const handlePay = () => {
    setOrder({
      number: `INV-${Date.now().toString().slice(-8)}`,
      date: new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeStyle: "short" }).format(new Date()),
      method: paymentMethods.find((method) => method.id === paymentMethod).label,
      items,
      totalItems,
      total: subtotal,
    });
    clearCart();
  };

  const handleCloseOrder = () => {
    setOrder(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-green-50 font-poppins pt-28 pb-16">
      <main className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-green-700">Keranjang Belanja</h1>

        {items.length === 0 ? (
          <div className="mt-8 flex flex-col items-center rounded-2xl bg-white px-6 py-16 text-center shadow-sm">
            <ShoppingBag className="h-14 w-14 text-green-700" />
            <h2 className="mt-4 text-lg font-semibold text-gray-800">Keranjangmu masih kosong</h2>
            <p className="mt-1 text-sm text-gray-500">Tambahkan produk dari halaman detail untuk mulai belanja.</p>
            <Link to="/shop" className="mt-6 rounded-full bg-green-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-green-800">
              Mulai Belanja
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">
              {/* Daftar produk */}
              <section aria-label="Produk di keranjang" className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                <div className="flex items-center justify-between">
                  <h2 className="font-semibold text-gray-800">{totalItems} produk</h2>
                  <button onClick={clearCart} className="text-sm font-medium text-green-700 hover:underline">
                    Kosongkan keranjang
                  </button>
                </div>

                <ul className="mt-4 divide-y divide-green-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-3 py-4 sm:gap-4">
                      <img src={item.image} alt={item.title} className="h-20 w-20 shrink-0 rounded-xl bg-gray-50 object-cover sm:h-24 sm:w-24" />

                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="line-clamp-2 text-sm font-semibold text-gray-800">{item.title}</h3>
                            <p className="mt-0.5 text-xs text-gray-500">{convertToIDR(item.price)} / unit</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} aria-label={`Hapus ${item.title}`} className="shrink-0 rounded-full p-1.5 text-gray-400 transition-colors hover:bg-green-50 hover:text-green-700">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-green-700">
                            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} aria-label="Kurangi jumlah" className="p-2 text-green-700 disabled:opacity-30">
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <span className="min-w-8 text-center text-sm font-semibold text-gray-800" aria-live="polite">
                              {item.quantity}
                            </span>
                            <button onClick={() => updateQuantity(item.id, item.quantity + 1)} disabled={item.quantity >= (item.stock ?? Infinity)} aria-label="Tambah jumlah" className="p-2 text-green-700 disabled:opacity-30">
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-green-700 sm:text-base">{convertToIDR(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Metode pembayaran */}
              <section aria-label="Metode pembayaran" className="rounded-2xl bg-white p-4 shadow-sm sm:p-6">
                <h2 className="font-semibold text-gray-800">Pilih pembayaran</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {paymentMethods.map(({ id, label, description, icon: Icon }) => {
                    const selected = paymentMethod === id;
                    return (
                      <label
                        key={id}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 transition-colors ${
                          selected ? "border-green-700 bg-green-50" : "border-gray-200 hover:border-green-700/50"
                        }`}
                      >
                        <input type="radio" name="payment" value={id} checked={selected} onChange={() => setPaymentMethod(id)} className="sr-only" />
                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${selected ? "bg-green-700 text-white" : "bg-gray-100 text-gray-500"}`}>
                          <Icon className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-semibold text-gray-800">{label}</span>
                          <span className="block text-xs text-gray-500">{description}</span>
                        </span>
                        {selected && <CheckCircle2 className="h-5 w-5 shrink-0 text-green-700" />}
                      </label>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* Ringkasan */}
            <aside className="h-fit rounded-2xl bg-green-700 p-6 text-white shadow-lg lg:sticky lg:top-28">
              <h2 className="text-lg font-semibold">Ringkasan Belanja</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-green-100">Jumlah produk</dt>
                  <dd>{totalItems}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-green-100">Subtotal</dt>
                  <dd>{convertToIDR(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-green-100">Pembayaran</dt>
                  <dd>{paymentMethods.find((method) => method.id === paymentMethod).label}</dd>
                </div>
              </dl>

              <div className="mt-4 flex items-center justify-between border-t border-green-600 pt-4">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold">{convertToIDR(subtotal)}</span>
              </div>

              <button
                onClick={handlePay}
                className="mt-6 w-full rounded-full bg-white py-3 text-sm font-bold text-green-700 transition-colors hover:bg-green-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-green-700"
              >
                Bayar Sekarang
              </button>
            </aside>
          </div>
        )}
      </main>

      {/* Pop up pembayaran berhasil */}
      {order && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="order-title">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex flex-col items-center text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-700 text-white">
                <CheckCircle2 className="h-9 w-9" />
              </span>
              <h2 id="order-title" className="mt-4 text-xl font-bold text-gray-800">
                Pembayaran Berhasil
              </h2>
              <p className="mt-1 text-sm text-gray-500">Terima kasih, pesananmu sedang diproses.</p>
            </div>

            <dl className="mt-6 space-y-2 rounded-xl bg-green-50 p-4 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">No. pesanan</dt>
                <dd className="font-semibold text-gray-800">{order.number}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Tanggal</dt>
                <dd className="text-right font-medium text-gray-800">{order.date}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">Metode</dt>
                <dd className="font-medium text-gray-800">{order.method}</dd>
              </div>
            </dl>

            <h3 className="mt-6 text-sm font-semibold text-gray-800">Rincian pembelian</h3>
            <ul className="mt-2 divide-y divide-green-100 text-sm">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-3 py-2">
                  <span className="min-w-0 text-gray-700">
                    <span className="line-clamp-1">{item.title}</span>
                    <span className="text-xs text-gray-400">
                      {item.quantity} × {convertToIDR(item.price)}
                    </span>
                  </span>
                  <span className="shrink-0 font-semibold text-gray-800">{convertToIDR(item.price * item.quantity)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-3 flex items-center justify-between border-t border-green-700 pt-3">
              <span className="font-semibold text-gray-800">Total dibayar ({order.totalItems} produk)</span>
              <span className="text-lg font-bold text-green-700">{convertToIDR(order.total)}</span>
            </div>

            <button onClick={handleCloseOrder} className="mt-6 w-full rounded-full bg-green-700 py-3 text-sm font-bold text-white transition-colors hover:bg-green-800">
              Kembali ke Beranda
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
