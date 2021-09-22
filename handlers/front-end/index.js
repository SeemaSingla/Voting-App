var app = new Vue({
        el: '#app',
        data: {
            polls: [],
            click: [],
        },
        created: function () {
            axios.get('/polls')
                .then(res => this.polls = res.data.items ? res.data.items : [])
                .catch(e => this.failed('Unsuccesful'))
        },
        methods: {
            upvote: function (n) {
                if (this.click[n] == true) {
                    this.polls[n].downvotes -= 1;
                    this.polls[n].upvotes += 1;
                } else {
                    this.polls[n].upvotes += 1;
                    this.click[n] = true;
                }
            },
            downvote: function (n) {
                if (this.click[n] == true) {
                    this.polls[n].upvotes -= 1;
                    this.polls[n].downvotes += 1;
                } else {
                    this.polls[n].downvotes += 1;
                    this.click[n] = true;
                }
            },
            UpdatePoll: function (index) {
                let targetPoll = index + 1;
                axios.put('/poll/' + targetPoll, this.polls[index])
                    .then(res => this.approved('Successful'))
                    .catch(e => this.failed('Unsuccesful'))
            },
            approved: function (data) {
                $("#msg").css({
                    "background-color": "rgb(94, 248, 94)",
                    "border-radius": "20px"
                });
                $('#msg').html(data).fadeIn('slow');
                $('#msg').delay(3000).fadeOut('slow');
            },
            failed: function (data) {
                $("#msg").css({ "background-color": "rgb(248, 66, 66)", "border-radius": "20px" });
                $('#msg').html(data).fadeIn('slow');
                $('#msg').delay(3000).fadeOut('slow');
            }
        }
    })
