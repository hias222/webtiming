global.fetch = require("node-fetch");

const sendHeat = (jsondaata) => {
    console.log("sendheat to api/heat/add")

    fetch('http://localhost:3000/api/heat/add', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsondaata),
    })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

exports.sendHeat = sendHeat;