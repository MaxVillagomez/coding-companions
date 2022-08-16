import React from "react";
import { Link } from "react-router-dom";

const Checkout = ({cardNumber, setCardNumber}) => {
    return(
        <div className="form-container">
                <form>
                    <label>
                        Email
                        <input type='text' placeholder="Email" required></input>
                    </label>
                    <label>
                        Street Address
                        <input
                            type='text' placeholder="Street Address" required></input>
                    </label>
                    <label>
                        City
                        <input type='text' placeholder="City" required></input>
                    </label>
                    <label>
                        State
                        <input type='text' placeholder="State" required></input>
                    </label>
                    <label>
                        Zip
                        <input type='text' placeholder="Zip" required></input>
                    </label>

                </form>

                <form>
                    <label>
                        Name on Card
                        <input type='text' placeholder="Name on Card" required></input>
                    </label>
                    <label>
                        Card Number
                        <input
                            type='text' placeholder="Card Number" required></input>
                    </label>
                    <label>
                        Expiration Date
                        <input type='text' placeholder="Expiration Date" required></input>
                    </label>
                    <label>
                        CCV
                        <input type='text' placeholder="CCV" required></input>
                    </label>
                    <label>
                        Zip
                        <input type='text' value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="Zip" required></input>
                    </label>

                </form>
                    <Link to='/confirmation'>
                        <button disabled={!cardNumber}>Pay Now</button>
                    </Link>
                

            </div>
    )
};

export default Checkout;