import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateProduct() {
    const [validationErrors, setValidationErrors] = useState({});
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const product = Object.fromEntries(formData.entries());
    
        if (!product.name || !product.brand || !product.category || !product.price || !product.description || !product.imageFilename) {
            alert("Please fill all the fields!");
            return;
        }
    
        try {
            // Fetch existing products to find the highest ID
            const response = await fetch("http://localhost:3001/products");
            const existingProducts = await response.json();
            const newId = existingProducts.length > 0 
                ? Math.max(...existingProducts.map(p => parseInt(p.id, 10) || 0)) + 1 
                : 1;
    
            product.id = newId; // Assign a valid numeric ID
            product.createdAt = new Date().toISOString();
    
            const saveResponse = await fetch("http://localhost:3001/products", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(product),
            });
    
            if (saveResponse.ok) {
                navigate("/admin/products");
            } else {
                alert("Unable to create the product!");
            }
        } catch (error) {
            alert("Unable to connect to the server.");
        }
    }
    

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-8 mx-auto rounded border p-4">
                    <h2 className="text-center mb-5">Create Product</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Name</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="name" />
                                <span className="text-danger">{validationErrors.name}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Brand</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="brand" />
                                <span className="text-danger">{validationErrors.brand}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Category</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="category" />
                                <span className="text-danger">{validationErrors.category}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Price</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="price" type="number" step="0.01" min="1" />
                                <span className="text-danger">{validationErrors.price}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Description</label>
                            <div className="col-sm-8">
                                <textarea className="form-control" name="description" rows="4" />
                                <span className="text-danger">{validationErrors.description}</span>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label className="col-sm-4 col-form-label">Image Filename</label>
                            <div className="col-sm-8">
                                <input className="form-control" name="imageFilename" placeholder="Enter image filename (e.g., image.jpg)" />
                                <span className="text-danger">{validationErrors.imageFilename}</span>
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
                </div>
            </div>
        </div>
    );
}
