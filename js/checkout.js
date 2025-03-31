<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CineMagic Theater Checkout</title>
    <style>
        body {
            font-family: 'Arial Rounded MT Bold', Arial, sans-serif;
            max-width: 600px;
            margin: 2rem auto;
            padding: 0 20px;
            background: #f0f2f5;
        }

        .container {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 2rem;
        }

        .ticket-selector {
            background: #f8f9fa;
            padding: 1.5rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
        }

        .input-group {
            display: flex;
            align-items: center;
            margin: 1rem 0;
        }

        label {
            flex: 1;
            color: #34495e;
            font-weight: bold;
        }

        input[type="number"] {
            width: 70px;
            padding: 8px;
            border: 2px solid #bdc3c7;
            border-radius: 5px;
            text-align: center;
        }

        .price-display {
            background: #3498db;
            color: white;
            padding: 1.5rem;
            border-radius: 10px;
            margin: 1.5rem 0;
            text-align: center;
        }

        .payment-form {
            display: grid;
            gap: 1rem;
        }

        input[type="text"], input[type="number"], input[type="month"] {
            padding: 12px;
            border: 2px solid #bdc3c7;
            border-radius: 8px;
            width: 100%;
            box-sizing: border-box;
        }

        button {
            background: #27ae60;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.1rem;
            cursor: pointer;
            transition: transform 0.2s, background 0.2s;
            width: 100%;
        }

        button:hover {
            background: #219a52;
            transform: scale(1.02);
        }

        .confirmation {
            text-align: center;
            padding: 2rem;
            background: #2ecc71;
            color: white;
            border-radius: 10px;
            display: none;
        }

        .confirmation h2 {
            margin: 0 0 1rem 0;
        }

        .ticket-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎬 CineMagic Theater Checkout</h1>
        
        <div class="ticket-selector">
            <h3>Select Your Tickets</h3>
            <div class="input-group">
                <label>Adult Tickets ($15):</label>
                <input type="number" id="adultTickets" min="0" value="1">
            </div>
            <div class="input-group">
                <label>Child Tickets ($10):</label>
                <input type="number" id="childTickets" min="0" value="0">
            </div>
        </div>

        <div class="price-display">
            <h3>Total Price</h3>
            <p>Subtotal: $<span id="subtotal">15.00</span></p>
            <p>Tax (8%): $<span id="tax">1.20</span></p>
            <p>Total: $<span id="total">16.20</span></p>
        </div>

        <div class="payment-form">
            <h3>Payment Information</h3>
            <input type="text" placeholder="Cardholder Name" id="cardName">
            <input type="text" placeholder="Card Number" id="cardNumber" 
                   pattern="[0-9\s]{13,19}" inputmode="numeric">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <input type="month" placeholder="MM/YY" id="expDate">
                <input type="number" placeholder="CVV" id="cvv">
            </div>
        </div>

        <button onclick="processPayment()">Confirm Purchase</button>

        <div class="confirmation" id="confirmation">
            <div class="ticket-icon">🎟️</div>
            <h2>Enjoy the Show!</h2>
            <p>Your tickets have been successfully purchased!</p>
            <p>A confirmation email is on its way.</p>
        </div>
    </div>

    <script>
        function calculateTotal() {
            const adultPrice = 15;
            const childPrice = 10;
            const taxRate = 0.08;

            const adults = parseInt(document.getElementById('adultTickets').value) || 0;
            const children = parseInt(document.getElementById('childTickets').value) || 0;

            const subtotal = (adults * adultPrice) + (children * childPrice);
            const tax = subtotal * taxRate;
            const total = subtotal + tax;

            document.getElementById('subtotal').textContent = subtotal.toFixed(2);
            document.getElementById('tax').textContent = tax.toFixed(2);
            document.getElementById('total').textContent = total.toFixed(2);
        }

        function processPayment() {
        
            const cardName = document.getElementById('cardName').value;
            const cardNumber = document.getElementById('cardNumber').value;
            
            if(!cardName || !cardNumber) {
                alert('Please fill in all payment details');
                return;
            }

            
            document.getElementById('confirmation').style.display = 'block';
            document.querySelector('.payment-form').style.display = 'none';
            document.querySelector('button').style.display = 'none';
            
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }


        document.getElementById('adultTickets').addEventListener('change', calculateTotal);
        document.getElementById('childTickets').addEventListener('change', calculateTotal);
    </script>
</body>
</html>
