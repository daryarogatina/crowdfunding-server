-- Database schema

CREATE DATABASE IF NOT EXISTS crowdfunding;

CREATE TABLE IF NOT EXISTS crowdfunding.campaigns (
id CHAR(36) PRIMARY KEY DEFAULT (uuid()),
name VARCHAR(100) NOT NULL,
description TEXT,
goal_amount DECIMAL(10,2) NOT NULL,
status ENUM('active','successful','fraud') NOT NULL DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS crowdfunding.donations (
id CHAR(36) PRIMARY KEY DEFAULT (uuid()),
campaign_id CHAR(36),
amount DECIMAL(10,2) NOT NULL,
donator_nickname VARCHAR(50) NOT NULL,
status ENUM('valid','fraud') NOT NULL DEFAULT 'valid',
FOREIGN KEY (campaign_id) REFERENCES crowdfunding.campaigns (id)
);

-- Adding test campaigns 

INSERT INTO crowdfunding.campaigns (name, description, goal_amount)
VALUES
    ('Clean Water Initiative', 'Help provide clean drinking water to communities in need.', 5000.00),
    ('Education for All', 'Support educational programs to ensure every child has access to quality education.', 10000.00),
    ('Food Drive for the Homeless', 'Collect food donations to feed homeless individuals in our community.', 2000.00),
    ('Medical Research Fund', 'Contribute to medical research efforts to find cures for diseases.', 15000.00),
    ('Environmental Conservation', 'Protect and preserve our natural environment through sustainable practices.', 8000.00),
    ('Animal Shelter Renovation', 'Renovate and improve animal shelters to provide better care for abandoned pets.', 5000.00),
    ('Disaster Relief Fund', 'Provide immediate assistance to communities affected by natural disasters.', 10000.00),
    ('Art Education Program', 'Support art education initiatives to nurture creativity in young minds.', 3000.00),
    ('Community Garden Project', 'Create community gardens to promote sustainable food production.', 5000.00),
    ('Youth Mentorship Program', 'Empower and guide young individuals through mentorship and skill-building activities.', 5000.00),
    ('Elderly Care Support', 'Offer support and companionship to elderly individuals in nursing homes.', 2000.00),
    ('Sports Equipment Drive', 'Collect sports equipment to provide underprivileged children with access to sports activities.', 3000.00),
    ('Women Empowerment Initiative', 'Promote gender equality and empower women through education and skill development.', 10000.00),
    ('Technology for Schools', 'Provide schools with necessary technology resources to enhance learning experiences.', 8000.00),
    ('Community Library Expansion', 'Expand community libraries to foster a love for reading and learning.', 5000.00);

-- Trigger that checks sum of all donations on every new donation insert. If goal_amount reached then mark campaign status as successful 

CREATE TRIGGER IF NOT EXISTS crowdfunding.update_campaign_status
AFTER INSERT ON crowdfunding.donations
FOR EACH ROW
BEGIN
    UPDATE crowdfunding.campaigns c
    JOIN (
        SELECT campaign_id, SUM(amount) AS total_amount
        FROM crowdfunding.donations
        WHERE campaign_id = NEW.campaign_id
        GROUP BY campaign_id
    ) d ON c.id = d.campaign_id
    SET c.status = CASE
        WHEN d.total_amount >= c.goal_amount THEN 'successful'
        ELSE c.status
    END;
END;


-- Procedure to mark campaigns as fraud
CREATE PROCEDURE IF NOT EXISTS crowdfunding.MarkDonatorAsFraud(IN donatorNickname VARCHAR(50))
BEGIN
  UPDATE donations
  SET status = 'fraud'
  WHERE donator_nickname = donatorNickname;

  UPDATE campaigns
  SET status = 'fraud'
  WHERE id IN (
    SELECT campaign_id
    FROM donations
    WHERE donator_nickname = donatorNickname
  );
END;