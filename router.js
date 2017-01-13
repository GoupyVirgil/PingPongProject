Router.route('/', function () {
    this.render( 'login_template' );
});

Router.route('/registration', function(){
    this.render( 'registration_template' );
});

Router.route('/information', function(){
   this.render( 'registration_information_template');
});

Router.route('/addPlayer/confirmation', function(){
    this.render('confirmation_player_template');
});

Router.route('/board', function(){
    this.render( 'board_template' );
});

Router.route('/request', function(){
   this.render( 'request_template');
});

Router.route('/addPlayer', function(){
    this.render( 'add_player_template' );
});

Router.route('/accept/:_id/:_name/:_lastname', function () {

    var requestId = this.params._id,
        username = this.params._name,
        lastname = this.params._lastname,
        userAdded = user_added.find(requestId).fetch()[0];

        if(userAdded){

            user_accepted.insert({
                referentId : userAdded.referentId,
                firstname : userAdded.firstname,
                lastname : userAdded.lastname,
                email : userAdded.email,
                structurename : userAdded.structurename
            });

            user_added.remove(userAdded._id);

            Meteor.call(
                'eligible_tournament',
                {

                    referentId: Meteor.userId()

                },
                ( err, res ) => {

                    if ( err ) {

                        return err;

                    } else {

                        if(res){


                        var allUsers = user_accepted.find( {referentId: Meteor.userId()} ).fetch();
                        Meteor.call(
                            'define_nb_of_stage',
                            {

                                players : allUsers

                            },
                            ( err, res ) => {

                                if( err ){

                                    return err;

                                }else{

                                    Meteor.call(
                                        'generate_tournament_object',
                                        {
                                            allPlayers: allUsers,
                                            nbOfStage: res
                                        },
                                        (err, res) => {

                                            if (err) {

                                                return err;

                                            } else {

                                                var tournamentId = Meteor.users.findOne({_id:Meteor.userId()}).profile.tournamentId;

                                                if(user_tournament.findOne({_id:tournamentId})){

                                                    user_tournament.remove({_id:tournamentId});
                                                }

                                                user_tournament.insert(res, function( err, docsInserted ){

                                                    Meteor.users.update( Meteor.userId(), {

                                                        $set: { profile : {tournamentId : docsInserted }}

                                                    });

                                                });

                                            }
                                        }
                                    );
                                }

                            }
                        );
                        }
                    }
                }
            );

            Router.go('/board');

        }else{

            console.log('il n\'y a pas de requête');

        }
});


Router.route('/show/:_tournamentId', function () {
    var tournament = user_tournament.findOne({_id: this.params._tournamentId});
    console.log(tournament);
    if(tournament){
        this.render('guest_board_template', {data : {get_tournament :{tournament : tournament.tournament, id: tournament._id}}});
    }else{
        this.render('guest_board_template', {data : {get_tournament :false}});
    }
});
