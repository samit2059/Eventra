/**
 * Safely parses JSON from localStorage or returns a default value.
 */
function safeJSONParse(key, defaultValue = {}) {
    try {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;
        const parsed = JSON.parse(item);
        if (defaultValue !== null && typeof defaultValue === 'object' && !Array.isArray(defaultValue)) {
             if (Array.isArray(parsed) || typeof parsed !== 'object') return defaultValue;
        }
        return parsed;
    } catch (e) {
        console.error(`Error parsing localStorage key "${key}":`, e);
        return defaultValue;
    }
}

async function displayEvents() {
    const eventsContainer = document.getElementById('events');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = '';

    let allEvents = [];
    try {
        const response = await fetch('/mainEvent/list.json');
        if (response.ok) {
            const data = await response.json();
            allEvents = data;
        }
    } catch (e) {
        console.error('Failed to load list.json:', e);
    }

    const customEvents = safeJSONParse('hostedEvents', []);
    allEvents = [...allEvents, ...customEvents];
    window.masterEventList = allEvents;
    renderCards(allEvents);
}

function renderCards(eventArray) {
    const eventsContainer = document.getElementById('events');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = '';

    if (!Array.isArray(eventArray) || eventArray.length === 0) {
        eventsContainer.innerHTML = '<div class="error-msg"><i class="fa fa-calendar-times-o" style="font-size:30px; margin-bottom: 15px; color:#ddd;"></i><br>No events available.</div>';
        return;
    }

    eventArray.forEach((data) => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'event-card';
        cardDiv.innerHTML = `
            <div class="card-image-wrapper">
                <span class="card-tag">${data.tag || data.category}</span>
                <a href="eventdetail.html?name=${encodeURIComponent(data.name)}"><img src="${data.photo || '../images/Main_carnival.jpg'}" alt="${data.name}" style="width: 100%; height: 200px; object-fit: cover;" onerror="this.src='../images/Main_carnival.jpg'"></a>
            </div>
            <div class="card-content">
                <h3>${data.name}</h3>
                <div class="card-info">
                    <i class="fa fa-calendar"></i>
                    <span>${data.date}</span>
                </div>
                <div class="card-info" style="margin-bottom: 20px;">
                    <i class="fa fa-map-marker"></i>
                    <span>${data.location}</span>
                </div>
                <div class="card-footer">
                    <span class="price">Rs. ${data.price || '500'}</span>
                    <a href="../Payment/payment.html?name=${encodeURIComponent(data.name)}&price=${encodeURIComponent(data.price || '500')}&date=${encodeURIComponent(data.date)}" class="buy-btn">Buy Ticket</a>
                </div>
            </div>
        `;
        eventsContainer.appendChild(cardDiv);
    });
}

displayEvents();

const searchInputField = document.getElementById('searchValue');
const searchButton = document.getElementById('search');

if (searchInputField && searchButton) {
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        const searchValue = searchInputField.value.toLowerCase().trim();

        if (searchValue === '') {
            renderCards(window.masterEventList);
            return;
        }

        const filtered = (window.masterEventList || []).filter(data => {
            const nameMatch = (data.name || '').toLowerCase().includes(searchValue);
            const tagMatch  = (data.tag || data.category || '').toLowerCase().includes(searchValue);
            const locMatch  = (data.location || '').toLowerCase().includes(searchValue);
            return nameMatch || tagMatch || locMatch;
        });

        if (filtered.length > 0) {
            renderCards(filtered);
        } else {
            const eventsContainer = document.getElementById('events');
            if (eventsContainer) {
                eventsContainer.innerHTML = '<div class="error-msg"><i class="fa fa-search" style="font-size:30px; margin-bottom: 15px; color:#ddd;"></i><br>No events found matching your search.</div>';
                setTimeout(() => {
                    renderCards(window.masterEventList);
                    searchInputField.value = '';
                }, 3000);
            }
        }
    });
}

function updateGlobalNavbar() {
    const activeUser = safeJSONParse('activeUser', null);
    const allNavLogins = document.querySelectorAll('.login-btn');

    allNavLogins.forEach(btn => {
        if (activeUser && activeUser.username) {
            btn.innerHTML = `<i class="fa fa-user-circle"></i> Hi, ${activeUser.username}`;
            btn.href = "../mainEvent/profile.html";
            btn.style.background = "var(--secondary)";
        } else {
            btn.innerHTML = `<i class="fa fa-user"></i> Login`;
            btn.href = "../ASign-InPage/index.html";
            btn.style.background = "var(--primary)";
        }
    });
}

updateGlobalNavbar();