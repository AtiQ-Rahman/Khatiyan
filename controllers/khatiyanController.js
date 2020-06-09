const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Khatiyan } = require('../models/khatiyan');

// => localhost:3000/khatiyans/
// GET API - Returns a list of all khotiyans in the database KhotiyanDB
router.get('/', (req, res) => {
    Khatiyan.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Khatiyans :' + JSON.stringify(err, undefined, 2)); }
    });
});

// GET API - Returns a list of a khotiyan with the specific id in KhotiyanDB database
router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Khatiyan.findById(req.params.id, (err, doc) => {
        if (!err) res.send(doc);
        else console.log('Error in Retriving Khatiyan :' + JSON.stringify(err, undefined, 2));
    });
});

// POST API - Add data relating to a new khatiyan during posting,
// and new data will be added to the KhotiyanDB database
router.post('/', (req, res) => {
    var ktyn = new Khatiyan({
        
        khatiyan_number: req.body.khatiyan_number,
        serial_no: req.body.serial_no,
        owner_name: req.body.owner_name,
        owner_father: req.body.owner_father,
        owner_address: req.body.owner_address,
        part : req.body.part,
        dag_no : req.body.dag_no,
        land_type: req.body.land_type,
        land_quantity_by_part : req.body.land_quantity_by_part,
        comments :req.body.comments,
        
    });
    ktyn.save((err, doc) => {
        if (!err) res.send(doc);
        else console.log('Error in Khatiyan Save :' + JSON.stringify(err, undefined, 2)); 
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }

    var ktyn = {
        khatiyan_number: req.body.khatiyan_number,
        serial_no: req.body.serial_no,
        owner_name: req.body.owner_name,
        owner_father: req.body.owner_father,
        owner_address: req.body.owner_address,
        part : req.body.part,
        dag_no : req.body.dag_no,
        land_type: req.body.land_type,
        land_quantity_by_part : req.body.land_quantity_by_part,
        comments :req.body.comments,
    };
    Khatiyan.findByIdAndUpdate(req.params.id, { $set: ktyn }, { new: true }, (err, doc) => {
        if (!err) res.send(doc); 
        else console.log('Error in Khatiyan Update :' + JSON.stringify(err, undefined, 2)); 
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }
    Khatiyan.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) res.send(doc); 
        else console.log('Error in Khatiyan Delete :' + JSON.stringify(err, undefined, 2)); 
    });
});

router.get('/:id/download', (req, res) => {
    
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    }

    Khatiyan.findById(req.params.id, (err, doc) => {
        if (!err) { 
            
            let ts = Date.now();

            let date_ob = new Date(ts);
            let date = date_ob.getDate();
            let month = date_ob.getMonth() + 1;
            let year = date_ob.getFullYear();

            // prints date & time in YYYY-MM-DD format
            var pDate = year + "-" + month + "-" + date;

            //const html= `<h1> ${doc.khatiyan_number}</h1>`;
            const html= `
            <html>
                <head>
                    <title>Khotiyan sample</title>
                    <style>
                        table {
                            width: 100%;
                            table-layout: fixed;
                        }
                        table.page-body, table.page-body th, table.page-body td{
                            width: auto;
                            border: 1px solid black;
                            margin: 3%;
                        }
                        tr#khotiyan-subheader td {
                            text-align: center;
                        }
                        div.page-body-container {
                            width: 100%;
                        }
                        tr.entries {
                            height: 400px;
                        }
                        tr.entries td {
                            text-align: top;
                        }
                        #footer {
                            padding-left: 20%;
                        }
                    </style>
                </head>
                <body>
                    <table class="header">    <!-- Header table -->
                        <tr>
                            <td> </td>
                            <td style="text-align: center;">
                                <h1>খতিয়ান নং-${doc.khatiyan_number}</h1>
                            </td>
                            <td style="text-align: right;">পৃষ্ঠা নংঃ ১</td>
                        </tr>
                    </table>
                    <table>                 <!-- Mouza information table -->
                        <tr>
                            <td>বিভাগঃ ঢাকা</td>
                            <td>জেলাঃ ঢাকা</td>
                            <td>থানাঃ সাভার</td>
                            <td>মৌজাঃ ছলিয়া</td>
                            <td>জে,এল,নংঃ ${doc.serial_no}</td>
                            <td>রেঃ সাঃ নংঃ</td>
                        </tr>
                    </table>
                    <div class="page-body-container">
                        <table class="page-body">
                            <tr>
                                <th> মালিক, অকৃষি প্রজা বা ইজারাদারের তথ্য </th>
                                <th> অংশ </th>
                                <th> রাজস্ব </th>
                                <th> দাগ নং </th>
                                <th colspan="2"> জমির শ্রেণী </th> 
                                <th colspan="2"> দাগের মোট পরিমাণ </th>
                                <th> দাগের মধ্যে অত্র খতিয়ানের অংশ </th>
                                <th colspan="2"> অংশানুযায়ী জমির পরিমাণ </th>
                                <th> দখল বিষয়ক বা অন্যান্য বিশেষ মন্তব্য</th>
                            </tr>
                            <tr id="khotiyan-subheader">
                                <td>১</td>
                                <td>২</td>
                                <td>৩</td>
                                <td>৪</td>
                                <td>কৃষি ৫(ক)</td>
                                <td>অকৃষি ৫(খ)</td>
                                <td>একর ৬(ক)</td>
                                <td>অযুতাংশ ৬(খ)</td>
                                <td>৭</td>
                                <td>একর ৮(ক)</td>
                                <td>অযুতাংশ ৮(খ)</td>
                                <td>৯</td>
                            </tr>
                            <tr class="entries">
                                <td>
                                    <pre style="white-space:pre-line">
                                            মালিক
                                            দং ${doc.owner_name}
                                            পিতা ${doc.owner_father}
                                            সাং ${doc.owner_address}
                                    </pre>
                                </td>
                                <td>${doc.part}</td>
                        <td></td>
                        <td>${doc.dag_no}</td>
                        <td>${doc.land_type}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>১.০০</td>
                        <td></td>
                        <td>${doc.land_quantity_by_part}</td>
                        <td></td>
                            </tr>
                    <tr>
                        <td>____ ধারামতে নোট বা পরিবর্তন মায় মোকদ্দমা নোং ____ এবং সন </td>
                        <td>${doc.part}</td>
                        <td colspan="7">	<!-- TODO -->
                        
                        </td>
                        <td>০</td>
                        <td>${doc.land_quantity_by_part}</td>
                        <td></td>
                    </tr>
                        </table>
                    </div>
                    <span id="footer">
                            তারিখ: ${pDate}
                    </span>
                </body>
            </html>
        `;
            res.pdfFromHTML({
                filename: `${req.params.id}.pdf`,
                htmlContent: html,
            });
        }
        else console.log('Error in Retriving Khatiyan :' + JSON.stringify(err, undefined, 2)); 
    });
});

module.exports = router;