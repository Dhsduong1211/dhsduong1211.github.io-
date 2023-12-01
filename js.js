const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const home = $('.home')
const navBtns = $$('.nav-item')
const circle = $('.circle')
const music = $('.music')
const homes = $('.homes')
const player = $('.player')
const heading = $('.song-play-header h2')
const cdThumb = $('.song-play-img')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const progress = $('.progress')
const btnNext = $('.btn-next')
const btnPrev = $('.btn-prev')
const btnRandom = $('.btn-random')
const btnRepeat = $('.btn-repeat')
const playlist = $('.playlist')
const videoBtns = $$('.img-btn-item')
const videos = $$('.video')
const users = $('.users')
const app = {
      isPlaying: false,
      isRandom: false,
      isRepeat: false,
      isVideo: false,
      currentIndex: 0,
      songs: [
            {
                  name: "Remember Me ",
                  singer: "Son Tung MTP",
                  path: "./assets/music/21.mp3",
                  image: "./assets/img/21.jfif"
            },
            {
                  name: "Đi Về Nhà",
                  singer: "Đen x JustaTee ",
                  path: "./assets/music/9.mp3",
                  image: "./assets/img/9.jpg"
            },
            {
                  name: "Thương em là điều anh không thể ngờ  ",
                  singer: "Noo Phước Thịnh",
                  path: "./assets/music/5.mp3",
                  image: "./assets/img/5.jpg"
            },
           
                {
                  name: "Khóa Ly Biệt",
                  singer: "Voi Bản Đôn",
                  path: "./assets/music/2.mp3",
                  image: "./assets/img/2.jpg"
            },  
            {
                  name: "Dành Cho Em",
                  singer: "Hoàng Dũng x Orange ",
                  path: "./assets/music/18.mp3",
                  image: "./assets/img/18.jfif"
            },
      
            
            {
                  name: "Mãi Mãi Bên Nhau Như Phút Ban Đầu ",
                  singer: "Noo Phước Thịnh",
                  path: "./assets/music/6.mp3",
                  image: "./assets/img/6.jpg"
            },
            {
                  name: "Đi Theo Bóng Mặt Trời ",
                  singer: "Đen ft. Giang Nguyễn",
                  path: "./assets/music/7.mp3",
                  image: "./assets/img/7.jfif"
            },
         
            {
                  name: "Making My You ",
                  singer: "Son Tung MTP",
                  path: "./assets/music/14.mp3",
                  image: "./assets/img/14.jpg"
            },
            {
                  name: "Vỡ Tan",
                  singer: " Hiền Hồ x Trịnh Thăng Bình",
                  path: "./assets/music/16.mp3",
                  image: "./assets/img/16.jfif"
            },
           
            
            {
                  name: "Chưa bao giờ",
                  singer: "Hoàng Dũng x Thu Phương ",
                  path: "./assets/music/19.mp3",
                  image: "./assets/img/19.jfif"
            },
         
            
         
          ],
      

          renders: function() {
            const htmls = this.songs.map((song, index) => {
                  return ` <div class="song ${index === this.currentIndex ? "active" : ""}" data-index="${index}">
                  <div class="thumb" style="background-image: url(${song.image})">
                  </div>
                  <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                  </div>
                  <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                  </div>
                </div>`
            })
            playlist.innerHTML = htmls.join('')
      },
      
      // lắng nghe sự kiện
      handleEvents: function() {
            const _this = this
            // nav
            navBtns.forEach(function(navBtn, ind) {
                  navBtn.onclick = function() {
                        $('.nav-item.active').classList.remove('active')
                        navBtn.classList.add('active')

                        if(ind === 1) {
                              player.style.display = 'block'
                         } else {
                              player.style.display = 'none'

                         }
                         if(ind === 0) {
                              homes.style.display = 'block'
                         } else {
                              homes.style.display = 'none'

                         }
                         if(ind === 2) {
                              users.style.display = 'block'
                         } else {
                              users.style.display = 'none'

                         }
                  }
            })

            // bấm video
            videoBtns.forEach(function(videoBtn, index) {
                  videoBtn.onclick = function() {
                        _this.isVideo =true
                        videos[index].play()
                        $('.video-item.active').classList.remove('active')
                        $('.active.img-btn-item').classList.remove('active')
                        
                        $$('.video-item')[index].classList.add('active')
                        $$('.img-btn-item')[index].classList.add('active')
                        
                        _this.handlePauseVideo()
                  }

            })
            
            // play pause video
            videos.forEach(function(video, index) {
                  video.onclick = function() {
                        _this.isVideo = !_this.isVideo
                        if(_this.isVideo) {
                              videos[index].play()
                        } else {
                              videos[index].pause()
                        }
                  }
            })

            // xử lý pause
            
            // Xử lý active song
            playlist.onclick = function(e) {
                  const songNode = e.target.closest('.song:not(.active)')
                  if(songNode) {
                       _this.currentIndex = Number(songNode.dataset.index)

                       _this.loadCurrentSong()
                       audio.play()
                       _this.renders()
                  }
            }
            
            // Xử lý khi Thumb quay
            const cdThumbAnimate = cdThumb.animate([
                  {
                        transform: `rotate(360deg)`,
                  }
            ], {
                  duration: 10000,
                  iterations: Infinity
            })
            cdThumbAnimate.pause()
            // click nút play 
            playBtn.onclick = function() {
                  if(_this.isPlaying) {
                        audio.pause()

                  }
                  else {
                        audio.play()
                  }
            }
            // Lắng nghe next song 
            btnNext.onclick = function() {
                  if(_this.isRandom) {
                        _this.randomSong()
                  } else {
                        _this.currentIndex++
                        console.log (_this.currentIndex)
                        if(_this.currentIndex >= _this.songs.length){
                              _this.currentIndex = 0
                        }

                  }
                  
                  _this.loadCurrentSong()
                  audio.play()
                  _this.renders()
                  _this.scrollActiveIntoView()

            }
            // Lắng nghe prev song
            btnPrev.onclick = function() {
                  if(_this.isRandom) {
                        _this.randomSong()
                  } else {
                        _this.currentIndex--
                        if(_this.currentIndex < 0) {
                        _this.currentIndex  = _this.songs.length - 1
                        }  
                  }
                 
                  _this.loadCurrentSong()
                  audio.play()
                  _this.renders()
                  _this.scrollActiveIntoView()


             }
            //  Xử lý repeat
            btnRepeat.onclick =function() {
                  _this.isRepeat = !_this.isRepeat
                  btnRepeat.classList.toggle('active', _this.isRepeat)
            }
            
            //  Xử lý random
            btnRandom.onclick = function() {
                  _this.isRandom = !_this.isRandom
                  if(!_this.isRandom){
                        btnRandom.classList.remove('active')
                  }
                  else{
                        btnRandom.classList.add('active')

                  }
            }
            // Xử lý cuối bài 
            audio.onended = function() {
                  if(!_this.isRepeat) {
                        btnNext.click()
                  }
                  else{
                        _this.loadCurrentSong()
                        audio.play()
                  }
                  
            }
            // Lắng nghe khi audio play
            audio.onplay = function() {
                  _this.isPlaying = true;
                  player.classList.add('playing');
                  cdThumbAnimate.play()
            }
            // Lắng nghe khi audio play
            audio.onpause = function() {
                  _this.isPlaying = false;
                  player.classList.remove('playing')
                  cdThumbAnimate.pause()
            }
            //  Xử lý tua 
            progress.onchange = function(){
                  audio.currentTime =  Math.floor(progress.value*audio.duration/100)
            }
            // Xử lý update thanh prosser
            audio.ontimeupdate = function() {
                  const currentTimePercent = Math.floor(audio.currentTime/audio.duration*100)
                  if(audio.duration) {
                  progress.value = currentTimePercent    
                  }
               
            }
            
      },
      scrollActiveIntoView: function() {
            setTimeout(function() {
                  $('.song.active').scrollIntoView({
                        behavior:'smooth',
                        block: "center"
                  })
            },500)
      },

      randomSong: function() {
            do {
                  Math.floor(Math.random()*this.songs.length)
            }
            while (this.currentIndex ===  Math.floor(Math.random()*this.songs.length))
            this.currentIndex =Math.floor(Math.random()*this.songs.length);
            this.loadCurrentSong()
      },
      currentSong: function() {
            return this.songs[this.currentIndex]
      },
      loadCurrentSong: function() {
            heading.textContent = this.currentSong().name;
            audio.src = this.currentSong().path
            cdThumb.style.backgroundImage = `url(${this.currentSong().image})`       
      },
      handlePauseVideo: function() {
            $$('.video-item').forEach(function(videoblock, index){
                 if(videoblock.classList.length === 1) {
                  videos[index].pause()
                 }
            })
      },
      start: function() {
            this.loadCurrentSong()
            this.handleEvents()
            this.renders()
      },
}
app.start()

