function copyToClipboard(element, text) {
    // 1. Haken hinzufügen
    var originalText = element.innerHTML;
    element.innerHTML = "&check; iCloud Link kopiert"; // Haken anzeigen

    // 2. Kopieren des Textes in die Zwischenablage
    var tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // 3. Sound abspielen
    var sound = document.getElementById("copySound");
    sound.play();

    // 4. Haken nach 2 Sekunden wieder entfernen und Dropdown-Menü schließen
    setTimeout(function() {
        element.innerHTML = originalText; // Zurück zum Originaltext

        // Dropdown-Menü ausblenden, aber für erneutes Hover wieder anzeigen können
        var dropdownContent = element.closest('.dropdown-content');
        if (dropdownContent) {
            dropdownContent.classList.remove("show");
        }
    }, 2000);
}
