const Vue = require('vue/dist/vue.min.js');
const superagent = require('superagent');
const debounce = require('javascript-debounce');

const key = 'AIzaSyBaxYI-37aSSHY1DzBW6iDrkfQm3L8FrrI';

new Vue({
    el: '#app',
    data: {
        dataSrc: '',
        input: '',
        timer: 100
    },
    methods: {
        update: function(e) {
            var input = e.target.value;
            if(input.trim()) {
                this.lookup(input);
                this.flash(input);
            }
        },
        lookup: debounce(function(input) {
            var self = this;
            superagent
                .get('https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&key=' + key)
                .query({ q: input })
                .end(function(err, res){
                    if (!err) {
                        var videoId;
                        if(res.body.items.length < 1)
                            videoId = 'dQw4w9WgXcQ';
                        else
                            videoId = res.body.items[0].id.videoId;
                        self.dataSrc = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&controls=0&showinfo=0&rel=0&iv_load_policy=3&loop=1';
                    }
                });
        }, 1000),
        flash: function(input) {
            var cooldown = function(self) {
                var flash = document.getElementById('flash');
                setTimeout(function() {
                    self.timer--;
                    flash.style.opacity = self.timer/100;
                    if(self.timer > 0) {
                        cooldown(self);
                    } else {
                        self.input = '';
                        self.timer = 100;
                    }
                }, 10);
            };
            if(this.timer === 100) {
                cooldown(this);
            } else {
                this.timer = 100;
            }
            this.input = input;
        }
    }
});