document.addEventListener("DOMContentLoaded", function () {
    // Indian Menu
    const indianVegMenu = [
        { name: "Paneer Butter Masala", price: "₹160", img: "Assets_of_Restro/paneer.jpg" },
        { name: "Dal Makhani", price: "₹160", img: "Assets_of_Restro/dal_makhani.jpg" },
        { name: "Aloo Gobi", price: "₹140", img: "Assets_of_Restro/aloo_gobi.jpg" },
        { name: "Palak Paneer", price: "₹140", img: "Assets_of_Restro/palak_paneer.jpg" },
        { name: "Chole Bhature", price: "₹120", img: "Assets_of_Restro/chole_bhature.jpg" },
        { name: "Veg Biryani", price: "₹160", img: "Assets_of_Restro/veg_biryani.jpg" },
        { name: "Malai Kofta", price: "₹140", img: "Assets_of_Restro/malai_kofta.jpg" },
        { name: "Jeera Rice", price: "₹80", img: "Assets_of_Restro/jeera_rice.jpg" },
        { name: "Butter Naan", price: "₹18", img: "Assets_of_Restro/naan.jpg" },
        { name: "Roti", price: "₹12", img: "Assets_of_Restro/roti.jpg" }
    ];
    const indianNonVegMenu = [
        { name: "Chicken Tikka", price: "₹260", img: "Assets_of_Restro/chicken_tikka.jpg" }
    ];

    // Chinese Menu
    const chineseVegMenu = [
        { name: "Veg Manchurian", price: "₹160", img: "Assets_of_Restro/veg_manchurian.jpg" },
        { name: "Hakka Noodles", price: "₹140", img: "Assets_of_Restro/hakka_noodles.jpg" },
        { name: "Chilli Paneer", price: "₹200", img: "Assets_of_Restro/chilli_paneer.jpg" },
        { name: "Chilli Potato", price: "₹140", img: "Assets_of_Restro/chilli_potato.jpg" },
        { name: "Spring Rolls", price: "₹160", img: "Assets_of_Restro/spring_rolls.jpg" },
        { name: "Schezwan Fried Rice", price: "₹180", img: "Assets_of_Restro/schezwan_fried_rice.jpg" }
    ];
    const chineseNonVegMenu = [
        { name: "Chicken Lollipop", price: "₹280", img: "Assets_of_Restro/chicken_lollipop.jpg" }
    ];

    // Continental Menu
    const continentalMenu = [
        { name: "Pizza", price: "₹99", img: "Assets_of_Restro/pizza.jpg" },
        { name: "Pasta", price: "₹150", img: "Assets_of_Restro/pasta.jpg" },
        { name: "Salad", price: "₹100", img: "Assets_of_Restro/salad.jpg" },
        { name: "Soup", price: "₹80", img: "Assets_of_Restro/soup.jpg" }
    ];

    // Drinks Menu
    const drinksMenu = [
        { name: "Masala Chai", price: "₹20", img: "Assets_of_Restro/masala_chai.jpg" },
        { name: "Cold Coffee", price: "₹60", img: "Assets_of_Restro/cold_coffee.jpg" },
        { name: "Fresh Lime Soda", price: "₹50", img: "Assets_of_Restro/lime_soda.jpg" },
        { name: "Mango Lassi", price: "₹80", img: "Assets_of_Restro/mango_lassi.jpg" },
        { name: "Soft Drink", price: "₹50", img: "Assets_of_Restro/soft_drink.jpg" }
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

    function renderMenuTable(menuArray, containerId) {
        const container = document.getElementById(containerId);
        let table = document.createElement("table");
        table.className = "menu-table";
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Dish</th>
                    <th>Price</th>
                    <th>Order</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;
        menuArray.forEach(item => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><img src="${item.img}" alt="${item.name}" class="menu-table-img"></td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td><button class="order-btn" data-name="${item.name}" data-img="${item.img}" data-price="${item.price}">Order</button></td>
            `;
            table.querySelector("tbody").appendChild(tr);
        });
        container.innerHTML = "";
        container.appendChild(table);

        // Add click event for order buttons
        container.querySelectorAll(".order-btn").forEach(btn => {
            btn.addEventListener("click", function() {
                orderModal.classList.add("active");
                document.getElementById("orderProductName").textContent = `Order: ${btn.dataset.name}`;
                document.getElementById("orderProduct").value = btn.dataset.name;
                document.getElementById("orderProductImg").src = btn.dataset.img;
                document.getElementById("orderProductImg").alt = btn.dataset.name;
                document.getElementById("orderConfirmation").textContent = "";
                document.getElementById("orderForm").reset();
            });
        });
    }

    renderMenuTable(indianVegMenu, "indian-veg-menu");
    renderMenuTable(indianNonVegMenu, "indian-nonveg-menu");
    renderMenuTable(chineseVegMenu, "chinese-veg-menu");
    renderMenuTable(chineseNonVegMenu, "chinese-nonveg-menu");
    renderMenuTable(continentalMenu, "continental-menu");
    renderMenuTable(drinksMenu, "drinks-menu");

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

    // Dummy user data for login validation (for demonstration)
    const users = [
        { name: "User One", username: "user1", mobile: "9999999999", address: "Address 1", password: "pass1" },
        { name: "User Two", username: "user2", mobile: "8888888888", address: "Address 2", password: "pass2" }
    ];

    // Login Form Submission
    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const username = this.querySelector('input[name="username"]').value.trim();
        const password = this.querySelector('input[name="password"]').value.trim();
        const loginMessage = document.getElementById("loginMessage");

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            loginMessage.style.color = "green";
            loginMessage.textContent = "Login successful!";
            // Proceed with login logic (e.g., close modal, set session, etc.)
        } else {
            loginMessage.style.color = "red";
            loginMessage.textContent = "Invalid username or password!";
        }
    });

    // Create Account Form Submission
    document.getElementById("createAccountForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const name = this.querySelector('input[name="name"]').value.trim();
        const username = this.querySelector('input[name="username"]').value.trim();
        const mobile = this.querySelector('input[name="mobile"]').value.trim();
        const address = this.querySelector('input[name="address"]').value.trim();
        const password = this.querySelector('input[name="password"]').value.trim();
        const signupMessage = document.getElementById("signupMessage");

        // Validation
        if (!name || !username || !mobile || !address || !password) {
            signupMessage.style.color = "red";
            signupMessage.textContent = "All fields are required!";
            return;
        }
        if (users.some(u => u.username === username)) {
            signupMessage.style.color = "red";
            signupMessage.textContent = "Username already exists!";
            return;
        }
        if (username.length < 3 || password.length < 3) {
            signupMessage.style.color = "red";
            signupMessage.textContent = "Username and password must be at least 3 characters!";
            return;
        }
        if (!/^[0-9]{10}$/.test(mobile)) {
            signupMessage.style.color = "red";
            signupMessage.textContent = "Enter a valid 10-digit mobile number!";
            return;
        }

        // Add new user
        users.push({ name, username, mobile, address, password });
        signupMessage.style.color = "green";
        signupMessage.textContent = "Account created successfully!";
        showProfilePic();
        setTimeout(() => {
            document.getElementById("createAccountModal").style.display = "none";
            signupMessage.textContent = "";
        }, 1000);
    });

    // Image Preview for Menu Items
    function enableImagePreview() {
        document.querySelectorAll('.menu-img, .menu-table-img').forEach(img => {
            img.addEventListener('click', function() {
                const src = this.src;
                const alt = this.alt;
                const modalImg = document.getElementById('modalImg');
                const modal = document.getElementById('imageModal');
                modalImg.src = src;
                modalImg.alt = alt;
                modal.classList.add('active');
            });
        });
        const imageModal = document.getElementById("imageModal");
        imageModal.addEventListener("click", function() {
            imageModal.classList.remove("active");
        });
    }

    enableImagePreview();
});