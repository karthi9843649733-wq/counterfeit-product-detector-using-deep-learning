const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const form = document.getElementById("upload-form");
const predictionText = document.getElementById("prediction");
const confidenceText = document.getElementById("confidence");

// Image preview
imageInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        previewImage.style.display = "block";
        previewImage.src = URL.createObjectURL(file);
    }
});

// Send image to backend
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", imageInput.files[0]);

    predictionText.innerText = "Checking...";
    confidenceText.innerText = "";

    const response = await fetch("/predict", {
        method: "POST",
        body: formData
    });

    const data = await response.json();

    predictionText.innerText = "Result: " + data.result;
    confidenceText.innerText = "Confidence: " + data.confidence;
});
