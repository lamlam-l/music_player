const player = document.getElementsByClassName("player")[0]
const playlist = player.getElementsByClassName("playlist")[0]
const dashboard = player.getElementsByClassName("dashboard")[0]

const app = {
    songs: [
        {
            name: "Unity",
            singer: "Alan Walker",
            path: "./assets/music/unity.mp3",
            image: "./assets/img/alan_walker.jpg",
        },
        {
            name: "Road So Far",
            singer: "TonyZ",
            path: "./assets/music/road_so_far.mp3",
            image: "./assets/img/TonyZ.jpg",
        },
        {
            name: "Legendary",
            singer: "Amadeus",
            path: "./assets/music/legendary.mp3",
            image: "./assets/img/amadeus.jpg",
        },
        {
            name: "Nevada",
            singer: "vicetone",
            path: "./assets/music/nvada.mp3",
            image: "./assets/img/vicetone.jpg",
        },
        {
            name: "Hiding in the blue",
            singer: "The Fat Rat",
            path: "./assets/music/hiding_in_the_blue.mp3",
            image: "./assets/img/thefatrat.jpg",
        },
        {
            name: "Monody",
            singer: "The Fat Rat",
            path: "./assets/music/monody.mp3",
            image: "./assets/img/thefatrat.jpg",
        },
        {
            name: "Run",
            singer: "Murad",
            path: "./assets/music/run.mp3",
            image: "./assets/img/murad.jpg",
        },
        {
            name: "Unity",
            singer: "Alan Walker",
            path: "./assets/music/unity.mp3",
            image: "./assets/img/alan_walker.jpg",
        },
        {
            name: "Road So Far",
            singer: "TonyZ",
            path: "./assets/music/road_so_far.mp3",
            image: "./assets/img/TonyZ.jpg",
        },
        {
            name: "Legendary",
            singer: "Amadeus",
            path: "./assets/music/legendary.mp3",
            image: "./assets/img/amadeus.jpg",
        },
        {
            name: "Nevada",
            singer: "vicetone",
            path: "./assets/music/nvada.mp3",
            image: "./assets/img/vicetone.jpg",
        },
        {
            name: "Hiding in the blue",
            singer: "The Fat Rat",
            path: "./assets/music/hiding_in_the_blue.mp3",
            image: "./assets/img/thefatrat.jpg",
        },
        {
            name: "Monody",
            singer: "The Fat Rat",
            path: "./assets/music/monody.mp3",
            image: "./assets/img/thefatrat.jpg",
        },
        {
            name: "Run",
            singer: "Murad",
            path: "./assets/music/run.mp3",
            image: "./assets/img/murad.jpg",
        },
    ],
    render: function () {
        const htmls = this.songs.map(song => `<div class="song">
                <div class="thumb">
                    <div class="thumb-img" style="background-image: url(${song.image})"></div>
                </div>
                <div class="content">
                    <h2 class="music-name">${song.name}</h2>
                    <p class="singer">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
        `)
        playlist.innerHTML = htmls.join("")
    },
    play(id) {

    },
    handleEvents: function () {
        const cdThumb = dashboard.getElementsByClassName("cd-thumb")[0]
        const currentWidht = cdThumb.offsetWidth
        var cdThumbOpacity = cdThumb.getElementsByClassName("opacity")[0]
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            var cdThumbWidth = currentWidht - scrollTop
            cdThumb.style.height = (cdThumbWidth > 0 ? cdThumbWidth : 0) + "px"
            cdThumbOpacity.style = `background-color: rgba(255, 255, 255, ${1- cdThumbWidth/currentWidht});`
        }
    },
    start: function () {
        this.handleEvents()
        this.render()
    }
}

app.start()