import { Mongo } from 'meteor/mongo';

user_tournament = new Mongo.Collection("tournament");

user_added = new Mongo.Collection("user_added");

user_accepted = new Mongo.Collection("user_accepted");

memo = new Mongo.Collection("memo");
