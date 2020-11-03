// Get Element
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = progress.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullscreen = player.querySelector('.fullscreen')
// let mouseDown = 0;
let mouseDown = false
// Build functions
const togglePlay = () => {
    if (video.paused) {
        video.play()
    } else {
        video.pause()
        toggle.innerHTML = '►'

    }
}

const updateButton = () => {
    toggle.textContent = video.paused ? '►' : '❚❚'
}

const skipVideo = (event) => {
    const skip = Number(event.target.dataset.skip)
    if (video.currentTime + skip >= 0 && video.currentTime + skip <= video.duration) {
        video.currentTime += skip
    } else if (video.currentTime + skip < 0) {
        video.currentTime = 0
    } else {
        video.currentTime = video.duration
    }

}

const handleRangeUpdate = (event) => {
    video[event.target.name] = event.target.value
}

const scrub = (event) => {
    const scrubTime = (event.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime
}

const handleProgress = (event) => {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

const handleFullscreen = (event) => {
    const isFullScreen = function () {
        return !!(document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
    }
    if (isFullScreen()) {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        // setFullscreenData(false);
    } else {
        if (player.requestFullscreen) player.requestFullscreen();
        else if (player.mozRequestFullScreen) player.mozRequestFullScreen();
        else if (player.webkitRequestFullScreen) player.webkitRequestFullScreen();
        else if (player.msRequestFullscreen) player.msRequestFullscreen();
        // setFullscreenData(true);
    }
    console.log(event)
}

// Hook event listener
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skipVideo))
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
progress.addEventListener('click', scrub)
// document.body.onmousedown = function () {
//     ++mouseDown;
// }
// document.body.onmouseup = function () {
//     --mouseDown;
// }
progress.addEventListener('mousemove', (event) => { mouseDown ? scrub(event) : null })
progress.addEventListener('mousedown', () => mouseDown = true)
progress.addEventListener('mouseup', () => mouseDown = false)
fullscreen.addEventListener('click', handleFullscreen)