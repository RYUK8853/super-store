import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditProduct() {
  const params = useParams();
  const [initialData, setInitialData] = useState();
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  // Fetch the product details
  function getProducts() {
    fetch("http://localhost:3001/products/" + String(params.id))  // Ensures ID is treated as a string
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject(`Error: ${response.status} - ${response.statusText}`);
        }
      })
      .then((data) => {
        setInitialData(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);  // Log the error for better debugging
        alert("Unable to read the product details");
      });
  }

  useEffect(() => {
    getProducts();
  }, [params.id]);  // Run the effect when params.id changes

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const product = Object.fromEntries(formData.entries());

    // Validation check
    let errors = {};
    if (!product.name) errors.name = "Name is required";
    if (!product.brand) errors.brand = "Brand is required";
    if (!product.category) errors.category = "Category is required";
    if (!product.price) errors.price = "Price is required";
    if (!product.description) errors.description = "Description is required";
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      const saveResponse = await fetch("http://localhost:3001/products/" + params.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (saveResponse.ok) {
        navigate("/admin/products");
      } else {
        alert("Unable to update the product!");
      }
    } catch (error) {
      alert("Unable to connect to the server.");
    }
  }

  return (
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8 mx-auto rounded border p-4">
          <h2 className="text-center mb-5">Edit Product</h2>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">ID</label>
            <div className="col-sm-8">
              <input readOnly className="form-control-plaintext" defaultValue={params.id} />
            </div>
          </div>

          {initialData && (
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                  <input className="form-control" name="name" defaultValue={initialData.name} />
                  <span className="text-danger">{validationErrors.name}</span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Brand</label>
                <div className="col-sm-8">
                  <input className="form-control" name="brand" defaultValue={initialData.brand} />
                  <span className="text-danger">{validationErrors.brand}</span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Category</label>
                <div className="col-sm-8">
                  <select name="category" className="form-select" defaultValue={initialData.category}>
                    <option value="Other">Other</option>
                    <option value="Phone">Phone</option>
                    <option value="Computer">Computer</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Printer">Printer</option>
                    <option value="Cameras">Cameras</option>
                  </select>
                  <span className="text-danger">{validationErrors.category}</span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Price</label>
                <div className="col-sm-8">
                  <input className="form-control" name="price" type="number" step="0.01" min="1" defaultValue={initialData.price} />
                  <span className="text-danger">{validationErrors.price}</span>
                </div>
              </div>
              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Description</label>
                <div className="col-sm-8">
                  <textarea className="form-control" name="description" rows="4" defaultValue={initialData.description} />
                  <span className="text-danger">{validationErrors.description}</span>
                </div>
              </div>

              <div className="row-mb-3">
                <div className="offset-sm-4 col-sm-8">
                  <img src={"http://localhost:3001/images/" + initialData.imageFilename} width="150" alt="Product" />
                </div>
              </div>

              <div className="row mb-3">
                <label className="col-sm-4 col-form-label">Image Filename</label>
                <div className="col-sm-8">
                  <input className="form-control" name="imageFilename" placeholder="Enter image filename (e.g., image.jpg)" />
                  <span className="text-danger">{validationErrors.imageFilename}</span>
                </div>
              </div>

              <div className="row-mb-3">
                <label className="col-sm-4 col-form-label">Created At</label>
                <div className="offset-sm-4 col-sm-8">
                  <input readOnly className="form-control-plaintext" defaultValue={initialData.createdAt} />
                </div>
              </div>

              <div className="row">
                <div className="offset-sm-4 col-sm-4 d-grid">
                  <button type="submit" className="btn btn-primary">Submit</button>
                </div>
                <div className="col-sm-4 d-grid">
                  <Link className="btn btn-secondary" to="/admin/products" role="button">Cancel</Link>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
