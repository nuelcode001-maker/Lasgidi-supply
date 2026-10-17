// ===================================
// LASGIDI SUPPLY - PRODUCT COLLECTION
// ===================================

const products = [
  {
    id: 1,
    type: "tops",
    name: "Lagos Oversized Tee",
    category: "Heavyweight Cotton",
    price: 18000,
    tag: "BEST SELLER",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 2,
    type: "tops",
    name: "Street Culture Hoodie",
    category: "Premium Fleece",
    price: 35000,
    tag: "NEW DROP",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 3,
    type: "tops",
    name: "Everyday Street Tee",
    category: "Relaxed Fit",
    price: 15000,
    tag: "ESSENTIAL",
    image:
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=700&q=85",
  },
  {
    id: 4,
    type: "outerwear",
    name: "Urban Utility Jacket",
    category: "Street Collection",
    price: 45000,
    tag: "LIMITED",
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85",
  },
];

// ===================================
// DISPLAY PRODUCTS
// ===================================

const productGrid = document.getElementById("product-grid");

function formatPrice(price) {
  return "₦" + price.toLocaleString("en-NG");
}

function displayProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
            <div class="product-image">
                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >
                <span class="product-tag">${product.tag}</span>
            </div>

            <div class="product-info">
                <div>
                    <h3>${product.name}</h3>
                    <p>${product.category}</p>
                </div>

                <span class="product-price">
                    ${formatPrice(product.price)}
                </span>
            </div>

           <select class="size-select" aria-label="Choose size">
    <option value="">Choose your size</option>
    <option value="S">Small (S)</option>
    <option value="M">Medium (M)</option>
    <option value="L">Large (L)</option>
    <option value="XL">Extra Large (XL)</option>
</select>

<button class="add-button" data-product-id="${product.id}">
    ORDER ON WHATSAPP ↗
</button>
        </article>
    `,
    )
    .join("");
}

displayProducts();

// ===================================
// WHATSAPP ORDERING
// ===================================

// Replace with the real business WhatsApp number.
// Use country code and number only, without + or spaces.
const whatsappNumber = "2349135745543";

productGrid.addEventListener("click", function (event) {
  const button = event.target.closest(".add-button");

  if (!button) {
    return;
  }

  const productId = Number(button.dataset.productId);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return;
  }

  // Get the selected size
  const productCard = button.closest(".product-card");
  const sizeSelect = productCard.querySelector(".size-select");
  const selectedSize = sizeSelect ? sizeSelect.value : "";

  // Require the customer to select a size
  if (!selectedSize) {
    alert("Please choose your clothing size first!");
    return;
  }

  // Demo website notice
  if (whatsappNumber === "2349135745543") {
    alert(
      "This is a demo website! A real business WhatsApp number needs to be added before orders can be sent.",
    );
    return;
  }

  // Create the order message
  const message =
    `Hello LASGIDI SUPPLY! I'd like to order:\n\n` +
    `Product: ${product.name}\n` +
    `Price: ${formatPrice(product.price)}\n` +
    `Size: ${selectedSize}\n\n` +
    `Please let me know the available colours.`;

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
// ===================================
// PRODUCT CATEGORY FILTERS
// ===================================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    // Highlight the selected button
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    // Show products matching the selected category
    const filteredProducts =
      selectedFilter === "all"
        ? products
        : products.filter((product) => product.type === selectedFilter);

    productGrid.innerHTML = filteredProducts
      .map(
        (product) => `
            <article class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    <span class="product-tag">${product.tag}</span>
                </div>

                <div class="product-info">
                    <div>
                        <h3>${product.name}</h3>
                        <p>${product.category}</p>
                    </div>
                    <span class="product-price">${formatPrice(product.price)}</span>
                </div>

                <button class="add-button" data-product-id="${product.id}">
                    ORDER ON WHATSAPP ↗
                </button>
            </article>
        `,
      )
      .join("");
  });
});
