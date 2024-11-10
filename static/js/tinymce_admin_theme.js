document.addEventListener('DOMContentLoaded', function () {
    function initTinyMCE(isDarkMode) {
        // Remove any existing TinyMCE instance to prevent duplication
        if (tinymce.activeEditor) {
            tinymce.remove();
        }

        // Initialize TinyMCE with the appropriate skin
        tinymce.init({
            skin: isDarkMode ? 'oxide-dark' : 'oxide',
            content_css: isDarkMode ? 'dark' : 'default',
            'promotion': false,
            'branding': false,
            selector: 'textarea',  // Replace with your specific selector if needed
            plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
            menubar: 'file edit view insert format tools table help',
            toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample | ltr rtl",
            autosave_ask_before_unload: true,
            autosave_interval: '30s',
            autosave_prefix: '{path}{query}-{id}-',
            autosave_restore_when_empty: false,
            autosave_retention: '2m',
            image_advtab: true,
            height: 300,
            max_width: 800,
            image_caption: true,
            quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
            noneditable_class: 'mceNonEditable',
            toolbar_mode: 'sliding',
            contextmenu: 'link image table',
            templates: [
                { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
                { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
                { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
                ],
                template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
                template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        })

    }
    // Initial check for the data-theme attribute or system preference
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' ||
        (document.documentElement.getAttribute('data-theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    initTinyMCE(isDarkMode);

    // Mutation observer to detect theme changes in the admin panel
    const observer = new MutationObserver(() => {
        const isNowDarkMode = document.documentElement.getAttribute('data-theme') === 'dark' ||
            (document.documentElement.getAttribute('data-theme') === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        console.log('Theme change detected:', isNowDarkMode ? 'Dark mode' : 'Light mode');
        initTinyMCE(isNowDarkMode);
    });

    // Start observing the <html> element for changes in the data-theme attribute
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Listen for system color scheme changes when in auto mode
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (document.documentElement.getAttribute('data-theme') === 'auto') {
            const isSystemDarkMode = e.matches;
            console.log('System color scheme changed:', isSystemDarkMode ? 'Dark mode' : 'Light mode');
            initTinyMCE(isSystemDarkMode);
        }
    });
});
