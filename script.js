
const searchBar = document.querySelector('input');
const searchBtn = document.querySelector('.btn');
const body = document.querySelector('.row');
const badges = document.querySelectorAll('.badge');

let apiKey = ``

let lastClicked;

for (let i = 0; i < badges.length; i++) {
    let badgeInner = badges[i].innerText;

    badges[i].addEventListener('click', async() => {
        if (lastClicked) {
            lastClicked.classList.remove('active');
        };
        lastClicked = badges[i]
        badges[i].classList.add('active');
        try {
            let apiUrl = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${badgeInner}&type=video&maxResults=20&videoDuration=medium`);
            response = await getInfo(apiUrl);
            console.log(response);
            displayVideo(response)
        } catch(e) {
        console.log(e);
        };    
    })
};




const searchVideo = async() => {
    if (lastClicked) {
            lastClicked.classList.remove('active');
        };
    let search = searchBar.value;
    try {
        let apiUrl = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&q=${search}&type=video&maxResults=20&videoDuration=medium`);
        response = await getInfo(apiUrl);
        displayVideo(response)
    } catch(e) {
        console.log(e);
    };    
};




function displayVideo(videos) {
    
    body.innerHTML = '';
    videos.items.forEach(video => {
        let column = document.createElement('div');
        column.classList.add('col-xl-4', 'col-lg-6', 'col-12', 'text-center');
        let element = document.createElement('iframe');
        element.classList.add('iframe')
        element.width = 400;
        element.height = 225;
        element.src = `https://www.youtube.com/embed/${video.id.videoId}`;
        element.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
        element.setAttribute('allowfullscreen', 'true');
        column.appendChild(element);
        body.appendChild(column)
    });
}


const getInfo = async(res) => {
    const data = await res.json();
    return data;
}


searchBtn.addEventListener('click', searchVideo)