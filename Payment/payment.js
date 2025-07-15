console.log("Loading to Payment facilities");
const processBtn = document.getElementById('process');
const EsewaBtn = document.getElementById('esewa-btn');
const ticket = document.getElementsByClassName('ticket-container')[0];
const Confirmation = document.getElementsByClassName('confirmation-box')[0];
const payment = document.getElementsByClassName('payment-container')[0];
processBtn.addEventListener('click', (e) =>{
    e.preventDefault();
    console.log("ProcessBtn")
  // Check if the element exists before trying to access its style
        ticket.style.display = 'none';
        payment.style.display = 'block';
        Confirmation.style.display = 'none'; 
});
EsewaBtn.addEventListener('click', (e)=>{
    e.preventDefault();
    console.log('EsewaBtn clicked');
    ticket.style.display = 'none';
    payment.style.display = 'none';
    Confirmation.style.display = 'block'; 
})
  function updateTotal() {
      const quantity = document.getElementById("quantity").value;
      const total = 1000 * parseInt(quantity || 1);
      document.getElementById("total").innerText = "Total: NPR " + total;
    }