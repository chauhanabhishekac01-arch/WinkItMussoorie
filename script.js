if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker Registered!', reg))
      .catch(err => console.log('Service Worker registration failed:', err));
  });
}
let deferredPrompt;
const installContainer = document.getElementById('pwa-install-container');
const installBtn = document.getElementById('pwa-install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Show the install button container
  installContainer.style.display = 'block';

  installBtn.addEventListener('click', () => {
    // Hide our custom install UI
    installContainer.style.display = 'none';
    // Show the browser's install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      deferredPrompt = null;
    });
  });
});

// Hide the button if the app is successfully installed
window.addEventListener('appinstalled', (event) => {
  console.log('Wink It was installed.');
  installContainer.style.display = 'none';
});
document.addEventListener('DOMContentLoaded', () => {
    // --- INITIALIZATION ---
    if (!history.state) {
        history.replaceState({ page: 'grid' }, document.title, location.href);
    }

    // --- DOM ELEMENTS ---
    const collectionGrid = document.getElementById('collection-grid');
    const productGrid = document.getElementById('product-grid');
    const productSlider = document.getElementById('product-slider');
    const orderSidebar = document.getElementById('orderSidebar');
    const searchInput = document.getElementById('product-search');
    const clearSearch = document.getElementById('clear-search');
    const searchSuggestions = document.getElementById('search-suggestions');
    const cartPopup = document.getElementById('cart-popup');
    const custNameInput = document.getElementById('cust-name');
    const custAddressInput = document.getElementById('cust-address');
    const whatsappBtn = document.getElementById('checkout-whatsapp');
    const pgroupslider = document.getElementById('pgroupslider');
    const dateElement = document.getElementById('current-date');
    const countElement = document.getElementById('online-count');
    const counters = document.querySelectorAll('.counter');
    const splash = document.getElementById('splash-screen');
    const currentTheme = localStorage.getItem('theme');
    const checkbox = document.getElementById('checkbox');
     const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slider-wrapper img');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const serviceDots = document.querySelectorAll('.dota');
    const woodstockCheckbox = document.getElementById('woodstock-student');
    const itmCheckbox = document.getElementById('itm-student');
    const locationBtn = document.getElementById('location-btn');
    // --- WINK IT CONFIGUadc ---
    // These coordinates are set to the heart of Mussoorie (approx Kulri/Mall Rd area)
    const SHOP_COORDS = { lat: 30.4528, lon: 78.086151 }; // F33P+4FJ Mussoorie
    let currentDistance = 0; 
    let locationTagged = false; // Global variable to hold the calculated distance
    const body = document.body;

    // --- AUTO-PLAY CONFIGUadc ---
let autoPlayInterval;
let movingForward = true;
const scrollDelay = 5000; // 5 seconds

function startAutoPlay() {
    // Clear any existing interval to avoid speed-stacking
    stopAutoPlay(); 
    
    autoPlayInterval = setInterval(() => {
        if (movingForward) {
            // If at the last slide, switch to reverse
            if (currentIndex === slides.length - 1) {
                movingForward = false;
                moveSlide(-1);
            } else {
                moveSlide(1);
            }
        } else {
            // If at the first slide, switch to forward
            if (currentIndex === 0) {
                movingForward = true;
                moveSlide(1);
            } else {
                moveSlide(-1);
            }
        }
    }, scrollDelay);
}

function triggerHaptic() {
    // 1. Standard Android/Chrome vibration
    if (navigator.vibrate) {
        navigator.vibrate(40);
    } 
    // 2. iOS Workaround (requires iOS 18+)
    else {
        const hapticSwitch = document.createElement('input');
        hapticSwitch.type = 'checkbox';
        hapticSwitch.setAttribute('switch', ''); // The special iOS attribute
        hapticSwitch.style.display = 'none';
        document.body.appendChild(hapticSwitch);
        
        // Toggling this triggers the system haptic engine
        hapticSwitch.click(); 
        
        // Clean up
        setTimeout(() => hapticSwitch.remove(), 100);
    }
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// --- ATTACH STOP TRIGGERS ---
// If the user clicks a button, stop auto-scroll
[prevBtn, nextBtn].forEach(btn => {
    btn.addEventListener('click', () => {
        stopAutoPlay();
        // moveSlide is already called via your existing listeners
    });
});

woodstockCheckbox.addEventListener('change', () => {
    const display = document.getElementById('location-display');
    
    if (woodstockCheckbox.checked) {
        // Uncheck the other checkbox
        itmCheckbox.checked = false;

        // Disable and style the button
        locationBtn.disabled = true;
        locationBtn.classList.add('disabled-grey'); 
        
        locationTagged = true;
        firstLocationWord = "woodstock";
        custAddressInput.value = "Woodstock School, Mussoorie, 248179";
        display.innerText = "✅ Woodstock Student Applied";
    } else {
        // Re-enable the button
        locationBtn.disabled = false;
        locationBtn.classList.remove('disabled-grey');
        
        locationTagged = false;
        custAddressInput.value = "";
        display.innerText = "";
    }
    updateSidebar();
});

itmCheckbox.addEventListener('change', () => {
    const display = document.getElementById('location-display');
    
    if (itmCheckbox.checked) {
        // Uncheck the other checkbox
        woodstockCheckbox.checked = false;

        // Disable and style the button
        locationBtn.disabled = true;
        locationBtn.classList.add('disabled-grey'); 
        
        locationTagged = true;
        firstLocationWord = "itm";
        custAddressInput.value = "ITM Cantt, Char Dukan, Mussoorie, 248179";
        display.innerText = "✅ ITM Cantt Applied";
    } else {
        // Re-enable the button
        locationBtn.disabled = false;
        locationBtn.classList.remove('disabled-grey');
        
        locationTagged = false;
        custAddressInput.value = "";
        display.innerText = "";
    }
    updateSidebar();
});

// If the user swipes/drags, stop auto-scroll
slider.addEventListener('touchstart', stopAutoPlay);
slider.addEventListener('mousedown', stopAutoPlay);

// --- START THE CYCLE ---
startAutoPlay();

    // --- DATA ---
    const faqData = [
        { q: "1. I can't find my desired product?", a: "If your desired product was not in out catalogue, please feel free to 'REQUEST' it." },
        { q: "2. Can I specify the shop from which I want my products to be bought from?", a: "Yes! We shall buy the products or pick the purchased products from the shop and get them deliverd to your door step." },
        { q: "3. Do you sell these products?", a: "No, we don't sell any products as of now, we are just your delivery partner." },
        { q: "4. Can you run an errand for me?", a: "Maybe, errands like post, pick-drop, assistance can be provided for a little fee (We can run major errand till Dehradun, but price may vary.)." },
        { q: "5. Why should I book an homestay through you?", a: "We have a tie-up with hotel and homestays and the customers who book through us get a 5% discount. " },
        { q: "6. Will you charge for the carry bag?", a: "If the order is being delivered in our companies carry bag, rs 10 will be charges. If it's the normal carry bag no money for the same shall be charged." },
        { q: "7. Are Taxi and Scooty services available?", a: "Yes, the real value in booking through us is that we only connect you with the most reliable and high-quality services. We hand-pick partners who truly offer great value for your money and provide a warm sense of belonging that you won't find just anywhere." },
        { q: "8. What else services do you provide?", a: "At Wink It, we always encourage our cutomers to ask before they assume, the 'Request' button is a custom button for you to explore." },
        { q: "9. Who are you Collaborate Store?", a: "We have a wide variety of Collaboraters on of the most famouse are Omi's Sweets in Landour and Chacha ka Dhabba in Kulri." },
        { q: "10. Will the food be just as the images show?", a: "While the images provide you a general view of the product, we don't promise to deliver the exact thing shown in the images." },
        { q: "11. Know more about ordering veggies and fruits.", a: "The following clauses apply to <i>Fruits and Veggies</i> category.<br><b>1. Mandatory Inspection:</b> Please check the quality of fruits and veggies carefully when they arrive.<br><b>2. Confirmed Satisfaction:</b> Our delivery partner will wait for your confirmation before finalizing the drop-off.<br><b>3. No Post-Delivery Returns:</b> Acceptance of the order constitutes a final sale; no refunds or returns are available once the delivery is finalized.<br><i>Note: Prices of veggies and fruits might vary from the ones shown on the website.." },
        { q: "12. Where is The Fine Dine Deluxe restraunt?", a: "The Fine Dine is not a restraunt, the Fine Dine Deluxe is an experience where we deliver the meals from the restraunt which has good review for the added item.." }
    ];
    const collections = [
        { id: "gng", name: "Games and Gym",                         previews: ["gng.jpg"] },
        { id: "dp", name: "Discounted Items",                        previews: ["dp.jpg"] },
        { id: "bakery", name: "Cake Shop",                          previews: ["bakery.jpg"] },
        { id: "fined", name: "Fine Dine Deluxe",                     previews: ["fd.jpg"] },
        
        { id: "pahadoka", name: "Pahado Ka",                     previews: ["pklogo.jpg"] },
        /*{ id: "tou", name: "Taste of Uttarakhand",                     previews: ["gad.jpg"] },*/
        { id: "partneromi", name: "Omi's Sweets",                   previews: ["omi.jpg"] },
        { id: "partneromif", name: "Omi's Food",                    previews: ["omifo.jpg"] },
        { id: "tos", name: "Taste of South",                     previews: ["tos.jpg"] },
        { id: "aavi", name: "👑 Gift Store",                  previews: ["aavi.jpg"] },
        /*{ id: "garrison", name: "The Garrison",                     previews: ["glogo.jpg"] },*/
        { id: "beverages", name: "Drinks and Juices",               previews: ["dj.jpg"] },
        { id: "snacks", name: "Chips and Namkeens",                 previews: ["cn.jpg"] },
        { id: "biscuits", name: "Bakery and Biscuits",              previews: ["bb.jpg"] },
        { id: "chocolates", name: "Sweet and Chocolates",           previews: ["sc.jpg"] },
        { id: "instant", name: "Instant Food and Noodles",          previews: ["in.jpg"] },
        { id: "candies", name: "Candies",                           previews: ["c.jpg"] },
        { id: "fresh", name: "Fresh",                           previews: ["fresh.jpg"] },
        { id: "adc", name: "Aa, Dal, and Rice",                   previews: ["adr.jpg"] },
        { id: "dbm", name: "Dairy, Bread, and Milk",                previews: ["dbm.jpg"] },
        { id: "mo", name: "Masalas and Oils",                       previews: ["mo.jpg"] },
        { id: "bc", name: "Baby Care",                              previews: ["bc.jpg"] },
        { id: "fw", name: "Female Wellness",                        previews: ["fw.jpg"] },
        { id: "hair", name: "Hair",                                 previews: ["h.jpg"] },
        { id: "bnb", name: "Bath and Body",                         previews: ["bnb.jpg"] },
        { id: "face", name: "Face",                                 previews: ["f.jpg"] },
        { id: "g", name: "General",                                 previews: ["g.jpg"] },
        { id: "cleaningessentials", name: "Cleaners and Freshners", previews: ["cf.jpg"] },
        { id: "other", name: "Others", previews: ["cell.jpg"] },
        
        
        
        
        
    ];

    const products = [
/*Drink*/                
                         { id: 2,   name: "Bottle-Coca-Cola",                                                image: "dcokeb.jpg",            cat: "beverages",               subcat: "Cold Drink",                   selectedVariant: "S",          variants: { "S":        { price: 40, count: 0, unit: "750ml" }, "L": { price: 99, count: 0, unit: "2L" } } },
                         { id: 3,   name: "Sprite",                                                          image: "dsprite.jpg",           cat: "beverages",               subcat: "Cold Drink",                   selectedVariant: "S",          variants: { "S":        { price: 40, count: 0, unit: "750ml" }, "L": { price: 99, count: 0, unit: "2L" } } },
                         { id: 32,  name: "Can-Dite Coke",                                                   image: "dcoked.jpg",            cat: "beverages",               subcat: "Cold Drink",                   selectedVariant: "S",          variants: { "S":        { price: 40, count: 0, unit: "300ml" } } },
                         /*{ id: 33,  name: "Amul Badam Shakers",                                                   image: "bamulb.jpg",            cat: "beverages",               subcat: "Amul",                   selectedVariant: "S",          variants: { "S":        { price: 40, count: 0, unit: "200ml" } } },*/

/*Juice*/                { id: 4,  name: "Frooti Mango",                                                    image: "dfrooti.jpg",           cat: "beverages",               subcat: "Juices",                       selectedVariant: "S",          variants: { "S":        { price: 10, count: 0, unit: "150ml" }, "L": { price: 105, count: 0, unit: "2L" } } },
                         { id: 6,  name: "Real Fruit Power Orange Juice",                                   image: "drealo.jpg",            cat: "beverages",               subcat: "Juices",                       selectedVariant: "L",          variants: { "L":        { price: 125, count: 0, unit: "1L" } } },
                         { id: 7,  name: "Real Fruit Power Guava Juice",                                    image: "drealg.jpg",            cat: "beverages",               subcat: "Juices",                       selectedVariant: "L",          variants: { "L":        { price: 112, count: 0, unit: "1L" } } },
                         { id: 8,  name: "Real Fruit Power Litchi Juice",                                   image: "dreall.jpg",            cat: "beverages",               subcat: "Juices",                       selectedVariant: "L",          variants: { "L":        { price: 120, count: 0, unit: "1L" } } },

/*Energy Drink*/         { id: 9,  name: "Hell Classic",                                                    image: "dhellc.jpg",            cat: "beverages",               subcat: "Energy Drinks",                selectedVariant: "L",          variants: { "L":        { price: 60, count: 0, unit: "250ml" } } },    
                         /*{ id: 11,  name: "Hell Black Cherry",                                              image: "dhellbc.jpg",           cat: "beverages",               subcat: "Energy Drinks",                selectedVariant: "L",          variants: { "L":        { price: 60, count: 0, unit: "250ml" } } },*/
                         { id: 12,  name: "Red Bull",                                                       image: "dred.jpg",              cat: "beverages",               subcat: "Energy Drinks",                selectedVariant: "S",          variants: { "S":        { price: 125, count: 0, unit: "300ml" } } },
                         { id: 13,  name: "Monster Zero Sugar Ultra",                                       image: "dmonster.jpg",          cat: "beverages",               subcat: "Energy Drinks",                selectedVariant: "S",          variants: { "S":        { price: 125, count: 0, unit: "350ml" } } },
                         { id: 35,  name: "Monster Black",                                                  image: "bbm.jpg",               cat: "beverages",               subcat: "Energy Drinks",                selectedVariant: "S",          variants: { "S":        { price: 125, count: 0, unit: "350ml" } } },

/*Mogu Mogu*/            { id: 14,  name: "Strawberry Fruit Drink",                                         image: "dmogus.jpg",            cat: "beverages",                subcat: "Mogu Mogu",                   selectedVariant: "S",          variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 15,  name: "Lychee Fruit Drink with Nata De Coco",                           image: "dmogul.jpg",            cat: "beverages",                subcat: "Mogu Mogu",                   selectedVariant: "S",          variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 16,  name: "Blackcurrant Drink with Nata De Coco",                           image: "dmogub.jpg",            cat: "beverages",                subcat: "Mogu Mogu",                   selectedVariant: "S",          variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 17,  name: "Grape Fruit Drink with Nata De Coco",                            image: "dmogug.jpg",            cat: "beverages",                subcat: "Mogu Mogu",                   selectedVariant: "S",          variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 18,  name: "Mango Drink",                                                    image: "dmogum.jpg",            cat: "beverages",                subcat: "Mogu Mogu",                   selectedVariant: "S",          variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 19,  name: "Melon Fruit Drink with Nata De Coco",                            image: "dmogumelon.jpg",        cat: "beverages",                subcat: "Mogu Mogu",                   selectedVariant: "S",          variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 20,  name: "Pineapple Fruit Drink",                                          image: "dmogup.jpg",            cat: "beverages",                subcat: "Mogu Mogu",                   selectedVariant: "S",          variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },


/*Milk*/                 { id: 21,  name: "Amul Kool Kesar",                                                image: "damulk.jpg",            cat: "beverages",                subcat: "Amul",                        selectedVariant: "S",          variants: { "S":        { price: 25, count: 0, unit: "180ml" } } },
                         { id: 22,  name: "Amul Masti Spiced Salted Buttermilk",                            image: "damulc.jpg",            cat: "beverages",                subcat: "Amul",                        selectedVariant: "S",          variants: { "S":        { price: 15, count: 0, unit: "200ml" } } },
                         { id: 23,  name: "Amul Lassi",                                                     image: "damull.jpg",            cat: "beverages",                subcat: "Amul",                        selectedVariant: "S",          variants: { "S":        { price: 25, count: 0, unit: "200ml" } } },
                 
/*Water*/                { id: 24,  name: "Mineral Water",                                                  image: "dwater.jpg",            cat: "beverages",                subcat: "Water & Soda",                selectedVariant: "S",          variants: { "S":        { price: 20, count: 0, unit: "1L" }, "L": { price: 80, count: 0, unit: "5L" } } },
                         { id: 25,  name: "Schweppes Indian Tonic Water",                                   image: "dschweppesi.jpg",       cat: "beverages",                subcat: "Water & Soda",                selectedVariant: "S",          variants: { "S":        { price: 70, count: 0, unit: "300ml" } } },
                         { id: 26,  name: "Schweppes - Ginger Ale ",                                        image: "dsga.jpg",              cat: "beverages",                subcat: "Water & Soda",                selectedVariant: "S",          variants: { "S":        { price: 70, count: 0, unit: "300ml" } } },
                         { id: 27,  name: "Bisleri Soda",                                                   image: "dbsoda.jpg",            cat: "beverages",                subcat: "Water & Soda",                selectedVariant: "S",          variants: { "S":        { price: 20, count: 0, unit: "750ml" } } },
                         
            
/*Cadbury*/             { id: 2001, name: "Cadbury Dairy Milk Crackle Milk",                                image: "ccadburyc.jpg",         cat: "chocolates",               subcat: "Cadbury",                     selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 50, count: 0, unit: "36g" } } },
                        { id: 2002, name: "Cadbury Dairy Milk Fruit and Nut",                               image: "chfruitnnut.jpg",       cat: "chocolates",               subcat: "Cadbury",                     selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 107, count: 0, unit: "75g" } } },     
                        /*{ id: 2003, name: "Cadbury Dairy Milk Roast Almond Milk",                           image: "chfruitnnut.jpg",       cat: "chocolates",               subcat: "Cadbury",                     selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 50, count: 0, unit: "36g" } } },     */
                        /*{ id: 2004, name: "Cadbury Lickables",                                              image: "clickables.jpg",        cat: "chocolates",               subcat: "Cadbury",                     selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 45, count: 0, unit: "20g" } } },*/
                        { id: 2005, name: "Cadbury Nutties",                                                image: "cnutties.jpg",          cat: "chocolates",               subcat: "Cadbury",                     selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 50, count: 0, unit: "30g" } } },
                        { id: 2006, name: "Cadbury Dairy Milk Crispello Milk",                              image: "chcrispello.jpg",       cat: "chocolates",               subcat: "Cadbury",                     selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 40, count: 0, unit: "35g" } } },
                        { id: 2007, name: "Cadbury Fuse Peanut and Caramel",                                image: "chfuse.jpg",            cat: "chocolates",               subcat: "Cadbury",                     selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 50, count: 0, unit: "43g" } } },

                        

/*Amul*/                { id: 2008, name: "Amul Dark Chocolate",                                            image: "chdc.jpg",              cat: "chocolates",               subcat: "Amul",                        selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 200, count: 0, unit: "150g" } } },
                        { id: 2037, name: "Amul Fruit n Nut",                                               image: "acfn.jpg",              cat: "chocolates",               subcat: "Amul",                        selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 200, count: 0, unit: "150g" } } },
                        { id: 2009, name: "Amul Smooth and Creamy Milk",                                    image: "camulsc.jpg",           cat: "chocolates",               subcat: "Amul",                        selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 160, count: 0, unit: "125g" } } },
                        { id: 2010, name: "Amul Belgian Smooth and Creamy Milk",                            image: "camulbc.jpg",           cat: "chocolates",               subcat: "Amul",                        selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 180, count: 0, unit: "150g" } } },
                        { id: 2011, name: "Amul Velvett",                                                   image: "chvelvett.jpg",         cat: "chocolates",               subcat: "Amul",                        selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 50, count: 0, unit: "35g" } } },

/*Hershey's*/           /*{ id: 2012, name: "Hershey's Kisses Milk Pack",                                     image: "ckissesmc.jpg",         cat: "chocolates",               subcat: "Hershey's",                   selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 65, count: 0, unit: "36g" } } },
                        { id: 2013, name: "Hershey's Kisses Almonds Milk Pack",                             image: "ckissesa.jpg",          cat: "chocolates",               subcat: "Hershey's",                   selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 65, count: 0, unit: "34g" } } },
                        { id: 2014, name: "Hershey's Kisses Cookies n Creme Assorted",                      image: "ckissescnc.jpg",        cat: "chocolates",               subcat: "Hershey's",                   selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 65, count: 0, unit: "34g" } } },*/

/*Nestle*/              { id: 2015, name: "Nestle Milkybar Creamy Milky Treat",                             image: "cnestlemb.jpg",         cat: "chocolates",               subcat: "Nestle",                      selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 40, count: 0, unit: "47g" } } },
                        { id: 2016, name: "Nestle Kitkat",                                                  image: "chkitkat.jpg",          cat: "chocolates",               subcat: "Nestle",                      selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 30, count: 0, unit: "38g" } } }, 
                        { id: 2017, name: "Nestle Munch Max Nuts",                                          image: "cnestlemm.jpg",         cat: "chocolates",               subcat: "Nestle",                      selectedVariant: "Wgt.",       variants: { "Wgt.":     { price: 30, count: 0, unit: "37g" } } }, 

             

/*Kids*/                { id: 2018, name: "Kinder joy",                                                     image: "chkinderjoy.jpg",       cat: "chocolates",               subcat: "Kids",                       selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 50, count: 0, unit: "20g" } } },
                        { id: 2019, name: "Lotte Choco Pie Cake",                                           image: "clotte.jpg",            cat: "chocolates",               subcat: "Kids",                       selectedVariant: "Qty.",        variants: { "Qty.":     { price: 10, count: 0, unit: "1pc" } } },
                        { id: 2020, name: "Twix Cookie Caramel Filled Bar",                                 image: "ctwix.jpg",             cat: "chocolates",               subcat: "Kids",                       selectedVariant: "Qty.",        variants: { "Qty.":     { price: 100, count: 0, unit: "50g" } } },
                        { id: 2021, name: "Snickers Peanut Nougat and Caramel",                             image: "csnickers.jpg",         cat: "chocolates",               subcat: "Kids",                       selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 20, count: 0, unit: "20g" } } },

                        { id: 2023, name: "Bounty Coconut Filled Bar",                                      image: "cbc.jpg",               cat: "chocolates",               subcat: "Imported",                   selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 300, count: 0, unit: "50g" } } },
                        { id: 2024, name: "Hubba Bubba Fruit Flavour Chewing Gum",                          image: "ccg.jpg",               cat: "chocolates",               subcat: "Imported",                   selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 299, count: 0, unit: "50g" } } },
                        
/*Imported*/            { id: 2025, name: "Ferrero Rocher Chocolate (24 piece)",                            image: "cfr.jpg",               cat: "chocolates",               subcat: "Imported",                   selectedVariant: "Qty.",        variants: { "Qty.":     { price: 880, count: 0, unit: "300g" } } },
                        { id: 2026, name: "Mars Premium Nougat and Caramel Filled Bar",                     image: "cm.jpg",                cat: "chocolates",               subcat: "Imported",                   selectedVariant: "Qty.",        variants: { "Qty.":     { price: 100, count: 0, unit: "51g" } } },
                        { id: 2027, name: "Toblerone Milk Chocolate Bar",                                   image: "ctob.jpg",              cat: "chocolates",               subcat: "Imported",                   selectedVariant: "Qty.",        variants: { "Qty.":     { price: 400, count: 0, unit: "100g" } } },
                        /*{ id: 2028, name: "NERDS Grape and Strawberry Toffee",                              image: "cngs.jpg",              cat: "candies",                  subcat: "Nerds",                      selectedVariant: "Qty.",        variants: { "Qty.":     { price: 270, count: 0, unit: "141g" } } },*/
                        { id: 2029, name: "NERDS Watermelon and Cherry Tofee",                              image: "cnwc.jpg",              cat: "candies",                  subcat: "Nerds",                      selectedVariant: "Qty.",        variants: { "Qty.":     { price: 249, count: 0, unit: "46g" } } },
                        { id: 2030, name: "Pocky Chocolate Biscuit Sticks",                                 image: "cpockyred.jpg",         cat: "chocolates",               subcat: "Imported",                   selectedVariant: "Qty.",        variants: { "Qty.":     { price: 199, count: 0, unit: "47g" } } },
                        { id: 2031, name: "Pocky Strawberry Biscuit Sticks",                                image: "cpockys.jpg",           cat: "chocolates",               subcat: "Imported",                   selectedVariant: "Qty.",        variants: { "Qty.":     { price: 170, count: 0, unit: "45g" } } },
                        { id: 2032, name: "Pocky Double Chocolate Biscuit Sticks",                          image: "cpockydc.jpg",          cat: "chocolates",               subcat: "Imported",                   selectedVariant: "Qty.",        variants: { "Qty.":     { price: 180, count: 0, unit: "47g" } } },
                        { id: 2033, name: "M M's Peanut Candy",                                             image: "cmnmp.jpg",             cat: "candies",                  subcat: "M&M's",                      selectedVariant: "Qty.",        variants: { "Qty.":     { price: 199, count: 0, unit: "45g" } } },
                        { id: 2034, name: "M M's Chocolate Candy",                                          image: "cmnmc.jpg",             cat: "candies",                  subcat: "M&M's",                      selectedVariant: "Qty.",        variants: { "Qty.":     { price: 199, count: 0, unit: "45g" } } },
                        { id: 2035, name: "Skittles Wild Berry Bite Size Fruit Toffee",                     image: "cskittlew.jpg",         cat: "candies",                  subcat: "Skittles",                   selectedVariant: "Qty.",        variants: { "Qty.":     { price: 199, count: 0, unit: "27g" } } },
                        { id: 2036, name: "Skittles Original Bite-size Fruit Toffee",                       image: "cskittler.jpg",         cat: "candies",                  subcat: "Skittles",                   selectedVariant: "Qty.",        variants: { "Qty.":     { price: 199, count: 0, unit: "27g" } } },
                        
                    
/*sunfest*/             /*{ id: 3001, name: "Dark Fantasy Choco Fills",                                       image: "bidf.jpg",              cat: "biscuits",                 subcat: "Sunfeast",                   selectedVariant: "L",           variants: { "L":        { price: 44, count: 0, unit: "69g" } } },*/

/*Parle*/               { id: 3005, name: "Hide and Seek Coffee Chocolate",                                 image: "bihideandseekc.jpg",    cat: "biscuits",                 subcat: "Parle",                      selectedVariant: "L",           variants: { "L":        { price: 30, count: 0, unit: "100g" } } },
                        { id: 3008, name: "Parle-G",                                                        image: "biparleg.jpg",          cat: "biscuits",                 subcat: "Parle",                      selectedVariant: "L",           variants: { "L":        { price: 80, count: 0, unit: "800g" } } },
                        { id: 3006, name: "Hide and Seek",                                                  image: "bihideandseek.jpg",     cat: "biscuits",                 subcat: "Parle",                      selectedVariant: "L",           variants: { "L":        { price: 30, count: 0, unit: "100g" } } },
                        { id: 3007, name: "Oreo",                                                           image: "bioreo.jpg",            cat: "biscuits",                 subcat: "Parle",                      selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "42g" } } },  
                        { id: 3009, name: "Cheese Craker",                                                  image: "bipriyagoldck.jpg",     cat: "biscuits",                 subcat: "Parle",                      selectedVariant: "L",           variants: { "L":        { price: 10, count: 0, unit: "70g" } } },

/*Britannia*/           { id: 3010, name: "Good Day Cashew Almond",                                         image: "bigooddayc.jpg",        cat: "biscuits",                 subcat: "Britannia",                  selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "200g" } } },
                        { id: 3012, name: "Good Day Pista Badam",                                           image: "bigooddayp.jpg",        cat: "biscuits",                 subcat: "Britannia",                  selectedVariant: "L",           variants: { "L":        { price: 50, count: 0, unit: "200g" } } },
                        { id: 3014, name: "Good Day Butter",                                                image: "bigooddaybutter.jpg",   cat: "biscuits",                 subcat: "Britannia",                  selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "200g" } } },
                        { id: 3015, name: "Good Day Fruit and Nut Cookies",                                 image: "bigooddayfn.jpg",       cat: "biscuits",                 subcat: "Britannia",                  selectedVariant: "L",           variants: { "L":        { price: 100, count: 0, unit: "450g" } } },
                        { id: 3016, name: "Britannia Bourbon ",                                             image: "bibritanniab.jpg",      cat: "biscuits",                 subcat: "Britannia",                  selectedVariant: "L",           variants: { "L":        { price: 35, count: 0, unit: "100g" } } },
                        { id: 3017, name: "Britannia Nice Time Coconut Biscuit",                            image: "bibritanniant.jpg",     cat: "biscuits",                 subcat: "Britannia",                  selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "136g" } } },
                        { id: 3018, name: "Britannia Croissant",                                            image: "ccroissant.jpg",        cat: "biscuits",                 subcat: "Britannia",                  selectedVariant: "L",           variants: { "L":        { price: 30, count: 0, unit: "45g" } } },
                        { id: 3019, name: "Britannia Marigold",                                             image: "bimari.jpg",            cat: "biscuits",                 subcat: "Britannia",                  selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "208g" } } },
                        /*{ id: 3020, name: "Britannia Milk Bikis",                                           image: "bimb.jpg",              cat: "biscuits",                 subcat: "Britannia",                  selectedVariant: "L",           variants: { "L":        { price: 70, count: 0, unit: "500g" } }  },*/
                

/*Kurkure*/             /*{ id: 4001, name: "Kurkure Chutney",                                                image: "skurkurec.jpg",         cat: "snacks",                   subcat: "Kurkure",                    selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "75g" } } },*/
                        { id: 4002, name: "Kurkure Chilli",                                                 image: "skurkurecc.jpg",        cat: "snacks",                   subcat: "Kurkure",                    selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "75g" } } },
                        { id: 4003, name: "Kurkure Masala",                                                 image: "skurkurem.jpg",         cat: "snacks",                   subcat: "Kurkure",                    selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "75g" } } },
                        { id: 4004, name: "Kurkure Puffcorn",                                               image: "skurkurep.jpg",         cat: "snacks",                   subcat: "Kurkure",                    selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "75g" } } },
                        /*{ id: 4005, name: "Kurkure Schezwan Chutney",                                       image: "skurkuresc.jpg",        cat: "snacks",                   subcat: "Kurkure",                    selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "75g" } } },*/

/*Lays*/                { id: 4006, name: "Lay's India's Masala",                                                image: "slaysb.jpg",            cat: "snacks",                   subcat: "Lays",                       selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "200g" } } },
                        /*{ id: 4007, name: "Lay's American",                                                 image: "slaysg.jpg",            cat: "snacks",                   subcat: "Lays",                       selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "200g" } } },
                        { id: 4008, name: "Lay's Classic",                                                  image: "slaysy.jpg",            cat: "snacks",                   subcat: "Lays",                       selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "200g" } } },*/
                        { id: 4009, name: "Lay's Chile Limon",                                              image: "slaysc.jpg",            cat: "snacks",                   subcat: "Lays",                       selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "200g" } } },
                        /*{ id: 4010, name: "Lay's Crispz",                                                   image: "slayscr.jpg",           cat: "snacks",                   subcat: "Lays",                       selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "200g" } } },*/
                        { id: 4011, name: "Lay's Spanish Tomato Tango",                                     image: "slayss.jpg",            cat: "snacks",                   subcat: "Lays",                       selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "200g" } } },
                        { id: 4012, name: "Lay's Sizzlin Hot",                                              image: "slayssh.jpg",           cat: "snacks",                   subcat: "Lays",                       selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "200g" } } },
                        /*{ id: 4013, name: "Lay's Hot n sweet chilli",                                       image: "slaysw.jpg",            cat: "snacks",                   subcat: "Lays",                       selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "200g" } } },*/

                        
/*Pingles */            { id: 4014, name: "Pringles Sour Cream and Onion Potato - Imported",                           image: "spinglessc.jpg",        cat: "snacks",                   subcat: "Pingles",                    selectedVariant: "L",           variants: { "L":        { price: 449, count: 0, unit: "165g" } } },
                        { id: 4015, name: "Pringles Original Potato Chips - Imported",                                 image: "spingleo.jpg",          cat: "snacks",                   subcat: "Pingles",                    selectedVariant: "L",           variants: { "L":        { price: 449, count: 0, unit: "165g" } } },
                        { id: 4016, name: "Pringles Pizza Flavoured Potato Chips - Imported",                          image: "spinglep.jpg",          cat: "snacks",                   subcat: "Pingles",                    selectedVariant: "L",           variants: { "L":        { price: 449, count: 0, unit: "165g" } } },
                        
/*Namkeen*/             { id: 4017, name: "Haldirams Punjabi Tadka",                                        image: "spunjabi.jpg",          cat: "snacks",                   subcat: "Haldiram's",                 selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 55, count: 0, unit: "210g" } } },
                        { id: 4018, name: "Haldirams Bhujia",                                               image: "sbhujia.jpg",           cat: "snacks",                   subcat: "Haldiram's",                 selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 60, count: 0, unit: "200g" } } },
                        { id: 4019, name: "Haldirams Salted Peanuts",                                       image: "ssalted.jpg",           cat: "snacks",                   subcat: "Haldiram's",                 selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 55, count: 0, unit: "200g" } } },
                        { id: 4021, name: "Haldirams Moong Dal",                                            image: "shaldirammd.jpg",       cat: "snacks",                   subcat: "Haldiram's",                 selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 60, count: 0, unit: "200g" } } },
                        

                        { id: 4024, name: "Crax Curls Chatpata Masala",                                     image: "scc.jpg",               cat: "snacks",                   subcat: "Crax",                       selectedVariant: "L",           variants: {  "L":       { price: 60, count: 0, unit: "88g" } } },
                        { id: 4025, name: "Crax Crunchy Pipes Salted ",                                     image: "sccp.jpg",              cat: "snacks",                   subcat: "Crax",                       selectedVariant: "L",           variants: { "L":        { price: 60, count: 0, unit: "73g" } } },
                        { id: 4026, name: "Crax Natkhat Classic",                                           image: "scnk.jpg",              cat: "snacks",                   subcat: "Crax",                       selectedVariant: "L",           variants: { "L":        { price: 60, count: 0, unit: "73g" } } },
                

/*Hair*/                { id: 5001, name: "Comb 15cm",                                                      image: "pccomb.jpg",            cat: "hair",                     subcat: "Comb",                       selectedVariant: "Size",        variants: { "Size":     { price: 50, count: 0, unit: "20cm" } } },
                        { id: 5002, name: "Almond Oil",                                                     image: "pcalmond.jpg",          cat: "hair",                     subcat: "Oil",                        selectedVariant: "Bottle",      variants: { "Bottle":   { price: 87, count: 0, unit: "95ml" } } },
                        { id: 5003, name: "Head and Shoulders Anti Dandruff",                               image: "pcshampoo.jpg",         cat: "hair",                     subcat: "Shampoo",                    selectedVariant: "Bottle",      variants: { "Bottle":   { price: 181, count: 0, unit: "180ml" } } },
                        { id: 5018, name: "L'Oreal Paris Total Repair 5 Shampoo",                           image: "pcshampool.jpg",        cat: "hair",                     subcat: "Shampoo",                    selectedVariant: "Bottle",      variants: { "Bottle":   { price: 415, count: 0, unit: "340ml" } } },
                        { id: 5019, name: "Tresemme Keratin Smooth Shampoo",                                image: "pcshampoot.jpg",        cat: "hair",                     subcat: "Shampoo",                    selectedVariant: "Bottle",      variants: { "Bottle":   { price: 175, count: 0, unit: "180ml" } } },
                        

/*Body*/                { id: 5004, name: "Pears Pack of 3",                                                image: "pcpears.jpg",           cat: "bnb",                      subcat: "Soap",                       selectedVariant: "Piece",       variants: { "Piece":    { price: 200, count: 0, unit: "1pk" } } },
                        { id: 5005, name: "NIVEA Shower Gel Waterlily",                                   image: "pcbodywash.jpg",        cat: "bnb",                      subcat: "Body Wash",                  selectedVariant: "Qty",       variants: { "Qty":    { price: 135, count: 0, unit: "125ml" } } },
                        { id: 5006, name: "Bath Loofah",                                                    image: "pcl.jpg",               cat: "bnb",                      subcat: "Loofah",                     selectedVariant: "Qty",       variants: { "Qty":    { price: 100, count: 0, unit: "1pc" } } },

/*Face*/                { id: 5007, name: "Cetaphil Cleanser",                                                       image: "pccleanser.jpg",        cat: "face",                     subcat: "Cleanser",                   selectedVariant: "Qty",       variants: { "Qty":    { price: 429, count: 0, unit: "118ml" } } },
                        { id: 5008, name: "Minimilist Vitamin b5 10%",                                      image: "pcmoist.jpg",           cat: "face",                     subcat: "Moisturizer",                selectedVariant: "Qty",       variants: { "Qty":    { price: 350, count: 0, unit: "50g" } } },
                        { id: 5009, name: "Himalaya Lip Balm",                                              image: "pclb.jpg",              cat: "face",                     subcat: "Lips",                       selectedVariant: "Qty",       variants: { "Qty":    { price: 350, count: 0, unit: "50g" } } },
                        { id: 5016, name: "Gillette Presto",                                                image: "chgillet.jpg",          cat: "face",                     subcat: "Grooming.",                  selectedVariant: "Qty",         variants: { "Qty":      { price: 25, count: 0, unit: "1pc." } } },
                        { id: 5017, name: "Garnier Men Acno Fight Anti-Pimple Face Wash ",                  image: "chgarniersh.jpg",       cat: "face",                     subcat: "Facewash",                   selectedVariant: "Qty",         variants: { "Qty":      { price: 125, count: 0, unit: "50g" } } },
                        { id: 5020, name: "Face Ice Roller, silicone container, reuseable ",                  image: "faceir.jpg",       cat: "face",                     subcat: "Roller",                   selectedVariant: "Qty",         variants: { "Qty":      { price: 120, count: 0, unit: "120ml" } } },
                        { id: 5021, name: "Garnier Vitamin C serum mask",                                     image: "gfm.jpg",       cat: "face",                     subcat: "Masks",                   selectedVariant: "Qty",         variants: { "Qty":      { price: 115, count: 0, unit: "28g" } } },
                        { id: 7103, name: "Pilgrim Korean Rice Hydra Glow Moisturizer",                  image: "facep.jpg",              cat: "face",                        subcat: "Premium",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 275, count: 0, unit: "50gm" } } },


/*Grooming*/            { id: 5010, name: "Scissors 2 X 4.25inch",                                          image: "pcscissors.jpg",        cat: "g",                        subcat: "Grooming",                   selectedVariant: "Size",        variants: { "Size":     { price: 50, count: 0, unit: "2x4inch" } } },
                        { id: 5011, name: "Handkerchief pack of 3",                                         image: "pchandkerchief.jpg",    cat: "g",                        subcat: "Grooming",                   selectedVariant: "Qty",       variants: { "Qty":    { price: 170, count: 0, unit: "1pk" } } },
                        { id: 5012, name: "Gillette Mac 3 Razor",                                           image: "pcgillette.jpg",        cat: "g",                        subcat: "Grooming",                   selectedVariant: "Qty",       variants: { "Qty":    { price: 275, count: 0, unit: "1pc" } } },
                        { id: 5013,  name: "Nail Clipper",                                                  image: "pcnc.jpg",              cat: "g",                        subcat: "Grooming",                   selectedVariant: "Qty",       variants: { "Qty":    { price: 80, count: 0, unit: "1pc" } } },


/*Dental*/              { id: 5014, name: "Colgate",                                                        image: "pccolgate.jpg",         cat: "g",                        subcat: "Dental",                     selectedVariant: "Tube",        variants: { "Tube":     { price: 135, count: 0, unit: "180g" } } },
/*Dental*/              { id: 5026, name: "Colgate Total",                                                        image: "colgatet.jpg",         cat: "g",                        subcat: "Dental",                     selectedVariant: "Tube",        variants: { "Tube":     { price: 50, count: 0, unit: "25g" } } },
                        { id: 5015, name: "Oral-B Pro Clean",                                               image: "pcoralb.jpg",           cat: "g",                        subcat: "Dental",                     selectedVariant: "Qty",       variants: { "Qty":    { price: 55, count: 0, unit: "1pc" } } },


/*cloths*/                { id: 6001, name: "Ariel Power Gel Front Load Liquid Detergent",                  image: "clarielb.jpg",          cat: "cleaningessentials",       subcat: "Detergent",                  selectedVariant: "Qty",         variants: { "Qty":      { price: 215, count: 0, unit: "950ml" } } },
                          { id: 6002, name: "Comfort After Wash Fabric Conditioner -Lily Fresh",            image: "clcomforlf.jpg",        cat: "cleaningessentials",       subcat: "Detergent",                  selectedVariant: "Qty",         variants: { "Qty":      { price: 235, count: 0, unit: "860ml" } } },
                          /*{ id: 6003, name: "Comfort After Wash Fabric Conditioner -Morning Fresh",         image: "clcomfortmf.jpg",       cat: "cleaningessentials",       subcat: "Detergent",                  selectedVariant: "Qty",         variants: { "Qty":      { price: 235, count: 0, unit: "860ml" } } },*/

/*Toilet & Bathroom*/     { id: 6004, name: "Harpic Advanced Disinfectant Toilet Cleaner",                 image: "clharpic.jpg",          cat: "cleaningessentials",       subcat: "Toilet & Bathroom",         selectedVariant: "Qty",          variants: { "Qty":      { price: 110, count: 0, unit: "500ml" } } },
                          { id: 6010, name: "Harpic Disinfectant Bathroom Cleaner (Floral)",                image: "clharpicr.jpg",         cat: "cleaningessentials",       subcat: "Toilet & Bathroom",         selectedVariant: "Qty",          variants: { "Qty":      { price: 115, count: 0, unit: "1kg" } } },
                          { id: 6005, name: "Prime Georgia Plus 4 Ply 10 X 10 CM",                image: "cltp.jpg",              cat: "cleaningessentials",       subcat: "Toilet & Bathroom",         selectedVariant: "Qty",          variants: { "Qty":      { price: 385, count: 0, unit: "4pc" } } },

/*Room Freshners*/        { id: 6006, name: "Odonil Lavender Mist Room Freshener (Lavender)",               image: "clodonill.jpg",         cat: "cleaningessentials",       subcat: "Room Freshners",            selectedVariant: "Qty",          variants: { "Qty":      { price: 170, count: 0, unit: "220ml" } } },
        
/*Surface Cleaners*/      { id: 6007, name: "Colin Glass Cleaner ",                                         image: "clcolin.jpg",           cat: "cleaningessentials",       subcat: "Surface Cleaners",          selectedVariant: "Qty",          variants: { "Qty":      { price: 120, count: 0, unit: "500ml" } } },
                          /*{ id: 6008, name: "Lizol Disinfectant Surface and Floor Cleaner ",                image: "cllizol.jpg",           cat: "cleaningessentials",       subcat: "Surface Cleaners",          selectedVariant: "Qty",          variants: { "Qty":      { price: 260, count: 0, unit: "1L" } } },*/
                          { id: 6009, name: "Feather's Premium Paper Napkin(ply 2) ",                       image: "clfeathern.jpg",        cat: "cleaningessentials",       subcat: "Surface Cleaners",          selectedVariant: "Qty",          variants: { "Qty":      { price: 90, count: 0, unit: "105gm" } } },
                          { id: 6010, name: "Floor Mat - Grey",                                             image: "clfmgr.jpg",            cat: "cleaningessentials",       subcat: "Floor Mat",                 selectedVariant: "Qty",          variants: { "Qty":      { price: 199, count: 0, unit: "1pc" } } },
                          { id: 6011, name: "Floor Mat - Green",                                            image: "clfmg.jpg",             cat: "cleaningessentials",       subcat: "Floor Mat",                 selectedVariant: "Qty",          variants: { "Qty":      { price: 299, count: 0, unit: "1pc" } } },
                          { id: 6012, name: "Bathroom Mat - Oval",                                          image: "clbmo.jpg",             cat: "cleaningessentials",       subcat: "Bathroom Mat",              selectedVariant: "Qty",          variants: { "Qty":      { price: 299, count: 0, unit: "1pc" } } },
                          { id: 6013, name: "Bathroom Mat - Rectangle",                                     image: "clbmr.jpg",             cat: "cleaningessentials",       subcat: "Bathroom Mat",              selectedVariant: "Qty",          variants: { "Qty":      { price: 299, count: 0, unit: "1pc" } } },
                          { id: 6014, name: "Brush Broom",                                                  image: "clsb.jpg",              cat: "cleaningessentials",       subcat: "Brushes and Mops",          selectedVariant: "Qty",          variants: { "Qty":      { price: 299, count: 0, unit: "1pc" } } },
                          { id: 6015, name: "Microfiber Mop",                                               image: "clfm.jpg",              cat: "cleaningessentials",       subcat: "Brushes and Mops",          selectedVariant: "Qty",          variants: { "Qty":      { price: 399, count: 0, unit: "1pc" } } },
                          { id: 6016, name: "Round Mop With Spin Dry and Bucket",                           image: "clbfm.jpg",             cat: "cleaningessentials",       subcat: "Brushes and Mops",          selectedVariant: "Qty",          variants: { "Qty":      { price: 1199, count: 0, unit: "1pc" } } },
                          { id: 6017, name: "Viper and Brush",                                              image: "clbnv.jpg",             cat: "cleaningessentials",       subcat: "Brushes and Mops",          selectedVariant: "Qty",          variants: { "Qty":      { price: 349, count: 0, unit: "1pc" } } },
                          { id: 6018, name: "Dust Pan",                                                     image: "cldp.jpg",              cat: "cleaningessentials",       subcat: "Brushes and Mops",          selectedVariant: "Qty",          variants: { "Qty":      { price: 49, count: 0, unit: "1pc" } } },

   
  /*General*/             { id: 7003, name: "Moov Instant Pain Relief Spray",                               image: "chmoov.jpg",            cat: "g",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 230, count: 0, unit: "50g" } } },
                          { id: 7004, name: "Volini Activ Pain Relief Spray",                               image: "chvo.jpg",              cat: "g",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 190, count: 0, unit: "50g" } } },
                          { id: 7005, name: "Dabur Glucoplus C - Orange",                                   image: "chgo.jpg",              cat: "g",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 190, count: 0, unit: "50g" } } },
                          { id: 7006, name: "Dabur Glucoplus C - Lemon ",                                   image: "chgl.jpg",              cat: "g",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 60, count: 0, unit: "120g" } } },
                          { id: 7018, name: "Vicks Inhaler Keychain",                                       image: "chvi.jpg",              cat: "g",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 60, count: 0, unit: "0.5ml" } } },
                          { id: 7019, name: "Cofsils Orange Flavour, 10 Lozenges",                          image: "chcough.jpg",           cat: "g",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 35, count: 0, unit: "1pk" } } },
                          { id: 7020, name: "Control D N95 Mask",                                           image: "chn95.jpg",             cat: "g",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 60, count: 0, unit: "1pc" } } },
                          { id: 7001, name: "KamaSutra Longlast Condom",                                    image: "chks.jpg",              cat: "g",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 240, count: 0, unit: "12p" } } },
                          { id: 7002, name: "KamaSutra Skinfeel Condom",                                    image: "chkss.jpg",             cat: "g",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 150, count: 0, unit: "12p" } } },
                          { id: 7102, name: "Dettol Antiseptic Liquid",                                    image: "cdettol.jpg",             cat: "g",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 83, count: 0, unit: "125ml" } } },
                          
/*Baby Care*/             { id: 7007, name: "Pampers (12-17 Kg: XL) 6pc.",                                  image: "chpampers.jpg",         cat: "bc",                       subcat: "Diapers",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 230, count: 0, unit: "1pk." } } },
                          { id: 7008, name: "Pampers (9-14 Kg: L) 13pc.",                                   image: "chpampers.jpg",         cat: "bc",                       subcat: "Diapers",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 210, count: 0, unit: "1pk." } } },
                          { id: 7009, name: "Pampers (7-12Kg: M) 8pc.",                                     image: "chpampers.jpg",         cat: "bc",                       subcat: "Diapers",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 98, count: 0, unit: "1pk." } } },
                          { id: 7010, name: "Pampers (4-8 Kg: S) 40pc.",                                    image: "chpampers.jpg",         cat: "bc",                       subcat: "Diapers",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 400, count: 0, unit: "1pk." } } },
                          { id: 7021, name: "Little's Soft Cleansing Baby Wipes-Wet Wipes.",                image: "chbabyw.jpg",           cat: "bc",                       subcat: "Wipes",                     selectedVariant: "Qty",          variants: { "Qty":      { price: 400, count: 0, unit: "1pk." } } },
                          
/*Femal Wellness*/        { id: 7011, name: "Prega News Pregnancy Test Kit,",                               image: "chprega.jpg",           cat: "fw",                       subcat: "Female Wellness",           selectedVariant: "Qty",          variants: { "Qty":      { price: 60, count: 0, unit: "1pc" } } },
                          { id: 7012, name: "Unwanted-Mankind",                                             image: "chunwanted.jpg",        cat: "fw",                       subcat: "Female Wellness",           selectedVariant: "Qty",          variants: { "Qty":      { price: 80, count: 0, unit: "60" } } },
                          { id: 7013, name: "VWash Plus Expert Hygiene Intimate Wash",                      image: "chvw.jpg",              cat: "fw",                       subcat: "Female Wellness",           selectedVariant: "Qty",          variants: { "Qty":      { price: 200, count: 0, unit: "100ml" } } },
                          { id: 7014, name: "Whisper Choice Ultra Sanitary Pads (XL: 6pc)",                 image: "chwcu.jpg",             cat: "fw",                       subcat: "Female Wellness",           selectedVariant: "Qty",          variants: { "Qty":      { price: 50, count: 0, unit: "1pk." } } },
                          { id: 7015, name: "Whisper Ultra Soft Air Fresh Pores (XL+: 6pc)",                image: "chsls.jpg",             cat: "fw",                       subcat: "Female Wellness",           selectedVariant: "Qty",          variants: { "Qty":      { price: 95, count: 0, unit: "1pk." } } },
                          { id: 7016, name: "Whisper Bindazzz Nights Sanitary Pads(XXL: 7pc)",              image: "chbn.jpg",              cat: "fw",                       subcat: "Female Wellness",           selectedVariant: "Qty",          variants: { "Qty":      { price: 115, count: 0, unit: "1pk." } } },
                          { id: 7017, name: "Whispers No Gap No Leaks Sanitary Pads(XL+: 7pc)",             image: "chngnl.jpg",            cat: "fw",                       subcat: "Female Wellness",           selectedVariant: "Qty",          variants: { "Qty":      { price: 95, count: 0, unit: "1pk." } } },

            
/*dal*/                  { id: 8001, name: "Arhar-Barik Dal",                                               image: "rdar.jpg",              cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 190, count: 0, unit: "1kg" } } },
                         { id: 8002, name: "Arhar-Moti",                                                    image: "rdar.jpg",              cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 190, count: 0, unit: "1kg" } } },
                         { id: 8003, name: "Chana-Dal",                                                     image: "rchana.jpg",            cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 130, count: 0, unit: "1kg" } } },
                         { id: 8004, name: "Kale Chane",                                                    image: "rkalachana.jpg",        cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 130, count: 0, unit: "1kg" } } },
                         { id: 8005, name: "Urad-Chilka",                                                   image: "ruradc.jpg",            cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 150, count: 0, unit: "1kg" } } },
                         { id: 8006, name: "Urad-Sabut",                                                    image: "rurads.jpg",            cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 160, count: 0, unit: "1kg" } } },
                         { id: 8007, name: "Urad-Dhuli",                                                    image: "ruradd.jpg",            cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 160, count: 0, unit: "1kg" } } },
                         { id: 8008, name: "Masoor-Barik",                                                  image: "rmasoor.jpg",           cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 130, count: 0, unit: "1kg" } } },
                         { id: 8009, name: "Masoor-Moti",                                                   image: "rmasoor.jpg",           cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 130, count: 0, unit: "1kg" } } },
                         { id: 8010, name: "Moong-Chilka",                                                  image: "rmoongc.jpg",           cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 130, count: 0, unit: "1kg" } } },
                         { id: 8011, name: "Moong-Dhuli",                                                   image: "rmoongd.jpg",           cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 150, count: 0, unit: "1kg" } } },
                         { id: 8012, name: "Moong-Sabut",                                                   image: "rmoongs.jpg",           cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 150, count: 0, unit: "1kg" } } },
                         { id: 8013, name: "Rajma-Pahadi",                                                  image: "rrp.jpg",               cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 230, count: 0, unit: "1kg" } } },
                         { id: 8014, name: "Rajma-Chitra",                                                  image: "rrc.jpg",               cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 130, count: 0, unit: "1kg" } } },
                         { id: 8015, name: "Kulat",                                                         image: "rkulat.jpg",            cat: "adc",                      subcat: "Dal",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 130, count: 0, unit: "1kg" } } },

/*Atta*/                 { id: 8016, name: "Chandan Bhog",                                                  image: "rchandan.png",          cat: "adc",                      subcat: "Atta",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 250, count: 0, unit: "5kg" } } },
                         { id: 8017, name: "Fortune Atta",                                                  image: "rfortune.jpg",          cat: "adc",                      subcat: "Atta",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 253, count: 0, unit: "5kg" } } },
                         { id: 8018, name: "Ashirwad Atta",                                                 image: "rashirwad.jpg",         cat: "adc",                      subcat: "Atta",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 255, count: 0, unit: "5kg" } } },

/*Rice*/                 { id: 8019, name: "Khanda Rice",                                                   image: "rrice.jpg",             cat: "adc",                      subcat: "Rice",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 50, count: 0, unit: "1kg" } } },
                         { id: 8020, name: "Parmal Rice",                                                   image: "rrice.jpg",             cat: "adc",                      subcat: "Rice",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "1kg"        } } },
                         { id: 8042, name: "Sharbati Rice",                                                   image: "rrice.jpg",             cat: "adc",                      subcat: "Rice",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 90, count: 0, unit: "1kg"        } } },
                         { id: 8043, name: "Basmati Makhan Chor Rice",                                                   image: "rrice.jpg",             cat: "adc",                      subcat: "Rice",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 149, count: 0, unit: "1kg"        } } },
       
/*Oil*/                 { id: 8021, name: "Fortune Kachi Ghani Oil",                                        image: "rfkg.jpg",              cat: "mo",                       subcat: "Oil",                       selectedVariant: "L",            variants: { "L":       { price: 220, count: 0, unit: "910g" } } },       
                        { id: 8022, name: "Fortune Soya Bean Oil",                                         image: "rsbo.jpg",              cat: "mo",                       subcat: "Oil",                       selectedVariant: "L",            variants: { "L":       { price: 170, count: 0, unit: "750g" } } },                     
                        { id: 8023, name: "Fortune Rice Bran Oil",                                         image: "rrbo.jpg",              cat: "mo",                       subcat: "Oil",                       selectedVariant: "L",            variants: { "L":       { price: 200, count: 0, unit: "870g" } } },
                        { id: 8024, name: "Fortune Sunflower Oil",                                         image: "rfsl.jpg",              cat: "mo",                       subcat: "Oil",                       selectedVariant: "L",            variants: { "L":       { price: 185, count: 0, unit: "800g" } } },
                        { id: 8910, name: "TilMoti Sesame Oil",                                         image: "rsoil.jpg",              cat: "mo",                       subcat: "Oil",                       selectedVariant: "L",            variants: { "L":       { price: 250, count: 0, unit: "1L" } } },
                        { id: 8124, name: "Nilons Ginger Garlic Paste",                                    image: "rngg.jpg",              cat: "mo",                       subcat: "Ginger Garlic",             selectedVariant: "L",            variants: { "L":       { price: 60, count: 0, unit: "200g" } } },
                        { id: 8125, name: "MDH Chunky Chat Masala",                                    image: "mdhchunky.jpg",              cat: "mo",                       subcat: "Spices",             selectedVariant: "L",            variants: { "L":       { price: 94, count: 0, unit: "100g" } } },
                        { id: 8126, name: "Snapin Chilli Flakes",                                    image: "rnschillif.jpg",              cat: "mo",                       subcat: "Spices",             selectedVariant: "L",            variants: { "L":       { price: 95, count: 0, unit: "38g" } } },

/*General*/              { id: 8025, name: "Poha",                                                          image: "rpoha.jpg",             cat: "adc",                      subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "500g" } } },
                         { id: 8026, name: "Dalia",                                                         image: "rdalia.jpg",            cat: "adc",                      subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 55, count: 0, unit: "1kg" } } },
                         { id: 8027, name: "Besan",                                                         image: "rbesan.jpg",            cat: "adc",                      subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 110, count: 0, unit: "1kg" } } },
                         { id: 8028, name: "Maida",                                                         image: "rmaida.jpg",            cat: "adc",                      subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 50, count: 0, unit: "1kg" } } },
                         { id: 8029, name: "Suji",                                                          image: "rsuji.jpg",             cat: "adc",                      subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 55, count: 0, unit: "1kg" } } },
                         { id: 8030, name: "Nutri",                                                         image: "rnutri.jpg",            cat: "adc",                      subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 140, count: 0, unit: "1kg" } } },
                         { id: 8031, name: "Raw Penuts",                                                    image: "rrawp.jpg",             cat: "adc",                      subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 220, count: 0, unit: "1kg" } } },
                         { id: 8032, name: "Salt",                                                          image: "rtsalt.jpg",            cat: "adc",                      subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 30, count: 0, unit: "1kg" } } },
                         { id: 8033, name: "Sugar",                                                         image: "rsugar.jpg",            cat: "adc",                      subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 59, count: 0, unit: "1kg" } } },

/*Milk*/                 { id: 8034, name: "Ananda Full cream-Milk",                                        image: "rananda.jpg",           cat: "dbm",                      subcat: "Milk",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 37, count: 0, unit: "500ml" } } },
/*Milk*/                 { id: 8134, name: "Amul Taaza Toned Milk Tetrapack",                                        image: "rmilkat.jpg",           cat: "dbm",                      subcat: "Milk",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 77, count: 0, unit: "1L" } } },
/*Milk*/                 { id: 8135, name: "Amul Gold",                                        image: "rmulkag.jpg",           cat: "dbm",                      subcat: "Milk",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 83, count: 0, unit: "1L" } } },
                         /*{ id: 8035, name: "Ananda-Milk",                                                   image: "rananda.jpg",           cat: "dbm",                      subcat: "Milk",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 22, count: 0, unit: "1pkt" } } },*/
                         { id: 8036, name: "Egg Crate",                                                     image: "regg.jpg",              cat: "dbm",                      subcat: "Egg",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 250, count: 0, unit: "1crt" } } },
                         { id: 8037, name: "White Bread",                                                   image: "rbreadw.jpg",           cat: "dbm",                      subcat: "Bread",                     selectedVariant: "Qty",          variants: { "Qty":     { price: 25, count: 0, unit: "350g" } } },
                         { id: 8038, name: "Amul Cheese 10 Slices X 20 gm",                                 image: "rcheese.jpg",           cat: "dbm",                      subcat: "Cheese",                     selectedVariant: "Qty",          variants: { "Qty":     { price: 145, count: 0, unit: "200g" } } },
                         { id: 8039, name: "Amul Curd",                                                     image: "rcurd.jpg",           cat: "dbm",                      subcat: "Curd",                     selectedVariant: "Qty",          variants: { "Qty":     { price: 47, count: 0, unit: "400g" } } },
                        { id: 8040, name: "Amul Butter",                                                   image: "rbutter.jpg",           cat: "dbm",                      subcat: "Butter",                     selectedVariant: "Qty",          variants: { "Qty":     { price: 63, count: 0, unit: "100g" } } },
                        { id: 8041, name: "Dabur - Honey",                                                 image: "rhoney.jpg",           cat: "dbm",                      subcat: "Honey",                     selectedVariant: "Qty",          variants: { "Qty":     { price: 125, count: 0, unit: "250g" } } },

                                   
/*Noodles*/                { id: 9001, name: "Maggie",                                                      image: "ifmaggie.jpg",           cat: "instant",                  subcat: "Noodles",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 10, count: 0, unit: "52g" } } },
                           { id: 9002, name: "Wai Wai Ready To Eat Veg Noodels",                            image: "iwiev.jpg",             cat: "instant",                  subcat: "Noodles",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 12, count: 0, unit: "65g" } } },
                           { id: 9003, name: "Wai Wai Non-Veg",                                             image: "iwienv.jpg",            cat: "instant",                  subcat: "Noodles",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 12, count: 0, unit: "65" } } },
                           /*{ id: 9004, name: "Yippee Magic Masala Noodles",                                 image: "iy.jpg",                cat: "instant",                  subcat: "Noodles",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 25, count: 0, unit: "120g" } } },*/
                           { id: 9111, name: "Nissin Mazedar Masala Cup Noodles",                           image: "inn.jpg",               cat: "instant",                  subcat: "Noodles",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "70g" } } },
                           /*{ id: 9112, name: "Nissin Vegetable Manchow Cup Noodles",                        image: "innm.jpg",              cat: "instant",                  subcat: "Noodles",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "70g" } } },*/

/*Knorr*/                  { id: 9005, name: "Knorr Hot and Sour Soup",                                     image: "ikhnsv.jpg",            cat: "instant",                  subcat: "Soup",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 10, count: 0, unit: "11g" } } },
                           { id: 9006, name: "Knorr Sweet Corn Vegetable Soup",                             image: "iksc.jpg",              cat: "instant",                  subcat: "Soup",                      selectedVariant: "Qty",          variants: { "Qty":     { price: 10, count: 0, unit: "11g" } } },

/*McCain*/                 { id: 9007, name: "MaCain Variety Pack",                                         image: "imvp.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 180, count: 0, unit: "550g" } } },
                           { id: 9009, name: "MaCain French Fries",                                         image: "imff.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 120, count: 0, unit: "420g" } } },
                           { id: 9010, name: "MaCain Veggie Fingers",                                       image: "mcvf.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 180, count: 0, unit: "400g" } } },
                           { id: 9011, name: "MaCain Chili Cheese Nuggets",                                       image: "ifccn.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 265, count: 0, unit: "400g" } } },
                           { id: 9012, name: "MaCain Potato Cheese Shotz",                                       image: "ifpcs.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 265, count: 0, unit: "400g" } } },
                           { id: 9013, name: "MaCain Crazy Fries Masala Mix, Herb N Garlic",                                       image: "ifcfmm.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 170, count: 0, unit: "400g" } } },
                           { id: 9014, name: "McCain French Fries - Pepper Crunch",                                       image: "ifmfpc.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 175, count: 0, unit: "420g" } } },
                           { id: 9015, name: "McCain Masala Fries - Hot n Spicy",                                       image: "ifmf.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 175, count: 0, unit: "420g" } } },
                           { id: 9016, name: "McCain Chilli Garlic Potato Bites",                                       image: "ifcgpb.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 160, count: 0, unit: "420g" } } },
                           { id: 9017, name: "McCain Emotibites - Crispy Happy Potato Snack",                                       image: "ife.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 150, count: 0, unit: "415g" } } },
                           { id: 9018, name: "McCain Smiles Crispy Happy Potatoes",                                       image: "ifs.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 150, count: 0, unit: "415g" } } },
                           { id: 9019, name: "Mccain Veggie Burger Patty",                                       image: "ifvbp.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 150, count: 0, unit: "420g" } } },
                           { id: 9020, name: "McCain Super Wedges",                                       image: "ifsw.jpg",              cat: "instant",                  subcat: "MaCain",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 170, count: 0, unit: "400g" } } },

                           { id: 9115, name: "Corn Flakes Kellogg's real strawberry puree",                 image: "rcfs.jpg",              cat: "instant",                  subcat: "All",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 90, count: 0, unit: "251g" } } },
                           { id: 9116, name: "Corn Flakes Kellogg's original",                              image: "rcfo.jpg",              cat: "instant",                  subcat: "All",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 90, count: 0, unit: "251g" } } },

/*bakery*/                /*{ id: 1001,   name: "Atta Biscuit",                                               image: "omiattab.jpg",          cat: "partneromi",               subcat: "Bakery",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 40, count: 0, unit: "1pkt" } } },*/
                          { id: 1002,   name: "Biscuit Round",                                              image: "omibr.jpg",             cat: "partneromi",               subcat: "Bakery",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 40, count: 0, unit: "1pkt" } } },
                          { id: 1003,   name: "Salty Biscuit",                                              image: "omibsalt.jpg",          cat: "partneromi",               subcat: "Bakery",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 40, count: 0, unit: "1pkt" } } },
                          { id: 1004,   name: "Rusk - Oval",                                                image: "omiro.jpg",             cat: "partneromi",               subcat: "Bakery",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 40, count: 0, unit: "1pkt" } } },
                          { id: 1005,   name: "Rusk - Square",                                              image: "omirsq.jpg",            cat: "partneromi",               subcat: "Bakery",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 40, count: 0, unit: "1pkt" } } },

                    
          /*Beveragese*/  { id: 1016,   name: "Buransh Squash",                                             image: "omisb.jpg",             cat: "partneromi",               subcat: "Beverages",                 selectedVariant: "Qty",          variants: { "Qty":     { price: 100, count: 0, unit: "750ml" } } },
          /*Beveragese*/  { id: 1017,   name: "Lichi Squash",                                               image: "omisl.jpg",             cat: "partneromi",               subcat: "Beverages",                 selectedVariant: "Qty",          variants: { "Qty":     { price: 100, count: 0, unit: "750ml" } } },
          /*Beveragese*/  { id: 1018,   name: "Pudina Squash",                                              image: "omisp.jpg",             cat: "partneromi",               subcat: "Beverages",                 selectedVariant: "Qty",          variants: { "Qty":     { price: 100, count: 0, unit: "750ml" } } },
          /*Beveragese*/  { id: 1019,   name: "Malta Squash",                                               image: "omism.jpg",             cat: "partneromi",               subcat: "Beverages",                 selectedVariant: "Qty",          variants: { "Qty":     { price: 100, count: 0, unit: "750ml" } } },

        /*Namkeen*/       { id: 1020,   name: "Besan Sew",                                                  image: "omibsew.jpg",           cat: "partneromi",               subcat: "Namkeen",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "200g" } } },
                          { id: 1021,   name: "Traditional Namkeen",                                        image: "omint.jpg",             cat: "partneromi",               subcat: "Namkeen",                   selectedVariant: "Qty",          variants: { "Qty":     { price: 70, count: 0, unit: "250g" } } },

            /*Desserts*/  { id: 1022,   name: "Gulab Jamun",                                                image: "omigj.jpg",             cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 30, count: 0, unit: "1pc" } } },
            /*Desserts*/  
            /*Desserts*/  { id: 1024,   name: "Pastry Pineapple",                                           image: "omipp.jpg",             cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 30, count: 0, unit: "1pc" } } },
            /*Desserts*/  { id: 1026,   name: "Brownie",                                                    image: "omib.jpg",              cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 80, count: 0, unit: "1pc" } } },
            /*Desserts*/  { id: 1027,   name: "Bal Mithai",                                                 image: "omibm.jpg",             cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 300, count: 0, unit: "500g" }, "Qty.":        { price: 600, count: 0, unit: "1kg" } } },
            /*Desserts*/  { id: 1028,   name: "Pure Chocolate Barfi",                                       image: "omicb.jpg",             cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 300, count: 0, unit: "500g" }, "Qty.":        { price: 600, count: 0, unit: "1kg"         } } },
            /*Desserts*/  { id: 1229,   name: "Legendry Desi Ghee Sohan Halwa",                             image: "omilbm.jpg",            cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 120, count: 0, unit: "2pc" }, "Qty.":        { price: 300, count: 0, unit: "250g"         } } },

            /*Desserts*/  { id: 1069,   name: "Pineapple Cake",                                             image: "omipcake.jpg",          cat: "partneromi",               subcat: "Cakes",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 280, count: 0, unit: "1 Pound" } } },
            /*Desserts*/  { id: 1070,   name: "Black Forest Cake",                                          image: "omibfc.jpg",            cat: "partneromi",               subcat: "Cakes",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 300, count: 0, unit: "1 Pound" } } },
        
              /*Snacks*/  { id: 1029,   name: "Samosa",                                                     image: "omisam.jpg",            cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 30, count: 0, unit: "1pc" } } },        
              /*Snacks*/  { id: 1065,   name: "Vegetable Patties",                                          image: "omiap.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 40, count: 0, unit: "1pc" } } },        
              /*Snacks*/  { id: 1030,   name: "Bread Pakoda",                                               image: "omibp.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 30, count: 0, unit: "1pc" } } },        
              /*Snacks*/  { id: 1031,   name: "Aloo Bonda",                                                 image: "omiab.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "2pc" } } },        
              /*Snacks*/  { id: 1032,   name: "Vada Pav",                                                   image: "omivp.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "1pc" } } },        
              /*Snacks*/  { id: 1033,   name: "Samosa With Choley",                                         image: "omics.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "1pc" } } },        
              /*Snacks*/  { id: 1035,   name: "French Fries",                                               image: "omiff.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 120, count: 0, unit: "100gm" } } },        
              /*Snacks*/  { id: 1036,   name: "Peri Peri Fries",                                            image: "omippf.jpg",            cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 140, count: 0, unit: "100gm" } } },        
              /*Snacks*/  { id: 1037,   name: "Honey Chilli Potatoes",                                      image: "omihcp.jpg",            cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 220, count: 0, unit: "500gm" } } },        
              /*Snacks*/  { id: 1038,   name: "Choley Bhature",                                             image: "omicholeb.jpg",         cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 150, count: 0, unit: "2pc" } } },        
              /*Snacks*/  { id: 1039,   name: "Pav Bhaji",                                                  image: "omipb.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 150, count: 0, unit: "1pc" } } },        
              /*Snacks*/  { id: 1040,   name: "Paneer Kulcha",                                              image: "omipc.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "1pc" } } },        
              /*Snacks*/  { id: 1041,   name: "Aloo Chips",                                                 image: "omichip.jpg",           cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "100gm" } } },        
              /*Snacks*/  { id: 1042,   name: "Matar / Shakarpare",                                         image: "omims.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "250gm" } } },        
              /*Snacks*/  { id: 1043,   name: "Mathri",                                                     image: "omimathri.jpg",         cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "250gm" } } },        
              /*Snacks*/  { id: 1044,   name: "Methi Mathri",                                               image: "omimathri.jpg",         cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 70, count: 0, unit: "250gm" } } },
              /*Snacks*/  { id: 1045,   name: "Tikoni Mathri",                                              image: "omitm.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "250gm" } } },
              /*Snacks*/  { id: 1046,   name: "Moongra",                                                    image: "omibmong.jpg",          cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "200gm" } } },
              /*Snacks*/  { id: 1047,   name: "Sweet Shakarpare",                                           image: "omims.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "250gm" } } },
              /*Snacks*/  { id: 1048,   name: "Papri / Suhali",                                             image: "omips.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 60, count: 0, unit: "250gm" } } },
              /*Snacks*/  { id: 1049,   name: "Khasta Kachori",                                             image: "omikk.jpg",             cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 90, count: 0, unit: "250gm" } } },
              /*Snacks*/  { id: 1050,   name: "Coctail Samosa",                                             image: "omicsam.jpg",           cat: "partneromi",               subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 100, count: 0, unit: "250gm" } } },

                          { id: 1052,   name: "Kaju Katli",                                                 image: "omikkatli.jpg",         cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 300, count: 0, unit: "250g" }, "Qty.": { price: 600, count: 0, unit: "500gm" } } },
                          { id: 1053,   name: "Plain Khoya Barfi",                                          image: "omipkb.jpg",            cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 300, count: 0, unit: "500gm" } } },
                          { id: 1054,   name: "Coconut Barfi",                                              image: "omicbar.jpg",           cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 300, count: 0, unit: "500g" } } },
                          /*{ id: 1055,   name: "Mango Barfi",                                              image: "omimb.jpg",             cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 300, count: 0, unit: "500g" } } },*/
                          { id: 1056,   name: "Peda",                                                       image: "omipeda.jpg",           cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 300, count: 0, unit: "500g" } } },
                          { id: 1057,   name: "Milk Cake",                                                  image: "omimcake.jpg",          cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 340, count: 0, unit: "500g" } } },
                          { id: 1058,   name: "Desi Ghee Atta Pinni",                                       image: "omiapinni.jpg",         cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 180, count: 0, unit: "250g" }, "Qty.": { price: 360, count: 0, unit: "500g" } } },
                          { id: 1059,   name: "Kalajamun",                                                  image: "omikj.jpg",             cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 100, count: 0, unit: "250g" }, "Qty.": { price: 200, count: 0, unit: "500g" } } },
                          { id: 1060,   name: "Rasbari",                                                    image: "omirb.jpg",             cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 100, count: 0, unit: "250g" }, "Qty.": { price: 200, count: 0, unit: "500g" } } },
                          { id: 1061,   name: "Malai Chop",                                                 image: "omimchop.jpg",          cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 35, count: 0, unit: "1pc" }, "Qty.": { price: 250, count: 0, unit: "500g" } } },
                          { id: 1062,   name: "Paan Petha",                                                 image: "omippetha.jpg",         cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 20, count: 0, unit: "1pc" }, "Qty.": { price: 55, count: 0, unit: "250g" } } },
                          { id: 1063,   name: "Rasmalai",                                                   image: "omirmalai.jpg",         cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 50, count: 0, unit: "1pc" } } },
                          /*{ id: 1064,   name: "Boondi Ladoo",                                               image: "omibladoo.jpg",         cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 80, count: 0, unit: "250g" }, "Qty.": { price: 320, count: 0, unit: "1kg" } } },*/
                          { id: 1066,   name: "Imarti",                                                     image: "omiimarti.jpg",         cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 25, count: 0, unit: "1pc" }, "Qty.": { price: 370, count: 0, unit: "1kg" } } },
                          /*{ id: 1067,   name: "Mix Sweets",                                                 image: "omimsweet.jpg",         cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 250, count: 0, unit: "500g" }, "Qty.": { price: 500, count: 0, unit: "1kg" } } },*/
                          { id: 1068,   name: "Motichoor Ladoo",                                            image: "omimcl.jpg",            cat: "partneromi",               subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":     { price: 50, count: 0, unit: "4pc" }, "Qty.": { price: 160, count: 0, unit: "500g" } } },
                          { id: 10691,  name: "Malai Ghewar",                                               image: "omimg.jpg",             cat: "partneromi",               subcat: "All",                       selectedVariant: "Qty",          variants: { "Qty":     { price: 300, count: 0, unit: "500g" }, "Qty.": { price: 600, count: 0, unit: "1kg" } } },

                /*Snacks*/  { id: 1100,   name: "Samosa",                                                   image: "omisam.jpg",            cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 30, count: 0, unit: "1pc" } } },
                            { id: 1101,   name: "Vegetable Patties",                                        image: "omiap.jpg",             cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 40, count: 0, unit: "1pc" } } },
                            { id: 1102,   name: "Paneer Kulcha",                                            image: "omipc.jpg",             cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 60, count: 0, unit: "1pc" } } },
                            { id: 1103,   name: "Bread Pakoda",                                             image: "omibp.jpg",             cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 30, count: 0, unit: "1pc" } } },
                            { id: 1104,   name: "Aloo Bonda",                                               image: "omiab.jpg",             cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 60, count: 0, unit: "2pc" } } },
                            { id: 1105,   name: "Vada Pav",                                                 image: "omivp.jpg",             cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 60, count: 0, unit: "1pc" } } },
                            { id: 1106,   name: "French Fries",                                             image: "omiff.jpg",             cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 120, count: 0, unit: "100gm" } } },
                            { id: 1107,   name: "Peri Peri Fries",                                          image: "omippf.jpg",            cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 140, count: 0, unit: "100gm" } } },
                            { id: 1108,   name: "Honey Chilli Potatoes",                                    image: "omihcp.jpg",            cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 220, count: 0, unit: "500gm" } } },
                            { id: 1109,   name: "Pav Bhaji",                                                image: "omipb.jpg",             cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 150, count: 0, unit: "1pc" } } },
                            { id: 1110,   name: "Choley Bhature",                                           image: "omicholeb.jpg",         cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 150, count: 0, unit: "2pc" } } },
                            { id: 1111,   name: "Cold Snadwich (Mayonnaise)",                               image: "omicsandwich.jpg",      cat: "partneromif",              subcat: "Snacks",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 70, count: 0, unit: "1pc" } } },

                            { id: 1112,   name: "Idli Sambhar",                                             image: "omii.jpg",              cat: "partneromif",              subcat: "South Indian",              selectedVariant: "Qty",          variants: { "Qty":      { price: 130, count: 0, unit: "2pc" } } },
                            { id: 1113,   name: "Medu Vada",                                                image: "omimvada.jpg",          cat: "partneromif",              subcat: "South Indian",              selectedVariant: "Qty",          variants: { "Qty":      { price: 130, count: 0, unit: "2pc" } } },

                            { id: 1114,   name: "Momos Veg Steamed",                                        image: "omivm.jpg",             cat: "partneromif",              subcat: "Chinese",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 100, count: 0, unit: "6pc" } } },
                            { id: 1115,   name: "Momos Veg Fried",                                          image: "omivf.jpg",             cat: "partneromif",              subcat: "Chinese",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 150, count: 0, unit: "6pc" } } },
                            { id: 1116,   name: "Veg Noodles",                                              image: "omivn.jpg",             cat: "partneromif",              subcat: "Chinese",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 180, count: 0, unit: "1plt" } } },
                            { id: 1117,   name: "Fried Rice",                                               image: "omifr.jpg",             cat: "partneromif",              subcat: "Chinese",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 200, count: 0, unit: "1plt" } } },

                            { id: 1118,   name: "Poha with Vegetables",                                     image: "omipv.jpg",             cat: "partneromif",              subcat: "Poha",                      selectedVariant: "Qty",          variants: { "Qty":      { price: 180, count: 0, unit: "1plt" } } },
                            { id: 1119,   name: "Dalia with Vegetables",                                    image: "omidv.jpg",             cat: "partneromif",              subcat: "Poha",                      selectedVariant: "Qty",          variants: { "Qty":      { price: 150, count: 0, unit: "1plt" } } },

                            { id: 1120,   name: "Gulab Jamun",                                              image: "omigj.jpg",             cat: "partneromif",              subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 30, count: 0, unit: "1pc" } } },
                            { id: 1121,   name: "Rasgulla Sponge",                                          image: "omirs.jpg",             cat: "partneromif",              subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 30, count: 0, unit: "1pc" } } },
                            { id: 1122,   name: "Rasmalai",                                                 image: "omirmalai.jpg",         cat: "partneromif",              subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 50, count: 0, unit: "1pc" } } },
                            { id: 1123,   name: "Pastry Pineapple",                                         image: "omipp.jpg",             cat: "partneromif",              subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 30, count: 0, unit: "1pc" } } },
                            { id: 1125,   name: "Brownie",                                                  image: "omib.jpg",              cat: "partneromif",              subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 80, count: 0, unit: "1pc" } } },
                            { id: 1126,   name: "Bal Mithai",                                               image: "omibm.jpg",             cat: "partneromif",              subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 300, count: 0, unit: "500g" }, "Qty.":        { price: 600, count: 0, unit: "1kg" } } },
                            { id: 1127,   name: "Pure Chocolate Barfi",                                     image: "omicb.jpg",             cat: "partneromif",              subcat: "Sweets",                    selectedVariant: "Qty",          variants: { "Qty":      { price: 300, count: 0, unit: "500g" }, "Qty.":        { price: 600, count: 0, unit: "1kg" } } },

                            { id: 1128,   name: "Pasta White Sauce",                                        image: "omiwsp.jpg",            cat: "partneromif",              subcat: "Pasta",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 230, count: 0, unit: "500g" } } },
                            { id: 1129,   name: "Pasta Red Sauce",                                          image: "omirsp.jpg",            cat: "partneromif",              subcat: "Pasta",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 230, count: 0, unit: "500g" } } },
                            { id: 1130,   name: "Pasta Mamma Rosa",                                         image: "omimmp.jpg",            cat: "partneromif",              subcat: "Pasta",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 230, count: 0, unit: "500g" } } },

                            { id: 1131,   name: "Rajma Chawal",                                             image: "omirc.jpg",             cat: "partneromif",              subcat: "Combo",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 250, count: 0, unit: "1plt" } } },
                            { id: 1132,   name: "Choley Chawal",                                            image: "omicc.jpg",             cat: "partneromif",              subcat: "Combo",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 250, count: 0, unit: "1plt" } } },
                            { id: 1133,   name: "Kadi Chawal",                                              image: "omikc.jpg",             cat: "partneromif",              subcat: "Combo",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 250, count: 0, unit: "1plt" } } },
                            { id: 1134,   name: "Dal Makhani Chawal",                                       image: "omidmc.jpg",            cat: "partneromif",              subcat: "Combo",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 300, count: 0, unit: "1plt" } } },

                            { id: 1135,   name: "Aloo Zeera",                                               image: "omiaj.jpg",             cat: "partneromif",              subcat: "Sabzi",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 180, count: 0, unit: "500ml" } } },
                            { id: 1136,   name: "Choley",                                                   image: "omicholey.jpg",         cat: "partneromif",              subcat: "Sabzi",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 180, count: 0, unit: "500ml" } } },
                            { id: 1137,   name: "Aloo Matar",                                               image: "omiam.jpg",             cat: "partneromif",              subcat: "Sabzi",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 200, count: 0, unit: "500ml" } } },
                            { id: 1138,   name: "Aloo Gobhi",                                               image: "omiag.jpg",             cat: "partneromif",              subcat: "Sabzi",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 200, count: 0, unit: "500ml" } } },
                            { id: 1139,   name: "Bhindi Masala",                                            image: "omibmasal.jpg",         cat: "partneromif",              subcat: "Sabzi",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 220, count: 0, unit: "500ml" } } },
                            { id: 1140,   name: "Mix Vegetables",                                           image: "omimv.jpg",             cat: "partneromif",              subcat: "Sabzi",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 240, count: 0, unit: "500ml" } } },
                            { id: 1141,   name: "Paneer Bhuji",                                             image: "omipbuji.jpg",          cat: "partneromif",              subcat: "Sabzi",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 350, count: 0, unit: "500ml" } } },

                            { id: 1142,   name: "Dal Tadka Yellow",                                         image: "omiydt.jpg",            cat: "partneromif",              subcat: "Dal",                      selectedVariant: "Qty",           variants: { "Qty":      { price: 240, count: 0, unit: "500ml" } } },
                            { id: 1143,   name: "Dal Makhani",                                              image: "omidmakhni.jpg",        cat: "partneromif",              subcat: "Dal",                      selectedVariant: "Qty",           variants: { "Qty":      { price: 260, count: 0, unit: "500ml" } } },
                            { id: 1144,   name: "Matar Mushroom",                                           image: "omimmushroom.jpg",      cat: "partneromif",              subcat: "Dal",                      selectedVariant: "Qty",           variants: { "Qty":      { price: 260, count: 0, unit: "500ml" } } },
                            { id: 1145,   name: "Mushroom Masala",                                          image: "omimm.jpg",             cat: "partneromif",              subcat: "Dal",                      selectedVariant: "Qty",           variants: { "Qty":      { price: 260, count: 0, unit: "500ml" } } },
                            { id: 1146,   name: "Matar Paneer",                                             image: "omimp.jpg",             cat: "partneromif",              subcat: "Dal",                      selectedVariant: "Qty",           variants: { "Qty":      { price: 290, count: 0, unit: "500ml" } } },
                            { id: 1147,   name: "Kadai Paneer",                                             image: "omikp.jpg",             cat: "partneromif",              subcat: "Dal",                      selectedVariant: "Qty",           variants: { "Qty":      { price: 290, count: 0, unit: "500ml" } } },

                            { id: 1148,   name: "Plain Curd",                                               image: "omipcurd.jpg",          cat: "partneromif",              subcat: "Raita",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 90, count: 0, unit: "1cup" } } },
                            { id: 1149,   name: "Boondi Raita",                                             image: "omibraita.jpg",         cat: "partneromif",              subcat: "Raita",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 120, count: 0, unit: "1cup" } } },
                            { id: 1150,   name: "Mix Raita",                                                image: "omimr.jpg",             cat: "partneromif",              subcat: "Raita",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 100, count: 0, unit: "1cup" } } },

                            { id: 1151,   name: "Boiled Plain Rice",                                        image: "omirice.jpg",           cat: "partneromif",              subcat: "Rice",                     selectedVariant: "Qty",           variants: { "Qty":      { price: 80, count: 0, unit: "1plt" } } },
                            { id: 1152,   name: "Jeera Rice",                                               image: "omiricej.jpg",          cat: "partneromif",              subcat: "Rice",                     selectedVariant: "Qty",           variants: { "Qty":      { price: 120, count: 0, unit: "1plt" } } },

                            { id: 1153,   name: "Plain Tawa Roti",                                          image: "omitr.jpg",             cat: "partneromif",              subcat: "Roti",                     selectedVariant: "Qty",           variants: { "Qty":      { price: 20, count: 0, unit: "1pc" } } },
                            { id: 1154,   name: "Tawa Roti With Butter",                                    image: "omibroti.jpg",          cat: "partneromif",              subcat: "Roti",                     selectedVariant: "Qty",           variants: { "Qty":      { price: 25, count: 0, unit: "1pc" } } },
                            /*{ id: 1155,   name: "Classic Margerita",                                        image: "gcmp.jpg",              cat: "garrison",                 subcat: "Pizza",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 499, count: 0, unit: "1" } } },
                            { id: 1156,   name: "Pesto Veggie Delight Pizza",                               image: "gpvdp.jpg",             cat: "garrison",                 subcat: "Pizza",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 599, count: 0, unit: "1" } } },
                            { id: 1157,   name: "Loaded Veg Pizza",                                         image: "gvlp.jpg",              cat: "garrison",                 subcat: "Pizza",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 599, count: 0, unit: "1" } } },
                            { id: 1158,   name: "Paneer Tikka Pizza",                                       image: "gptp.jpg",              cat: "garrison",                 subcat: "Pizza",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 599, count: 0, unit: "1" } } },
                            { id: 1159,   name: "Chicken Tikka Pizza",                                      image: "gctp.jpg",              cat: "garrison",                 subcat: "Pizza",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 599, count: 0, unit: "1" } } },
                            { id: 1160,   name: "Peri-Peri Chicken Pizza",                                        image: "gppc.jpg",              cat: "garrison",                 subcat: "Pizza",                    selectedVariant: "Qty",           variants: { "Qty":      { price: 599, count: 0, unit: "1" } } },

                            { id: 1161,   name: "Walnut Fudge Brownie",                                     image: "gwfb.jpg",               cat: "garrison",                 subcat: "Desserts",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 245, count: 0, unit: "1" } } },
                            { id: 1162,   name: "Lotus Biscoff Cheese Cake",                                image: "glbcc.jpg",              cat: "garrison",                 subcat: "Desserts",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 275, count: 0, unit: "1" } } },
                            { id: 1164,   name: "Tres Leches",                                              image: "gtl.jpg",                cat: "garrison",                 subcat: "Desserts",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 265, count: 0, unit: "1" } } },
                            { id: 1166,   name: "Chocolate Cake",                                           image: "gck.jpg",                cat: "garrison",                 subcat: "Desserts",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 200, count: 0, unit: "1" } } },
                            { id: 1167,   name: "Carrot Cheese Cake",                                       image: "gccc.jpg",               cat: "garrison",                 subcat: "Desserts",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 240, count: 0, unit: "1" } } },
                            { id: 1168,   name: "Tiramisu",                                                 image: "gtira.jpg",              cat: "garrison",                 subcat: "Desserts",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 315, count: 0, unit: "1" } } },
                            { id: 1169,   name: "Banana Tea Cake",                                          image: "gbtc.jpg",               cat: "garrison",                 subcat: "Desserts",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 150, count: 0, unit: "1" } } },

                            { id: 1170,   name: "Veg Loaded Burger",                                        image: "gvlb.jpg",               cat: "garrison",                 subcat: "Burger",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 399, count: 0, unit: "1" } } },

                            { id: 1181,   name: "Veg Momo - Classic Steam",                                        image: "gmomo.jpg",               cat: "garrison",                 subcat: "Momos",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 299, count: 0, unit: "6pc" } } },
                            { id: 1186,   name: "Mushroom and Cheese momo",                                        image: "gmomo.jpg",               cat: "garrison",                 subcat: "Momos",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 299, count: 0, unit: "6pc" } } },

                            { id: 1182,   name: "Paneer Tikka Sandwich",                                        image: "gs.jpg",               cat: "garrison",                 subcat: "Sandwich",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 399, count: 0, unit: "4pc" } } },
                            { id: 1183,   name: "Grilled Vegetarian Sandwich",                                        image: "gs.jpg",               cat: "garrison",                 subcat: "Sandwich",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 399, count: 0, unit: "4pc" } } },
                            { id: 1184,   name: "Chicken Tikka Sandwich",                                        image: "gs.jpg",               cat: "garrison",                 subcat: "Sandwich",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 499, count: 0, unit: "4pc" } } },
                            { id: 1185,   name: "Chicken Salami Sandwich",                                        image: "gs.jpg",               cat: "garrison",                 subcat: "Sandwich",                 selectedVariant: "Qty",           variants: { "Qty":      { price: 499, count: 0, unit: "4pc" } } },*/

                            { id: 1171,   name: "Tiffin Stainless Steel",                                   image: "aavibt4.jpg",            cat: "aavi",                     subcat: "Tiffin",                 description: "Compartment: 3 || Stainless Steel || Leak Proof || 750 ML || Rectangle Shape",                     gallery: ["aavibt1.jpg", "aavibt2.jpg", "aavibt3.jpg", "aavibt4.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 300, count: 0, unit: "1" } } },
                            { id: 1172,   name: "Tiffin two Layers Blue",                                   image: "aavitiffinb41.jpg",      cat: "aavi",                     subcat: "Tiffin",                 description: "Compartment: 3 || Levels 2 || Leak Proof || Square Shape || Spoon and Fork ",                     gallery: ["aavitiffinb4.jpg", "aavitiffinb42.jpg", "aavitiffinb41.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 200, count: 0, unit: "1" } } },
                            { id: 1173,   name: "Tiffin one layer Peach",                                   image: "aavitiffinpink.jpg",     cat: "aavi",                     subcat: "Tiffin",                 description: "Compartment: 3 || Stainless Steel || Rectangle Shape || Spoon and Fork",                     gallery: ["aavitiffinpink1.jpg", "aavitiffinpink2.jpg", "aavitiffinpink.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 150, count: 0, unit: "1" } } },
                            { id: 1174,   name: "Tiffin Bite Buddy",                                        image: "aavitiffinbr.jpg",       cat: "aavi",                     subcat: "Tiffin",                 description: "Compartment: 4 || Stainless Steel || Spoon and Fork",                     gallery: ["aavitiffinbr1.jpg", "aavitiffinbr2.jpg", "aavitiffinbr3.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 345, count: 0, unit: "1" } } },

                            { id: 1175,   name: "Silicon Foldable Water Bottle",                            image: "aavifb1.jpg",            cat: "aavi",                     subcat: "Water Bottle",                 description: "750 ML || Light Weight || Easy to Carry ||",                     gallery: ["aavifb1.jpg", "aavifb2.jpg", "aavifb3.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 280, count: 0, unit: "1" } } },
                            { id: 1176,   name: "Trendy Sipper",                                            image: "aaviwb.jpg",             cat: "aavi",                     subcat: "Water Bottle",                 description: "500 ML || Light Weight || Easy to Carry || Straw Sipper",                     gallery: ["aaviwb.jpg", "aaviwb1.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 280, count: 0, unit: "1" } } },
                            { id: 1177,   name: "Astronaut Water Bottle",                                   image: "aaviawb.jpg",            cat: "aavi",                     subcat: "Water Bottle",                 description: "500 ML || Light Weight || Easy to Carry || Straw Sipper",                     gallery: ["aaviawb.jpg", "aaviawb1.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 250, count: 0, unit: "1" } } },

                            
                            { id: 1180,   name: "Bus Shape Bottle",                                   image: "aavibsb.jpg",            cat: "aavi",                     subcat: "Water Bottle",                 description: "500 ML || Bus Style || Easy to Carry || Straw Sipper || Carry Trap",                     gallery: ["aavibsb.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 260, count: 0, unit: "1" } } },
                            { id: 1281,   name: "Large Water Bottle",                                   image: "aavibwb.jpg",            cat: "aavi",                     subcat: "Water Bottle",                 description: "2 L || Large || Reminder Text || GYM",                     gallery: ["aavibwb.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 200, count: 0, unit: "1" } } },

                            { id: 1178,   name: "Bus Pencil Box",                                           image: "aavipb.jpg",             cat: "aavi",                     subcat: "Pencil Box",                 description: "Length: 9.5 || Width: 2.5 || Compartment: 3 || Sharpner",                     gallery: ["aavipb.jpg", "aavipb1.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 200, count: 0, unit: "1" } } },
                            { id: 1179,   name: "Princess Pencil Box",                                      image: "aavipbp.jpg",            cat: "aavi",                     subcat: "Pencil Box",                 description: "Inbuilt sharpner || Inbuilt Sharpner || Compartment: 2 || Inbuilt Calculator",                     gallery: ["aavipbp1.jpg", "aavipbp2.jpg", "aavipbp3.jpg", "aavipbp.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 250, count: 0, unit: "1" } } },

                            { id: 1583,   name: "Nude Eye shadow Paletter",                                      image: "aavinesp.jpg",            cat: "aavi",                     subcat: "Make up",                 description: "15 Shades || Stylish Container || Premium Quality",                     gallery: ["aavinesp.jpg", "aavinesp1.jpg", "aavinesp2.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 250, count: 0, unit: "1" } } },
                            { id: 1584,   name: "Rose Gold Shimmer Highlighter",                                      image: "aavirgh.jpg",            cat: "aavi",                     subcat: "Make up",                 description: "Rose Gold Shimmer Highlighter || Stylish Container || Premium Quality",                     gallery: ["aavirgh.jpg", "aavirgh1.jpg", "aavirgh2.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 120, count: 0, unit: "1" } } },
                            { id: 1585,   name: "Baby Pink Shimmer Highlighter",                                      image: "aavibpsh.jpg",            cat: "aavi",                     subcat: "Make up",                 description: "Baby Pink Shimmer Highlighter || Stylish Container || Premium Quality",                     gallery: ["aavibpsh.jpg", "aavirgh1.jpg", "aavirgh2.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 120, count: 0, unit: "1" } } },
                            { id: 1586,   name: "Three in one - Highlighter",                                      image: "aavith.jpg",            cat: "aavi",                     subcat: "Make up",                 description: "Three in one Highlighter || Stylish Container || Premium Quality",                     gallery: ["aavith.jpg", "aavith1.jpg", "aavith3.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 120, count: 0, unit: "1" } } },

                            { id: 1587,   name: "Pichoda / Dhattu / Saffa",                                      image: "aavihs.jpg",            cat: "aavi",                     subcat: "Head Wear",                 description: "Traditional Head wear || Stylish || Trendy || Souveniers",                     gallery: ["aavihs.jpg", "aavihsa.jpg", "aavihsb.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 80, count: 0, unit: "1" } } },
                            { id: 1588,   name: "Pahadi Cap",                                      image: "aavihc.jpg",            cat: "aavi",                     subcat: "Head Wear",                 description: "Traditional Head Wear || Stylish || Trendy || Souveniers",                     gallery: ["aavihc.jpg", "aavihca.jpg", "aavihcb.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 120, count: 0, unit: "1" } } },

                            { id: 1589,   name: "Hair Chip 1",                                      image: "aavic1.jpg",            cat: "aavi",                     subcat: "Hair Clip",                 description: "Golden Color || Stylish || Trendy || Souveniers",                     gallery: ["aavic1.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 29, count: 0, unit: "1" } } },
                            { id: 1590,   name: "Hair Chip 2",                                      image: "aavic2.jpg",            cat: "aavi",                     subcat: "Hair Clip",                 description: "Golden Color || Stylish || Trendy || Souveniers",                     gallery: ["aavic2.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 29, count: 0, unit: "1" } } },
                            { id: 1591,   name: "Hair Chip 3",                                      image: "aavic3.jpg",            cat: "aavi",                     subcat: "Hair Clip",                 description: "Golden Color || Stylish || Trendy || Souveniers",                     gallery: ["aavic3.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 29, count: 0, unit: "1" } } },
                            { id: 1592,   name: "Hair Chip 4",                                      image: "aavic4.jpg",            cat: "aavi",                     subcat: "Hair Clip",                 description: "Golden Color || Stylish || Trendy || Souveniers",                     gallery: ["aavic4.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 29, count: 0, unit: "1" } } },
                            { id: 1593,   name: "Hair Chip 5",                                      image: "aavic5.jpg",            cat: "aavi",                     subcat: "Hair Clip",                 description: "Golden Color || Stylish || Trendy || Souveniers",                     gallery: ["aavic5.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 29, count: 0, unit: "1" } } },
                            { id: 1594,   name: "Hair Chip 6",                                      image: "aavic6.jpg",            cat: "aavi",                     subcat: "Hair Clip",                 description: "Golden Color || Stylish || Trendy || Souveniers",                     gallery: ["aavic6.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 29, count: 0, unit: "1" } } },
                            { id: 1595,   name: "Hair Chip 7",                                      image: "aavic7.jpg",            cat: "aavi",                     subcat: "Hair Clip",                 description: "Golden Color || Stylish || Trendy || Souveniers",                     gallery: ["aavic7.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 29, count: 0, unit: "1" } } },
                            { id: 1596,   name: "Hair Chip 8",                                      image: "aavic8.jpg",            cat: "aavi",                     subcat: "Hair Clip",                 description: "Golden Color || Stylish || Trendy || Souveniers",                     gallery: ["aavic8.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 29, count: 0, unit: "1" } } },
                            { id: 1597,   name: "Hair Chip 9",                                      image: "aavic9.jpg",            cat: "aavi",                     subcat: "Hair Clip",                 description: "Golden Color || Stylish || Trendy || Souveniers",                     gallery: ["aavic9.jpg"],         selectedVariant: "Qty",        variants: { "Qty": { price: 29, count: 0, unit: "1" } } },
                            { id: 1598,   name: "Hair Chip 10",                                     image: "aavic10.jpg",           cat: "aavi",                     subcat: "Hair Clip",                 description: "Golden Color || Stylish || Trendy || Souveniers",                     gallery: ["aavic10.jpg"],        selectedVariant: "Qty",        variants: { "Qty": { price: 29, count: 0, unit: "1" } } },

                            /*{ id: 1280,   name: "Jhangore Ki Kheer",                                      image: "toujkk.jpg",            cat: "tou",                     subcat: "Famous",                 description: " Barnyard Millet || 2 Serving || Jaggery || Dry Fruit Garnish || Milk",                     gallery: ["toujkk.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 100, count: 0, unit: "250g" } } },
                            { id: 1281,   name: "Aarsa",                                      image: "touarsa.jpg",            cat: "tou",                     subcat: "Famous",                 description: " Rice || Jaggery || Saunf || Safed Till",                     gallery: ["touarsa.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 100, count: 0, unit: "4pc" }, "Qty.":        { price: 500, count: 0, unit: "1kg" } } },
                            { id: 1282,   name: "Rotana",                                      image: "tourotana.jpg",            cat: "tou",                     subcat: "Famous",                 description: " Atta || Saunf || Jaggary || Coconut ",                     gallery: ["tourotana.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 100, count: 0, unit: "4pc" }, "Qty.":        { price: 500, count: 0, unit: "1kg" } } },
                            { id: 1293,   name: "Pahadi Pakodi",                                      image: "toudp.jpg",            cat: "tou",                     subcat: "Famous",                 description: " Urad and Moong dal || Sessimi seeds || Traditional pakodi || 5hr prep time ",                     gallery: ["toumkr.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 300, count: 0, unit: "500g" }, "Qty.":        { price: 600, count: 0, unit: "1kg" } } },

                            { id: 1283,   name: "Pahadi Rajma",                                      image: "toupr.jpg",            cat: "tou",                     subcat: "Gravy",                 description: " Pahadi Rajma from Fields of Himalayas|| 2 Serving || Rich in taste and aroma || ",                     gallery: ["toupr.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 200, count: 0, unit: "1 plt" } } },
                            { id: 1284,   name: "Aloo and Muli mix thichwani",                                      image: "touamt.jpg",            cat: "tou",                     subcat: "Gravy",                 description: " Pahadi ALu and Muli|| 2 Serving || Season dish || ",                     gallery: ["touamt.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 150, count: 0, unit: "1 plt" } } },
                            { id: 1285,   name: "Fanu",                                      image: "toufanu.jpg",            cat: "tou",                     subcat: "Gravy",                 description: " Gahat Dal crushed and cooked into fine pieces|| 2 Serving || Jakhiya  || Garlic || Heeng",                     gallery: ["toufanu.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 200, count: 0, unit: "1 plt" } } },
                            { id: 1286,   name: "Chainsu",                                      image: "touchain.jpg",            cat: "tou",                     subcat: "Gravy",                 description: " Urad Dal crushed and cooked into fine pieces || 2 Serving ||  || ",                     gallery: ["touchain.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 200, count: 0, unit: "1 plt" } } },

                            { id: 1288,   name: "Rai Saag Bhuji",                                      image: "toursb.jpg",            cat: "tou",                     subcat: "Sabzi",                 description: " Himalayan Mustard Greens || 2 Serving ||  || ",                     gallery: ["toursb.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 80, count: 0, unit: "1 plt" } } },
                            { id: 1289,   name: "Kafuli",                                      image: "toukafuli.jpg",            cat: "tou",                     subcat: "Gravy",                 description: " The Greens: A blend of Spinach (Palak) and Fenugreek (Methi), often enriched with local wild greens or mustard leaves for a sharp, complex flavor.The Thickener: Traditionally uses Rice Flour (instead of maize flour), creating a uniquely smooth, silky, and velvety consistency. The Texture: A luscious, soupy gravy made by boiling and mashing the greens into a fine paste rather than leaving them chunky.|| 2 Serving ",                     gallery: ["toukafuli.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 80, count: 0, unit: "1 plt" } } },
                            { id: 1290,   name: "Pahadi Patta Gobi",                                      image: "touppg.jpg",            cat: "tou",                     subcat: "Sabzi",                 description: " Patta Gobi From the fiels of Himalayas || 2 Serving ",                     gallery: ["touppg.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 80, count: 0, unit: "1 plt" } } },



                            { id: 1291,   name: "Jhangoora Ka Bhaat",                                      image: "toujab.jpg",            cat: "tou",                     subcat: "Rice",                 description: " Barnyard Millet || 2 Serving|| To be eaten with gravy or sabji || Rich in Protien || ",                     gallery: ["toujab.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 150, count: 0, unit: "1 plt" } } },
                            { id: 1292,   name: "Lal Chawal",                                      image: "tourr.jpg",            cat: "tou",                     subcat: "Rice",                 description: "Red rice from the fields of Purola, Uttarkashi || 2 Serving|| Rich in Antioxidants || High Protien ",                     gallery: ["tourr.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 150, count: 0, unit: "1 plt" } } },

                            { id: 1294,   name: "Mandue / Koda Roti Tawa - Butter",                                      image: "toumkrb.jpg",            cat: "tou",                     subcat: "Rice",                 description: " Ragi from the fiels of Himalayas || 1 Roti || High in Calcium || Gluten-Free ",                     gallery: ["toumkrb.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 40, count: 0, unit: "1" } } },
                            { id: 1295,   name: "Makki Roti Tawa",                                      image: "toumkkr.jpg",            cat: "tou",                     subcat: "Rice",                 description: " Basic Makki ki Roti || 1 Roti",                     gallery: ["toumkkr.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 35, count: 0, unit: "1" } } }, 
                            { id: 1296,   name: "Makki Roti Tawa - Butter",                                      image: "toumkkrb.jpg",            cat: "tou",                     subcat: "Rice",                 description: " Basic Makki ki Roti || 1 Roti",                     gallery: ["toumkkrb.jpg"],         selectedVariant: "Qty",        variants: { "Qty":      { price: 40, count: 0, unit: "1" } } },

                            { id: 1297,   name: "Pahadi Namak / Pessu Lone - Jeera flavour",                                      image: "tounj.jpg",            cat: "tou",                     subcat: "Namak",                          selectedVariant: "Qty",        variants: { "Qty":      { price: 150, count: 0, unit: "250gm" } } },
                            { id: 1298,   name: "Pahadi Namak / Pessu Lone - Pudhina and Chilli flavour",                                      image: "tounpc.jpg",            cat: "tou",                     subcat: "Namak",                          selectedVariant: "Qty",        variants: { "Qty":      { price: 150, count: 0, unit: "250gm" } } },
                            { id: 1299,   name: "Pahadi Namak / Pessu Lone - Lessun and Adrak flavour",                                      image: "tounla.jpg",            cat: "tou",                     subcat: "Namak",                          selectedVariant: "Qty",        variants: { "Qty":      { price: 150, count: 0, unit: "250gm" } } },*/


                            
                            { id: 1301,   name: "Beans",                                      image: "vfbeans.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 80, count: 0, unit: "1kg" } } },             
                            { id: 1302,   name: "Lady Finger",                                      image: "vflf.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 100, count: 0, unit: "1kg" } } },             
                            { id: 1303,   name: "Bitter Gourd",                                      image: "vfbitterg.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 80, count: 0, unit: "1kg" } } },             
                            { id: 1304,   name: "Bottle Gourd",                                      image: "vfbgourd.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 60, count: 0, unit: "1kg" } } },             
                            { id: 1305,   name: "Brinjal",                                      image: "vfbrinjal.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 60, count: 0, unit: "1kg" } } },             
                            { id: 1306,   name: "Broccoli",                                      image: "vfbrocoli.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 320, count: 0, unit: "1kg" } } },             
                            { id: 1307,   name: "Cabbage",                                      image: "vfcabbage.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 50, count: 0, unit: "1kg" } } },             
                            { id: 1308,   name: "Capsicum",                                      image: "vfcapsicum.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 80, count: 0, unit: "1kg" } } },             
                            { id: 1309,   name: "Carrot",                                      image: "vfcarrot.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 70, count: 0, unit: "1kg" } } },             
                            { id: 1310,   name: "Dhaniya Bunch",                                      image: "vfdhaniya.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 60, count: 0, unit: "1b" } } },             
                            { id: 1311,   name: "Ginger",                                      image: "vfginger.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 100, count: 0, unit: "500gm" } } },             
                            { id: 1312,   name: "Gobi",                                      image: "vfgobi.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 100, count: 0, unit: "1kg" } } },                  
                            { id: 1314,   name: "Cucumber",                                      image: "vfcucumber.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 70, count: 0, unit: "1kg" } } },             
                          /*{ id: 1315,   name: "Methi Bunch",                                      image: "vfmethi.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 30, count: 0, unit: "1b" } } },             */
                            { id: 1316,   name: "Mushroom",                                      image: "vfmushroom.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 30, count: 0, unit: "1pkt" } } },             
                            { id: 1317,   name: "Onion",                                      image: "vfonion.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 60, count: 0, unit: "1kg" } } },             
                            { id: 1318,   name: "Palak Bunch",                                      image: "vfpalak.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 50, count: 0, unit: "1b" } } },             
                            { id: 1319,   name: "Peas",                                      image: "vfpeas.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 160, count: 0, unit: "1kg" } } },             
                            { id: 1320,   name: "Potato",                                      image: "vfpotato.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 30, count: 0, unit: "1kg" } } },             
                            { id: 1321,   name: "Pumpkin",                                      image: "vfpumpkin.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 60, count: 0, unit: "1kg" } } },             
                            { id: 1322,   name: "Raddish",                                      image: "vfraddish.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 50, count: 0, unit: "1kg" } } },             
                            { id: 1323,   name: "Saljam",                                      image: "vfsaljam.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 70, count: 0, unit: "1kg" } } },             
                            { id: 1324,   name: "Tomato",                                      image: "vftomato.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 70, count: 0, unit: "1kg" } } },             
                            { id: 1325,   name: "Tori",                                      image: "vftori.jpg",            cat: "fresh",                     subcat: "Veggies",   selectedVariant: "Qty",           variants: { "Qty":      { price: 110, count: 0, unit: "1kg" } } },             

                            { id: 1326,   name: "Apple",                                      image: "vfapple.jpg",            cat: "fresh",                     subcat: "Fruits",   selectedVariant: "Qty",           variants: { "Qty":      { price: 170, count: 0, unit: "500g" }, "Qty.":        { price: 340, count: 0, unit: "1kg" } } },             
                            { id: 1327,   name: "Banana",                                      image: "vfbanana.jpg",            cat: "fresh",                     subcat: "Fruits",   selectedVariant: "Qty",           variants: { "Qty":      { price: 40, count: 0, unit: "6pc" }, "Qty.":        { price: 80, count: 0, unit: "1dzn" } } },             
                            /*{ id: 1328,   name: "Grapes",                                      image: "vfgrapes.jpg",            cat: "fresh",                     subcat: "Fruits",   selectedVariant: "Qty",           variants: { "Qty":      { price: 200, count: 0, unit: "1kg" } } },*/
                            
                            { id: 1330,   name: "Papaya",                                      image: "vfpapaya.jpg",            cat: "fresh",                     subcat: "Fruits",   selectedVariant: "Qty",           variants: { "Qty":      { price: 70, count: 0, unit: "1kg" } } },             
                            

                            { id: 1405,   name: "Plain Dosa",                                      image: "tospd.jpg",            cat: "tos",                     subcat: "Rava",   selectedVariant: "Qty",           variants: { "Qty":      { price: 149, count: 0, unit: "1" } } },             
                            { id: 1406,   name: "Onion Plain Dosa",                                      image: "tosfd.jpg",            cat: "tos",                     subcat: "Rava",   selectedVariant: "Qty",           variants: { "Qty":      { price: 149, count: 0, unit: "1" } } },             
                            { id: 1407,   name: "Masala Dosa",                                      image: "tosfd.jpg",            cat: "tos",                     subcat: "Rava",   selectedVariant: "Qty",           variants: { "Qty":      { price: 149, count: 0, unit: "1" } } },  
                            { id: 1409,   name: "Panner Masala Dosa",                                      image: "tosfd.jpg",            cat: "tos",                     subcat: "Rava",   selectedVariant: "Qty",           variants: { "Qty":      { price: 149, count: 0, unit: "1" } } },     


                            { id: 1412,   name: "Onion Uttappam",                                      image: "tosu.jpg",            cat: "tos",                     subcat: "Uttappam",   selectedVariant: "Qty",           variants: { "Qty":      { price: 149, count: 0, unit: "1" } } },             
                            { id: 1413,   name: "Tomato Uttappam",                                      image: "tosu.jpg",            cat: "tos",                     subcat: "Uttappam",   selectedVariant: "Qty",           variants: { "Qty":      { price: 149, count: 0, unit: "1" } } },             
                            { id: 1414,   name: "Onion Tomato Uttappam",                                      image: "tosu.jpg",            cat: "tos",                     subcat: "Uttappam",   selectedVariant: "Qty",           variants: { "Qty":      { price: 149, count: 0, unit: "1" } } },             

                            { id: 1600,   name: "Pineapple  - Flavour",                                      image: "bakerypc.jpg",            cat: "bakery",                     subcat: "Cake",   selectedVariant: "Qty",           variants: { "Qty":      { price: 399, count: 0, unit: "1pnd" }, "Qty.":        { price: 799, count: 0, unit: "2pnd" } } },             
                            { id: 1601,   name: "Black Forest",                                      image: "bakerybfc.jpg",            cat: "bakery",                     subcat: "Cake",   selectedVariant: "Qty",                  variants: { "Qty":      { price: 499, count: 0, unit: "1pnd" }, "Qty.":        { price: 999, count: 0, unit: "2pnd" } } },             
                            { id: 1602,   name: "Butter Scotch",                                      image: "bakerybs.jpg",            cat: "bakery",                     subcat: "Cake",   selectedVariant: "Qty",                  variants: { "Qty":      { price: 499, count: 0, unit: "1pnd" }, "Qty.":        { price: 999, count: 0, unit: "2pnd" } } },             
                            { id: 1603,   name: "Chocolate",                                      image: "bakerycc.jpg",            cat: "bakery",                     subcat: "Cake",   selectedVariant: "Qty",                      variants: { "Qty":      { price: 599, count: 0, unit: "1pnd" }, "Qty.":        { price: 1199, count: 0, unit: "2pnd" } } },             
                            { id: 1605,   name: "Walnut Chocolate",                                      image: "bakerycw.jpg",            cat: "bakery",                     subcat: "Cake",   selectedVariant: "Qty",               variants: { "Qty":      { price: 599, count: 0, unit: "1pnd" }, "Qty.":        { price: 1199, count: 0, unit: "2pnd" } } },             
                            { id: 1606,   name: "Red Velvet",                                      image: "bakeryrv.jpg",            cat: "bakery",                     subcat: "Cake",   selectedVariant: "Qty",                     variants: { "Qty":      { price: 599, count: 0, unit: "1pnd" }, "Qty.":        { price: 1199, count: 0, unit: "2pnd" } } },             
                            { id: 1608,   name: "Mango - Flavour",                                      image: "bakerym.jpg",            cat: "bakery",                     subcat: "Cake",   selectedVariant: "Qty",                 variants: { "Qty":      { price: 599, count: 0, unit: "1pnd" }, "Qty.":        { price: 1199, count: 0, unit: "2pnd" } } },             
                            { id: 1609,   name: "Black Currant - Flavour",                                      image: "bakerybc.jpg",            cat: "bakery",                     subcat: "Cake",   selectedVariant: "Qty",        variants: { "Qty":      { price: 599, count: 0, unit: "1pnd" }, "Qty.":        { price: 1199, count: 0, unit: "2pnd" } } },             
                            { id: 1610,   name: "Strawberry - Flavour",                                      image: "bakerys.jpg",            cat: "bakery",                     subcat: "Cake",   selectedVariant: "Qty",            variants: { "Qty":      { price: 599, count: 0, unit: "1pnd" }, "Qty.":        { price: 1199, count: 0, unit: "2pnd" } } },             

                            { id: 1611,   name: "Party Popper - Paper Confetti",                               image: "bakerypp.jpg",            cat: "bakery",                     subcat: "Popper",   selectedVariant: "Qty",           variants: { "Qty":      { price: 150, count: 0, unit: "1" } } },             
                            { id: 1612,   name: "Happy Birthday decor",                               image: "bakeryhb.jpg",            cat: "bakery",                     subcat: "Decor",   selectedVariant: "Qty",           variants: { "Qty":      { price: 180, count: 0, unit: "1" } } },             
                            { id: 1613,   name: "Baloon Pack - Red, White, Black, and Gold",                               image: "bakerybp.jpg",            cat: "bakery",                     subcat: "Decor",   selectedVariant: "Qty",           variants: { "Qty":      { price: 150, count: 0, unit: "1" } } },                                                                                                                                                                                                                                                                                                                                                                                                                                              

                            { id: 1614,   name: "Lotus Bescooff Chese Cake Slice",                                      image: "bakerylbs.jpg",            cat: "bakery",                     subcat: "Slice",   selectedVariant: "Qty",           variants: { "Qty":      { price: 250, count: 0, unit: "1" } } },             
                            { id: 1615,   name: "Blueberry Chese Cake Slice",                                      image: "bakerybcc.jpg",            cat: "bakery",                     subcat: "Slice",   selectedVariant: "Qty",           variants: { "Qty":      { price: 250, count: 0, unit: "1" } } },             
                            { id: 1616,   name: "Pistacwio Kunafa Chese Cake Slice",                                      image: "bakerypkc.jpg",            cat: "bakery",                     subcat: "Slice",   selectedVariant: "Qty",           variants: { "Qty":      { price: 250, count: 0, unit: "1" } } },             
                            { id: 1617,   name: "Truffle Slice",                                      image: "bakeryts.jpg",            cat: "bakery",                     subcat: "Slice",   selectedVariant: "Qty",           variants: { "Qty":      { price: 150, count: 0, unit: "1" } } },             

                            { id: 1618,   name: "Chocolate Mud Pie",                                      image: "bakerycmp.jpg",            cat: "bakery",                     subcat: "Pie",   selectedVariant: "Qty",           variants: { "Qty":      { price: 299, count: 0, unit: "1" } } },             
                            { id: 1619,   name: "Brownie Donut",                                          image: "bakerybd.jpg",            cat: "bakery",                     subcat: "Donut",   selectedVariant: "Qty",           variants: { "Qty":      { price: 199, count: 0, unit: "1" } } },             
                            { id: 1620,   name: "Cup Cake",                                               image: "bakeryccake.jpg",            cat: "bakery",                     subcat: "Cup Cake",   selectedVariant: "Qty",           variants: { "Qty":      { price: 199, count: 0, unit: "1" } } },             
                            { id: 1622,   name: "Chocolate Cup Cake",                                     image: "bakeryccc.jpg",            cat: "bakery",                     subcat: "Cup Cake",   selectedVariant: "Qty",           variants: { "Qty":      { price: 199, count: 0, unit: "1" } } },             
                            { id: 1623,   name: "Kit Kat Donut",                                          image: "bakerykd.jpg",            cat: "bakery",                     subcat: "Donut",   selectedVariant: "Qty",           variants: { "Qty":      { price: 199, count: 0, unit: "1" } } },             
                            { id: 1624,   name: "Caramel Muffin",                                         image: "bakerycm.jpg",            cat: "bakery",                     subcat: "Muffin",   selectedVariant: "Qty",           variants: { "Qty":      { price: 199, count: 0, unit: "1" } } },             
                            { id: 1625,   name: "Choco Lava",                                             image: "bakerycl.jpg",            cat: "bakery",                     subcat: "Choco Lava",   selectedVariant: "Qty",           variants: { "Qty":      { price: 199, count: 0, unit: "1" } } },             
                            { id: 1626,   name: "Blueberry Muffin",                                       image: "bakerybbm.jpg",            cat: "bakery",                     subcat: "Muffin",   selectedVariant: "Qty",           variants: { "Qty":      { price: 199, count: 0, unit: "1" } } },             
                            { id: 1627,   name: "Mango Cream Roll",                                       image: "bakerycr.jpg",            cat: "bakery",                     subcat: "Cream Rolls",   selectedVariant: "Qty",           variants: { "Qty":      { price: 79, count: 0, unit: "1" } } },           
                            { id: 1628,   name: "Cream Roll",                                             image: "bakerycr.jpg",            cat: "bakery",                     subcat: "Cream Rolls",   selectedVariant: "Qty",           variants: { "Qty":      { price: 79, count: 0, unit: "1" } } },           

                            { id: 1701,   name: "BBQ Tandoori Chicken",                                     image: "fdtc.jpg",            cat: "fined",                     subcat: "BBQ",          selectedVariant: "Qty",           variants: { "Qty":      { price: 799, count: 0, unit: "1Full" },    "Qty.":        { price: 499, count: 0, unit: "1Half" } } },
                            { id: 1702,   name: "BBQ Afgani Chicken",                                       image: "fdac.jpg",            cat: "fined",                     subcat: "BBQ",          selectedVariant: "Qty",           variants: { "Qty":      { price: 699, count: 0, unit: "1Full" },    "Qty.":        { price: 399, count: 0, unit: "1Half" } } },
                            { id: 1703,   name: "Chicken Tikka",                                            image: "fdct.jpg",            cat: "fined",                     subcat: "BBQ",          selectedVariant: "Qty",           variants: { "Qty":      { price: 499, count: 0, unit: "1Full" } } },
                            { id: 1704,   name: "Paneer Tikka",                                             image: "fdpt.jpg",            cat: "fined",                     subcat: "BBQ",          selectedVariant: "Qty",           variants: { "Qty":      { price: 449, count: 0, unit: "1Full" } } },
                            { id: 1705,   name: "Butter Chicken",                                           image: "fdbc.jpg",            cat: "fined",                     subcat: "Gravy",        selectedVariant: "Qty",           variants: { "Qty":      { price: 899, count: 0, unit: "1Full" },    "Qty.":        { price: 549, count: 0, unit: "1Half" } } },
                            { id: 1706,   name: "Kadhai Chciken",                                           image: "fdkc.jpg",            cat: "fined",                     subcat: "Gravy",        selectedVariant: "Qty",           variants: { "Qty":      { price: 899, count: 0, unit: "1Full" },    "Qty.":        { price: 549, count: 0, unit: "1Half" } } },
                            { id: 1707,   name: "Chicken Biryani",                                          image: "fdcb.jpg",            cat: "fined",                     subcat: "Biryani",      selectedVariant: "Qty",           variants: { "Qty":      { price: 499, count: 0, unit: "1Full" } } },
                            { id: 1708,   name: "Veg Biryani",                                              image: "fdvb.jpg",            cat: "fined",                     subcat: "Biryani",      selectedVariant: "Qty",           variants: { "Qty":      { price: 449, count: 0, unit: "1Full" } } },
                            { id: 1709,   name: "Dal Makhni",                                               image: "fddm.jpg",            cat: "fined",                     subcat: "Gravy",        selectedVariant: "Qty",           variants: { "Qty":      { price: 499, count: 0, unit: "1Full" } } },
                            { id: 1710,   name: "Shahi Paneer",                                             image: "fdsp.jpg",            cat: "fined",                     subcat: "Gravy",        selectedVariant: "Qty",           variants: { "Qty":      { price: 399, count: 0, unit: "1Full" } } },
                            { id: 1711,   name: "Kadhai Paneer",                                            image: "fdkp.jpg",            cat: "fined",                     subcat: "Gravy",        selectedVariant: "Qty",           variants: { "Qty":      { price: 399, count: 0, unit: "1Full" } } },
                            { id: 1712,   name: "Tandori Roti",                                             image: "fdtr.jpg",            cat: "fined",                     subcat: "Roti Naan",    selectedVariant: "Qty",           variants: { "Qty":      { price: 49, count: 0, unit: "1" } } },
                            { id: 1713,   name: "Tandori Butter Roti",                                      image: "fdtrb.jpg",           cat: "fined",                     subcat: "Roti Naan",    selectedVariant: "Qty",           variants: { "Qty":      { price: 59, count: 0, unit: "1" } } },
                            { id: 1714,   name: "Naan",                                                     image: "fdn.jpg",             cat: "fined",                     subcat: "Roti Naan",    selectedVariant: "Qty",           variants: { "Qty":      { price: 89, count: 0, unit: "1" } } },
                            { id: 1715,   name: "Naan Butter",                                              image: "fdbn.jpg",            cat: "fined",                     subcat: "Roti Naan",    selectedVariant: "Qty",           variants: { "Qty":      { price: 99, count: 0, unit: "1" } } },
                            { id: 1716,   name: "Steamed Rice",                                             image: "fdsr.jpg",            cat: "fined",                     subcat: "Rice",         selectedVariant: "Qty",           variants: { "Qty":      { price: 249, count: 0, unit: "1Full" } } },
                            { id: 1717,   name: "Jeera Rice",                                               image: "fdjr.jpg",            cat: "fined",                     subcat: "Rice",         selectedVariant: "Qty",           variants: { "Qty":      { price: 299, count: 0, unit: "1Full" } } },
                            { id: 1718,   name: "Chow Mien",                                               image: "fdcm.jpg",            cat: "fined",                     subcat: "Noodles",         selectedVariant: "Qty",           variants: { "Qty":      { price: 200, count: 0, unit: "1Full" } } },

                            { id: 1801,   name: "Orange Cleansing Oil",                                     image: "pkoo.jpg",            cat: "pahadoka",                     subcat: "Oils",         selectedVariant: "Qty",           variants: { "Qty":      { price: 699, count: 0, unit: "100ML" } } },
                            { id: 1800,   name: "Pure Apricot Oil",                                         image: "pkao.jpg",            cat: "pahadoka",                     subcat: "Oils",         selectedVariant: "Qty",           variants: { "Qty":      { price: 699, count: 0, unit: "100ML" } } },
                            { id: 1802,   name: "Pure Castor Oil",                                          image: "pkco.jpg",            cat: "pahadoka",                     subcat: "Oils",         selectedVariant: "Qty",           variants: { "Qty":      { price: 699, count: 0, unit: "100ML" } } },
                            { id: 1803,   name: "After Bath Body and Face oil",                             image: "pkbfo.jpg",           cat: "pahadoka",                     subcat: "Oils",         selectedVariant: "Qty",           variants: { "Qty":      { price: 699, count: 0, unit: "100ML" } } },
                            { id: 1804,   name: "Pink Glass Skin - Korean",                                 image: "pkpgs.jpg",           cat: "pahadoka",                     subcat: "Skin Clay",    selectedVariant: "Qty",           variants: { "Qty":      { price: 499, count: 0, unit: "80ML" } } },
                            { id: 1805,   name: "Lemon Orange Peel",                                        image: "pklop.jpg",           cat: "pahadoka",                     subcat: "Scrub",        selectedVariant: "Qty",           variants: { "Qty":      { price: 499, count: 0, unit: "80ML" } } },
                            { id: 1806,   name: "Apricot Scrub",                                            image: "pkas.jpg",            cat: "pahadoka",                     subcat: "Scrub",        selectedVariant: "Qty",           variants: { "Qty":      { price: 499, count: 0, unit: "80ML" } } },
                            { id: 1807,   name: "Pure Aloe Vera",                                           image: "pkpa.jpg",            cat: "pahadoka",                     subcat: "Moistu rizer", selectedVariant: "Qty",           variants: { "Qty":      { price: 399, count: 0, unit: "50ML" } } },
                            { id: 1808,   name: "Organic Vit C Cream",                                      image: "pkvc.jpg",            cat: "pahadoka",                     subcat: "Cream",        selectedVariant: "Qty",           variants: { "Qty":      { price: 599, count: 0, unit: "50ML" } } },
                            { id: 1809,   name: "Organic Apricot Cream with Serum",                         image: "pkacs.jpg",           cat: "pahadoka",                     subcat: "Combo",        selectedVariant: "Qty",           variants: { "Qty":      { price: 1599, count: 0, unit: "50ML" } } },
                            { id: 1810,   name: "Lip Balm",                                                 image: "pklb.jpg",            cat: "pahadoka",                     subcat: "Lip Balm",     selectedVariant: "Qty",           variants: { "Qty":      { price: 199, count: 0, unit: "5ML" } } },
                            { id: 1811,   name: "Beetroot Lip Balms",                                       image: "pkbl.jpg",            cat: "pahadoka",                     subcat: "Lip Balm",     selectedVariant: "Qty",           variants: { "Qty":      { price: 299, count: 0, unit: "5ML" } } },                                                                                                                                                                                                                                                 

                            
                            { id: 1903,   name: "Veg Maggie",                                       image: "wcvm.jpg",            cat: "wc",                     subcat: "Noodles",     selectedVariant: "Qty",           variants: { "Qty":      { price: 79, count: 0, unit: "1pl" } } },                                                                                                                                                                                                                                                 
                            { id: 1904,   name: "Veg Wei Wei",                                       image: "wcvm.jpg",            cat: "wc",                     subcat: "Noodles",     selectedVariant: "Qty",           variants: { "Qty":      { price: 79, count: 0, unit: "1pl" } } },                                                                                                                                                                                                                                                 
                            { id: 1905,   name: "Banana Milk Shake",                                       image: "wcbs.jpg",            cat: "wc",                     subcat: "Shakes",     selectedVariant: "Qty",           variants: { "Qty":      { price: 59, count: 0, unit: "1gl" } } },                                                                                                                                                                                                                                                 
                            { id: 1906,   name: "Oreo Milk Shake",                                       image: "wcos.jpg",            cat: "wc",                     subcat: "Shakes",     selectedVariant: "Qty",           variants: { "Qty":      { price: 79, count: 0, unit: "1gl" } } },                                                                                                                                                                                                                                                 

                            /*{ id: 20001,   name: "Black Umbrella 40 Inch",                                       image: "rsu.jpg",            cat: "rs",                     subcat: "Umbrel la",     selectedVariant: "Qty",           variants: { "Qty":      { price: 220, count: 0, unit: "1pc" } } },                                                                                                                                                                                                                                                 
                            { id: 20002,   name: "Disposable Rain Coat",                                       image: "rsr.jpg",            cat: "rs",                     subcat: "Rain Coat",     selectedVariant: "Qty",           variants: { "Qty":      { price: 149, count: 0, unit: "1pc" } } },                                                                                                                                                                                                                                                 
                            { id: 20003, name: "Vicks Inhaler Keychain",                                       image: "chvi.jpg",              cat: "rs",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 60, count: 0, unit: "0.5ml" } } },
                            { id: 20004, name: "Cofsils Orange Flavour, 10 Lozenges",                          image: "chcough.jpg",           cat: "rs",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 35, count: 0, unit: "1pk" } } },
                            { id: 20005, name: "Control D N95 Mask",                                           image: "chn95.jpg",             cat: "rs",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 60, count: 0, unit: "1pc" } } },
                            { id: 20006, name: "Dettol Antiseptic Liquid",                                    image: "cdettol.jpg",             cat: "rs",                        subcat: "General",                   selectedVariant: "Qty",          variants: { "Qty":      { price: 83, count: 0, unit: "125ml" } } },*/

                            { id: 20001,   name: "Gift Hamper",                                           image: "rakham.jpg",            cat: "rakshab",                    subcat: "All",    description: "Lotte Choco Pie Rs 10, Milky Bar Rs 20, Paper Boat Rs 10, Gems Rs 10, Crispello Rs 20, Smooth Rs 10, Kitkat Rs 20, Oreo Rs 10 and, Chupa Chup Rs 10 or \n*Customize Hamper in whatsapp chat*",    gallery: ["rakham.jpg"],   selectedVariant: "Qty",           variants: { "Qty":     { price: 199, count: 0, unit: "1pkt" }, "Qty.": { price: 0, count: 0, unit: "Custom" } } },
                            { id: 20002,   name: "Rakhee",                                                image: "rakr.jpg",            cat: "rakshab",                     subcat: "All",    description: "A simple rakhee or \n*Customize Rakhee in whatsapp chat* ",    gallery: ["rakr.jpg"],      selectedVariant: "Qty",           variants: { "Qty":      { price: 25, count: 0, unit: "1"}, "Qty.": { price: 0, count: 0, unit: "Custom" } } },
                            { id: 20003,   name: "Photo Frame",                                           image: "rakpf.jpg",            cat: "rakshab",                     subcat: "All",   description: "A photo frame of 3X4 Inch demension or \n*Customize Frame in whatsapp chat* ",    gallery: ["rakpf.jpg"],       selectedVariant: "Qty",           variants: { "Qty":      { price: 299, count: 0, unit: "3X4inc"}, "Qty.": { price: 0, count: 0, unit: "Custom" } } },
                            { id: 1067,   name: "Omi's Mix Sweets",                                       image: "omimsweet.jpg",            cat: "rakshab",                    subcat: "All",   description: "Mix Sweets the best festive choice or \n*Customize Sweet in whatsapp chat* ",    gallery: ["omimsweet.jpg"],      selectedVariant: "Qty",           variants: { "Qty":      { price: 250, count: 0, unit: "500g"}, "Qty.": { price: 0, count: 0, unit: "Custom" } } },

                            { id: 30001,   name: "Tambola 48 Reusable punch cards",                                       image: "gngt.jpg",            cat: "gng",                     subcat: "Games",     selectedVariant: "Qty",           variants: { "Qty":      { price: 440, count: 0, unit: "1" } } },                                                                                                                                                                                                                                                 
                            { id: 30002,   name: "Hand Gripper Unisex Adjustable",                                       image: "gym.jpg",            cat: "gng",                     subcat: "Games",     selectedVariant: "Qty",           variants: { "Qty":      { price: 499, count: 0, unit: "1" } } },                                                                                                                                                                                                                                                 
                            { id: 30000,   name: "Uno Cards",                                       image: "uno.jpg",            cat: "gng",                     subcat: "Card Games",     selectedVariant: "Qty",           variants: { "Qty":      { price: 149, count: 0, unit: "1" } } },                                                                                                                                                                                                                                                 

                            { id: 6003, name: "Comfort After Wash Fabric Conditioner -Morning Fresh<br>MRP:Rs 245",         image: "clcomfortmf.jpg",       cat: "dp",       subcat: "Detergent",                  selectedVariant: "Qty",         variants: { "Qty":      { price: 229, count: 0, unit: "860ml" } } },
                            { id: 6008, name: "Lizol Disinfectant Surface and Floor Cleaner<br>MRP:Rs 260",                image: "cllizol.jpg",           cat: "dp",       subcat: "Surface Cleaners",          selectedVariant: "Qty",          variants: { "Qty":      { price: 239, count: 0, unit: "1L" } } },

                            { id: 40008, name: "Duracell AA Cell",                image: "cell.jpg",           cat: "other",       subcat: "All",          selectedVariant: "Qty",          variants: { "Qty":      { price: 25, count: 0, unit: "1" } } },


/* need to know if omi is cool with this                { id: 1018,   name: "Hot Tea",                      image: "omiht.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 42, count: 0, unit: "300ml" } } },
                              { id: 1019,   name: "Black Cofee",                                            image: "omibc.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 52.5, count: 0, unit: "300ml" } } },
                              { id: 1017,   name: "Black Tea",                                              image: "omibt.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 31.5, count: 0, unit: "300ml" } } },
                              { id: 1020,   name: "Hot Milk",                                               image: "omiht.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 52.5, count: 0, unit: "300ml" } } },
                              { id: 1021,   name: "Hand Blend Coffee",                                      image: "omiht.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 84, count: 0, unit: "300ml" } } },
                              { id: 1022,   name: "Rich Hot Chocolate",                                     image: "omirhc.jpg",            cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 105, count: 0, unit: "300ml" } } },
                              { id: 1023,   name: "Honey Ginger Lemon Tea",                                 image: "omighl.jpg",            cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 73.5, count: 0, unit: "300ml" } } },

                              { id: 1025,   name: "Masala Coke",                                            image: "omimc.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 94.5, count: 0, unit: "300ml" } } },
                              { id: 1026,   name: "Mojito",                                                 image: "omim.jpg",              cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 94.5, count: 0, unit: "300ml" } } },
                              { id: 1024,   name: "Lemon Soda",                                             image: "omils.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 84, count: 0, unit: "300ml" } } },
                              { id: 1027,   name: "Shikanji",                                               image: "omis.jpg",              cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 94.5, count: 0, unit: "300ml" } } },
                              { id: 1028,   name: "Blue Ocean",                                             image: "omibl.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 105, count: 0, unit: "300ml" } } },
                              { id: 1029,   name: "Green Apple",                                            image: "omiga.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 105, count: 0, unit: "300ml" } } }, 

                          /*  { id: 1006,   name: "Kesar Milk",                                             image: "omikm.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 120, count: 0, unit: "300ml" } } },
                              { id: 1007,   name: "Thandai",                                                image: "omit.jpg",              cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 120, count: 0, unit: "300ml" } } },
                              { id: 1008,   name: "Strawberry Shake",                                       image: "omiss.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 120, count: 0, unit: "300ml" } } },
                              { id: 1009,   name: "Butter Scotch Shake",                                    image: "omibs.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 140, count: 0, unit: "300ml" } } },
                              { id: 1010,   name: "Tiramisu Shake",                                         image: "omits.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 140, count: 0, unit: "300ml" } } },
                              { id: 1011,   name: "Oreo Shake",                                             image: "omios.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 150, count: 0, unit: "300ml" } } },
                              { id: 1014,   name: "Rasmalai Shake",                                         image: "omirms.jpg",            cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 150, count: 0, unit: "300ml" } } },
                              { id: 1015,   name: "Pista Milk",                                             image: "omipm.jpg",             cat: "partneromi",               subcat: "Beverages",                selectedVariant: "Qty",           variants: { "Qty":      { price: 150, count: 0, unit: "300ml" } } },
                          */                  
    ];

    let recentAdditions = [];
    let activeCategory = "";
    let userCoords = null;
    const duadc = 1000;
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    // --- SPLASH SCREEN LOGIC ---
    if (window.innerWidth < 768) {
        if (splash) {
            body.classList.add('no-scroll');
            setTimeout(() => {
                splash.classList.add('fade-out');
                body.classList.remove('no-scroll');
                
                // --- TRIGGER THEME POPUP HERE ---
                const currentModeText = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
                showThemePopup(currentModeText);
                
                setTimeout(() => { splash.remove(); }, 1000);
            }, 3300);
        }
    } else {
        if (splash) {
            splash.remove();
            // Show popup immediately on desktop since there is no splash
            const currentModeText = document.body.classList.contains('dark-mode') ? "☀️ Light Mode" : "🌙 Dark Mode";
            showThemePopup(currentModeText);
        }
    }
    // --- FAQ LOGIC ---
    const faqWrapper = document.getElementById('faq-wrapper');

    if (faqWrapper && typeof faqData !== 'undefined') {
        faqData.forEach((item) => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            faqItem.innerHTML = `
                <button class="faq-question">
                    <span>${item.q}</span>
                    <div class="icon"></div>
                </button>
                <div class="faq-answer">
                    <p>${item.a}</p>
                </div>
            `;

            // Click Logic
            faqItem.querySelector('.faq-question').addEventListener('click', () => {
                const isOpen = faqItem.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));
                if (!isOpen) faqItem.classList.add('active');
            });

            // THIS IS THE FIX: Put the append inside the loop!
            faqWrapper.appendChild(faqItem); 
        });
    }

    // --- NAVIGATION & HISTORY ---
    window.addEventListener('popstate', function (event) {
        const isSliderOpen = productSlider.classList.contains('active');
        const isCartOpen = orderSidebar.classList.contains('active');

        if (isSliderOpen || isCartOpen) {
            productSlider.classList.remove('active');
            orderSidebar.classList.remove('active');
        } else {
            if (sessionStorage.getItem('backPressedOnce')) {
                sessionStorage.removeItem('backPressedOnce');
                history.back();
            } else {
                sessionStorage.setItem('backPressedOnce', 'true');
                alert("Press the back button again to exit.");
                setTimeout(() => sessionStorage.removeItem('backPressedOnce'), 2000);
                history.pushState({ page: 'grid' }, document.title, location.href);
            }
        }
    });
    if (currentTheme === 'dark' && checkbox) {
    body.classList.add('dark-mode');
    checkbox.checked = true; // ✅ FIXED
}
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    const crowFlies = R * c;
    
    // Add a 30% buffer to simulate road winding/turns
    const estimatedRoadDistance = crowFlies * 1.5; 
    
    return estimatedRoadDistance; 
}
 function moveSlide(direction) {
        const targetIndex = currentIndex + direction;
        if (targetIndex >= 0 && targetIndex < slides.length) {
            currentIndex = targetIndex;
            updateUI();
        }
    }

    function updateUI() {
        if (!slider || slides.length === 0) return;

        // Move the slider
        const width = slider.getBoundingClientRect().width;
        slider.style.transform = `translateX(${-currentIndex * width}px)`;

        // 2. Loop through all 7 dots and turn the current one Red
        serviceDots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });

        // Handle button states
        if (prevBtn) prevBtn.disabled = (currentIndex === 0);
        if (nextBtn) nextBtn.disabled = (currentIndex === slides.length - 1);
    }
    serviceDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateUI();
        });
    });

let newWorker;

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      newWorker = reg.installing;
      newWorker.addEventListener('statechange', () => {
        // Check if the new service worker has finished downloading
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          showUpdateBanner();
        }
      });
    });
  });
}



// Ensure it runs only after images/styles are fully ready
window.addEventListener('load', updateUI);
window.addEventListener('resize', updateUI);

    const getX = (e) => e.touches ? e.touches[0].clientX : e.clientX;
    const startDrag = (e) => { startX = getX(e); isDragging = true; };
    const endDrag = (e) => {
        if (!isDragging) return;
        const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
        const distance = startX - endX;
        if (distance > 50) moveSlide(1);
        if (distance < -50) moveSlide(-1);
        isDragging = false;
    };

    // --- This is my collection card ---
    

    function renderCollections() {
    // Map the index to the heading you want displayed ABOVE that card
    const sectionHeadings = {
        0: "Latest Additions",
        2: "Collaborate Stores",
        9:  "Drinks & Snacks", /*3 */
        15:  "Grocery & Kitchen",/*9 */
        19: "Beauty and Personal Care",/*10 */
        25: "House Hold Essentials"/*18 */
    };

    collectionGrid.innerHTML = collections.map((c, i) => {
    let cardHtml = '';

    // Check if the current index has a defined heading in our map
    if (sectionHeadings[i]) {
        cardHtml += `<h2 class="grid-section-heading">${sectionHeadings[i]}</h2>`;
    }

    // Use only the first image from the previews array
    const displayImage = c.previews.length > 0 ? c.previews[0] : 'placeholder.jpg';

    // Added id="${c.id}" below to allow for direct HTTPS linking
    cardHtml += `
        <div class="collection-card" id="${c.id}" data-id="${c.id}" data-name="${c.name}">
            <div class="image-preview-box">
                <div class="image-preview-card">
                    <img src="${displayImage}" alt="${c.name}" loading="lazy">
                </div>
            </div>
            <h3>${c.name}</h3>
        </div>
    `;

    return cardHtml;
}).join('');
}
window.addEventListener('load', () => {
    // 200ms delay to ensure the DOM and slider are ready
    setTimeout(() => {
        const hash = window.location.hash.replace('#', ''); 
        
        if (hash) {
            // 1. Try to find the item in the products array first
            // Using == to match string hash with numeric ID
            const selectedProduct = products.find(p => p.id == hash);

            if (selectedProduct) {
                // If found, use your highlight function
                // 'cat' in your product object matches the 'id' in collections
                openAndHighlight(selectedProduct.id, selectedProduct.cat);
                return; // Exit once handled
            }

            // 2. Fallback: Check if the hash is just a Collection ID
            const selectedCollection = collections.find(c => c.id === hash);
            
            if (selectedCollection) {
                openCollection(selectedCollection.id, selectedCollection.name); 
                
                const view = document.getElementById('collection-view');
                if (view) {
                    view.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }, 4000); 
});
    function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // returns distance in km
    }   
    

    function startCounters() {
    let startTime = null;
    const duadc = 1500; // Ensure duadc is defined

    function update(currentTime) {
        if (!startTime) startTime = currentTime;
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duadc, 1);

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const current = Math.floor(progress * target);
            counter.innerText = `${current}+`;
        });

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            counters.forEach(counter => {
                counter.innerText = `${counter.getAttribute('data-target')}+`;
            });
        }
    }
    requestAnimationFrame(update);
}

// --- ADD THE INTERSECTION OBSERVER HERE ---
const observerOptions = {
    threshold: 0.1 // Trigger when 50% of the counter section is visible
};

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounters(); // Start the animation
            observer.unobserve(entry.target); // Stop observing after it runs once
        }
    });
}, observerOptions);

// Select the container of your counters to observe
const statsSection = document.querySelector('.stats-container'); 
if (statsSection) {
    counterObserver.observe(statsSection);
}

    function openCollection(catId, catName) {
    activeCategory = catId;
    const sliderTitle = document.getElementById('slider-title');
    
if (sliderTitle) {
        if (catName === "Fresh") {
            // Appends FAQ notice for Fresh category
            sliderTitle.innerText = catName + " (Please read F&Q no: 11 before ordering items from this list)";
        } else if (catName === "Pahado Ka") {
            // Appends making time notice for Cake Shop
            sliderTitle.innerText = catName + " (Organic Products made in Nainital)";
        } else if (catName === "Cake Shop") {
            // Appends making time notice for Cake Shop
            sliderTitle.innerText = catName + " (2 Pound cake has a making time of 5 hrs)";
        } else if (catName === "Omi's Sweets" || catName === "Omi's Food" || catName === "The Garrison") {
            // Appends GST notice for food categories
            sliderTitle.innerText = catName + " (Store GST 5% will be added)";
        } else if (catName === "Aavi Everyday Store" || catName === "Taste of Uttarakhand") {
            // Appends info prompt for Aavi Everyday Store
            sliderTitle.innerText = catName + " (tap image for more info)";
        } else if (catName === "Discounted Items") {
            // Appends info prompt for Discounted Items
            sliderTitle.innerText = catName + " (Note: Only canceled order products are sold in Discount)";
        }
         else {
            // Default behavior for all other categories
            sliderTitle.innerText = catName;
        }
    }

    // Reset scroll position
    productSlider.scrollTop = 0; 

    renderProducts(catId);
    orderSidebar.classList.remove('active');
    productSlider.classList.add('active');
    updateSidebar();
    history.pushState({ page: 'slider' }, document.title, location.href);
}

    function renderProducts(catId) {
    const filtered = products.filter(p => p.cat === catId);
    if (filtered.length === 0) {
        productGrid.innerHTML = `<p class="empty-msg">Empty for now.</p>`;
        pgroupslider.innerHTML = "";
        return;
    }

    const subcatData = [];
    filtered.forEach(p => {
        if (!subcatData.find(s => s.name === p.subcat)) {
            subcatData.push({ name: p.subcat, image: p.image });
        }
    });

    subcatData.sort((a, b) => a.name.localeCompare(b.name));

    pgroupslider.innerHTML = subcatData.map(sub => `
        <div class="subcat-nav-item" data-target="sub-${sub.name.replace(/\s+/g, '')}">
            <img src="${sub.image}" alt="${sub.name}" loading="lazy">
            <span>${sub.name}</span>
        </div>
    `).join('');

    const sortedProducts = [...filtered].sort((a, b) => a.subcat.localeCompare(b.subcat));
    const usedSubcats = new Set();

    productGrid.innerHTML = sortedProducts.map(p => {
        const currentVar = p.variants[p.selectedVariant];
        const cleanSubName = p.subcat.replace(/\s+/g, '');
        let anchorIdAttr = "";
        if (!usedSubcats.has(cleanSubName)) {
            anchorIdAttr = `id="sub-${cleanSubName}"`;
            usedSubcats.add(cleanSubName);
        }

        return `
            <div class="card" ${anchorIdAttr} data-subcat="${cleanSubName}" data-prod-id="${p.id}">
                <div class="img-container">
                    <img src="${p.image}" class="iimg" alt="${p.name}" loading="lazy">
                </div>
                <h4>${p.name}</h4>
                <div class="variant-selector">
                    ${Object.keys(p.variants).map(v => `
                        <button class="variant-btn ${p.selectedVariant === v ? 'active' : ''}" 
                            data-product-id="${p.id}" data-variant="${v}">
                            <span>${v}</span>
                            <span class="unit-text">${p.variants[v].unit}</span>
                        </button>
                    `).join('')}
                </div>
                <p class="price-tag">Rs ${currentVar.price}</p>
                <div class="controls">
                    <button class="add-btn ${currentVar.count > 0 ? 'hidden' : ''}" data-product-id="${p.id}">Add</button>
                    <div class="qty-controls ${currentVar.count > 0 ? '' : 'hidden'}">
                        <button class="qty-btn" data-product-id="${p.id}" data-change="-1">-</button>
                        <span>${currentVar.count}</span>
                        <button class="qty-btn" data-product-id="${p.id}" data-change="1">+</button>
                    </div>
                </div>
            </div>`;
    }).join('');
}

    // --- SCROLL & SYNC ---
    pgroupslider.addEventListener('click', (e) => {
        const item = e.target.closest('.subcat-nav-item');
        if (item) {
            item.classList.add('subcat-active-highlight');
            setTimeout(() => item.classList.remove('subcat-active-highlight'), 1000);

            const targetId = item.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 85; 
                const elementPosition = targetElement.offsetTop;
                productSlider.scrollTo({
                    top: elementPosition - headerOffset,
                    behavior: "smooth"
                });
            }
        }
    });
    slider.addEventListener('touchstart', startDrag);
    slider.addEventListener('touchend', endDrag);
    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('mouseup', endDrag);
    
 

    productSlider.addEventListener('scroll', () => {
        const productScrollTotal = productSlider.scrollHeight - productSlider.clientHeight;
        if (productScrollTotal > 0) {
            const scrollPct = productSlider.scrollTop / productScrollTotal;
            const sliderScrollTotal = pgroupslider.scrollHeight - pgroupslider.clientHeight;
            pgroupslider.scrollTop = scrollPct * sliderScrollTotal;
        }

        const sections = productGrid.querySelectorAll('.card[id^="sub-"]');
        let currentSectionId = "";
        sections.forEach(sec => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= productSlider.getBoundingClientRect().top + 100) {
                currentSectionId = sec.id;
            }
        });

        document.querySelectorAll('.subcat-nav-item').forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-target') === currentSectionId);
        });
    });

    // --- UTILITIES ---
    
    function updateDate() {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        if (dateElement) dateElement.textContent = `📅 ${day}/${month}/${year}`;
    }

    function updateCount() {
        const randomPeople = Math.floor(Math.random() * 15) + 8;
        if (countElement) countElement.textContent = randomPeople;
    }

    function updateSidebar() {
    let itemsTotal = 0, totalItems = 0, totalTax = 0;
    const paperBagCharge = 10; // Defined Bag Charge
    let html = "";

    products.forEach(p => {
        Object.keys(p.variants).forEach(vName => {
            const v = p.variants[vName];
            if (v.count > 0) {
                const lineTotal = v.count * v.price;
                itemsTotal += lineTotal;
                totalItems += v.count;

                let itemTax = 0;
                if (p.cat === "partneromi" || p.cat === "partneromif" || p.cat === "garrison") {
                    itemTax = lineTotal * 0.05;
                    totalTax += itemTax;
                }

                html += `
                    <div class="order-item-detail">
                        <img src="${p.image}" alt="item">
                        <div>
                            <strong>${p.name} (${v.unit})</strong><br>
                            Rs ${v.price} ${itemTax > 0 ? `<span style="font-size:0.8rem; color:var(--accent);">(+₹${itemTax.toFixed(2)} GST)</span>` : ''}
                            <div class="sidebar-controls">
                                <button class="side-qty-btn" data-id="${p.id}" data-var="${vName}" data-chg="-1">-</button>
                                <span>${v.count}</span>
                                <button class="side-qty-btn" data-id="${p.id}" data-var="${vName}" data-chg="1">+</button>
                            </div>
                        </div>
                    </div>`;
            }
        });
    });

    // --- 1. BASE DELIVERY LOGIC ---
    let baseDelivery = 0; // Keeping your existing logic structure

    // --- 2. KM BASED CHARGES ---
    let kmCharges = 0;
    if (itemsTotal > 0 && locationTagged) {
        if (woodstockCheckbox.checked) {
            kmCharges = 80;
        }
        else if (itmCheckbox.checked) {
            kmCharges = 50;
        }
        else if (firstLocationWord === "kharkuli" || firstLocationWord === "bhatta" || firstLocationWord === "Semwala") {
            kmCharges = 80;
        } else {
            if (currentDistance <= 1) kmCharges = 30;
            else if (currentDistance <= 2) kmCharges = 50; 
            else if (currentDistance <= 3) kmCharges = 80;
            else if (currentDistance <= 4) kmCharges = 150;
            else if (currentDistance <= 5) kmCharges = 200;
            else kmCharges = 500; 
        }
    }

    // --- 3. NIGHT CHARGES LOGIC ---
    let nightCharges = 0;
    const now = new Date();
    const hour = now.getHours(); 
    if (itemsTotal > 0) {
        if (hour >= 20) { 
            nightCharges = Math.min((hour - 19) * 20, 50);
        } else if (hour < 7) { 
            nightCharges = 50;
        }
    }

    // --- 4. CALCULATE TOTALS ---
    const totalDelivery = baseDelivery + kmCharges + nightCharges;

// Apply bag charge only if the total count of items is greater than 5
    const activeBagCharge = totalItems > 5 ? paperBagCharge : 0;

    // Updated Grand Total including the bag charge
    const finalGrandTotal = itemsTotal + totalTax + activeBagCharge + (locationTagged ? totalDelivery : 0);

    // --- UPDATE UI ---
    document.getElementById('sidebar-content').innerHTML = html || "<p>Cart is empty</p>";
    document.getElementById('subtotal-val').innerText = itemsTotal.toFixed(2);

    // Update Bag Charge UI
    const bagValDisplay = document.getElementById('bag-val');
    const bagRow = document.getElementById('bag-row'); // The parent paragraph tag

    if (bagValDisplay) {
        bagValDisplay.innerText = activeBagCharge;
    }

    // Optional: Hide the entire Paper Bag row if charges are 0
    if (bagRow) {
        bagRow.style.display = activeBagCharge > 0 ? "block" : "none";
    }

    const taxValDisplay = document.getElementById('tax-val');
    const taxRow = document.getElementById('tax-row');
    if (taxValDisplay) taxValDisplay.innerText = totalTax.toFixed(2);
    if (taxRow) taxRow.style.display = totalTax > 0 ? "block" : "none";

    const deliveryDisplay = document.getElementById('delivery-val');
    deliveryDisplay.innerText = locationTagged ? totalDelivery : "Tag Location";
    deliveryDisplay.style.color = locationTagged ? "" : "#ff9800"; 

    document.getElementById('total-price').innerText = Math.round(finalGrandTotal);

    // Store breakdown (added bag to breakdown for WhatsApp logic later)
    window.deliveryBreakdown = { 
        base: baseDelivery, 
        km: kmCharges, 
        night: nightCharges,
        bag: activeBagCharge 
    };

    // Update Cart Counter & Popup
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = totalItems;
    document.body.style.paddingBottom = totalItems > 0 ? "7rem" : "0";

    if(totalItems > 0 && !orderSidebar.classList.contains('active')) {
        cartPopup.classList.remove('hidden');
        document.getElementById('popup-count').innerText = totalItems;
        document.getElementById('popup-images-container').innerHTML = [...new Set(recentAdditions)].slice(0, 5).map(img => `<img src="${img}" alt="recent">`).join('');
    } else { 
        cartPopup.classList.add('hidden'); 
    }
}

    function openAndHighlight(productId, catId) {
        const col = collections.find(c => c.id === catId);
        openCollection(catId, col.name);
        setTimeout(() => {
            const el = document.querySelector(`[data-prod-id="${productId}"]`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.classList.add('highlight-search');
                setTimeout(() => el.classList.remove('highlight-search'), 1000);
            }
        }, 400);
    }

    // --- HANDLERS ---
    collectionGrid.addEventListener('click', (e) => {
    const card = e.target.closest('.collection-card');
    if (card) {
        // Trigger vibration for haptic feedback
        if (navigator.vibrate) {
            navigator.vibrate(30); // Short, sharp tap for navigation
        }
        
        openCollection(card.dataset.id, card.dataset.name);
    }
});

    let currentSlideIndex = 0;
let activeGallery = [];

// Helper function to update the lightbox content
function updateSlider() {
    const container = document.getElementById('slider-images');
    if (activeGallery.length > 0) {
        container.innerHTML = `<img src="${activeGallery[currentSlideIndex]}" class="slider-img">`;
    }
}

// --- Helper: Render Dynamic Buttons inside Lightbox ---
function renderLightboxControls(p) {
    const container = document.getElementById('lightbox-controls-container');
    if (!container) return;

    const currentVar = p.variants[p.selectedVariant];
    
    // Using your specific requested HTML structure
    container.innerHTML = `
        <div class="controls">
            <button class="add-btn ${currentVar.count > 0 ? 'hidden' : ''}" 
                    data-product-id="${p.id}">Add</button>
            <div class="qty-controls ${currentVar.count > 0 ? '' : 'hidden'}">
                <button class="qty-btn" data-product-id="${p.id}" data-change="-1">-</button>
                <span>${currentVar.count}</span>
                <button class="qty-btn" data-product-id="${p.id}" data-change="1">+</button>
            </div>
        </div>
    `;
}

productGrid.addEventListener('click', (e) => {
    const target = e.target;

    // 1. LIGHTBOX TRIGGER (For "aavi" collection products)
    const card = target.closest('.card');
    if (card && (target.classList.contains('iimg') || target.tagName === 'H4')) {
        const p = products.find(prod => prod.id == card.dataset.prodId);
        
        if (p && (p.cat === 'aavi' || p.cat === 'rakshab')) {
            activeGallery = p.gallery || [p.image]; 
            currentSlideIndex = 0;
            
            // Populate Name
            const lightboxTitle = document.getElementById('lightbox-title');
            if (lightboxTitle) lightboxTitle.innerText = p.name;

            // Populate Description
            const lightboxDesc = document.getElementById('lightbox-description');
            if (lightboxDesc) lightboxDesc.innerText = p.description || "Freshly prepared.";
            
            // --- NEW: Render the Dynamic Controls ---
            renderLightboxControls(p);
            
            updateSlider();
            document.getElementById('lightbox').classList.remove('hidden');
            return; 
        }
    }

    // 2. EXISTING VARIANT LOGIC
    if (target.closest('.variant-btn')) {
        const btn = target.closest('.variant-btn');
        const p = products.find(prod => prod.id == btn.dataset.productId);
        p.selectedVariant = btn.dataset.variant;
        renderProducts(activeCategory);
        
        // Update Lightbox if it's currently showing this product
        if (!document.getElementById('lightbox').classList.contains('hidden')) {
            renderLightboxControls(p);
        }
    }

    // 3. EXISTING ADD/QTY LOGIC (Grid & Lightbox)
    if (target.classList.contains('add-btn') || target.classList.contains('qty-btn')) {
    const id = target.dataset.productId;
    const amount = parseInt(target.dataset.change || 1);
    const p = products.find(prod => prod.id == id);
    
    if (!p) return;

    // --- VIBRATION ADDITION ---
    // Triggers a short 50ms vibration for haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }
    // --------------------------

    const v = p.variants[p.selectedVariant];
    v.count += amount;
    if (v.count < 0) v.count = 0;

    if (amount > 0) {
        recentAdditions.unshift(p.image);
    } else if (amount < 0) {
        const index = recentAdditions.indexOf(p.image);
        if (index > -1) recentAdditions.splice(index, 1);
    }

    if (recentAdditions.length > 5) recentAdditions.pop();

    renderProducts(activeCategory);
    updateSidebar();

    if (!document.getElementById('lightbox').classList.contains('hidden')) {
        renderLightboxControls(p);
    }
}
});

/** * EXTERNAL LIGHTBOX ADD BUTTON LISTENER
 * This connects the button inside your lightbox to the logic above
 */
const lightboxAddBtn = document.getElementById('lightbox-add-btn');
if (lightboxAddBtn) {
    lightboxAddBtn.addEventListener('click', function() {
        const id = this.dataset.productId;
        // We find the original 'Add' button in the grid for this product and click it.
        // This ensures the sidebar, variant selection, and recentAdditions all update correctly.
        const gridBtn = document.querySelector(`.card[data-prod-id="${id}"] .add-btn`);
        if (gridBtn) {
            gridBtn.click();
            // Optional: Close the lightbox after adding
            // document.getElementById('lightbox').classList.add('hidden');
        }
    });
}
// Close Lightbox
document.querySelector('.close-lightbox').addEventListener('click', () => {
    document.getElementById('lightbox').classList.add('hidden');
});

// Slider Navigation
document.querySelector('.prev-slide').addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex > 0) ? currentSlideIndex - 1 : activeGallery.length - 1;
    updateSlider();
});

document.querySelector('.next-slide').addEventListener('click', () => {
    currentSlideIndex = (currentSlideIndex < activeGallery.length - 1) ? currentSlideIndex + 1 : 0;
    updateSlider();
});

   orderSidebar.addEventListener('click', (e) => {
    if (e.target.classList.contains('side-qty-btn')) {
        const btn = e.target;
        const p = products.find(prod => prod.id == btn.dataset.id);
        const change = parseInt(btn.dataset.chg);
        
        p.variants[btn.dataset.var].count += change;
        if (p.variants[btn.dataset.var].count < 0) p.variants[btn.dataset.var].count = 0;

        // Sync the recentAdditions images
        if (change < 0) {
            const index = recentAdditions.indexOf(p.image);
            if (index > -1) recentAdditions.splice(index, 1);
        } else {
            recentAdditions.unshift(p.image);
        }

        updateSidebar();
        if(activeCategory === p.cat) renderProducts(p.cat);
    }
});

    const toggleSidebar = () => {
        const opening = !orderSidebar.classList.contains('active');
        productSlider.classList.remove('active');
        orderSidebar.classList.toggle('active');
        if (opening) history.pushState({ page: 'cart' }, document.title, location.href);
        updateSidebar();
    };
// Open/Close Cart
document.getElementById('cart-trigger').addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(40);
    toggleSidebar();
});

document.getElementById('cart-popup').addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(40);
    toggleSidebar();
});

// Close Sidebar (Back Navigation)
document.getElementById('close-sidebar').addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(30); // Slightly shorter for "exit" actions
    history.back();
});

// Close Slider (Back Navigation)
document.getElementById('close-slider').addEventListener('click', () => {
    if (navigator.vibrate) navigator.vibrate(30);
    history.back();
});

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        clearSearch.classList.toggle('hidden', !query);
        if (!query) { searchSuggestions.style.display = "none"; return; }
        const matches = products.filter(p => p.name.toLowerCase().includes(query)).slice(0, 6);
        if (matches.length > 0) {
            searchSuggestions.innerHTML = matches.map(p => `
                <div class="suggestion-item" data-id="${p.id}" data-cat="${p.cat}" data-name="${p.name}">
                    <img src="${p.image}" alt="suggest">
                    <span>${p.name}</span>
                </div>
            `).join('');
            searchSuggestions.style.display = "block";
        } else { searchSuggestions.style.display = "none"; }
    });
    checkbox.addEventListener('change', () => {
    // 1. Trigger vibration immediately for best response
    if (navigator.vibrate) {
        navigator.vibrate(30); 
    }

    // 2. Execute theme logic
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // 3. Show notification
    showThemePopup(isDark ? "🌙 Dark Mode" : "☀️ Light Mode");
});
    // --- CLICK HANDLER FOR SEARCH SUGGESTIONS ---
    searchSuggestions.addEventListener('click', (e) => {
        const item = e.target.closest('.suggestion-item');
        if (item) {
            const productId = item.dataset.id;
            const catId = item.dataset.cat;
            
            // 1. Execute your existing open and highlight logic
            openAndHighlight(productId, catId);
            
            // 2. Clear the search and hide suggestions
            searchInput.value = "";
            searchSuggestions.style.display = "none";
            clearSearch.classList.add('hidden');
        }
    });
    clearSearch.addEventListener('click', () => {
    // 1. Empty the input field
    searchInput.value = "";
    
    // 2. Hide the suggestions box
    searchSuggestions.style.display = "none";
    
    // 3. Hide the clear button itself
    clearSearch.classList.add('hidden');
    
    // 4. Return focus to the input (optional but better UX)
    searchInput.focus();
});

    // Variable to store the specific area name for pricing
let firstLocationWord = ""; 

document.getElementById('location-btn').addEventListener('click', async () => {
    // Trigger vibration for haptic feedback
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }

    const display = document.getElementById('location-display');
    
    if (navigator.geolocation) {
        let seconds = 0;
        display.innerText = `Locating... (0s)`;

        // Start the timer
        const timer = setInterval(() => {
            seconds++;
            display.innerText = `Locating... (${seconds}s)`;
        }, 1000);

        navigator.geolocation.getCurrentPosition(async (pos) => {
            // Stop the timer immediately upon success
            clearInterval(timer); 

            userCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
            
            currentDistance = calculateDistance(
                SHOP_COORDS.lat, SHOP_COORDS.lon, 
                userCoords.lat, userCoords.lon
            );

            locationTagged = true;

            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
                const data = await res.json();
                
                const fullAddress = data.display_name || "";
                custAddressInput.value = fullAddress;

                // Extract the first word (e.g., "Kharkuli") and clean it
                if (fullAddress) {
                    firstLocationWord = fullAddress.split(/[ ,]+/)[0].toLowerCase();
                }

                updateSidebar();
                display.innerText = `✅ ${currentDistance.toFixed(1)} km from Wink It`;
            } catch (e) { 
                custAddressInput.value = `Lat: ${userCoords.lat}, Lon: ${userCoords.lon}`;
                display.innerText = `✅ Tagged (${currentDistance.toFixed(1)} km)`; 
                updateSidebar(); // Ensure sidebar updates even on fetch error
            }
        }, () => { 
            // Stop the timer if there is an error
            clearInterval(timer);
            display.innerText = "ℹ️ Please turn on Location/GPS and Try again"; 
        }, {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        });
    }
});
    function showThemePopup(text) {
    let popup = document.getElementById('theme-toast');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'theme-toast';
        popup.className = 'theme-popup';
        document.body.appendChild(popup);
    }
    
    popup.innerText = text;
    popup.classList.add('show');
    
    // Remove after 2 seconds
    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000);
}

// --- UPDATED THEME TOGGLE LOGIC ---
checkbox.addEventListener('change', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Save preference
    showThemePopup(isDark ? "☀️ Light Mode" : "🌙 Dark Mode");
});

whatsappBtn.addEventListener('click', () => {
    const name = custNameInput.value;
    const address = custAddressInput.value;
    const subtotal = document.getElementById('subtotal-val').innerText;
    const delivery = document.getElementById('delivery-val').innerText;
    
    // Pull the Bag Charge from the UI
    const bagCharge = document.getElementById('bag-val') ? document.getElementById('bag-val').innerText : "0";
    
    const total = document.getElementById('total-price').innerText;
    
    if (total == "0" || total == "") { alert("Cart is empty!"); return; }
    if (!name || !address) { alert("Please enter both Name and Address."); return; }
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB'); 
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    const locationLink = userCoords ? `https://www.google.com/maps?q=${userCoords.lat},${userCoords.lon}` : `(Location not tagged)`;
    const divider = "--------------------------\n"; 
    
    let msg = `*🛍️ NEW ORDER - WINK IT*\n`;
    msg += divider;
    msg += `📅 Date: ${dateStr} | ${timeStr}\n`;
    msg += `👤 Name: ${name}\n📍 Address: ${address}\n🗺️ Location: ${locationLink}\n\n`;
    msg += `*🛒 ITEMS:*\n\n`;
    
    let itemIndex = 1;
    let totalGst = 0; 
    let itemsForSheet = ""; 

    const categoryNames = {
        "gng": "Games and Gym",
        "dp": "Discounted Items",
        "bakery": "Cake Shop",
        "fined": "Fine Dine Deluxe",
        "pahadoka": "Pahado Ka",
        "tou": "Taste of Uttarakhand",
        "partneromi": "Omi's Sweets",
        "partneromif": "Omi's Food",
        "tos": "Taste of South",
        "aavi": "👑 Gift Store",
        "garrison": "The Garrison",
        "beverages": "Drinks and Juices",
        "snacks": "Chips and Namkeens",
        "biscuits": "Bakery and Biscuits",
        "chocolates": "Sweet and Chocolates",
        "instant": "Instant Food and Noodles",
        "candies": "Candies",
        "fresh": "Fresh",
        "adc": "Aata, Dal, and Rice",
        "dbm": "Dairy, Bread, and Milk",
        "mo": "Masalas and Oils",
        "bc": "Baby Care",
        "fw": "Female Wellness",
        "hair": "Hair",
        "bnb": "Bath and Body",
        "face": "Face",
        "g": "General",
        "cleaningessentials": "Cleaners and Freshners",
        "other": "Others"
    };

    // 1. Group items by category name
    const groupedItems = {};

    products.forEach(p => {
        const collectionName = categoryNames[p.cat] || "Store";
        if (!groupedItems[collectionName]) {
            groupedItems[collectionName] = [];
        }

        Object.keys(p.variants).forEach(vName => {
            const v = p.variants[vName];
            if (v && v.count > 0) {
                const linePrice = v.price * v.count;
                let gstNote = "";
                
                // Only Omi's Sweets and Omi's Food incur GST (5%)
                if (p.cat === 'partneromi' || p.cat === 'partneromif') {
                    const itemGst = linePrice * 0.05;
                    totalGst += itemGst;
                    gstNote = ` (GST 5%: ₹${itemGst.toFixed(2)})`;
                }

                groupedItems[collectionName].push({
                    name: p.name,
                    unit: v.unit,
                    count: v.count,
                    price: linePrice,
                    gstNote: gstNote
                });

                itemsForSheet += `${p.name} (${v.unit}) x${v.count}; `;
            }
        });
    });

    // 2. Append grouped categories using Braille Blank spaces (\u2800) to prevent WhatsApp trimming
    const brailleSpace = "\u2800";
    const categoryIndent = `${brailleSpace}\u00A0`; 
    const itemDetailIndent = `${brailleSpace}\u00A0\u00A0\u00A0\u00A0\u00A0`; 

   // Helper to manually soft-wrap product names so line breaks include WhatsApp-safe indents
function formatIndentedName(name, prefix, hangIndent, maxChars = 22) {
    const words = name.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach(word => {
        if ((currentLine + ' ' + word).trim().length > maxChars) {
            if (currentLine) lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = currentLine ? `${currentLine} ${word}` : word;
        }
    });
    if (currentLine) lines.push(currentLine);

    return lines.map((line, idx) => {
        return idx === 0 ? `${prefix}${line}` : `${hangIndent}${line}`;
    }).join('\n');
}

Object.keys(groupedItems).forEach(cat => {
    if (groupedItems[cat].length > 0) {
        msg += `✦ ${cat.toUpperCase()}\n`;
        groupedItems[cat].forEach(item => {
            const brailleSpace = "\u2800";
            const categoryIndent = `${brailleSpace}\u00A0`; 
            const prefix = `${categoryIndent}${itemIndex}.\u00A0`;
            
            // Indent for wrapped product name lines (aligns right under the name)
            const nameHangIndent = `${brailleSpace}\u00A0\u00A0\u00A0\u00A0`;
            
            // Indent for unit/price details
            const itemDetailIndent = `${brailleSpace}\u00A0\u00A0\u00A0\u00A0\u00A0`; 

            // Format product name with explicit wrapped indents
            const formattedName = formatIndentedName(item.name, prefix, nameHangIndent, 22);
            msg += `${formattedName}\n`;

            // Build details string
            let detailText = `(${item.unit}) x${item.count} - ₹${item.price}\n${item.gstNote ? item.gstNote.trim() : ""}`;

            // Split details by line break and apply detail indent
            detailText.split('\n').filter(line => line.trim() !== "").forEach(line => {
                msg += `${itemDetailIndent}${line}\n`;
            });

            itemIndex++;
        });
        msg += `\n`;
    }
});

    msg += divider;
    msg += `Subtotal: ₹${subtotal}\n`;
    if (totalGst > 0) msg += `GST Total(5%): ₹${totalGst.toFixed(2)}\n`;
    
    // Added Paper Bag to WhatsApp Message
    if (parseFloat(bagCharge) > 0) msg += `Paper Bag: ₹${bagCharge}\n`;
    
    msg += `Delivery: ₹${delivery}\n`;
    msg += `*TOTAL AMOUNT: ₹${total}*\n`;
    msg += divider;
    msg += `_Cash or UPI on Delivery, our delivery partner will call you shortly._`;

    // --- SAVE TO GOOGLE SHEETS ---
    fetch('https://script.google.com/macros/s/AKfycbwa1ItNiI0pxItnMhMRr6WG2vmiJWz0rLbciDkKeP-se79yueaGSC_qfPl4_kxSuEOd/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            address: address,
            items: itemsForSheet,
            bagCharge: bagCharge,
            delivery: delivery,
            total: total,
            location: locationLink
        })
    });
    
    const encodedMsg = encodeURIComponent(msg);
    window.location.href = `https://api.whatsapp.com/send?phone=917983427187&text=${encodedMsg}`;
});    /** * Infinite Review Slider Module
 */
(function() {
    const container = document.getElementById('slider-container');
    const inner = document.getElementById('review-inner');

    // Safety check: Exit if the slider HTML isn't on this specific page
    if (!container || !inner) return;
/*☆*/
    const referenceDate = new Date("2026-02-19"); /*★★★★☆*/
    const reviews = [
        { name: "-Sumaira Vishanathan-", img: "r2.png", stars: "★★★★★(5/5)", text: "The Delivery person was polite and followed all instructions", from: "English Country, Kaflani", date: "2026-06-01" },
        { name: "-Alok Nath-", img: "r5.png", stars: "★★★★☆(4/5)", text: "Our delivery was 15mins late but the app made sure we were always updated", from: "GNFC School, Mussoorie", date: "2026-05-26" },
        { name: "-Ramsharan Aggarwal-", img: "r1.png", stars: "★★★★☆(4/5)", text: "Very nice service for hilly areas", from: "Savoy Welcome Hotels, Mussoorie", date: "2026-05-20" },
        { name: "-Anjali Negi-", img: "r3.png", stars: "★★★☆☆(3/5)", text: "Please find routes to beat the traffic and be more fast", from: "Natur's Lap, Mussoorie", date: "2026-06-23" },
        { name: "-Martin-", img: "r4.png", stars: "★★★★★(5/5)", text: "The order was half and hour late but the quality and service were definatly worth the wait.", from: "Woodstock School, Tehri Road, Landour", date: "2026-06-25" }
        
    ];
    const reviewContainer = document.querySelector('.rbox');
const reviewWrap = document.querySelector('.rwrap');

reviewContainer.addEventListener('mousedown', () => {
    reviewWrap.style.animationPlayState = 'paused';
});

    function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date(); // Use actual current time
    
    // Calculate differences in calendar units
    const years = now.getFullYear() - date.getFullYear();
    const months = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
    
    // Total difference in milliseconds for smaller units
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    // Logic for returning the string
    if (years >= 1 && months >= 12) {
        return years + (years === 1 ? " Year Ago" : " Years Ago");
    }
    if (months >= 1) {
        return months + (months === 1 ? " Month Ago" : " Months Ago");
    }
    if (diffInDays >= 7) {
        const weeks = Math.floor(diffInDays / 7);
        return weeks + (weeks === 1 ? " Week Ago" : " Weeks Ago");
    }
    if (diffInDays >= 1) {
        return diffInDays + (diffInDays === 1 ? " Day Ago" : " Days Ago");
    }
    
    return "Today";
}

    function initSlider() {
        const content = reviews.map(rev => `
            <div class="rcard">
                <img src="${rev.img}" alt="${rev.name}">
                <h1>${rev.name}</h1>
                <div class="stars-container">
                    ${rev.stars.split('(')[0]} 
                    <p>(${rev.stars.split('(')[1]}</p>
                </div>
                <p class="review-text">${rev.text}</p>
                <p class="from-text">${rev.from}</p>
                <h6 class="time-ago">${timeAgo(rev.date)}</h6>
            </div>
        `).join('');
        
        inner.innerHTML = content; 
    }

    let speed = 1; 
    let isPaused = false;
    let resumeTimer;

    function loop() {
        if (!isPaused) {
            container.scrollLeft += speed;
            const maxScroll = inner.scrollWidth / 3;
            if (container.scrollLeft >= maxScroll * 2) {
                container.scrollLeft -= maxScroll;
            } else if (container.scrollLeft <= 0) {
                container.scrollLeft += maxScroll;
            }
        }
        requestAnimationFrame(loop);
    }

    // Event Listeners
    container.addEventListener('mousedown', () => isPaused = true);
    window.addEventListener('mouseup', () => isPaused = false);
    container.addEventListener('touchstart', () => {
        isPaused = true;
        clearTimeout(resumeTimer);
    }, {passive: true});

    container.addEventListener('touchend', () => {
        resumeTimer = setTimeout(() => { isPaused = false; }, 4000);
    }, {passive: true});

    // Fire it up
    initSlider();
    })();

    checkbox.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
    });

    // --- STARTUP ---// --- STARTUP ---
    const savedTheme = localStorage.getItem('theme') || (currentTheme === 'dark' ? 'dark' : 'light');

    if (savedTheme === 'dark' && checkbox) {
        body.classList.add('dark-mode');
        checkbox.checked = true;
    }

    // Show the popup on first load
    setTimeout(() => {
        const currentModeText = document.body.classList.contains('dark-mode') ? "🌙 Dark Mode" : "☀️ Light Mode";
        showThemePopup(currentModeText);
    }, 500);
    updateCount();
    updateDate();
    setInterval(updateCount, 60000);
     window.addEventListener('resize', updateUI);
    updateUI();
    
    // Sort and Render
    products.sort((a, b) => a.name.localeCompare(b.name));
    renderCollections(); // This is the crucial call!

    // Corrected theme logic
    if (currentTheme === 'dark' && checkbox) {
    body.classList.add('dark-mode');
    checkbox.checked = true; // ✅ FIXED
}

});
