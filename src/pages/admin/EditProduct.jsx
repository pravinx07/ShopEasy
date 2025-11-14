import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../../context/ToastContext";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    title: "",
    price: "",
    brand: "",
    category: "",
    description: "",
    thumbnail: "",
    stock: "",
  });

  const [errors, setErrors] = useState({});
  const [previewImg, setPreviewImg] = useState("");

  // Load product from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("adminProducts")) || [];
    const product = stored.find((p) => p.id.toString() === id.toString());

    if (!product) {
      showToast("Product not found", "error");
      navigate("/admin/products");
      return;
    }

    setForm(product);
    setPreviewImg(product.thumbnail);
  }, [id]);

  // Validate fields
  const validate = () => {
    const err = {};

    if (!form.title.trim()) err.title = "Title is required";
    if (!form.price || form.price <= 0) err.price = "Valid price required";
    if (!form.brand.trim()) err.brand = "Brand is required";
    if (!form.category.trim()) err.category = "Category is required";
    if (!form.description.trim()) err.description = "Description required";
    if (!form.thumbnail.trim()) err.thumbnail = "Image URL required";
    if (!form.stock || form.stock <= 0) err.stock = "Stock must be positive";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "thumbnail") setPreviewImg(value);
  };

  const handleSubmit = () => {
    if (!validate()) {
      showToast("Fix errors before saving", "error");
      return;
    }

    const updatedProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];

    const index = updatedProducts.findIndex((p) => p.id.toString() === id.toString());
    if (index === -1) return;

    updatedProducts[index] = {
      ...form,
      price: Number(form.price),
      stock: Number(form.stock),
      images: [form.thumbnail],
    };

    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));

    showToast("Product updated successfully!", "success");
    navigate("/admin/products");
  };

  return (
    <div className="max-w-3xl mx-auto mt-28 p-4">
      <h1 className="text-3xl font-bold mb-6">Edit Product</h1>

      <div className="grid grid-cols-1 gap-4">
        <input
          name="title"
          className="input input-bordered"
          placeholder="Product Title"
          value={form.title}
          onChange={handleChange}
        />
        {errors.title && <p className="text-red-400">{errors.title}</p>}

        <input
          name="price"
          type="number"
          className="input input-bordered"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />
        {errors.price && <p className="text-red-400">{errors.price}</p>}

        <input
          name="brand"
          className="input input-bordered"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
        />
        {errors.brand && <p className="text-red-400">{errors.brand}</p>}

        <input
          name="category"
          className="input input-bordered"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
        />
        {errors.category && <p className="text-red-400">{errors.category}</p>}

        <textarea
          name="description"
          className="textarea textarea-bordered"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        {errors.description && <p className="text-red-400">{errors.description}</p>}

        <input
          name="thumbnail"
          className="input input-bordered"
          placeholder="Thumbnail Image URL"
          value={form.thumbnail}
          onChange={handleChange}
        />
        {errors.thumbnail && <p className="text-red-400">{errors.thumbnail}</p>}

        {previewImg && (
          <img
            src={previewImg}
            alt="preview"
            className="w-40 h-40 object-cover rounded-lg shadow"
          />
        )}

        <input
          name="stock"
          type="number"
          className="input input-bordered"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />
        {errors.stock && <p className="text-red-400">{errors.stock}</p>}

        <button className="btn btn-primary mt-4" onClick={handleSubmit}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
