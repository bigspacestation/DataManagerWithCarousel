let records = JSON.parse(localStorage.getItem('records')) || [];
let table;

$(document).ready(function() {
    initializeDataTable();
    $('#recordForm').submit(handleFormSubmit);
});

function initializeDataTable() {
    table = $('#recordsTable').DataTable({
        data: records,
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'email' },
            { 
                data: 'image',
                render: function(data) {
                    return data ? `<img src="${data}" class="table-image" alt="Record Image">` : '';
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    return `
                        <button class="btn btn-sm btn-info" onclick="editRecord(${row.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteRecord(${row.id})">
                            <i class="fas fa-trash-alt"></i> Delete
                        </button>
                    `;
                }
            }
        ]
    });
}

function handleFormSubmit(e) {
    e.preventDefault();
    const id = $('#recordId').val();
    const name = $('#name').val();
    const email = $('#email').val();
    const imageFile = $('#image')[0].files[0];

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            saveRecord(id, name, email, event.target.result);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveRecord(id, name, email);
    }
}

function saveRecord(id, name, email, image) {
    if (id) {
        // Update existing record
        const index = records.findIndex(r => r.id == id);
        records[index] = { id, name, email, image: image || records[index].image };
    } else {
        // Add new record
        const newId = records.length > 0 ? Math.max(...records.map(r => r.id)) + 1 : 1;
        records.push({ id: newId, name, email, image });
    }

    localStorage.setItem('records', JSON.stringify(records));
    updateTable();
    resetForm();
}

function editRecord(id) {
    const record = records.find(r => r.id == id);
    if (record) {
        $('#recordId').val(record.id);
        $('#name').val(record.name);
        $('#email').val(record.email);
    }
}

function deleteRecord(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        records = records.filter(r => r.id != id);
        localStorage.setItem('records', JSON.stringify(records));
        updateTable();
    }
}

function resetForm() {
    $('#recordForm')[0].reset();
    $('#recordId').val('');
}

function updateTable() {
    table.clear();
    table.rows.add(records);
    table.draw();
}
