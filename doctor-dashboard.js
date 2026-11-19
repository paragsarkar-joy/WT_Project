
let appointments = JSON.parse(
    localStorage.getItem("appointments")
) || [];

let appointmentList = document.getElementById("doctorAppointmentList");

function displayAppointments() {

    appointmentList.innerHTML = "";

    document.getElementById("totalAppointments").textContent =
        appointments.length;

    if (appointments.length === 0) {
        appointmentList.innerHTML =
            '<tr><td colspan="7">No appointments found.</td></tr>';
        return;
    }

    appointments.forEach(function(appointment, index) {

        let row = document.createElement("tr");

        let values = [
            appointment.department,
            appointment.doctor,
            appointment.date,
            appointment.time,
            appointment.reason,
            appointment.status || "Pending"
        ];

        values.forEach(function(value) {

            let cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);

        });

        let actionCell = document.createElement("td");

        let select = document.createElement("select");
        select.className = "status-select";

        let statuses = [
            "Pending",
            "Approved",
            "Completed",
            "Cancelled"
        ];

        statuses.forEach(function(status) {

            let option = document.createElement("option");
            option.value = status;
            option.textContent = status;

            if ((appointment.status || "Pending") === status) {
                option.selected = true;
            }

            select.appendChild(option);

        });

        select.addEventListener("change", function() {

            appointments[index].status = select.value;

            localStorage.setItem(
                "appointments",
                JSON.stringify(appointments)
            );

            displayAppointments();

        });

        actionCell.appendChild(select);
        row.appendChild(actionCell);

        appointmentList.appendChild(row);

    });
}

function goDashboard() {
    window.location.href = "dashboard.html";
}

displayAppointments();
