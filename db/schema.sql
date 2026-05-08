-- Database schema for Smart Police Assistance & Case Management System

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

CREATE TABLE IF NOT EXISTS complaints (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  location VARCHAR(255),
  status ENUM('Pending','Investigating','Solved','Closed') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS officers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  station VARCHAR(150),
  assigned_area VARCHAR(150),
  active BOOLEAN DEFAULT TRUE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cases (
  id INT AUTO_INCREMENT PRIMARY KEY,
  complaint_id INT NOT NULL,
  officer_id INT,
  status ENUM('Pending','Investigating','Solved','Closed') DEFAULT 'Pending',
  priority ENUM('Low','Medium','High') DEFAULT 'Medium',
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (complaint_id) REFERENCES complaints(id),
  FOREIGN KEY (officer_id) REFERENCES officers(id)
);

CREATE TABLE IF NOT EXISTS evidence_files (
  id INT AUTO_INCREMENT PRIMARY KEY,
  case_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(100),
  file_url VARCHAR(512) NOT NULL,
  uploaded_by INT,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id),
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS case_updates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  case_id INT NOT NULL,
  officer_id INT NOT NULL,
  note TEXT NOT NULL,
  status ENUM('Pending','Investigating','Solved','Closed'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (case_id) REFERENCES cases(id),
  FOREIGN KEY (officer_id) REFERENCES officers(id)
);

CREATE TABLE IF NOT EXISTS emergency_alerts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  location VARCHAR(255),
  message TEXT,
  status ENUM('Pending','Dispatched','Resolved') DEFAULT 'Pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS activity_logs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  action VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45),
  user_agent VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS cities (
  city_id INT AUTO_INCREMENT PRIMARY KEY,
  city_name VARCHAR(100) NOT NULL,
  district VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS police_stations (
  station_id INT AUTO_INCREMENT PRIMARY KEY,
  city_id INT NOT NULL,
  station_name VARCHAR(150) NOT NULL,
  address VARCHAR(255),
  phone VARCHAR(20),
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  FOREIGN KEY (city_id) REFERENCES cities(city_id)
);

INSERT INTO cities (city_name, district) VALUES
('Mumbai', 'Mumbai'),
('Pune', 'Pune'),
('Nagpur', 'Nagpur'),
('Nashik', 'Nashik'),
('Thane', 'Thane'),
('Navi Mumbai', 'Thane'),
('Aurangabad', 'Aurangabad'),
('Solapur', 'Solapur'),
('Kolhapur', 'Kolhapur'),
('Amravati', 'Amravati'),
('Nanded', 'Nanded'),
('Sangli', 'Sangli'),
('Jalgaon', 'Jalgaon'),
('Akola', 'Akola'),
('Latur', 'Latur'),
('Ahmednagar', 'Ahmednagar'),
('Chandrapur', 'Chandrapur'),
('Parbhani', 'Parbhani'),
('Beed', 'Beed'),
('Satara', 'Satara');

INSERT INTO police_stations (city_id, station_name, address, phone, latitude, longitude) VALUES
(1, 'Colaba Police Station', 'Colaba, Mumbai', '022-2380-8565', 18.90670000, 72.81470000),
(2, 'Kothrud Police Station', 'Kothrud, Pune', '020-2545-1111', 18.50740000, 73.80770000),
(3, 'Sitabuldi Police Station', 'Sitabuldi, Nagpur', '0712-256-8800', 21.14580000, 79.08820000),
(4, 'Nashik Road Police Station', 'Nashik Road, Nashik', '0253-256-0120', 19.99750000, 73.78980000),
(5, 'Thane Nagar Police Station', 'Thane West, Thane', '022-2539-0424', 19.21830000, 72.97810000),
(6, 'Vashi Police Station', 'Vashi, Navi Mumbai', '022-2787-0610', 19.06170000, 73.02150000),
(7, 'CIDCO Police Station', 'CIDCO, Aurangabad', '0240-236-9484', 19.87620000, 75.34330000),
(8, 'Shivaji Chowk Police Station', 'Shivaji Chowk, Solapur', '0217-232-1688', 17.65990000, 75.90640000),
(9, 'Shivaji Nagar Police Station', 'Shivaji Nagar, Kolhapur', '0231-265-2132', 16.70470000, 74.24330000),
(10, 'Old Police Line Station', 'Old Police Line, Amravati', '0721-240-1212', 20.93740000, 77.77930000),
(11, 'Bazaar Peth Police Station', 'Bazaar Peth, Nanded', '02462-252-633', 19.14900000, 77.32200000),
(12, 'Miraj Road Police Station', 'Miraj Road, Sangli', '0233-232-1200', 16.85100000, 74.56460000),
(13, 'Sadak Peth Police Station', 'Sadak Peth, Jalgaon', '0257-222-1022', 21.00770000, 75.56260000),
(14, 'Radhakrishna Nagar Police Station', 'Radhakrishna Nagar, Akola', '0724-243-4929', 20.70140000, 76.99950000),
(15, 'Vikram Nagar Police Station', 'Vikram Nagar, Latur', '02382-250-034', 18.40950000, 76.56900000),
(16, 'Old Police Line Police Station', 'Old Police Line, Ahmednagar', '0241-232-4161', 19.09470000, 74.74960000),
(17, 'Gadchiroli Road Police Station', 'Gadchiroli Road, Chandrapur', '07172-252-475', 19.95430000, 79.29610000),
(18, 'Kranti Chowk Police Station', 'Kranti Chowk, Parbhani', '02452-248-788', 19.26830000, 76.77360000),
(19, 'Azam Campus Police Station', 'Azam Campus, Beed', '02442-252-531', 18.98890000, 75.76090000),
(20, 'Shivaji Market Police Station', 'Shivaji Market, Satara', '02162-242-223', 17.68020000, 73.99530000);
