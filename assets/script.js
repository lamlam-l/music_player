const player = document.getElementsByClassName("player")[0]
const playlist = player.getElementsByClassName("playlist")[0]
const dashboard = player.getElementsByClassName("dashboard")[0]
var currentSong
var pause
const audio = document.getElementById("audio")
const audioSource = document.getElementsByTagName("source")[0]
const cdThumb = dashboard.getElementsByClassName("cd-thumb")[0]
const cdThumbAnimate = cdThumb.animate([
    { transform: "rotate(360deg)" }
], {
    duration: 20000,
    // easing: linear,
    iterations: Infinity,
})
cdThumbAnimate.pause()
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
        nextSong(app) {
            if (currentSong !== "undefined") {
                if (currentSong.id == app.songs.length - 1) {
                    app.unplay(currentSong)
                    currentSong = document.getElementById(0)
                    app.play(currentSong)
                } else {
                    app.unplay(currentSong)
                    currentSong = document.getElementById(parseInt(currentSong.id) + 1)
                    app.play(currentSong)
                }
            }
        },
        previousSong(app) {
            if (currentSong !== "undefined") {
                if (currentSong.id == 0) {
                    app.unplay(currentSong)
                    currentSong = document.getElementById(app.songs.length - 1)
                    app.play(currentSong)
                } else {
                    app.unplay(currentSong)
                    currentSong = document.getElementById(parseInt(currentSong.id) - 1)
                    app.play(currentSong)
                }
            }
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
            song.addEventListener("click", (e) => {
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
                cdThumbAnimate.play()
                this.action.status("playing")
                dashboard.querySelector(".player .dashboard .control .btn-play i").classList = ["fas fa-pause"]
            } else {
                this.pauseAudio()
                pause = true
                cdThumbAnimate.pause()
                this.action.status("pause")
                dashboard.querySelector(".player .dashboard .control .btn-play i").classList = ["fas fa-play"]
            }
        })
        //next, previous
        const previousBtn = dashboard.getElementsByClassName("btn-previous")[0]
        previousBtn.addEventListener("click", () => {
            this.action.previousSong(this)
        })
        const nextBtn = dashboard.getElementsByClassName("btn-next")[0]
        nextBtn.addEventListener("click", () => {
            this.action.nextSong(this)
        })
        //progress bar
        const progress = dashboard.getElementsByClassName("progress")[0]
        isTimeUpdate = true
        audio.ontimeupdate = () => {
            if (audio.duration && isTimeUpdate) {
                var progressPercent = Math.floor(100 * audio.currentTime / audio.duration)
                progress.value = progressPercent
            }
        }
        //progress bar change
        progress.onmousedown = (e) => {
            isTimeUpdate = false
        }
        progress.ontouchstart = (e) => {
            isTimeUpdate = false
        }
        progress.addEventListener("change", (e) => {
            var currentTime = Math.floor(e.target.value * audio.duration / 100)
            audio.currentTime = currentTime
            isTimeUpdate = true
        })
        //repeat button
        const repeatBtn = dashboard.getElementsByClassName("btn-repeate")[0]
        var repeat = false
        audio.onended = () => {
            this.action.nextSong(this)
        }
        repeatBtn.addEventListener("click", (e) => {
            if (repeat) {
                repeatBtn.children[0].style.color = "black"
                this.action.status("repeat mode off")
                audio.onended = () => {
                    this.action.nextSong(this)
                }
                repeat = false
            } else {
                repeatBtn.children[0].style.color = "rgb(255, 62, 62)"
                this.action.status("repeat mode on")
                audio.onended = () => {
                    this.play(currentSong)
                }
                repeat = true
            }
        })
        //random button
        const randomBtn = dashboard.getElementsByClassName("btn-random")[0]
        randomBtn.onclick = (e) => {
            var randomNumber = Math.floor(Math.random()*this.songs.length)
            this.unplay(currentSong)
            currentSong = document.getElementById(randomNumber)
            this.play(currentSong)
        }
    },

    play(song) {
        function highlightCurrentSong(song) {
            //highlight in playlist
            song.style["background-color"] = "red"
            song.getElementsByClassName("music-name")[0].style.color = "white"
            song.getElementsByClassName("singer")[0].style.color = "white"
            song.getElementsByTagName("i")[0].style.color = "white"
            const scrollTop = window.scrollY || document.documentElement.scrollTop
            window.scrollTo(0, 0)
            window.scrollTo(0, scrollTop)
            //change dashboard
            _this.action.status("now playing")
            dashboard.getElementsByClassName("cd-thumb")[0].style = `background-image: url(${songs[song.id].image});`
            cdThumbAnimate.play()
            dashboard.querySelector(".player .dashboard .control .btn-play i").classList = ["fas fa-pause"]
            dashboard.getElementsByClassName("music-name")[0].textContent = songs[song.id].name
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