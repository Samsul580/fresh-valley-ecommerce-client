import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const CheckOut = () => {
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const {displayName, email} = loggedInUser;
    const userInfo = {displayName, email};
    console.log(loggedInUser, displayName, email);
    useEffect(() => {
        fetch(`https://cherry-crumble-46990.herokuapp.com/product/${id}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(result => setProduct(result[0]))
    }, [])

    const handleCheckOut = () => {
        const newOrder = {...userInfo, ...product};
        fetch('https://cherry-crumble-46990.herokuapp.com/addOrder', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newOrder)
        })
        .then(response => response.json())
        .then(data => console.log(data))
        console.log(newOrder);
    }
    return (
        <div>
            <div className="container">
                <h1 className="my-5">CheckOut</h1>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Description</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{product.name} {product.brand}</td>
                            <td>1</td>
                            <td>${product.price}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="text-right">
                    <button onClick={handleCheckOut} className="btn btn-success">CheckOut</button>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;