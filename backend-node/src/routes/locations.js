const express = require('express');
const db = require('../db');
const router = express.Router();

const mockCities = [
  { city_id: 1, city_name: 'Mumbai', district: 'Mumbai', state: 'Maharashtra' },
  { city_id: 2, city_name: 'Pune', district: 'Pune', state: 'Maharashtra' },
  { city_id: 3, city_name: 'Nagpur', district: 'Nagpur', state: 'Maharashtra' },
  { city_id: 4, city_name: 'Nashik', district: 'Nashik', state: 'Maharashtra' },
  { city_id: 5, city_name: 'Thane', district: 'Thane', state: 'Maharashtra' },
  { city_id: 6, city_name: 'Navi Mumbai', district: 'Thane', state: 'Maharashtra' },
  { city_id: 7, city_name: 'Aurangabad', district: 'Aurangabad', state: 'Maharashtra' },
  { city_id: 8, city_name: 'Solapur', district: 'Solapur', state: 'Maharashtra' },
  { city_id: 9, city_name: 'Kolhapur', district: 'Kolhapur', state: 'Maharashtra' },
  { city_id: 10, city_name: 'Amravati', district: 'Amravati', state: 'Maharashtra' },
  { city_id: 11, city_name: 'Nanded', district: 'Nanded', state: 'Maharashtra' },
  { city_id: 12, city_name: 'Sangli', district: 'Sangli', state: 'Maharashtra' },
  { city_id: 13, city_name: 'Jalgaon', district: 'Jalgaon', state: 'Maharashtra' },
  { city_id: 14, city_name: 'Akola', district: 'Akola', state: 'Maharashtra' },
  { city_id: 15, city_name: 'Latur', district: 'Latur', state: 'Maharashtra' },
  { city_id: 16, city_name: 'Ahmednagar', district: 'Ahmednagar', state: 'Maharashtra' },
  { city_id: 17, city_name: 'Chandrapur', district: 'Chandrapur', state: 'Maharashtra' },
  { city_id: 18, city_name: 'Parbhani', district: 'Parbhani', state: 'Maharashtra' },
  { city_id: 19, city_name: 'Beed', district: 'Beed', state: 'Maharashtra' },
  { city_id: 20, city_name: 'Satara', district: 'Satara', state: 'Maharashtra' },
  { city_id: 21, city_name: 'Dhule', district: 'Dhule', state: 'Maharashtra' },
  { city_id: 22, city_name: 'Malegaon', district: 'Nashik', state: 'Maharashtra' },
  { city_id: 23, city_name: 'Bhiwandi', district: 'Thane', state: 'Maharashtra' },
  { city_id: 24, city_name: 'Ulhasnagar', district: 'Thane', state: 'Maharashtra' },
  { city_id: 25, city_name: 'Mira-Bhayandar', district: 'Thane', state: 'Maharashtra' },
  { city_id: 26, city_name: 'Vasai-Virar', district: 'Palghar', state: 'Maharashtra' },
  { city_id: 27, city_name: 'Kalyan-Dombivli', district: 'Thane', state: 'Maharashtra' },
  { city_id: 28, city_name: 'Panvel', district: 'Raigad', state: 'Maharashtra' },
  { city_id: 29, city_name: 'Ratnagiri', district: 'Ratnagiri', state: 'Maharashtra' },
  { city_id: 30, city_name: 'Sindhudurg', district: 'Sindhudurg', state: 'Maharashtra' },
  { city_id: 31, city_name: 'Wardha', district: 'Wardha', state: 'Maharashtra' },
  { city_id: 32, city_name: 'Yavatmal', district: 'Yavatmal', state: 'Maharashtra' },
  { city_id: 33, city_name: 'Gondia', district: 'Gondia', state: 'Maharashtra' },
  { city_id: 34, city_name: 'Bhandara', district: 'Bhandara', state: 'Maharashtra' },
  { city_id: 35, city_name: 'Washim', district: 'Washim', state: 'Maharashtra' },
  { city_id: 36, city_name: 'Dharashiv', district: 'Dharashiv', state: 'Maharashtra' },
  { city_id: 37, city_name: 'Hingoli', district: 'Hingoli', state: 'Maharashtra' },
  { city_id: 38, city_name: 'Jalna', district: 'Jalna', state: 'Maharashtra' },
  { city_id: 39, city_name: 'Nandurbar', district: 'Nandurbar', state: 'Maharashtra' },
  { city_id: 40, city_name: 'Gadchiroli', district: 'Gadchiroli', state: 'Maharashtra' },
  { city_id: 41, city_name: 'Buldhana', district: 'Buldhana', state: 'Maharashtra' },
  { city_id: 42, city_name: 'Baramati', district: 'Pune', state: 'Maharashtra' },
  { city_id: 43, city_name: 'Ichalkaranji', district: 'Kolhapur', state: 'Maharashtra' },
  { city_id: 44, city_name: 'Karad', district: 'Satara', state: 'Maharashtra' },
  { city_id: 45, city_name: 'Pandharpur', district: 'Solapur', state: 'Maharashtra' },
  { city_id: 46, city_name: 'Chiplun', district: 'Ratnagiri', state: 'Maharashtra' },
  { city_id: 47, city_name: 'Palghar', district: 'Palghar', state: 'Maharashtra' },
  { city_id: 48, city_name: 'Ambarnath', district: 'Thane', state: 'Maharashtra' },
  { city_id: 49, city_name: 'Badlapur', district: 'Thane', state: 'Maharashtra' },
  { city_id: 50, city_name: 'Talegaon Dabhade', district: 'Pune', state: 'Maharashtra' },
];

const mockStationsByCity = {
  1: [
    {
      station_id: 101,
      station_name: 'Colaba Police Station',
      address: 'Colaba, Mumbai',
      phone: '022-2380-8565',
      latitude: 18.9067,
      longitude: 72.8147,
      city_name: 'Mumbai',
    },
    {
      station_id: 102,
      station_name: 'Andheri Police Station',
      address: 'Andheri West, Mumbai',
      phone: '022-2620-1515',
      latitude: 19.1197,
      longitude: 72.8464,
      city_name: 'Mumbai',
    },
  ],
  2: [
    {
      station_id: 201,
      station_name: 'Kothrud Police Station',
      address: 'Kothrud, Pune',
      phone: '020-2545-1111',
      latitude: 18.5074,
      longitude: 73.8077,
      city_name: 'Pune',
    },
    {
      station_id: 202,
      station_name: 'Shivajinagar Police Station',
      address: 'Shivajinagar, Pune',
      phone: '020-2553-6646',
      latitude: 18.5308,
      longitude: 73.8475,
      city_name: 'Pune',
    },
  ],
  3: [
    {
      station_id: 301,
      station_name: 'Sitabuldi Police Station',
      address: 'Sitabuldi, Nagpur',
      phone: '0712-256-8800',
      latitude: 21.1458,
      longitude: 79.0882,
      city_name: 'Nagpur',
    },
  ],
  4: [
    {
      station_id: 401,
      station_name: 'Nashik Road Police Station',
      address: 'Nashik Road, Nashik',
      phone: '0253-256-0120',
      latitude: 19.9975,
      longitude: 73.7898,
      city_name: 'Nashik',
    },
  ],
  5: [
    {
      station_id: 501,
      station_name: 'Thane Nagar Police Station',
      address: 'Thane West, Thane',
      phone: '022-2539-0424',
      latitude: 19.2183,
      longitude: 72.9781,
      city_name: 'Thane',
    },
  ],
  6: [
    {
      station_id: 601,
      station_name: 'Vashi Police Station',
      address: 'Vashi, Navi Mumbai',
      phone: '022-2787-0610',
      latitude: 19.0617,
      longitude: 73.0215,
      city_name: 'Navi Mumbai',
    },
  ],
  7: [
    {
      station_id: 701,
      station_name: 'CIDCO Police Station',
      address: 'CIDCO, Aurangabad',
      phone: '0240-236-9484',
      latitude: 19.8762,
      longitude: 75.3433,
      city_name: 'Aurangabad',
    },
  ],
  8: [
    {
      station_id: 801,
      station_name: 'Shivaji Chowk Police Station',
      address: 'Shivaji Chowk, Solapur',
      phone: '0217-232-1688',
      latitude: 17.6599,
      longitude: 75.9064,
      city_name: 'Solapur',
    },
  ],
  9: [
    {
      station_id: 901,
      station_name: 'Shivaji Nagar Police Station',
      address: 'Shivaji Nagar, Kolhapur',
      phone: '0231-265-2132',
      latitude: 16.7047,
      longitude: 74.2433,
      city_name: 'Kolhapur',
    },
  ],
  10: [
    {
      station_id: 1001,
      station_name: 'Old Police Line Station',
      address: 'Old Police Line, Amravati',
      phone: '0721-240-1212',
      latitude: 20.9374,
      longitude: 77.7793,
      city_name: 'Amravati',
    },
  ],
  11: [
    {
      station_id: 1101,
      station_name: 'Bazaar Peth Police Station',
      address: 'Bazaar Peth, Nanded',
      phone: '02462-252-633',
      latitude: 19.1490,
      longitude: 77.3220,
      city_name: 'Nanded',
    },
  ],
  12: [
    {
      station_id: 1201,
      station_name: 'Miraj Road Police Station',
      address: 'Miraj Road, Sangli',
      phone: '0233-232-1200',
      latitude: 16.8510,
      longitude: 74.5646,
      city_name: 'Sangli',
    },
  ],
  13: [
    {
      station_id: 1301,
      station_name: 'Sadak Peth Police Station',
      address: 'Sadak Peth, Jalgaon',
      phone: '0257-222-1022',
      latitude: 21.0077,
      longitude: 75.5626,
      city_name: 'Jalgaon',
    },
  ],
  14: [
    {
      station_id: 1401,
      station_name: 'Radhakrishna Nagar Police Station',
      address: 'Radhakrishna Nagar, Akola',
      phone: '0724-243-4929',
      latitude: 20.7014,
      longitude: 76.9995,
      city_name: 'Akola',
    },
  ],
  15: [
    {
      station_id: 1501,
      station_name: 'Vikram Nagar Police Station',
      address: 'Vikram Nagar, Latur',
      phone: '02382-250-034',
      latitude: 18.4095,
      longitude: 76.5690,
      city_name: 'Latur',
    },
  ],
  16: [
    {
      station_id: 1601,
      station_name: 'Ahmednagar Central Police Station',
      address: 'Old Police Line, Ahmednagar',
      phone: '0241-232-4161',
      latitude: 19.0947,
      longitude: 74.7496,
      city_name: 'Ahmednagar',
    },
  ],
  17: [
    {
      station_id: 1701,
      station_name: 'Gadchiroli Road Police Station',
      address: 'Gadchiroli Road, Chandrapur',
      phone: '07172-252-475',
      latitude: 19.9543,
      longitude: 79.2961,
      city_name: 'Chandrapur',
    },
  ],
  18: [
    {
      station_id: 1801,
      station_name: 'Kranti Chowk Police Station',
      address: 'Kranti Chowk, Parbhani',
      phone: '02452-248-788',
      latitude: 19.2683,
      longitude: 76.7736,
      city_name: 'Parbhani',
    },
  ],
  19: [
    {
      station_id: 1901,
      station_name: 'Azam Campus Police Station',
      address: 'Azam Campus, Beed',
      phone: '02442-252-531',
      latitude: 18.9889,
      longitude: 75.7609,
      city_name: 'Beed',
    },
  ],
  20: [
    {
      station_id: 2001,
      station_name: 'Shivaji Market Police Station',
      address: 'Shivaji Market, Satara',
      phone: '02162-242-223',
      latitude: 17.6802,
      longitude: 73.9953,
      city_name: 'Satara',
    },
  ],
};

const sendMockCities = (res) => res.json(mockCities);
const sendMockStations = (res, cityId) => res.json(mockStationsByCity[cityId] || []);

// Get all cities
router.get('/cities', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cities ORDER BY city_name');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching cities, falling back to mock data:', err.message || err);
    sendMockCities(res);
  }
});

// Get police stations by city
router.get('/police-stations/:cityId', async (req, res) => {
  const cityId = Number(req.params.cityId);

  if (!cityId) {
    return res.status(400).json({ message: 'Invalid city ID' });
  }

  const sql = `
    SELECT ps.*, c.city_name
    FROM police_stations ps
    JOIN cities c ON ps.city_id = c.city_id
    WHERE ps.city_id = ?
    ORDER BY ps.station_name
  `;

  try {
    const [rows] = await db.query(sql, [cityId]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching police stations, falling back to mock data:', err.message || err);
    sendMockStations(res, cityId);
  }
});

module.exports = router;
