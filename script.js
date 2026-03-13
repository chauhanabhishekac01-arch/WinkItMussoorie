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
        { q: "5. Will you check the Expire dates of the products?", a: "Yes, all the products shall be checked for expire dates." },
        { q: "6. Do you delivery Grocery?", a: "No, we shall never buy grocery on our behalf, we can pick the grocery package from a grocer." },
        { q: "7. On what metric do you count the delivery charge?", a: "The delivery charge are calculated keeping in mind the distance and timing of the delivery." },
        { q: "8. What else services do you provide?", a: "At Wink It, we always encourage our cutomers to ask before they assume, the 'Request' button is a custom button for you to explore." },
        { q: "9. How do you earn?", a: "Everything will be bought and on MRP, our only earning is the delivery charges." }
    ];
    const collections = [
        { id: "beverages", name: "Drinks and Juices",               previews: ["dj.jpg"] },
        { id: "snacks", name: "Chips and Namkeens",                 previews: ["cn.jpg"] },
        { id: "biscuits", name: "Bakery and Biscuits",              previews: ["bb.jpg"] },
        { id: "chocolates", name: "Sweet and Chocolates",           previews: ["sc.jpg"] },
        { id: "instant", name: "Instant Food and Noodles",          previews: ["in.jpg"] },
        { id: "candies", name: "Candies",                           previews: ["c.jpg"] },
        { id: "adc", name: "Atta, Dal, and Rice",                   previews: ["adr.jpg"] },
        { id: "dbm", name: "Dairy, Bread, and Milk",                previews: ["dbm.jpg"] },
        { id: "mo", name: "Masalas and Oils",                       previews: ["mo.jpg"] },
        { id: "bc", name: "Baby Care",                              previews: ["bc.jpg"] },
        { id: "fw", name: "Female Wellness",                        previews: ["fw.jpg"] },
        { id: "hair", name: "Hair",                                 previews: ["h.jpg"] },
        { id: "bnb", name: "Bath and Body",                         previews: ["bnb.jpg"] },
        { id: "face", name: "Face",                                 previews: ["f.jpg"] },
        { id: "g", name: "General",                                 previews: ["g.jpg"] },
        { id: "cleaningessentials", name: "Cleaners and Freshners", previews: ["cf.jpg"] },
        { id: "partneromi", name: "Omi's Sweets",                           previews: ["omi.jpg"] },
        
        
        
    ];

    const products = [
/*Drink*/               { id: 1,   name: "Bottle-Pepsi",                                                     image: "dpepsi.jpg",            cat: "beverages",       subcat: "Cold Drink",                   selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "750ml" }, "L": { price: 90, count: 0, unit: "2L" } } },
                        { id: 2,   name: "Bottle-Coca-Cola",                                                 image: "dcokeb.jpg",            cat: "beverages",       subcat: "Cold Drink",                   selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "750ml" }, "L": { price: 90, count: 0, unit: "2L" } } },
                        { id: 3,   name: "Sprite",                                                           image: "dsprite.jpg",           cat: "beverages",       subcat: "Cold Drink",                   selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "750ml" }, "L": { price: 90, count: 0, unit: "2L" } } },
                        { id: 31,  name: "Can-Coca-Cola",                                                    image: "dcokec.jpg",            cat: "beverages",       subcat: "Cold Drink",                          selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "300ml" } } },
                        { id: 32,  name: "Can-Dite Coke",                                                    image: "dcoked.jpg",            cat: "beverages",       subcat: "Cold Drink",                          selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "500ml" } } },
                        { id: 33,  name: "Can-Pepsi Zero Sugar",                                             image: "dpepsiz.jpg",           cat: "beverages",       subcat: "Cold Drink",                          selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "300ml" } } },
                        { id: 34,  name: "Can-Mountain Dew",                                                 image: "dmountain.jpg",         cat: "beverages",       subcat: "Cold Drink",                          selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "300ml" } } },

                /*Juice*/{ id: 4,  name: "Frooti Mango",                                                    image: "dfrooti.jpg",           cat: "beverages",       subcat: "Juices",                       selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "150ml" }, "L": { price: 105, count: 0, unit: "2L" } } },
                         { id: 5,  name: "Maaza",                                                           image: "dmaaza.jpg",            cat: "beverages",       subcat: "Juices",                       selectedVariant: "S",           variants: { "S":        { price: 40, count: 0, unit: "600ml" }, "L": { price: 80, count: 0, unit: "1.75L" } } },
                         { id: 6,  name: "Real Fruit Power Orange Juice",                                   image: "drealo.jpg",            cat: "beverages",       subcat: "Juices",                       selectedVariant: "L",           variants: { "L":        { price: 125, count: 0, unit: "1L" } } },
                         { id: 7,  name: "Real Fruit Power Guava Juice",                                    image: "drealg.jpg",            cat: "beverages",       subcat: "Juices",                       selectedVariant: "L",           variants: { "L":        { price: 115, count: 0, unit: "1L" } } },
                         { id: 8,  name: "Real Fruit Power Litchi Juice",                                   image: "dreall.jpg",            cat: "beverages",       subcat: "Juices",                       selectedVariant: "L",           variants: { "L":        { price: 120, count: 0, unit: "1L" } } },

         /*Energy Drink*/{ id: 9,  name: "Hell Classic",                                                    image: "dhellc.jpg",            cat: "beverages",       subcat: "Energy Drinks",                selectedVariant: "L",           variants: { "L":        { price: 60, count: 0, unit: "250ml" } } },    
                         { id: 10,  name: "Hell Watermelon",                                                 image: "dhellw.jpg",            cat: "beverages",       subcat: "Energy Drinks",                selectedVariant: "L",           variants: { "L":        { price: 60, count: 0, unit: "250ml" } } },    
                         { id: 11,  name: "Hell Black Cherry",                                               image: "dhellbc.jpg",           cat: "beverages",       subcat: "Energy Drinks",                selectedVariant: "L",           variants: { "L":        { price: 60, count: 0, unit: "250ml" } } },
                         { id: 12,  name: "Red Bull",                                                       image: "dred.jpg",              cat: "beverages",       subcat: "Energy Drinks",                          selectedVariant: "S",           variants: { "S":        { price: 125, count: 0, unit: "300ml" } } },
                         { id: 13,  name: "Monster Zero Sugar Ultra",                                       image: "dmonster.jpg",              cat: "beverages",       subcat: "Energy Drinks",                selectedVariant: "S",           variants: { "S":        { price: 125, count: 0, unit: "350ml" } } },
                         { id: 35,  name: "Monster Black",                                                  image: "bbm.jpg",              cat: "beverages",       subcat: "Energy Drinks",                selectedVariant: "S",           variants: { "S":        { price: 125, count: 0, unit: "350ml" } } },

            /*Mogu Mogu*/{ id: 14,  name: "Strawberry Fruit Drink",                                         image: "dmogus.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 15,  name: "Lychee Fruit Drink with Nata De Coco",                           image: "dmogul.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 16,  name: "Blackcurrant Drink with Nata De Coco",                           image: "dmogub.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 17,  name: "Grape Fruit Drink with Nata De Coco",                            image: "dmogug.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 18,  name: "Mango Drink",                                                    image: "dmogum.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 19,  name: "Melon Fruit Drink with Nata De Coco",                            image: "dmogumelon.jpg",        cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },
                         { id: 20,  name: "Pineapple Fruit Drink",                                          image: "dmogup.jpg",            cat: "beverages",       subcat: "Mogu Mogu",                    selectedVariant: "S",           variants: { "S":        { price: 70, count: 0, unit: "320ml" } } },


                 /*Milk*/{ id: 21,  name: "Amul Kool Kesar",                                                 image: "damulk.jpg",            cat: "beverages",       subcat: "Amul",                         selectedVariant: "S",           variants: { "S":        { price: 25, count: 0, unit: "180ml" } } },
                         { id: 22,  name: "Amul Masti Spiced Salted Buttermilk",                             image: "damulc.jpg",            cat: "beverages",       subcat: "Amul",                         selectedVariant: "S",           variants: { "S":        { price: 15, count: 0, unit: "200ml" } } },
                         { id: 23,  name: "Amul Lassi",                                                      image: "damull.jpg",            cat: "beverages",       subcat: "Amul",                         selectedVariant: "S",           variants: { "S":        { price: 25, count: 0, unit: "200ml" } } },
                         { id: 37,  name: "Amul Kool Cafe Milk 'n' Coffee-Can",                              image: "damulcc.jpg",            cat: "beverages",       subcat: "Amul",                         selectedVariant: "S",           variants: { "S":        { price: 35, count: 0, unit: "200ml" } } },
                         { id: 36,  name: "Amul Kool Koko Chocolate",                                        image: "damulcl.jpg",            cat: "beverages",       subcat: "Amul",                         selectedVariant: "S",           variants: { "S":        { price: 35, count: 0, unit: "200ml" } } },
                 
                /*Water*/{ id: 24,  name: "Mineral Water",                                                   image: "dwater.jpg",            cat: "beverages",       subcat: "Water & Soda",                 selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "1L" }, "L": { price: 70, count: 0, unit: "5L" } } },
                         { id: 25,  name: "Schweppes Indian Tonic Water",                                    image: "dschweppesi.jpg",       cat: "beverages",       subcat: "Water & Soda",                 selectedVariant: "S",           variants: { "S":        { price: 60, count: 0, unit: "300ml" } } },
                         { id: 26,  name: "Duke's Club Soda Water",                                          image: "dsodad.jpg",            cat: "beverages",       subcat: "Water & Soda",                 selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "750ml" } } },
                         { id: 27, name: "O'cean Pink Guava Water",                                         image: "dwog.jpg",              cat: "beverages",       subcat: "Water & Soda",                       selectedVariant: "S",           variants: { "S":        { price: 60, count: 0, unit: "500ml" } } },
                         { id: 28, name: "O'cean Peach & Passion Water",                                    image: "dwop.jpg",              cat: "beverages",       subcat: "Water & Soda",                       selectedVariant: "S",           variants: { "S":        { price: 60, count: 0, unit: "500ml" } } },
                         { id: 29, name: "O'cean Crispy Apple Water",                                       image: "dwoa.jpg",              cat: "beverages",       subcat: "Water & Soda",                       selectedVariant: "S",           variants: { "S":        { price: 60, count: 0, unit: "500ml" } } },
                         { id: 30, name: "O'cean Lychee Flavoured Water",                                   image: "dwol.jpg",              cat: "beverages",       subcat: "Water & Soda",                       selectedVariant: "S",           variants: { "S":        { price: 60, count: 0, unit: "500ml" } } },
                         
                  /*Can*/
                         
                
/* Chocolates */
                        
                        
                        
                        
             /*Cadbury*/{ id: 2001, name: "Cadbury Dairy Milk Crackle Milk",                                image: "ccadburyc.jpg",         cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 50, count: 0, unit: "36g" } } },
                        { id: 2002, name: "Cadbury Dairy Milk Fruit and Nut",                               image: "chfruitnnut.jpg",       cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 100, count: 0, unit: "75g" } } },     
                        { id: 2003, name: "Cadbury Dairy Milk Roast Almond Milk",                           image: "chfruitnnut.jpg",       cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 50, count: 0, unit: "36g" } } },     
                        { id: 2004, name: "Cadbury Lickables",                                              image: "clickables.jpg",        cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 45, count: 0, unit: "20g" } } },
                        { id: 2005, name: "Cadbury Nutties",                                                image: "cnutties.jpg",          cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 45, count: 0, unit: "30g" } } },
                        { id: 2006, name: "Cadbury Dairy Milk Crispello Milk",                              image: "chcrispello.jpg",       cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 40, count: 0, unit: "35g" } } },
                        { id: 2007, name: "Cadbury Fuse Peanut & Caramel",                                  image: "chfuse.jpg",            cat: "chocolates",                subcat: "Cadbury",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 45, count: 0, unit: "43g" } } },

                        

                /*Amul*/{ id: 2008, name: "Amul Dark Chocolate",                                            image: "chdc.jpg",              cat: "chocolates",                subcat: "Amul",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 200, count: 0, unit: "150g" } } },
                        { id: 2009, name: "Amul Smooth & Creamy Milk",                                      image: "camulsc.jpg",           cat: "chocolates",                subcat: "Amul",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 160, count: 0, unit: "125g" } } },
                        { id: 2010, name: "Amul Belgian Smooth and Creamy Milk",                            image: "camulbc.jpg",           cat: "chocolates",                subcat: "Amul",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 200, count: 0, unit: "150g" } } },
                        { id: 2011, name: "Amul Velvett",                                                   image: "chvelvett.jpg",         cat: "chocolates",                subcat: "Amul",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 50, count: 0, unit: "35g" } } },

        /*Hershey's*/   { id: 2012, name: "Hershey's Kisses Milk Pack",                                     image: "ckissesmc.jpg",         cat: "chocolates",                subcat: "Hershey's",        selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 55, count: 0, unit: "36g" } } },
                        { id: 2013, name: "Hershey's Kisses Almonds Milk Pack",                             image: "ckissesa.jpg",          cat: "chocolates",                subcat: "Hershey's",        selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 60, count: 0, unit: "34g" } } },
                        { id: 2014, name: "Hershey's Kisses Cookies n Creme Assorted",                      image: "ckissescnc.jpg",        cat: "chocolates",                subcat: "Hershey's",        selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 60, count: 0, unit: "34g" } } },

             /*Nestle*/ { id: 2015, name: "Nestle Milkybar Creamy Milky Treat",                             image: "cnestlemb.jpg",         cat: "chocolates",                subcat: "Nestle",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 40, count: 0, unit: "47g" } } },
                        { id: 2016, name: "Nestle Kitkat",                                                  image: "chkitkat.jpg",          cat: "chocolates",                subcat: "Nestle",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 30, count: 0, unit: "38g" } } }, 
                        { id: 2017, name: "Nestle Munch Max Nuts",                                          image: "cnestlemm.jpg",         cat: "chocolates",                subcat: "Nestle",           selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 30, count: 0, unit: "37g" } } }, 

             

                /*Kids*/{ id: 2018, name: "Kinder joy",                                                     image: "chkinderjoy.jpg",       cat: "chocolates",                subcat: "Kids",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 45, count: 0, unit: "20g" } } },
                        { id: 2019, name: "Lotte Choco Pie Cake",                                           image: "clotte.jpg",            cat: "chocolates",                subcat: "Kids",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 10, count: 0, unit: "1pc" } } },
                        { id: 2020, name: "Twix Cookie Caramel Filled Bar",                                 image: "ctwix.jpg",             cat: "chocolates",                subcat: "Kids",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 100, count: 0, unit: "50g" } } },
                        { id: 2021, name: "Snickers Peanut Nougat & Caramel",                               image: "csnickers.jpg",         cat: "chocolates",                subcat: "Kids",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 30, count: 0, unit: "38.5g" } } },
                        { id: 2022, name: "Kinder Happy Hippo Cocoa Milk 5pc",                               image: "ckhh.jpg",         cat: "chocolates",                subcat: "Kids",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 600, count: 0, unit: "103g" } } },

                        { id: 2023, name: "Bounty Coconut Filled Bar",                               image: "cbc.jpg",         cat: "chocolates",                subcat: "Imported",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 100, count: 0, unit: "50g" } } },
                        { id: 2024, name: "Hubba Bubba Fruit Flavour Chewing Gum",                               image: "ccg.jpg",         cat: "chocolates",                subcat: "Imported",             selectedVariant: "Wgt.",        variants: { "Wgt.":     { price: 100, count: 0, unit: "50g" } } },
                        
    /*Imported*/        { id: 2025, name: "Ferrero Rocher Chocolate (24 piece)",                            image: "cfr.jpg",              cat: "chocolates",                subcat: "Imported",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 880, count: 0, unit: "300g" } } },
    /*Imported*/        { id: 2026, name: "Mars Premium Nougat and Caramel Filled Bar",                     image: "cm.jpg",               cat: "chocolates",                subcat: "Imported",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 100, count: 0, unit: "51g" } } },
    /*Imported*/        { id: 2027, name: "Toblerone Milk Chocolate Bar",                                   image: "ctob.jpg",             cat: "chocolates",                subcat: "Imported",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 400, count: 0, unit: "100g" } } },
    /*Imported*/        { id: 2028, name: "NERDS Grape & Strawberry Toffee",                                   image: "cngs.jpg",             cat: "candies",                subcat: "Nerds",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 270, count: 0, unit: "141g" } } },
    /*Imported*/        { id: 2029, name: "NERDS Watermelon & Cherry Tofee",                                   image: "cnwc.jpg",             cat: "candies",                subcat: "Nerds",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 180, count: 0, unit: "46g" } } },
    /*Imported*/        { id: 2030, name: "Pocky Chocolate Biscuit Sticks",                                   image: "cpockyred.jpg",             cat: "chocolates",                subcat: "Imported",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 170, count: 0, unit: "47g" } } },
    /*Imported*/        { id: 2031, name: "Pocky Strawberry Biscuit Sticks",                                   image: "cpockys.jpg",             cat: "chocolates",                subcat: "Imported",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 170, count: 0, unit: "45g" } } },
    /*Imported*/        { id: 2032, name: "Pocky Double Chocolate Biscuit Sticks",                                   image: "cpockydc.jpg",             cat: "chocolates",                subcat: "Imported",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 180, count: 0, unit: "47g" } } },
    /*Imported*/        { id: 2033, name: "M&M's Peanut Candy",                                   image: "cmnmp.jpg",             cat: "candies",                subcat: "M&M's",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 180, count: 0, unit: "45g" } } },
    /*Imported*/        { id: 2034, name: "M&M's Chocolate Candy",                                   image: "cmnmc.jpg",             cat: "candies",                subcat: "M&M's",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 180, count: 0, unit: "45g" } } },
    /*Imported*/        { id: 2035, name: "Skittles Wild Berry Bite Size Fruit Toffee",                                   image: "cskittlew.jpg",             cat: "candies",                subcat: "Skittles",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 50, count: 0, unit: "27g" } } },
    /*Imported*/        { id: 2036, name: "Skittles Original Bite-size Fruit Toffee",                                   image: "cskittler.jpg",             cat: "candies",                subcat: "Skittles",             selectedVariant: "Qty.",        variants: { "Qty.":     { price: 50, count: 0, unit: "27g" } } },
                        
                        
                        
                
/* Biscuits */

             /*sunfest*/{ id: 3001, name: "Dark Fantasy Choco Fills",                                       image: "bidf.jpg",              cat: "biscuits",                  subcat: "Sunfeast",          selectedVariant: "L",           variants: { "L":        { price: 35, count: 0, unit: "69g" } } },
                        { id: 3002, name: "Dark Fantasy Choco Nut Fills",                                   image: "bdfcnf.jpg",            cat: "biscuits",                  subcat: "Sunfeast",          selectedVariant: "L",           variants: { "L":        { price: 35, count: 0, unit: "69g" } } },
                        { id: 3003, name: "Dark Fantasy Dual Fills",                                        image: "bdfdf.jpg",             cat: "biscuits",                  subcat: "Sunfeast",          selectedVariant: "L",           variants: { "L":        { price: 45, count: 0, unit: "69g" } } },
                        { id: 3004, name: "Dark Fantasy Coffee Fills",                                      image: "bdfcf.jpg",             cat: "biscuits",                  subcat: "Sunfeast",          selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "75g" } } },

               /*Parle*/{ id: 3005, name: "Hide & Seek Coffee Chocolate",                                   image: "bihideandseekc.jpg",    cat: "biscuits",                  subcat: "Parle",              selectedVariant: "L",           variants: { "L":        { price: 30, count: 0, unit: "100g" } } },
                        { id: 3008, name: "Parle-G",                                                        image: "biparleg.jpg",          cat: "biscuits",                  subcat: "Parle",              selectedVariant: "L",           variants: { "L":        { price: 80, count: 0, unit: "800g" } } },
                        { id: 3006, name: "Hide & Seek",                                                    image: "bihideandseek.jpg",     cat: "biscuits",                  subcat: "Parle",             selectedVariant: "L",           variants: { "L":        { price: 30, count: 0, unit: "100g" } } },
                        { id: 3007, name: "Oreo",                                                           image: "bioreo.jpg",            cat: "biscuits",                  subcat: "Parle",             selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "125g" } } },  
                        { id: 3009, name: "Cheese Craker",                                                  image: "bipriyagoldck.jpg",     cat: "biscuits",                  subcat: "Parle",              selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "136g" } } },

           /*Britannia*/{ id: 3010, name: "Good Day Cashew Almond",                                         image: "bigooddayc.jpg",        cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "200g" } } },
                        { id: 3012, name: "Good Day Pista Badam",                                           image: "bigooddayp.jpg",        cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 50, count: 0, unit: "200g" } } },
                        { id: 3013, name: "Good Day ChocoChip",                                             image: "bigooddaychoco.jpg",    cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 100, count: 0, unit: "444g" } } },
                        { id: 3014, name: "Good Day Butter",                                                image: "bigooddaybutter.jpg",   cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "200g" } } },
                        { id: 3015, name: "Good Day Fruit & Nut Cookies",                                   image: "bigooddayfn.jpg",       cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 100, count: 0, unit: "450g" } } },
                        { id: 3016, name: "Britannia Bourbon ",                                             image: "bibritanniab.jpg",      cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 35, count: 0, unit: "100g" } } },
                        { id: 3017, name: "Britannia Nice Time Coconut Biscuit",                            image: "bibritanniant.jpg",     cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 25, count: 0, unit: "136g" } } },
                        { id: 3018, name: "Britannia Croissant",                                            image: "ccroissant.jpg",        cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 75, count: 0, unit: "240g" } } },
                        { id: 3019, name: "Britannia Marigold",                                             image: "bimari.jpg",            cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 40, count: 0, unit: "208g" } } },
                        { id: 3020, name: "Britannia Milk Bikis",                                           image: "bimb.jpg",              cat: "biscuits",                  subcat: "Britannia",          selectedVariant: "L",           variants: { "L":        { price: 70, count: 0, unit: "500g" } }  },
                
/* Snacks */
             /*Kurkure*/{ id: 4001, name: "Kurkure Chutney",                                                image: "skurkurec.jpg",         cat: "snacks",                    subcat: "Kurkure",            selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "40g" }, "L": { price: 25, count: 0, unit: "75g" } } },
                        { id: 4002, name: "Kurkure Chilli",                                                 image: "skurkurecc.jpg",        cat: "snacks",                    subcat: "Kurkure",            selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "40g" } } },
                        { id: 4003, name: "Kurkure Masala",                                                 image: "skurkurem.jpg",         cat: "snacks",                    subcat: "Kurkure",            selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "40g" }, "L": { price: 25, count: 0, unit: "75g" } } },
                        { id: 4004, name: "Kurkure Puffcorn",                                               image: "skurkurep.jpg",         cat: "snacks",                    subcat: "Kurkure",            selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "40g" }, "L": { price: 25, count: 0, unit: "75g" } } },
                        { id: 4005, name: "Kurkure Schezwan Chutney",                                       image: "skurkuresc.jpg",        cat: "snacks",                    subcat: "Kurkure",            selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "40g" }, "L": { price: 25, count: 0, unit: "75g" } } },

                /*Lays*/{ id: 4006, name: "Lay's India's M",                                                image: "slaysb.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4007, name: "Lay's American",                                                 image: "slaysg.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4008, name: "Lay's Classic",                                                  image: "slaysy.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4009, name: "Lay's Chile Limon",                                              image: "slaysc.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4010, name: "Lay's Crispz",                                                   image: "slayscr.jpg",           cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4011, name: "Lay's Spanish Tomato Tango",                                     image: "slayss.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4012, name: "Lay's Sizzlin Hot",                                              image: "slayssh.jpg",           cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },
                        { id: 4013, name: "Lay's Hot n sweet chilli",                                       image: "slaysw.jpg",            cat: "snacks",                    subcat: "Lays",               selectedVariant: "S",           variants: { "S":        { price: 10, count: 0, unit: "75g" }, "L": { price: 25, count: 0, unit: "200g" } } },

                        
            /*Pingles */{ id: 4014, name: "Pringles Sour Cream & Onion Potato",                             image: "spinglessc.jpg",        cat: "snacks",                    subcat: "Pingles",            selectedVariant: "L",           variants: { "L":        { price: 136, count: 0, unit: "141g" } } },
                        { id: 4015, name: "Pringles Original Potato Chips",                                 image: "spingleo.jpg",          cat: "snacks",                    subcat: "Pingles",            selectedVariant: "L",           variants: { "L":        { price: 110, count: 0, unit: "107g" } } },
                        { id: 4016, name: "Pringles Pizza Flavoured Potato Chips",                          image: "spinglep.jpg",          cat: "snacks",                    subcat: "Pingles",            selectedVariant: "L",           variants: { "L":        { price: 101, count: 0, unit: "102g" } } },
                        
             /*Namkeen*/{ id: 4017, name: "Haldirams Punjabi Tadka",                                        image: "spunjabi.jpg",          cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 55, count: 0, unit: "210g" } } },
                        { id: 4018, name: "Haldirams Bhujia",                                               image: "sbhujia.jpg",           cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 60, count: 0, unit: "200g" } } },
                        { id: 4019, name: "Haldirams Salted Peanuts",                                       image: "ssalted.jpg",           cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 55, count: 0, unit: "200g" } } },
                        { id: 4020, name: "Haldirams Gup Shup",                                             image: "sgup.jpg",              cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 55, count: 0, unit: "200g" } } },
                        { id: 4021, name: "Haldirams Moong Dal",                                            image: "shaldirammd.jpg",       cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 60, count: 0, unit: "200g" } } },
                        { id: 4022, name: "Haldirams Lite Mixture",                                         image: "shaldiramlm.jpg",       cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "S",           variants: { "S":        { price: 20, count: 0, unit: "75g" }, "L": { price: 40, count: 0, unit: "150g" } } },
                        { id: 4023, name: "Haldirams Lite Mixture",                                         image: "shcb.jpg",              cat: "snacks",                    subcat: "Haldiram's",          selectedVariant: "L",           variants: { "L": { price: 50, count: 0, unit: "95gg" } } },

                        { id: 4024, name: "Crax Curls Chatpata Masala",                                     image: "scc.jpg",               cat: "snacks",                    subcat: "Crax",          selectedVariant: "L",           variants: {  "L": { price: 60, count: 0, unit: "88g" } } },
                        { id: 4025, name: "Crax Crunchy Pipes Salted ",                                     image: "sccp.jpg",              cat: "snacks",                    subcat: "Crax",          selectedVariant: "L",           variants: { "L": { price: 60, count: 0, unit: "73g" } } },
                        { id: 4026, name: "Crax Natkhat Classic",                                           image: "scnk.jpg",              cat: "snacks",                    subcat: "Crax",          selectedVariant: "L",           variants: { "L": { price: 60, count: 0, unit: "73g" } } },
                
/* Personal */
                /*Hair*/{ id: 5001, name: "Comb 15cm",                                                      image: "pccomb.jpg",            cat: "hair",                  subcat: "Comb",                selectedVariant: "Size",        variants: { "Size":     { price: 50, count: 0, unit: "20cm" } } },
                        { id: 5002, name: "Almond Oil",                                                     image: "pcalmond.jpg",          cat: "hair",                  subcat: "Oil",                selectedVariant: "Bottle",      variants: { "Bottle":   { price: 85, count: 0, unit: "95ml" } } },
                        { id: 5003, name: "Head and Shoulders Anti Dandruff",                               image: "pcshampoo.jpg",         cat: "hair",                  subcat: "Shampoo",                selectedVariant: "Bottle",      variants: { "Bottle":   { price: 181, count: 0, unit: "180ml" } } },
                        { id: 5018, name: "L'Oreal Paris Total Repair 5 Shampoo",                               image: "pcshampool.jpg",         cat: "hair",                  subcat: "Shampoo",                selectedVariant: "Bottle",      variants: { "Bottle":   { price: 415, count: 0, unit: "340ml" } } },
                        { id: 5019, name: "Tresemme Keratin Smooth Shampoo",                               image: "pcshampoot.jpg",         cat: "hair",                  subcat: "Shampoo",                selectedVariant: "Bottle",      variants: { "Bottle":   { price: 175, count: 0, unit: "180ml" } } },
                        

                /*Body*/{ id: 5004, name: "Pears Pack of 3",                                                image: "pcpears.jpg",           cat: "bnb",                  subcat: "Soap",               selectedVariant: "Piece",       variants: { "Piece":    { price: 200, count: 0, unit: "1pk" } } },
                        { id: 5005, name: "Lux Black Orchid & Juniper",                                     image: "pcbodywash.jpg",        cat: "bnb",                  subcat: "Body Wash",               selectedVariant: "Piece",       variants: { "Piece":    { price: 90, count: 0, unit: "90ml" } } },
                        { id: 5006, name: "Bath Loofah",                                                    image: "pcl.jpg",               cat: "bnb",                  subcat: "Loofah",               selectedVariant: "Piece",       variants: { "Piece":    { price: 100, count: 0, unit: "1pc" } } },

                /*Face*/{ id: 5007, name: "Cetaphil",                                                       image: "pccleanser.jpg",        cat: "face",                  subcat: "Cleanser",               selectedVariant: "Piece",       variants: { "Piece":    { price: 405, count: 0, unit: "118ml" } } },
                        { id: 5008, name: "Minimilist Vitamin b5 10%",                                      image: "pcmoist.jpg",           cat: "face",                  subcat: "Moisturizer",               selectedVariant: "Piece",       variants: { "Piece":    { price: 350, count: 0, unit: "50g" } } },
                        { id: 5009, name: "Himalaya Lip Balm",                                              image: "pclb.jpg",              cat: "face",                  subcat: "Lips",               selectedVariant: "Piece",       variants: { "Piece":    { price: 350, count: 0, unit: "50g" } } },
                        { id: 5016, name: "Gillette Presto",                                                image: "chgillet.jpg",          cat: "face",                  subcat: "Grooming.",   selectedVariant: "Qty",        variants: { "Qty":     { price: 25, count: 0, unit: "1pc." } } },
                        { id: 5017, name: "Garnier Men Acno Fight Anti-Pimple Face Wash ",                  image: "chgarniersh.jpg",       cat: "face",                  subcat: "Facewash",   selectedVariant: "Qty",        variants: { "Qty":     { price: 125, count: 0, unit: "50g" } } },


            /*Grooming*/{ id: 5010, name: "Scissors 2 X 4.25inch",                                          image: "pcscissors.jpg",        cat: "g",                  subcat: "Grooming",           selectedVariant: "Size",        variants: { "Size":     { price: 50, count: 0, unit: "2x4inch" } } },
                        { id: 5011, name: "Handkerchief pack of 3",                                         image: "pchandkerchief.jpg",    cat: "g",                  subcat: "Grooming",           selectedVariant: "Piece",       variants: { "Piece":    { price: 170, count: 0, unit: "1pk" } } },
                        { id: 5012, name: "Gillette Mac 3 Razor",                                           image: "pcgillette.jpg",        cat: "g",                  subcat: "Grooming",           selectedVariant: "Piece",       variants: { "Piece":    { price: 192, count: 0, unit: "1pc" } } },
                        { id: 5013,  name: "Nail Clipper",                                                   image: "pcnc.jpg",              cat: "g",                  subcat: "Grooming",           selectedVariant: "Piece",       variants: { "Piece":    { price: 80, count: 0, unit: "1pc" } } },


              /*Dental*/{ id: 5014, name: "Colgate",                                                        image: "pccolgate.jpg",         cat: "g",                  subcat: "Dental",             selectedVariant: "Tube",        variants: { "Tube":     { price: 120, count: 0, unit: "180ml" } } },
                        { id: 5015, name: "Oral-B Pro Clean",                                               image: "pcoralb.jpg",           cat: "g",                  subcat: "Dental",             selectedVariant: "Piece",       variants: { "Piece":    { price: 50, count: 0, unit: "1pc" } } },

/*Cleaning*/
                /*cloths*/{ id: 6001, name: "Ariel Power Gel Front Load Liquid Detergent",                   image: "clarielb.jpg",         cat: "cleaningessentials",        subcat: "Detergent",            selectedVariant: "Qty",        variants: { "Qty":     { price: 215, count: 0, unit: "950ml" } } },
                          { id: 6002, name: "Comfort After Wash Fabric Conditioner -Lily Fresh",             image: "clcomforlf.jpg",       cat: "cleaningessentials",        subcat: "Detergent",            selectedVariant: "Qty",        variants: { "Qty":     { price: 235, count: 0, unit: "860ml" } } },
                          { id: 6003, name: "Comfort After Wash Fabric Conditioner -Morning Fresh",          image: "clcomfortmf.jpg",      cat: "cleaningessentials",        subcat: "Detergent",            selectedVariant: "Qty",        variants: { "Qty":     { price: 235, count: 0, unit: "860ml" } } },

    /*Toilet & Bathroom*/ { id: 6004, name: "Harpic Advanced Disinfectant Toilet Cleaner)",                  image: "clharpic.jpg",         cat: "cleaningessentials",        subcat: "Toilet & Bathroom",  selectedVariant: "Qty",        variants: { "Qty":     { price: 235, count: 0, unit: "860ml" } } },
    /*Toilet & Bathroom*/ { id: 6010, name: "Harpic Disinfectant Bathroom Cleaner (Floral)",                  image: "clharpicr.jpg",         cat: "cleaningessentials",        subcat: "Toilet & Bathroom",  selectedVariant: "Qty",        variants: { "Qty":     { price: 235, count: 0, unit: "860ml" } } },
                          { id: 6005, name: "Feather's 2 Ply Toilet Tissue Roll Ultra-soft",                 image: "cltp.jpg",             cat: "cleaningessentials",        subcat: "Toilet & Bathroom",  selectedVariant: "Qty",        variants: { "Qty":     { price: 450, count: 0, unit: "10pc" } } },

        /*Room Freshners*/{ id: 6006, name: "Odonil Lavender Mist Room Freshener (Lavender)",                image: "clodonill.jpg",        cat: "cleaningessentials",        subcat: "Room Freshners",     selectedVariant: "Qty",        variants: { "Qty":     { price: 170, count: 0, unit: "220ml" } } },
        
      /*Surface Cleaners*/{ id: 6007, name: "Colin Glass Cleaner ",                                          image: "clcolin.jpg",          cat: "cleaningessentials",        subcat: "Surface Cleaners",   selectedVariant: "Qty",        variants: { "Qty":     { price: 120, count: 0, unit: "500ml" } } },
                          { id: 6008, name: "Lizol Disinfectant Surface & Floor Cleaner ",                   image: "cllizol.jpg",          cat: "cleaningessentials",        subcat: "Surface Cleaners",   selectedVariant: "Qty",        variants: { "Qty":     { price: 260, count: 0, unit: "1L" } } },
                          { id: 6009, name: "Feather's Premium Paper Napkin(ply 2) ",                        image: "clfeathern.jpg",       cat: "cleaningessentials",        subcat: "Surface Cleaners",   selectedVariant: "Qty",        variants: { "Qty":     { price: 90, count: 0, unit: "105gm" } } },

/*Chemist*/  /*Misc.*/    
                          { id: 7003, name: "Moov Instant Pain Relief Spray",                                image: "chmoov.jpg",          cat: "g",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 230, count: 0, unit: "50g" } } },
                          { id: 7004, name: "Volini Activ Pain Relief Spray",                                image: "chvo.jpg",            cat: "g",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 190, count: 0, unit: "50g" } } },
                          { id: 7005, name: "Dabur Glucoplus C - Orange",                                    image: "chgo.jpg",            cat: "g",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 190, count: 0, unit: "50g" } } },
                          { id: 7006, name: "Dabur Glucoplus C - Lemon ",                                    image: "chgl.jpg",            cat: "g",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 60, count: 0, unit: "120g" } } },
                          { id: 7018, name: "Vicks Inhaler Keychain",                                    image: "chvi.jpg",            cat: "g",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 60, count: 0, unit: "0.5ml" } } },
                          { id: 7019, name: "Cofsils Orange Flavour, 10 Lozenges",                                    image: "chcough.jpg",            cat: "g",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 35, count: 0, unit: "1pk" } } },
                          { id: 7020, name: "Control D N95 Mask",                                    image: "chn95.jpg",            cat: "g",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 60, count: 0, unit: "1pc" } } },
                          { id: 7001, name: "KamaSutra Longlast Condom",                                     image: "chks.jpg",            cat: "g",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 240, count: 0, unit: "12p" } } },
                          { id: 7002, name: "KamaSutra Skinfeel Condom",                                     image: "chkss.jpg",           cat: "g",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 150, count: 0, unit: "12p" } } },
                          
            /*Baby Care*/ { id: 7007, name: "Pampers (12-17 Kg: XL) 6pc.",                                  image: "chpampers.jpg",       cat: "bc",        subcat: "Diapers",   selectedVariant: "Qty",        variants: { "Qty":     { price: 230, count: 0, unit: "1pk." } } },
                          { id: 7008, name: "Pampers (9-14 Kg: L) 13pc.",                                   image: "chpampers.jpg",       cat: "bc",        subcat: "Diapers",   selectedVariant: "Qty",        variants: { "Qty":     { price: 210, count: 0, unit: "1pk." } } },
                          { id: 7009, name: "Pampers (7-12Kg: M) 8pc.",                                     image: "chpampers.jpg",       cat: "bc",        subcat: "Diapers",   selectedVariant: "Qty",        variants: { "Qty":     { price: 105, count: 0, unit: "1pk." } } },
                          { id: 7010, name: "Pampers (4-8 Kg: S) 40pc.",                                    image: "chpampers.jpg",       cat: "bc",        subcat: "Diapers",   selectedVariant: "Qty",        variants: { "Qty":     { price: 400, count: 0, unit: "1pk." } } },
                          { id: 7021, name: "Little's Soft Cleansing Baby Wipes-Wet Wipes.",                                    image: "chbabyw.jpg",       cat: "bc",        subcat: "Wipes",   selectedVariant: "Qty",        variants: { "Qty":     { price: 400, count: 0, unit: "1pk." } } },
                          
        /*Femal Wellness*/{ id: 7011, name: "Prega News Pregnancy Test Kit,",                               image: "chprega.jpg",         cat: "fw",        subcat: "Female Wellness",   selectedVariant: "Qty",        variants: { "Qty":     { price: 60, count: 0, unit: "1pc" } } },
                          { id: 7012, name: "Unwanted-Mankind",                                             image: "chunwanted.jpg",      cat: "fw",        subcat: "Female Wellness",   selectedVariant: "Qty",        variants: { "Qty":     { price: 80, count: 0, unit: "60" } } },
                          { id: 7013, name: "VWash Plus Expert Hygiene Intimate Wash",                      image: "chvw.jpg",            cat: "fw",        subcat: "Female Wellness",   selectedVariant: "Qty",        variants: { "Qty":     { price: 200, count: 0, unit: "100ml" } } },
                          { id: 7014, name: "Whisper Choice Ultra Sanitary Pads (XL: 6pc)",                 image: "chwcu.jpg",           cat: "fw",        subcat: "Female Wellness",   selectedVariant: "Qty",        variants: { "Qty":     { price: 50, count: 0, unit: "1pk." } } },
                          { id: 7015, name: "Whisper Ultra Soft Air Fresh Pores Sanitary Pads (XL+: 6pc)",  image: "chsls.jpg",           cat: "fw",        subcat: "Female Wellness",   selectedVariant: "Qty",        variants: { "Qty":     { price: 95, count: 0, unit: "1pk." } } },
                          { id: 7016, name: "Whisper Bindazzz Nights Sanitary Pads(XXL: 7pc)",              image: "chbn.jpg",            cat: "fw",        subcat: "Female Wellness",   selectedVariant: "Qty",        variants: { "Qty":     { price: 155, count: 0, unit: "1pk." } } },
                          { id: 7017, name: "Whispers No Gap No Leaks Sanitary Pads(XL+: 7pc)",             image: "chngnl.jpg",          cat: "fw",        subcat: "Female Wellness",   selectedVariant: "Qty",        variants: { "Qty":     { price: 95, count: 0, unit: "1pk." } } },



/*adc*/               
                  /*dal*/{ id: 8001, name: "Arhar-Barik Dal",                                               image: "rdar.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 185, count: 0, unit: "1kg" } } },
                         { id: 8002, name: "Arhar-Moti",                                                    image: "rdar.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 175, count: 0, unit: "1kg" } } },
                         { id: 8003, name: "Chana-Dal",                                                     image: "rchana.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 110, count: 0, unit: "1kg" } } },
                         { id: 8004, name: "Kale Chane",                                                    image: "rkalachana.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 110, count: 0, unit: "1kg" } } },
                         { id: 8005, name: "Urad-Chilka",                                                   image: "ruradc.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 150, count: 0, unit: "1kg" } } },
                         { id: 8006, name: "Urad-Sabut",                                                    image: "rurads.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 155, count: 0, unit: "1kg" } } },
                         { id: 8007, name: "Urad-Dhuli",                                                    image: "ruradd.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 160, count: 0, unit: "1kg" } } },
                         { id: 8008, name: "Masoor-Barik",                                                  image: "rmasoor.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 120, count: 0, unit: "1kg" } } },
                         { id: 8009, name: "Masoor-Moti",                                                   image: "rmasoor.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 115, count: 0, unit: "1kg" } } },
                         { id: 8010, name: "Moong-Chilka",                                                  image: "rmoongc.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 130, count: 0, unit: "1kg" } } },
                         { id: 8011, name: "Moong-Dhuli",                                                   image: "rmoongd.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 140, count: 0, unit: "1kg" } } },
                         { id: 8012, name: "Moong-Sabut",                                                   image: "rmoongs.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 125, count: 0, unit: "1kg" } } },
                         { id: 8013, name: "Rajma-Pahadi",                                                  image: "rrp.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 210, count: 0, unit: "1kg" } } },
                         { id: 8014, name: "Rajma-Chitra",                                                  image: "rrc.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 165, count: 0, unit: "1kg" } } },
                         { id: 8015, name: "Kulat",                                                         image: "rkulat.jpg",       cat: "adc",        subcat: "Dal",   selectedVariant: "Qty",        variants: { "Qty":     { price: 110, count: 0, unit: "1kg" } } },

                 /*Atta*/{ id: 8016, name: "Chandan Bhog",                                                  image: "rchandan.png",       cat: "adc",        subcat: "Atta",   selectedVariant: "Qty",        variants: { "Qty":     { price: 250, count: 0, unit: "5kg" } } },
                         { id: 8017, name: "Fortune Atta",                                                  image: "rfortune.jpg",       cat: "adc",        subcat: "Atta",   selectedVariant: "Qty",        variants: { "Qty":     { price: 240, count: 0, unit: "5kg" } } },
                         { id: 8018, name: "Ashirwad Atta",                                                 image: "rashirwad.jpg",       cat: "adc",        subcat: "Atta",   selectedVariant: "Qty",        variants: { "Qty":     { price: 255, count: 0, unit: "5kg" } } },

                 /*Rice*/{ id: 8019, name: "Khanda Rice",                                                   image: "rrice.jpg",       cat: "adc",        subcat: "Rice",   selectedVariant: "Qty",        variants: { "Qty":     { price: 50, count: 0, unit: "1kg" } } },
                         { id: 8020, name: "Parmal Rice",                                                   image: "rrice.jpg",       cat: "adc",        subcat: "Rice",   selectedVariant: "Qty",        variants: { "Qty":     { price: 60, count: 0, unit: "1kg" } } },

                /*Oil*/ { id: 8021, name: "Fortune Kachi Ghani Oil",                                        image: "rfkg.jpg",       cat: "mo",        subcat: "Oil",   selectedVariant: "L",        variants: { "L":     { price: 220, count: 0, unit: "910g" } } },
                 /*Oil*/ { id: 8022, name: "Fortune Soya Bean Oil",                                         image: "rsbo.jpg",       cat: "mo",        subcat: "Oil",   selectedVariant: "L",        variants: { "L":     { price: 145, count: 0, unit: "750g" } } },              
                 /*Oil*/ { id: 8023, name: "Fortune Rice Bran Oil",                                         image: "rrbo.jpg",       cat: "mo",        subcat: "Oil",   selectedVariant: "L",        variants: { "L":     { price: 200, count: 0, unit: "870g" } } },
                 /*Oil*/ { id: 8024, name: "Fortune Sunflower Oil",                                         image: "rfsl.jpg",       cat: "mo",        subcat: "Oil",   selectedVariant: "L",        variants: { "L":     { price: 185, count: 0, unit: "800g" } } },

              /*General*/{ id: 8025, name: "Poha",                                                          image: "rpoha.jpg",       cat: "adc",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 60, count: 0, unit: "1kg" } } },
                         { id: 8026, name: "Dalia",                                                         image: "rdalia.jpg",       cat: "adc",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 55, count: 0, unit: "1kg" } } },
                         { id: 8027, name: "Besan",                                                         image: "rbesan.jpg",       cat: "adc",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 110, count: 0, unit: "1kg" } } },
                         { id: 8028, name: "Maida",                                                         image: "rmaida.jpg",       cat: "adc",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 50, count: 0, unit: "1kg" } } },
                         { id: 8029, name: "Suji",                                                          image: "rsuji.jpg",       cat: "adc",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 55, count: 0, unit: "1kg" } } },
                         { id: 8030, name: "Nutri",                                                         image: "rnutri.jpg",       cat: "adc",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 110, count: 0, unit: "1kg" } } },
                         { id: 8031, name: "Raw Penuts",                                                    image: "rrawp.jpg",       cat: "adc",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 180, count: 0, unit: "1kg" } } },
                         { id: 8032, name: "Salt",                                                          image: "rtsalt.jpg",       cat: "adc",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 25, count: 0, unit: "1kg" } } },
                         { id: 8033, name: "Sugar",                                                         image: "rsugar.jpg",       cat: "adc",        subcat: "General",   selectedVariant: "Qty",        variants: { "Qty":     { price: 50, count: 0, unit: "1kg" } } },

                 /*Milk*/{ id: 8034, name: "Ananda Full cream-Milk",                                        image: "rananda.jpg",       cat: "dbm",        subcat: "Milk",   selectedVariant: "Qty",        variants: { "Qty":     { price: 36, count: 0, unit: "1pkt" } } },
                 /*Milk*/{ id: 8035, name: "Ananda-Milk",                                                   image: "rananda.jpg",       cat: "dbm",        subcat: "Milk",   selectedVariant: "Qty",        variants: { "Qty":     { price: 22, count: 0, unit: "1pkt" } } },
                 /*Milk*/{ id: 8036, name: "Egg Crate",                                                     image: "regg.jpg",       cat: "dbm",        subcat: "Egg",   selectedVariant: "Qty",        variants: { "Qty":     { price: 190, count: 0, unit: "1crt" } } },
                 /*Milk*/{ id: 8037, name: "White Bread",                                                   image: "rbreadw.jpg",       cat: "dbm",        subcat: "Bread",   selectedVariant: "Qty",        variants: { "Qty":     { price: 25, count: 0, unit: "350g" } } },

                 /*Milk*/
                        



/*Instant Food*/           
                /*Noodles*/{ id: 9001, name: "Maggie",                                                      image: "imaggie.jpg",       cat: "instant",        subcat: "Noodles",   selectedVariant: "Qty",        variants: { "Qty":     { price: 10, count: 0, unit: "70g" } } },
                           { id: 9002, name: "Wai Wai Ready To Eat Veg Noodels",                            image: "iwiev.jpg",       cat: "instant",        subcat: "Noodles",   selectedVariant: "Qty",        variants: { "Qty":     { price: 15, count: 0, unit: "65g" } } },
                           { id: 9003, name: "Wai Wai Non-Veg",                                             image: "iwienv.jpg",       cat: "instant",        subcat: "Noodles",   selectedVariant: "Qty",        variants: { "Qty":     { price: 15, count: 0, unit: "65" } } },
                           { id: 9004, name: "Yippee Magic Masala Noodles",                                 image: "iy.jpg",       cat: "instant",        subcat: "Noodles",   selectedVariant: "Qty",        variants: { "Qty":     { price: 25, count: 0, unit: "120g" } } },
                           { id: 9011, name: "Nissin Mazedar Masala Cup Noodles",                           image: "inn.jpg",       cat: "instant",        subcat: "Noodles",   selectedVariant: "Qty",        variants: { "Qty":     { price: 55, count: 0, unit: "70g" } } },
                           { id: 9012, name: "Nissin Vegetable Manchow Cup Noodles",                        image: "innm.jpg",       cat: "instant",        subcat: "Noodles",   selectedVariant: "Qty",        variants: { "Qty":     { price: 55, count: 0, unit: "70g" } } },
                           { id: 9013, name: "wickedgud Instant Desi Manchow Cup Noodles",                  image: "inwg.jpg",       cat: "instant",        subcat: "Noodles",   selectedVariant: "Qty",        variants: { "Qty":     { price: 60, count: 0, unit: "70g" } } },
                           { id: 9014, name: "Good Seoul Korean Rice Cake Topokki Carbonara",               image: "ings.jpg",       cat: "instant",        subcat: "Noodles",   selectedVariant: "Qty",        variants: { "Qty":     { price: 600, count: 0, unit: "113g" } } },

                  /*Knorr*/{ id: 9005, name: "Knorr Hot & Sour Soup",                                       image: "ikhnsv.jpg",       cat: "instant",        subcat: "Soup",   selectedVariant: "Qty",        variants: { "Qty":     { price: 10, count: 0, unit: "11g" } } },
                           { id: 9006, name: "Knorr Sweet Corn Vegetable Soup",                             image: "iksc.jpg",       cat: "instant",        subcat: "Soup",   selectedVariant: "Qty",        variants: { "Qty":     { price: 10, count: 0, unit: "11g" } } },

                 /*McCain*/{ id: 9007, name: "MaCain Variety Pack",                                         image: "imvp.jpg",       cat: "instant",        subcat: "MaCain",   selectedVariant: "Qty",        variants: { "Qty":     { price: 180, count: 0, unit: "550g" } } },
                           { id: 9008, name: "MaCain Mini Samosa Cheese Pizza Style Filling",               image: "imminisamosa.jpg",       cat: "instant",        subcat: "MaCain",   selectedVariant: "Qty",        variants: { "Qty":     { price: 160, count: 0, unit: "240g" } } },
                           { id: 9009, name: "MaCain French Fries",                                         image: "imff.jpg",       cat: "instant",        subcat: "MaCain",   selectedVariant: "Qty",        variants: { "Qty":     { price: 120, count: 0, unit: "420g" } } },
                           { id: 9010, name: "MaCain Veggie Fingers",                                       image: "mcvf.jpg",       cat: "instant",        subcat: "MaCain",   selectedVariant: "Qty",        variants: { "Qty":     { price: 180, count: 0, unit: "400g" } } },

                           { id: 9015, name: "Corn Flakes Kellogg's real strawberry puree",                   image: "rcfs.jpg",       cat: "instant",        subcat: "All",   selectedVariant: "Qty",        variants: { "Qty":     { price: 90, count: 0, unit: "251g" } } },
                  /*All*/  { id: 9016, name: "Corn Flakes Kellogg's original",                                image: "rcfo.jpg",       cat: "instant",        subcat: "All",   selectedVariant: "Qty",        variants: { "Qty":     { price: 90, count: 0, unit: "251g" } } },

              /*Desserts*/  { id: 1001,   name: "Gulab Jamun",                                                     image: "omigj.jpg",            cat: "partneromi",       subcat: "Desserts",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 26.25, count: 0, unit: "1pc" } } },
              /*Desserts*/  { id: 1002,   name: "Rasgulla Sponge",                                                     image: "omirs.jpg",            cat: "partneromi",       subcat: "Desserts",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 26.25, count: 0, unit: "1pc" } } },
              /*Desserts*/  { id: 1003,   name: "Pastry Pineapple",                                                     image: "omipp.jpg",            cat: "partneromi",       subcat: "Desserts",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 26.25, count: 0, unit: "1pc" } } },
              /*Desserts*/  { id: 1004,   name: "Pastry Truffle",                                                     image: "omitp.jpg",            cat: "partneromi",       subcat: "Desserts",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 52.5, count: 0, unit: "1pc" } } },
              /*Desserts*/  { id: 1005,   name: "Brownie",                                                     image: "omib.jpg",            cat: "partneromi",       subcat: "Desserts",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 84, count: 0, unit: "1pc" } } },
              /*Desserts*/  { id: 1006,   name: "Bal Mithai",                                                     image: "omibm.jpg",            cat: "partneromi",       subcat: "Desserts",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 52.5, count: 0, unit: "2pc" } } },
              /*Desserts*/  { id: 1007,   name: "Chocolate Barfi",                                                     image: "omicb.jpg",            cat: "partneromi",       subcat: "Desserts",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 52.5, count: 0, unit: "2pc" } } },

              /*Beveragese*/  { id: 1009,   name: "Kesar Milk",                                                     image: "omikm.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 126, count: 0, unit: "300ml" } } },
              /*Beveragese*/  { id: 1010,   name: "Thandai",                                                     image: "omit.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 126, count: 0, unit: "300ml" } } },
              /*Beveragese*/  { id: 1011,   name: "Strawberry Shake",                                                     image: "omiss.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 126, count: 0, unit: "300ml" } } },
              /*Beveragese*/  { id: 1012,   name: "Butter Scotch Shake",                                                     image: "omibs.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 147, count: 0, unit: "300ml" } } },
              /*Beveragese*/  { id: 1013,   name: "Tiramisu Shake",                                                     image: "omits.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 147, count: 0, unit: "300ml" } } },
              /*Beveragese*/  { id: 1014,   name: "Oreo Shake",                                                     image: "omios.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 157.5, count: 0, unit: "300ml" } } },
              /*Beveragese*/  { id: 1015,   name: "Rasmalai Shake",                                                     image: "omirms.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 157.5, count: 0, unit: "300ml" } } },
              /*Beveragese*/  { id: 1016,   name: "Pista Milk",                                                     image: "omipm.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 157.5, count: 0, unit: "300ml" } } },

              /*Beverages*/  { id: 1017,   name: "Black Tea",                                                     image: "omibt.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 31.5, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1018,   name: "Hot Tea",                                                     image: "omiht.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 42, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1019,   name: "Black Cofee",                                                     image: "omibc.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 52.5, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1020,   name: "Hot Milk",                                                     image: "omiht.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 52.5, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1021,   name: "Hand Blend Coffee",                                                     image: "omiht.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 84, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1022,   name: "Rich Hot Chocolate",                                                     image: "omirhc.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 105, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1023,   name: "Honey Ginger Lemon Tea",                                                     image: "omighl.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 73.5, count: 0, unit: "300ml" } } },

              /*Beverages*/  { id: 1024,   name: "Lemon Soda",                                                     image: "omils.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 84, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1025,   name: "Masala Coke",                                                     image: "omimc.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 94.5, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1026,   name: "Mojito",                                                     image: "omim.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 94.5, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1027,   name: "Shikanji",                                                     image: "omis.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 94.5, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1028,   name: "Blue Ocean",                                                     image: "omibl.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 105, count: 0, unit: "300ml" } } },
              /*Beverages*/  { id: 1029,   name: "Green Apple",                                                     image: "omiga.jpg",            cat: "partneromi",       subcat: "Beverages",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 105, count: 0, unit: "300ml" } } },

              /*Snacks*/  { id: 1030,   name: "Samosa",                                                     image: "omisam.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 26.25, count: 0, unit: "1pc" } } },
              /*Snacks*/  { id: 1031,   name: "Bread Pakoda",                                                     image: "omibp.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 26.25, count: 0, unit: "1pc" } } },
              /*Snacks*/  { id: 1032,   name: "Aloo Bonda",                                                     image: "omiab.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 52.5, count: 0, unit: "1pc" } } },
              /*Snacks*/  { id: 1033,   name: "Vada Pav",                                                     image: "omivp.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 52.5, count: 0, unit: "1pc" } } },
              /*Snacks*/  { id: 1034,   name: "Samosa With Choley",                                                     image: "omics.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 52.5, count: 0, unit: "1pc" } } },
              /*Snacks*/  { id: 1035,   name: "Pakodi",                                                     image: "omipak.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 63, count: 0, unit: "100gm" } } },
              /*Snacks*/  { id: 1036,   name: "French Fries",                                                     image: "omiff.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 105, count: 0, unit: "100gm" } } },
              /*Snacks*/  { id: 1037,   name: "Peri Peri Fries",                                                     image: "omippf.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 126, count: 0, unit: "100gm" } } },
              /*Snacks*/  { id: 1038,   name: "Honey Chilli Potatoes",                                                     image: "omihcp.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 210, count: 0, unit: "500gm" } } },
              /*Snacks*/  { id: 1039,   name: "Choley Bhature",                                                     image: "omicholeb.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 126, count: 0, unit: "2pc" } } },
              /*Snacks*/  { id: 1040,   name: "Pav Bhaji",                                                     image: "omipb.jpg",            cat: "partneromi",       subcat: "Snacks",                   selectedVariant: "Qty",           variants: { "Qty":        { price: 157.5, count: 0, unit: "1pc" } } },

                           

                        
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
    // We use getBoundingClientRect for more precision than clientWidth
    const width = slider.getBoundingClientRect().width;
    
    // Apply the move
    slider.style.transform = `translateX(${-currentIndex * width}px)`;

    // Button states
    prevBtn.disabled = (currentIndex === 0);
    nextBtn.disabled = (currentIndex === slides.length - 1);
    
    // Debugging: Uncomment the line below to see the width in your console (F12)
    // console.log("Current Width:", width, "Index:", currentIndex);
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
        0: "Drinks & Snacks",
        6: "Grocery & Kitchen",
        9: "Beauty and Personal Care",
        15: "House Hold Essentials",
        16: "Collaborate Stores"
    };

    collectionGrid.innerHTML = collections.map((c, i) => {
        let cardHtml = '';

        // Check if the current index has a defined heading in our map
        if (sectionHeadings[i]) {
            cardHtml += `<h2 class="grid-section-heading">${sectionHeadings[i]}</h2>`;
        }

        // Use only the first image from the previews array
        const displayImage = c.previews.length > 0 ? c.previews[0] : 'placeholder.jpg';

        cardHtml += `
            <div class="collection-card" data-id="${c.id}" data-name="${c.name}">
                <div class="image-preview-box">
                    <div class="image-preview-card">
                        <img src="${displayImage}" alt="${c.name}">
                    </div>
                </div>
                <h3>${c.name}</h3>
            </div>
        `;

        return cardHtml;
    }).join('');
}
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
        // Checks if the category is Omi's Sweets to append the GST notice
        if (catName === "Omi's Sweets") {
            sliderTitle.innerText = catName + " (Rates include 5% GST)";
        } else {
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
                <img src="${sub.image}" alt="${sub.name}">
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
                        <img src="${p.image}" class="iimg" alt="${p.name}">
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
        const randomPeople = Math.floor(Math.random() * 11) + 5;
        if (countElement) countElement.textContent = randomPeople;
    }

    function updateSidebar() {
    let itemsTotal = 0, totalItems = 0;
    let html = "";

    products.forEach(p => {
        Object.keys(p.variants).forEach(vName => {
            const v = p.variants[vName];
            if (v.count > 0) {
                itemsTotal += (v.count * v.price);
                totalItems += v.count;
                html += `
                    <div class="order-item-detail">
                        <img src="${p.image}" alt="item">
                        <div>
                            <strong>${p.name} (${v.unit})</strong><br>
                            Rs ${v.price}
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
    // Standard rule: Under 300->50, 300-1000->100, 1000+ -> 200
    let baseDelivery = itemsTotal > 0 ? (itemsTotal < 0 ? 0 : (itemsTotal <= 0 ? 0 : 0)) : 0;

    // --- 2. KM BASED CHARGES ---
    let kmCharges = 0;
    
    // Logic: Only calculate if items exist AND location is tagged
    if (itemsTotal > 0 && locationTagged) {
        if (currentDistance <= 1) kmCharges = 30;
        else if (currentDistance <= 2) kmCharges = 50; 
        else if (currentDistance <= 3) kmCharges = 80;
        else if (currentDistance <= 4) kmCharges = 90;
        else if (currentDistance <= 5) kmCharges = 100;
        else kmCharges = 120; 
    }

    // --- 3. NIGHT CHARGES LOGIC (8PM to 7AM) ---
    let nightCharges = 0;
    const now = new Date();
    const hour = now.getHours(); 

    if (itemsTotal > 0) {
        if (hour >= 20) { 
            nightCharges = Math.min((hour - 19) * 10, 50);
        } else if (hour < 7) { 
            nightCharges = 50;
        }
    }

    const totalDelivery = baseDelivery + kmCharges + nightCharges;

    // --- UPDATE UI ---
    document.getElementById('sidebar-content').innerHTML = html || "<p>Cart is empty</p>";
    document.getElementById('subtotal-val').innerText = itemsTotal;
    
    // Show a message if location isn't tagged yet
    const deliveryDisplay = document.getElementById('delivery-val');
    deliveryDisplay.innerText = locationTagged ? totalDelivery : "Tag Location";
    deliveryDisplay.style.color = locationTagged ? "" : "#ff9800"; // Orange alert if not tagged

    document.getElementById('total-price').innerText = itemsTotal + (locationTagged ? totalDelivery : 0);

    // Store breakdown
    window.deliveryBreakdown = { base: baseDelivery, km: kmCharges, night: nightCharges };

    // Update Cart Counter & Popup
    const cartCount = document.getElementById('cart-count');
    if (cartCount) cartCount.innerText = totalItems;
    document.body.style.marginBottom = totalItems > 0 ? "7rem" : "0";

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
        if (card) openCollection(card.dataset.id, card.dataset.name);
    });

    productGrid.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('.variant-btn')) {
        const btn = target.closest('.variant-btn');
        const p = products.find(prod => prod.id == btn.dataset.productId);
        p.selectedVariant = btn.dataset.variant;
        renderProducts(activeCategory);
    }

    if (target.classList.contains('add-btn') || target.classList.contains('qty-btn')) {
        const id = target.dataset.productId;
        const amount = parseInt(target.dataset.change || 1);
        const p = products.find(prod => prod.id == id);
        const v = p.variants[p.selectedVariant];
        
        v.count += amount;
        if (v.count < 0) v.count = 0;

        if (amount > 0) {
            // Add image to the start if increasing
            recentAdditions.unshift(p.image);
        } else if (amount < 0) {
            // Remove one instance of this image if decreasing
            const index = recentAdditions.indexOf(p.image);
            if (index > -1) {
                recentAdditions.splice(index, 1);
            }
        }

        // Keep the preview list clean (max 4-5 items)
        if (recentAdditions.length > 5) recentAdditions.pop();

        renderProducts(activeCategory);
        updateSidebar();
    }
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

    document.getElementById('cart-trigger').addEventListener('click', toggleSidebar);
    document.getElementById('cart-popup').addEventListener('click', toggleSidebar);
    document.getElementById('close-sidebar').addEventListener('click', () => history.back());
    document.getElementById('close-slider').addEventListener('click', () => history.back());

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
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light'); // Save preference
    showThemePopup(isDark ? "☀️ Light Mode" : "🌙 Dark Mode");
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

    document.getElementById('location-btn').addEventListener('click', async () => {
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
            updateSidebar();

            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
                const data = await res.json();
                custAddressInput.value = data.display_name || "Location Tagged";
                display.innerText = `✅ ${currentDistance.toFixed(1)} km from Wink It`;
            } catch (e) { 
                custAddressInput.value = `Lat: ${userCoords.lat}, Lon: ${userCoords.lon}`;
                display.innerText = `✅ Tagged (${currentDistance.toFixed(1)} km)`; 
            }
        }, () => { 
            // Stop the timer if there is an error
            clearInterval(timer);
            display.innerText = "ℹ️ Please turn on Location/GPS and Try again"; 
        }, {
            enableHighAccuracy: true, // Optional: forces better GPS usage
            timeout: 15000,           // Optional: stops trying after 15 seconds
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
    const total = document.getElementById('total-price').innerText;
    
    if (total == "0") { alert("Cart is empty!"); return; }
    if (!name || !address) { alert("Please enter Name and Address."); return; }
    
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB'); 
    const timeStr = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

    // FIXED: Corrected the template literal for the location link
    const locationLink = userCoords ? `https://www.google.com/maps?q=${userCoords.lat},${userCoords.lon}` : `(Location not tagged)`;
    const divider = "--------------------------%0A";
    
    let msg = `🛍️ *NEW ORDER - WINK IT*%0A`;
    msg += divider;
    msg += `📅 Date: ${dateStr} | ${timeStr}%0A`;
    msg += `👤 Name: ${name}%0A📍 Address: ${address}%0A🗺️ Location: ${locationLink}%0A%0A`;
    msg += `🛒 *ITEMS:*%0A`;
    
    let itemIndex = 1;
    products.forEach(p => {
        Object.keys(p.variants).forEach(vName => {
            const v = p.variants[vName];
            if (v.count > 0) {
                msg += `${itemIndex}. ${p.name} (${v.unit}) x${v.count} - ₹${v.price * v.count}%0A`;
                itemIndex++; 
            }
        });
    });

    msg += divider;
    msg += `Subtotal: ₹${subtotal}%0A`;
    msg += `Delivery: ₹${delivery}%0A`;
    msg += `*TOTAL AMOUNT: ₹${total}*%0A`; 
    msg += divider;
    msg += `Cash on Delivery, our delivery partner will call you shortly.`;
    
    // Using encodeURIComponent is safer for special characters
    window.location.href = `https://api.whatsapp.com/send?phone=917983427187&text=${msg}`;
    });
    
    /** * Infinite Review Slider Module
 */
(function() {
    const container = document.getElementById('slider-container');
    const inner = document.getElementById('review-inner');

    // Safety check: Exit if the slider HTML isn't on this specific page
    if (!container || !inner) return;
/*☆*/
    const referenceDate = new Date("2026-02-19");
    const reviews = [
        { name: "-Mahi Chauhan-", img: "r2.jpg", stars: "★★★★★(5/5)", text: "Our location was far from the main town, and some wellness products were needed urgently...", from: "Hatipaon, Mussoorie", date: "2026-08-20" },
        { name: "-Rohit Bisht-", img: "r5.jpeg", stars: "★★★★★(5/5)", text: "Fast Delivery", from: "Manjakot", date: "2026-02-26" },
        { name: "-Arun K-", img: "r1.jpg", stars: "★★★★☆(4/5)", text: "Great Service! Mere parents ko urgent Meds. deni thi, they delivered to their door step.", from: "Mallingar, Landour", date: "2026-02-20" },
        { name: "-Mukul Thapli-", img: "r3.jpg", stars: "★★★★★(5/5)", text: "Late night delivery!.", from: "Nag Mandir, Mussoorie", date: "2026-02-23" },
        { name: "-Omkar-", img: "r4.jpg", stars: "★★★★☆(4/5)", text: "Kisi dost ne recomend kiya tha, wakey kafi achhi service h...", from: "Barlowganj, Mussoorie", date: "2026-02-25" }
        
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

