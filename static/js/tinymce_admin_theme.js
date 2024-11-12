// Initialize TinyMCE with the appropriate skin
tinymce.init({
    selector: 'textarea',  // Adjust as needed
    theme: 'silver',
    // skin: 'oxide-dark',
    // content_css: 'dark',
    plugins: 'fullscreen insertdatetime advlist lists wordcount help',
    menubar: false,  // Remove if not needed
    toolbar: "undo redo | blocks | bold italic underline | numlist bullist | fullscreen",
    image_advtab: true,
    branding: false,
    promotion: false,
    block_formats: 'Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3',
});
