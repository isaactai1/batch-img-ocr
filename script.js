$(document).ready(function () {
    /**
     * Represents a DataTable object for displaying OCR results.
     *
     * @type {DataTable}
     */
    const table = $('#results-table').DataTable({
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'csvHtml5',
                text: 'Download CSV',
                title: 'OCR Results',
                charset: 'utf-8',
                bom: true, // Ensure the Byte Order Mark is added for UTF-8
                exportOptions: {
                    format: {
                        body: function (data, row, column, node) {
                            // Perform any additional data manipulation here if necessary
                            return data;
                        }
                    }
                }
            }
        ]
    });
    let filesToProcess = [];

    function displayFiles(files) {
        const fileCount = files.length; // Get the number of files
        $('#file-list').empty(); // Clear any existing entries
        $('#file-list').append(`<p>Total files uploaded: ${fileCount}</p>`); // Display the number of files
        filesToProcess = files; // Store files to process later
    }

    $('#drop-area').on('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).addClass('hover');
    });

    $('#drop-area').on('dragleave', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('hover');
    });

    $('#drop-area').on('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        $(this).removeClass('hover');
        let dt = e.originalEvent.dataTransfer;
        let files = dt.files;
        displayFiles(files);
    });

    $('#image-input').on('change', function () {
        displayFiles(this.files);
    });

    $('#process-images').click(async function () {
        if (!filesToProcess.length) {
            alert('No files uploaded!');
            return;
        }
        const selectedLanguages = $('input[type="checkbox"]:checked').map(function () {
            return this.value;
        }).get().join('+');
        const progressBar = $('#progress-bar');
        const fileStatus = $('#file-status');
        let progressArray = new Array(filesToProcess.length).fill(0);

        progressBar.css('width', '0%').attr('aria-valuenow', 0).text('0%');
        fileStatus.text('Starting processing...');

        for (let index = 0; index < filesToProcess.length; index++) {
            const file = filesToProcess[index];
            fileStatus.text(`Processing file ${index + 1} of ${filesToProcess.length}`);

            await Tesseract.recognize(
                file,
                selectedLanguages,
                {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            progressArray[index] = m.progress;
                            const totalProgress = progressArray.reduce((acc, cur) => acc + cur, 0) / filesToProcess.length;
                            const formattedProgress = (totalProgress * 100).toFixed(2);
                            progressBar.css('width', formattedProgress + '%').attr('aria-valuenow', formattedProgress).text(formattedProgress + '%');
                        }
                    }
                }
            ).then(({ data: { text } }) => {
                table.row.add([file.name, text]).draw(false);
                progressArray[index] = 1; // Mark this file's progress as complete
                const totalProgress = progressArray.reduce((acc, cur) => acc + cur, 0) / filesToProcess.length;
                const formattedProgress = (totalProgress * 100).toFixed(2);
                progressBar.css('width', formattedProgress + '%').attr('aria-valuenow', formattedProgress).text(formattedProgress + '%');
                if (index === filesToProcess.length - 1) {
                    fileStatus.text('Processing complete');
                }
            });
        }
    });
});
