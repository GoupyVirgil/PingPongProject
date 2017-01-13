import { Template } from 'meteor/templating';

Session.set('popup_is_open', false);

Template.login_template.events
( {
    'click #registration' : function( event, template)
    {
        event.preventDefault();
        Router.go('/registration');
    },

    'click #connexion' : function (event, template)
    {

        var $firstname = template.find( "#firstname" );
        var $password = template.find( "#password" );

        // var user = Meteor.users.findOne({username:$firstname}, function(err){
        //     if(!err){
        //         console.log('joueur trouvé');
        //     }
        // });
        // // console.log(user);
        // // console.log('toto');
        // if( user ){
        //
        //     if(user.profile.authorized){

        Meteor.loginWithPassword($firstname.value, $password.value, function(err){
            if (err) {
                Session.set('errorMessage', err.message );
            } else {
                Session.set( 'currentUserId', Meteor.userId() );
                Router.go('/addPlayer');
            }
        });
    },

    'click #login' : function(){
        Session.set('popup_is_open', true);
    },

    'click .btn_participer' : function(){
        Router.go('/registration');
    }

});

Template.login_template.helpers
(
    {
        popup_is_open: function(){
            return Session.get('popup_is_open');
        },
    }
);
