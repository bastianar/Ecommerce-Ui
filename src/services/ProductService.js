const API_BASE_URL = "https://dummyjson.com/products";

const fetchData = async (url, errorMessage) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  const data = await response.json();
  return data;
};

const getProducts = async () => {
  const url = `${API_BASE_URL}?limit=100`;
  const errorMessage = "Gagal memuat produk";
  return await fetchData(url, errorMessage);
};

const getProductById = async (id) => {
  const url = `${API_BASE_URL}/${id}`;
  const errorMessage = "Gagal memuat detail produk";
  return await fetchData(url, errorMessage);
};

export { getProducts, getProductById };