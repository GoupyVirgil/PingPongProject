Template.board_template.helpers
(
    {

        get_tournament : function () {

            var users = Meteor.users;
            var userId = Meteor.userId();

            if(userId && users){

                var user = users.findOne({_id:userId});

                if (user && user.profile && user.profile.tournamentId) {

                    var tournamentId = user.profile.tournamentId;
                    var tournament = user_tournament.findOne({_id:tournamentId});
                    // console.log(tournament);
                    if(tournament){
                        console.log(tournament);
                        return {tournament : tournament.tournament, id: tournament._id};
                    }else{
                        return false;
                    }

                }
            }
        },

        exist_tournament: function(){
            var players = user_accepted.find({referentId: Meteor.userId()}).fetch();

            if( players.length >= 4 ){
                return true;
            }else{
                return false;
            }

        }
    }
);

Template.board_template.events({

    'click .player': function(event, template){

        event.preventDefault();

        if(Meteor.userId()){

            var phaseNb = event.target.dataset.phase;
            var playerId = event.target.dataset.id;
            var tournamentId = event.target.dataset.tournament;

            var tournament = user_tournament.findOne({_id:tournamentId});
            var player = user_accepted.findOne({_id : playerId});
            tournament.tournament[phaseNb-1].winners.push(player);

            user_tournament.update({_id:tournamentId},{$set:{tournament: tournament.tournament }});

            var tournament_updated = user_tournament.findOne({_id:tournamentId});

            if(tournament_updated .tournament[phaseNb-1].expectedNbOfWinners == tournament_updated.tournament[phaseNb-1].winners.length){



                Meteor.call(
                    'generate_versus',
                    {
                        allPlayers: tournament_updated.tournament[phaseNb-1].winners
                    },
                    (err, res) => {

                        if (err) {

                            return err;

                        } else {
                            tournament_updated.tournament[phaseNb].versus = res;

                            var tournamentWithPhaseUpdated = tournament_updated.tournament;
                            user_tournament.update({_id:tournamentId}, {$set:{tournament :tournamentWithPhaseUpdated}});
                        }
                    }
                );

            }else{
                console.log('il n\'y a pas encore le nombre attendu de gagnants');
            }

        }

    }

});
