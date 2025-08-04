fetch('/src/components/progress/progress.html')
    .then(res => res.text())
    .then(html => {
        document.body.innerHTML += html;
    });