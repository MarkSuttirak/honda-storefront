import React, { createContext, useContext, useState } from 'react'
import { useFrappeGetCall, useFrappePostCall } from 'frappe-react-sdk';

const ProductsContext = createContext([])

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [gifts, setGifts] = useState([]);
    const [giftCards, setGiftCards] = useState([]);
    const [newP, setNewP] = useState(null)
    const [userdata, setUserdata] = useState(null);

    useFrappeGetCall('erpnext.e_commerce.api.get_product_filter_data', {
        name: newP,
        query_args: { "field_filters": {}, "attribute_filters": {}, "item_group": null, "start": null, "from_filters": false }
    }, `products-${newP}`, {
        isOnline: () => products.length === 0,
        onSuccess: (data) => setProducts(data.message.items)
    }, true)

    useFrappeGetCall('erpnext.e_commerce.api.get_product_filter_data', {
        query_args: { "field_filters": {}, "attribute_filters": {}, "item_group": "Gift Card", "start": null, "from_filters": false }
    }, `products-gift-cards`, {
        onSuccess: (data) => setGiftCards(data.message.items)
    })

    useFrappeGetCall('erpnext.e_commerce.api.get_product_filter_data', {
        query_args: { "field_filters": {}, "attribute_filters": {}, "item_group": "Gift", "start": null, "from_filters": false }
    }, `products-gifts`, {
        onSuccess: (data) => setGifts(data.message.items)
    })

    var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + getToken());
      var requestOptions = {
        method: 'GET',
        headers: myHeaders
      };
      fetch("https://dev.zaviago.com/api/method/honda_api.api_calls.getuser.get_profile?customer=" + currentUserz, requestOptions)
      .then((response) => response.json()).then((data) => {
        setUserdata(data.message);
      })
      .catch(error => console.log('error', error));

    const get = (name) => {
        // if product is already in the list, return it & refetch it in the background
        const p = products.find((product) => product.name === name)
        // if product is not in the list, return null & fetch it in the background
        if (!p) {
            setNewP(name)
        }
        return p
    }

    const getByItemCode = (itemCode) => {
        // if product is already in the list, return it & refetch it in the background
        const p = products.find((product) => product.item_code === itemCode)
        return p
    }


    return (
        <ProductsContext.Provider value={{ products, setProducts, get, getByItemCode, gifts, giftCards,userdata }}>
            {children}
        </ProductsContext.Provider>
    )
}

export const useProducts = () => useContext(ProductsContext)
