Template.request_template.helpers(
    {
        get_request :  function(){

            var users =  Meteor.users.find().fetch();
            var request = [];

            for(var i = 0; i< users.length; i++){

                if(!users[i].profile.authorized){
                    request.push(users[i]);
                }
            }

            if( requests.length >0 ){

                return {requests : request};

            }
        }
    }
)