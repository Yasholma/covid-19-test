var menuBtn = document.querySelector(".menu-btn");
var hamburger = document.querySelector(".menu-btn__burger");
var mobileNav = document.querySelector(".nav");
// var navLinks = document.querySelectorAll(".menu-nav__link");
var insertModalBtn = document.querySelector(".nav__btns > a");
var insertDataModal = document.querySelector(".modal");
var modalCloseBtn = document.querySelector(".modal span.close");
var openModalBtn = document.querySelectorAll(".openModal");
// var estimateBtn = document.getElementById("estimate-btn");
// var dataForm = document.querySelector("#data-form");


menuBtn.addEventListener("click", toggleMenu);
// navLinks.forEach(link => link.addEventListener("click", closeMenu));
insertModalBtn.addEventListener("click", openInsertModal);
openModalBtn.forEach(btn => btn.addEventListener("click", openModal));
modalCloseBtn.addEventListener("click", closeModal);
// estimateBtn.addEventListener("click", estimate)


var validateFields = (...fields) => fields.every(field => field.value.trim() !== "");
var clearFields = (...fields) => fields.forEach(field => field.value === "");

// Form Handling
function estimate(e) {
    e.preventDefault()
    var population = document.getElementById("population");
    var timeElapse = document.getElementById("time-elapse");
    var reportedCases = document.getElementById("reported-cases");
    var totalHospitalBeds = document.getElementById("total-hospital-beds");
    var periodType = document.getElementById("period-type");
    let checkFields = validateFields(population, timeElapse, reportedCases, totalHospitalBeds, periodType);
    var data = {
        region: {
            name: 'Africa',
            avgAge: 19.7,
            avgDailyIncomeInUSD: 5,
            avgDailyIncomePopulation: 0.71
        }
    }
    if (checkFields) {
        data.population = population.value,
            data.timeElapse = timeElapse.value,
            data.reportedCases = reportedCases.value,
            data.totalHospitalBeds = totalHospitalBeds.value,
            data.periodType = periodType.value
        if (estimator(data)) {
            dataForm.reset();
            alert("Successfully inserted.");
        } else {
            alert("An error occured. Try again");
        }
    } else {
        alert("All fields are required.");
    }
}

function estimator(data) {
    return data && true;
}

// Callbacks
let showMenu = false;
function toggleMenu(event) {
    if (!showMenu) {
        hamburger.classList.add("open");
        mobileNav.classList.add("open");
        mobileNav.classList.add("mobile");
        showMenu = true;
    } else {
        hamburger.classList.remove("open");
        mobileNav.classList.remove("open");
        mobileNav.classList.remove("mobile");
        showMenu = false;
    }
}

function closeMenu() {
    if (mobileNav.classList.contains("mobile")) {
        mobileNav.classList.remove("open");
        mobileNav.classList.remove("mobile");
        hamburger.classList.remove("open");
        showMenu = false;
    }
}

function closeModal(e) {
    e.preventDefault();
    insertDataModal.classList.remove("open");
}

function openModal() {
    insertDataModal.classList.add("open");
}

function openInsertModal(event) {
    event.preventDefault();
    closeMenu();
    openModal()
}