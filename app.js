let audioFile = document.querySelector("#audio");
audioFile.ontimeupdate = progressUpdate;

function play_pause() {
    if (audioFile.paused) {
        $("#play").html(` <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path fill="#333" d="M8 5v14l11-7z"/></svg>`);
    } else {
        $("#play").html(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path fill="#333" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`);
    }
}

$("#play").click(function() {
    if ($("#audioFile").attr('src') == 1) {
        audioFile.src = $(".playlist-li:first-child").attr('data') + ".mp3";
        $("#download").attr('href', audioFile.src);
        $(".playlist-li:first-child").addClass("act");
        $("#nameBlock").html($(".playlist-li:first-child .treck-artist").text() + ' - ' + $(".playlist-li:first-child .treck-name").text())
        audioFile.play();
    } else {
        audioFile.paused ? audioFile.play() : audioFile.pause();
    };
    play_pause();

});

$("#prev").click(function(e) {
    current--;
    if (current === -1) {
        current = tracks.length - 1;
        link = tracks[tracks.length - 1];
    } else {
        link = tracks[current];
    }
    run($(link), audio[0]);
})

$("#next").click(function(e) {
    current++;
    if (current > (tracks.length - 1)) {
        current = 0;
        link = tracks[0];
    } else {
        link = tracks[current];
    }
    run($(link), audio[0]);
});

$("#slider").on('input', function() {
    audioFile.currentTime = audioFile.duration * ($("#slider").val() / 1000);
    setBar();
    play_pause();
})
$("#volume_range").on('input', function() {
    audioFile.volume = ($("#volume_range").val() / 100);
})

function progressUpdate() {
    if (audioFile.currentTime == 0) {
        $("#slider").val(0)
    } else if (audioFile.currentTime == audioFile.duration) {
        play_pause();
    } else {
        $("#slider").val(1000 * audioFile.currentTime / audioFile.duration);
        setBar();
        $('#currentTime').html(prettifyTime(audioFile.currentTime));
        $('#duration').html(prettifyTime(audioFile.duration));
    }
}


$("#loop").click(function() {
    audioFile.loop === true ? audioFile.loop = false : audioFile.loop = true;
    if (audioFile.loop === true) {
        $("#loop").html(`<svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 25 25"><path fill="#1e90ff" d="M11.027 16a4.55 4.55 0 0 0 .23 2H9A6 6 0 1 1 9 6h3V4l4 3-4 3V8H9a4 4 0 1 0 0 8h2.027zm7.725-2.61a3.997 3.997 0 0 0-1.648-4.792l1.77-1.18.02.017A5.987 5.987 0 0 1 21 12c0 1.3-.413 2.503-1.116 3.486a4.496 4.496 0 0 0-1.132-2.096z"/><path fill="#1e90ff" d="M15.5 20a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zm-.5-5v4h1v-4h-1zm-1 0v1h1v-1h-1z"/></svg>`)
    } else {
        $("#loop").html(` <svg xmlns="http://www.w3.org/2000/svg" width="25px" viewBox="0 0 25 25"><path fill="#333" d="M12 8H9a4 4 0 1 0 0 8h6a4 4 0 0 0 2.104-7.403l1.77-1.18.02.018A6 6 0 0 1 15 18H9A6 6 0 1 1 9 6h3V4l4 3-4 3V8z"/></svg>`)
    }
})
$("#download").click(
    function() {
        if ($("#audioFile").attr('src') == 1) {
            $("#download").removeAttr('download');
        } else {
            $("#download").attr('download', '');
        }
    }
)

/*Playlist*/
var audio;
var playlist;
var tracks;
var current;
init();

function init() {
    current = 0;
    audio = $('#audioFile');
    playlist = $('.playlist');
    tracks = playlist.find('.playlist-li');
    len = tracks.length - 1;
    audio[0].volume = 1;
    tracks.click(function(e) {
        e.preventDefault();
        link = $(this);
        current = link.index();
        run(link, audio[0]);
    });

    audio[0].addEventListener('ended', function() {

        current++;
        if (current > (tracks.length - 1)) {
            current = 0;
            link = tracks[0];
        } else {
            link = tracks[current];
        }
        run($(link), audio[0]);
        play_pause();
    });

}

function run(link, player) {
    player.src = link.attr('data') + '.mp3';
    $("#download").attr('href', player.src);
    $("#nameBlock").html(link.find(".treck-artist").text() + '  -  ' + link.find(".treck-name").text());
    link.addClass('act').siblings().removeClass('act');
    audio[0].load();
    audio[0].play();
    play_pause();
}

function prettifyTime(time) {
    var minutes = ~~(time % 3600 / 60);
    var seconds = ~~(time % 60);

    return '' + parseInt(minutes / 10) + minutes % 10 + ':' + parseInt(seconds / 10) + seconds % 10;
}