document.getElementById("saveContactBtn").addEventListener("click", function () {

    const contact = `BEGIN:VCARD
VERSION:3.0
FN:Ritesh Narnaware
TEL;TYPE=CELL:+916266438975
ADR:;;Bhopal;Madhya Pradesh;India
END:VCARD`;

    const blob = new Blob([contact], {
        type: "text/vcard"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Ritesh-Narnaware.vcf";

    link.click();

    URL.revokeObjectURL(url);
});

// SHARE DIGITAL CARD FUNCTION

const shareButton = document.getElementById("shareCardBtn");

if (shareButton) {
    shareButton.addEventListener("click", async function () {

        const cardLink = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Ritesh Narnaware - Digital Visiting Card",
                    text: "Connect with me through my digital visiting card.",
                    url: cardLink
                });
            } catch (error) {
                console.log("Sharing cancelled.");
            }
        } else {
            try {
                await navigator.clipboard.writeText(cardLink);
                alert("Card link copied successfully!");
            } catch (error) {
                alert("Please copy the website link manually.");
            }
        }
    });
}