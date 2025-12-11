document.getElementById("btnScan").addEventListener("click", async () => {
    if ("NDEFReader" in window) {
        try {
            const reader = new NDEFReader();
            await reader.scan();

            alert("Tempelkan kartu NFC ke perangkat!");

            reader.onreading = event => {
                const decoder = new TextDecoder();
                let text = "";

                for (const record of event.message.records) {
                    if (record.recordType === "text") {
                        text += decoder.decode(record.data);
                    }
                }

                alert("Data NFC terbaca:\n" + text);
            };

        } catch (err) {
            alert("Gagal memindai NFC:\n" + err);
        }
    } else {
        alert("Browser kamu tidak mendukung NFC API!");
    }
});
