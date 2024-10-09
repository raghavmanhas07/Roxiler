const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/transactionDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected'))
    .catch(err => console.log('Database connection error: ', err));

    app.use(cors({
        origin: 'http://localhost:5173'
      }));


const task01Routes = require('./task_01');
const task02Routes = require('./Task_02');
const task03Routes = require('./Task_03');
const task04Routes = require('./Task_04');
const task05Routes = require('./Task_05');
const task06Routes = require('./Task_06');



app.use('/task01', task01Routes);
app.use('/task02', task02Routes);
app.use('/task03', task03Routes);
app.use('/task04', task04Routes);
app.use('/task05', task05Routes);
app.use('/task06', task06Routes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
