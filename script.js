// PRINT MENU FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.querySelector("button.menu");

  if (menuButton) {
    menuButton.addEventListener("click", function () {
      // 1. Open print dialog with clean menu
      const printContent = document
        .querySelector(".list-table")
        .cloneNode(true);

      // 2. Remove search bar for print
      const searchBar = printContent.querySelector(".Search");
      if (searchBar) searchBar.remove();

      // 3. Get original colors and fonts from your page
      const rootStyles = getComputedStyle(document.documentElement);
      const primaryColor =
        rootStyles.getPropertyValue("--Primary-Color") || "rgb(255, 214, 221)";
      const secondaryColor =
        rootStyles.getPropertyValue("--Secondary-Color") || "palevioletred";
      const ctaColors =
        rootStyles.getPropertyValue("--CTA-colors") || "rgb(255, 241, 241)";
      const ctaColorHover =
        rootStyles.getPropertyValue("--CTA-color-hover") ||
        "rgb(255, 251, 251)";

      // 4. Create a print-friendly version with your exact styling
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <title>Bakery Menu</title>
                        <style>
                            @font-face {
                                font-family: 'Puffberry';
                                src: url('fonts/Puffberry-Demo.ttf') format('truetype');
                            }
                            
                            @font-face {
                                font-family: 'Cream-Cake';
                                src: url('fonts/Cream Cake.otf') format('opentype');
                            }
                            
                            @font-face {
                                font-family: 'Cream-Cake-Bold';
                                src: url('fonts/Cream Cake Bold.otf') format('opentype');
                            }
                            
                            * {
                                margin: 0;
                                padding: 0;
                                box-sizing: border-box;
                                font-family: 'Cream-Cake', sans-serif;
                                font-size: 20px;
                            }
                            
                            h1, h2, h3, h4, h5, h6 {
                                font-family: 'Puffberry', serif;
                                font-weight: 900;
                                line-height: 1.2;
                            }
                            
                            :root {
                                --Primary-Color: ${primaryColor};
                                --Secondary-Color: ${secondaryColor};
                                --CTA-colors: ${ctaColors};
                                --CTA-color-hover: ${ctaColorHover};
                            }
                            
                            body {
                                background-color: var(--CTA-colors);
                                padding: 40px;
                                max-width: 1000px;
                                margin: 0 auto;
                            }
                            
                            .list-table {
                                background-color: var(--CTA-colors);
                                padding: 30px;
                                width: 100%;
                                border-radius: 20px;
                                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                            }
                            
                            h2 {
                                text-align: center;
                                font-size: 40px;
                                color: var(--Secondary-Color);
                                padding: 15px 0;
                                margin-bottom: 30px;
                            }
                            
                            ul {
                                margin-bottom: 30px;
                                background-color: var(--CTA-color-hover);
                                padding: 20px;
                                border-radius: 15px;
                                list-style: none;
                            }
                            
                            ul h4 {
                                font-size: 28px;
                                color: var(--Secondary-Color);
                                padding-bottom: 10px;
                                border-bottom: 2px solid var(--Secondary-Color);
                                margin-bottom: 20px;
                            }
                            
                            .menu-item {
                                display: flex;
                                align-items: center;
                                gap: 20px;
                                margin-bottom: 20px;
                                padding-bottom: 20px;
                                border-bottom: 1px dashed var(--Secondary-Color);
                            }
                            
                            .menu-item:last-child {
                                border-bottom: none;
                                margin-bottom: 0;
                                padding-bottom: 0;
                            }
                            
                            .menu-item img {
                                width: 100px;
                                height: 100px;
                                object-fit: cover;
                                border-radius: 10px;
                                border: 2px solid var(--Primary-Color);
                                flex-shrink: 0;
                            }
                            
                            .item-details {
                                flex-grow: 1;
                            }
                            
                            .item-name {
                                font-size: 20px;
                                font-weight: bold;
                                color: #333;
                                margin-bottom: 5px;
                            }
                            
                            .item-description {
                                font-size: 14px;
                                color: #666;
                                margin-bottom: 8px;
                                line-height: 1.4;
                            }
                            
                            .item-price {
                                font-size: 18px;
                                font-weight: bold;
                                color: var(--Secondary-Color);
                                display: flex;
                                align-items: center;
                                gap: 3px;
                            }
                            
                            .item-price div {
                                font-size: 23px;
                                margin-bottom: 2px;
                            }
                            
                            .Breads, .Pastries, .Cookies, .Drinks {
                                margin-top: 20px;
                            }
                            
                            /* Print-specific optimizations */
                            @media print {
                                @page {
                                    margin: 20mm;
                                    size: A4;
                                }
                                
                                body {
                                    padding: 0;
                                    margin: 0;
                                    background-color: white !important;
                                    max-width: none;
                                }
                                
                                .list-table {
                                    background-color: white !important;
                                    box-shadow: none !important;
                                    border-radius: 0 !important;
                                    padding: 10px !important;
                                    page-break-inside: avoid;
                                }
                                
                                ul {
                                    page-break-inside: avoid;
                                    break-inside: avoid;
                                    background-color: #f9f9f9 !important;
                                }
                                
                                .menu-item {
                                    page-break-inside: avoid;
                                    break-inside: avoid;
                                }
                                
                                h4 {
                                    page-break-after: avoid;
                                    break-after: avoid;
                                }
                                
                                /* Prevent images from breaking across pages */
                                .menu-item img {
                                    max-height: 80px;
                                    page-break-inside: avoid;
                                }
                                
                                /* Ensure color contrast for printing */
                                h2, h4 {
                                    color: #d87093 !important; /* Slightly darker for print */
                                }
                                
                                .item-price {
                                    color: #d87093 !important;
                                }
                                
                                /* Hide non-essential elements in print */
                                .Search, .menu-button, .nav-bar, .reservation {
                                    display: none !important;
                                }
                            }
                        </style>
                    </head>
                    <body>
                        <div class="list-table">
                            ${printContent.innerHTML}
                        </div>
                        <div style="text-align: center; margin-top: 40px; font-size: 14px; color: #888;">
                            <p>Thank you for visiting our bakery! • ${new Date().toLocaleDateString()}</p>
                            <p style="margin-top: 10px;">Prices in FCFA • Subject to change</p>
                        </div>
                    </body>
                    </html>
                `);

      printWindow.document.close();

      // 5. Trigger print (user can choose "Save as PDF")
      setTimeout(() => {
        printWindow.print();
        printWindow.onafterprint = function () {
          setTimeout(() => {
            printWindow.close();
          }, 100);
        };
      }, 800); // Slightly longer delay to ensure fonts load
    });
  }
});

// SEARCH FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".Search");
  const allMenuItems = document.querySelectorAll(".menu-item");
  const allCategories = document.querySelectorAll(
    "ul.Breads, ul.Pastries, ul.Cookies, ul.Drinks",
  );
  const allCategoryHeaders = document.querySelectorAll("ul h4");

  // Fuzzy match function for close matches
  function fuzzyMatch(text, searchTerm) {
    if (!searchTerm) return false;

    const cleanText = text.toLowerCase().replace(/[^a-z0-9]/g, "");
    const cleanSearch = searchTerm.toLowerCase().replace(/[^a-z0-9]/g, "");

    // Exact match
    if (cleanText.includes(cleanSearch)) return true;

    // Partial match (at least 3 characters match in sequence)
    if (cleanSearch.length >= 3) {
      for (let i = 0; i <= cleanText.length - cleanSearch.length; i++) {
        let matchCount = 0;
        for (let j = 0; j < cleanSearch.length; j++) {
          if (cleanText[i + j] === cleanSearch[j]) {
            matchCount++;
          }
        }
        // If 70% of characters match, consider it a match
        if (matchCount >= cleanSearch.length * 0.7) return true;
      }
    }

    // Word-by-word match
    const searchWords = cleanSearch.split(" ");
    const textWords = cleanText.split(" ");
    let matchedWords = 0;

    for (const searchWord of searchWords) {
      for (const textWord of textWords) {
        if (textWord.includes(searchWord) && searchWord.length >= 3) {
          matchedWords++;
          break;
        }
      }
    }

    // If at least half the search words match
    return matchedWords >= Math.ceil(searchWords.length / 2);
  }

  // Search function
  function performSearch() {
    const searchTerm = searchInput.value.trim();
    let hasResults = false;

    // Reset all items and categories first
    allMenuItems.forEach((item) => {
      item.style.display = "flex";
    });

    allCategories.forEach((category) => {
      category.style.display = "block";
    });

    allCategoryHeaders.forEach((header) => {
      header.style.display = "block";
    });

    // If search is empty, show everything
    if (!searchTerm) {
      // Update result counter if exists
      const counter = document.querySelector(".search-counter");
      if (counter) counter.remove();
      return;
    }

    // Search through all items
    allMenuItems.forEach((item) => {
      const itemName = item.querySelector(".item-name").textContent;
      const itemDescription =
        item.querySelector(".item-description").textContent;

      // Check for matches in name or description
      const nameMatch = fuzzyMatch(itemName, searchTerm);
      const descMatch = fuzzyMatch(itemDescription, searchTerm);

      if (nameMatch || descMatch) {
        hasResults = true;
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });

    // Hide empty categories and their headers
    allCategories.forEach((category) => {
      const visibleItems = category.querySelectorAll(
        '.menu-item[style*="display: flex"]',
      );
      const categoryHeader = category.querySelector("h4");

      if (visibleItems.length === 0) {
        category.style.display = "none";
        if (categoryHeader) categoryHeader.style.display = "none";
      } else {
        category.style.display = "block";
        if (categoryHeader) categoryHeader.style.display = "block";
      }
    });

    // Show result counter
    showResultCounter(hasResults, searchTerm);
  }

  // Show result counter
  function showResultCounter(hasResults, searchTerm) {
    // Remove existing counter
    const existingCounter = document.querySelector(".search-counter");
    if (existingCounter) existingCounter.remove();

    if (!searchTerm) return;

    // Count visible items
    const visibleItems = document.querySelectorAll(
      '.menu-item[style*="display: flex"]',
    );

    // Create counter element
    const counter = document.createElement("div");
    counter.className = "search-counter";
    counter.style.cssText = `
            position: sticky;
            top: 130px;
            float: right;
            z-index: 100;
            background-color: var(--Secondary-Color);
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 15px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            animation: fadeIn 0.3s ease;
        `;

    if (visibleItems.length > 0) {
      counter.textContent = `Found ${visibleItems.length} item${visibleItems.length !== 1 ? "s" : ""} for "${searchTerm}"`;
      counter.style.backgroundColor = "var(--Secondary-Color)";
    } else {
      counter.textContent = `No results for "${searchTerm}". Try another search.`;
      counter.style.backgroundColor = "#ff6b6b";
    }

    // Insert after search input
    searchInput.insertAdjacentElement("afterend", counter);

    // Auto-hide after 3 seconds if no results
    if (visibleItems.length === 0) {
      setTimeout(() => {
        if (counter && document.body.contains(counter)) {
          counter.style.opacity = "0";
          counter.style.transition = "opacity 0.5s ease";
          setTimeout(() => {
            if (counter && document.body.contains(counter)) {
              counter.remove();
            }
          }, 500);
        }
      }, 3000);
    }
  }

  // Clear search function
  function clearSearch() {
    searchInput.value = "";
    performSearch();
  }

  const clearButton = document.querySelector(".clear-search");
  clearButton.addEventListener("click", clearSearch);

  // Event listeners
  searchInput.addEventListener("input", function () {
    clearButton.style.opacity = this.value ? "1" : "0.3";
    performSearch();
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      performSearch();
    }
  });

  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .menu-item {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .menu-item[style*="display: flex"] {
            animation: fadeIn 0.4s ease;
        }
        
        .clear-search:hover {
            opacity: 1 !important;
            transform: scale(1.1);
        }
    `;
  document.head.appendChild(style);
});



// RESERVATION FORM FUNCTIONALITY

document.addEventListener("DOMContentLoaded", function () {
  // Get the elements
  const reserveButton = document.querySelector(".reservation");
  const closeButton = document.querySelector(".fa-close");
  const reservationSection = document.querySelector(".reservation-section");
  const reservationForm = document.getElementById("reservationForm");

  // function to open the reservation modal
  function openReservationModal() {
    reservationSection.style.display = "flex";
    document.body.style.overflow = "hidden";
    // For smooth animation
    setTimeout(() => {
      reservationSection.classList.add("active");
    }, 10);
  }

  //function to close the reservation modal
  function closeReservationModal() {
    reservationSection.classList.remove("active");
    // Wait for animation to finish before hiding
    setTimeout(() => {
      reservationSection.style.display = "none";
      document.body.style.overflow = "auto";
    }, 300);
  }

  // Event listener for Reserve Here button
  if (reserveButton) {
    reserveButton.addEventListener("click", openReservationModal);
  }

  // Event listener for close (X) button
  if (closeButton) {
    closeButton.addEventListener("click", closeReservationModal);
  }

  // Optional: Close modal when clicking outside the form
  if (reservationSection) {
    reservationSection.addEventListener("click", function (event) {
      if (event.target === reservationSection) {
        closeReservationModal();
      }
    });
  }

  // Optional: Close modal with Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && reservationSection.style.display === "flex") {
      closeReservationModal();
    }
  });


// FORM SUBMISSION FUNCTIONALITY (WhatsApp)
if (reservationForm) {
    reservationForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const datetime = document.getElementById('datetime').value;
        
        // Validation
        if (!name || !email || !phone || !datetime) {
            alert('Please fill in all fields');
            return;
        }
        
        // Format the date nicely
        const formattedDate = new Date(datetime).toLocaleString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        // Client's WhatsApp number
        const clientWhatsAppNumber = "237653120249";
        
        // Create WhatsApp message WITH PROPER ENCODING
        const message = `NEW BAKERY RESERVATION\n\n` +
               `Name: ${name}\n` +
               `Email: ${email}\n` +
               `Phone: ${phone}\n` +
               `Date & Time: ${formattedDate}\n\n` +
               `From: Sweet Crumbs Bakery Website`;
        
        // **FIXED: Use encodeURIComponent for the entire message**
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${clientWhatsAppNumber}?text=${encodedMessage}`;
        
        // Show confirmation and open WhatsApp
        if (confirm(`Reservation ready! Click OK to send to WhatsApp.\n\nName: ${name}\nDate: ${formattedDate}\n\nThis will open WhatsApp with your details.`)) {
            // Open WhatsApp in new tab
            window.open(whatsappUrl, '_blank');
            
            // Reset and close
            reservationForm.reset();
            closeReservationModal();
        }
    });
}
});