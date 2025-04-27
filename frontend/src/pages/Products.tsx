import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setProducts } from "../store/slices/productsSlice";
import { addItem } from "../store/slices/cartSlice";
import { PlusIcon } from "@heroicons/react/24/outline";
import Notification from "../components/Notification";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);
  const [loading, setLoading] = useState(true);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleQuantityChange = (productId: number, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleAddToCart = (
    product: { id: number; name: string; price: number },
    quantity: number
  ) => {
    if (quantity > 0) {
      dispatch(
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity,
        })
      );
      setNotification({
        message: `${product.name} agregado al carrito con cantidad: ${quantity}`,
        type: "success",
      });
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification({
        message: "Por favor, selecciona una cantidad válida.",
        type: "error",
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const response = await fetch("/api/products");
      const data = await response.json();
      dispatch(setProducts(data));
      setLoading(false);
    };

    fetchProducts();
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}
      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">
        Productos Disponibles
      </h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.isArray(products) ? (
            products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow text-primary-text"
              >
                <h2 className="text-2xl font-semibold mb-4">{product.name}</h2>
                <p className="mb-2">
                  Precio: <span className="font-bold">${product.price}</span>
                </p>
                <p>
                  Stock: <span className="font-bold">{product.stock}</span>
                </p>
                <div className="mt-4">
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantities[product.id] || 1}
                    className="border rounded px-2 py-1 w-20 mr-2"
                    onChange={(e) =>
                      handleQuantityChange(product.id, Number(e.target.value))
                    }
                  />
                  <button
                    onClick={() =>
                      handleAddToCart(product, quantities[product.id] || 1)
                    }
                    className="bg-primary text-primary-text p-2 hover:bg-primary-hover focus:ring focus:ring-primary rounded-lg"
                  >
                    <PlusIcon className="h-3 w-3 text-primary-text hover:bg-primary-hover rounded-md " />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              No hay productos disponibles.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
