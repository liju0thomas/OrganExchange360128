var express = require('express');
var router = express.Router();

// Home Page - GET
router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/x', function (req, res, next) {
  res.render('x');
});


// Login Page - POST
router.post('/login', function (req, res, next) {
  let formData = req.body;
  pool.query(
    'SELECT id, name, address FROM hospitals WHERE username = $1 AND password = $2',
    [formData.username, formData.password],
    (err, result) => {
      if (err)
        res.send(err);
      else if (result.rowCount === 0)
        res.send({ error: "User not found!" });
      else {
        req.session.hospital = result.rows[0];
        res.redirect('/dashboard');
      }
    }
  );
});

// Dashboard Page => Redirect if login success - GET
router.get('/dashboard', function (req, res, next) {
  let hospitalDetails = req.session.hospital;
  res.render('dashboard', { hospital: hospitalDetails });
});

//add(form) and view donor - GET
router.get('/pair', function (req, res, next) {
  let hospital = req.session.hospital;
  res.render('pair', { hospital: hospital });
});

router.post('/addPair', async function (req, res, next) {
  let id;
  let formData = req.body;
  let hospital = req.session.hospital;
  pool.query(
    'INSERT INTO donors (name, address, blood, hla, hospitalId) VALUES ($1, $2, $3, $4, $5) RETURNING id',
    [formData.donor_name, formData.donor_address, formData.donor_blood, formData.donor_hla, hospital.id],
    async (err, result) => {
      if (err)
        res.send(err);
      else {
        id = result.rows[0].id
        let organtry = await organtryContract.deployed();
       let a = await organtry.setkaro(id, formData.acceptor_name, formData.acceptor_blood, formData.acceptor_hla,
          formData.donor_name, formData.donor_blood, formData.donor_hla,formData.donor_email,formData.acceptor_email, hospital.id,hospital.name, { from: coinbase });
        await organtry.findMatch(id, { from: coinbase });

        let pair1 = await organtry.newbee({ from: coinbase });
        pair1 = pair1.toNumber();
        console.log(pair1);
        console.log(a);
        if (pair1 != 1000000) {
          let pair1_donorn = await organtry.rdn(pair1, { from: coinbase });
          let pair1_acceptorn = await organtry.raname(pair1, { from: coinbase });
          let pair1_donorblood = await organtry.rdblood(pair1, { from: coinbase });
          let pair1_donorhla = await organtry.rdhla(pair1, { from: coinbase });
          let pair1_acceptorblood = await organtry.rablood(pair1, { from: coinbase });
          let pair1_acceptorhla = await organtry.rahla(pair1, { from: coinbase });
          let pair1_aemail = await organtry.aemai(pair1, { from: coinbase });
          let pair1_demail = await organtry.demai(pair1, { from: coinbase });
          let pair1_hosp = await organtry.rhosp(pair1, { from: coinbase });
          pair1_hosp = pair1_hosp.toNumber();
          let pair1_hosnam = await organtry.hn(pair1, { from: coinbase });

          console.log(pair1_donorn);
          console.log(pair1_acceptorn);
          console.log(pair1_donorblood);
          console.log(pair1_donorhla);
          console.log(pair1_acceptorblood);
          console.log(pair1_acceptorhla);
          console.log(pair1_hosp);
          console.log(pair1_hosnam);
          //res.redirect('/dashboard');

          // pool.query(
          //   'INSERT INTO acceptorhosp (id1, name, blood, hla, status, hospitalId) VALUES ($1,$2,$3,$4,$5,$6)',
          //   [pair1, pair1_acceptorn, pair1_acceptorblood, pair1_acceptorhla, 1, pair1_hosp],
          //   async (err, result) => {
          //     if (err) { res.send(err); }
          //     else
          //       console.log(result);
          //   });

          // pool.query(
          //   'INSERT INTO donorhosp(id2,name,blood,hla,pairOf) VALUES ($1,$2,$3,$4,$5)',
          //   [id, formData.donor_name, formData.donor_blood, formData.donor_hla, pair1],
          //   async (err, result) => {
          //     if (err) { res.send(err); }
          //     else
          //       console.log(result);
          //   });


          pool.query(
            'INSERT INTO pairhosp(id1,accname,donorname,status,hospitalId) VALUES ($1,$2,$3,$4,$5)',
            [pair1, pair1_acceptorn, formData.donor_name, 1, pair1_hosp],
            async (err, result) => {
              if (err) { res.send(err); }
              else
                console.log(result);
            });


            pool.query(
              'INSERT INTO pairhosp11(id1,accname,donorname,desthosp,status,hospitalId,donoremail,acceptoremail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
              [pair1, pair1_acceptorn,pair1_donorn,hospital.name, 1, pair1_hosp,pair1_demail,pair1_aemail],
              async (err, result) => {
                if (err) { res.send(err); }
                else
                  console.log(result);
              });

          pool.query(
            'INSERT INTO pairhosp(id1,accname,donorname,status,hospitalId) VALUES ($1,$2,$3,$4,$5)',
            [id, formData.acceptor_name, pair1_donorn, 1, hospital.id],
            async (err, result) => {
              if (err) { res.send(err); }
              else
                console.log(result);
            });

            pool.query(
              'INSERT INTO pairhosp11(id1,accname,donorname,desthosp,status,hospitalId,donoremail,acceptoremail) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
              [id, formData.acceptor_name, formData.donor_name,pair1_hosnam, 1, hospital.id,formData.donor_email,formData.acceptor_email],
              async (err, result) => {
                if (err) { res.send(err); }
                else
                  console.log(result);
              });
          // pool.query(
          //   'INSERT INTO acceptorhosp (id1, name, blood, hla, status, hospitalId) VALUES ($1,$2,$3,$4,$5,$6)',
          //   [id, formData.acceptor_name, formData.acceptor_blood, formData.acceptor_hla, 1, hospital.id],
          //   async (err, result) => {
          //     if (err) { res.send(err); }
          //     else
          //       console.log(result)
          //   });

          // pool.query(
          //   'INSERT INTO donorhosp(id2,name,blood,hla,pairOf) VALUES ($1,$2,$3,$4,$5)',
          //   [pair1, pair1_donorn, pair1_donorblood, pair1_donorhla, id],
          //   async (err, result) => {
          //     if (err) {
          //       res.send(err);

          //     }
          //   });
            res.redirect('/dashboard');
        }

        else {

          res.redirect('/dashboard');

        }
        // let OrganDonor = await OrganDonorContract.deployed();
        // await OrganDonor.setDonor(id, formData.donor_name, formData.donor_blood, formData.donor_hla, { from: coinbase });
        // pool.query(
        //   'INSERT INTO acceptors (name, address, blood, hla, hospitalId, pairOf) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        //   [formData.acceptor_name, formData.acceptor_address, formData.acceptor_blood, formData.acceptor_hla, hospital.id, id],
        //   async (err, result) => {
        //     if (err)
        //       res.send(err);
        //     else {

        //       let OrganDonor = await OrganDonorContract.deployed();
        //       await OrganDonor.setAcceptor(id, formData.acceptor_name, formData.acceptor_blood, formData.acceptor_hla, { from: coinbase });

        //     }
        //   }
        // );
      }
    }
  );

  // res.redirect('/dashboard');

});

// Searching Donor - GET
router.get('/searchDonors', function (req, res, next) {
  let formData = req.query;
  let hospital = req.session.hospital;
  pool.query(
    'SELECT id, name, address FROM donors WHERE status = false and blood = $1 and hla = $2 and hospitalid = $3',
    [formData.blood, formData.hla, hospital.id],
    (err, result) => {
      if (err)
        res.send(err);
      else {
        res.render('searchDonor', { donors: result.rows, hospital: hospital, hla: formData.hla, blood: formData.blood });
      }
    }
  );
});

// Acceptor Form - POST
router.post('/acceptorList', function (req, res, next) {
  let formData = req.body;
  let hospital = req.session.hospital;
  pool.query(
    'SELECT id, name, address FROM acceptors where blood = $1 and hla = $2 and hospitalid = $3',
    [formData.blood, formData.hla, hospital.id],
    (err, result) => {
      if (err)
        res.send(err);
      else {
        res.render('acceptorList', { hospital: hospital, acceptors: result.rows, donorId: formData.donorId });
      }
    }
  );
});

//new
router.get('/pairList', function (req, res, next) {
  let formData = req.body;
  let hospital = req.session.hospital;
  pool.query(
    'SELECT id1, accname, donorname FROM pairhosp where hospitalid = $1 and status = true',
    [hospital.id],
    (err, result) => {
      if (err)
        res.send(err);
      else {
        res.render('pairList', { hospital: hospital, pairList: result.rows,donorId: formData.donorId});
      }
    }
  );
});

//plold
router.get('/plo', function (req, res, next) {
  let formData = req.body;
  let hospital = req.session.hospital;
  pool.query(
    'SELECT id1, accname, donorname FROM pairhosp where hospitalid = $1 and status = false',
    [hospital.id],
    (err, result) => {
      if (err)
        res.send(err);
      else {
        res.render('plo', { hospital: hospital, pairList: result.rows,donorId: formData.donorId});
      }
    }
  );
});

router.get('/registered', function (req, res, next) {
  let formData = req.body;
  let hospital = req.session.hospital;
  pool.query(
    'SELECT id1, accname, donorname,desthosp,donoremail,acceptoremail FROM pairhosp11 where hospitalid = $1 and status = true',
    [hospital.id],
    (err, result) => {
      if (err)
        res.send(err);
      else {
        res.render('registered', { hospital: hospital, pairList: result.rows,donorId: formData.donorId});
      }
    }
  );
});

//new1
router.post('/dp', function (req, res, next) {
  let formData = req.body;
  pool.query(
    'UPDATE pairhosp SET status = false WHERE id1 = $1',
    [formData.acceptorId],
    async (err, result) => {
      if (err)
        res.send(err);
      else {
        // pool.query(
        //   'UPDATE acceptors SET donorId = $1 WHERE id = $2',
        //   [formData.donorId, formData.acceptorId]
        // );
        // let OrganDonor = await OrganDonorContract.deployed();
        // await OrganDonor.transferOrgan(formData.donorId, formData.acceptorId, { from: coinbase });
        res.send("Organ pair donation has been registered and recorded!");
      }
    }
  );
});

//desthosp
router.post('/dpr', function (req, res, next) {
  let formData = req.body;
  console.log(formData.donoremail);
  pool.query(
    'UPDATE pairhosp11 SET status = false WHERE id1 = $1',
    [formData.acceptorId],
    async (err, result) => {
      if (err)
        res.send(err);
      else {
        // pool.query(
        //   'UPDATE acceptors SET donorId = $1 WHERE id = $2',
        //   [formData.donorId, formData.acceptorId]
        // );
        // let OrganDonor = await OrganDonorContract.deployed();
        // await OrganDonor.transferOrgan(formData.donorId, formData.acceptorId, { from: coinbase });
        res.send("The corresponding pairs will be informed shortly by the hospital Authorities!");
        var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lijuthomas1509@gmail.com',
    pass: 'liju1509patharathil'
  }
});

var mailOptions = {
  from: 'lijuthomas1509@gmail.com',
  to: formData.donoremail,
  subject: 'Organ Donor',
  text:`Come to`+ formData.desthosp+'for your organ transplantation'
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
var mailOptions = {
  from: 'lijuthomas1509@gmail.com',
  to: formData.acceptoremail,
  subject: 'Organ Donor',
  text:`Your organ donation status is approved. please come to registered hospital tomorrow.`
  
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

      }
    }
  );
});

router.post('/donate', function (req, res, next) {
  let formData = req.body;
  pool.query(
    'UPDATE donors SET status = true WHERE id = $1',
    [formData.donorId],
    async (err, result) => {
      if (err)
        res.send(err);
      else {
        pool.query(
          'UPDATE acceptors SET donorId = $1 WHERE id = $2',
          [formData.donorId, formData.acceptorId]
        );
        let OrganDonor = await OrganDonorContract.deployed();
        await OrganDonor.transferOrgan(formData.donorId, formData.acceptorId, { from: coinbase });
        res.send("Organ pair donation has been registered and recorded!");
      }
    }
  );
});

// Adding Acceptor - POST
router.post('/addAcceptor', function (req, res, next) {
  let formData = req.body;
  let hospital = req.session.hospital;
  //adding acceptor
  pool.query(
    'INSERT INTO acceptors(name, address, donorId) VALUES ($1, $2, $3) RETURNING id',
    [formData.name, formData.address, formData.donorId],
    async (err, result) => {
      if (err)
        res.send(err);
      else {
        let acceptorId = result.rows[0].id
        let OrganDonor = await OrganDonorContract.deployed();
        await OrganDonor.setAcceptor(acceptorId, formData.name, formData.blood, formData.hla, { from: coinbase });
        //updating donors status 
        pool.query(
          'UPDATE donors SET status = true WHERE id = $1',
          [formData.donorId],
          async (err, result) => {
            if (err)
              res.send(err);
            else {
              let OrganDonor = await OrganDonorContract.deployed();
              await OrganDonor.transferOrgan(formData.donorId, acceptorId, { from: coinbase });
              res.send("Acceptor is Registored!");
            }
          }
        );
      }
    }
  );
});

module.exports = router;
