const apiKey = process.env.NEWS_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNews() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayNews(data.articles);
  } catch (error) {
    console.error('There was an error!', error);
  }
}

function displayNews(articles) {
  const newsDiv = document.querySelector('#news');
  let i = 0;
  for (const article of articles) {
    if (articles[i].title !== "[Removed]" && articles[i].urlToImage !== null) {
      const articleDiv = document.createElement('div');
      articleDiv.className = 'articles';
      const articleUrl = articles[i].url;
      articleDiv.addEventListener('click', function () {
        window.location.href = articleUrl;
      })

      const title = document.createElement('h3');
      title.textContent = article.title;

      const image = document.createElement('img')
      image.src = article.urlToImage;
      image.width = 300;

      const sum = document.createElement('p');
      sum.textContent = article.description;

      articleDiv.appendChild(title);
      articleDiv.appendChild(image);
      articleDiv.appendChild(sum);

      newsDiv.appendChild(articleDiv)
    }
    i++
  }
}
fetchNews();