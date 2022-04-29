let products = [
    {
        name: 'Keyboard',
        price: 12000,
        quantity: 50,
    },
    {
        name: 'Mouse',
        price: 10000,
        quantity: 20,
    },
];

const addProduct = () => {
    let product = {};

    product.name = document.getElementById('name').value;
    product.price = document.getElementById('price').value;
    product.quantity = document.getElementById('quantity').value;

    products.push(product);
    display();

    document.getElementById('name').value = '';
    document.getElementById('price').value = '';
    document.getElementById('quantity').value = '';
};

const deleteProduct = (index) => {
    products.splice(index, 1);
    display();
};

let updateIndex = null;

const setUpdate = (index) => {
    updateIndex = index;

    let product = products[index];

    document.getElementById('update-form').style.opacity = 1;

    document.getElementById('update-name').value = product.name;
    document.getElementById('update-price').value = product.price;
    document.getElementById('update-quantity').value = product.quantity;
};

const updateProduct = () => {
    let product = {};

    product.name = document.getElementById('update-name').value;
    product.price = document.getElementById('update-price').value;
    product.quantity = document.getElementById('update-quantity').value;

    products[updateIndex] = product;

    display();

    document.getElementById('update-name').value = '';
    document.getElementById('update-price').value = '';
    document.getElementById('update-quantity').value = '';

    document.getElementById('update-form').style.opacity = 0;

    updateIndex = null;
};

const display = () => {
    let htmlString = '';

    for (let i = 0; i < products.length; i++) {
        htmlString += `
        <tr>
            <td>${i + 1}</td>
            <td>${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].quantity}</td>
            <td>
                <button onclick='setUpdate(${i})' class="btn update-btn">Update</button>
                <button onclick='deleteProduct(${i})' class="btn delete-btn">Delete</button>
            </td>
        </tr>`;
    }

    document.getElementById('table').innerHTML = htmlString;
};

display();
