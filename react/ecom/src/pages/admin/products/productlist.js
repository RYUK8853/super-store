import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductList() {
    const [products, setProducts] = useState([]);

    // Fetch products from the server
    function getProducts() {
        fetch("http://localhost:3001/products")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Failed to fetch products.");
            })
            .then((data) => {
                setProducts(data);
            })
            .catch(() => {
                alert("Unable to get data");
            });
    }

    // Call getProducts when the component mounts
    useEffect(() => {getProducts();}, []);

    function deleteProduct(id) {
        fetch("http://localhost:3001/products/" + id, {
            method: "DELETE",
        })
        .then(response => {
            if (response.ok) {
                // Successfully deleted product, now refresh the product list
                getProducts();
            } else {
                // Something went wrong
                alert("Unable to delete the product");
            }
        })
        .catch(error => {
            alert("Unable to connect to the server");
        });
    }
    

    return (
        <div className="container my-4">
            <h2 className="text-center mb-4">Products</h2>

            <div className="row mb-3">
                <div className="col">
                    <Link className="btn btn-primary me-1" to="/admin/product/create" role="button">
                        Create Product
                    </Link>
                    <button type="button" className="btn btn-outline-primary" onClick={getProducts}>
                        Refresh
                    </button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Created At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.id}</td> {/* Displays numeric ID */}
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.category}</td>
                            <td>{product.price}</td> {/* Correctly formats price */}
                            <td>
                                <img
                                    src={`http://localhost:3001/images/${product.imageFilename}`}
                                    width="100"
                                    alt={product.name}
                                />
                            </td>
                            <td>{new Date(product.createdAt).toLocaleString()}</td> {/* Formats date */}
                            <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                <Link className="btn btn-primary btn-sm me-1" to={`/admin/product/edit/${product.id}`}>Edit</Link>

                                <button type="button" className="btn btn-danger btn-sm"
                                    onClick={() => deleteProduct(product.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
