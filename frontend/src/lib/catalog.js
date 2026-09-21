const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const request = async (path) => {
  const response = await fetch(`${API_URL}/api/${path}`);
  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.error || `Catalog request failed: ${response.status}`);
  }

  return payload.data || [];
};

const normalizeProduct = (product) => ({
  id: product.slug,
  name: product.name,
  category: product.categories?.name || "Uncategorized",
  price: Number(product.price),
  originalPrice: product.original_price ? Number(product.original_price) : null,
  badge: product.badge || "Track Ready",
  sku: product.sku,
  inStock: true,
  stockCount: product.inventory?.stock_count || 0,
  shortDesc: product.short_description || "",
  fullDesc: product.full_description || product.short_description || "",
  specs: product.specifications || {},
  features: Array.isArray(product.features) ? product.features : [],
  compatible: product.compatible_with || "Competition racing applications",
  options: product.options?.label ? product.options : null,
  images: (product.product_images || [])
    .sort((imageA, imageB) => imageA.sort_order - imageB.sort_order)
    .map((image) => image.image_url),
});

export const fetchCatalog = async () => {
  const [categoryData, productData] = await Promise.all([
    request("categories"),
    request("products"),
  ]);

  return {
    categories: ["All Parts", ...categoryData.map((category) => category.name)],
    products: productData.map(normalizeProduct),
  };
};

export const getRelatedProducts = (products, currentId, category, limit = 4) => {
  const sameCategory = products.filter(
    (product) => product.category === category && product.id !== currentId,
  );
  const others = products.filter(
    (product) => product.category !== category && product.id !== currentId,
  );

  return [...sameCategory, ...others].slice(0, limit);
};
