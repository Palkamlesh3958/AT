'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

let map, mapEvent;

if(navigator.geolocation){

    navigator.geolocation.getCurrentPosition(
        function(position){
            const { latitude } = position.coords;
            const { longitude } = position.coords;
            console.log(`https://www.google.pt/maps@${latitude},${longitude}`);

            //Display default location 
            const coords = [latitude, longitude]

            map = L.map('map').setView(coords, 13);  //Leaflet namespce L
            //console.log(map);

            L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
    
            //Displaying marker
            // L.marker(coords)
            // .addTo(map)
            // .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            // .openPopup();


            // Handling clicks on map
            map.on('click', function(mapE) {
                mapEvent = mapE;
                form.classList.remove('hidden');
                inputDistance.focus();
                
                
            //     console.log(mapEvent);
            //     const {lat, lng} = mapEvent.latlng;

            //     L.marker([lat, lng])
            //     .addTo(map)
            //     .bindPopup(L.popup({
            //                 maxWidth:250, 
            //                 minWidth:100, 
            //                 autoClose:false, 
            //                 closeOnClick:false, 
            //                 className:'running-popup'
            //                 })
            //             )

            //     .setPopupContent('Workout')
            //     .openPopup();
            // });
        });
    }, 
        
    function (error) {
            alert("Could not get your location");
            console.log(error);
        }
    );
    
}   
//form submission
form.addEventListener('submit', function(e){
        e.preventDefault();

        //Clear input fields


        //Display marker on map with event
            console.log(mapEvent);
            const {lat, lng} = mapEvent.latlng;
            L.marker([lat, lng])
                .addTo(map)
                .bindPopup(
                    L.popup({
                        maxWidth:250, 
                        minWidth:100, 
                        autoClose:false, 
                        closeOnClick:false, 
                        className:'running-popup'
                    })
                )

                .setPopupContent('Workout')
                .openPopup();
});


//Creating toggle between elevation and cadence
inputType.addEventListener('change', function(){
    inputElevation.closest('.form__row').classList.toggle('form__row__hidden')
    inputCadence.closest('.form__row').classList.toggle('form__row__hidden')
});