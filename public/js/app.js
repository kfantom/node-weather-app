const weatherFrom = document.querySelector('form');
const searchAddress = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    message1.textContent = 'Loading the data ...'
    const url = 'http://localhost:3000/weather?address=' + searchAddress.value;
    fetch(url).then(response => {
        response.json().then(data => {
            // console.log(data);
            if (data.error) {
                message1.textContent = data.error;
                message2.textContent = '';
                // console.log(data.error);
            } else {
                // const {forecast, location, address, latitude, longitude} = data;
                // console.log(data);
                message1.textContent = 'Location : ' + data.location;
                message2.textContent = 'forecast : ' + data.forecast;
            }
        });
    });
});