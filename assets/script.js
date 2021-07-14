const player = document.getElementsByClassName("player")[0]
const playlist = player.getElementsByClassName("playlist")[0]
const dashboard = player.getElementsByClassName("dashboard")[0]
var currentSong

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
        const htmls = this.songs.map((song, id) => `<div class="song" id="${id}">
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
    handleEvents: function () {
        const cdThumb = dashboard.getElementsByClassName("cd-thumb")[0]
        const currentWidht = cdThumb.offsetWidth
        var cdThumbOpacity = cdThumb.getElementsByClassName("opacity")[0]
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            var cdThumbWidth = currentWidht - scrollTop
            cdThumb.style.height = (cdThumbWidth > 0 ? cdThumbWidth : 0) + "px"
            cdThumbOpacity.style = `background-color: rgba(255, 255, 255, ${1 - cdThumbWidth / currentWidht});`
        }
        const songs = Array.from(playlist.getElementsByClassName("song"))
        songs.map(song => {
            song.addEventListener("click", () => {
                this.unplay(currentSong)
                currentSong = song
                this.play(currentSong)
            })
        })
    },
    play(song) {
        function highlightCurrentSong(song) {
            song.style["background-color"] = "red"
            song.getElementsByClassName("music-name")[0].style.color = "white"
            song.getElementsByClassName("singer")[0].style.color = "white"
            song.getElementsByTagName("i")[0].style.color = "white"
            const cdThumb = dashboard.getElementsByClassName("cd-thumb")[0]
            const musicName = dashboard.getElementsByClassName("music-name")[0]
            musicName.textContent = songs[song.id].name
            cdThumb.style = `background-image: url(${songs[song.id].image}); animation: spin 20s linear infinite;`
            window.scrollTo(0, 0)
        }

        const songs = this.songs
        highlightCurrentSong(song)
        const source = dashboard.getElementsByTagName("source")[0]
    },
    unplay(song) {
        if (typeof song !== "undefined") {
            function unHightlight(song) {
                song.style["background-color"] = "white"
                song.getElementsByClassName("music-name")[0].style.color = "black"
                song.getElementsByClassName("singer")[0].style.color = "black"
                song.getElementsByTagName("i")[0].style.color = "black"
            }

            unHightlight(song)
        }
    },
    start: function () {
        this.render()
        this.handleEvents()
    }
}

app.start()