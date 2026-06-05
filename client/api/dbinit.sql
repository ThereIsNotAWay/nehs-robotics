DROP TABLE IF EXISTS resources;

CREATE TABLE resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category STRING NOT NULL,
    title STRING NOT NULL,
    description STRING NOT NULL,
    link STRING NOT NULL
);