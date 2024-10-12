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


class HoverButton {
    constructor(el) {
        this.el = el;
        this.hover = false;
        this.calculatePosition();
        this.attachEventsListener();
    }

    attachEventsListener() {
        window.addEventListener('mousemove', e => this.onMouseMove(e));
        window.addEventListener('resize', e => this.calculatePosition(e));
    }

    calculatePosition() {
        const box = this.el.getBoundingClientRect();
        this.x = box.left + (box.width * 0.5);
        this.y = box.top + (box.height * 0.5);
        this.width = box.width;
        this.height = box.height;
    }

    onMouseMove(e) {
        let hover = false;
        let hoverArea = 0.5; // Ein kleinerer Bereich für das Hover-Attract
        let x = e.clientX - this.x;
        let y = e.clientY - this.y;
        let distance = Math.sqrt(x * x + y * y);

        if (distance < (this.width * hoverArea)) {
            hover = true;
            if (!this.hover) {
                this.hover = true;
            }
            this.onHover(e.clientX, e.clientY);
        }

        if (!hover && this.hover) {
            this.onLeave();
            this.hover = false;
        }
    }

    onHover(x, y) {
        const offset = 30;
        gsap.to(this.el, {
            x: (x - this.x) * 0.4, // Reduziere die Anziehungskraft
            y: (y - this.y) * 0.4,
            scale: 1.1,
            ease: 'power2.out',
            duration: 0.4
        });
        this.el.style.zIndex = 10;
    }

    onLeave() {
        gsap.to(this.el, {
            x: 0,
            y: 0,
            scale: 1,
            ease: 'elastic.out(1.2, 0.4)',
            duration: 0.7
        });
        this.el.style.zIndex = 1;
    }
}

// Hole alle Hover-Buttons in der Dropdown-Klasse
const hoverButtons = document.querySelectorAll('.dropdown .hover-button');
hoverButtons.forEach(button => {
    new HoverButton(button);
});
