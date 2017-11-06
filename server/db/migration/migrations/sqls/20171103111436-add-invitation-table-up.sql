CREATE TABLE fra_user_invitation (
  invitation_uuid uuid PRIMARY KEY,
  email VARCHAR(255),
  name VARCHAR(1024),
  role VARCHAR(255) REFERENCES fra_role(role) NOT NULL,
  country_iso VARCHAR(3) REFERENCES country(country_iso) NOT NULL,
  invited TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted TIMESTAMP WITH TIME ZONE
)
