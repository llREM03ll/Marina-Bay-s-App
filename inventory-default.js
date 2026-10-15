/* Starting inventory for Marina Bay's Cafe, from the count on October 14, 2026.
   This file is only the starting point. Once you change the list inside the app (Inventory),
   the app keeps its own copy on that device and uses that instead.

   Each item: name, group (the heading it is listed under), qty (how many; 0 = out of stock,
   null = not counted yet), unit (optional, like "pcs" or "bottles"), note (optional).
   To add an item by hand, copy one line and change it. Keep every id unique. */
window.MB_DEFAULT_INVENTORY = {
  countedOn: "2026-10-14",
  items: [
    // Cups
    {"id": "12oz-dabba", "name": "12oz dabba", "group": "Cups", "qty": 279, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "16oz-dabba", "name": "16oz dabba", "group": "Cups", "qty": 912, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "22oz-dabba", "name": "22oz dabba", "group": "Cups", "qty": 390, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "12oz-double-wall", "name": "12oz double wall", "group": "Cups", "qty": 100, "unit": "", "note": "", "updated": "2026-10-14"},
    // Lids and straws
    {"id": "dome-lids", "name": "Dome lids", "group": "Lids and straws", "qty": 855, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "flat-lids", "name": "Flat lids", "group": "Lids and straws", "qty": 584, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "black-lids", "name": "Black lids", "group": "Lids and straws", "qty": 117, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "big-straw", "name": "Big straw", "group": "Lids and straws", "qty": 9, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "small-straw", "name": "Small straw", "group": "Lids and straws", "qty": 11, "unit": "", "note": "", "updated": "2026-10-14"},
    // Dairy and cream
    {"id": "fresh-milk", "name": "Fresh milk", "group": "Dairy and cream", "qty": 33, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "oat-milk", "name": "Oat milk", "group": "Dairy and cream", "qty": 7, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "vivo-whipping-cream", "name": "Vivo whipping cream", "group": "Dairy and cream", "qty": 6, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "mascarpone-cream", "name": "Mascarpone cream", "group": "Dairy and cream", "qty": 7, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "pristine-apc", "name": "Pristine APC", "group": "Dairy and cream", "qty": 11, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "condensed-milk", "name": "Condensed milk", "group": "Dairy and cream", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    // Coffee and bases
    {"id": "beans", "name": "Beans", "group": "Coffee and bases", "qty": 41, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "frappe-base", "name": "Frappe base", "group": "Coffee and bases", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "matcha-powder", "name": "Matcha powder", "group": "Coffee and bases", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "sprite", "name": "Sprite", "group": "Coffee and bases", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    // Syrups
    {"id": "ss-raspberry-syrup", "name": "SS raspberry syrup", "group": "Syrups", "qty": 6, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-blueberry-syrup", "name": "SS blueberry syrup", "group": "Syrups", "qty": 4, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-strawberry-syrup", "name": "SS strawberry syrup", "group": "Syrups", "qty": 4, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-peach-syrup", "name": "SS peach syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-french-vanilla-syrup", "name": "SS french vanilla syrup", "group": "Syrups", "qty": 11, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-cane-sugar-syrup", "name": "SS cane sugar syrup", "group": "Syrups", "qty": 6, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-white-choco-syrup", "name": "SS white choco syrup", "group": "Syrups", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-caramel-syrup", "name": "SS caramel syrup", "group": "Syrups", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-cherry-syrup", "name": "SS cherry syrup", "group": "Syrups", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-passion-fruit-syrup", "name": "SS passion fruit syrup", "group": "Syrups", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-mixed-berries-syrup", "name": "SS mixed berries syrup", "group": "Syrups", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-pistachio-syrup", "name": "SS pistachio syrup", "group": "Syrups", "qty": 3, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-vanilla-syrup", "name": "SS vanilla syrup", "group": "Syrups", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "ss-watermelon-syrup", "name": "SS watermelon syrup", "group": "Syrups", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "davinci-hazelnut", "name": "Davinci Hazelnut", "group": "Syrups", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "davinci-roasted-almond", "name": "Davinci Roasted Almond", "group": "Syrups", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "torani-butterscotch", "name": "Torani Butterscotch", "group": "Syrups", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    // Sauces
    {"id": "white-chocolate-sauce", "name": "White chocolate sauce", "group": "Sauces", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "chocolate-sauce", "name": "Chocolate sauce", "group": "Sauces", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "caramel-sauce", "name": "Caramel sauce", "group": "Sauces", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "strawberry-sauce", "name": "Strawberry sauce", "group": "Sauces", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    // Toppings and fruit
    {"id": "lychees-in-can", "name": "Lychees in can", "group": "Toppings and fruit", "qty": 5, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "strawberries-in-can", "name": "Strawberries in can", "group": "Toppings and fruit", "qty": 7, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "lady-fingers", "name": "Lady fingers", "group": "Toppings and fruit", "qty": 3, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "coconut-jelly", "name": "Coconut jelly", "group": "Toppings and fruit", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "coffee-jelly", "name": "Coffee jelly", "group": "Toppings and fruit", "qty": 6, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "milk-chocolate-chips", "name": "Milk chocolate chips", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "white-chocolate-chips", "name": "White chocolate chips", "group": "Toppings and fruit", "qty": 7, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "dark-chocolate-powder", "name": "Dark chocolate powder", "group": "Toppings and fruit", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "oreo-crumbs", "name": "Oreo crumbs", "group": "Toppings and fruit", "qty": 19, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "biscoff-crumbs", "name": "Biscoff crumbs", "group": "Toppings and fruit", "qty": 6, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "biscoff-spread", "name": "Biscoff spread", "group": "Toppings and fruit", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    // Milk tea (MT)
    {"id": "wintermelon-syrup-mt", "name": "Wintermelon syrup MT", "group": "Milk tea (MT)", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "taro-syrup-mt", "name": "Taro syrup MT", "group": "Milk tea (MT)", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "hokkaido-syrup-mt", "name": "Hokkaido syrup MT", "group": "Milk tea (MT)", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "okinawa-syrup-mt", "name": "Okinawa syrup MT", "group": "Milk tea (MT)", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "brown-sugar-syrup-mt", "name": "Brown sugar syrup MT", "group": "Milk tea (MT)", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "strawberry-syrup-mt", "name": "Strawberry syrup MT", "group": "Milk tea (MT)", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "dark-choco-powder-mt", "name": "Dark choco powder MT", "group": "Milk tea (MT)", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "c-c-powder-mt", "name": "C&C powder MT", "group": "Milk tea (MT)", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "milk-essence-powder-mt", "name": "Milk essence powder MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "matcha-powder-mt", "name": "Matcha powder MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "red-velvet-powder-mt", "name": "Red velvet powder MT", "group": "Milk tea (MT)", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    // Fruit tea (FT)
    {"id": "melon-syrup-ft", "name": "Melon syrup FT", "group": "Fruit tea (FT)", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "green-apple-syrup-ft", "name": "Green apple syrup FT", "group": "Fruit tea (FT)", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "mango-syrup-ft", "name": "Mango syrup FT", "group": "Fruit tea (FT)", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "lemon-syrup-ft", "name": "Lemon syrup FT", "group": "Fruit tea (FT)", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    // Tea extras
    {"id": "cheesecake-base", "name": "Cheesecake base", "group": "Tea extras", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "cream-cheese-powder", "name": "Cream cheese powder", "group": "Tea extras", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    // Snacks
    {"id": "pringles-102g-sour-cream-onion", "name": "Pringles (102g) sour cream & onion", "group": "Snacks", "qty": 1, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "pringles-102g-cheese", "name": "Pringles (102g) cheese", "group": "Snacks", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "pringles-102g-bbq", "name": "Pringles (102g) BBQ", "group": "Snacks", "qty": 3, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "pringles-102g-original", "name": "Pringles (102g) original", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "pringles-42g-sour-cream-onion", "name": "Pringles (42g) sour cream & onion", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "pringles-42g-original", "name": "Pringles (42g) original", "group": "Snacks", "qty": 0, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "piknik-thick-cut", "name": "Piknik thick cut", "group": "Snacks", "qty": 5, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "piknik-original", "name": "Piknik original", "group": "Snacks", "qty": 2, "unit": "", "note": "", "updated": "2026-10-14"},
    {"id": "piknik-ketchup", "name": "Piknik ketchup", "group": "Snacks", "qty": null, "unit": "", "note": "", "updated": "2026-10-14"},
  ]
};
