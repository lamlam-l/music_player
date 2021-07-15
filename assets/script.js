const player = document.getElementsByClassName("player")[0]
const playlist = player.getElementsByClassName("playlist")[0]
const dashboard = player.getElementsByClassName("dashboard")[0]
var currentSong
var pause
const audio = document.getElementById("audio")
const audioSource = document.getElementsByTagName("source")[0]
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
            path: "./assets/music/nevada.mp3",
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
            path: "./assets/music/nevada.mp3",
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

    action: {
        status(message) {
            dashboard.getElementsByTagName("p")[0].textContent = message
        },
        roateThumbail() {
            dashboard.getElementsByClassName("cd-thumb")[0].style.animation = "spin 20s linear infinite"
        },
        stopThumbail() {
            dashboard.getElementsByClassName("cd-thumb")[0].style.animation = ""
        }
    },

    render() {
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

    handleEvents() {
        //scroll
        const cdThumb = dashboard.getElementsByClassName("cd-thumb")[0]
        const currentWidht = cdThumb.offsetWidth
        var cdThumbOpacity = cdThumb.getElementsByClassName("opacity")[0]
        document.onscroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            var cdThumbWidth = currentWidht - scrollTop
            cdThumb.style.height = (cdThumbWidth > 0 ? cdThumbWidth : 0) + "px"
            cdThumbOpacity.style = `background-color: rgba(255, 255, 255, ${1 - cdThumbWidth / currentWidht});`
        }
        //chuyển bài
        const songs = Array.from(playlist.getElementsByClassName("song"))
        songs.map(song => {
            song.addEventListener("click", () => {
                this.unplay(currentSong)
                currentSong = song
                this.play(currentSong)
            })
        })
        //play/pause button
        const playBtn = dashboard.getElementsByClassName("btn-play")[0]
        playBtn.addEventListener("click", () => {
            if (pause) {
                this.playAudio()
                pause = false
                this.action.roateThumbail()
                this.action.status("playing")
                dashboard.querySelector(".player .dashboard .control .btn-play i").classList = ["fas fa-pause"]
            } else {
                this.pauseAudio()
                pause = true
                this.action.stopThumbail()
                this.action.status("pause")
                dashboard.querySelector(".player .dashboard .control .btn-play i").classList = ["fas fa-play"]
            }
        })
        //next, previous
        const previousBtn = dashboard.getElementsByClassName("btn-previous")[0]
        previousBtn.addEventListener("click", () => {
            if (typeof currentSong !== "undefined" && currentSong.id > 0) {
                this.unplay(currentSong)
                currentSong = document.getElementById(currentSong.id - 1)
                this.play(currentSong)
                console.log(currentSong.id - 1)
            }
        })
        const nextBtn = dashboard.getElementsByClassName("btn-next")[0]
        nextBtn.addEventListener("click", () => {
            if (typeof currentSong !== "undefined" && currentSong.id != this.songs.length) {
                // this.unplay(currentSong)
                // currentSong = document.getElementById(currentSong.id + 1)
                // this.play(currentSong)
                console.log(currentSong.id + 1)
            }
        })
    },

    play(song) {
        function highlightCurrentSong(song) {
            //highlight in playlist
            song.style["background-color"] = "red"
            song.getElementsByClassName("music-name")[0].style.color = "white"
            song.getElementsByClassName("singer")[0].style.color = "white"
            song.getElementsByTagName("i")[0].style.color = "white"
            //change dashboard
            _this.action.status("now playing")
            dashboard.getElementsByClassName("cd-thumb")[0].style = `background-image: url(${songs[song.id].image});`
            _this.action.roateThumbail()
            dashboard.querySelector(".player .dashboard .control .btn-play i").classList = ["fas fa-pause"]
            dashboard.getElementsByClassName("music-name")[0].textContent = songs[song.id].name
            window.scrollTo(0, 0)
        }
        const _this = this
        const songs = this.songs
        pause = false
        highlightCurrentSong(song)
        audioSource.src = songs[song.id].path
        audio.load()
        this.playAudio()
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
            this.pauseAudio()
        }
    },

    playAudio() {
        audio.play().then(() => {
        }).catch(err => {
            console.log(err);
        })
    },

    pauseAudio() {
        audio.pause()
    },

    start: function () {
        this.render()
        this.handleEvents()
    }

}

app.start()