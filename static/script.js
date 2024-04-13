window.onload = function() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    var isDrawing = false;
    var lastX = 0;
    var lastY = 0;
    var penColor = 'black'; // Default pen color
    var penSize = 2; // Default pen size

    canvas.addEventListener('mousedown', function(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', function(e) {
        if (isDrawing) {
            var x = e.offsetX;
            var y = e.offsetY;

            context.beginPath();
            context.moveTo(lastX, lastY);
            context.lineTo(x, y);
            context.strokeStyle = penColor;
            context.lineWidth = penSize;
            context.stroke();
            [lastX, lastY] = [x, y];
        }
    });

    canvas.addEventListener('mouseup', function() {
        isDrawing = false;
    });

    document.getElementById('saveBtn').addEventListener('click', function() {
        var image = canvas.toDataURL('image/png');
        saveImage(image);
    });

    document.getElementById('colorPicker').addEventListener('change', function() {
        penColor = this.value;
    });

    document.getElementById('sizeRange').addEventListener('change', function() {
        penSize = parseInt(this.value);
    });

    function saveImage(image) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', '/save_image', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    console.log('Image saved successfully!');
                } else {
                    console.error('Failed to save image.');
                }
            }
        };
        xhr.send(JSON.stringify({ image: image }));
    }
};
