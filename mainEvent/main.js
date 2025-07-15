// const initApp = () => {
//     // get data product
//     fetch('list.json')
//     .then(response => response.json())
//     .then(data => {
//         products = data;
//         addDataToHTML();

//         // get data cart from memory
//         if(localStorage.getItem('cart')){
//             cart = JSON.parse(localStorage.getItem('cart'));
//             addCartToHTML();
//         }
//     })
// }
// initApp();

function displayEvents() {
    fetch('list.json')
        .then((response) => {
            if (!response.ok)
                console.log(response);
            return response.json();
        })
        .then((data1) => {
            const events = document.getElementById('events')
            events.innerHTML = '';

            data1.forEach((data) => {
                const li = document.createElement('li');
                li.innerHTML = `<div class="card" style="width: 18rem; margin:20px 20px 0 0; border-radius: 10px position: relative;" >
<div class='card-head' style="position: relative">
  <a href='../mainEvent/eventdetail.html'><img src='${data.photo}' class="card-img-top" alt="..." width='100' height = '250' style="object-fit: cover;"></a>
  <div style="border:1px solid black; position: absolute; bottom: 5%; left: 60%; transform: translate(0, -50%);white-space: nowrap; "><a href = "#" class= "btn btn rounded-4 mx-0"style="position: absolute; background-color:orange; font-size: 14px">${data.tag}</a></div>
</div>
  <div class="card-body">
    <h5 class="card-title" style="color: rgba(17, 13, 8, 0.712);">${data.name}</h5>
    <div style="padding: 0 0px; align-items: center; justify-content: left; display: flex;"><span class="material-symbols-outlined" style="color: #30b964ff">calendar_month</span><span style="font-size: 12px">${data.date}</span></div>
    <p class="card-text"style="font-size: 12px"><img src="../images/looc1.png" alt="none" style="background-color:transparent; ">:${data.location}</p>
    <div style="font-size: 14px">Buy:<a href="../Payment/payment.html" class="btn btn-success  rounded-3 mx-2 " >Rs .${data.price}</a></div>
  </div>
</div>`
                events.appendChild(li);
            })
        })
        .catch((error) => {
            console.log(error);
        })
}

displayEvents();