
        
        var loop = new Howl({
        src: ['audio/loop.ogg', 'audio/loop.wav'],
        loop: true,
        volume: 0.7,
        buffer: true,
        rate: 0.6
        });  
                
        var mute = false;
        loop.play();
        Howler.mobileAutoEnable = false;
                
        document.getElementById('music').onclick = function () {
        if (mute === true) {
        loop.play();
        document.getElementById('speaker').src = 'icons/mute.png';
        mute = false;
        } else {
        loop.pause();
        document.getElementById('speaker').src = 'icons/music.png';
        mute = true;
        }
        };
            

