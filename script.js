function generateWebsite() {
    const prompt = document.getElementById('promptInput').value;

    if (prompt) {
        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        })
        .then(response => response.json())
        .then(data => {
            const generatedURL = data.url;
            document.getElementById('result').innerHTML = `
                <p>Website berhasil dibuat! Akses di <a href="${generatedURL}" target="_blank">${generatedURL}</a></p>
            `;
        })
        .catch(error => console.error('Error:', error));
    } else {
        document.getElementById('result').innerHTML = `<p>Masukkan prompt terlebih dahulu!</p>`;
    }
}
