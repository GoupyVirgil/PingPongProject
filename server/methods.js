var _ = lodash;

Meteor.methods({
    'define_nb_of_stage'({players}){

        var nbOfStage = 1;

        if (typeof players == 'object' && players.length >= 4) {

            var nbOfPlayers = players.length;

            do {

                if (nbOfPlayers % 2 == 0) {

                    nbOfPlayers = (nbOfPlayers / 2);

                }

                else if (nbOfPlayers % 2 == 1) {

                    nbOfPlayers = ( ( nbOfPlayers - 1 ) / 2) + 1;

                }

                nbOfStage++;

            } while (nbOfPlayers > 1);
        }

        console.log('define_nb_of_stage');
        console.log(nbOfStage);
        return nbOfStage;

    }
});

Meteor.methods({
    'define_expected_nb_of_winners'({players, stageNbr}){

        var stageNb = stageNbr;
        var nbOfStage = 1;

        if (typeof players == 'object' && players.length >= 4) {

            var nbOfPlayers = players.length;

            do {

                if (nbOfPlayers % 2 == 0) {

                    nbOfPlayers = (nbOfPlayers / 2);

                }

                else if (nbOfPlayers % 2 == 1) {

                    nbOfPlayers = ( ( nbOfPlayers - 1 ) / 2) + 1;

                }

                nbOfStage++;

            } while (nbOfStage <= stageNb);
        }
        console.log('define_expected_nb_of_winners');
        console.log(nbOfPlayers);
        return nbOfPlayers;

    }
});

Meteor.methods({
    'generate_tournament_object'({ allPlayers, nbOfStage }){

        var
            proto = {
                tournament: []
            },
            players = allPlayers;

        if( typeof nbOfStage == 'number' ){

            for ( var i = 1; i <= nbOfStage ; i++ ){


                Meteor.call(
                    'generate_tournament_args',
                    {

                        players: players,
                        index: i

                    },
                    ( err, res ) => {

                        if ( err ) {

                            return err;

                        } else {

                            proto.tournament.push(
                                {
                                    stage : i,
                                    expectedNbOfWinners: res.expected_nb,
                                    winners: [],
                                    versus : (i == 1)? res.versus:res.simulate_versus
                                }
                            );
                        }
                    }
                )




            }
        }
        // console.log('generate_tournament_object');
        // console.log(proto);
        return proto;
    }
});

Meteor.methods({
    'generate_versus'({allPlayers}){

        var players = allPlayers;
        var nbOfPlayers = players.length;
        var lotteryNumbers = [];
        var randomListOfPlayers = [];


        for (var i = 0; i < nbOfPlayers; i++) {
            // generate_random_number(lotteryNumbers, nbOfPlayers);

                Meteor.call('generate_random_number', {
                    arrayNumbers: lotteryNumbers,
                    max:nbOfPlayers
                }, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {

                        lotteryNumbers.push(res);
                        randomListOfPlayers.push(players[res]);

                    }
                });


        }
        console.log('generate_versus');
        console.log(_.chunk(randomListOfPlayers, 2));
        return _.chunk(randomListOfPlayers, 2);

    }
});

Meteor.methods({
    'generate_tournament_args'({players, index}){
        var object = {};
        Meteor.call(
            'define_expected_nb_of_winners',
            {

                players: players,
                stageNbr: index

            },
            ( err, res ) => {

                if ( err ) {

                    return err;

                } else {
                    object['expected_nb'] = res;
                    // return res;
                    var simulateVersus = [];

                    for(var i = 0; i < object.expected_nb; i++){

                        simulateVersus.push([])

                    }

                    object['simulate_versus'] = simulateVersus;
                }
            }
        );

        Meteor.call(
            'generate_versus',
            {

                allPlayers: players

            },
            ( err, res ) => {

                if ( err ) {

                    return err;

                } else {

                    object['versus'] = res;

                }
            }
        )



        return object;

    }
});

Meteor.methods({
    'generate_random_number'({arrayNumbers, max}){

        var arrayOfNumbers = arrayNumbers;
        var randomNumber;

        do {

            randomNumber = Math.floor(( Math.random() * max ))

        } while (arrayOfNumbers.indexOf(randomNumber) != -1);

        console.log('generate_random_number');
        console.log(randomNumber);
        return randomNumber;
    }
});

Meteor.methods({
    'eligible_tournament'({referentId}){

        var acceptedUsers = user_accepted.find({referentId: referentId}).fetch();

        if( acceptedUsers.length >= 4 ){

            return true;

        }else{

            return false;

        }

    }
});

Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();
        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
});
