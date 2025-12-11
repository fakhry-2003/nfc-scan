document.getElementById("btnScan").addEventListener("click", async () => {

    // Cek apakah browser mendukung NFC
    if (!("NDEFReader" in window)) {
        alert("Browser kamu tidak mendukung NFC Web API!");
        return;
    }

    try {
        const reader = new NDEFReader();
        await reader.scan();

        alert("Tempelkan kartu NFC ke belakang HP...");

        reader.onreading = event => {
            const decoder = new TextDecoder();
            let hasil = "";

            for (const record of event.message.records) {
                if (record.recordType === "text") {
                    hasil += decoder.decode(record.data);
                }
            }

            if (hasil.trim() === "") {
                alert("Kartu terbaca tapi tidak ada data teks.");
            } else {
                alert("Data NFC Terbaca:\n\n" + hasil);
            }
        };

    } catch (err) {
        alert("Gagal memindai NFC:\n" + err);
    }
});
