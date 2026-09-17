/* =====================================
   CINEBOOK MOVIE BOOKING WEBSITE
===================================== */


/* -----------------------------
   MOVIE SELECTION
----------------------------- */

function selectMovie(movieName) {

    localStorage.setItem(
        "selectedMovie",
        movieName
    );

}


/* -----------------------------
   SHOW TIME SELECTION
----------------------------- */

function selectShow(time) {

    localStorage.setItem(
        "selectedTime",
        time
    );

    window.location.href = "seats.html";

}


/* -----------------------------
   SEAT SELECTION
----------------------------- */

const seats = document.querySelectorAll(".seat");

let selectedSeats = [];

seats.forEach(function (seat) {

    seat.addEventListener("click", function () {

        if (seat.classList.contains("booked")) {
            return;
        }

        seat.classList.toggle("selected");

        const seatNumber = seat.innerText;

        if (seat.classList.contains("selected")) {

            selectedSeats.push(seatNumber);

        } else {

            selectedSeats =
                selectedSeats.filter(
                    function (item) {
                        return item !== seatNumber;
                    }
                );

        }

        updateBookingSummary();

    });

});


function updateBookingSummary() {

    const selectedSeatsElement =
        document.getElementById("selectedSeats");

    const totalAmountElement =
        document.getElementById("totalAmount");


    if (!selectedSeatsElement) {
        return;
    }


    if (selectedSeats.length === 0) {

        selectedSeatsElement.innerText =
            "None";

    } else {

        selectedSeatsElement.innerText =
            selectedSeats.join(", ");

    }


    const pricePerSeat = 180;

    const total =
        selectedSeats.length * pricePerSeat;

    totalAmountElement.innerText =
        total;

}


/* -----------------------------
   PAYMENT PAGE
----------------------------- */

function goToPayment() {

    if (selectedSeats.length === 0) {

        alert("Please select at least one seat.");

        return;

    }

    localStorage.setItem(
        "selectedSeats",
        JSON.stringify(selectedSeats)
    );

    localStorage.setItem(
        "totalAmount",
        selectedSeats.length * 180
    );

    window.location.href =
        "payment.html";

}


/* -----------------------------
   LOAD PAYMENT INFORMATION
----------------------------- */

function loadPaymentData() {

    const movie =
        localStorage.getItem("selectedMovie")
        || "Midnight Chase";


    const time =
        localStorage.getItem("selectedTime")
        || "7:30 PM";


    const seatsData =
        JSON.parse(
            localStorage.getItem("selectedSeats")
            || '["A1","A2"]'
        );


    const amount =
        localStorage.getItem("totalAmount")
        || seatsData.length * 180;


    const movieElement =
        document.getElementById("summaryMovie");

    const timeElement =
        document.getElementById("summaryTime");

    const seatsElement =
        document.getElementById("summarySeats");

    const amountElement =
        document.getElementById("summaryTotal");

    const paymentAmountElement =
        document.getElementById("paymentAmount");


    if (movieElement)
        movieElement.innerText = movie;

    if (timeElement)
        timeElement.innerText = time;

    if (seatsElement)
        seatsElement.innerText =
            seatsData.join(", ");

    if (amountElement)
        amountElement.innerText = amount;

    if (paymentAmountElement)
        paymentAmountElement.innerText = amount;

}


/* -----------------------------
   COMPLETE PAYMENT
----------------------------- */

function completePayment() {

    const cardName =
        document.getElementById("cardName");


    const cardNumber =
        document.getElementById("cardNumber");


    if (
        !cardName ||
        !cardNumber ||
        cardName.value.trim() === "" ||
        cardNumber.value.trim() === ""
    ) {

        alert(
            "Please enter your payment details."
        );

        return;

    }


    const bookingId =
        "CB" +
        Date.now().toString().slice(-8);


    localStorage.setItem(
        "bookingId",
        bookingId
    );


    window.location.href =
        "booking.html";

}


/* -----------------------------
   LOAD CONFIRMATION
----------------------------- */

function loadConfirmation() {

    const movie =
        localStorage.getItem("selectedMovie")
        || "Midnight Chase";


    const time =
        localStorage.getItem("selectedTime")
        || "7:30 PM";


    const seatsData =
        JSON.parse(
            localStorage.getItem("selectedSeats")
            || '["A1","A2"]'
        );


    const amount =
        localStorage.getItem("totalAmount")
        || seatsData.length * 180;


    const bookingId =
        localStorage.getItem("bookingId")
        || "CB20260917";


    const movieElement =
        document.getElementById("confirmMovie");

    const timeElement =
        document.getElementById("confirmTime");

    const seatsElement =
        document.getElementById("confirmSeats");

    const amountElement =
        document.getElementById("confirmAmount");

    const bookingIdElement =
        document.getElementById("bookingId");


    if (movieElement)
        movieElement.innerText = movie;

    if (timeElement)
        timeElement.innerText = time;

    if (seatsElement)
        seatsElement.innerText =
            seatsData.join(", ");

    if (amountElement)
        amountElement.innerText = amount;

    if (bookingIdElement)
        bookingIdElement.innerText =
            bookingId;

}


/* -----------------------------
   MOVIE SEARCH
----------------------------- */

const movieSearch =
    document.getElementById("movieSearch");


const genreFilter =
    document.getElementById("genreFilter");


if (movieSearch) {

    movieSearch.addEventListener(
        "input",
        filterMovies
    );

}


if (genreFilter) {

    genreFilter.addEventListener(
        "change",
        filterMovies
    );

}


function filterMovies() {

    const searchValue =
        movieSearch.value.toLowerCase();

    const genreValue =
        genreFilter.value;


    const movieItems =
        document.querySelectorAll(
            ".movie-item"
        );


    movieItems.forEach(function (movie) {

        const title =
            movie.dataset.title.toLowerCase();

        const genre =
            movie.dataset.genre;


        const matchesSearch =
            title.includes(searchValue);


        const matchesGenre =
            genreValue === "all"
            || genre === genreValue;


        if (
            matchesSearch &&
            matchesGenre
        ) {

            movie.style.display = "block";

        } else {

            movie.style.display = "none";

        }

    });

}


/* -----------------------------
   DATE SELECTION
----------------------------- */

const dates =
    document.querySelectorAll(".date");


dates.forEach(function (date) {

    date.addEventListener(
        "click",
        function () {

            dates.forEach(function (item) {

                item.classList.remove(
                    "active"
                );

            });

            date.classList.add("active");

        }
    );

});


/* -----------------------------
   CARD NUMBER FORMATTING
----------------------------- */

const cardNumber =
    document.getElementById("cardNumber");


if (cardNumber) {

    cardNumber.addEventListener(
        "input",
        function () {

            let value =
                cardNumber.value
                    .replace(/\D/g, "");

            value =
                value.substring(0, 16);

            value =
                value.match(/.{1,4}/g);

            cardNumber.value =
                value
                    ? value.join(" ")
                    : "";

        }
    );

}


/* -----------------------------
   PAGE LOAD
----------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadPaymentData();

        loadConfirmation();

    }
);