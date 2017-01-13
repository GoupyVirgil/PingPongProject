import { Template } from 'meteor/templating';

Template.add_player_template.events
( {
    'click #addPlayer' : function( event, template )
    {
        event.preventDefault();

        var firstname_j1 = template.find( "#firstname_j1" ),
            firstname_j2 = template.find( "#firstname_j2" ),
            firstname_j3 = template.find( "#firstname_j3" ),
            firstname_j4 = template.find( "#firstname_j4" ),
            lastname_j1 = template.find( "#lastname_j1" ),
            lastname_j2 = template.find( "#lastname_j2" ),
            lastname_j3 = template.find( "#lastname_j3" ),
            lastname_j4 = template.find( "#lastname_j4" ),
            email_j1 = template.find( "#email_j1" ),
            email_j2 = template.find( "#email_j2" ),
            email_j3 = template.find( "#email_j3" ),
            email_j4 = template.find( "#email_j4" );

        if(
            firstname_j1.value !== "" &&
            firstname_j2.value !== "" &&
            firstname_j3.value !== "" &&
            firstname_j4.value !== "" &&
            lastname_j1.value !== "" &&
            lastname_j2.value !== "" &&
            lastname_j3.value !== "" &&
            lastname_j4.value !== "" &&
            email_j1.value !== "" &&
            email_j2.value !== "" &&
            email_j3.value !== "" &&
            email_j4.value !== ""
        ){

            user_added.insert({
                referentId : Meteor.userId(),
                firstname : firstname_j1.value,
                lastname : lastname_j1.value,
                email : email_j1.value
            }, function(err,docsInserted){

                //SEND MAIL HERE
                // '/accept/'+docsInserted+'/'+'firstname_j1+'/'+lastname_j1
                console.log(docsInserted);
            });

            user_added.insert({
                referentId : Meteor.userId(),
                firstname : firstname_j2.value,
                lastname : lastname_j2.value,
                email : email_j2.value
            }, function(err,docsInserted){

                //SEND MAIL HERE
                // '/accept/'+docsInserted+'/'+'firstname_j1+'/'+lastname_j1
                console.log(docsInserted);
            });

            user_added.insert({
                referentId : Meteor.userId(),
                firstname : firstname_j3.value,
                lastname : lastname_j3.value,
                email : email_j3.value
            }, function(err,docsInserted){

                //SEND MAIL HERE
                // '/accept/'+docsInserted+'/'+'firstname_j1+'/'+lastname_j1
                console.log(docsInserted);
            });

            user_added.insert({
                referentId : Meteor.userId(),
                firstname : firstname_j4.value,
                lastname : lastname_j4.value,
                email : email_j4.value
            }, function(err,docsInserted){

                //SEND MAIL HERE
                // '/accept/'+docsInserted+'/'+'firstname_j1+'/'+lastname_j1
                console.log(docsInserted);
            });

            Router.go('/board');
        }

        else{
            var err = { message : 'champ incorrect'};
            Session.set('errorMessage', err.message );
        }
    }
} );

Template.add_new_player.events( {
    'click #addNewPlayer' : function( event, template )
    {
        event.preventDefault();

        var firstname = template.find( "#new_firstname" ),
            lastname = template.find( "#new_lastname" ),
            email = template.find( "#new_email" );

        if(
            firstname.value !== "" &&
            lastname.value !== "" &&
            email.value !== ""
        ){

            user_added.insert({
                referentId : Meteor.userId(),
                firstname : firstname.value,
                lastname : lastname.value,
                email : email.value
            }, function(err,docsInserted){

                //SEND MAIL HERE
                // '/accept/'+docsInserted+'/'+'firstname_j1+'/'+lastname_j1
                console.log(docsInserted);
            });

            Router.go('/board');
        }

        else{
            var err = { message : 'champ incorrect'};
            Session.set('errorMessage', err.message );
        }
    }
} );

