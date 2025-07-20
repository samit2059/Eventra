const searchInputField = document.getElementById('searchValue');
const searchButton = document.getElementById('search');
//   const currentSearchValue = searchInputField.value.toLowerCase().trim(); // Use a clear variable name
searchButton.addEventListener('click', () => {
    console.log('Search button clicked');
    const searchValue = searchInputField.value.toLowerCase().trim();
    // If the search input is empty, display all events.
    if (searchValue === '') {
        displayEvents();
        console.log('search bar is empty')
        return; // Exit the function
    }
    fetch('list.json')
        .then((response) => {
            if (!response.ok)
                console.log(response);
            return response.json();
        })
        .then((data1) => {
            const events = document.getElementById('events')
            events.innerHTML = '';
            let resultsFound = false;
            console.log('data loaded for search');
            // console.log(searchInputField)
            console.log(`searchValue: ${searchValue}`);

            data1.forEach((data) => {
                if (data.tag.toLowerCase().includes(searchValue) || data.name.toLowerCase().includes(searchValue)) {
                    resultsFound = true;
                    console.log(data.tag)
                    console.log(`Match found: Tag="${data.tag}", Name="${data.name}"`);

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
                }
                console.log('tag unloaded');
            });
            if (!resultsFound) {
                events.innerHTML = '<p style="text-align: center; margin-top: 50px; color: #555;">No events found matching your search.</p>';
                // setTimeout(() => {
                //     events.innerHTML = '';
                //     displayEvents();
                // }, 5000);
            }
        })

        .catch((error) => {
            console.error('Error during search data processing:', error);
            document.getElementById('events').innerHTML = '<p style="text-align: center; margin-top: 50px; color: red;">Error processing search results.</p>';
        });
});
