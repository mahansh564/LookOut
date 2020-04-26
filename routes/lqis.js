const router = require('express').Router();
let Form = require('../models/form.model');

router.route('/').get( async (req, res) => {
    try {
        const coms = await Form.find();
        const S = coms.length;
        let sum = 0;
        for(let i = 0; i < S; i++)
        {
            sum += Number(coms[i].index);
        }
        const average = sum / S;
        res.json({avg: average, coms});
    } catch(err) {
        res.statusCode(400).json('Error: ' + err);
    }
    /* Form.find()
        .then(coms =>  {
              let S = coms.length;
              let sum=0;
              for(let i =0;i<S;i++){
                    sum += Number(coms[i].index); 
              }
              sum= sum/S;
            res.json({avg:sum, coms});
      
        })
        .catch(err => res.statusCode(400).json('Error: ' + err)); */
});

module.exports = router;