require('dotenv').config();
const mongoose = require('mongoose');
const Counter = require('../models/counter');
const Admin = require('../models/users/admin');
const BusOperator = require('../models/users/busOperator');
const Driver = require('../models/users/driver');
const Customer = require('../models/users/customer');
const Bus = require('../models/bus');
const Stop = require('../models/stop');
const Route = require('../models/route');
const Feedback = require('../models/feedback');
const Review = require('../models/review');
const Booking = require('../models/booking');
const Payment = require('../models/payment');

async function createTestEntries() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.LOCAL_MONGODB_CONNECTION_STRING);
    console.log('Connected to MongoDB');
    // Create counter documents if they don't exist
    await initializeCounters();
    // Create test entries if not exists for each model
    await createTestAdmin();
    await createTestBusOperator();
    await createTestDriver();
    await createTestCustomer();
    await createTestCustomer();
    await createTestRoute();
    await createTestBus();

    console.log('Test entries created successfully');
  } catch (error) {
    console.error('Error creating test entries:', error);
  } 
}
async function initializeCounters() {
  try {
    // Check and create counter documents if they don't exist
    const adminCounter = await Counter.findOne({ model: 'Admin' });
    if (!adminCounter) {
      await Counter.create({ model: 'Admin' });
      console.log('Admin counter initialized');
    }
    const busOperatorCounter = await Counter.findOne({ model: 'BusOperator' });
    if (!busOperatorCounter) {
      await Counter.create({ model: 'BusOperator' });
      console.log('BusOperator counter initialized');
    }
    const driverCounter = await Counter.findOne({ model: 'Driver' });
    if (!driverCounter) {
      await Counter.create({ model: 'Driver' });
      console.log('Driver counter initialized');
    }
    const customerCounter = await Counter.findOne({ model: 'Customer' });
    if (!customerCounter) {
      await Counter.create({ model: 'Customer' });
      console.log('Customer counter initialized');
    }
    const busCounter = await Counter.findOne({ model: 'Bus' });
    if (!busCounter) {
      await Counter.create({ model: 'Bus' });
      console.log('Bus counter initialized');
    }
    const stopCounter = await Counter.findOne({ model: 'Stop' });
    if (!stopCounter) {
      await Counter.create({ model: 'Stop' });
      console.log('Stop counter initialized');
    }
    const routeCounter = await Counter.findOne({ model: 'Route' });
    if (!routeCounter) {
      await Counter.create({ model: 'Route' });
      console.log('Route counter initialized');
    }
    const feedbackCounter = await Counter.findOne({ model: 'Feedback' });
    if (!feedbackCounter) {
      await Counter.create({ model: 'Feedback' });
      console.log('Feedback counter initialized');
    }
    const reviewCounter = await Counter.findOne({ model: 'Review' });
    if (!reviewCounter) {
      await Counter.create({ model: 'Review' });
      console.log('Review counter initialized');
    }
    const bookingCounter = await Counter.findOne({ model: 'Booking' });
    if (!bookingCounter) {
      await Counter.create({ model: 'Booking' });
      console.log('Booking counter initialized');
    }
    const paymentCounter = await Counter.findOne({ model: 'Payment' });
    if (!paymentCounter) {
      await Counter.create({ model: 'Payment' });
      console.log('Payment counter initialized');
    }

  } catch (error) {
    console.error('Error initializing counters:', error);
  }
}
async function createTestAdmin() {
  try {
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({ name: 'sumit@01', email: 'admin01@test.com',password: 'password@01' });
      await Admin.create({name: 'leander@02',email: 'admin02@test.com',password: 'password@02' });
      await Admin.create({name: 'irfan@03',email: 'admin03@test.com',password: 'password@03' });
      await Admin.create({name: 'tushar@04',email: 'admin04@test.com',password: 'password@04' });
      await Admin.create({name: 'clayton@05',email: 'admin05@test.com',password: 'password@05' });
      await Admin.create({ name: 'sameer@06', email: 'admin06@test.com', password: 'password@06'});
      console.log('Test admin created successfully');
    } else {
      console.log('Test admin already exists');
    }
  } catch (error) {
    console.error('Error creating test admin:', error);
  }
}
async function createTestBusOperator() {
  try {
    const BusOperatorCount = await BusOperator.countDocuments();
    if (BusOperatorCount === 0) {
      await BusOperator.create({ name: 'busOperator01', email: 'busOperator01@test.com',password: 'password@01', companyName:'Sai Travels' });
      console.log('Test busOperator created successfully');
    } else {
      console.log('Test busOperator already exists');
    }
  } catch (error) {
    console.error('Error creating test busOperator:', error);
  }
}
async function createTestDriver() {
  try {
    const DriverCount = await Driver.countDocuments();
    if (DriverCount === 0) {
      await Driver.create({ name: 'driver@01', email: 'driver01@test.com',password: 'password@01', phone:'123456789', license:"GA03ABCD123"});
    
      await Driver.create({ name: 'sam@02', email: 'driver02@test.com',password: 'password@01',phone:'123456789',license:"GA03ABCD154"});

      await Driver.create({ name: 'tom@01', email: 'driver03@test.com',password: 'password@01',phone:'123456789',license:"GA03ABCD165"});

      await Driver.create({ name: 'harry@01', email: 'driver04@test.com',password: 'password@01',phone:'123456789',license:"GA03ABCD197"});

      await Driver.create({ name: 'peter@01', email: 'driver04@test.com',password: 'password@01',phone:'123456789',license:"GA03ABCD198"});

      console.log('Test Driver created successfully');
    } else {
      console.log('Test Driver already exists');
    }
  } catch (error) {
    console.error('Error creating test Driver:', error);
  }
}
async function createTestCustomer() {
  try {
    const CustomerCount = await Customer.countDocuments();
    if (CustomerCount === 0) {
      await Customer.create({ name: 'customer@01', email: 'customer@test.com',password: 'password@01' });
      console.log('Test customers created successfully');
    } else {
      console.log('Test customers already exists');
    }
  } catch (error) {
    console.error('Error creating test customers:', error);
  }
}
async function createTestRoute() {
  try {
    const RouteCount = await Route.countDocuments();
    if (RouteCount === 0) {
      await Route.create({ name: "Panaji , Ponda & back",
      source: "Panaji - KTC Bus Stand",
      destination: "Old Ponda Bus Stand",
      stops: [
        "Panjim Ferry", "Ribandar Patto", "Chodna Ferry", "Ribander Church", "Ribander Copel", "Ribandar Police Station", 
        "Divar Ferry", "St. Pedro", "Baingini", "Old Goa", "Old Goa Gandhi Circle", "Old Goa Police Station", 
        "Corlim Petrol Pump", "Corlim Industrial Estate", "Syngenta", "Dhulaper", "Banastari", "Boma", "Kundaim", 
        "Kundaim Industrial Estate", "Mangeshi Temple", "Mardol", "Veling Cross", "Mardol Masjid", "Patyekade", 
        "Konem", "Farmagudi", "GVM's College Ponda", "Ponda KTC Bus Stand", "Safa Masjid", "Ponda RTO Office", 
        "Ponda Fire Station"
      ]});

      await Route.create({
        name: "Panaji - Calangute Beach & back",
        source: "Panaji KTC Bus Stand",
        destination: "Calangute Beach (Baga Circle)",
        stops: [
          "Malem", "Betim", "Betim Ferry", "Verem Bank", "Verem Market", "Madani/V.P. Pilerne", 
          "Saipem", "Orda Candolim", "Saipem Club", "Candolim Church", "Candolim Market", 
          "Candolim Beach", "Jambeleshwar", "St. Anthony Chapel"
        ]
      });
      
      await Route.create({
        name: "Margao - Colva Beach & back",
        source: "Margao KTC Bus Stand",
        destination: "Colva Beach",
        stops: [
          "Colva Circle", "Margao Session Court", "Holy Spirit Church", "Hospicio", 
          "Market (Kamat Hotel)", "Railway Foot Overbridge", "Khareband", "Maria Hall", 
          "Benaulim", "Adsulim", "Vanelim"
        ]
      });


      await Route.create({
  name: "Panaji - Dona Paula - Bambolim GMC & back",
  source: "Panaji KTC Bus Stand",
  destination: "Bambolim GMC",
  stops: [
    "Panjim Ferry", "Panaji Cruises", "Panjim Post Office", "SBI", "Panaji Old Secretariat", 
    "Betim Ferry", "Panaji Market", "Panaji INOX", "Kala Academy", "Bal Bhavan Panaji", 
    "Campal", "Marriott Panaji", "Miramar", "Dhempe College", "Tonca Jn", 
    "Caranzalem Circle(Adarsh Colony Jn)", "Kamat Classic Building", "Kerant Jn", 
    "Caranzalem Old Park", "Dona Paula Market", "Dona Paula Circle Jn", 
    "NIO Community Centre(Dona Paula Cricket Ground)", "Manipal Hospital Goa", 
    "Goa Business School (Goa University)", "Goa University Library", 
    "Dr. Shyamaprasad Mukherjee Indoor Stadium", "A.I.R. (All India Radio) Bambolim", 
    "Hills View Royal Open Air Venue Hall", "Old Bambolim", "Maruti Mandir Bambolim"
  ]
});

await Route.create({
  name: "Panaji - Dona Paula & back",
  source: "Panaji KTC Bus Stand",
  destination: "Dona Paula Circle Jn",
  stops: [
    "Panjim Ferry", "Panaji Cruises", "Panjim Post Office", "SBI", "Panaji Old Secretariat", 
    "Betim Ferry", "Panaji Market", "Panaji INOX", "Kala Academy", "Bal Bhavan Panaji", 
    "Campal", "Marriott Panaji", "Miramar", "Dhempe College", "Tonca Jn", 
    "Caranzalem Circle (Adarsh Colony Jn)", "Kamat Classic Building", "Kerant Jn", 
    "Caranzalem Old Park", "Dona Paula Market"
  ]
});

await Route.create({
  name: "Mapusa - Chapora Beach & back",
  source: "Mapusa KTC Bus Stand",
  destination: "Chapora Beach",
  stops: [
    "Mapusa Police Station", "Khorlim", "DMC College", "Boutawaddo Assagao", 
    "St Michael Church Anjuna", "Anjuna Post Office", "Anjuna Starco Junction", 
    "Anjuna Police Station", "Vagator Junction"
  ]
});

await Route.create({
  name: "Mapusa - Thivim Railway Stn (Sirsaim) & back",
  source: "Mapusa KTC Bus Stand",
  destination: "Sirsaim Copel",
  stops: [
    "Mapusa Court", "Dhuler", "Peddem", "Karaswada Char Rasta", "Karaswada Taaki", 
    "Manguirish Colony", "Madel Housing Board", "Madel", "Omkar Colony Madel", 
    "Major Bakery Thivim", "Thivim Banglyakade", "Thivim Ground", "Thivim-Colvale Rasta", 
    "SBI Cansa Bodiem", "Cansa Bodiem", "Blooming Bud Cansa", "Thivim Railway Stn", "Sirsaim Vadakade"
  ]
});

await Route.create({
  name: "Mapusa - Pernem & back",
  source: "Mapusa KTC Bus Stand",
  destination: "Pernem KTC Bus Stand",
  stops: [
    "Mapusa Court", "Dhuler", "Peddem", "Karaswada Char Rasta", "Karaswada IDC", 
    "Colvale Housing Board", "Near Colvale Office", "Binani", "Dr. Ambedkar College", 
    "Colvale Char Rasta", "Colvale Dhargal Bridge", "Mahakhazan", "Don Khamb RTO Check post", 
    "Don Khamb Dhargalim", "Kaloji Wines", "Dhargal High School", "Suke Kulan", "Oshalbag", 
    "Walpe", "Valpe Cross", "Govt. College Pernem", "Pernem Railway Station", "Malpe", "Sawalwada"
  ]
});


await Route.create({
  name: "Mapusa - Panaji & back",
  source: "Mapusa KTC Bus Stand",
  destination: "Panaji KTC Bus Stand",
  stops: [
    "Guirim Copel", "Green Park Junction", "Posrare", "Guirim Cross Flyover", 
    "Porvorim Tisk", "Damian De Goa", "Vadakade", "Porvorim Copel", "Gulyakade(O Coqueiro Circle)", 
    "Training College Bus Stop", "Teen Building", "Neo Majestic", "Pundalik Nagar", "Secretariat", "Sai Service"
  ]
});

await Route.create({
  name: "Mapusa - Panaji Express & back",
  source: "Mapusa KTC Bus Stand",
  destination: "Panaji KTC Bus Stand",
  stops: []
});


        
      console.log('Test Route created successfully');
    } else {
      console.log('Test Route already exists');
    }
  } catch (error) {
    console.error('Error creating test Route:', error);
  }
}

async function createTestBus() {
  try {
    const BusCount = await Bus.countDocuments();
    if (BusCount === 0) {
      await Bus.create({
        type: "local",
        registrationNumber: "GA03K1133",
        model: "Small",
        capacity: 30,
        operatorId: "662b44eb22fc1d015ae4cd43", // Replace with the actual ID of the bus operator
        driverId: "662bd8a2678b1d5a68e9c830", // Replace with the actual ID of the driver
        routeId: "662bb99d165cec54ecfc7fb5",
        rating: 4.5,
        timetable: [
          "06:00 - 06:40","06:45 - 07:25","07:30 - 08:10","08:15 - 08:55",
          "09:00 - 09:40","09:45 - 10:25", "10:30 - 11:10","11:15 - 11:55","12:00 - 12:40",
          "12:45 - 13:25", "13:30 - 14:10","14:15 - 14:55","15:00 - 15:40","15:45 - 16:25",
          "16:30 - 17:10","17:15 - 17:55","18:00 - 18:40","18:45 - 19:25",
          "19:30 - 20:10"
        ]
      });

      await Bus.create({
        type: "local",
        registrationNumber: "GA03K1233",
        model: "Small",
        capacity: 50,
        operatorId: "662b44eb22fc1d015ae4cd43", // Replace with the actual ID of the bus operator
        driverId: "662bd8a4678b1d5a68e9c833", // Replace with the actual ID of the driver
        routeId: "662bb99d165cec54ecfc7faf",
        rating: 4.2,
        timetable: [
          "07:00 - 07:40",
          "08:00 - 08:40",
          "09:00 - 09:40",
          "10:00 - 10:40", 
          "11:00 - 11:40",
          "12:00 - 12:40",
          "13:00 - 13:40",
          "14:00 - 14:40",
          "15:00 - 15:40",
          "16:00 - 16:40",
          "17:00 - 17:40",
          "18:00 - 18:40",
          "19:00 - 19:40"
        ]
      });
      
      await Bus.create({
        type: "local",
        registrationNumber: "GA03K1333",
        model: "DEF",
        capacity: 45,
        operatorId: "662b44eb22fc1d015ae4cd43", // Replace with the actual ID of the bus operator
        driverId: "662bd8a6678b1d5a68e9c836", // Replace with the actual ID of the driver
        routeId: "662bb99d165cec54ecfc7fa3",
        rating: 4.0,
        timetable: [
          "06:30 - 07:10",
          "07:15 - 07:55",
          "08:00 - 08:40",
          "09:00 - 09:40",
          "10:00 - 10:40",
          "11:00 - 11:40",
          "12:00 - 12:40",
          "13:00 - 13:40",
          "14:00 - 14:40",
          "15:00 - 15:40",
          "16:30 - 17:10",
          "18:00 - 18:40",
          "19:30 - 20:10",
          "21:00 - 21:40",
          "22:00 - 22:40"
          // Add more timetable entries as needed
        ]
      });

      
      await Bus.create({
        type: "local",
        registrationNumber: "GA03K1433",
        model: "GHI",
        capacity: 55,
        operatorId: "662b44eb22fc1d015ae4cd43", // Replace with the actual ID of the bus operator
        driverId: "662bd8a8678b1d5a68e9c839", // Replace with the actual ID of the driver
        routeId: "662bb99d165cec54ecfc7fa9",
        rating: 4.3,
        timetable: [
          "07:00 - 07:40",
          "08:00 - 08:40",
          "09:20 - 10:00",
          "10:30 - 11:10",
          "12:00 - 12:40",
          "13:20 - 14:00",
          "14:30 - 15:10",
          "15:40 - 16:20",
          "17:00 - 17:40",
          "18:30 - 19:10",
          "20:00 - 20:40",
          "21:30 - 22:10"
          // Add more timetable entries as needed
        ]
      });
      
      await Bus.create({
        type: "local",
        registrationNumber: "GA03K1533",
        model: "ABC",
        capacity: 50,
        operatorId: "662b44eb22fc1d015ae4cd43", // Replace with the actual ID of the bus operator
        driverId: "662bd8a8678b1d5a68e9c839", // Replace with the actual ID of the driver
        routeId: "662bb99d165cec54ecfc7f9d",
        rating: 4.2,
        timetable: [
          "07:00 - 07:40",
          "08:00 - 08:40",
          "09:00 - 09:40",
          "10:00 - 10:40",
          "11:00 - 11:40",
          "12:00 - 12:40",
          "13:00 - 13:40",
          "14:00 - 14:40",
          "15:00 - 15:40",
          "16:00 - 16:40",
          "17:00 - 17:40",
          "18:00 - 18:40",
          "19:00 - 19:40",
          "20:00 - 20:40",
          "21:00 - 21:40"]});
      
      console.log('Test bus entry created successfully');
    } else {
      console.log('Test bus entry already exists');
    }
  } catch (error) {
    console.error('Error creating test bus entry:', error); 
  }
}




// Call the function to create test entries
createTestEntries();
