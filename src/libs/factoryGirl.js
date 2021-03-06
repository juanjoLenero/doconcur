'use strict';

var FactoryGirl = require('factory-girl');
var faker = require('faker');
var models = require('src/db').models;
var _ = require('lodash');
require('src/libs/factory-girl-moron')();
var Promise = require('bluebird');

FactoryGirl.define('user', models.User, {
    firstName: function () {
        return faker.name.firstName();
    },
    lastname: function () {
        return faker.name.lastName();
    },
    username: function () {
        return faker.internet.userName();
    },
    email: function () {
        return faker.internet.email();
    },
    password: function () {
        return faker.internet.password();
    }
});

FactoryGirl.define('participation', models.Participation, {
    authorId: FactoryGirl.assoc('user', 'id'),
    answerId: FactoryGirl.assoc('answer', 'id'),
    decisionId: FactoryGirl.assoc('decision', 'id')
});

FactoryGirl.define('comment', models.Comment, {
    text: function () {
        return faker.lorem.sentence(6);
    },
    authorId: FactoryGirl.assoc('user', 'id'),
    decisionId: FactoryGirl.assoc('decision', 'id')
});

FactoryGirl.define('answer', models.Answer, {
    value: function () {
        return _.sample(['yes', 'no', 'maybe']);
    }
});

FactoryGirl.define('decision', models.Decision, {
    title: function () {
        return faker.lorem.sentence(3);
    },
    description: function () {
        return faker.lorem.sentence(6);
    },
    authorId: FactoryGirl.assoc('user', 'id')
});

FactoryGirl.define('tag', models.Tag, {
    value: function () {
        return faker.lorem.sentence(3);
    }
});

FactoryGirl.define('decisionTag', models.DecisionTag, {
    decisionId: FactoryGirl.assoc('decision', 'id'),
    tagId: FactoryGirl.assoc('tag', 'id')
});

Promise.promisifyAll(FactoryGirl);

module.exports = FactoryGirl;
