document.addEventListener("DOMContentLoaded", function () {
    // Indian Menu
    const indianVegMenu = [
        { name: "Paneer Butter Masala", price: "$10", img: "Assets_of_Restro/paneer.jpg" },
        { name: "Dal Makhani", price: "$8", img: "Assets_of_Restro/dal_makhani.jpg" },
        { name: "Butter Naan", price: "$3", img: "Assets_of_Restro/naan.jpg" },
        { name: "Pizza", price: "$15", img: "Assets_of_Restro/pizza.jpg" },
        { name: "Pasta", price: "$12", img: "Assets_of_Restro/pasta.jpg" },
        { name: "Salad", price: "$10", img: "Assets_of_Restro/salad.jpg" },
        { name: "Soup", price: "$8", img: "Assets_of_Restro/soup.jpg" }
    ];
    const indianNonVegMenu = [
        { name: "Chicken Tikka", price: "$12", img: "Assets_of_Restro/chicken_tikka.jpg" }
    ];

    // Chinese Menu
    const chineseVegMenu = [
        { name: "Veg Manchurian", price: "$9", img: "Assets_of_Restro/veg_manchurian.jpg" },
        { name: "Hakka Noodles", price: "$8", img: "Assets_of_Restro/hakka_noodles.jpg" },
        { name: "Chilli Paneer", price: "$10", img: "Assets_of_Restro/chilli_paneer.jpg" },
        { name: "Spring Rolls", price: "$7", img: "Assets_of_Restro/spring_rolls.jpg" },
        { name: "Schezwan Fried Rice", price: "$9", img: "Assets_of_Restro/schezwan_fried_rice.jpg" }
    ];
    const chineseNonVegMenu = [
        { name: "Chicken Lollipop", price: "$11", img: "Assets_of_Restro/chicken_lollipop.jpg" }
    ];

    function renderMenu(menuArray, containerId) {
        const container = document.getElementById(containerId);
        menuArray.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("menu-item");
            div.innerHTML = `
                <img src="${item.img}" alt="${item.name}" class="menu-img">
                <h3>${item.name}</h3>
                <p class="menu-price">${item.price}</p>
            `;
            // Add click event to open order modal
            div.addEventListener("click", function() {
                orderModal.classList.add("active");
                document.getElementById("orderProductName").textContent = `Order: ${item.name}`;
                document.getElementById("orderProduct").value = item.name;
                document.getElementById("orderProductImg").src = item.img;
                document.getElementById("orderProductImg").alt = item.name;
                document.getElementById("orderConfirmation").textContent = "";
                document.getElementById("orderForm").reset();
            });
            container.appendChild(div);
        });
    }

    renderMenu(indianVegMenu, "indian-veg-menu");
    renderMenu(indianNonVegMenu, "indian-nonveg-menu");
    renderMenu(chineseVegMenu, "chinese-veg-menu");
    renderMenu(chineseNonVegMenu, "chinese-nonveg-menu");

    // Reservation Form Submission
    document.getElementById("reservationForm").addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const mobile = document.getElementById("mobile").value;
        const address = document.getElementById("address").value;
        const persons = document.getElementById("persons").value;
        const date = document.getElementById("date").value;

        if (name && mobile && address && persons && date) {
            document.getElementById("confirmationMessage").textContent =
                `Table reserved for ${name} (${mobile}), ${persons} person(s) at ${address} on ${date}!`;
        }
    });

    // Hamburger menu functionality
    const menuToggle = document.getElementById("menuToggle");
    const navbar = document.getElementById("navbar");
    menuToggle.addEventListener("click", function () {
        navbar.classList.toggle("active");
    });

    // Order Modal logic
    const orderModal = document.getElementById("orderModal");
    const closeOrderModal = document.getElementById("closeOrderModal");
    closeOrderModal.addEventListener("click", function() {
        orderModal.classList.remove("active");
    });
    window.addEventListener("click", function(event) {
        if (event.target === orderModal) {
            orderModal.classList.remove("active");
        }
    });
    document.getElementById("orderForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const product = document.getElementById("orderProduct").value;
        const name = document.getElementById("orderName").value;
        const mobile = document.getElementById("orderMobile").value;
        const altMobile = document.getElementById("orderAltMobile").value;
        const address = document.getElementById("orderAddress").value;
        const qty = document.getElementById("orderQty").value;
        document.getElementById("orderConfirmation").textContent =
            `Thank you, ${name}! Your order for ${qty} ${product}(s) has been placed. We will contact you at ${mobile}${altMobile ? " or " + altMobile : ""} and deliver to: ${address}`;
        setTimeout(() => {
            orderModal.classList.remove("active");
        }, 2500);
    });

    // Login Modal Logic
    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const closeLoginModal = document.getElementById("closeLoginModal");
    const showCreateAccount = document.getElementById("showCreateAccount");
    const createAccountModal = document.getElementById("createAccountModal");
    const closeCreateAccountModal = document.getElementById("closeCreateAccountModal");

    loginBtn.addEventListener("click", function () {
        loginModal.classList.add("active");
    });
    closeLoginModal.addEventListener("click", function () {
        loginModal.classList.remove("active");
    });
    showCreateAccount.addEventListener("click", function () {
        loginModal.classList.remove("active");
        createAccountModal.classList.add("active");
    });
    closeCreateAccountModal.addEventListener("click", function () {
        createAccountModal.classList.remove("active");
    });
    window.addEventListener("click", function(event) {
        if (event.target === loginModal) loginModal.classList.remove("active");
        if (event.target === createAccountModal) createAccountModal.classList.remove("active");
    });

    // Dummy login/signup handlers
    document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();
        document.getElementById("loginMessage").textContent = "Login successful! (Demo only)";
        setTimeout(() => loginModal.classList.remove("active"), 1200);
    });
    document.getElementById("createAccountForm").addEventListener("submit", function(e) {
        e.preventDefault();
        document.getElementById("signupMessage").textContent = "Account created! (Demo only)";
        setTimeout(() => createAccountModal.classList.remove("active"), 1200);
    });
});