CREATE DATABASE IF NOT EXISTS police_help_system;
USE police_help_system;

CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    phone VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS cities (
    city_id INT AUTO_INCREMENT PRIMARY KEY,
    city_name VARCHAR(100) NOT NULL,
    district VARCHAR(100),
    state VARCHAR(100) DEFAULT 'Maharashtra',
    UNIQUE KEY unique_city_district (city_name, district)
);

CREATE TABLE IF NOT EXISTS police_stations (
    station_id INT AUTO_INCREMENT PRIMARY KEY,
    city_id INT,
    station_name VARCHAR(150) NOT NULL,
    address VARCHAR(255),
    phone VARCHAR(20),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    UNIQUE KEY unique_station_city (city_id, station_name),
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

CREATE TABLE IF NOT EXISTS officers (
    officer_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    station_id INT,
    officer_name VARCHAR(120) NOT NULL,
    officer_rank VARCHAR(80) NOT NULL,
    contact VARCHAR(30),
    email VARCHAR(150),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (station_id) REFERENCES police_stations(station_id)
);

CREATE TABLE IF NOT EXISTS complaint_status (
    status_id INT AUTO_INCREMENT PRIMARY KEY,
    status_name VARCHAR(60) UNIQUE NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS complaints (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    id INT UNIQUE,
    user_id INT,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100),
    location VARCHAR(255),
    status_id INT,
    status VARCHAR(60) DEFAULT 'Pending',
    assigned_officer_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (status_id) REFERENCES complaint_status(status_id),
    FOREIGN KEY (assigned_officer_id) REFERENCES officers(officer_id)
);

CREATE TABLE IF NOT EXISTS emergency_contacts (
    contact_id INT AUTO_INCREMENT PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    description VARCHAR(255),
    active BOOLEAN DEFAULT TRUE,
    UNIQUE KEY unique_emergency_contact (service_name, phone_number)
);

CREATE TABLE IF NOT EXISTS crime_reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    crime_type VARCHAR(100) NOT NULL,
    area VARCHAR(150) NOT NULL,
    city_id INT,
    report_date DATE NOT NULL,
    severity ENUM('Low','Medium','High','Critical') DEFAULT 'Medium',
    summary TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_crime_report_seed (crime_type, area, report_date),
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

CREATE TABLE IF NOT EXISTS alerts (
    alert_id INT AUTO_INCREMENT PRIMARY KEY,
    alert_type ENUM('Emergency','Traffic','Cyber','Community') NOT NULL,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    area VARCHAR(150),
    severity ENUM('Low','Medium','High','Critical') DEFAULT 'Medium',
    status ENUM('Active','Resolved','Expired') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_alert_seed (alert_type, title, area)
);

CREATE TABLE IF NOT EXISTS news (
    news_id INT AUTO_INCREMENT PRIMARY KEY,
    scope ENUM('Maharashtra','India','Worldwide') NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary TEXT,
    source VARCHAR(150),
    url VARCHAR(512),
    published_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_news_seed (scope, title)
);

CREATE TABLE IF NOT EXISTS community_events (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    event_title VARCHAR(180) NOT NULL,
    event_type VARCHAR(100),
    description TEXT,
    city_id INT,
    venue VARCHAR(255),
    event_date DATE,
    contact_phone VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_event_seed (event_title, city_id, event_date),
    FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

CREATE TABLE IF NOT EXISTS feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS evidence_files (
    file_id INT AUTO_INCREMENT PRIMARY KEY,
    complaint_id INT,
    uploaded_by INT,
    file_name VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_url VARCHAR(512) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (complaint_id) REFERENCES complaints(complaint_id),
    FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

INSERT IGNORE INTO roles (name, description) VALUES
('Public User', 'Citizen account for complaints, alerts, and feedback'),
('Police Officer', 'Officer account for cases, notes, and evidence'),
('Admin', 'Administrator account for officers, reports, and assignments');

INSERT IGNORE INTO complaint_status (status_name, description) VALUES
('Pending', 'Complaint submitted and waiting for review'),
('Accepted', 'Complaint accepted by police station or admin'),
('Under Investigation', 'Complaint assigned and under investigation'),
('Resolved', 'Complaint closed after action or resolution');

INSERT IGNORE INTO cities (city_name, district, state) VALUES
('Mumbai', 'Mumbai', 'Maharashtra'),
('Pune', 'Pune', 'Maharashtra'),
('Nagpur', 'Nagpur', 'Maharashtra'),
('Nashik', 'Nashik', 'Maharashtra'),
('Thane', 'Thane', 'Maharashtra'),
('Navi Mumbai', 'Thane', 'Maharashtra'),
('Aurangabad', 'Aurangabad', 'Maharashtra'),
('Solapur', 'Solapur', 'Maharashtra'),
('Kolhapur', 'Kolhapur', 'Maharashtra'),
('Amravati', 'Amravati', 'Maharashtra'),
('Nanded', 'Nanded', 'Maharashtra'),
('Sangli', 'Sangli', 'Maharashtra'),
('Jalgaon', 'Jalgaon', 'Maharashtra'),
('Akola', 'Akola', 'Maharashtra'),
('Latur', 'Latur', 'Maharashtra'),
('Ahmednagar', 'Ahmednagar', 'Maharashtra'),
('Chandrapur', 'Chandrapur', 'Maharashtra'),
('Parbhani', 'Parbhani', 'Maharashtra'),
('Beed', 'Beed', 'Maharashtra'),
('Satara', 'Satara', 'Maharashtra'),
('Dhule', 'Dhule', 'Maharashtra'),
('Malegaon', 'Nashik', 'Maharashtra'),
('Bhiwandi', 'Thane', 'Maharashtra'),
('Ulhasnagar', 'Thane', 'Maharashtra'),
('Mira-Bhayandar', 'Thane', 'Maharashtra'),
('Vasai-Virar', 'Palghar', 'Maharashtra'),
('Kalyan-Dombivli', 'Thane', 'Maharashtra'),
('Panvel', 'Raigad', 'Maharashtra'),
('Ratnagiri', 'Ratnagiri', 'Maharashtra'),
('Sindhudurg', 'Sindhudurg', 'Maharashtra'),
('Wardha', 'Wardha', 'Maharashtra'),
('Yavatmal', 'Yavatmal', 'Maharashtra'),
('Gondia', 'Gondia', 'Maharashtra'),
('Bhandara', 'Bhandara', 'Maharashtra'),
('Washim', 'Washim', 'Maharashtra'),
('Dharashiv', 'Dharashiv', 'Maharashtra'),
('Hingoli', 'Hingoli', 'Maharashtra'),
('Jalna', 'Jalna', 'Maharashtra'),
('Nandurbar', 'Nandurbar', 'Maharashtra'),
('Gadchiroli', 'Gadchiroli', 'Maharashtra'),
('Buldhana', 'Buldhana', 'Maharashtra'),
('Baramati', 'Pune', 'Maharashtra'),
('Ichalkaranji', 'Kolhapur', 'Maharashtra'),
('Karad', 'Satara', 'Maharashtra'),
('Pandharpur', 'Solapur', 'Maharashtra'),
('Chiplun', 'Ratnagiri', 'Maharashtra'),
('Palghar', 'Palghar', 'Maharashtra'),
('Ambarnath', 'Thane', 'Maharashtra'),
('Badlapur', 'Thane', 'Maharashtra'),
('Talegaon Dabhade', 'Pune', 'Maharashtra');

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude) VALUES
(1, 'Colaba Police Station', 'Colaba, Mumbai', '022-2380-8565', 18.9067, 72.8147),
(1, 'Andheri Police Station', 'Andheri West, Mumbai', '022-2620-1515', 19.1197, 72.8464),
(2, 'Kothrud Police Station', 'Kothrud, Pune', '020-2545-1111', 18.5074, 73.8077),
(2, 'Shivajinagar Police Station', 'Shivajinagar, Pune', '020-2553-6646', 18.5308, 73.8475),
(3, 'Sitabuldi Police Station', 'Sitabuldi, Nagpur', '0712-256-8800', 21.1458, 79.0882),
(4, 'Nashik Road Police Station', 'Nashik Road, Nashik', '0253-256-0120', 19.9975, 73.7898),
(5, 'Thane Nagar Police Station', 'Thane West, Thane', '022-2539-0424', 19.2183, 72.9781),
(6, 'Vashi Police Station', 'Vashi, Navi Mumbai', '022-2787-0610', 19.0617, 73.0215),
(7, 'CIDCO Police Station', 'CIDCO, Aurangabad', '0240-236-9484', 19.8762, 75.3433),
(8, 'Shivaji Chowk Police Station', 'Shivaji Chowk, Solapur', '0217-232-1688', 17.6599, 75.9064),
(9, 'Shivaji Nagar Police Station', 'Shivaji Nagar, Kolhapur', '0231-265-2132', 16.7047, 74.2433),
(10, 'Old Police Line Station', 'Old Police Line, Amravati', '0721-240-1212', 20.9374, 77.7793),
(11, 'Bazaar Peth Police Station', 'Bazaar Peth, Nanded', '02462-252-633', 19.1490, 77.3220),
(12, 'Miraj Road Police Station', 'Miraj Rd, Sangli', '0233-232-1200', 16.8510, 74.5646),
(13, 'Sadak Peth Police Station', 'Sadak Peth, Jalgaon', '0257-222-1022', 21.0077, 75.5626),
(14, 'Radhakrishna Nagar Police Station', 'Radhakrishna Nagar, Akola', '0724-243-4929', 20.7014, 76.9995),
(15, 'Vikram Nagar Police Station', 'Vikram Nagar, Latur', '02382-250-034', 18.4095, 76.5690),
(16, 'Old Police Line Police Station', 'Old Police Line, Ahmednagar', '0241-232-4161', 19.0947, 74.7496),
(17, 'Gadchiroli Road Police Station', 'Gadchiroli Road, Chandrapur', '07172-252-475', 19.9543, 79.2961),
(18, 'Kranti Chowk Police Station', 'Kranti Chowk, Parbhani', '02452-248-788', 19.2683, 76.7736),
(19, 'Azam Campus Police Station', 'Azam Campus, Beed', '02442-252-531', 18.9889, 75.7609),
(20, 'Shivaji Market Police Station', 'Shivaji Market, Satara', '02162-242-223', 17.6802, 73.9953);

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Dhule City Police Station', 'Dhule City, Dhule', '02562-232-101', 20.9042, 74.7749 FROM cities WHERE city_name = 'Dhule';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Malegaon City Police Station', 'Malegaon City, Nashik', '02554-232-100', 20.5579, 74.5287 FROM cities WHERE city_name = 'Malegaon';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Bhiwandi City Police Station', 'Bhiwandi, Thane', '02522-252-100', 19.2813, 73.0483 FROM cities WHERE city_name = 'Bhiwandi';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Ulhasnagar Police Station', 'Ulhasnagar, Thane', '0251-256-0100', 19.2215, 73.1645 FROM cities WHERE city_name = 'Ulhasnagar';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Mira Road Police Station', 'Mira-Bhayandar, Thane', '022-2811-0100', 19.2952, 72.8544 FROM cities WHERE city_name = 'Mira-Bhayandar';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Vasai Police Station', 'Vasai-Virar, Palghar', '0250-233-0100', 19.3919, 72.8397 FROM cities WHERE city_name = 'Vasai-Virar';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Kalyan Police Station', 'Kalyan-Dombivli, Thane', '0251-231-0100', 19.2403, 73.1305 FROM cities WHERE city_name = 'Kalyan-Dombivli';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Panvel City Police Station', 'Panvel, Raigad', '022-2745-0100', 18.9894, 73.1175 FROM cities WHERE city_name = 'Panvel';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Ratnagiri City Police Station', 'Ratnagiri City, Ratnagiri', '02352-222-100', 16.9902, 73.3120 FROM cities WHERE city_name = 'Ratnagiri';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Sindhudurg Police Station', 'Oros, Sindhudurg', '02362-228-100', 16.3492, 73.5594 FROM cities WHERE city_name = 'Sindhudurg';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Wardha City Police Station', 'Wardha City, Wardha', '07152-243-100', 20.7453, 78.6022 FROM cities WHERE city_name = 'Wardha';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Yavatmal City Police Station', 'Yavatmal City, Yavatmal', '07232-244-100', 20.3888, 78.1204 FROM cities WHERE city_name = 'Yavatmal';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Gondia City Police Station', 'Gondia City, Gondia', '07182-230-100', 21.4598, 80.1950 FROM cities WHERE city_name = 'Gondia';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Bhandara City Police Station', 'Bhandara City, Bhandara', '07184-252-100', 21.1700, 79.6500 FROM cities WHERE city_name = 'Bhandara';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Washim City Police Station', 'Washim City, Washim', '07252-232-100', 20.1119, 77.1330 FROM cities WHERE city_name = 'Washim';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Dharashiv City Police Station', 'Dharashiv City, Dharashiv', '02472-222-100', 18.1861, 76.0419 FROM cities WHERE city_name = 'Dharashiv';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Hingoli City Police Station', 'Hingoli City, Hingoli', '02456-222-100', 19.7190, 77.1483 FROM cities WHERE city_name = 'Hingoli';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Jalna City Police Station', 'Jalna City, Jalna', '02482-233-100', 19.8347, 75.8816 FROM cities WHERE city_name = 'Jalna';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Nandurbar City Police Station', 'Nandurbar City, Nandurbar', '02564-222-100', 21.3755, 74.2428 FROM cities WHERE city_name = 'Nandurbar';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Gadchiroli City Police Station', 'Gadchiroli City, Gadchiroli', '07132-222-100', 20.1849, 80.0033 FROM cities WHERE city_name = 'Gadchiroli';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Buldhana City Police Station', 'Buldhana City, Buldhana', '07262-242-100', 20.5293, 76.1842 FROM cities WHERE city_name = 'Buldhana';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Baramati City Police Station', 'Baramati, Pune', '02112-222-100', 18.1517, 74.5777 FROM cities WHERE city_name = 'Baramati';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Ichalkaranji Police Station', 'Ichalkaranji, Kolhapur', '0230-242-100', 16.7090, 74.4561 FROM cities WHERE city_name = 'Ichalkaranji';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Karad City Police Station', 'Karad City, Satara', '02164-222-100', 17.2777, 74.1844 FROM cities WHERE city_name = 'Karad';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Pandharpur City Police Station', 'Pandharpur City, Solapur', '02186-223-100', 17.6792, 75.3308 FROM cities WHERE city_name = 'Pandharpur';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Chiplun Police Station', 'Chiplun, Ratnagiri', '02355-252-100', 17.5334, 73.5097 FROM cities WHERE city_name = 'Chiplun';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Palghar Police Station', 'Palghar City, Palghar', '02525-252-100', 19.6967, 72.7654 FROM cities WHERE city_name = 'Palghar';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Ambarnath Police Station', 'Ambarnath, Thane', '0251-260-100', 19.1825, 73.1926 FROM cities WHERE city_name = 'Ambarnath';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Badlapur Police Station', 'Badlapur, Thane', '0251-269-100', 19.1552, 73.2655 FROM cities WHERE city_name = 'Badlapur';

INSERT IGNORE INTO police_stations (city_id, station_name, address, phone, latitude, longitude)
SELECT city_id, 'Talegaon Dabhade Police Station', 'Talegaon Dabhade, Pune', '02114-222-100', 18.7350, 73.6756 FROM cities WHERE city_name = 'Talegaon Dabhade';

INSERT IGNORE INTO emergency_contacts (service_name, phone_number, description) VALUES
('Police', '100', 'Police emergency control room'),
('Emergency', '112', 'National emergency response'),
('Ambulance', '108', 'Medical emergency ambulance'),
('Fire', '101', 'Fire brigade emergency'),
('Women Helpline', '1091', 'Women safety helpline'),
('Child Helpline', '1098', 'Child protection helpline');

INSERT IGNORE INTO crime_reports (crime_type, area, city_id, report_date, severity, summary) VALUES
('Theft', 'Pune Station Road', 2, '2026-05-01', 'High', 'Mobile theft complaints reported near station area'),
('Traffic Violation', 'Nashik Road', 4, '2026-05-02', 'Medium', 'Recurring traffic congestion and unsafe parking'),
('Cyber Fraud', 'Thane West', 5, '2026-05-03', 'Critical', 'Online payment fraud cases reported by citizens');

INSERT IGNORE INTO alerts (alert_type, title, message, area, severity) VALUES
('Emergency', 'Emergency response active', 'Nearby officers have been notified for urgent citizen assistance.', 'Pune', 'High'),
('Traffic', 'Traffic advisory', 'Heavy traffic reported near Nashik Road junction.', 'Nashik', 'Medium'),
('Cyber', 'Cyber safety alert', 'Citizens are advised not to share OTPs or banking credentials.', 'Maharashtra', 'High');

INSERT IGNORE INTO news (scope, title, summary, source, published_at) VALUES
('Maharashtra', 'Maharashtra safety update', 'Police departments continue digital public safety improvements.', 'Police Assistance Desk', NOW()),
('India', 'India public safety update', 'Emergency response and citizen-service systems are expanding.', 'Police Assistance Desk', NOW()),
('Worldwide', 'Worldwide policing technology update', 'Technology continues to support faster public safety response.', 'Police Assistance Desk', NOW());

INSERT IGNORE INTO community_events (event_title, event_type, description, city_id, venue, event_date, contact_phone) VALUES
('Police-Public Safety Meeting', 'Community Meeting', 'Local citizens and officers discuss area safety concerns.', 2, 'Pune Community Hall', '2026-05-20', '020-2545-1111'),
('Cyber Awareness Program', 'Safety Awareness', 'Awareness session about online fraud, OTP safety, and reporting.', 5, 'Thane Civic Center', '2026-05-25', '022-2539-0424');
