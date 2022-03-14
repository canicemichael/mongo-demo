const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connection to MongoDb was successful'))
    .catch(err => console.error('Connection to MongoDb encountered an Error: ', err));

let courseSchema = new mongoose.Schema({
    tags: [String],
    date: Date,
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number
});
const Course = mongoose.model('Course', courseSchema);

// //Exercise 1
// async function getCourses(){
//     const courses = await Course
//         .find({ tags: 'backend', isPublished })
//         .limit(10)
//         .sort({ name:1 })
//         .select({ name: 1, author: 1 });
//     console.log(courses);
// }
// getCourses();

// Exercise 2
async function getCourses(){
    return await Course
        .find({ isPublished: true })
        .or([ {price: { $gte: 15} }, {name: /.*by.*/} ])
        .limit(10)
        .sort({ price: -1 })
        .select({ name: 1, author: 1, price: 1 })
}

async function displayCourses(){
    const dumb = await getCourses();
    console.log(dumb);
}

displayCourses();