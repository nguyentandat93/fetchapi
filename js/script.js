
const searchButton = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchNews");
const boxNews = document.getElementById("boxNews");

const apiKey = 'dd3a532e728b2f7237433c8c77a22b8c';
let topHeadlines = `https://gnews.io/api/v4/top-headlines?lang=en&token=${apiKey}`;

fetch(topHeadlines)
.then(res => res.json())
.then(data => {
    data.articles.forEach(article => {
        let temp =`
            <div class="col-md-12 col-lg-3 col-xs-12 col-sm-12 my-3">
                <img class="img-fluid" src="${article.image}" alt="${article.title}">
            </div>
            <div class="col-md-12 col-lg-9 col-xs-12 col-sm-12 my-3">
                <h2>
                    <a href="${article.url}" target="_blank">${article.title}</a>
                </h2>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank">${article.title}</a>
            </div>
        `;
        boxNews.innerHTML += temp;
    });
});


searchButton.addEventListener("click", function(e){
    e.preventDefault();
    boxNews.innerHTML = "";
    let url =`https://gnews.io/api/v4/search?lang=en&q=${searchInput.value}&token=${apiKey}`;
    if(searchInput.value) {
        fetch(url)
        .then(res => {
            if(!res.ok) {
                throw res.statusText + "__" + res.url;
            } 
            return res.json();
        })
        .then(data => {
            data.articles.forEach(article => {
                let temp =`
                    <div class="col-md-12 col-lg-3 col-xs-12 col-sm-12 my-3">
                        <img class="img-fluid" src="${article.image}" alt="${article.title}">
                    </div>
                    <div class="col-md-12 col-lg-9 col-xs-12 col-sm-12 my-3">
                        <h2>
                            <a href="${article.url}" target="_blank">${article.title}</a>
                        </h2>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">${article.title}</a>
                    </div>
                `;
                boxNews.innerHTML += temp;
            });
        })
        .catch(err => {
            console.log(err);
        })
    } else {
        alert("Please fill out something!  🙂 ");
    }
});
