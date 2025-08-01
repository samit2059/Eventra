// Helper: Generate UUID (unique transaction ID)
function generateUUID() {
  return 'xxxxxxxyxxxy4xxxyxxxyxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    return r.toString(16);
  });
}

// Update total and form fields
const quantityInput = document.getElementById('quantity');
const totalDisplay = document.getElementById('total');
const amountField = document.getElementById('amount');
const totalAmountField = document.getElementById('total_amount');
const transactionUUIDField = document.getElementById('transaction_uuid');
const signatureField = document.getElementById('signature');
const payBtn = document.getElementById('payBtn');

const PRICE_PER_TICKET = 500;

// Update price and signature on quantity change
quantityInput.addEventListener('input', () => {
  const quantity = parseInt(quantityInput.value) || 1;
  const total = quantity * PRICE_PER_TICKET;

  totalDisplay.innerText = total;
  amountField.value = total;
  totalAmountField.value = total;
});

// Handle eSewa payment logic
payBtn.addEventListener('click', () => {
  const uuid = generateUUID();
  transactionUUIDField.value = uuid;

  const totalAmount = totalAmountField.value;

  const signedData = `total_amount=${totalAmount},transaction_uuid=${uuid},product_code=EPAYTEST`;

  // Sign it using SHA256 (CryptoJS must be loaded)
  const hash = CryptoJS.SHA256(signedData).toString();
  signatureField.value = hash;

  // Now submit form
  document.getElementById('esewaForm').submit();
});
