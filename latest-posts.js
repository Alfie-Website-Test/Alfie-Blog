fetch('./posts.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Could not load posts');
        }
        return response.json();
    })
    .then(posts => {
        // Sort posts by date, newest first
        posts.sort((a, b) =>
            new Date(b.date) - new Date(a.date)
        );

        // Only display the three latest posts
        const latestPosts = posts.slice(0, 3);

        const container = document.getElementById('latest-posts');
        container.innerHTML = '';

        latestPosts.forEach(post => {
            const article = document.createElement('article');

            const heading = document.createElement('h2');
            heading.textContent = post.title;

            const date = document.createElement('p');
            date.className = 'date';
            date.textContent = post.displayDate;

            const description = document.createElement('p');
            description.textContent = post.description;

            const link = document.createElement('a');
            link.href = post.url;
            link.className = 'read-more';
            link.textContent = 'Read More';

            article.append(heading, date, description, link);
            container.appendChild(article);
        });
    })
    .catch(error => {
        console.error(error);
        document.getElementById('latest-posts').textContent =
            'Sorry, the latest posts could not be loaded.';
    });