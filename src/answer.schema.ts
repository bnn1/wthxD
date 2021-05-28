import mongoose from 'mongoose'

const schema = mongoose.Schema;

const answer = new schema({
    answer: String,
    date: String
})

const Answer = mongoose.models.answer || mongoose.model('Answer', answer);

export default Answer;
//5H8t7hJXbwCeQKN5