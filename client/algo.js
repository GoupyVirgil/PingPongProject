var _ = lodash;
const players5 = [
    {name : 'virgil'},
    {name : 'thomas'},
    {name : 'quentin'},
    {name : 'vincent'},
    {name : 'hadrien'}
];
const players10 = [
    {name : 'virgil'},
    {name : 'thomas'},
    {name : 'quentin'},
    {name : 'vincent'},
    {name : 'hadrien'},
    {name : 'virgil'},
    {name : 'thomas'},
    {name : 'quentin'},
    {name : 'vincent'},
    {name : 'hadrien'}
];

const players6 = [
    {name : 'virgil'},
    {name : 'thomas'},
    {name : 'quentin'},
    {name : 'vincent'},
    {name : 'hadrien'},
    {name : 'hadrien'}
];

const players18 = [
    {name : 'virgil'},
    {name : 'thomas'},
    {name : 'quentin'},
    {name : 'vincent'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'},
    {name : 'hadrien'}
];

//data structure
var model = {
    id: 1,
    tournament : [
        {
            stage : 1,
            expectedNbOfWinners: 0,
            winners:[],
            versus : [
                        [
                            { user : 'user2' },
                            { user : 'user3' }
                        ],
                        [
                            { user : 'user4' },
                            { user : 'user1' }
                        ],
                        [
                            { user : 'user5' }
                        ]
            ]
        },
        {
            stage : 2,
            previous_winners : [
                { user : 'user2' },
                { user : 'user4' },
                { user : 'user5' }
            ],
            versus : [
                [
                    { user : 'user5' },
                    { user : 'user2' }
                ],
                [
                    { user : 'user4'}
                ]
            ]
        },
        {
            stage : 3,
            previsous_winners : [
                { user : 'user4' },
                { user : 'user2' }
            ],
            versus : [
                [
                    { user : 'user5' },
                    { user : 'user2' }
                ]
            ]
        },
        {
            stage : 4,
            previsous_winners : [
                { user : 'user2' }
            ],
            versus : [
                [
                    { user : 'user2' }
                ]
            ]
        }

    ]

};

Meteor.methods({
    'define_nb_of_stage'({ players }) {

        var nbOfStage = 1;

        if( typeof players == 'object' && players.length >= 4 ){

            var nbOfPlayers = players.length;

            do{

                if( nbOfPlayers%2 == 0 ){

                    nbOfPlayers = (nbOfPlayers/2);

                }

                else if ( nbOfPlayers%2 == 1 ){

                    nbOfPlayers = ( ( nbOfPlayers - 1 ) / 2) + 1;

                }

                nbOfStage ++;

            }while(nbOfPlayers > 1);
        }

        return nbOfStage;
    }
});


function define_nb_of_stage( players ){

    var nbOfStage = 1;

    if( typeof players == 'object' && players.length >= 4 ){

        var nbOfPlayers = players.length;

        do{

            if( nbOfPlayers%2 == 0 ){

                nbOfPlayers = (nbOfPlayers/2);

            }

            else if ( nbOfPlayers%2 == 1 ){

                nbOfPlayers = ( ( nbOfPlayers - 1 ) / 2) + 1;

            }

            nbOfStage ++;

        }while(nbOfPlayers > 1);
    }

    return nbOfStage;

}

function define_expected_nb_of_winners( players, stageNb ){

    var stageNb = stageNb;
    var nbOfStage = 1;

    if( typeof players == 'object' && players.length >= 4 ){

        var nbOfPlayers = players.length;

        do{

            if( nbOfPlayers%2 == 0 ){

                nbOfPlayers = (nbOfPlayers/2);

            }

            else if ( nbOfPlayers%2 == 1 ){

                nbOfPlayers = ( ( nbOfPlayers - 1 ) / 2) + 1;

            }

            nbOfStage ++;

        }while(nbOfStage <= stageNb);
    }

    return nbOfPlayers;

}
// console.log(define_expected_nb_of_winners(players5, 2));
// console.log(define_expected_nb_of_winners(players18, 3));
// TEST define_nb_of_stage
// console.log(define_nb_of_stage(players5));
// console.log(define_nb_of_stage(players6));
// console.log(define_nb_of_stage(players10));
// console.log(define_nb_of_stage(players18));

function generate_tournament_object( players, nbOfStage ){

    var
        proto = {
            id: 1,
            tournament: []
        },
        players = players;

    if( typeof nbOfStage == 'number' ){

        for ( var i = 1; i < nbOfStage ; i++ ){

             proto.tournament.push(
                {
                    stage : i,
                    expectedNbOfWinners: define_expected_nb_of_winners( players, i ),
                    winners: [],
                    versus : (i == 1)?generate_versus( players ):[]
                }
            );

        }
    }
    return proto;
}

// TEST generate_tournament_object
// console.log( generate_tournament_object( players10, define_nb_of_stage( players10 ) ) );
// console.log( generate_tournament_object( players18, define_nb_of_stage( players18 ) ) );

function generate_versus( players ){

    var players = players;
    var nbOfPlayers = players.length;
    var lotteryNumbers = [];
    var randomListOfPlayers = [];



    for (var i = 0; i < nbOfPlayers; i++ ){

        var randomNumber = generate_random_number( lotteryNumbers, nbOfPlayers );
        lotteryNumbers.push( randomNumber );
        randomListOfPlayers.push( players[ randomNumber ] );

    }

    return _.chunk( randomListOfPlayers, 2 );

}

function generate_random_number( arrayOfNumbers, max ){

    var arrayOfNumbers = arrayOfNumbers;
    var randomNumber;

    do{

        randomNumber = Math.floor( ( Math.random() * max ) )

    }while( arrayOfNumbers.indexOf( randomNumber ) != -1 );

    return randomNumber;
}

// console.log(generate_random_number([0,1], 3 ));
// console.log(generate_versus(players5));
// console.log(generate_versus(players18));