// export const addProduct = (formData) => {
//   return fetch(
//     `https://petswonder.co.in/petswonder/api/productUpload/saveProduct?title=${formData.title}&sellerNumber=&description=${formData.description}&price=${formData.price}&discount=${formData.discount}&inventory=${formData.inventory}&species=${formData.species}&category=${formData.category}&productId=${formData.productId}&plusPoints=${formData.plusPoints}&brand=${formData.brand}`,
//     {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     }
//   )
//     .then((response) => {
//       return response.json();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

export const getOrders = () => {
  return fetch(
      `https://petswonder.co.in/petswonder/api/saveOrder/getOrdersDetails`, {
        method: 'POST',
      }
    )
    .then((response) => {
      console.log(response)
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteOrder = (id) => {
  return fetch(
      `https://petswonder.co.in/petswonder/api/saveOrder/deleteOrder?id=${id}`, {
        method: 'POST',
      }
    )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateStats = (id, stats) => {
  console.log(stats);
  return fetch(
      `https://petswonder.co.in/petswonder/api/saveOrder/changeOrderStatus?id=${id}&orderStatus=${stats}`, {
        method: 'POST',
      }
    )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProductById = (id) => {
  return fetch(
      `https://petswonder.co.in/petswonder/api/productUpload/findProductById?id=${id}`, {
        method: 'POST',
      }
    )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const editProductById = (formData) => {
  return fetch(
      `https://petswonder.co.in/petswonder/api/productUpload/editProduct`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    )
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProduct = (formData) => {
  return fetch(`https://petswonder.co.in/petswonder/api/productUpload/delete`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};