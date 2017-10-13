const Story = require('../models/story');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
   
   Story.find((err, result) => {

       if (err) { return next(err); }

       res.render('index', {
        title: 'Home',
        data: result
       });
   });
}
