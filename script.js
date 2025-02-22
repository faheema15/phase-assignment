const images = document.querySelectorAll(".bg-image");
const text = document.querySelector(".main-text");
const rectangles = {
    "img1": ["rect2", "rect3", "rect4"],
    "img2": ["rect1", "rect3", "rect4"],
    "img3": ["rect1", "rect2", "rect4"],
    "img4": ["rect1", "rect2", "rect3"]
};

// Handle image hover effect
images.forEach((image) => {
    let animationFrameId;

    image.addEventListener("mousemove", (e) => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

        animationFrameId = requestAnimationFrame(() => {
            const rect = image.getBoundingClientRect();
            const offsetX = e.clientX - (rect.left + rect.width / 2);
            const offsetY = e.clientY - (rect.top + rect.height / 2);

            const moveX = (offsetX / (rect.width / 2)) * (offsetX > 0 ? parseInt(image.dataset.right) : parseInt(image.dataset.left));
            const moveY = (offsetY / (rect.height / 2)) * (offsetY > 0 ? parseInt(image.dataset.down) : parseInt(image.dataset.up));

            image.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    image.addEventListener("mouseenter", () => {
        // Hide other img
        images.forEach((img) => {
            if (img !== image) {
                img.style.opacity = "0";
                img.style.border = "2px solid white";
                img.style.width = "350px";
                img.style.height = "190px";
                img.style.display = "inline-block";
            }
        });

        // Apply text stroke 
        text.style.color = "transparent";
        text.style.webkitTextStroke = "1px #6a6868a3";

        document.querySelectorAll(".image-container").forEach(rect => rect.style.display = "none");

        // Show rect based on img hovered
        const imgKey = image.dataset.img;
        if (rectangles[imgKey]) {
            rectangles[imgKey].forEach(rectClass => {
                document.querySelector("." + rectClass).style.display = "block";
            });
        }
    });

    // reset after hover ends
    image.addEventListener("mouseleave", () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        image.style.transform = "translate(0, 0)";
        
        images.forEach((img) => {
            img.style.opacity = "1";
            img.style.border = "none";
        });

        text.style.color = "white";
        text.style.webkitTextStroke = "";

        document.querySelectorAll(".image-container").forEach(rect => rect.style.display = "none");
    });
});
