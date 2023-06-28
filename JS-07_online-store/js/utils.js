

export class Products {
    constructor(products, parentElement /* container */){
        this.products = products;
        this.parentElement = parentElement;
        this.categories = []
        this.currentCategory = "All"
        this.currentPrice = 0;
        this.itemsForShow = 6;
        this.purchasedRecently = JSON.parse(localStorage.getItem('purchase'));
        this.activeButton = document.createElement('li');
        this.render()
    }

    render() {
        this.getCategoriesMethod();
        this.parentElement.innerHTML = "";
        this.renderFilter();
        this.renderProducts(this.products);
    }

    renderProductsWithDelay(data) {
        const listContainer = document.createElement('div');
        listContainer.classList.add('products-list-container');

        const productsList = document.createElement('div');
        productsList.classList.add('products-list', 'nothing-to-show');
        const spinner = document.createElement("div")
        spinner.classList.add("loader")
        productsList.appendChild(spinner)
        this.parentElement.appendChild(productsList);

        setTimeout(() => {
            this.parentElement.removeChild(productsList);
            this.renderProducts(data);
        }, 1000)
    }

    renderProducts(data) {
        const listContainer = document.createElement('div');
        listContainer.classList.add('products-list-container');

        const productsList = document.createElement('div');
        productsList.classList.add('products-list');
        this.setAttributesMethod(listContainer, {
            onmousedown: "return false",
            onselectstart: "return false"
        })

        if(!data.length){
            // moreElementsContainer.classList.add('closed');
            listContainer.innerHTML = "Nothing to show..."
            listContainer.classList.add('nothing-to-show');
            return this.parentElement.appendChild(listContainer);
        }

        const slicedData = data.slice(0, this.itemsForShow)

        slicedData.map(product => {
            const { images, id, title, price, category, rating} = product;
            const item = document.createElement('div');
            item.classList.add('products-list-item');
            
            const itemBuyToggle = document.createElement('button');
            itemBuyToggle.innerHTML = `
            <i class="bi bi-cart"></i>`

            itemBuyToggle.classList.add('products-list-item-img-buy');
            itemBuyToggle.addEventListener('click', () => {
                
                this.purchasedRecently = JSON.parse(localStorage.getItem('purchase'));

                if(!this.purchasedRecently){
                    this.purchasedRecently = [{
                        id,
                        image: images[0],
                        title,
                        price,
                        count: 1,
                    }];
                    // console.log(this.purchasedRecently[0]);
                    console.log(this.purchasedRecently);
                    localStorage.setItem(`purchase`, JSON.stringify(this.purchasedRecently));
                   
                    return
                }
                
                this.purchasedRecently.push( {
                    id,
                    image: images[0],
                    title,
                    price,
                    count: 1,
                } );
                localStorage.setItem(`purchase`,JSON.stringify(this.purchasedRecently));
                
               
                
            });

            const itemImg = document.createElement('div');
            itemImg.style.backgroundImage = `url(${images[0]})`;
            itemImg.classList.add('products-list-item-img');
            itemImg.appendChild(itemBuyToggle);
    
            const itemTitle = document.createElement('div');
            itemTitle.classList.add('products-list-item-title');
            const itemTitleDescr = document.createElement('div');
            itemTitleDescr.classList.add('item-title-descr');
            itemTitleDescr.innerHTML = `${title}`
            const itemTitlePrice = document.createElement('div');
            itemTitlePrice.classList.add('item-title-price');
            itemTitlePrice.innerHTML = `$${price}`
            const itemTitleRating = document.createElement('div');
            itemTitleRating.classList.add('item-title-rating');
            itemTitleRating.innerHTML = this.getStarsMethod(rating);
            
            const itemTitleCategory = document.createElement('div');
            itemTitleCategory.classList.add('item-title-category');
            itemTitleCategory.innerHTML = `<i>${category}</i>`

            itemTitle.appendChild(itemTitleDescr);
            itemTitle.appendChild(itemTitlePrice);
            itemTitle.appendChild(itemTitleRating);
            itemTitle.appendChild(itemTitleCategory);
    
            item.appendChild(itemImg);
            item.appendChild(itemTitle);

            productsList.appendChild(item)
        })



        const moreElementsContainer = document.createElement('div');
        moreElementsContainer.classList.add('products-list-more');
        
        const moreElementsButton = document.createElement('button');
        moreElementsButton.innerHTML = `more items`
        moreElementsButton.addEventListener('click', () => {
            if(this.itemsForShow < data.length - 6){
                this.itemsForShow += 6;
                this.parentElement.removeChild(document.querySelector('.products-list-container'));
                this.renderProducts(data);
                return
            }
            this.itemsForShow = data.length;
            this.parentElement.removeChild(document.querySelector('.products-list-container'));
            this.renderProducts(data);
            console.log("bibika", this.itemsForShow, '---', data.length);
            document.querySelector('.products-list-more').classList.add('closed');

        })
        moreElementsButton.classList.add('products-list-more-button');
        moreElementsContainer.appendChild(moreElementsButton);

        listContainer.appendChild(productsList);
        listContainer.appendChild(moreElementsContainer)

        // console.log(data.length <= 6, "--", data.length === this.products.length)
        if(data.length <= 6){
            moreElementsContainer.classList.add('closed');
        } else {
            moreElementsContainer.classList.remove('closed');
        }

        this.parentElement.appendChild(listContainer);


    }

    renderFilter() {
        const productsFilter = document.createElement('div');
        productsFilter.classList.add('products-filter');
        
        //first child productsFilterSearch
        const productsFilterSearch = document.createElement('div');
        productsFilterSearch.classList.add('products-filter-search', 'input-group');
        const productsFilterSearchInput = document.createElement('input');
        this.setAttributesMethod(productsFilterSearchInput, 
            {
                type: "text",
                list: "search-datalist",
                class: "form-control products-filter-search-input",
                placeholder: 'Search',
            });
        const productsFilterButtonContainer = document.createElement('div');
        productsFilterButtonContainer.classList.add('input-group-btn');
        const productsFilterButton = document.createElement('button');
        productsFilterButton.classList.add("btn", "btn-default");
        productsFilterButton.innerHTML = '<i class="bi bi-search"></i>';
        productsFilterButton.addEventListener('click', () => this.filterBySearch());
        productsFilterButtonContainer.appendChild(productsFilterButton)
        productsFilterSearch.appendChild(productsFilterSearchInput);
        productsFilterSearch.appendChild(productsFilterButtonContainer);
        productsFilterSearch.appendChild(this.getItemsByNameMethod());
        
        // productsFilterSearch.innerHTML = `
        // <input type="text" list="search-datalist" class="form-control" placeholder="Search">
        // <div class="input-group-btn">
        //   <button class="btn btn-default" type="submit">
        //     <i class="bi bi-search"></i>
        //   </button>
        // </div>
        // `


        // second child productsFilterCategory
        const productsFilterCategory = document.createElement('div');
        productsFilterCategory.classList.add('products-filter-category');
        const productsFilterCategorySpan = document.createElement('span');
        productsFilterCategorySpan.classList.add(`products-filter-category-span`)
        productsFilterCategorySpan.innerHTML ='<b>Category</b>';
        const productsFilterCategoryList = document.createElement("ul")
        productsFilterCategoryList.classList.add("products-filter-category-list");
        this.categories.map(category => {
            const li = document.createElement("li")
            li.textContent = category
            li.addEventListener("click", () => {
                this.activeButton.classList.remove('actived');
                this.activeButton = null;
                this.currentCategory = li.textContent;
                this.activeButton = li;
                this.activeButton.classList.add('actived');
                if(this.currentPrice > 0){
                    document.querySelector('.products-filter-search-input').value = '';
                    this.filterByPrice();
                    return
                }
                document.querySelector('.products-filter-search-input').value = '';
                this.filterByCategory();
            })
            productsFilterCategoryList.appendChild(li)
        })
        productsFilterCategory.appendChild(productsFilterCategorySpan);
        productsFilterCategory.appendChild(productsFilterCategoryList);

    
        // third child productsFilterPrice
        
        const productsFilterPrice = document.createElement('div');
        productsFilterPrice.classList.add('products-filter-price');
        const productsFilterPriceSpan1 = document.createElement('span');
        productsFilterPriceSpan1.innerHTML= '<b>Price</b>';
        productsFilterPriceSpan1.classList.add('products-filter-price-span');
        const productsFilterPriceSpan2 = document.createElement('span')
        productsFilterPriceSpan2.innerHTML = `<b>Value:</b> more than $ 0`;
        productsFilterPriceSpan2.classList.add('products-filter-price-value');
        
       


        const productsFilterPriceInput = document.createElement('input');
        this.setAttributesMethod(productsFilterPriceInput, 
            {
                type: "range",
                class: "products-filter-price-range",
                max: '600',
                min: '0',
                step: '10',
                value: '0',
            });
        productsFilterPriceInput.addEventListener('change', event => {
            productsFilterPriceSpan2.innerHTML = `<b>Value:</b> more than $ ${event.target.value}`
            setTimeout(() => {
                this.currentPrice = +event.target.value;
                document.querySelector('.products-filter-search-input').value = '';
                // console.log(productsFilterPriceInput.value);
                this.filterByPrice();
            }, 1000);
        })

        
        
        productsFilterPrice.appendChild(productsFilterPriceSpan1);
        productsFilterPrice.appendChild(productsFilterPriceInput);
        productsFilterPrice.appendChild(productsFilterPriceSpan2);

        // creating  productsFilter
        productsFilter.appendChild(productsFilterSearch);
        productsFilter.appendChild(productsFilterCategory);
        productsFilter.appendChild(productsFilterPrice);
        this.parentElement.appendChild(productsFilter);
    }

    filterByCategory() {
        if (this.currentCategory !== 'All'){
            const data = this.products.filter(({category}) => category === this.currentCategory);
            this.parentElement.removeChild(document.querySelector('.products-list-container'));
            
            // this.parentElement.removeChild(document.querySelector('.products-list-more'));

            this.renderProductsWithDelay(data);
            return
        }
        this.itemsForShow = 6;
        this.parentElement.removeChild(document.querySelector('.products-list-container'));

        // this.parentElement.removeChild(document.querySelector('.products-list-more'));

        this.renderProductsWithDelay(this.products);
    }

    filterByPrice() {
        if (this.currentCategory !== 'All'){
            const data = this.products
                .filter(( {price, category} ) => price >= this.currentPrice && category === this.currentCategory)
                // .filter(( {category} ) => category === this.currentCategory);
            
            // this.parentElement.removeChild(document.querySelector('.products-list-more'));
            
            this.parentElement.removeChild(document.querySelector('.products-list-container'));
            this.renderProductsWithDelay(data);
            return
        }

        this.itemsForShow = 6;
        const data = this.products
                .filter(( {price} ) => price >= this.currentPrice);
        this.parentElement.removeChild(document.querySelector('.products-list-container'));
        this.renderProductsWithDelay(data);
    }
    
    filterBySearch() {
        // this.parentElement.removeChild(document.querySelector('.products-list-more'));

        this.parentElement.removeChild(document.querySelector('.products-list-container'));
        this.currentPrice = 0;
        this.activeButton.classList.remove('actived');
        document.querySelector('.products-filter-price-range').value = 0;
        document.querySelector('.products-filter-price-value').innerHTML = `<b>Value:</b> more than $ 0`
        const searchValue = document.querySelector('.products-filter-search-input').value;
        const searchElements = this.products.filter( ( {title} ) => title.toLowerCase().includes(searchValue.toLowerCase()));
        this.renderProductsWithDelay(searchElements);
    }

    getCategoriesMethod() {
        
        const categories = this.products.map(({ category }) => category)
        this.categories = ["All", ...new Set(categories)]
    }

    getItemsByNameMethod() {
        const  datalist = document.createElement('datalist');
        datalist.id = 'search-datalist'
        this.products.map( ( { title } ) => {
            const option = document.createElement("option")
            option.value = `${title}`; // if title wouldn't str
            datalist.appendChild(option);
        })
        return datalist
    }

    getStarsMethod(rating) {
        const fillRating = (isFill) => `<i class="bi bi-star-fill" ${isFill ? 'style="color:orange"' : ""}"></i>`
        return new Array(5).fill("").map((item, index) => fillRating(Math.round(rating) > index)).join("");
    }

    setAttributesMethod(element, attributes) {
        Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
        return element
    }


}


export class Cart {

    constructor(shopCartBGWindow, shopCartContainner){
        this.shopCart = shopCartContainner;
        this.shopCartBGWindow = shopCartBGWindow;
        this.purchases = localStorage.getItem("purchase") || '[]';
        this.sortedPurchases = []
        this.start();

    }

    start() {
        this.shopCart.classList.remove('closed');
        this.shopCartBGWindow.classList.remove('closed');
        this.sortingPurchases();
        this.renderItems(this.shopCart)
        this.renderTotal(this.shopCart)
        this.renderCheckout(this.shopCart)

    }
    renderItems(cart) {
        cart.innerHTML = '';
        // document.removeChild(document.querySelector('.shop-cart-container'));

        const closeShopToggle = document.createElement("button");
        closeShopToggle.classList.add("shop-cart-close-button");
        closeShopToggle.innerHTML = '&#215;';
        this.shopCartBGWindow.addEventListener('click', () => {
            setTimeout(() => {
                this.shopCart.classList.add('closed');
                this.shopCartBGWindow.classList.add('closed');
            }, 500);
        });

        closeShopToggle.addEventListener('click', () => {
            setTimeout(() => {
                this.shopCart.classList.add('closed');
                this.shopCartBGWindow.classList.add('closed');
            }, 500);
        });

        const shopCardHero = document.createElement('div');
        shopCardHero.classList.add('shop-cart-hero');
        shopCardHero.innerHTML = '<h4>Your Bag</h4>';


        const shopCardContainer = document.createElement('div');
        shopCardContainer.classList.add('shop-cart-container');


        this.sortedPurchases.map( purchase => {
            const { id, image, title, price, count } = purchase;
            shopCardContainer.appendChild(this.prepareElement(id, image, title, price, count));
            
        });

        cart.appendChild(closeShopToggle);
        cart.appendChild(shopCardHero);
        cart.appendChild(shopCardContainer);


        // const isProduct = JSON.parse(this.purchases).filter(product => product.id === data.id)

        // if (isProduct) {
        //     this.purchases = this.purchases.map(product => product.id === isProduct.id ? {...product, count: product.count + 1 } : product)
        // } else {
        //     this.purchases = [...this.purchases, {...data, count: 1}]
        // }

        // this.saveToLocalStorage()
    }

    renderTotal(cart){
        const shopCartTotal = document.createElement('div');
        shopCartTotal.classList.add('shop-cart-total');
        shopCartTotal.innerHTML = `<b>Total: $${this.checkSum()}</b>`
        cart.appendChild(shopCartTotal)


    }

    renderCheckout(cart){
        const shopCartCheckout = document.createElement('div');
        shopCartCheckout.classList.add('shop-cart-checkout');

        const shopCartCheckoutButton = document.createElement('button');
        shopCartCheckoutButton.classList.add('shop-cart-checkout-button');
        shopCartCheckoutButton.innerHTML = 'Checkout';
        shopCartCheckoutButton.addEventListener('click', () => {
            alert('Will readrect YOU to Checkout Page');
        });

        shopCartCheckout.appendChild(shopCartCheckoutButton);

        cart.appendChild(shopCartCheckout);
    }

    add(id){
        this.sortedPurchases = this.sortedPurchases.map( purchase => {
            if (purchase.id === id) {
                document.querySelector(`.count-of-${id}`).innerHTML = `${purchase.count + 1}`;
                return {...purchase, count: purchase.count + 1}
            }
            return purchase 
        });
        document.querySelector(`.shop-cart-total`).innerHTML = `<b>Total: $${this.checkSum()}</b>`;
        this.saveToLocalStorage();
        // document.querySelector('.shop-cart-container').removeChild(document.querySelector(`.item-id-${id}`));
    }

    delete(id) {
        let elementForRemove = null;
        this.sortedPurchases = this.sortedPurchases.map(purchase => {
            if (purchase.id === id && purchase.count > 1) {
                document.querySelector(`.count-of-${id}`).innerHTML = `${purchase.count - 1}`;
                return {...purchase, count: purchase.count - 1} 
            }else if(purchase.id === id && purchase.count === 1){
                elementForRemove = purchase.id;
                return purchase 
            }
            return purchase 
        })
        // console.log('need to be 1 element ----preeeee',this.sortedPurchases);
        // console.log(elementForRemove);
        if(elementForRemove){
            console.log('need to be 1 element',this.sortedPurchases);
            console.log(elementForRemove);
            console.log(!!elementForRemove);
            this.clearAll(elementForRemove)
            return
        }
        document.querySelector(`.shop-cart-total`).innerHTML = `<b>Total: $${this.checkSum()}</b>`;
        this.saveToLocalStorage()
    }

    clearAll(id) {
        this.sortedPurchases = this.sortedPurchases.filter( purchase => purchase.id !== id);
        document.querySelector('.shop-cart-total').innerHTML = `<b>Total: $${this.checkSum()}</b>`;
        document.querySelector('.shop-cart-container').removeChild(document.querySelector(`.item-id-${id}`));

        // this.purchases = []
        this.saveToLocalStorage()
    }

    saveToLocalStorage() {
        localStorage.setItem("purchase", JSON.stringify(this.sortedPurchases))
    }

    checkSum() {
        const totalPrice = this.sortedPurchases.reduce((acc, { price, count} ) => acc + price * count, 0);
        return totalPrice
    }

    prepareElement(id, image, title, price, count) {
        const purchaseContainer = document.createElement('div');
        purchaseContainer.classList.add(`shop-cart-item`, `item-id-${id}`);
        
        
        // preparing buttom discription container
        const purchaseDescr = document.createElement('div');
        purchaseDescr.classList.add('shop-cart-item-descr');
        const purchaseDescrTitle = document.createElement('div');
        purchaseDescrTitle.classList.add('shop-cart-item-descr-title');
        purchaseDescrTitle.innerHTML = `<b>${title}</b>`
        const purchaseDescrPrice = document.createElement('div');
        purchaseDescrPrice.classList.add('shop-cart-item-descr-price');
        purchaseDescrPrice.innerHTML = `<b>$${price}.00</b>`
        purchaseDescr.appendChild(purchaseDescrTitle)
        purchaseDescr.appendChild(purchaseDescrPrice)


        //preparing top main container with img-s and manage item container
        const purchaseMain = document.createElement('div');
        purchaseMain.classList.add('shop-cart-item-main');

        const purchaseMainIMG = document.createElement('div');
        purchaseMainIMG.classList.add('shop-cart-item-main-img');
        purchaseMainIMG.style.backgroundImage = `url(${image})`


        const purchaseMainManageItems = document.createElement('div');
        purchaseMainManageItems.classList.add('shop-cart-item-main-manage');
        
        const managePurchasedCount = document.createElement('div');
        managePurchasedCount.classList.add('item-manage-count');
        const lessButton = document.createElement('button');
        lessButton.innerHTML = '<i class="bi bi-cart-dash"></i>';
        lessButton.classList.add('less-btn');
        lessButton.addEventListener('click', () => {
            setTimeout(() => this.delete(id), 500);
        });

        const currentPurchaseCount = document.createElement('div');
        currentPurchaseCount.innerHTML = `${count}`;
        currentPurchaseCount.classList.add(`purchase-count`, `count-of-${id}`);
        const moreButton = document.createElement('button');
        moreButton.innerHTML = '<i class="bi bi-cart-plus-fill"></i>';
        moreButton.classList.add('more-btn');
        moreButton.addEventListener('click', () => {
            setTimeout(() => this.add(id), 500);
        });

        managePurchasedCount.appendChild(lessButton);
        managePurchasedCount.appendChild(currentPurchaseCount);
        managePurchasedCount.appendChild(moreButton);

        const purchaseRemoveItem = document.createElement('button');
        purchaseRemoveItem.classList.add('item-remove');
        purchaseRemoveItem.innerHTML = 'Remove <i class="bi bi-x-circle-fill item-remove-icon"></i>'    
        purchaseRemoveItem.addEventListener('click', () => {
            setTimeout(() => this.clearAll(id), 500);
        })   
        // purchaseRemoveItem.innerHTML = 'Remove <div class="item-remove-icon" style="border-radius: 50%; color: white; background-color: grey">&#215;</div>'    
        
        purchaseMainManageItems.appendChild(managePurchasedCount);
        purchaseMainManageItems.appendChild(purchaseRemoveItem);


        purchaseMain.appendChild(purchaseMainIMG);
        purchaseMain.appendChild(purchaseMainManageItems);
        
        purchaseContainer.appendChild(purchaseMain);
        purchaseContainer.appendChild(purchaseDescr);

        return purchaseContainer;
    }

    sortingPurchases(){
        const purchases = JSON.parse(this.purchases);
        const uniqueID = [];
        this.sortedPurchases = purchases.reduce((acc, product ) => {
            if (!uniqueID.includes(product.id)){
                uniqueID.push(product.id);
                acc.push(product);
                return acc
            }
            acc = acc.map( accPoduct => accPoduct.id === product.id ? {...accPoduct, count: accPoduct.count + 1} : accPoduct);
            return acc
        }, []);
        this.saveToLocalStorage();
    }   

}
// export const renderProducts = (products, parent) => {
//     parent.innerHtml = "";

//     products.map(product => {



//         const { images } = product;

//         const item = document.createElement('div');
//         item.classList.add('products-list-item');

//         const itemImg = document.createElement('div');
//         itemImg.style.backgroundImage = `url(${images[0]})`;
//         itemImg.classList.add('products-list-item-img')

//         const itemTitle = document.createElement('div');
//         itemTitle.innerHTML = 'title'

//         item.appendChild(itemImg);
//         item.appendChild(itemTitle);
//         parent.appendChild(item)
        
//     })

// }

// export const getCategories = (data) => {
//     const categories = data.map(({ category }) => category)
//     return [... new Set(categories)]
// }

// export const renderCategories = (data, parent) => {
//     const categories = getCategories(data)

//     const categoryList = document.createElement("ul")
//     categoryList.classList.add("products-filter-category-list")


//     categories.map(category => {
//         const li = document.createElement("li")
//         li.textContent = category

//         document.addEventListener("click", () => {ren})
//         categoryList.appendChild(li)
//     })

//     parent.appendChild(categoryList)
   
// }








// const cardContainer = document.getElementById("card-container");
// const loadMoreButton = document.getElementById("load-more");
// const cardCountElem = document.getElementById("card-count");
// const cardTotalElem = document.getElementById("card-total");

// const cardLimit = 99; // out lens of current element
// const cardIncrease = 9;
// const pageCount = Math.ceil(cardLimit / cardIncrease);
// let currentPage = 1;

// cardTotalElem.innerHTML = cardLimit;

// // const getRandomColor = () => {
// //   const h = Math.floor(Math.random() * 360);

// //   return `hsl(${h}deg, 90%, 85%)`;
// // };

// const handleButtonStatus = () => {
//   if (pageCount === currentPage) {
//     loadMoreButton.classList.add("disabled");
//     loadMoreButton.setAttribute("disabled", true);
//   }
// };

// const createCard = (index) => {
//   const card = document.createElement("div");
//   card.className = "card";
//   card.innerHTML = index;
//   card.style.backgroundColor = getRandomColor();
//   cardContainer.appendChild(card);
// };

// const addCards = (pageIndex) => {
//   currentPage = pageIndex;

//   handleButtonStatus();

//   const startRange = (pageIndex - 1) * cardIncrease;
//   const endRange =
//     pageIndex * cardIncrease > cardLimit ? cardLimit : pageIndex * cardIncrease;
  
//   cardCountElem.innerHTML = endRange;

//   for (let i = startRange + 1; i <= endRange; i++) {
//     createCard(i);
//   }
// };

// window.onload = function () {
//   addCards(currentPage);
//   loadMoreButton.style.backgroundColor = getRandomColor();
//   loadMoreButton.addEventListener("click", () => {
//     addCards(currentPage + 1);
//   });
// };