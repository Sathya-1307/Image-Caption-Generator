const dropArea = document.getElementById("drop-area");
const fileElem = document.getElementById("fileElem");
const preview = document.getElementById("preview");
const captionDiv = document.getElementById("caption");

dropArea.addEventListener("click", () => fileElem.click());

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("hover");
});

dropArea.addEventListener("dragleave", () => dropArea.classList.remove("hover"));

dropArea.addEventListener("drop", (e) => {
    e.preventDefault();
    dropArea.classList.remove("hover");
    const files = e.dataTransfer.files;
    handleFiles(files);
});

fileElem.addEventListener("change", () => handleFiles(fileElem.files));

function handleFiles(files) {
    if (files.length === 0) return;
    const file = files[0];
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";

    const formData = new FormData();
    formData.append("image", file);

    fetch("/upload", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        captionDiv.innerText = data.caption;
    })
    .catch(error => {
        captionDiv.innerText = "Error generating caption.";
        console.error(error);
    });
}
