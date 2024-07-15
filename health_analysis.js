const addPatientButton = document.getElementById("addPatient");
const reportDiv = document.getElementById("report");
const btnSearch = document.getElementById('btnSearch');

const patients = []; // to store the collected patient data


function addPatient() {
    // capture user-entered data from the form
    const name = document.getElementById("name").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const condition = document.getElementById("condition").value;

    // add patient details to patients[]
    if (name && gender && age && condition) {
        patients.push({ name, gender: gender.value, age, condition });
        // reset the form fields
        resetForm();
        // update and display a report based on the newly added patient data
        generateReport();
    }
}

function resetForm() {
    // clear name, gender, age and condition fields
    document.getElementById("name").value = "";
    document.querySelector('input[name="gender"]:checked').checked = false;
    document.getElementById("age").value = "";
    document.getElementById("condition").value = "";
}

function generateReport() {

    // calculate and construct a report based on data in patients[]

    // total number of patients
    const numPatients = patients.length;
    // object storing counters for every condition
    const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
    };
    // nested object storing nbr of conditions for every gender
    const genderCongitionsCount = {
        Male: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
        Female: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
    };


    // iterate throught the patients[] and increment the counters
    for (const patient of patients) {
        conditionsCount[patient.condition]++;
        genderCongitionsCount[patient.gender][patient.condition]++;
    }

    // dynamically update the report element
    reportDiv.innerHTML = `Number of patients = ${numPatients}<br/><br/>`;
    reportDiv.innerHTML += `Conditions Breakdown:<br>`;

    for (const condition in conditionsCount) {
        reportDiv.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    reportDiv.innerHTML += `<br>Gender-Based Conditions: <br>`;
    for (const gender in genderCongitionsCount) {
        reportDiv.innerHTML += `${gender}:<br>`;
        for (const condition in genderCongitionsCount[gender]) {
            reportDiv.innerHTML += `&nbsp;&nbsp;${condition}: ${genderCongitionsCount[gender][condition]}<br>`;
        }
    }

}

// adding an event listener for the "Add Patient" button
addPatientButton.addEventListener("click", addPatient);