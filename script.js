const scriptURL = 'https://script.google.com/macros/s/AKfycbzUfIU-nEYLJcaSuba0a4oVSbaY9_Dvsj0NtPfKGw4XfMVeOcZmHWZv2b_4hp92kh3H/exec';

function submitForm() {
    const nama = document.getElementById('nama').value;
    const nim = document.getElementById('nim').value;
    const kelas = document.getElementById('kelas').value;
    const sekolah = document.getElementById('sekolah').value;

    if (!nama || !nim || !kelas || !sekolah) {
        alert('Semua kolom harus diisi!');
        return;
    }

    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ nama, nim, kelas, sekolah }),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.text())
        .then(data => {
            if (data === "SEKOLAH_SUDAH_DIPILIH") {
                alert('Sekolah ini sudah dipilih orang lain!');
            } else {
                alert('Data berhasil dikirim!');
                loadData();
            }
        })
        .catch(error => console.error('Error!', error));
}

function loadData() {
    fetch(scriptURL)
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('dataTable');
            table.innerHTML = '';
            data.forEach(row => {
                const tr = `<tr>
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
                <td>${row[3]}</td>
                <td>${new Date(row[4]).toLocaleString()}</td>
            </tr>`;
                table.innerHTML += tr;
            });
        });
}

window.onload = loadData;
